import * as crypto from "crypto";
import * as path from "path";
import * as dotenv from "dotenv";
import * as cheerio from "cheerio";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import { getAllSitemapPaths } from "../lib/seo/pages";
import { getCanonicalAboutIngestContent } from "../lib/ai/chat-identity";
import { getCanonicalSiteFactsIngestLines } from "../lib/ai/chat-canonical-site";
import { getBlogIngestChunks } from "../lib/blog/blog-ingest-chunks";
import { getBlogSlugs } from "../lib/blog/posts";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !GOOGLE_API_KEY) {
  console.error(
    "Missing Supabase or GOOGLE_GENERATIVE_AI_API_KEY in .env.local",
  );
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: GOOGLE_API_KEY,
  httpOptions: { headers: { "Accept-Encoding": "identity" } },
});
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const EMBEDDING_MODEL = "gemini-embedding-001";
const BASE_URL = (
  process.env.INGEST_BASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.clykur.com"
).replace(/\/$/, "");

const TARGET_CHARS_MIN = 1200;
const TARGET_CHARS_MAX = 2000;
const OVERLAP_RATIO = 0.1;
const SCRAPE_CONCURRENCY = 3;
const UPSERT_BATCH = 15;
const EMBED_DELAY_MS = Number(process.env.INGEST_EMBED_DELAY_MS ?? 700);
const EMBED_MAX_RETRIES = Number(process.env.INGEST_EMBED_MAX_RETRIES ?? 12);

type PageType =
  | "homepage"
  | "service"
  | "product"
  | "blog"
  | "case-study"
  | "careers"
  | "legal"
  | "industry"
  | "page";

export type DocumentChunk = {
  url: string;
  title: string;
  section_title: string;
  content: string;
  page_type: PageType;
  slug: string;
  priority_score: number;
  content_hash: string;
};

let routesDiscovered = 0;
let pagesCrawled = 0;
let chunksGenerated = 0;
let chunksInserted = 0;
let chunksSkipped = 0;
let failures = 0;

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function embedRetryDelayMs(err: unknown): number | null {
  const raw = err instanceof Error ? err.message : String(err);
  const retrySec = raw.match(/retry in (\d+(?:\.\d+)?)s/i);
  if (retrySec) {
    return Math.ceil(parseFloat(retrySec[1]) * 1000) + 1000;
  }
  if (/429|RESOURCE_EXHAUSTED|quota/i.test(raw)) {
    return 55_000;
  }
  if (/503|UNAVAILABLE/i.test(raw)) {
    return 8_000;
  }
  return null;
}

function hashContent(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function normalizePageUrl(href: string, origin: string): string | null {
  try {
    const u = new URL(href, origin);
    if (u.origin !== new URL(origin).origin) return null;
    u.hash = "";
    let pathname = u.pathname || "/";
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }
    u.pathname = pathname;
    if (/\.(pdf|zip|png|jpe?g|gif|webp|svg|ico|xml|json)$/i.test(pathname)) {
      return null;
    }
    return u.toString();
  } catch {
    return null;
  }
}

function inferPageMeta(
  url: string,
  pageTitle: string,
): {
  page_type: PageType;
  slug: string;
  priority_score: number;
} {
  let pathname = "/";
  try {
    pathname = new URL(url).pathname || "/";
  } catch {
    /* keep default */
  }
  const slug =
    pathname === "/"
      ? "home"
      : (pathname.split("/").filter(Boolean).pop() ?? "page");

  if (pathname === "/") {
    return { page_type: "homepage", slug, priority_score: 1 };
  }
  if (pathname.startsWith("/services")) {
    return {
      page_type: "service",
      slug,
      priority_score: pathname === "/services" ? 0.95 : 0.88,
    };
  }
  if (pathname.startsWith("/case-studies")) {
    return { page_type: "case-study", slug, priority_score: 0.88 };
  }
  if (pathname.startsWith("/blog")) {
    return { page_type: "blog", slug, priority_score: 0.65 };
  }
  if (pathname.startsWith("/careers")) {
    return { page_type: "careers", slug, priority_score: 0.2 };
  }
  if (pathname.startsWith("/industries")) {
    return { page_type: "industry", slug, priority_score: 0.84 };
  }
  if (
    /privacy|terms|refund|engagement|employment|compliance|security/i.test(
      pathname,
    )
  ) {
    return { page_type: "legal", slug, priority_score: 0.2 };
  }
  if (pathname === "/contact" || pathname === "/faq" || pathname === "/about") {
    const score =
      pathname === "/about" ? 1 : pathname === "/contact" ? 0.85 : 0.82;
    return { page_type: "page", slug, priority_score: score };
  }
  return { page_type: "page", slug, priority_score: 0.8 };
}

async function fetchText(url: string): Promise<string | null> {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0 ClykurBot/1.0",
      Accept: "text/html,application/xml,text/xml,*/*",
      "Accept-Encoding": "identity",
    },
  });
  if (!response.ok) return null;
  return response.text();
}

async function parseSitemapRecursive(
  sitemapUrl: string,
  seen: Set<string>,
): Promise<string[]> {
  if (seen.has(sitemapUrl)) return [];
  seen.add(sitemapUrl);

  const xml = await fetchText(sitemapUrl);
  if (!xml) return [];

  const locs = [...xml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) =>
    m[1].trim(),
  );
  const isIndex = /<sitemapindex/i.test(xml);

  if (isIndex) {
    const nested: string[] = [];
    for (const loc of locs) {
      nested.push(...(await parseSitemapRecursive(loc, seen)));
    }
    return nested;
  }

  return locs;
}

async function discoverAllUrls(): Promise<string[]> {
  const sitemapRoot = `${BASE_URL}/sitemap.xml`;
  console.log(`Fetching sitemap tree from ${sitemapRoot}`);
  const fromSitemap = await parseSitemapRecursive(sitemapRoot, new Set());
  const normalized = new Set<string>();

  for (const raw of fromSitemap) {
    const n = normalizePageUrl(raw, BASE_URL);
    if (n) normalized.add(n);
  }

  // Same route set as app/sitemap.ts (live /sitemap.xml may be stale vs this repo).
  for (const path of getAllSitemapPaths()) {
    const n = normalizePageUrl(
      path === "/" ? BASE_URL : `${BASE_URL}${path}`,
      BASE_URL,
    );
    if (n) normalized.add(n);
  }

  normalized.add(normalizePageUrl(BASE_URL, BASE_URL)!);

  const queue = [...normalized];
  const crawled = new Set<string>();

  while (queue.length > 0) {
    const batch = queue.splice(0, SCRAPE_CONCURRENCY);
    await Promise.all(
      batch.map(async (url) => {
        if (crawled.has(url)) return;
        crawled.add(url);

        const html = await fetchText(url);
        if (!html) return;

        const $ = cheerio.load(html);
        $("a[href]").each((_, el) => {
          const href = $(el).attr("href");
          if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
          ) {
            return;
          }
          const next = normalizePageUrl(href, BASE_URL);
          if (next && !normalized.has(next)) {
            normalized.add(next);
            queue.push(next);
          }
        });
      }),
    );
  }

  const sorted = [...normalized].sort();
  console.log(
    `Discovered ${sorted.length} unique URLs (sitemap + internal links).`,
  );
  return sorted;
}

function stripBoilerplate($: cheerio.CheerioAPI) {
  $(
    "script, style, noscript, iframe, svg, canvas, nav, footer, header, [role='navigation'], [aria-label='Footer'], [aria-label='Navigation']",
  ).remove();
}

function extractHeadingSections(
  url: string,
  pageTitle: string,
  $: cheerio.CheerioAPI,
): Array<{ section_title: string; text: string }> {
  const main = $("main").first();
  const root = main.length ? main : $("body");
  const sections: Array<{ section_title: string; text: string }> = [];
  let currentTitle = pageTitle;
  let buffer: string[] = [];

  const flush = () => {
    const text = buffer.join("\n\n").replace(/\s+/g, " ").trim();
    if (text.length > 40) {
      sections.push({ section_title: currentTitle, text });
    }
    buffer = [];
  };

  root.find("h1, h2, h3, p, li").each((_, el) => {
    const tag = el.tagName?.toLowerCase();
    const line = $(el).text().replace(/\s+/g, " ").trim();
    if (!line) return;

    if (tag === "h1" || tag === "h2" || tag === "h3") {
      flush();
      currentTitle = line;
      return;
    }
    buffer.push(line);
  });
  flush();

  if (sections.length === 0) {
    const fallback = root.text().replace(/\s+/g, " ").trim();
    if (fallback.length > 40) {
      sections.push({ section_title: pageTitle, text: fallback });
    }
  }

  return sections;
}

function splitWithOverlap(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];
  const overlap = Math.floor(maxLen * OVERLAP_RATIO);
  const parts: string[] = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + maxLen, text.length);
    if (end < text.length) {
      const slice = text.slice(start, end);
      const breakAt = slice.lastIndexOf(". ");
      if (breakAt > maxLen * 0.5) {
        end = start + breakAt + 1;
      }
    }
    parts.push(text.slice(start, end).trim());
    if (end >= text.length) break;
    start = Math.max(end - overlap, start + 1);
  }
  return parts.filter((p) => p.length > 20);
}

function chunkSections(
  url: string,
  pageTitle: string,
  sections: Array<{ section_title: string; text: string }>,
): DocumentChunk[] {
  const meta = inferPageMeta(url, pageTitle);
  const out: DocumentChunk[] = [];

  for (const section of sections) {
    const pieces =
      section.text.length > TARGET_CHARS_MAX
        ? splitWithOverlap(section.text, TARGET_CHARS_MAX)
        : section.text.length < TARGET_CHARS_MIN && section.text.length > 40
          ? [section.text]
          : section.text.length >= TARGET_CHARS_MIN
            ? splitWithOverlap(section.text, TARGET_CHARS_MAX)
            : [section.text];

    for (const piece of pieces) {
      const content = piece.trim();
      if (content.length < 30) continue;
      out.push({
        url,
        title: pageTitle,
        section_title: section.section_title,
        content,
        page_type: meta.page_type,
        slug: meta.slug,
        priority_score: meta.priority_score,
        content_hash: hashContent(`${url}|${section.section_title}|${content}`),
      });
    }
  }

  const seen = new Set<string>();
  return out.filter((c) => {
    if (seen.has(c.content_hash)) return false;
    seen.add(c.content_hash);
    return true;
  });
}

async function scrapePage(url: string): Promise<DocumentChunk[]> {
  try {
    const html = await fetchText(url);
    if (!html) {
      console.warn(`[Scrape] Failed: ${url}`);
      return [];
    }

    const $ = cheerio.load(html);
    stripBoilerplate($);
    const title =
      $("title")
        .text()
        .replace(/\s*\|\s*Clykur\s*$/i, "")
        .trim() || "Clykur";

    const mainHtml = $("main").first().html();
    const $content = cheerio.load(
      mainHtml ? `<body>${mainHtml}</body>` : $.html(),
    );
    stripBoilerplate($content);

    const sections = extractHeadingSections(url, title, $content);
    const chunks = chunkSections(url, title, sections);
    console.log(`[Scrape] ${url} → ${chunks.length} chunks`);
    return chunks;
  } catch (e) {
    console.error(`[Scrape] Error ${url}:`, e);
    return [];
  }
}

async function generateEmbedding(text: string): Promise<number[] | null> {
  for (let attempt = 1; attempt <= EMBED_MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.embedContent({
        model: EMBEDDING_MODEL,
        contents: text,
        config: { outputDimensionality: 768 },
      });
      const values = response.embeddings?.[0]?.values;
      if (values?.length) return values;
    } catch (err) {
      const rateWait = embedRetryDelayMs(err);
      if (rateWait != null && attempt < EMBED_MAX_RETRIES) {
        console.warn(
          `Embed rate limited (attempt ${attempt}/${EMBED_MAX_RETRIES}); waiting ${Math.round(rateWait / 1000)}s…`,
        );
        await sleep(rateWait);
        continue;
      }
      console.error(
        `Embed attempt ${attempt}:`,
        err instanceof Error ? err.message.slice(0, 280) : err,
      );
      await sleep(800 * attempt);
    }
  }
  return null;
}

async function verifyEmbeddingModel(): Promise<number> {
  const embedding = await generateEmbedding("clykur ingest test");
  if (!embedding) {
    console.error("Embedding model check failed.");
    process.exit(1);
  }
  console.log(`Embedding dimensions: ${embedding.length}`);
  return embedding.length;
}

async function runPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const idx = next++;
      if (idx >= items.length) break;
      results[idx] = await fn(items[idx]);
    }
  }
  const workers = Math.min(concurrency, Math.max(items.length, 1));
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return results;
}

async function ingest() {
  console.log("Starting full-site RAG ingestion...");
  console.log(`Base URL: ${BASE_URL}`);
  console.log(
    `Embed pacing: ${EMBED_DELAY_MS}ms between requests (set INGEST_EMBED_DELAY_MS to tune).`,
  );

  const dimensions = await verifyEmbeddingModel();
  const urls = await discoverAllUrls();
  routesDiscovered = urls.length;

  let allChunks: DocumentChunk[] = [];
  const chunkLists = await runPool(urls, SCRAPE_CONCURRENCY, scrapePage);
  for (const list of chunkLists) {
    if (list.length > 0) pagesCrawled++;
    allChunks.push(...list);
  }
  chunksGenerated = allChunks.length;
  console.log(
    `\n${chunksGenerated} chunks from ${pagesCrawled} pages (before blog merge).\n`,
  );

  const blogPostUrls = new Set(
    getBlogSlugs().map((slug) => `${BASE_URL}/blog/${slug}`),
  );
  allChunks = allChunks.filter((c) => !blogPostUrls.has(c.url));
  const blogFromSource = getBlogIngestChunks(BASE_URL);
  allChunks.push(...blogFromSource);
  console.log(
    `Merged ${blogFromSource.length} blog chunks from repo source (${blogPostUrls.size} posts; production scrape may 404 until deploy).`,
  );

  const byHash = new Map<string, DocumentChunk>();
  for (const c of allChunks) {
    byHash.set(c.content_hash, c);
  }
  allChunks = [...byHash.values()];

  const canonical = getCanonicalAboutIngestContent(BASE_URL);
  const siteFacts = getCanonicalSiteFactsIngestLines().join("\n\n");
  const canonicalContent = `${canonical.content}\n\n${siteFacts}`;
  allChunks.push({
    ...canonical,
    content: canonicalContent,
    content_hash: hashContent(
      `${canonical.url}|${canonical.section_title}|${canonicalContent}`,
    ),
  });
  chunksGenerated = allChunks.length;
  console.log("Added canonical About Clykur chunk for identity retrieval.");

  const { error: deleteError, count: deletedCount } = await supabase
    .from("knowledge_chunks")
    .delete({ count: "exact" })
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    console.error(
      "Could not clear knowledge_chunks before ingest:",
      deleteError.message,
    );
    console.error(
      "Run in Supabase SQL: DELETE FROM public.knowledge_chunks; then re-run ingest.",
    );
    process.exit(1);
  }
  console.log(`Cleared ${deletedCount ?? 0} existing knowledge chunk(s).`);

  type Row = DocumentChunk & { embedding: number[] };
  const pending: Row[] = [];

  async function flushBatch() {
    if (pending.length === 0) return;
    const batch = pending.splice(0, pending.length);
    const rows = batch.map((c) => ({
      url: c.url,
      title: c.title,
      section_title: c.section_title,
      content: c.content,
      page_type: c.page_type,
      slug: c.slug,
      priority_score: c.priority_score,
      content_hash: c.content_hash,
      embedding: c.embedding,
    }));

    const { error } = await supabase.from("knowledge_chunks").insert(rows);

    if (error) {
      console.error("Batch insert error:", error.message);
      for (const row of rows) {
        const { error: oneErr } = await supabase
          .from("knowledge_chunks")
          .insert(row);
        if (oneErr) {
          console.error("Row insert error:", oneErr.message);
          failures++;
        } else {
          chunksInserted++;
        }
      }
    } else {
      chunksInserted += batch.length;
    }
  }

  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i];

    const embedding = await generateEmbedding(chunk.content);
    if (!embedding || embedding.length !== dimensions) {
      failures++;
      continue;
    }

    pending.push({ ...chunk, embedding });
    if (pending.length >= UPSERT_BATCH) {
      await flushBatch();
    }
    await sleep(EMBED_DELAY_MS);
  }
  await flushBatch();

  console.log("\n====================================");
  console.log("         INGESTION COMPLETE         ");
  console.log("====================================");
  console.log(`Routes discovered : ${routesDiscovered}`);
  console.log(`Pages crawled     : ${pagesCrawled}`);
  console.log(`Chunks generated  : ${chunksGenerated}`);
  console.log(`Chunks inserted   : ${chunksInserted}`);
  console.log(`Skipped (hash)    : ${chunksSkipped}`);
  console.log(`Failures          : ${failures}`);
  console.log("====================================\n");
}

ingest().catch((e) => {
  console.error("Fatal ingest error:", e);
  process.exit(1);
});

import * as crypto from "crypto";
import { BLOG_POSTS } from "@/lib/blog/posts";

const TARGET_CHARS_MAX = 2000;
const OVERLAP_RATIO = 0.1;

export type BlogIngestChunk = {
  url: string;
  title: string;
  section_title: string;
  content: string;
  page_type: "blog";
  slug: string;
  priority_score: number;
  content_hash: string;
};

function hashContent(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
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

function pushSectionChunks(
  out: BlogIngestChunk[],
  url: string,
  pageTitle: string,
  slug: string,
  sectionTitle: string,
  text: string,
) {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length < 30) return;

  const pieces =
    trimmed.length > TARGET_CHARS_MAX
      ? splitWithOverlap(trimmed, TARGET_CHARS_MAX)
      : [trimmed];

  for (const piece of pieces) {
    const content = piece.trim();
    if (content.length < 30) continue;
    out.push({
      url,
      title: pageTitle,
      section_title: sectionTitle,
      content,
      page_type: "blog",
      slug,
      priority_score: url.endsWith("/blog") ? 0.68 : 0.65,
      content_hash: hashContent(`${url}|${sectionTitle}|${content}`),
    });
  }
}

/** Blog posts from repo (works when production has not deployed new slugs yet). */
export function getBlogIngestChunks(baseUrl: string): BlogIngestChunk[] {
  const origin = baseUrl.replace(/\/$/, "");
  const out: BlogIngestChunk[] = [];
  const seen = new Set<string>();

  const indexUrl = `${origin}/blog`;
  const indexLines = BLOG_POSTS.map(
    (p) => `${p.title}. ${p.description} (${p.readingMinutes} min read).`,
  );
  pushSectionChunks(
    out,
    indexUrl,
    "Blog",
    "blog",
    "Blog articles",
    indexLines.join("\n\n"),
  );

  for (const post of BLOG_POSTS) {
    const url = `${origin}/blog/${post.slug}`;
    pushSectionChunks(
      out,
      url,
      post.title,
      post.slug,
      post.description,
      post.description,
    );
    for (const section of post.sections) {
      pushSectionChunks(
        out,
        url,
        post.title,
        post.slug,
        section.heading,
        section.paragraphs.join("\n\n"),
      );
    }
  }

  return out.filter((c) => {
    if (seen.has(c.content_hash)) return false;
    seen.add(c.content_hash);
    return true;
  });
}

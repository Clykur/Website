/** RAG retrieval, re-ranking, and context packing. */

export type RagConfidenceBand = "strong" | "medium" | "weak";

export type KnowledgeChunkRow = {
  id: string;
  url: string;
  title: string;
  section_title?: string | null;
  content: string;
  page_type?: string | null;
  slug?: string | null;
  priority_score?: number | null;
  similarity: number;
};

type ScoredChunk = KnowledgeChunkRow & { finalScore: number };

export type RagRetrievalMode = "default" | "identity";

export type RagRetrievalResult = {
  topChunks: KnowledgeChunkRow[];
  confidenceScore: number;
  confidenceBand: RagConfidenceBand;
  sourcePages: string[];
  contextForLlm: string;
};

const STRONG_MIN = 0.78;
const MEDIUM_MIN = 0.6;
const RPC_THRESHOLD = 0.45;
const RPC_MATCH_COUNT = 12;
const LLM_CHUNK_LIMIT = 3;
const MAX_CHUNKS_PER_PAGE = 2;

const LEGAL_CAREERS_PATH =
  /\/careers|\/refund|privacy|terms|engagement|employment|compliance|security/i;

export function confidenceBandFromScore(score: number): RagConfidenceBand {
  if (score >= STRONG_MIN) return "strong";
  if (score >= MEDIUM_MIN) return "medium";
  return "weak";
}

function pathnameFromUrl(url: string): string {
  try {
    const p = new URL(url).pathname || url;
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  } catch {
    return url;
  }
}

function pageBoost(pathname: string): number {
  if (pathname === "/about") return 1.0;
  if (pathname === "/") return 0.9;
  if (pathname.startsWith("/services")) return 0.8;
  if (pathname.startsWith("/case-studies")) return 0.7;
  if (pathname.startsWith("/blog")) return 0.5;
  if (LEGAL_CAREERS_PATH.test(pathname)) return 0.2;
  if (pathname.startsWith("/careers")) return 0.2;
  return 0.55;
}

function allowChunkForQuestion(pathname: string, question: string): boolean {
  if (!LEGAL_CAREERS_PATH.test(pathname) && !pathname.startsWith("/careers")) {
    return true;
  }
  if (
    /\b(career|job|hiring|refund|chargeback|privacy|terms|legal|compliance|security policy)\b/i.test(
      question,
    )
  ) {
    return true;
  }
  return false;
}

function stripBoilerplateFromContent(text: string): string {
  return text
    .replace(/\b(explore|related pages?|suggested follow-ups?)\b/gi, "")
    .replace(/\b(all rights reserved|©\s*\d{4})\b/gi, "")
    .replace(/\b(contact us first|chargeback|reversal)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function compressParagraph(text: string): string {
  return stripBoilerplateFromContent(text)
    .replace(/(\. )+/g, ". ")
    .trim();
}

function nearDuplicate(a: string, b: string): boolean {
  const x = a.slice(0, 120).toLowerCase();
  const y = b.slice(0, 120).toLowerCase();
  return x.length > 40 && x === y;
}

function rerankRows(
  rows: KnowledgeChunkRow[],
  question: string,
): ScoredChunk[] {
  return rows
    .map((row) => {
      const path = pathnameFromUrl(row.url);
      const dbPriority = row.priority_score ?? 0;
      const boost = pageBoost(path);
      const finalScore = row.similarity + boost + dbPriority * 0.15;
      return { ...row, finalScore };
    })
    .filter((row) => allowChunkForQuestion(pathnameFromUrl(row.url), question))
    .sort((a, b) => b.finalScore - a.finalScore);
}

function groupByPageLimit(
  scored: ScoredChunk[],
  maxPerPage: number,
): KnowledgeChunkRow[] {
  const perPage = new Map<string, number>();
  const out: KnowledgeChunkRow[] = [];

  for (const row of scored) {
    const path = pathnameFromUrl(row.url);
    const count = perPage.get(path) ?? 0;
    if (count >= maxPerPage) continue;
    perPage.set(path, count + 1);
    out.push(row);
  }
  return out;
}

function selectChunksForContext(scored: ScoredChunk[]): KnowledgeChunkRow[] {
  const grouped = groupByPageLimit(scored, MAX_CHUNKS_PER_PAGE);
  const picked: KnowledgeChunkRow[] = [];
  const usedPages = new Set<string>();

  for (const row of grouped) {
    if (picked.length >= LLM_CHUNK_LIMIT) break;
    const path = pathnameFromUrl(row.url);
    if (usedPages.has(path) && picked.length >= 1) continue;
    if (picked.some((p) => nearDuplicate(p.content, row.content))) continue;
    picked.push(row);
    usedPages.add(path);
  }

  if (picked.length < LLM_CHUNK_LIMIT) {
    for (const row of grouped) {
      if (picked.length >= LLM_CHUNK_LIMIT) break;
      if (picked.some((p) => p.id === row.id)) continue;
      if (picked.some((p) => nearDuplicate(p.content, row.content))) continue;
      picked.push(row);
    }
  }

  return picked.slice(0, LLM_CHUNK_LIMIT);
}

export function buildContextFromChunks(chunks: KnowledgeChunkRow[]): {
  contextForLlm: string;
  sourcePages: string[];
} {
  const sourcePages = [
    ...new Set(chunks.map((c) => pathnameFromUrl(c.url))),
  ].slice(0, 6);

  const contextForLlm = chunks
    .map((c) => {
      const section = c.section_title ? ` | ${c.section_title}` : "";
      const body = compressParagraph(c.content);
      if (body.length < 25) return "";
      return `[${pathnameFromUrl(c.url)}${section}]\n${body}`;
    })
    .filter(Boolean)
    .join("\n\n");

  return { contextForLlm, sourcePages };
}

function filterIdentityPaths(rows: KnowledgeChunkRow[]): KnowledgeChunkRow[] {
  return rows.filter((row) => {
    const path = pathnameFromUrl(row.url);
    return path === "/about" || path === "/";
  });
}

export async function retrieveKnowledgeContext(input: {
  supabase: {
    rpc: (
      fn: string,
      args: Record<string, unknown>,
    ) => PromiseLike<{
      data: KnowledgeChunkRow[] | null;
      error: { message: string } | null;
    }>;
  };
  embedding: number[];
  userQuestion: string;
  mode?: RagRetrievalMode;
}): Promise<RagRetrievalResult> {
  const { data, error } = await input.supabase.rpc("match_knowledge_chunks", {
    query_embedding: input.embedding,
    match_threshold: RPC_THRESHOLD,
    match_count: RPC_MATCH_COUNT,
  });

  if (error) {
    throw new Error(`Supabase RPC error: ${error.message}`);
  }

  let rows = (data ?? []) as KnowledgeChunkRow[];

  if (input.mode === "identity") {
    rows = filterIdentityPaths(rows);
  }

  const reranked = rerankRows(rows, input.userQuestion);
  const topChunks = selectChunksForContext(reranked);
  const confidenceScore = reranked[0]?.finalScore ?? rows[0]?.similarity ?? 0;
  const confidenceBand = confidenceBandFromScore(
    topChunks[0]?.similarity ?? rows[0]?.similarity ?? 0,
  );
  const { contextForLlm, sourcePages } = buildContextFromChunks(topChunks);

  return {
    topChunks,
    confidenceScore,
    confidenceBand,
    sourcePages,
    contextForLlm,
  };
}

export { STRONG_MIN, MEDIUM_MIN, RPC_MATCH_COUNT, RPC_THRESHOLD };

/** RAG retrieval, confidence bands, and token-efficient context packing. */

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
const RPC_MATCH_COUNT = 5;
const LLM_CHUNK_LIMIT = 3;

export function confidenceBandFromScore(score: number): RagConfidenceBand {
  if (score >= STRONG_MIN) return "strong";
  if (score >= MEDIUM_MIN) return "medium";
  return "weak";
}

function pathnameFromUrl(url: string): string {
  try {
    return new URL(url).pathname || url;
  } catch {
    return url;
  }
}

function compressParagraph(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/(\. )+/g, ". ")
    .trim();
}

function dedupeChunksByPage(chunks: KnowledgeChunkRow[]): KnowledgeChunkRow[] {
  const seen = new Set<string>();
  const out: KnowledgeChunkRow[] = [];
  for (const c of chunks) {
    const key = `${pathnameFromUrl(c.url)}::${c.section_title ?? c.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(c);
  }
  return out;
}

export function buildContextFromChunks(chunks: KnowledgeChunkRow[]): {
  contextForLlm: string;
  sourcePages: string[];
} {
  const ranked = dedupeChunksByPage(chunks).slice(0, LLM_CHUNK_LIMIT);
  const sourcePages = [
    ...new Set(ranked.map((c) => pathnameFromUrl(c.url))),
  ].slice(0, 6);

  const contextForLlm = ranked
    .map((c) => {
      const section = c.section_title ? ` | ${c.section_title}` : "";
      const body = compressParagraph(c.content);
      return `[${pathnameFromUrl(c.url)}${section}]\n${body}`;
    })
    .join("\n\n");

  return { contextForLlm, sourcePages };
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
}): Promise<RagRetrievalResult> {
  const { data, error } = await input.supabase.rpc("match_knowledge_chunks", {
    query_embedding: input.embedding,
    match_threshold: RPC_THRESHOLD,
    match_count: RPC_MATCH_COUNT,
  });

  if (error) {
    throw new Error(`Supabase RPC error: ${error.message}`);
  }

  const rows = (data ?? []) as KnowledgeChunkRow[];
  const confidenceScore = rows[0]?.similarity ?? 0;
  const confidenceBand = confidenceBandFromScore(confidenceScore);
  const { contextForLlm, sourcePages } = buildContextFromChunks(rows);

  return {
    topChunks: rows,
    confidenceScore,
    confidenceBand,
    sourcePages,
    contextForLlm,
  };
}

export { STRONG_MIN, MEDIUM_MIN, RPC_MATCH_COUNT, RPC_THRESHOLD };

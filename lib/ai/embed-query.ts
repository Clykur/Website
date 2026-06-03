import { GoogleGenAI } from "@google/genai";

const CACHE_MAX = 256;
const CACHE_TTL_MS = 60 * 60 * 1000;

type CacheEntry = { embedding: number[]; at: number };

const cache = new Map<string, CacheEntry>();

function cacheKey(question: string): string {
  return question.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function embedUserQuestion(
  apiKey: string,
  question: string,
): Promise<number[] | null> {
  const key = cacheKey(question);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) {
    return hit.embedding;
  }

  try {
    const genAI = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "Accept-Encoding": "identity" } },
    });

    const embedResponse = await genAI.models.embedContent({
      model: "gemini-embedding-001",
      contents: question,
      config: { outputDimensionality: 768 },
    });

    const embedding = embedResponse.embeddings?.[0]?.values;
    if (!embedding?.length) return null;

    cache.set(key, { embedding, at: Date.now() });
    if (cache.size > CACHE_MAX) {
      const first = cache.keys().next().value;
      if (first) cache.delete(first);
    }
    return embedding;
  } catch (err) {
    console.error("[Chat API] Embedding error:", err);
    return null;
  }
}

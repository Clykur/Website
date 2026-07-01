type MemoryBucket = { timestamps: number[] };

/**
 * In-process sliding window limiter for when Upstash is missing or unreachable.
 * Bounded map size avoids OOM under IP-spray attacks on a single instance.
 */
export function memorySlidingRateLimit(
  store: Map<string, MemoryBucket>,
  key: string,
  limit: number,
  windowMs: number,
  maxKeys = 8_000,
): { success: boolean } {
  const now = Date.now();
  const bucket = store.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);
  if (bucket.timestamps.length >= limit) {
    store.set(key, bucket);
    return { success: false };
  }
  bucket.timestamps.push(now);
  store.set(key, bucket);
  if (store.size > maxKeys) {
    const oldest = store.keys().next().value;
    if (oldest) store.delete(oldest);
  }
  return { success: true };
}

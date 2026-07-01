import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/lib/env";
import { memorySlidingRateLimit } from "@/lib/security/memory-rate-limit";

const redis =
  env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const UPSTASH_TIMEOUT_MS = 2_500;

/** Default: 5 submissions per hour per key (contact, careers, etc.). */
const DEFAULT_HOURLY_LIMIT = 5;
const DEFAULT_WINDOW_MS = 3_600_000;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(DEFAULT_HOURLY_LIMIT, "1 h"),
      analytics: true,
      prefix: "clykur:forms",
    })
  : null;

const memoryStore = new Map<string, { timestamps: number[] }>();

async function limitWithUpstash(
  key: string,
): Promise<{ success: boolean } | null> {
  if (!ratelimit) return null;
  try {
    const result = await Promise.race([
      ratelimit.limit(key),
      new Promise<never>((_, reject) => {
        setTimeout(
          () => reject(new Error("upstash_timeout")),
          UPSTASH_TIMEOUT_MS,
        );
      }),
    ]);
    return { success: result.success };
  } catch (err) {
    console.warn(
      "[rate-limit] Upstash unavailable, using in-memory fallback:",
      err,
    );
    return null;
  }
}

export async function checkRateLimit(ip: string) {
  const key = ip.trim() || "unknown";
  const upstash = await limitWithUpstash(key);
  if (upstash) return upstash;

  if (process.env.NODE_ENV === "development" && !ratelimit) {
    console.warn(
      "Rate limiting uses in-memory fallback. Set UPSTASH_REDIS_REST_URL in production.",
    );
  }

  if (
    process.env.VERCEL === "1" &&
    process.env.NODE_ENV === "production" &&
    !ratelimit
  ) {
    console.error(
      "[rate-limit] UPSTASH is not set on Vercel. Limits are per serverless instance only; add Upstash via Project Settings → Storage for shared limits under load.",
    );
  }

  return memorySlidingRateLimit(
    memoryStore,
    key,
    DEFAULT_HOURLY_LIMIT,
    DEFAULT_WINDOW_MS,
  );
}

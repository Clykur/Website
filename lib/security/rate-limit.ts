import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/lib/env";

const redis =
  env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Allow 5 submissions per hour per IP
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      analytics: true,
    })
  : null;

export async function checkRateLimit(ip: string) {
  if (!ratelimit) {
    // If not configured, bypass rate limiting (warn in dev)
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ Rate limiting is disabled. UPSTASH_REDIS_REST_URL is not set.");
    }
    return { success: true };
  }

  return await ratelimit.limit(ip);
}

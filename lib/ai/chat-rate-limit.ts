import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { CHAT_SECURITY } from "@/lib/security/chat-config";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis =
  redisUrl && redisToken
    ? new Redis({ url: redisUrl, token: redisToken })
    : null;

function createLimiter(
  prefix: string,
  limit: number,
  window: `${number} s` | `${number} m` | `${number} h` | `${number} d`,
): Ratelimit | null {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: true,
    prefix: `clykur-chat:${prefix}`,
  });
}

const burstLimiter = createLimiter(
  "burst",
  CHAT_SECURITY.burstPerMinute,
  "60 s",
);
const hourlyLimiter = createLimiter("hourly", CHAT_SECURITY.hourlyPerIp, "1 h");
const llmDailyLimiter = createLimiter(
  "llm-daily",
  CHAT_SECURITY.llmDailyPerIp,
  "24 h",
);

type MemoryBucket = { timestamps: number[] };

const memoryBurst = new Map<string, MemoryBucket>();
const memoryHourly = new Map<string, MemoryBucket>();
const memoryLlmDaily = new Map<string, MemoryBucket>();

function memorySlidingLimit(
  store: Map<string, MemoryBucket>,
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const bucket = store.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);
  if (bucket.timestamps.length >= limit) {
    store.set(key, bucket);
    return false;
  }
  bucket.timestamps.push(now);
  store.set(key, bucket);
  if (store.size > 8000) {
    const oldest = store.keys().next().value;
    if (oldest) store.delete(oldest);
  }
  return true;
}

export type ChatRateLimitReason = "burst" | "hourly" | "llm_daily";

export type ChatRateLimitResult =
  | { ok: true; source: "upstash" | "memory" }
  | { ok: false; source: "upstash" | "memory"; reason: ChatRateLimitReason };

export function getChatClientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0]?.trim() || realIp?.trim() || "127.0.0.1";
  const session = req.headers.get("x-chat-session");
  if (session && /^[a-zA-Z0-9_-]{8,64}$/.test(session)) {
    return `${ip}:s:${session}`;
  }
  return `ip:${ip}`;
}

async function limitWithUpstash(
  limiter: Ratelimit | null,
  key: string,
): Promise<boolean | null> {
  if (!limiter) return null;
  const { success } = await limiter.limit(key);
  return success;
}

export async function limitChatRequest(
  clientKey: string,
): Promise<ChatRateLimitResult> {
  const burstUpstash = await limitWithUpstash(burstLimiter, clientKey);
  if (burstUpstash === false) {
    return { ok: false, source: "upstash", reason: "burst" };
  }
  const hourlyUpstash = await limitWithUpstash(hourlyLimiter, clientKey);
  if (hourlyUpstash === false) {
    return { ok: false, source: "upstash", reason: "hourly" };
  }
  if (burstUpstash === true && hourlyUpstash === true) {
    return { ok: true, source: "upstash" };
  }

  const burstOk = memorySlidingLimit(
    memoryBurst,
    clientKey,
    CHAT_SECURITY.memoryBurstPerMinute,
    60_000,
  );
  if (!burstOk) {
    return { ok: false, source: "memory", reason: "burst" };
  }
  const hourlyOk = memorySlidingLimit(
    memoryHourly,
    clientKey,
    CHAT_SECURITY.memoryHourlyPerIp,
    3_600_000,
  );
  if (!hourlyOk) {
    return { ok: false, source: "memory", reason: "hourly" };
  }
  return { ok: true, source: "memory" };
}

export async function limitChatLlmRequest(
  clientKey: string,
): Promise<ChatRateLimitResult> {
  const llmUpstash = await limitWithUpstash(
    llmDailyLimiter,
    `${clientKey}:llm`,
  );
  if (llmUpstash === false) {
    return { ok: false, source: "upstash", reason: "llm_daily" };
  }
  if (llmUpstash === true) {
    return { ok: true, source: "upstash" };
  }

  const ok = memorySlidingLimit(
    memoryLlmDaily,
    `${clientKey}:llm`,
    CHAT_SECURITY.llmDailyPerIp,
    86_400_000,
  );
  if (!ok) {
    return { ok: false, source: "memory", reason: "llm_daily" };
  }
  return { ok: true, source: "memory" };
}

export function rateLimitUserMessage(reason: ChatRateLimitReason): string {
  switch (reason) {
    case "burst":
      return "You are sending messages quickly. Please wait a moment, or browse [Services](/services) and [Contact](/contact).";
    case "hourly":
      return "You have reached the hourly chat limit. Please try again later or [contact us](/contact) directly.";
    case "llm_daily":
      return "Live assistant capacity is reached for today. Browse [Services](/services), [Products](/products), or [Contact](/contact).";
  }
}

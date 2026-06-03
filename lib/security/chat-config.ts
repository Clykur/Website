/** Chat API limits — override via env in production. */

function intEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const CHAT_SECURITY = {
  /** Messages per IP (or IP+session) per minute. */
  burstPerMinute: intEnv("CHAT_RATE_BURST_PER_MIN", 15),
  /** Total chat API calls per IP per hour. */
  hourlyPerIp: intEnv("CHAT_RATE_HOURLY", 80),
  /** Gemini chat generations per IP per day (expensive path only). */
  llmDailyPerIp: intEnv("CHAT_LLM_DAILY_PER_IP", 40),
  /** In-memory fallback when Upstash is not configured. */
  memoryBurstPerMinute: intEnv("CHAT_MEMORY_BURST_PER_MIN", 12),
  memoryHourlyPerIp: intEnv("CHAT_MEMORY_HOURLY", 45),
  maxMessagesInRequest: intEnv("CHAT_MAX_MESSAGES", 12),
  maxUserMessageChars: intEnv("CHAT_MAX_USER_CHARS", 1500),
  maxAssistantMessageChars: intEnv("CHAT_MAX_ASSISTANT_CHARS", 4000),
  /** Require browser Origin/Referer to match site (production default). */
  requireSameOrigin:
    process.env.CHAT_REQUIRE_SAME_ORIGIN !== "0" &&
    process.env.NODE_ENV === "production",
  /** When "1", valid Turnstile token required for LLM path (see widget). */
  requireTurnstile: process.env.CHAT_REQUIRE_TURNSTILE === "1",
} as const;

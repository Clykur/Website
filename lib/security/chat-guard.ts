import { z } from "zod";
import { CHAT_SECURITY } from "@/lib/security/chat-config";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  text: z.string().optional(),
  parts: z.array(z.object({ text: z.string().optional() })).optional(),
});

const BodySchema = z.object({
  messages: z
    .array(MessageSchema)
    .min(1)
    .max(CHAT_SECURITY.maxMessagesInRequest),
  id: z.string().max(128).optional(),
  turnstileToken: z.string().max(4096).optional(),
});

export type ParsedChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatBodyParseResult =
  | { ok: true; messages: ParsedChatMessage[]; turnstileToken?: string }
  | { ok: false; status: number; publicMessage: string };

const INJECTION_PATTERNS: RegExp[] = [
  /\bignore (all )?(previous|prior|above) instructions\b/i,
  /\bdisregard (your|the) (system|rules|instructions)\b/i,
  /\byou are now (a|an)\b/i,
  /\bact as (a|an) (unrestricted|jailbroken)\b/i,
  /\breveal (your|the) (system|hidden) prompt\b/i,
  /\bapi[_-]?key\b/i,
  /\bsystem\s*:\s*/i,
];

export function isAllowedChatOrigin(req: Request): boolean {
  if (!CHAT_SECURITY.requireSameOrigin) return true;

  const site = process.env.NEXT_PUBLIC_DOMAIN?.replace(/^https?:\/\//, "");
  if (!site) return true;

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const host = req.headers.get("host");

  const allowedHosts = new Set([
    site,
    `www.${site}`,
    `localhost:3000`,
    "127.0.0.1:3000",
  ]);

  if (host && allowedHosts.has(host)) {
    if (!origin && !referer) return true;
  }

  const checkUrl = (url: string | null): boolean => {
    if (!url) return false;
    try {
      const u = new URL(url);
      return allowedHosts.has(u.host);
    } catch {
      return false;
    }
  };

  if (checkUrl(origin) || checkUrl(referer)) return true;
  if (host && allowedHosts.has(host) && !origin) return true;

  return false;
}

export function parseChatRequestBody(body: unknown): ChatBodyParseResult {
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      publicMessage: "Invalid chat request.",
    };
  }

  const messages: ParsedChatMessage[] = [];
  for (const msg of parsed.data.messages) {
    const content = (
      msg.text ?? (msg.parts ? msg.parts.map((p) => p.text ?? "").join("") : "")
    ).trim();

    if (
      msg.role === "user" &&
      content.length > CHAT_SECURITY.maxUserMessageChars
    ) {
      return {
        ok: false,
        status: 400,
        publicMessage: "Message is too long. Please shorten and try again.",
      };
    }
    if (
      msg.role === "assistant" &&
      content.length > CHAT_SECURITY.maxAssistantMessageChars
    ) {
      return {
        ok: false,
        status: 400,
        publicMessage: "Invalid chat history.",
      };
    }

    messages.push({ role: msg.role, content });
  }

  const last = messages[messages.length - 1];
  if (!last || last.role !== "user" || !last.content) {
    return {
      ok: false,
      status: 400,
      publicMessage: "Send a user message to continue.",
    };
  }

  return {
    ok: true,
    messages,
    turnstileToken: parsed.data.turnstileToken,
  };
}

export function looksLikePromptInjection(text: string): boolean {
  const q = text.trim();
  if (!q) return false;
  return INJECTION_PATTERNS.some((re) => re.test(q));
}

/** Safe server log line (no full user text in production). */
export function formatChatLogLine(userQuestion: string): string {
  const q = userQuestion.trim();
  if (process.env.NODE_ENV === "development") {
    return `"${q.slice(0, 200)}${q.length > 200 ? "…" : ""}"`;
  }
  return `len=${q.length} hash=${hashString(q)}`;
}

function hashString(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

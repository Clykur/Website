import type { UIMessage } from "@ai-sdk/react";
import type { ChatMessageExtras, StoredChatState } from "@/lib/ai/chat-types";

const STATE_KEY = "clykur-chat-state";
const SESSION_ID_KEY = "clykur-chat-session-id";

export function hasPersistedChatState(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STATE_KEY) != null;
}
const LEGACY_MESSAGES_KEY = "clykur-chat-messages";
const SESSION_DISMISSED_KEY = "clykur-chat-dismissed-session";
const SESSION_AUTO_OPEN_KEY = "clykur-chat-auto-open-fired";
const MAX_MESSAGES = 5;

export function getChatSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

export function wasChatDismissedThisSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1";
}

export function markChatDismissedThisSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
}

export function clearChatDismissedThisSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_DISMISSED_KEY);
}

export function wasAutoOpenFiredThisSession(): boolean {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(SESSION_AUTO_OPEN_KEY) === "1";
}

export function markAutoOpenFiredThisSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_AUTO_OPEN_KEY, "1");
}

export function loadChatState(): StoredChatState {
  if (typeof window === "undefined") {
    return { messages: [], metaByMessageId: {} };
  }

  const raw = localStorage.getItem(STATE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as StoredChatState;
      return {
        messages: Array.isArray(parsed.messages) ? parsed.messages : [],
        metaByMessageId: parsed.metaByMessageId ?? {},
      };
    } catch {
      /* fall through */
    }
  }

  const legacy = localStorage.getItem(LEGACY_MESSAGES_KEY);
  if (legacy) {
    try {
      const messages = JSON.parse(legacy) as UIMessage[];
      localStorage.removeItem(LEGACY_MESSAGES_KEY);
      return { messages: trimMessages(messages), metaByMessageId: {} };
    } catch {
      /* empty */
    }
  }

  return { messages: [], metaByMessageId: {} };
}

export function trimMessages<T>(messages: T[]): T[] {
  return messages.slice(-MAX_MESSAGES);
}

export function saveChatState(input: {
  messages: UIMessage[];
  metaByMessageId: Record<string, ChatMessageExtras>;
}): void {
  if (typeof window === "undefined") return;
  const payload: StoredChatState = {
    messages: trimMessages(input.messages),
    metaByMessageId: input.metaByMessageId,
  };
  localStorage.setItem(STATE_KEY, JSON.stringify(payload));
}

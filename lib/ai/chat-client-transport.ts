"use client";

import { DefaultChatTransport } from "ai";
import type { UIMessage } from "@ai-sdk/react";
import { getChatSessionId } from "@/lib/ai/chat-storage";

let chatTurnstileToken: string | null = null;

export function setChatTurnstileToken(token: string | null) {
  chatTurnstileToken = token;
}

export const clykurChatTransport = new DefaultChatTransport({
  api: "/api/chat",
  headers: () => ({
    "x-chat-session": getChatSessionId(),
  }),
  prepareSendMessagesRequest: ({ messages, body, headers }) => ({
    headers,
    body: {
      ...body,
      messages: messages as UIMessage[],
      turnstileToken: chatTurnstileToken ?? undefined,
    },
  }),
});

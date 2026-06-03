"use client";

import type { RefObject } from "react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "@ai-sdk/react";
import { getChatSessionId } from "@/lib/ai/chat-storage";

export function createClykurChatTransport(options: {
  turnstileTokenRef: RefObject<string | null>;
}) {
  return new DefaultChatTransport({
    api: "/api/chat",
    headers: () => ({
      "x-chat-session": getChatSessionId(),
    }),
    prepareSendMessagesRequest: ({ messages, body, headers }) => ({
      headers,
      body: {
        ...body,
        messages: messages as UIMessage[],
        turnstileToken: options.turnstileTokenRef.current ?? undefined,
      },
    }),
  });
}

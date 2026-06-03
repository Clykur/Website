import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { sanitizeAssistantCopy } from "@/lib/ai/chat-scope";

/** Stream-shaped response so useChat / DefaultChatTransport never choke on plain text. */
export function staticAssistantUIMessageResponse(text: string): Response {
  const body = sanitizeAssistantCopy(text);
  const messageId = crypto.randomUUID();

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      execute: ({ writer }) => {
        writer.write({ type: "text-start", id: messageId });
        writer.write({ type: "text-delta", id: messageId, delta: body });
        writer.write({ type: "text-end", id: messageId });
      },
    }),
  });
}

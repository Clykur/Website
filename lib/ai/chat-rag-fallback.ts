import { sanitizeAssistantCopy } from "@/lib/ai/chat-scope";
import { buildExtrasForTopic } from "@/lib/ai/chat-response-extras";
import type { ChatMessageExtras } from "@/lib/ai/chat-types";

export function getLlmUnavailableReply(): {
  text: string;
  extras: ChatMessageExtras;
} {
  const text = sanitizeAssistantCopy(
    `Our assistant is at capacity for live replies right now. You can still browse:

• [Services](/services)
• [Products](/products)
• [About Clykur](/about)
• [Contact](/contact)`,
  );
  return {
    text,
    extras: buildExtrasForTopic({
      userQuestion: "contact",
      assistantText: text,
      sourcePages: ["/contact"],
    }),
  };
}

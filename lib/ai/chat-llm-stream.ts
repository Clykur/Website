import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type ModelMessage,
} from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { markGeminiFailure } from "@/lib/ai/gemini-circuit";
import { sanitizeAssistantCopy } from "@/lib/ai/chat-scope";

const CHAT_MODEL =
  process.env.GOOGLE_GENERATIVE_AI_CHAT_MODEL?.trim() ||
  "gemini-2.5-flash-lite";

export function createChatGoogleProvider(apiKey: string) {
  return createGoogleGenerativeAI({
    apiKey,
    headers: { "Accept-Encoding": "identity" },
  });
}

export function streamChatLlmResponse(input: {
  apiKey: string;
  system: string;
  messages: ModelMessage[];
  fallbackText: string;
}): Response {
  const google = createChatGoogleProvider(input.apiKey);
  const messageId = crypto.randomUUID();
  const fallback = sanitizeAssistantCopy(input.fallbackText);

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      execute: async ({ writer }) => {
        writer.write({ type: "text-start", id: messageId });
        try {
          const result = streamText({
            model: google(CHAT_MODEL),
            system: input.system,
            messages: input.messages,
            maxRetries: 0,
          });

          for await (const delta of result.textStream) {
            writer.write({ type: "text-delta", id: messageId, delta });
          }
        } catch (err) {
          markGeminiFailure(err);
          console.error("[Chat API] LLM stream error:", err);
          writer.write({ type: "text-delta", id: messageId, delta: fallback });
        }
        writer.write({ type: "text-end", id: messageId });
      },
    }),
  });
}

import { buildSystemPrompt } from "@/lib/ai/chat-prompts";
import { resolveChatTurn } from "@/lib/ai/chat-turn";
import { staticAssistantUIMessageResponse } from "@/lib/ai/chat-stream-response";
import { embedUserQuestion } from "@/lib/ai/embed-query";
import { isGeminiCircuitOpen } from "@/lib/ai/gemini-circuit";
import {
  getIdentityCanonicalResponse,
  isClykurIdentityQuestion,
} from "@/lib/ai/chat-identity";
import { getLlmUnavailableReply } from "@/lib/ai/chat-rag-fallback";
import {
  getLowConfidenceHelpReply,
  shouldUseLlmAfterRag,
} from "@/lib/ai/chat-pre-llm";
import { streamChatLlmResponse } from "@/lib/ai/chat-llm-stream";
import {
  getChatClientKey,
  limitChatLlmRequest,
  limitChatRequest,
  rateLimitUserMessage,
} from "@/lib/ai/chat-rate-limit";
import { retrieveKnowledgeContext } from "@/lib/ai/rag-retrieval";
import { sanitizeAssistantCopy } from "@/lib/ai/chat-scope";
import { CHAT_SECURITY } from "@/lib/security/chat-config";
import {
  formatChatLogLine,
  isAllowedChatOrigin,
  looksLikePromptInjection,
  parseChatRequestBody,
} from "@/lib/security/chat-guard";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

export const maxDuration = 30;
export const runtime = "nodejs";

export async function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}

export async function POST(req: Request) {
  try {
    if (!isAllowedChatOrigin(req)) {
      return new Response("Forbidden", { status: 403 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("[Chat API] Missing GOOGLE_GENERATIVE_AI_API_KEY");
      return new Response("API configuration error", { status: 500 });
    }

    const clientKey = getChatClientKey(req);
    const rate = await limitChatRequest(clientKey);
    if (!rate.ok) {
      return staticAssistantUIMessageResponse(
        sanitizeAssistantCopy(rateLimitUserMessage(rate.reason)),
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    const parsed = parseChatRequestBody(body);
    if (!parsed.ok) {
      return staticAssistantUIMessageResponse(
        sanitizeAssistantCopy(parsed.publicMessage),
      );
    }

    const coreMessages = parsed.messages;
    const latestMessage = coreMessages[coreMessages.length - 1];
    const userQuestion = latestMessage.content;
    console.log(`[Chat API] User: ${formatChatLogLine(userQuestion)}`);

    if (looksLikePromptInjection(userQuestion)) {
      return staticAssistantUIMessageResponse(
        sanitizeAssistantCopy(
          "I can only answer questions about Clykur. Try [Services](/services), [Products](/products), or [Contact](/contact).",
        ),
      );
    }

    if (userQuestion.trim()) {
      const turn = resolveChatTurn(userQuestion);
      if (turn?.mode === "off_topic" || turn?.mode === "canonical") {
        return staticAssistantUIMessageResponse(turn.text);
      }
    }

    let rag = null as Awaited<
      ReturnType<typeof retrieveKnowledgeContext>
    > | null;

    if (userQuestion.trim()) {
      try {
        const embedding = await embedUserQuestion(apiKey, userQuestion);
        if (embedding) {
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
          const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
          if (supabaseUrl && supabaseKey) {
            const { createClient } = await import("@supabase/supabase-js");
            const supabase = createClient(supabaseUrl, supabaseKey);
            rag = await retrieveKnowledgeContext({
              supabase,
              embedding,
              userQuestion,
              mode: isClykurIdentityQuestion(userQuestion) ? "identity" : "default",
            });
            console.log(
              `[Chat API] RAG band=${rag.confidenceBand} score=${rag.confidenceScore.toFixed(4)} chunks=${rag.topChunks.length} pages=${rag.sourcePages.join(",")}`,
            );
          }
        }
      } catch (err) {
        console.error("[Chat API] RAG retrieval error:", err);
      }
    }

    const confidenceBand = rag?.confidenceBand ?? "weak";
    const contextStr = rag?.contextForLlm ?? "";
    const sourcePages = rag?.sourcePages ?? [];

    if (rag && userQuestion.trim()) {
      if (!shouldUseLlmAfterRag(userQuestion, rag)) {
        const low = getLowConfidenceHelpReply();
        return staticAssistantUIMessageResponse(low.text);
      }
    }

    if (isGeminiCircuitOpen()) {
      if (isClykurIdentityQuestion(userQuestion)) {
        return staticAssistantUIMessageResponse(
          getIdentityCanonicalResponse().text,
        );
      }
      const busy = getLlmUnavailableReply();
      return staticAssistantUIMessageResponse(busy.text);
    }

    if (CHAT_SECURITY.requireTurnstile) {
      const token = parsed.turnstileToken;
      if (!token || !(await verifyTurnstileToken(token))) {
        return staticAssistantUIMessageResponse(
          sanitizeAssistantCopy(
            "Please verify you are human (refresh the chat panel) or use [Contact](/contact).",
          ),
        );
      }
    } else if (parsed.turnstileToken) {
      await verifyTurnstileToken(parsed.turnstileToken);
    }

    const llmRate = await limitChatLlmRequest(clientKey);
    if (!llmRate.ok) {
      if (isClykurIdentityQuestion(userQuestion)) {
        return staticAssistantUIMessageResponse(
          getIdentityCanonicalResponse().text,
        );
      }
      return staticAssistantUIMessageResponse(
        sanitizeAssistantCopy(rateLimitUserMessage(llmRate.reason)),
      );
    }

    const systemPrompt = buildSystemPrompt({
      confidenceBand,
      contextStr,
      sourcePages,
    });

    const fallback = isClykurIdentityQuestion(userQuestion)
      ? getIdentityCanonicalResponse().text
      : getLlmUnavailableReply().text;

    return streamChatLlmResponse({
      apiKey,
      system: systemPrompt,
      messages: coreMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      fallbackText: fallback,
    });
  } catch (error) {
    console.error("[Chat API] Internal Error:", error);
    return staticAssistantUIMessageResponse(
      sanitizeAssistantCopy(
        "Sorry, I am having trouble responding right now. Try our [services](/services) or [contact](/contact) page.",
      ),
    );
  }
}

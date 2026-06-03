import {
  getOffTopicExtras,
  OFF_TOPIC_REPLY,
  sanitizeAssistantCopy,
} from "@/lib/ai/chat-scope";
import { getDefaultAssistantExtras } from "@/lib/ai/chat-suggestions";
import type { ChatMessageExtras } from "@/lib/ai/chat-types";
import type { RagRetrievalResult } from "@/lib/ai/rag-retrieval";

const CLYKUR_INTENT =
  /\b(clykur|cusown|freetrust|service|product|mvp|web dev|mobile|case stud|portfolio|client work|contact|pricing|quote|discovery|project|engineer|software|design|ui\/ux|faq|about|career|hire|team|process|industr|blog|work with)\b/i;

const GREETING =
  /^(hi|hey|hello|howdy|yo)(\s+(there|good\s+(morning|afternoon|evening)|morning|afternoon|evening))?\s*[!?.]*$/i;

const CHITCHAT =
  /\b(i love you|love u|marry me|are you single|date me|you'?re cute|tell me a joke|sing a song)\b/i;

const COMMON_WORD =
  /\b(the|and|what|how|who|where|when|why|can|do|does|is|are|you|your|our|we|help|please|thanks|thank)\b/i;

export type PreLlmTurn =
  | { mode: "off_topic"; text: string; extras: ChatMessageExtras }
  | { mode: "canonical"; text: string; extras: ChatMessageExtras };

export function isLikelyClykurQuestion(message: string): boolean {
  const q = message.trim();
  if (!q) return false;
  if (CLYKUR_INTENT.test(q)) return true;
  if (/\?/.test(q) && q.length >= 12 && COMMON_WORD.test(q)) return true;
  return false;
}

export function isLikelyGibberish(message: string): boolean {
  const q = message.trim();
  if (q.length < 4) return false;
  if (CLYKUR_INTENT.test(q) || COMMON_WORD.test(q)) return false;
  if (/\s/.test(q) && q.length > 8) return false;

  const letters = q.replace(/[^a-zA-Z]/g, "");
  if (letters.length < 4) return false;

  const vowels = (letters.match(/[aeiouAEIOU]/g) ?? []).length;
  const vowelRatio = vowels / letters.length;
  if (vowelRatio >= 0.28) return false;

  if (/^[a-zA-Z]{4,12}$/.test(q) && vowelRatio < 0.22) return true;
  if (!/\s/.test(q) && letters.length >= 6 && vowelRatio < 0.25) return true;

  return false;
}

export function resolvePreLlmTurn(message: string): PreLlmTurn | null {
  const trimmed = message.trim();
  if (!trimmed) return null;

  if (GREETING.test(trimmed)) {
    return {
      mode: "canonical",
      text: sanitizeAssistantCopy(
        `Good to meet you. I am the Clykur Assistant — ask about our **services**, **products** (Cusown, FreeTrust), **case studies**, or [starting a project](/contact).`,
      ),
      extras: getDefaultAssistantExtras(),
    };
  }

  if (CHITCHAT.test(trimmed)) {
    return {
      mode: "canonical",
      text: sanitizeAssistantCopy(
        `I appreciate the chat — I am here for Clykur questions only. Try **What services do you offer?** or [Contact](/contact) to talk with our team.`,
      ),
      extras: getDefaultAssistantExtras(),
    };
  }

  if (isLikelyGibberish(trimmed)) {
    return {
      mode: "off_topic",
      text: OFF_TOPIC_REPLY,
      extras: getOffTopicExtras(),
    };
  }

  return null;
}

/** Always synthesize with LLM — never dump raw chunks (low confidence included). */
export function shouldUseLlmAfterRag(
  message: string,
  rag: RagRetrievalResult,
): boolean {
  void rag;
  if (isLikelyGibberish(message)) return false;
  if (!isLikelyClykurQuestion(message) && rag.confidenceBand === "weak") {
    return (rag.topChunks[0]?.similarity ?? 0) >= 0.52;
  }
  return isLikelyClykurQuestion(message) || rag.confidenceScore > 0;
}

export function getLowConfidenceHelpReply(): {
  text: string;
  extras: ChatMessageExtras;
} {
  return {
    text: sanitizeAssistantCopy(
      `I am not sure I understood that. I can help with Clykur **services**, **products**, **case studies**, and **contact**.

• [Services](/services)
• [Products](/products)
• [Start a project](/contact)`,
    ),
    extras: getOffTopicExtras(),
  };
}

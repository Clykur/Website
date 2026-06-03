import {
  getOffTopicExtras,
  OFF_TOPIC_REPLY,
  shouldRefuseOutsideClykur,
} from "@/lib/ai/chat-scope";
import {
  getSocialCanonicalChatResponse,
  isClykurSocialQuestion,
} from "@/lib/ai/chat-grounding";
import {
  getIdentityCanonicalResponse,
  isClykurIdentityQuestion,
} from "@/lib/ai/chat-identity";
import { resolvePreLlmTurn } from "@/lib/ai/chat-pre-llm";
import type { ChatMessageExtras } from "@/lib/ai/chat-types";

export type ChatTurnResult =
  | {
      mode: "off_topic";
      text: string;
      extras: ChatMessageExtras;
    }
  | {
      mode: "canonical";
      text: string;
      extras: ChatMessageExtras;
    }
  | {
      mode: "llm";
    };

export function resolveChatTurn(message: string): ChatTurnResult | null {
  const trimmed = message.trim();
  if (!trimmed) return null;

  const pre = resolvePreLlmTurn(trimmed);
  if (pre) {
    return {
      mode: pre.mode,
      text: pre.text,
      extras: pre.extras,
    };
  }

  if (shouldRefuseOutsideClykur(trimmed)) {
    return {
      mode: "off_topic",
      text: OFF_TOPIC_REPLY,
      extras: getOffTopicExtras(),
    };
  }

  if (isClykurSocialQuestion(trimmed)) {
    const social = getSocialCanonicalChatResponse();
    return {
      mode: "canonical",
      text: social.text,
      extras: social.extras,
    };
  }

  if (isClykurIdentityQuestion(trimmed)) {
    const identity = getIdentityCanonicalResponse();
    return {
      mode: "canonical",
      text: identity.text,
      extras: identity.extras,
    };
  }

  return { mode: "llm" };
}

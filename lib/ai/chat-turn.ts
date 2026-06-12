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
  getBlogListCanonicalResponse,
  getDiscoveryCallCanonicalResponse,
  getLeadershipCanonicalResponse,
  isBlogListQuestion,
  isDiscoveryCallQuestion,
  isLeadershipQuestion,
} from "@/lib/ai/chat-canonical-site";
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

  if (isBlogListQuestion(trimmed)) {
    const blog = getBlogListCanonicalResponse();
    return {
      mode: "canonical",
      text: blog.text,
      extras: blog.extras,
    };
  }

  if (isLeadershipQuestion(trimmed)) {
    const leaders = getLeadershipCanonicalResponse();
    return {
      mode: "canonical",
      text: leaders.text,
      extras: leaders.extras,
    };
  }

  if (isDiscoveryCallQuestion(trimmed)) {
    const call = getDiscoveryCallCanonicalResponse();
    return {
      mode: "canonical",
      text: call.text,
      extras: call.extras,
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

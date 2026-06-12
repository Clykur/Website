/** Clykur company identity, canonical answers and retrieval hints. */

import { ABOUT_HUB } from "@/lib/seo/hubs";
import { sanitizeAssistantCopy } from "@/lib/ai/chat-scope";
import type { ChatMessageExtras } from "@/lib/ai/chat-types";
import { buildExtrasForTopic } from "@/lib/ai/chat-response-extras";

const IDENTITY =
  /^(who|what)\s+(is|are)\s+(clykur|you)\b|^(tell me about|describe)\s+clykur\b|^about\s+clykur\b|^(who|what)\s+are\s+you\b/i;

export function isClykurIdentityQuestion(message: string): boolean {
  const q = message.trim();
  if (!q) return false;
  if (IDENTITY.test(q)) return true;
  if (/^what is clykur\??$/i.test(q)) return true;
  if (/^who is clykur\??$/i.test(q)) return true;
  return false;
}

/** Injected into LLM system prompt when retrieval is weak. */
export function getClykurAboutSummaryHint(): string {
  const lede = ABOUT_HUB.lede;
  const what = ABOUT_HUB.sections[0]?.paragraphs.join(" ") ?? "";
  return sanitizeAssistantCopy(
    `COMPANY SUMMARY (use when context is thin): ${ABOUT_HUB.description} ${lede} ${what}`,
  );
}

export function getIdentityCanonicalResponse(): {
  text: string;
  extras: ChatMessageExtras;
} {
  const p1 = ABOUT_HUB.sections[0]?.paragraphs[0] ?? ABOUT_HUB.description;
  const p2 = ABOUT_HUB.sections[0]?.paragraphs[1] ?? ABOUT_HUB.lede;

  const text = sanitizeAssistantCopy(
    `**Clykur** is a software product company and engineering partner.

${p1}

${p2}

Learn more on our [About](/about) page, explore [Services](/services), or [start a project](/contact).`,
  );

  return {
    text,
    extras: buildExtrasForTopic({
      userQuestion: "what is clykur",
      assistantText: text,
      sourcePages: ["/about"],
    }),
  };
}

/** Text stored in knowledge base for identity-style embedding matches. */
export function getCanonicalAboutIngestContent(baseUrl: string): {
  url: string;
  title: string;
  section_title: string;
  content: string;
  page_type: "page";
  slug: string;
  priority_score: number;
} {
  const what = ABOUT_HUB.sections[0]?.paragraphs.join("\n\n") ?? "";
  return {
    url: `${baseUrl.replace(/\/$/, "")}/about`,
    title: "About Clykur",
    section_title: "About Clykur (canonical)",
    content: [
      "what is clykur",
      "who is clykur",
      "who are you",
      "about company",
      "describe clykur",
      "tell me about clykur",
      ABOUT_HUB.description,
      ABOUT_HUB.lede,
      what,
      "Founders: Chandu Kalluru (Founder), Karthik Naramala (Co-founder).",
    ].join("\n\n"),
    page_type: "page",
    slug: "about",
    priority_score: 1,
  };
}

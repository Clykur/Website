import { buildAiAnswers } from "@/lib/seo/ai-answers";
import type { SeoFaqItem, SeoLandingPage } from "@/lib/seo/types";

function normalizeQuestion(q: string): string {
  return q.toLowerCase().replace(/\s+/g, " ").replace(/[?.!]/g, "").trim();
}

/** Merges Quick-answer style blocks into FAQ without duplicate questions (SEO text preserved). */
export function mergePageFaqs(page: SeoLandingPage): SeoFaqItem[] {
  const ai = buildAiAnswers(page);
  const merged: SeoFaqItem[] = [];
  const seen = new Set<string>();

  for (const item of [...ai, ...page.faqs]) {
    const key = normalizeQuestion(item.question);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }

  return merged;
}

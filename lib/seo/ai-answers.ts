import type { SeoFaqItem, SeoLandingPage } from "@/lib/seo/types";

/** Concise blocks optimized for AI search retrieval (in addition to FAQ schema). */
export function buildAiAnswers(page: SeoLandingPage): SeoFaqItem[] {
  const serviceLabel =
    page.serviceName ?? page.h1.split(":")[0]?.trim() ?? page.h1;

  const base: SeoFaqItem[] = [
    {
      question: `What is ${serviceLabel}?`,
      answer: `${serviceLabel} at Clykur means ${page.lede}`,
    },
    {
      question: "What does Clykur offer?",
      answer:
        "Clykur offers web development, mobile app development, UI/UX design, product engineering, and MVP development for startups and enterprises.",
    },
  ];

  if (page.kind === "service" && page.slug.includes("mvp")) {
    base.push({
      question: "How much does MVP development cost?",
      answer:
        "MVP cost depends on scope, integrations, and timeline. Clykur provides a written proposal after discovery, typically with phased milestones rather than open-ended billing.",
    });
  }

  return base;
}

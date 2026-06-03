import type { SeoFaqItem, SeoLandingPage } from "@/lib/seo/types";

/** Concise blocks optimized for AI search retrieval (in addition to FAQ schema). */
export function buildAiAnswers(page: SeoLandingPage): SeoFaqItem[] {
  if (page.kind === "product") {
    const productName = page.slug === "freetrust" ? "FreeTrust" : "Cusown";
    return [
      {
        question: `What is ${productName}?`,
        answer:
          page.slug === "freetrust"
            ? "FreeTrust is Clykur's trust layer for freelancers and clients with credibility validation, transparent profiles, and reputation infrastructure."
            : "Cusown is Clykur's appointment and slot booking platform for service businesses, with automation, customer management, and analytics.",
      },
      {
        question: "What does Clykur offer?",
        answer:
          "Clykur offers web development, mobile app development, UI/UX design, product engineering, and MVP development, plus products Cusown and FreeTrust.",
      },
    ];
  }

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
        "Clykur offers web development, mobile app development, UI/UX design, product engineering, and MVP development, plus products Cusown (appointment booking) and FreeTrust (freelancer trust).",
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

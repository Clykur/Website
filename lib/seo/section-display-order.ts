import type { SeoContentSection, SeoLandingPage } from "@/lib/seo/types";

const SERVICE_SECTION_ORDER = [
  "who-for",
  "overview",
  "benefits",
  "process",
  "deliverables",
  "technologies",
  "outcomes",
  "why-clykur",
] as const;

/** Short labels for the on-page nav (matches scroll order, easier to scan). */
const SECTION_NAV_LABELS: Record<string, string> = {
  "who-for": "Who it's for",
  overview: "Overview",
  benefits: "Benefits",
  process: "Our process",
  deliverables: "Deliverables",
  technologies: "Technologies",
  outcomes: "Outcomes",
  "why-clykur": "Why Clykur",
};

function sectionNavLabel(section: SeoContentSection): string {
  return SECTION_NAV_LABELS[section.id] ?? section.title;
}

function sortSections(
  sections: SeoContentSection[],
  order: readonly string[],
): SeoContentSection[] {
  const rank = new Map(order.map((id, i) => [id, i]));
  return [...sections].sort((a, b) => {
    const ra = rank.get(a.id) ?? 999;
    const rb = rank.get(b.id) ?? 999;
    return ra - rb;
  });
}

export function getOrderedSections(page: SeoLandingPage): {
  primary: SeoContentSection[];
  tertiary: SeoContentSection[];
} {
  const sorted =
    page.kind === "service"
      ? sortSections(page.sections, SERVICE_SECTION_ORDER)
      : page.sections;

  if (page.kind !== "service") {
    return { primary: sorted, tertiary: [] };
  }

  const primaryIds = new Set([
    "who-for",
    "overview",
    "benefits",
    "process",
    "technologies",
  ]);
  const tertiaryIds = new Set(["deliverables", "outcomes", "why-clykur"]);

  return {
    primary: sorted.filter((s) => primaryIds.has(s.id)),
    tertiary: sorted.filter((s) => tertiaryIds.has(s.id)),
  };
}

/** TOC order mirrors `SeoLandingPageView` DOM order (top → bottom). */
export function getOnPageNavItems(
  page: SeoLandingPage,
): { id: string; label: string }[] {
  const { primary, tertiary } = getOrderedSections(page);
  const items: { id: string; label: string }[] = [];

  for (const section of primary) {
    items.push({
      id: `section-${section.id}`,
      label: sectionNavLabel(section),
    });
  }

  if (page.caseStudy) {
    items.push({ id: "case-study-heading", label: "Case study" });
  }

  items.push({ id: "seo-cta-mid", label: "Start a project" });

  for (const section of tertiary) {
    items.push({
      id: `section-${section.id}`,
      label: sectionNavLabel(section),
    });
  }

  items.push({ id: "related-links-heading", label: "Related pages" });
  items.push({ id: "seo-faq-heading", label: "FAQ" });
  items.push({ id: "seo-cta-heading", label: "Contact" });

  return items;
}

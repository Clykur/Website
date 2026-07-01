export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudy = {
  title: string;
  slug: string;
  client: string;
  industry: string;
  services: string[];
  serviceSlugs: string[];
  technologies: string[];
  challenge: string;
  solution: string;
  implementation: string[];
  results: string;
  metrics: CaseStudyMetric[];
  testimonial?: {
    quote: string;
    attribution: string;
  };
  projectUrl?: string;
  featuredImage: string;
  featuredImageAlt: string;
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
  datePublished: string;
};

const SERVICE_PATH: Record<string, string> = {
  "web-development": "/services/web-development",
  "product-engineering": "/services/product-engineering",
  "ui-ux-design": "/services/ui-ux-design",
  "mvp-development": "/services/mvp-development",
  "mobile-app-development": "/services/mobile-app-development",
};

export function getServiceHref(slug: string): string {
  return SERVICE_PATH[slug] ?? "/services";
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Enterprise SaaS design system rollout",
    slug: "enterprise-saas-design-system",
    client: "Enterprise SaaS (NDA)",
    industry: "SaaS",
    services: ["Web development", "Product engineering", "UI/UX design"],
    serviceSlugs: ["web-development", "product-engineering", "ui-ux-design"],
    technologies: [
      "React",
      "TypeScript",
      "Storybook",
      "Tailwind CSS",
      "Next.js",
    ],
    challenge:
      "A multi-surface design system had to become a scalable React application without blocking feature squads or introducing visual drift across the product.",
    solution:
      "Clykur introduced a token-backed component library, phased migration behind feature flags, and visual regression on revenue-critical flows.",
    implementation: [
      "Audited Figma libraries and mapped components to a prioritized build order.",
      "Shipped foundational primitives and layout shells with documented usage.",
      "Migrated high-traffic surfaces incrementally with QA sign-off per release.",
      "Established Storybook and acceptance criteria tied to WCAG-oriented patterns.",
    ],
    results:
      "Teams shipped new UI faster with fewer review cycles, and stakeholders saw consistent branding across web surfaces.",
    metrics: [
      { label: "UI delivery speed", value: "~40% faster feature UI" },
      { label: "Surfaces unified", value: "Core product + marketing" },
      { label: "Regression coverage", value: "Critical flows automated" },
    ],
    testimonial: {
      quote:
        "We finally had a system our engineers could extend without reinventing buttons every sprint.",
      attribution: "Product engineering lead",
    },
    featuredImage: "/client-works/greylabs-ai.webp",
    featuredImageAlt: "Enterprise SaaS interface rollout by Clykur",
    featured: true,
    seoTitle: "Enterprise SaaS Design System Case Study | Clykur",
    seoDescription:
      "How Clykur rolled out a scalable React design system for an enterprise SaaS product with faster delivery and consistent UI.",
    datePublished: "2025-11-01",
  },
  {
    title: "E-commerce marketplace frontend",
    slug: "ecommerce-marketplace-frontend",
    client: "Marketplace brand (NDA)",
    industry: "Retail",
    services: ["Web development", "UI/UX design"],
    serviceSlugs: ["web-development", "ui-ux-design"],
    technologies: [
      "Next.js",
      "React",
      "Image optimization",
      "Accessibility testing",
    ],
    challenge:
      "High-traffic catalog, filters, and checkout needed pixel fidelity, fast LCP, and accessible patterns under real launch load.",
    solution:
      "Responsive component architecture, optimized media pipelines, and checkout flows validated against accessibility checkpoints.",
    implementation: [
      "Built listing, filter, and PDP components aligned to the approved design system.",
      "Tuned image delivery and lazy loading for catalog performance.",
      "Ran keyboard and screen-reader passes on checkout before go-live.",
      "Load-tested critical paths ahead of the marketing launch window.",
    ],
    results:
      "The storefront held up under launch traffic with smooth UX on mobile and desktop.",
    metrics: [
      { label: "Launch traffic", value: "Stable under peak load" },
      { label: "Checkout", value: "WCAG-oriented patterns" },
      { label: "Media", value: "AVIF/WebP delivery" },
    ],
    featuredImage: "/client-works/elevatum.webp",
    featuredImageAlt: "E-commerce marketplace frontend case study",
    featured: true,
    seoTitle: "E-commerce Marketplace Frontend Case Study | Clykur",
    seoDescription:
      "Clykur delivered a high-performance marketplace frontend with accessible checkout and launch-ready performance.",
    datePublished: "2025-10-15",
  },
  {
    title: "Yogisthaan Cafe digital experience",
    slug: "yogisthaan-cafe-website",
    client: "Yogisthaan Cafe",
    industry: "Hospitality",
    services: ["Web development", "UI/UX design"],
    serviceSlugs: ["web-development", "ui-ux-design"],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    challenge:
      "The cafe needed a calm, premium web presence that communicated sanctuary and wellness while staying fast on mobile.",
    solution:
      "A narrative-led marketing site with strong typography, photography hierarchy, and performance-tuned delivery.",
    implementation: [
      "Translated brand mood into layout, spacing, and motion restraint.",
      "Built responsive pages for menu, story, and visit information.",
      "Integrated analytics-ready structure for future campaigns.",
      "Deployed on a reliable edge-friendly hosting stack.",
    ],
    results:
      "A live site that matches the in-store experience and supports discovery from search and social.",
    metrics: [
      { label: "Delivery", value: "Production launch" },
      { label: "Focus", value: "Mobile-first UX" },
      { label: "Brand", value: "Wellness positioning" },
    ],
    projectUrl: "https://yogisthaancafe.clykur.com",
    featuredImage: "/client-works/yogisthaan-cafe.webp",
    featuredImageAlt: "Yogisthaan Cafe website hero",
    featured: true,
    seoTitle: "Yogisthaan Cafe Website Case Study | Clykur",
    seoDescription:
      "Clykur designed and built the Yogisthaan Cafe marketing website for hospitality and wellness branding.",
    datePublished: "2025-07-12",
  },
  {
    title: "Live collaboration workspace",
    slug: "live-collaboration-workspace",
    client: "Collaboration SaaS (NDA)",
    industry: "SaaS",
    services: ["Web development", "Product engineering"],
    serviceSlugs: ["web-development", "product-engineering"],
    technologies: ["React", "WebSockets", "CRDT", "TypeScript"],
    challenge:
      "Real-time presence, cursors, and document updates had to feel instant without data loss when networks fluctuated.",
    solution:
      "CRDT-backed synchronization, payload batching, and UX that always showed sync and conflict state clearly.",
    implementation: [
      "Prototyped sync strategy with the client's backend team.",
      "Built presence indicators and optimistic UI with safe rollback.",
      "Stress-tested concurrent editors in staging.",
      "Documented operational limits and monitoring hooks.",
    ],
    results:
      "Users reported reliable collaboration with fewer sync-related support tickets after launch.",
    metrics: [
      { label: "Update latency", value: "Sub-second in testing" },
      { label: "Support load", value: "Fewer sync tickets" },
      { label: "Architecture", value: "CRDT + WebSockets" },
    ],
    featuredImage: "/client-works/phygitall-library.webp",
    featuredImageAlt: "Live collaboration workspace interface",
    featured: false,
    seoTitle: "Live Collaboration Workspace Case Study | Clykur",
    seoDescription:
      "How Clykur engineered a real-time collaboration workspace with CRDT sync and clear user feedback.",
    datePublished: "2025-05-10",
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((s) => s.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((s) => s.slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((s) => s.featured);
}

export function getRelatedCaseStudies(slug: string, limit = 3): CaseStudy[] {
  const current = getCaseStudyBySlug(slug);
  if (!current) return CASE_STUDIES.slice(0, limit);
  const scored = CASE_STUDIES.filter((s) => s.slug !== slug).map((s) => {
    let score = 0;
    if (s.industry === current.industry) score += 2;
    const sharedServices = s.serviceSlugs.filter((id) =>
      current.serviceSlugs.includes(id),
    ).length;
    score += sharedServices;
    return { study: s, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.study);
}

export function getCaseStudyIndustries(): string[] {
  return [...new Set(CASE_STUDIES.map((s) => s.industry))].sort();
}

export function getCaseStudyServiceFilters(): {
  slug: string;
  label: string;
}[] {
  const slugs = new Set<string>();
  for (const study of CASE_STUDIES) {
    for (const slug of study.serviceSlugs) slugs.add(slug);
  }
  const labels: Record<string, string> = {
    "web-development": "Web development",
    "product-engineering": "Product engineering",
    "ui-ux-design": "UI/UX design",
    "mvp-development": "MVP development",
    "mobile-app-development": "Mobile app development",
  };
  return [...slugs].map((slug) => ({
    slug,
    label: labels[slug] ?? slug,
  }));
}

export function getCaseStudySitemapPaths(): string[] {
  return getCaseStudySlugs().map((slug) => `/case-studies/${slug}`);
}

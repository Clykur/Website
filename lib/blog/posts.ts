export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  readingMinutes: number;
  sections: { heading: string; paragraphs: string[] }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mvp-development-cost-2026",
    title: "How Much Does MVP Development Cost in 2026?",
    description:
      "A practical guide to MVP budgeting, scope, and what drives cost for startup founders.",
    datePublished: "2026-05-15",
    readingMinutes: 8,
    sections: [
      {
        heading: "What drives MVP cost",
        paragraphs: [
          "MVP cost is driven by surfaces (web vs mobile), integrations (auth, payments, analytics), design maturity, and timeline, not simply line count.",
          "The highest leverage decision is scope: ship a vertical slice that proves value in one session instead of building every nice-to-have.",
        ],
      },
      {
        heading: "Typical ranges",
        paragraphs: [
          "Focused UI MVPs with existing APIs often land in a smaller band; full-stack MVPs with custom backends scale with complexity.",
          "Clykur recommends phased milestones so you can stop, learn, and fund the next slice based on real user signal.",
        ],
      },
    ],
  },
  {
    slug: "nextjs-vs-react-for-saas",
    title: "Next.js vs React for SaaS Startups",
    description:
      "When to choose Next.js App Router vs a SPA React app for B2B SaaS products.",
    datePublished: "2026-05-22",
    readingMinutes: 7,
    sections: [
      {
        heading: "SEO and performance",
        paragraphs: [
          "Marketing pages and documentation benefit from server rendering and metadata APIs in Next.js.",
          "Authenticated app shells can still be mostly client-rendered while keeping marketing routes fast and crawlable.",
        ],
      },
      {
        heading: "Team velocity",
        paragraphs: [
          "If your team already ships React, Next.js adds routing, data fetching patterns, and deployment ergonomics on Vercel.",
          "Choose based on hiring pool and hosting, not hype.",
        ],
      },
    ],
  },
  {
    slug: "how-we-built-cusown",
    title: "How We Built Cusown",
    description:
      "Product decisions behind Clykur's appointment booking platform Cusown.",
    datePublished: "2026-06-01",
    readingMinutes: 6,
    sections: [
      {
        heading: "Problem focus",
        paragraphs: [
          "Service businesses lose revenue to no-shows and manual scheduling. Cusown targets reliability and automation first.",
          "We optimize for operators who need predictable bookings, not generic calendar widgets.",
        ],
      },
      {
        heading: "Engineering principles",
        paragraphs: [
          "Clear state models for slots, staff, and notifications reduce support load.",
          "Performance and accessibility are part of the core product, not a late audit.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogSlugs() {
  return BLOG_POSTS.map((p) => p.slug);
}

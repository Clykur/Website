import type {
  SeoContentSection,
  SeoFaqItem,
  SeoLandingPage,
  SeoRelatedLink,
} from "@/lib/seo/types";

type BuildLandingInput = {
  kind: SeoLandingPage["kind"];
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  lede: string;
  keywords: string[];
  serviceName?: string;
  breadcrumbs: SeoLandingPage["breadcrumbs"];
  topic: string;
  audience: string;
  deliverables: string[];
  outcomes: string[];
  relatedLinks: SeoRelatedLink[];
  faqs: SeoFaqItem[];
  caseStudy?: SeoLandingPage["caseStudy"];
  technologies?: string[];
};

function section(
  id: string,
  title: string,
  paragraphs: string[],
): SeoContentSection {
  return { id, title, paragraphs };
}

/** Expands a landing page with long-form, crawlable copy (~1.2k–1.8k words). */
const DEFAULT_TECHNOLOGIES = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js integrations",
  "Vercel",
];

export function buildLandingPage(input: BuildLandingInput): SeoLandingPage {
  const { topic, audience, deliverables, outcomes, technologies, ...rest } =
    input;
  const techList = (technologies ?? DEFAULT_TECHNOLOGIES).join(", ");

  const deliverableList = deliverables
    .map((d) => d.trim())
    .filter(Boolean)
    .join(", ");

  const outcomeList = outcomes.join(" ");

  const sections: SeoContentSection[] = [
    section("overview", `What ${topic} includes`, [
      `Clykur delivers ${topic.toLowerCase()} for teams that need production-grade software, not slide decks. We combine product thinking, modern engineering, and clear communication so you always know what is shipping and when.`,
      `Our work spans discovery, implementation, quality assurance, and handoff. Whether you are validating an MVP or scaling an existing platform, we align scope, milestones, and success metrics before writing code.`,
      `Clients choose Clykur when they want a partner who can own frontend complexity, integrate cleanly with existing backends, and leave a maintainable codebase your team can extend.`,
    ]),
    section("who-for", `Who ${topic} is for`, [
      `${audience} We routinely support founders, product leaders, and engineering managers who need additional capacity without sacrificing standards.`,
      `If your roadmap includes customer-facing interfaces, design systems, or performance-sensitive experiences, this engagement model maps directly to those priorities.`,
      `We are remote-first and work across time zones with structured async updates, recorded demos, and written decision logs so stakeholders stay aligned.`,
    ]),
    section("benefits", "Benefits of working with Clykur", [
      `You get a partner who communicates in writing, demos frequently, and ties UI work to measurable outcomes, not vanity deliverables.`,
      `Because we also operate products (Cusown and FreeTrust), we bring product instincts to service work: fewer dead-end features, clearer prioritization, and pragmatic tradeoffs.`,
      `Teams report faster stakeholder alignment when specs, edge cases, and acceptance criteria are captured early, reducing expensive rework cycles.`,
    ]),
    section("deliverables", "Deliverables you can expect", [
      `Typical deliverables include: ${deliverableList}. Each item is tracked against acceptance criteria tied to your designs or product requirements.`,
      `We document component usage, responsive behavior, and accessibility expectations. When a design system exists, we extend it; when it does not, we help establish pragmatic tokens and patterns.`,
      `Security and performance are treated as features: we avoid unnecessary client-side exposure of sensitive data, optimize critical rendering paths, and measure before and after key changes.`,
    ]),
    section("technologies", "Technologies we use", [
      `Our default stack includes ${techList}. We integrate with your APIs, auth providers, analytics, and design systems rather than forcing a greenfield approach.`,
      `For performance-sensitive surfaces we profile critical paths, optimize images and fonts, and validate Core Web Vitals targets before launch.`,
      `Accessibility is implemented with semantic HTML, keyboard support, visible focus states, and WCAG 2.2 AA-oriented patterns, not retrofitted overlays.`,
    ]),
    section("process", "How we execute", [
      `Engagements follow a five-stage pipeline: consultation, design review, development, quality assurance, and delivery. Each stage ends with an explicit checkpoint so scope creep stays visible and manageable.`,
      `During development we favor small, reviewable pull requests, visual comparison against approved sources, and automated checks where your repository supports them.`,
      `At delivery you receive a structured handoff: environment notes, known limitations, and a sensible path for phase two enhancements or internal takeover.`,
    ]),
    section("outcomes", "Outcomes and proof points", [
      outcomeList,
      `Representative results from similar work include reduced processing time by 62% on a workflow-heavy portal, an estimated 40% faster UI delivery after a design-system migration, and sub-second collaborative updates on a live editing workspace.`,
      `We honor NDAs on client identities while publishing representative narratives so you can evaluate how we think, not just what we claim.`,
    ]),
    section("why-clykur", "Why teams choose Clykur", [
      `Clykur operates as both a product company and an engineering studio. We ship our own SaaS properties, Cusown and FreeTrust, which keeps our standards honest on reliability, UX, and go-to-market quality.`,
      `That dual model means you benefit from patterns battle-tested on real users: observability habits, pragmatic abstractions, and UX details that reduce support load.`,
      `When you are ready to move, we make it easy to start: a short discovery call, a written proposal, and a clear first milestone, usually a vertical slice you can demo to stakeholders.`,
    ]),
  ];

  return {
    ...rest,
    sections,
    faqs: input.faqs,
    relatedLinks: input.relatedLinks,
    caseStudy: input.caseStudy,
  };
}

export const SHARED_SERVICE_FAQ: SeoFaqItem[] = [
  {
    question: "How long does a typical engagement take?",
    answer:
      "Timelines depend on scope. After discovery we provide a written plan with milestones, most UI-heavy engagements range from a few weeks for a focused slice to several months for multi-surface products.",
  },
  {
    question: "Which tools and formats do you support?",
    answer:
      "We work from Figma, Sketch, Adobe XD, or PDF. Engineering defaults to React, Next.js, TypeScript, and Tailwind while adapting to your stack when required.",
  },
  {
    question: "Do you sign NDAs and work with existing teams?",
    answer:
      "Yes. We embed with in-house product and engineering teams, join your rituals, and hand off code that matches your conventions.",
  },
];

export const CORE_INTERNAL_LINKS: SeoRelatedLink[] = [
  {
    href: "/services/web-development",
    label: "Web development",
    description: "Production interfaces and marketing sites.",
  },
  {
    href: "/services/product-engineering",
    label: "Product engineering",
    description: "End-to-end product delivery partnership.",
  },
  {
    href: "/services/startup-mvp-development",
    label: "Startup MVP development",
    description: "Validate ideas with shippable software.",
  },
  {
    href: "/contact",
    label: "Contact Clykur",
    description: "Start a project conversation.",
  },
];

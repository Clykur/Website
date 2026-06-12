import type { SeoFaqItem } from "@/lib/seo/types";

export type HubPageContent = {
  path: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  sections: { title: string; paragraphs: string[] }[];
  faqs?: SeoFaqItem[];
};

export const ABOUT_HUB: HubPageContent = {
  path: "/about",
  title: "About Clykur",
  description:
    "Learn about Clykur, a software product company and engineering partner building Cusown, FreeTrust, and client systems worldwide.",
  h1: "About Clykur",
  lede: "We build products we own and partner with teams that need execution done right, remote-first, global, and long-term oriented.",
  sections: [
    {
      title: "What Clykur does",
      paragraphs: [
        "Clykur is a dual system: we operate as a software product company and as an engineering studio. That means we ship our own SaaS, Cusown for appointment booking and FreeTrust for freelancer trust, and we embed with companies to deliver web development, mobile UI, UI/UX design, and product engineering.",
        "Our clients include startups validating MVPs and established teams modernizing complex interfaces. We favor clear scope, written milestones, and code your team can own after handoff.",
      ],
    },
    {
      title: "Where we work",
      paragraphs: [
        "We are remote-first with roots in India and clients worldwide. Business verification (MSME UDYAM) and transparent legal policies are published on this site so you can evaluate us with confidence.",
      ],
    },
  ],
  faqs: [
    {
      question: "What services does Clykur provide?",
      answer:
        "Clykur provides web development, mobile app development, UI/UX design, cloud-ready product engineering, and startup MVP development, alongside our own products Cusown and FreeTrust.",
    },
  ],
};

export const SERVICES_HUB: HubPageContent = {
  path: "/services",
  title: "Services",
  description:
    "Explore Clykur services: web development, mobile apps, UI/UX design, product engineering, and startup MVP development.",
  h1: "Engineering services",
  lede: "Production-grade software partnerships with the same rigor we apply to our own products.",
  sections: [
    {
      title: "What services does Clykur provide?",
      paragraphs: [
        "Clykur provides web development, mobile app development, UI/UX design, product engineering, and startup MVP development. Each service page describes deliverables, process, FAQs, and case study highlights.",
        "Use the links below to explore a specific offering or contact us for a tailored proposal.",
      ],
    },
  ],
};

export const PROCESS_HUB: HubPageContent = {
  path: "/process",
  title: "Our Process",
  description:
    "Clykur's five-stage delivery process: consultation, design review, development, QA, and delivery, with explicit checkpoints.",
  h1: "How we work",
  lede: "One pipeline, five stages, same order on every engagement so you always know what happens next.",
  sections: [
    {
      title: "Delivery pipeline",
      paragraphs: [
        "1. Consultation: scope, timeline, and success criteria agreed in writing. 2. Design review: feasibility, responsiveness, and edge cases validated. 3. Development: accessible, performant implementation. 4. Quality assurance: cross-device verification. 5. Delivery: documentation and path for phase two.",
        "Each stage closes with an explicit checkpoint before the next begins.",
      ],
    },
  ],
};

export const FAQ_HUB: HubPageContent = {
  path: "/faq",
  title: "FAQ",
  description:
    "Frequently asked questions about Clykur products, services, process, and engagements.",
  h1: "Frequently asked questions",
  lede: "Direct answers about Clykur products, services, and how we partner with teams.",
  sections: [],
  faqs: [
    {
      question: "What is Cusown?",
      answer:
        "Cusown is Clykur's smart appointment and slot booking platform for service businesses.",
    },
    {
      question: "What is FreeTrust?",
      answer:
        "FreeTrust is a trust layer for freelancers and clients with credibility validation and transparent profiles.",
    },
    {
      question: "What services does Clykur provide?",
      answer:
        "Web development, mobile app development, UI/UX design, product engineering, and startup MVP development.",
    },
    {
      question: "How do I contact Clykur?",
      answer: "Visit /contact for WhatsApp, email, and project inquiries.",
    },
    {
      question: "Who owns the code and IP?",
      answer:
        "Clients own deliverables per the statement of work. See /engagement-terms for IP and confidentiality.",
    },
    {
      question: "How does Clykur quote projects?",
      answer:
        "Discovery, written milestones, and budget alignment. Use /contact with timeline and budget band fields.",
    },
    {
      question: "Do you work with US and EU startups?",
      answer:
        "Yes. Remote-first delivery with overlap hours and English as the primary language.",
    },
  ],
};

export const SERVICE_INDEX_LINKS = [
  { href: "/services/web-development", label: "Web development" },
  { href: "/services/mobile-app-development", label: "Mobile app development" },
  { href: "/services/ui-ux-design", label: "UI/UX design" },
  { href: "/services/product-engineering", label: "Product engineering" },
  {
    href: "/services/startup-mvp-development",
    label: "Startup MVP development",
  },
  { href: "/services/mvp-development", label: "MVP development" },
] as const;

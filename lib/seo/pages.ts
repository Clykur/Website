import {
  buildLandingPage,
  CORE_INTERNAL_LINKS,
  SHARED_SERVICE_FAQ,
} from "@/lib/seo/content-builder";
import { getBlogSlugs } from "@/lib/blog/posts";
import { getRolePaths } from "@/lib/careers-roles";
import { getCaseStudySitemapPaths } from "@/lib/case-studies";
import type { SeoLandingPage } from "@/lib/seo/types";

const servicePages: SeoLandingPage[] = [
  buildLandingPage({
    kind: "service",
    slug: "web-development",
    path: "/services/web-development",
    title: "Web Development Services",
    description:
      "Clykur provides web development for SaaS, marketing sites, and complex product UIs using React, Next.js, and modern performance practices.",
    h1: "Web development that ships production-ready interfaces",
    eyebrow: "Services",
    lede: "We design and build fast, accessible web experiences, from marketing sites to data-dense applications, with maintainable React and Next.js codebases.",
    keywords: [
      "web development company",
      "react development services",
      "next.js development",
    ],
    serviceName: "Web Development",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Web development", href: "/services/web-development" },
    ],
    topic: "Web development",
    audience:
      "SaaS startups, agencies, and enterprise product teams modernizing customer-facing web apps.",
    deliverables: [
      "Responsive UI implementation",
      "Design-to-code from Figma",
      "Performance optimization",
      "Component libraries",
      "Accessibility (WCAG-oriented) reviews",
    ],
    outcomes: [
      "We target measurable improvements: faster LCP on marketing pages, lower interaction latency on dashboards, and fewer regressions through structured QA.",
    ],
    relatedLinks: [
      ...CORE_INTERNAL_LINKS.filter(
        (l) => l.href !== "/services/web-development",
      ),
      {
        href: "/services/ui-ux-design",
        label: "UI/UX design",
        description: "Research-driven interfaces before build.",
      },
      {
        href: "/hire-react-developers",
        label: "Hire React developers",
        description: "Dedicated React capacity for your roadmap.",
      },
    ],
    faqs: [
      {
        question: "What services does Clykur provide for web development?",
        answer:
          "Clykur provides web development, design-to-code implementation, component systems, performance optimization, and integration with your APIs and auth layers using React and Next.js.",
      },
      ...SHARED_SERVICE_FAQ,
    ],
    caseStudy: {
      title: "Enterprise SaaS platform UI",
      challenge:
        "A multi-surface design system needed to become a scalable React application without slowing feature teams.",
      approach:
        "Component library first, incremental migration behind flags, visual regression on critical flows.",
      result:
        "Production-ready UI matching design specs with maintainable patterns for future squads.",
      metric: "Estimated 40% faster new feature UI delivery after rollout",
    },
  }),
  buildLandingPage({
    kind: "service",
    slug: "mobile-app-development",
    path: "/services/mobile-app-development",
    title: "Mobile App Development Services",
    description:
      "Mobile app UI engineering from Clykur: native-feeling interfaces, cross-platform patterns, and performance-aware implementation.",
    h1: "Mobile app development focused on premium UI",
    eyebrow: "Services",
    lede: "We turn mobile product designs into polished, gesture-aware interfaces with consistent design systems across phone and tablet breakpoints.",
    keywords: [
      "mobile app development",
      "mobile UI engineering",
      "react native UI",
    ],
    serviceName: "Mobile App Development",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      {
        label: "Mobile app development",
        href: "/services/mobile-app-development",
      },
    ],
    topic: "Mobile app development",
    audience:
      "Product teams shipping consumer or B2B mobile experiences who need UI excellence without hiring a full in-house mobile squad immediately.",
    deliverables: [
      "Mobile UI implementation from mockups",
      "Navigation and motion patterns",
      "Responsive tablet layouts",
      "Design system alignment",
      "Cross-browser / WebView hardening where applicable",
    ],
    outcomes: [
      "Mobile-first dashboards we delivered improved task completion time and reduced scroll fatigue through clearer hierarchy and tuned chart components.",
    ],
    relatedLinks: CORE_INTERNAL_LINKS,
    faqs: [
      {
        question: "Do you build native apps or cross-platform?",
        answer:
          "We specialize in high-quality UI implementation and can work with React Native or web-based mobile shells depending on your stack; we align on the approach during discovery.",
      },
      ...SHARED_SERVICE_FAQ,
    ],
  }),
  buildLandingPage({
    kind: "service",
    slug: "ui-ux-design",
    path: "/services/ui-ux-design",
    title: "UI/UX Design Services",
    description:
      "UI/UX design services from Clykur: flows, wireframes, visual design, and design systems that translate cleanly to code.",
    h1: "UI/UX design that engineers can ship faithfully",
    eyebrow: "Services",
    lede: "We design clear user journeys, scalable design systems, and production-minded specs so development stays predictable.",
    keywords: [
      "ui ux design agency",
      "product design services",
      "design systems",
    ],
    serviceName: "UI/UX Design",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "UI/UX design", href: "/services/ui-ux-design" },
    ],
    topic: "UI/UX design",
    audience:
      "Founders and product leaders who need design partners that understand engineering constraints and delivery timelines.",
    deliverables: [
      "User flows and wireframes",
      "High-fidelity UI in Figma",
      "Design tokens and components",
      "Prototype reviews with engineering",
      "Accessibility-minded patterns",
    ],
    outcomes: [
      "Strong design-to-code alignment reduces rework; clients see fewer review cycles when specs include states, edge cases, and responsive rules upfront.",
    ],
    relatedLinks: CORE_INTERNAL_LINKS,
    faqs: [
      {
        question: "Can Clykur design and also develop the product?",
        answer:
          "Yes. We offer end-to-end product engineering and can own design through deployment for faster iteration.",
      },
      ...SHARED_SERVICE_FAQ,
    ],
  }),
  buildLandingPage({
    kind: "service",
    slug: "product-engineering",
    path: "/services/product-engineering",
    title: "Product Engineering Services",
    description:
      "Product engineering partnerships from Clykur: roadmap execution, full-stack collaboration, and scalable architecture for growing SaaS teams.",
    h1: "Product engineering partners who own outcomes",
    eyebrow: "Services",
    lede: "Embed Clykur as an extension of your product team, we ship features, harden architecture, and keep stakeholders unblocked.",
    keywords: [
      "product engineering company",
      "software product development partner",
    ],
    serviceName: "Product Engineering",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Product engineering", href: "/services/product-engineering" },
    ],
    topic: "Product engineering",
    audience:
      "SaaS companies scaling from MVP to growth stage who need senior execution across frontend and integration layers.",
    deliverables: [
      "Feature delivery against roadmap",
      "Architecture reviews",
      "API integration on the client",
      "Observability-friendly instrumentation",
      "Documentation and handoff",
    ],
    outcomes: [
      "Live collaboration workspaces we engineered achieved sub-second updates with clear conflict states, reducing sync-related support load after launch.",
    ],
    relatedLinks: CORE_INTERNAL_LINKS,
    faqs: [
      {
        question:
          "How is product engineering different from staff augmentation?",
        answer:
          "We take ownership of outcomes, scope, quality, and communication, not just tickets. You get a studio-grade delivery model with product judgment.",
      },
      ...SHARED_SERVICE_FAQ,
    ],
  }),
  buildLandingPage({
    kind: "service",
    slug: "startup-mvp-development",
    path: "/services/startup-mvp-development",
    title: "Startup MVP Development",
    description:
      "Startup MVP development with Clykur: validate ideas quickly with maintainable code, clear milestones, and investor-ready demos.",
    h1: "Startup MVP development built to learn fast",
    eyebrow: "Services",
    lede: "Launch a credible MVP in weeks, not months, with scope disciplined around the riskiest assumptions first.",
    keywords: [
      "mvp development company",
      "startup software development",
      "build mvp",
    ],
    serviceName: "Startup MVP Development",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      {
        label: "Startup MVP development",
        href: "/services/startup-mvp-development",
      },
    ],
    topic: "Startup MVP development",
    audience:
      "Pre-seed and seed founders who need a technical partner to reach traction metrics without overbuilding.",
    deliverables: [
      "MVP scope definition",
      "Core user flows implemented",
      "Analytics hooks",
      "Deployment support",
      "Post-launch iteration plan",
    ],
    outcomes: [
      "MVPs should prove demand, not exhaust runway, we prioritize vertical slices that demo value in the first session.",
    ],
    relatedLinks: [
      ...CORE_INTERNAL_LINKS,
      {
        href: "/startup-mvp-development-company",
        label: "MVP development company (overview)",
        description: "Buyer-intent guide for founders.",
      },
    ],
    faqs: [
      {
        question: "How much does MVP development cost?",
        answer:
          "Cost depends on surfaces, integrations, and timeline. After a short discovery call we provide a fixed-scope proposal or phased milestones so you can plan budget confidently.",
      },
      ...SHARED_SERVICE_FAQ,
    ],
  }),
  buildLandingPage({
    kind: "service",
    slug: "mvp-development",
    path: "/services/mvp-development",
    title: "MVP Development Services",
    description:
      "MVP development with Clykur: ship a credible product fast with clear scope, modern stack, and metrics-ready launch.",
    h1: "MVP development for founders who need to ship",
    eyebrow: "Services",
    lede: "Validate demand with a focused MVP, scoped around your riskiest assumptions and built to iterate after launch.",
    keywords: [
      "mvp development services",
      "minimum viable product development",
    ],
    serviceName: "MVP Development",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "MVP development", href: "/services/mvp-development" },
    ],
    topic: "MVP development",
    audience:
      "Founders and product leaders who need a shippable MVP for pilots, fundraising, or early customers.",
    deliverables: [
      "Discovery and scope",
      "Core flows",
      "Analytics",
      "Launch checklist",
      "Iteration roadmap",
    ],
    outcomes: [
      "A demo-ready MVP that proves value in the first session, not a bloated prototype that drains runway.",
    ],
    relatedLinks: [
      {
        href: "/services/startup-mvp-development",
        label: "Startup MVP development",
        description: "Founder-focused offering.",
      },
      {
        href: "/case-studies",
        label: "Case studies",
        description: "Representative outcomes.",
      },
      {
        href: "/contact",
        label: "Contact",
        description: "Book a discovery call.",
      },
    ],
    faqs: SHARED_SERVICE_FAQ,
  }),
];

const industryPages: SeoLandingPage[] = [
  buildLandingPage({
    kind: "industry",
    slug: "education",
    path: "/industries/education",
    title: "Software Development for Education",
    description:
      "Clykur builds edtech experiences, portals, learning UI, and scalable frontends for education companies and institutions.",
    h1: "Software for education companies and institutions",
    eyebrow: "Industries",
    lede: "Accessible, performant interfaces for learners, instructors, and administrators, built to handle peak enrollment traffic.",
    keywords: ["edtech development", "education software development"],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Industries", href: "/services" },
      { label: "Education", href: "/industries/education" },
    ],
    topic: "Education software",
    audience:
      "Edtech startups, training platforms, and institutions modernizing digital touchpoints.",
    deliverables: [
      "Learner dashboards",
      "Enrollment flows",
      "Content delivery UI",
      "Accessibility compliance",
      "Performance tuning for peak loads",
    ],
    outcomes: [
      "Education products demand clarity and accessibility, we design for diverse learners and strict uptime during registration windows.",
    ],
    relatedLinks: CORE_INTERNAL_LINKS,
    faqs: SHARED_SERVICE_FAQ,
  }),
  buildLandingPage({
    kind: "industry",
    slug: "healthcare",
    path: "/industries/healthcare",
    title: "Healthcare Software Development",
    description:
      "Healthcare UI engineering from Clykur: patient-friendly flows, secure portals, and accessible interfaces.",
    h1: "Healthcare software with accessible, secure UX",
    eyebrow: "Industries",
    lede: "We build patient and provider experiences with careful attention to accessibility, clarity, and integration with your compliance processes.",
    keywords: ["healthcare software development", "patient portal UI"],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Industries", href: "/services" },
      { label: "Healthcare", href: "/industries/healthcare" },
    ],
    topic: "Healthcare software",
    audience:
      "Digital health startups and providers launching or modernizing patient-facing software.",
    deliverables: [
      "Patient portal UI",
      "Appointment scheduling interfaces",
      "Forms and multi-step flows",
      "WCAG-oriented patterns",
      "Performance for mobile patients",
    ],
    outcomes: [
      "Clear, calm interfaces reduce errors in high-stakes workflows, we validate states, errors, and offline-tolerant messaging.",
    ],
    relatedLinks: CORE_INTERNAL_LINKS,
    faqs: SHARED_SERVICE_FAQ,
  }),
  buildLandingPage({
    kind: "industry",
    slug: "saas",
    path: "/industries/saas",
    title: "SaaS Product Development",
    description:
      "Clykur partners with SaaS teams on dashboards, design systems, and rapid feature delivery.",
    h1: "SaaS product development for growing teams",
    eyebrow: "Industries",
    lede: "Ship features faster with a partner who understands multi-tenant UX, dense data, and long-term maintainability.",
    keywords: ["saas development company", "b2b saas engineering"],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Industries", href: "/services" },
      { label: "SaaS", href: "/industries/saas" },
    ],
    topic: "SaaS development",
    audience:
      "B2B SaaS founders and product leaders scaling from early traction to enterprise readiness.",
    deliverables: [
      "Dashboard UI",
      "Design system implementation",
      "Onboarding flows",
      "Billing and settings surfaces",
      "Performance optimization",
    ],
    outcomes: [
      "SaaS teams we support ship predictable releases with component reuse and measurable performance wins on critical pages.",
    ],
    relatedLinks: CORE_INTERNAL_LINKS,
    faqs: SHARED_SERVICE_FAQ,
  }),
  buildLandingPage({
    kind: "industry",
    slug: "fintech",
    path: "/industries/fintech",
    title: "FinTech Software Development",
    description:
      "FinTech UI and product engineering from Clykur: secure flows, accessible dashboards, and performance-aware interfaces.",
    h1: "FinTech software with security-minded UX",
    eyebrow: "Industries",
    lede: "Ship regulated-friendly experiences with clear states, audit-friendly UI patterns, and performance that holds under real traffic.",
    keywords: ["fintech software development", "fintech ui engineering"],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Industries", href: "/services" },
      { label: "FinTech", href: "/industries/fintech" },
    ],
    topic: "FinTech software",
    audience:
      "FinTech startups and financial services teams modernizing customer-facing software.",
    deliverables: [
      "Secure multi-step flows",
      "Dashboards and reporting UI",
      "Accessibility reviews",
      "Performance optimization",
      "Design system alignment",
    ],
    outcomes: [
      "Representative banking portal work shipped with zero client-side security findings in QA and strong accessibility review outcomes.",
    ],
    relatedLinks: CORE_INTERNAL_LINKS,
    faqs: SHARED_SERVICE_FAQ,
    caseStudy: {
      title: "Secure banking portal",
      challenge:
        "Regulatory-grade portal with strict accessibility and multi-step flows.",
      approach:
        "State machines, WCAG 2.1 AA patterns, careful API integration.",
      result: "Passed compliance review with maintainable React architecture.",
      metric: "Zero client-side security findings in QA",
    },
  }),
  buildLandingPage({
    kind: "industry",
    slug: "startups",
    path: "/industries/startups",
    title: "Software Development for Startups",
    description:
      "Clykur helps startups ship MVPs and scale product UI with founder-friendly process and senior execution.",
    h1: "Software development for high-growth startups",
    eyebrow: "Industries",
    lede: "From MVP to scale-up, we help startups ship credible product experiences without hiring a full in-house UI team on day one.",
    keywords: ["startup software development", "startup product engineering"],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Industries", href: "/services" },
      { label: "Startups", href: "/industries/startups" },
    ],
    topic: "Startup software development",
    audience:
      "Seed and Series A teams that need speed, clarity, and maintainable code.",
    deliverables: [
      "MVP delivery",
      "Design-to-code",
      "Product engineering retainers",
      "Performance and SEO setup",
      "Handoff documentation",
    ],
    outcomes: [
      "Founders get demo-ready software and written milestones, reducing uncertainty for investors and early customers.",
    ],
    relatedLinks: [
      {
        href: "/services/mvp-development",
        label: "MVP development",
        description: "Ship fast with scope control.",
      },
      { href: "/blog", label: "Blog", description: "Guides for founders." },
      { href: "/contact", label: "Contact", description: "Start a project." },
    ],
    faqs: SHARED_SERVICE_FAQ,
  }),
];

const programmaticPages: SeoLandingPage[] = [
  buildLandingPage({
    kind: "programmatic",
    slug: "hire-nextjs-developers",
    path: "/hire-nextjs-developers",
    title: "Hire Next.js Developers",
    description:
      "Hire Next.js developers from Clykur for App Router projects, SSR/SSG, and production-grade React architectures.",
    h1: "Hire Next.js developers who ship in production",
    eyebrow: "Hire",
    lede: "Add senior Next.js capacity to your team with clear milestones, code review standards, and SEO-aware implementations.",
    keywords: ["hire nextjs developers", "next.js development company"],
    serviceName: "Next.js Development",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Hire Next.js developers", href: "/hire-nextjs-developers" },
    ],
    topic: "Next.js development",
    audience:
      "Teams building marketing sites or SaaS on Next.js who need experienced implementers.",
    deliverables: [
      "App Router implementations",
      "Server and client component boundaries",
      "Metadata and SEO setup",
      "Performance tuning",
      "CI-friendly workflows",
    ],
    outcomes: [
      "We reduce hydration issues, improve Core Web Vitals, and document patterns your team can reuse.",
    ],
    relatedLinks: [
      {
        href: "/hire-react-developers",
        label: "Hire React developers",
        description: "UI specialists.",
      },
      {
        href: "/services/web-development",
        label: "Web development",
        description: "Full service offering.",
      },
      {
        href: "/contact",
        label: "Contact",
        description: "Start hiring conversation.",
      },
    ],
    faqs: [
      {
        question: "Can we hire Next.js developers on a monthly basis?",
        answer:
          "Yes. We offer phased engagements and ongoing capacity models depending on roadmap size and internal process.",
      },
      ...SHARED_SERVICE_FAQ,
    ],
  }),
  buildLandingPage({
    kind: "programmatic",
    slug: "hire-react-developers",
    path: "/hire-react-developers",
    title: "Hire React Developers",
    description:
      "Hire React developers from Clykur for design systems, dashboards, and complex interactive UI.",
    h1: "Hire React developers for serious UI",
    eyebrow: "Hire",
    lede: "Experienced React engineers who care about accessibility, state management clarity, and long-term maintainability.",
    keywords: ["hire react developers", "react development team"],
    serviceName: "React Development",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Hire React developers", href: "/hire-react-developers" },
    ],
    topic: "React development",
    audience:
      "Product teams with Figma-ready designs who need dependable implementation.",
    deliverables: [
      "Component architecture",
      "Hooks and state patterns",
      "Testing-friendly structure",
      "Storybook or design system docs",
      "Performance profiling",
    ],
    outcomes: [
      "Maintainable React codebases lower the cost of every subsequent feature.",
    ],
    relatedLinks: CORE_INTERNAL_LINKS,
    faqs: SHARED_SERVICE_FAQ,
  }),
  buildLandingPage({
    kind: "programmatic",
    slug: "hire-fullstack-developers",
    path: "/hire-fullstack-developers",
    title: "Hire Full-Stack Developers",
    description:
      "Hire full-stack developers from Clykur for product delivery across frontend and integration layers.",
    h1: "Hire full-stack developers with product judgment",
    eyebrow: "Hire",
    lede: "Full-stack capacity focused on shipping user-visible value while integrating cleanly with your APIs and auth.",
    keywords: ["hire fullstack developers", "full stack development company"],
    serviceName: "Full-Stack Development",
    breadcrumbs: [
      { label: "Home", href: "/" },
      {
        label: "Hire full-stack developers",
        href: "/hire-fullstack-developers",
      },
    ],
    topic: "Full-stack development",
    audience: "Startups and SaaS teams that need end-to-end feature ownership.",
    deliverables: [
      "Feature slices end to end",
      "API integration",
      "Auth flows on the client",
      "Database-aware UI states",
      "Documentation",
    ],
    outcomes: [
      "End-to-end ownership reduces handoff friction between design, frontend, and backend teams.",
    ],
    relatedLinks: CORE_INTERNAL_LINKS,
    faqs: SHARED_SERVICE_FAQ,
  }),
  buildLandingPage({
    kind: "programmatic",
    slug: "startup-mvp-development-company",
    path: "/startup-mvp-development-company",
    title: "Startup MVP Development Company",
    description:
      "Clykur is a startup MVP development company helping founders validate ideas with shippable software.",
    h1: "Startup MVP development company for founders",
    eyebrow: "Company",
    lede: "Partner with a studio that ships client MVPs with the same rigor we apply to every engagement.",
    keywords: ["startup mvp development company", "mvp development agency"],
    breadcrumbs: [
      { label: "Home", href: "/" },
      {
        label: "MVP development company",
        href: "/startup-mvp-development-company",
      },
    ],
    topic: "MVP development",
    audience: "Founders preparing for pilots, demos, or seed fundraising.",
    deliverables: [
      "Scope workshop",
      "MVP build",
      "Launch support",
      "Metrics instrumentation",
    ],
    outcomes: [
      "Founders get a credible product story backed by working software, not mockups alone.",
    ],
    relatedLinks: [
      {
        href: "/services/startup-mvp-development",
        label: "Startup MVP service",
        description: "Detailed offering.",
      },
      { href: "/contact", label: "Contact", description: "Talk to Clykur." },
    ],
    faqs: SHARED_SERVICE_FAQ,
  }),
  buildLandingPage({
    kind: "programmatic",
    slug: "product-development-company-india",
    path: "/product-development-company-india",
    title: "Product Development Company in India",
    description:
      "Clykur is a product development company in India building global SaaS and engineering partnerships.",
    h1: "Product development company in India, global delivery",
    eyebrow: "Company",
    lede: "Remote-first product engineering from India with MSME verification, clear contracts, and worldwide clients.",
    keywords: ["product development company india", "software company india"],
    breadcrumbs: [
      { label: "Home", href: "/" },
      {
        label: "Product development company India",
        href: "/product-development-company-india",
      },
    ],
    topic: "Product development in India",
    audience:
      "International companies seeking high-quality engineering partners and Indian startups going global.",
    deliverables: [
      "Product discovery",
      "UI engineering",
      "Long-term partnerships",
      "Transparent engagement terms",
    ],
    outcomes: [
      "Global-by-default collaboration with structured communication and verified business credentials.",
    ],
    relatedLinks: [
      {
        href: "/software-development-company-bangalore",
        label: "Software company Bangalore",
        description: "Local presence, global work.",
      },
      {
        href: "/#trust",
        label: "Trust & verification",
        description: "UDYAM MSME details.",
      },
      { href: "/contact", label: "Contact", description: "Start a project." },
    ],
    faqs: SHARED_SERVICE_FAQ,
  }),
  buildLandingPage({
    kind: "programmatic",
    slug: "software-development-company-bangalore",
    path: "/software-development-company-bangalore",
    title: "Software Development Company in Bangalore",
    description:
      "Clykur is a software development company in Bangalore delivering web, mobile UI, and product engineering globally.",
    h1: "Software development company in Bangalore",
    eyebrow: "Company",
    lede: "Bengaluru-based studio with remote-first delivery, enterprise-grade process, and product company DNA.",
    keywords: [
      "software development company bangalore",
      "web development company bangalore",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      {
        label: "Software development Bangalore",
        href: "/software-development-company-bangalore",
      },
    ],
    topic: "Software development in Bangalore",
    audience:
      "Companies looking for Bangalore-aligned partners with strong frontend and product execution.",
    deliverables: [
      "Web and mobile UI engineering",
      "Product partnerships",
      "Design-to-code",
      "Ongoing iteration",
    ],
    outcomes: [
      "Clients get studio accountability with the talent density Bangalore is known for, without sacrificing communication clarity.",
    ],
    relatedLinks: CORE_INTERNAL_LINKS,
    faqs: SHARED_SERVICE_FAQ,
  }),
  buildLandingPage({
    kind: "programmatic",
    slug: "mvp-for-us-saas-founders",
    path: "/mvp-for-us-saas-founders",
    title: "MVP Development for US SaaS Founders",
    description:
      "Clykur helps US SaaS founders ship an MVP in 4-8 weeks with Next.js, clear milestones, and founder-led discovery.",
    h1: "MVP development for US SaaS founders",
    eyebrow: "For founders",
    lede: "Remote-first product engineering with overlap for US time zones, phased delivery, and budget bands from low five figures USD for a focused vertical slice.",
    keywords: [
      "mvp development us startup",
      "saas mvp development company",
      "hire mvp developers",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "MVP for US SaaS founders", href: "/mvp-for-us-saas-founders" },
    ],
    topic: "US SaaS MVP delivery",
    audience:
      "Pre-seed and seed founders who need a credible product for pilots, design partners, or fundraising.",
    deliverables: [
      "Discovery workshop and written scope",
      "4-8 week MVP milestone (typical)",
      "Auth, core workflow, and admin basics",
      "Analytics hooks and launch checklist",
      "Handoff documentation",
    ],
    outcomes: [
      "A demo-ready product story backed by production code, not slideware.",
      "Typical focused MVPs are quoted after discovery; many founders budget low five figures USD for the first slice.",
    ],
    relatedLinks: [
      {
        href: "/services/startup-mvp-development",
        label: "Startup MVP service",
        description: "Full service detail.",
      },
      {
        href: "/blog/mvp-development-cost-2026",
        label: "MVP cost guide",
        description: "What drives budget.",
      },
      {
        href: "/case-studies",
        label: "Case studies",
        description: "Representative outcomes.",
      },
      { href: "/contact", label: "Contact", description: "Book discovery." },
    ],
    faqs: SHARED_SERVICE_FAQ,
    caseStudy: {
      title: "E-commerce marketplace frontend",
      challenge:
        "High-traffic launch needed accessible checkout and stable performance.",
      approach:
        "Next.js storefront with performance budgets and WCAG patterns.",
      result: "Launch-ready commerce UI under peak load.",
      metric: "Stable under peak traffic",
    },
  }),
  buildLandingPage({
    kind: "programmatic",
    slug: "appointment-booking-software-development",
    path: "/appointment-booking-software-development",
    title: "Appointment Booking Software Development",
    description:
      "Custom appointment and scheduling software development for service businesses and platforms.",
    h1: "Appointment booking software development",
    eyebrow: "Scheduling",
    lede: "From salon and clinic workflows to B2B scheduling APIs, we ship booking systems with clear slot logic, notifications, and operator tools.",
    keywords: [
      "appointment booking software development",
      "scheduling software company",
      "custom booking platform",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      {
        label: "Booking software development",
        href: "/appointment-booking-software-development",
      },
    ],
    topic: "Scheduling and booking products",
    audience:
      "Operators outgrowing spreadsheets, or startups building scheduling into their platform.",
    deliverables: [
      "Staff, service, and availability models",
      "Customer booking flows and reminders",
      "Admin and reporting surfaces",
      "Payments or calendar integrations as needed",
      "Performance and accessibility baseline",
    ],
    outcomes: [
      "Fewer double bookings and manual reconciliation; professional customer experience on every device.",
    ],
    relatedLinks: [
      {
        href: "/services/product-engineering",
        label: "Product engineering",
        description: "End-to-end delivery.",
      },
      {
        href: "/case-studies",
        label: "Case studies",
        description: "Scheduling and SaaS work.",
      },
      {
        href: "/blog/mvp-development-cost-2026",
        label: "MVP cost guide",
        description: "Budget drivers.",
      },
      {
        href: "/contact",
        label: "Contact",
        description: "Discuss your build.",
      },
    ],
    faqs: SHARED_SERVICE_FAQ,
    caseStudy: {
      title: "Service business scheduling platform",
      challenge: "No-shows and manual scheduling across channels.",
      approach: "Focused booking UX with automation and operator dashboards.",
      result: "Production scheduling software for service operators.",
      metric: "Fewer manual bookings",
    },
  }),
  buildLandingPage({
    kind: "programmatic",
    slug: "nextjs-product-team-extension",
    path: "/nextjs-product-team-extension",
    title: "Next.js Product Team Extension",
    description:
      "Extend your product team with Clykur Next.js engineers: App Router, SSR, design systems, and shipping discipline.",
    h1: "Next.js product team extension",
    eyebrow: "Team extension",
    lede: "Add senior capacity without hiring lag. We embed in your rituals, ship feature slices, and document patterns your team keeps.",
    keywords: [
      "nextjs development team extension",
      "react team augmentation",
      "product engineering partner",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      {
        label: "Next.js team extension",
        href: "/nextjs-product-team-extension",
      },
    ],
    topic: "Next.js team augmentation",
    audience:
      "SaaS teams with roadmap pressure and an existing React/Next.js codebase.",
    deliverables: [
      "Feature slices with PR review standards",
      "App Router and RSC boundaries",
      "Design system alignment",
      "Performance and SEO fixes on critical routes",
      "Knowledge transfer and docs",
    ],
    outcomes: [
      "Faster shipping with fewer hydration and metadata regressions.",
    ],
    relatedLinks: [
      {
        href: "/hire-nextjs-developers",
        label: "Hire Next.js developers",
        description: "Hiring page.",
      },
      {
        href: "/case-studies/enterprise-saas-design-system",
        label: "Design system case study",
        description: "Enterprise rollout.",
      },
      { href: "/contact", label: "Contact", description: "Add capacity." },
    ],
    faqs: SHARED_SERVICE_FAQ,
    caseStudy: {
      title: "Enterprise SaaS design system",
      challenge: "Visual drift and slow UI delivery across squads.",
      approach: "Token-backed components and phased migration.",
      result: "Faster feature UI with consistent branding.",
      metric: "~40% faster feature UI",
    },
  }),
];

export const ALL_LANDING_PAGES: SeoLandingPage[] = [
  ...servicePages,
  ...industryPages,
  ...programmaticPages,
];

export const PROGRAMMATIC_SLUGS = programmaticPages.map((p) => p.slug);

export function getLandingPageByPath(path: string): SeoLandingPage | undefined {
  return ALL_LANDING_PAGES.find((p) => p.path === path);
}

export function getServicePage(slug: string) {
  return servicePages.find((p) => p.slug === slug);
}

export function getIndustryPage(slug: string) {
  return industryPages.find((p) => p.slug === slug);
}

export function getProgrammaticPage(slug: string) {
  return programmaticPages.find((p) => p.slug === slug);
}

export const SERVICE_SLUGS = servicePages.map((p) => p.slug);
export const INDUSTRY_SLUGS = industryPages.map((p) => p.slug);

/** Every indexable URL: marketing hubs, policy pages, and all child routes. */
export function getAllSitemapPaths(): string[] {
  const hubPaths = [
    "/",
    "/about",
    "/services",
    "/process",
    "/faq",
    "/contact",
    "/careers",
    "/work",
    "/case-studies",
    "/blog",
    "/terms-and-conditions",
    "/privacy-policy",
    "/engagement-terms",
    "/refund-policy",
    "/employment-policy",
    "/compliance",
    "/security",
  ];

  const childPaths = [
    ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
    ...INDUSTRY_SLUGS.map((slug) => `/industries/${slug}`),
    ...PROGRAMMATIC_SLUGS.map((slug) => `/${slug}`),
    ...getBlogSlugs().map((slug) => `/blog/${slug}`),
    ...getCaseStudySitemapPaths(),
    ...getRolePaths().map((slug) => `/careers/${slug}`),
  ];

  const registryPaths = ALL_LANDING_PAGES.map((p) => p.path);

  return [...new Set([...hubPaths, ...childPaths, ...registryPaths])].sort(
    (a, b) => a.localeCompare(b),
  );
}

import { Lock } from "lucide-react";

const caseStudies = [
  {
    category: "Web App Frontend",
    title: "Enterprise SaaS Platform",
    challenge:
      "Complex design system with multiple components needed to be converted into a scalable React application.",
    approach:
      "Analyzed the design system, created a component library, and implemented a responsive interface with optimized performance.",
    result:
      "Delivered a fully responsive, production-ready frontend that matched the design specifications with 100% accuracy. The codebase was maintainable and scalable for future updates.",
  },
  {
    category: "Website Frontend",
    title: "E-Commerce Marketplace",
    challenge:
      "Large-scale e-commerce design with complex product listings, filters, and checkout flows required pixel-perfect implementation.",
    approach:
      "Built responsive components with smooth animations, optimized for performance, and ensured accessibility standards were met throughout.",
    result:
      "Successfully launched with seamless user experience across all devices. The frontend handled high traffic efficiently and received positive user feedback.",
  },
  {
    category: "Web App Frontend",
    title: "Mobile-First Dashboard",
    challenge:
      "Data-heavy dashboard design needed to be converted into an interactive, mobile-responsive interface with real-time updates.",
    approach:
      "Implemented a mobile-first approach, created reusable chart components, and optimized data visualization for various screen sizes.",
    result:
      "Delivered a highly responsive dashboard that works flawlessly on mobile, tablet, and desktop. Users reported improved usability and faster load times.",
  },
  {
    category: "Fintech & Data",
    title: "Secure Banking Portal",
    challenge:
      "Regulatory-grade portal with strict accessibility and security requirements, multi-step flows, and real-time balance updates.",
    approach:
      "Structured the app around clear state machines, implemented WCAG 2.1 AA patterns, and integrated with existing auth and API layers without exposing sensitive data in the client.",
    result:
      "Shipped an auditable, accessible portal that passed compliance review. Zero client-side security findings and strong feedback from internal QA and users.",
  },
  {
    category: "Design Systems",
    title: "Component Library Migration",
    challenge:
      "Legacy UI built with mixed patterns and inline styles had to be replaced by a single design system without breaking existing product surfaces.",
    approach:
      "Defined tokens and components in phases, introduced the new library behind feature flags, and migrated screens incrementally with visual regression coverage.",
    result:
      "Unified design system rolled out across the product. Consistency improved, and the team cut new feature UI time by an estimated 40%.",
  },
  {
    category: "Real-Time Collaboration",
    title: "Live Editing Workspace",
    challenge:
      "Collaborative workspace with presence, cursors, and conflict-free updates needed to feel instant and reliable at scale.",
    approach:
      "Chose a sync strategy (CRDT-backed), optimized payloads and batching, and added clear loading and conflict states so users always knew the state of their work.",
    result:
      "Launched with sub-second updates and no data loss in testing. Support tickets related to sync dropped sharply after rollout.",
  },
];

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-background"
      aria-labelledby="case-studies-heading"
    >
      <div className="mx-auto max-w-6xl w-full">
        <header className="mb-10 md:mb-20">
          <h2
            id="case-studies-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-2 md:mb-3"
          >
            Case Studies
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-3 md:mb-4 w-full leading-relaxed">
            Real projects showcasing our approach to solving frontend challenges
            and delivering results.
          </p>
          <p className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            <Lock className="h-3.5 w-3.5 shrink-0 flex-shrink-0" aria-hidden />
            <span>
              Client names and specific details are confidential per NDAs.
            </span>
          </p>
        </header>

        <div className="space-y-0">
          {caseStudies.map((study, index) => (
            <article
              key={index}
              className="py-8 sm:py-10 md:py-12 border-b border-border last:border-b-0"
            >
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5 sm:mb-1">
                {study.category}
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-4 sm:mb-6">
                {study.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
                <div className="rounded-lg bg-muted/40 p-4 sm:p-0 sm:bg-transparent sm:rounded-none">
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5 sm:mb-2">
                    Challenge
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/40 p-4 sm:p-0 sm:bg-transparent sm:rounded-none">
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5 sm:mb-2">
                    Approach
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {study.approach}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/40 p-4 sm:p-0 sm:bg-transparent sm:rounded-none">
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5 sm:mb-2">
                    Result
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {study.result}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

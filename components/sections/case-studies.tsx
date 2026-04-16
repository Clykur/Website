import { Compass, Lock, Sparkles, Target } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

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

const bodyClass =
  "text-[13.5px] leading-[1.82] text-foreground/55 md:text-[14.5px] md:leading-[1.84]";

const labelClass =
  "mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/38";

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="clykur-story-section relative border-t border-foreground/[0.05]"
      aria-labelledby="case-studies-heading"
    >
      {/* Layered backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#fafaf8]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-30%,rgba(255,59,31,0.07),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(10,10,10,0.03),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(10,10,10,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.03)_1px,transparent_1px)] [background-size:72px_72px]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <header data-reveal-item className="mb-16 md:mb-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-4">
                <span
                  className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-[#ff3b1f]/0"
                  aria-hidden
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
                  Selected work
                </p>
              </div>
              <h2
                id="case-studies-heading"
                className="font-poppins text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground"
              >
                <span className="block text-balance">Case studies</span>
              </h2>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-foreground/48 md:text-base">
                Outcomes from real engagements structured so you can scan the
                problem, the path, and the impact without the noise.
              </p>
            </div>

            <div className="shrink-0 lg:max-w-xs lg:text-right">
              <div className="inline-flex flex-col gap-4 rounded-none border border-foreground/[0.08] bg-white/55 px-6 py-5 text-left shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_48px_-24px_rgba(10,10,10,0.08)] backdrop-blur-sm lg:text-right">
                <Lock
                  className="h-4 w-4 text-foreground/35 lg:ml-auto"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="text-[12.5px] leading-relaxed text-foreground/48">
                  Identities and specifics stay under NDA narratives are
                  representative of the work.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div>
          {caseStudies.map((study, index) => (
            <article
              key={index}
              data-reveal-item
              className="group border-t border-foreground/[0.07] py-16 first:border-t-0 first:pt-0 md:py-[4.5rem] lg:py-24"
            >
              <div className="relative border-l-2 border-transparent pl-5 transition-[border-color] duration-500 group-hover:border-[#ff3b1f]/35 md:pl-8">
                {/* Watermark: scoped to title block so it aligns with index + headline (not body columns) */}
                <div className="relative mb-10 min-h-[4.5rem] md:mb-12 md:min-h-[5.25rem]">
                  <span
                    className="pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2 select-none font-calegar text-[clamp(3.25rem,11vw,7rem)] leading-[0.85] tracking-tight text-foreground/[0.055]"
                    aria-hidden
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="relative z-[1] md:flex md:items-end md:justify-between md:gap-8">
                    <div className="min-w-0">
                      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="font-mono text-[11px] tabular-nums tracking-tight text-foreground/28">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ff3b1f]">
                          {study.category}
                        </span>
                      </div>
                      <h3 className="max-w-2xl font-poppins text-[1.5rem] font-medium leading-[1.15] tracking-[-0.02em] text-foreground md:text-[1.75rem] lg:text-[2rem]">
                        {study.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
                  <div className="min-w-0 lg:col-span-4">
                    <p className={labelClass}>
                      <Target
                        className="h-3.5 w-3.5 text-foreground/30"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      Challenge
                    </p>
                    <p className={bodyClass}>{study.challenge}</p>
                  </div>
                  <div className="min-w-0 lg:col-span-4">
                    <p className={labelClass}>
                      <Compass
                        className="h-3.5 w-3.5 text-foreground/30"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      Approach
                    </p>
                    <p className={bodyClass}>{study.approach}</p>
                  </div>
                  <div className="relative min-w-0 lg:col-span-4">
                    <div
                      className="absolute -inset-x-4 -inset-y-3 rounded-sm bg-gradient-to-br from-[#ff3b1f]/[0.06] via-transparent to-transparent md:-inset-x-5 md:-inset-y-4"
                      aria-hidden
                    />
                    <div className="relative border-l-2 border-[#ff3b1f]/35 pl-5 md:pl-6">
                      <p className={labelClass}>
                        <Sparkles
                          className="h-3.5 w-3.5 text-[#ff3b1f]/70"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        Result
                      </p>
                      <p className="text-[14px] font-medium leading-[1.82] text-foreground/72 md:text-[15px] md:leading-[1.84]">
                        {study.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

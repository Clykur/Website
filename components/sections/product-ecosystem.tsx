import { ScrollReveal } from "@/components/landing/scroll-reveal";
import {
  EcosystemVisual,
  type EcosystemVisualType,
} from "@/components/landing/section-diagrams";

const pillars = [
  {
    title: "Business automation",
    description:
      "Tools that streamline operations and reduce manual work so teams can focus on what matters.",
    visual: "automation" as const,
  },
  {
    title: "Digital trust",
    description:
      "Platforms that build credibility and transparency between businesses and professionals.",
    visual: "trust" as const,
  },
  {
    title: "Productivity infrastructure",
    description:
      "Software that helps teams ship faster, collaborate better, and scale with confidence.",
    visual: "infrastructure" as const,
  },
  {
    title: "Modern SaaS workflows",
    description:
      "Scalable products built for growth from scheduling to trust to the next category we define.",
    visual: "saas" as const,
  },
] as const satisfies { title: string; description: string; visual: EcosystemVisualType }[];

export function ProductEcosystem() {
  return (
    <section
      id="ecosystem"
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="ecosystem-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-white" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-18%,rgba(255,59,31,0.05),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#fafaf9]/50 to-[#f5f5f4]/40"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <header data-reveal-item className="mb-10 md:mb-14">
          <div className="mb-4 flex items-center gap-4">
            <span
              className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent"
              aria-hidden
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
              Long-term vision
            </p>
          </div>
          <h2
            id="ecosystem-heading"
            className="font-poppins text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.03em] text-foreground"
          >
            Product ecosystem
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground/48 md:text-base">
            We&apos;re building a coherent suite of products that improve how
            businesses operate automation, trust, productivity, and modern
            SaaS workflows. More is in development; the direction is deliberate.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              data-reveal-item
              className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_22px_50px_-34px_rgba(10,10,10,0.1)] transition-shadow duration-300 hover:border-foreground/[0.11] hover:shadow-[0_24px_56px_-30px_rgba(255,59,31,0.1)]"
            >
              <EcosystemVisual type={pillar.visual} idPrefix="page-ecosystem" density="card" />
              <div className="flex flex-1 flex-col border-t border-foreground/[0.06] bg-white px-5 py-6 md:px-6 md:py-7">
                <h3 className="font-poppins text-lg font-medium leading-snug tracking-[-0.02em] text-foreground md:text-[1.125rem]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.75] text-foreground/52 md:text-[14px]">
                  {pillar.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p
          data-reveal-item
          className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/38 md:mt-12"
        >
          Additional products in the pipeline
        </p>
      </ScrollReveal>
    </section>
  );
}

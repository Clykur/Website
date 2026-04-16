import { Code2, Layers, Target, TrendingUp, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { cn } from "@/lib/utils";

const whyPillars = [
  {
    icon: Target,
    title: "Product thinking",
    description:
      "We build with the end user and the business outcome in mind. Every decision architecture, UX, scope serves the product.",
  },
  {
    icon: Code2,
    title: "Engineering excellence",
    description:
      "Clean code, strong fundamentals, and modern practices. We don't cut corners; we build systems that last.",
  },
  {
    icon: Zap,
    title: "Execution speed",
    description:
      "We move fast without sacrificing quality. Clear communication, defined scope, and delivery you can count on.",
  },
  {
    icon: Layers,
    title: "Clean architecture",
    description:
      "Scalable structure from day one. We build so your team can iterate, extend, and own the codebase long after we ship.",
  },
  {
    icon: TrendingUp,
    title: "Scalable systems",
    description:
      "From MVP to scale, we design for growth. Performance, maintainability, and the right abstractions from the start.",
  },
] as const;

export function About() {
  return (
    <section
      id="about"
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="about-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-white" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-20%,rgba(255,59,31,0.045),transparent_55%)]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <header data-reveal-item className="mb-12 md:mb-16">
          <div className="mb-4 flex items-center gap-4">
            <span
              className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent"
              aria-hidden
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
              Why work with us
            </p>
          </div>
          <h2
            id="about-heading"
            className="font-poppins text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.03em] text-foreground"
          >
            Why Clykur
          </h2>
        </header>

        {/* Single panel — pillars read as one system */}
        <div
          data-reveal-item
          className="mb-16 overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white/90 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_20px_48px_-36px_rgba(10,10,10,0.07)] md:mb-20"
        >
          <div className="grid grid-cols-1 divide-y divide-foreground/[0.07] md:grid-cols-2 md:divide-x md:divide-y-0">
            {whyPillars.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className={cn(
                  "flex gap-4 p-6 md:gap-5 md:p-8 lg:p-9",
                  index === 4 && "md:col-span-2 lg:px-12",
                )}
              >
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#ff3b1f]/80"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div
                  className={cn("min-w-0", index === 4 && "max-w-3xl md:mx-auto")}
                >
                  <h3 className="font-poppins text-base font-medium leading-snug tracking-[-0.02em] text-foreground md:text-[17px]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.75] text-foreground/52 md:text-[14px]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story — calm band, no full-bleed break */}
        <div
          data-reveal-item
          className="rounded-2xl border border-foreground/[0.06] bg-gradient-to-b from-[#fafaf9] to-[#f5f5f4]/80 px-6 py-10 md:px-10 md:py-12 lg:px-12"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground/40">
            Our story
          </p>
          <h3 className="mt-3 font-poppins text-xl font-medium tracking-[-0.02em] text-foreground md:text-2xl">
            Why we build
          </h3>
          <div className="mt-8 w-full space-y-6 text-justify text-[15px] leading-[1.75] text-foreground/55 md:text-base">
            <p>
              Clykur exists to ship software that matters products that solve real
              problems and partnerships that hit dates, specs, and quality bars
              without excuses. Craft, clarity, and measurable impact are the
              standard, not talking points.
            </p>
            <p>
              Cusown and FreeTrust are not demos on a slide: we build them to
              compete in-market and to hold ourselves to the same rigor we bring
              to client work. Alongside that, we partner with companies to deliver
              production-grade systems one playbook: strong engineering,
              product-led judgment, and execution you can build a roadmap on.
            </p>
          </div>
          <p className="mt-8 w-full border-l-2 border-[#ff3b1f]/45 pl-5 text-justify text-[15px] font-medium leading-[1.75] text-foreground md:text-base">
            Remote-first and global, with a long-term view on every engagement.
            If you are shipping something that matters, we are ready to build it
            with you start to finish.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

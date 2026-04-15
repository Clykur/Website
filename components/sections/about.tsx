import { Target, Code2, Zap, Layers, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { TiltCard } from "@/components/landing/tilt-card";

const whyPillars = [
  {
    icon: Target,
    title: "Product thinking",
    description:
      "We build with the end user and the business outcome in mind. Every decision (architecture, UX, scope) serves the product.",
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
];

export function About() {
  return (
    <section
      id="about"
      className="relative clykur-story-section bg-white"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 -z-10 bg-white" aria-hidden />

      <ScrollReveal className="clykur-story-shell">
        <header data-reveal-item className="mb-16 text-center md:mb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Why work with us
          </p>
          <h2 id="about-heading" className="text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Why Clykur
          </h2>
        </header>

        <div className="mb-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {whyPillars.map(({ icon: Icon, title, description }) => (
            <div key={title} data-reveal-item>
              <TiltCard>
                <div className="clykur-card-shadow rounded-2xl border border-border bg-white p-6 transition-colors hover:border-border">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        <div data-reveal-item className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div className="border-y border-border bg-card px-4 py-12 sm:px-6 md:px-8 md:py-16 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-6xl w-full">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Our story
              </p>
              <h3 className="mb-8 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Why we build
              </h3>
              <div className="space-y-6">
                <p className="text-base leading-[1.7] text-muted-foreground md:text-lg">
                  We believe the best technology comes from teams that care
                  about craft, clarity, and impact. Clykur exists to build
                  meaningful software: products that solve real problems and
                  partnerships that ship.
                </p>
                <p className="text-base leading-[1.7] text-muted-foreground md:text-lg">
                  We build our own products (Cusown, FreeTrust) to prove we can
                  create category-defining tools. We partner with companies to
                  build and ship high-quality software. In both cases, the
                  mission is the same: strong engineering, product-led thinking,
                  and execution that earns trust.
                </p>
                <div className="border-l-2 border-foreground/20 pl-6 pt-1">
                  <p className="text-base font-medium leading-[1.7] text-foreground md:text-lg">
                    Remote-first, global, and focused on the long term. If
                    you&apos;re building something that matters, we&apos;d like
                    to be part of it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

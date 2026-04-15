import { Zap, Shield, LayoutDashboard, Boxes } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { TiltCard } from "@/components/landing/tilt-card";

const pillars = [
  {
    icon: Zap,
    title: "Business automation",
    description:
      "Tools that streamline operations and reduce manual work so teams can focus on what matters.",
  },
  {
    icon: Shield,
    title: "Digital trust",
    description:
      "Platforms that build credibility and transparency between businesses and professionals.",
  },
  {
    icon: LayoutDashboard,
    title: "Productivity infrastructure",
    description:
      "Software that helps teams ship faster, collaborate better, and scale with confidence.",
  },
  {
    icon: Boxes,
    title: "Modern SaaS workflows",
    description:
      "Scalable products built for growth, from scheduling to trust to the next category we define.",
  },
];

export function ProductEcosystem() {
  return (
    <section
      id="ecosystem"
      className="clykur-story-section bg-white"
      aria-labelledby="ecosystem-heading"
    >
      <ScrollReveal className="clykur-story-shell">
        <header data-reveal-item className="mb-16 text-center md:mb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Long-term vision
          </p>
          <h2 id="ecosystem-heading" className="mb-4 text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Product ecosystem
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
            We&apos;re building a suite of products that improve how businesses
            operate: business automation, digital trust, productivity
            infrastructure, and modern SaaS workflows.
          </p>
          <p className="text-base font-medium text-muted-foreground/90">
            More products in development.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {pillars.map(({ icon: Icon, title, description }) => (
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
      </ScrollReveal>
    </section>
  );
}

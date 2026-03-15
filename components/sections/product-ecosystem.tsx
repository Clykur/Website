import { Zap, Shield, LayoutDashboard, Boxes } from "lucide-react";

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
      className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12"
      aria-labelledby="ecosystem-heading"
    >
      <div className="mx-auto max-w-6xl w-full">
        <header className="mb-16 md:mb-20 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Long-term vision
          </p>
          <h2
            id="ecosystem-heading"
            className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
          >
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
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}

import { ChevronDown, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Frontend engineering",
    description:
      "Production-ready interfaces from design to deployment. Clean code, modern frameworks, and performance that scales.",
  },
  {
    title: "Design-to-code implementation",
    description:
      "Figma, Sketch, or Adobe XD turned into pixel-perfect, accessible frontend. We match your design system and ship on time.",
  },
  {
    title: "Web applications",
    description:
      "Interactive web app UI with the right stack complex requirements turned into maintainable, shippable code.",
  },
  {
    title: "Mobile UI systems",
    description:
      "Native and cross-platform interfaces from mockups: motion, gestures, and consistency across devices.",
  },
  {
    title: "Performance optimization",
    description:
      "Tune the frontend for speed and stability bottlenecks removed, metrics in place, fast under real load.",
  },
  {
    title: "Component systems",
    description:
      "Documented component libraries that scale: design consistency and developer velocity baked in.",
  },
] as const;

function FlowConnector({ dir = "h" }: { dir?: "h" | "v" }) {
  if (dir === "v") {
    return (
      <div
        className="flex flex-col items-center justify-center py-2 md:hidden"
        aria-hidden
      >
        <div className="h-5 w-px bg-gradient-to-b from-[#ff3b1f]/40 to-foreground/15" />
        <ChevronDown className="my-1 h-4 w-4 text-[#ff3b1f]/50" strokeWidth={2} />
        <div className="h-5 w-px bg-gradient-to-b from-foreground/15 to-[#ff3b1f]/28" />
      </div>
    );
  }
  return (
    <div
      className="hidden w-10 shrink-0 flex-row items-center md:flex lg:w-12"
      aria-hidden
    >
      <div className="h-px min-w-[8px] flex-1 bg-gradient-to-r from-[#ff3b1f]/38 to-foreground/12" />
      <ChevronRight
        className="mx-0.5 h-5 w-5 shrink-0 text-[#ff3b1f]/55"
        strokeWidth={1.85}
      />
      <div className="h-px min-w-[8px] flex-1 bg-gradient-to-r from-foreground/12 to-[#ff3b1f]/28" />
    </div>
  );
}

/** HTML layout = sharp type; lines stay minimal. */
function ServicesFlowDiagram() {
  const nodeClass =
    "relative flex flex-1 flex-col rounded-xl border border-foreground/[0.09] bg-white/90 px-5 py-6 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_12px_32px_-20px_rgba(10,10,10,0.08)] md:min-h-[132px] md:px-6 md:py-7";
  const coreClass =
    "relative flex flex-1 flex-col rounded-xl border-2 border-[#ff3b1f]/35 bg-gradient-to-b from-white to-[#fff8f7] px-5 py-6 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_16px_40px_-24px_rgba(255,59,31,0.12)] md:min-h-[132px] md:px-6 md:py-7";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-foreground/[0.08] bg-gradient-to-b from-[#fafaf9] via-white to-[#f8f8f7] shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_28px_56px_-32px_rgba(10,10,10,0.09)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,rgba(10,10,10,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.035)_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#ff3b1f]/[0.06] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-foreground/[0.03] blur-3xl"
        aria-hidden
      />

      <div className="relative border-b border-foreground/[0.06] bg-white/50 px-5 py-4 md:px-8 md:py-4">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/45">
          Engagement flow
        </p>
      </div>

      <div className="relative z-[1] px-4 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Step 1 */}
          <div className={nodeClass}>
            <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-foreground/[0.1]" />
            <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-foreground/[0.1]" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/40">
              Input
            </p>
            <p className="mt-2 font-poppins text-[15px] font-medium leading-snug tracking-[-0.02em] text-foreground md:text-base">
              Design & product
            </p>
            <p className="mt-2 font-mono text-[11px] leading-relaxed text-foreground/42">
              Specs · systems · roadmap
            </p>
          </div>

          <FlowConnector />
          <FlowConnector dir="v" />

          {/* Step 2 — core */}
          <div className={coreClass}>
            <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#ff3b1f]/25" />
            <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#ff3b1f]/25" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff3b1f]/80">
              Core
            </p>
            <p className="mt-2 font-poppins text-[15px] font-medium leading-snug tracking-[-0.02em] text-foreground md:text-[17px]">
              Clykur engineering
            </p>
            <p className="mt-2 font-mono text-[11px] leading-relaxed text-foreground/48">
              Build · review · ship
            </p>
          </div>

          <FlowConnector />
          <FlowConnector dir="v" />

          {/* Step 3 */}
          <div className={nodeClass}>
            <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-foreground/[0.1]" />
            <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-foreground/[0.1]" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/40">
              Output
            </p>
            <p className="mt-2 font-poppins text-[15px] font-medium leading-snug tracking-[-0.02em] text-foreground md:text-base">
              Shipped product UI
            </p>
            <p className="mt-2 font-mono text-[11px] leading-relaxed text-foreground/42">
              Prod-ready · measurable · ownable
            </p>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-foreground/48 md:text-[14px]">
          One model end to end: your inputs land in our engineering core, and
          what ships is production UI your team can operate and extend.
        </p>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="services-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#f9f9f8]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-20%,rgba(255,59,31,0.055),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_100%_50%,rgba(10,10,10,0.02),transparent_60%)]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <header data-reveal-item className="mb-10 md:mb-12">
          <div className="mb-4 flex items-center gap-4">
            <span
              className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent"
              aria-hidden
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
              Engineering partnerships
            </p>
          </div>
          <h2
            id="services-heading"
            className="font-poppins text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.03em] text-foreground"
          >
            Engineering services
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground/48 md:text-base">
            We embed with product teams not ad-hoc tickets. Same rigor as our
            own products: clear scope, steady communication, delivery you can
            plan around.
          </p>
        </header>

        <div data-reveal-item className="mb-12 md:mb-14">
          <ServicesFlowDiagram />
        </div>

        <div data-reveal-item className="mb-3 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
            Capability map
          </p>
          <p className="font-mono text-[10px] text-foreground/32">06 disciplines</p>
        </div>

        <div
          data-reveal-item
          className="overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_56px_-36px_rgba(10,10,10,0.09)]"
        >
          <div className="border-b border-foreground/[0.06] bg-gradient-to-r from-[#fafaf9] to-white px-5 py-3.5 md:px-8">
            <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-[#ff3b1f] to-[#ff3b1f]/20" />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
              What we deliver
            </p>
          </div>
          <div className="grid grid-cols-1 divide-y divide-foreground/[0.06] bg-white md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={cn(
                  "group flex flex-col gap-2.5 p-6 transition-colors duration-300 md:p-8 lg:p-9",
                  "hover:bg-[#fafaf9]/70",
                )}
              >
                <span className="font-mono text-[10px] font-semibold tabular-nums text-[#ff3b1f]/85">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="font-poppins text-base font-medium leading-snug tracking-[-0.02em] text-foreground group-hover:text-foreground">
                  {service.title}
                </h3>
                <p className="text-[13px] leading-[1.75] text-foreground/50 md:text-[14px]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

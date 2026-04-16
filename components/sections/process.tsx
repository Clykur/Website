"use client";

import { ScrollReveal } from "@/components/landing/scroll-reveal";

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description:
      "Scope, timeline, and success criteria agreed in writing before build.",
  },
  {
    step: "02",
    title: "Design review",
    description:
      "Files checked for feasibility, responsiveness, and edge cases.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "UI implemented to spec: accessible, performant, maintainable.",
  },
  {
    step: "04",
    title: "Quality Assurance",
    description:
      "Verified across devices and browsers against the approved source.",
  },
  {
    step: "05",
    title: "Delivery",
    description:
      "Clean handoff, documentation, and a path for updates or phase two.",
  },
] as const;

export function Process() {
  return (
    <section
      id="process"
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="process-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#f8f8f7]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,59,31,0.05),transparent_55%)]"
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
              Process
            </p>
          </div>
          <h2
            id="process-heading"
            className="font-poppins text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.03em] text-foreground"
          >
            How we work
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/48 md:text-base">
            One pipeline, five stages. Same order on every engagement no
            guesswork about what happens next.
          </p>
        </header>

        {/* Single “sheet” — full process in one frame */}
        <div
          data-reveal-item
          className="overflow-hidden rounded-2xl border border-foreground/[0.09] bg-white shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_48px_-32px_rgba(10,10,10,0.08)]"
        >
          {/* Title block — reads like a drawing header */}
          <div className="flex flex-col gap-1 border-b border-foreground/[0.08] bg-[#fafaf9] px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/50">
              Delivery pipeline
            </p>
            <p className="font-mono text-[10px] tabular-nums text-foreground/38">
              01 → 05 · sequential gates
            </p>
          </div>

          {/* Brand rule — single horizontal anchor */}
          <div
            className="h-[3px] w-full bg-gradient-to-r from-[#ff3b1f]/85 via-[#ff3b1f]/35 to-foreground/[0.12]"
            aria-hidden
          />

          <ol
            className="grid grid-cols-1 divide-y divide-foreground/[0.08] md:grid-cols-5 md:divide-x md:divide-y-0"
            aria-label="Process steps from consultation through delivery"
          >
            {processSteps.map((item) => (
              <li
                key={item.step}
                className="flex flex-col bg-white px-5 py-7 md:min-h-[260px] md:px-4 md:py-8 lg:min-h-[272px] lg:px-5"
              >
                <span className="mb-4 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#ff3b1f]/40 bg-[#ff3b1f]/[0.06] font-mono text-[11px] font-semibold tabular-nums text-[#ff3b1f] md:h-10 md:w-10 md:text-[12px]">
                  {item.step}
                </span>
                <h3 className="font-poppins text-base font-medium leading-snug tracking-[-0.02em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-[13px] leading-[1.7] text-foreground/52">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="border-t border-foreground/[0.06] bg-[#fafaf9]/90 px-5 py-4 md:px-8">
            <p className="text-center text-[12px] leading-relaxed text-foreground/45 md:text-[13px]">
              Each stage closes with an explicit checkpoint before the next
              begins scope, quality, or sign-off.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { HomeSectionHeader } from "@/components/home/home-section-header";
import { HOME_AI_PROCESS_STEPS } from "@/lib/home-ai-native-content";

export function HomeAiProcessSection() {
  return (
    <section
      id="how-we-build"
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="home-ai-process-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-white"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,59,31,0.05),transparent_55%)]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <HomeSectionHeader
          eyebrow="Process"
          title="How we build"
          titleId="home-ai-process-heading"
          descriptionAlign="left"
          description="A simple timeline from discovery through production launch, with AI acceleration and engineer-led checkpoints at every stage."
        />

        <div
          data-reveal-item
          className="overflow-hidden rounded-2xl border border-foreground/[0.09] bg-white shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_48px_-32px_rgba(10,10,10,0.08)]"
        >
          <div className="border-b border-foreground/[0.08] bg-[#fafaf9] px-5 py-4 md:px-8">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/50">
              AI-native delivery timeline
            </p>
          </div>
          <div
            className="h-[3px] w-full bg-gradient-to-r from-[#ff3b1f]/85 via-[#ff3b1f]/35 to-foreground/[0.12]"
            aria-hidden
          />
          <ol className="relative grid grid-cols-1 divide-y divide-foreground/[0.08] md:grid-cols-6 md:divide-x md:divide-y-0">
            {HOME_AI_PROCESS_STEPS.map((item, index) => (
              <li
                key={item.step}
                className="relative flex flex-col bg-white px-5 py-7 text-left [hyphens:manual] md:min-h-[9.5rem] md:px-4 md:py-8 lg:px-5"
              >
                {index < HOME_AI_PROCESS_STEPS.length - 1 ? (
                  <span
                    className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-full max-w-[50%] -translate-y-1/2 bg-gradient-to-r from-[#ff3b1f]/25 to-transparent md:block"
                    aria-hidden
                  />
                ) : null}
                <span className="mb-4 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#ff3b1f]/40 bg-[#ff3b1f]/[0.06] font-mono text-[11px] font-semibold tabular-nums text-[#ff3b1f]">
                  {item.step}
                </span>
                <h3 className="font-poppins text-[15px] font-medium leading-snug tracking-[-0.02em] text-foreground">
                  {item.title}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </ScrollReveal>
    </section>
  );
}

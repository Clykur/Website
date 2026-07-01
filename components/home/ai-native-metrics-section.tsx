import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { homePremiumCardClassName } from "@/components/home/home-premium-card";
import { HomeSectionHeader } from "@/components/home/home-section-header";
import { AI_NATIVE_METRICS } from "@/lib/home-ai-native-content";
import { cn } from "@/lib/utils";

export function AiNativeMetricsSection() {
  return (
    <section
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="ai-metrics-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[#f9f9f8]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <HomeSectionHeader
          eyebrow="Outcomes"
          title="Built for speed and production quality"
          titleId="ai-metrics-heading"
          description="No vanity metrics. These are the standards we hold every AI-assisted engagement to."
        />

        <ul
          data-reveal-item
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {AI_NATIVE_METRICS.map((label) => (
            <li
              key={label}
              className={cn(
                homePremiumCardClassName,
                "flex min-h-[5.5rem] items-center justify-center text-center",
              )}
            >
              <p className="font-poppins text-[15px] font-medium leading-snug tracking-[-0.02em] text-foreground md:text-base">
                {label}
              </p>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}

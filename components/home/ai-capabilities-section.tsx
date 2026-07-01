import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { homePremiumCardClassName } from "@/components/home/home-premium-card";
import { HomeSectionHeader } from "@/components/home/home-section-header";
import { AI_CAPABILITIES } from "@/lib/home-ai-native-content";
import { cn } from "@/lib/utils";

export function AiCapabilitiesSection() {
  return (
    <section
      id="ai-capabilities"
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="ai-capabilities-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-white"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_100%_50%,rgba(10,10,10,0.02),transparent_60%)]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <HomeSectionHeader
          eyebrow="Capabilities"
          title="AI capabilities"
          titleId="ai-capabilities-heading"
          description="We use AI across the work we deliver: product builds, internal tools, integrations, and engineering workflows, always reviewed by experienced developers."
        />

        <ul
          data-reveal-item
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5"
        >
          {AI_CAPABILITIES.map(({ title, icon: Icon }) => (
            <li
              key={title}
              className={cn(homePremiumCardClassName, "flex flex-col gap-3")}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/[0.08] bg-[#fafaf9] text-[#ff3b1f]/90">
                <Icon
                  className="h-[18px] w-[18px]"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </span>
              <h3 className="font-poppins text-[15px] font-medium leading-snug tracking-[-0.02em] text-foreground">
                {title}
              </h3>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}

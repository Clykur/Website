import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { HomePremiumCard } from "@/components/home/home-premium-card";
import { HomeSectionHeader } from "@/components/home/home-section-header";
import { WHY_AI_NATIVE_CARDS } from "@/lib/home-ai-native-content";

export function WhyAiNativeSection() {
  return (
    <section
      id="why-ai-native"
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="why-ai-native-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-white"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(255,59,31,0.045),transparent_58%)]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <HomeSectionHeader
          eyebrow="AI-native delivery"
          title="Why AI-Native Development?"
          titleId="why-ai-native-heading"
          descriptionAlign="left"
          description="Every project we deliver is accelerated through AI-assisted workflows across design, development, testing, documentation, and deployment. AI helps us move faster. Experienced engineers ensure every release is production-ready."
        />

        <div
          data-reveal-item
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {WHY_AI_NATIVE_CARDS.map((card, index) => (
            <HomePremiumCard
              key={card.title}
              title={card.title}
              description={card.description}
              className="relative"
            >
              <span className="mb-3 inline-flex font-mono text-[10px] font-semibold tabular-nums text-[#ff3b1f]/85">
                {(index + 1).toString().padStart(2, "0")}
              </span>
            </HomePremiumCard>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

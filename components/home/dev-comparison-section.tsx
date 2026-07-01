import { Check, Minus } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { HomeSectionHeader } from "@/components/home/home-section-header";
import {
  AI_NATIVE_DEV_ITEMS,
  TRADITIONAL_DEV_ITEMS,
} from "@/lib/home-ai-native-content";

function ComparisonColumn({
  title,
  items,
  variant,
}: {
  title: string;
  items: readonly string[];
  variant: "traditional" | "ai-native";
}) {
  const isAi = variant === "ai-native";

  return (
    <div
      className={
        isAi
          ? "flex flex-col rounded-xl border-2 border-[#ff3b1f]/30 bg-gradient-to-b from-white to-[#fff8f7] p-6 md:p-8"
          : "flex flex-col rounded-xl border border-foreground/[0.08] bg-white p-6 md:p-8"
      }
    >
      <p
        className={
          isAi
            ? "font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff3b1f]/85"
            : "font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/42"
        }
      >
        {title}
      </p>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={
                isAi
                  ? "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#ff3b1f]/35 bg-[#ff3b1f]/[0.06]"
                  : "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-foreground/[0.1] bg-[#fafaf9]"
              }
              aria-hidden
            >
              {isAi ? (
                <Check className="h-3 w-3 text-[#ff3b1f]" strokeWidth={2.5} />
              ) : (
                <Minus className="h-3 w-3 text-foreground/35" strokeWidth={2} />
              )}
            </span>
            <span className="text-[14px] leading-relaxed text-foreground/62 md:text-[15px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DevComparisonSection() {
  return (
    <section
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="dev-comparison-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[#f8f8f7]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <HomeSectionHeader
          eyebrow="Compare"
          title="Traditional Development vs AI-Native Engineering"
          titleId="dev-comparison-heading"
        />

        <div
          data-reveal-item
          className="overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white/90 p-4 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_56px_-36px_rgba(10,10,10,0.09)] md:p-6 lg:p-8"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <ComparisonColumn
              title="Traditional"
              items={TRADITIONAL_DEV_ITEMS}
              variant="traditional"
            />
            <ComparisonColumn
              title="AI-Native"
              items={AI_NATIVE_DEV_ITEMS}
              variant="ai-native"
            />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

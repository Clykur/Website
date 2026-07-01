import { MoreHorizontal } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { HomeSectionHeader } from "@/components/home/home-section-header";
import { TechStackLogo } from "@/components/home/tech-stack-logos";
import {
  TECH_STACK_ITEMS,
  TECH_STACK_MORE_LABEL,
} from "@/lib/home-ai-native-content";
import { cn } from "@/lib/utils";

const techCardClassName =
  "group flex flex-col items-center justify-center gap-2.5 rounded-xl border border-foreground/[0.08] bg-white px-3 py-4 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_8px_24px_-16px_rgba(10,10,10,0.08)] transition-[border-color,box-shadow] duration-300 hover:border-foreground/[0.12] hover:shadow-[0_12px_32px_-20px_rgba(10,10,10,0.1)] md:gap-3 md:py-5";

export function TechStackSection() {
  return (
    <section
      id="technology-stack"
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="tech-stack-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[#f9f9f8]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <HomeSectionHeader
          eyebrow="Stack"
          title="Technology stack"
          titleId="tech-stack-heading"
          description="Technologies we work with across AI systems, product engineering, and cloud delivery."
        />

        <ul
          data-reveal-item
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4"
        >
          {TECH_STACK_ITEMS.map((name) => (
            <li key={name}>
              <div className={cn(techCardClassName)}>
                <TechStackLogo name={name} />
                <span className="text-center font-poppins text-[11px] font-medium leading-tight tracking-[-0.01em] text-foreground/62 md:text-xs">
                  {name}
                </span>
              </div>
            </li>
          ))}
          <li>
            <div
              className={cn(
                techCardClassName,
                "border-dashed border-foreground/[0.12] bg-[#fafaf9]/80",
              )}
            >
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/[0.08] bg-white text-foreground/45 md:h-8 md:w-8"
                aria-hidden
              >
                <MoreHorizontal className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="text-center font-poppins text-[11px] font-medium leading-tight tracking-[-0.01em] text-foreground/52 md:text-xs">
                {TECH_STACK_MORE_LABEL}
              </span>
            </div>
          </li>
        </ul>
      </ScrollReveal>
    </section>
  );
}

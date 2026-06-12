import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WorkPortfolioGrid } from "@/components/client-works/work-portfolio-grid";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import {
  StoryPageBackdrop,
  StoryPageHero,
} from "@/components/layout/story-page-shell";
import { CLIENT_WORKS } from "@/lib/client-works";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import { SITE_NAME } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Client work",
  description: `Live sites and digital experiences built by ${SITE_NAME}: cafés, travel, creative studios, and more.`,
  path: "/work",
});

export default function WorkIndexPage() {
  return (
    <StoryPageBackdrop>
      <StoryPageHero
        titleId="work-page-heading"
        title="Client work"
        eyebrow="Portfolio"
        lede="Production sites we design, build, and ship. Every project below is live."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Client work", href: "/work" },
        ]}
      />

      <ScrollReveal className="clykur-story-section border-t border-foreground/[0.04] pb-[max(6rem,env(safe-area-inset-bottom))] pt-12 md:pt-16">
        <div className="clykur-story-shell mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            data-reveal-item
            className="mb-10 flex flex-col gap-4 border-b border-foreground/[0.06] pb-8 sm:flex-row sm:items-end sm:justify-between md:mb-12"
          >
            <p className="max-w-xl text-[15px] leading-relaxed text-foreground/50">
              A uniform grid of shipped work. Add a new launch in the portfolio
              list and it appears here automatically.
            </p>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/35">
              {worksCountLabel(CLIENT_WORKS.length)}
            </p>
          </div>

          <WorkPortfolioGrid works={CLIENT_WORKS} />

          <div
            data-reveal-item
            className="mt-16 flex flex-col items-center justify-center gap-6 border-t border-foreground/[0.06] pt-14 md:mt-20 md:pt-16"
          >
            <p className="max-w-md text-center text-[14px] leading-relaxed text-foreground/45">
              Need a site or product with this level of polish? We handle
              strategy, design, and engineering end to end.
            </p>
            <Link
              href="/contact#inquiry-form"
              className={cn(
                primaryGradientCtaClassName,
                "inline-flex items-center gap-2",
              )}
            >
              Start a project
              <ArrowUpRight
                className="h-4 w-4"
                strokeWidth={1.85}
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </StoryPageBackdrop>
  );
}

function worksCountLabel(count: number): string {
  return `${String(count).padStart(2, "0")} live projects`;
}

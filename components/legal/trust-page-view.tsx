import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import {
  StoryPageBackdrop,
  storyHeroH1Class,
} from "@/components/layout/story-page-shell";
import { LegalEntity } from "@/components/legal/legal-entity";
import { LegalTrustBanner } from "@/components/legal/legal-trust-banner";
import { cn } from "@/lib/utils";

type TrustPageViewProps = {
  title: string;
  introSummary: string;
  intro?: string;
  lastUpdated?: string;
  children: ReactNode;
  showEntityTop?: boolean;
};

export function TrustPageView({
  title,
  introSummary,
  intro,
  lastUpdated,
  children,
  showEntityTop = true,
}: TrustPageViewProps) {
  return (
    <StoryPageBackdrop className="legal-prose-page min-w-0 overflow-x-clip font-poppins">
      <section className="clykur-story-section border-b border-foreground/[0.05] pb-8 pt-[max(6rem,calc(env(safe-area-inset-top)+4.5rem))] md:pb-10 md:pt-[max(7rem,calc(env(safe-area-inset-top)+5rem))]">
        <article className="clykur-story-shell mx-auto w-full min-w-0 max-w-4xl px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="-ml-1 inline-flex min-h-[44px] items-center gap-2 rounded-md px-1 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/42 transition-colors hover:text-[#ff3b1f]"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.85} aria-hidden />
            Back to home
          </Link>
          <header className="mt-8 md:mt-10">
            <div className="mb-4 flex items-center gap-4">
              <span
                className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent"
                aria-hidden
              />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/40">
                Trust
              </p>
            </div>
            <h1
              className={cn(
                storyHeroH1Class,
                "break-words text-[clamp(1.75rem,5vw,3rem)]",
              )}
            >
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-[14px] font-medium leading-snug text-foreground/55 sm:text-[15px] md:text-base">
              {introSummary}
            </p>
            {intro ? (
              <p className="mt-4 text-[14px] leading-[1.82] text-foreground/52 md:text-[15px]">
                {intro}
              </p>
            ) : null}
            {lastUpdated ? (
              <p className="mt-6 border-t border-foreground/[0.05] pt-5 text-[11px] text-foreground/32">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                  Last updated
                </span>
                <span className="mx-1.5" aria-hidden>
                  ·
                </span>
                <span className="tabular-nums">{lastUpdated}</span>
              </p>
            ) : null}
          </header>
          {showEntityTop ? (
            <LegalEntity variant="full" className="mt-8" />
          ) : null}
        </article>
      </section>

      <div className="clykur-story-section clykur-story-shell mx-auto w-full min-w-0 max-w-4xl px-4 pb-24 sm:px-6 sm:pb-28 md:pb-32 lg:px-10">
        <div className="mt-2 space-y-6 sm:space-y-8 md:space-y-9">
          {children}
        </div>
        <LegalTrustBanner className="mt-10 sm:mt-12" />
        <LegalEntity variant="compact" className="mt-8" />
      </div>
    </StoryPageBackdrop>
  );
}

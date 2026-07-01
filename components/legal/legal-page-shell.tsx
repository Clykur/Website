import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import {
  StoryPageBackdrop,
  storyHeroH1Class,
  storyHeroTopPaddingClass,
} from "@/components/layout/story-page-shell";
import { LegalEntity } from "@/components/legal/legal-entity";
import { LegalTrustBanner } from "@/components/legal/legal-trust-banner";
import { cn } from "@/lib/utils";

/** Registered office / contractual venue for disputes under Indian law (website & general terms). */
export const LEGAL_VENUE_CITY = "Bengaluru, Karnataka, India";

const linkClass =
  "font-medium text-[#ff3b1f] underline-offset-[3px] transition-colors hover:underline";

/** Justified body copy in legal and policy pages. */
const justifyProse = "break-words text-pretty text-justify [hyphens:auto]";

export const legalSectionClass = "space-y-4 md:space-y-5";

export const legalSectionSurfaceClass =
  "scroll-mt-20 rounded-2xl border border-foreground/[0.07] bg-white/[0.72] px-4 py-6 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_24px_56px_-40px_rgba(15,15,15,0.14)] backdrop-blur-[2px] sm:scroll-mt-24 sm:px-5 sm:py-7 md:px-8 md:py-8 dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-[0_24px_56px_-40px_rgba(0,0,0,0.45)]";

export const legalH2Class =
  "text-left font-poppins text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-foreground sm:text-[1.125rem] md:text-xl";

export const legalH3Class =
  "mt-5 text-left font-poppins text-[14px] font-semibold leading-snug tracking-[-0.01em] text-foreground/90 sm:mt-6 sm:text-[15px] md:text-base";

export const legalPClass = cn(
  justifyProse,
  "text-[14px] leading-[1.88] text-foreground/62 md:text-[15px] md:leading-[1.9]",
);

export const legalUlClass = cn(
  justifyProse,
  "list-disc space-y-2.5 pl-4 text-[14px] leading-[1.82] text-foreground/62 marker:text-foreground/35 sm:pl-5 md:text-[15px]",
);

export const legalDividerClass =
  "my-6 w-full max-w-full border-0 border-t border-foreground/[0.07] sm:my-8 md:my-10";

/** Highlight / note block inside a legal section (e.g. “Why this matters”). */
export const legalCalloutClass =
  "rounded-xl border border-foreground/[0.08] border-l-[3px] border-l-[#ff3b1f]/40 bg-[#ff3b1f]/[0.03] px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6";

type LegalPageShellProps = {
  title: string;
  /** One short line below the title (scan-friendly summary). */
  introSummary?: string;
  intro?: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPageShell({
  title,
  introSummary,
  intro,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <StoryPageBackdrop className="legal-prose-page min-w-0 overflow-x-clip font-poppins">
      <section
        className={cn(
          "clykur-story-section border-b border-foreground/[0.05] pb-8 md:pb-10",
          storyHeroTopPaddingClass,
        )}
      >
        <article className="clykur-story-shell mx-auto w-full min-w-0 max-w-4xl px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="-ml-1 inline-flex min-h-[44px] items-center gap-2 rounded-md px-1 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/42 transition-colors hover:text-[#ff3b1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25"
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
                Legal
              </p>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 border-b border-foreground/[0.08] pb-8 sm:pb-10 md:pb-12">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/32">
                Clykur · {LEGAL_VENUE_CITY.split(",")[0]}
              </p>
            </div>
            <h1
              className={cn(
                storyHeroH1Class,
                "mt-6 break-words sm:mt-8 text-[clamp(1.75rem,5vw,3rem)]",
              )}
            >
              {title}
            </h1>
            {introSummary ? (
              <p className="mt-4 max-w-2xl text-[14px] font-medium leading-snug tracking-[-0.015em] text-foreground/55 sm:mt-5 sm:text-[15px] md:text-base">
                {introSummary}
              </p>
            ) : null}
            {intro ? (
              <p
                className={cn(
                  justifyProse,
                  introSummary ? "mt-5" : "mt-6",
                  "max-w-none text-[14px] leading-[1.82] text-foreground/52 md:text-[15px]",
                )}
              >
                {intro}
              </p>
            ) : null}
            <p className="mt-6 border-t border-foreground/[0.05] pt-5 text-[11px] leading-relaxed text-foreground/32 md:mt-7 md:pt-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                Last updated
              </span>
              <span className="mx-1.5 text-foreground/20" aria-hidden>
                ·
              </span>
              <span className="tabular-nums">{lastUpdated}</span>
            </p>
            <LegalEntity variant="full" className="mt-8" />
          </header>
        </article>
      </section>

      <div className="clykur-story-section clykur-story-shell mx-auto w-full min-w-0 max-w-4xl px-4 pb-24 sm:px-6 sm:pb-28 md:pb-32 lg:px-10">
        <div className="mt-2 space-y-6 sm:space-y-8 md:space-y-9">
          {children}
        </div>

        <LegalTrustBanner className="mt-10 sm:mt-12" />
        <LegalEntity variant="compact" className="mt-8" />

        <p
          className={cn(
            justifyProse,
            "mt-12 border-t border-foreground/[0.07] pt-8 text-[13px] leading-[1.85] text-foreground/48 sm:mt-16 sm:pt-10 md:mt-20",
          )}
        >
          Questions about these documents? Write to us at{" "}
          <a href="mailto:info@clykur.com" className={linkClass}>
            info@clykur.com
          </a>
          . We will respond within a reasonable time, subject to legal or
          technical complexity.
        </p>
      </div>
    </StoryPageBackdrop>
  );
}

export function LegalSection({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      className={cn(legalSectionSurfaceClass, legalSectionClass, className)}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className={legalH2Class}>
        {title}
      </h2>
      {children}
    </section>
  );
}

import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import type { SeoBreadcrumbItem } from "@/lib/seo/types";
import { cn } from "@/lib/utils";

export function eyebrowFromPath(path: string): string {
  const segment = path.replace(/^\//, "").split("/")[0];
  if (!segment) return "Clykur";
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type StoryPageBackdropProps = {
  children: ReactNode;
  className?: string;
};

/** Full-page gradient background used on process-style routes. */
export function StoryPageBackdrop({
  children,
  className,
}: StoryPageBackdropProps) {
  return (
    <div className={cn("relative isolate min-h-full w-full", className)}>
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_100%_70%_at_50%_-20%,rgba(255,59,31,0.07),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#fafaf9] via-white to-[#f8f8f7]"
        aria-hidden
      />
      {children}
    </div>
  );
}

export const storyHeroH1Class =
  "font-poppins text-[clamp(2.5rem,6vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground";

export const storyHeroLedeClass =
  "mt-6 max-w-2xl text-pretty text-justify [hyphens:auto] text-[15px] leading-[1.8] text-foreground/48 md:text-lg";

export const storySectionH2Class =
  "font-poppins text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.02em] text-foreground text-left";

export const storyBodyProseClass =
  "text-pretty text-justify [hyphens:auto] text-[15px] leading-[1.85] text-foreground/62 md:text-[16px]";

export const storySurfaceCardClass =
  "rounded-2xl border border-foreground/[0.08] bg-white shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_48px_-32px_rgba(10,10,10,0.08)]";

/** Clears fixed nav (h-16 / md:h-20) plus comfortable space before breadcrumbs or title */
export const storyHeroTopPaddingClass =
  "pt-[max(7.75rem,calc(env(safe-area-inset-top)+5.75rem))] md:pt-[max(9.25rem,calc(env(safe-area-inset-top)+6.75rem))]";

type StoryPageHeroProps = {
  title: string;
  titleId?: string;
  lede?: ReactNode;
  eyebrow?: string;
  breadcrumbs?: SeoBreadcrumbItem[];
  actions?: ReactNode;
  headerExtra?: ReactNode;
  centered?: boolean;
  /** default: narrow lede column; wide: use full story shell width */
  contentWidth?: "default" | "wide";
  /** Hairline under hero; off for continuous flows (e.g. careers) */
  showSectionDivider?: boolean;
};

export function StoryPageHero({
  title,
  titleId,
  lede,
  eyebrow,
  breadcrumbs,
  actions,
  headerExtra,
  centered = false,
  contentWidth = "default",
  showSectionDivider = true,
}: StoryPageHeroProps) {
  return (
    <section
      className={cn(
        "clykur-story-section pb-10 md:pb-14",
        showSectionDivider && "border-b border-foreground/[0.05]",
        storyHeroTopPaddingClass,
      )}
      aria-labelledby={titleId}
    >
      <div className="clykur-story-shell mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div
          className={cn(
            contentWidth === "wide" ? "max-w-none" : "max-w-3xl",
            centered && "mx-auto text-center",
            breadcrumbs?.length ? undefined : "pt-0",
          )}
        >
          {eyebrow ? (
            <div
              className={cn(
                "mb-4 flex items-center gap-4",
                centered && "justify-center",
              )}
            >
              <span
                className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent"
                aria-hidden
              />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/40">
                {eyebrow}
              </p>
            </div>
          ) : null}
          <h1 id={titleId} className={storyHeroH1Class}>
            {title}
          </h1>
          {lede ? (
            <p className={cn(storyHeroLedeClass, centered && "mx-auto")}>
              {lede}
            </p>
          ) : null}
          {actions ? (
            <div
              className={cn(
                "mt-8 flex flex-wrap gap-3",
                centered && "justify-center",
              )}
            >
              {actions}
            </div>
          ) : null}
          {headerExtra}
        </div>
      </div>
    </section>
  );
}

type StoryPageMainProps = {
  children: ReactNode;
  className?: string;
  width?: "narrow" | "default" | "wide";
  as?: "div" | "article";
};

const widthClass = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-6xl",
} as const;

export function StoryPageMain({
  children,
  className,
  width = "default",
  as: Tag = "div",
}: StoryPageMainProps) {
  return (
    <Tag
      className={cn(
        "clykur-story-section clykur-story-shell mx-auto w-full min-w-0 px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-10 sm:px-6 sm:pb-28 md:pt-12 lg:px-8",
        widthClass[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

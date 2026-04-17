import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CinematicWorkTile } from "@/components/client-works/cinematic-work-tile";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { CLIENT_WORKS } from "@/lib/client-works";
import { SITE_NAME } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Client work",
  description: `Live sites and digital experiences built by ${SITE_NAME} — cafés, travel, creative studios, and more.`,
  openGraph: {
    title: `Client work | ${SITE_NAME}`,
    description:
      "Explore live projects: brand sites, product marketing, and experiences shipped production-ready.",
  },
};

export default function WorkIndexPage() {
  return (
    <div className="relative isolate min-h-full w-full">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_100%_70%_at_50%_-20%,rgba(255,59,31,0.06),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#fafaf9] via-white to-[#fafaf9]"
        aria-hidden
      />

      <section
        className="clykur-story-section border-b border-foreground/[0.05] pb-10 pt-[max(6rem,calc(env(safe-area-inset-top)+4.5rem))] md:pb-14 md:pt-[max(7rem,calc(env(safe-area-inset-top)+5rem))]"
        aria-labelledby="work-page-heading"
      >
        <div className="clykur-story-shell max-w-6xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/42 transition-colors hover:text-[#ff3b1f] md:mb-12"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.85} aria-hidden />
            Back to home
          </Link>
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/40">
              Portfolio
            </p>
            <h1
              id="work-page-heading"
              className="mt-4 font-poppins text-[clamp(2.5rem,6vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground"
            >
              Client work
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-foreground/48 md:text-lg">
              Every launch below is live and crafted with the same rigor we apply
              to product UI, motion, and performance.
            </p>
          </div>
        </div>
      </section>

      <ScrollReveal className="clykur-story-section border-t border-foreground/[0.04] pb-[max(6rem,env(safe-area-inset-bottom))] pt-12 md:pt-16">
        <div className="clykur-story-shell max-w-6xl">
          <ul className="grid list-none grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {CLIENT_WORKS.map((work, index) => (
              <li key={work.href} data-reveal-item className="min-w-0">
                <CinematicWorkTile
                  work={work}
                  index={index}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </li>
            ))}
          </ul>

          <div
            data-reveal-item
            className="mt-16 flex flex-col items-center justify-center gap-6 border-t border-foreground/[0.06] pt-14 md:mt-20 md:pt-16"
          >
            <p className="max-w-md text-center text-[13px] leading-relaxed text-foreground/42 md:text-[14px]">
              Want something similar for your brand? We design and ship
              production-ready experiences end to end.
            </p>
            <Link
              href="/#contact"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-foreground/[0.1] bg-white px-6 py-3",
                "font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/55",
                "shadow-[0_12px_32px_-24px_rgba(10,10,10,0.12)] transition-[color,transform,border-color] duration-300",
                "hover:-translate-y-0.5 hover:border-[#ff3b1f]/25 hover:text-[#ff3b1f]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/35 focus-visible:ring-offset-2",
              )}
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.85} aria-hidden />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

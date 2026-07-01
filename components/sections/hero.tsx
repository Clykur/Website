"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { useMobileViewport } from "@/hooks/use-performance-mode";
import { DiscoveryCta } from "@/components/marketing/discovery-cta";

const HeroVisual = dynamic(
  () => import("@/components/landing/hero-visual").then((m) => m.HeroVisual),
  { ssr: false },
);

const sectionClassName =
  "clykur-story-section relative flex min-h-screen w-full items-center justify-center overflow-hidden !pb-[max(5rem,env(safe-area-inset-bottom))] !pt-[max(5.5rem,env(safe-area-inset-top))] md:!py-24 lg:!py-28";

const scrollRevealRowClassName =
  "flex w-full flex-col items-stretch gap-14 lg:flex-row lg:items-center lg:justify-center lg:gap-14 xl:gap-16";

function HeroMarketingContent({ heading }: { heading: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <div className="flex items-stretch gap-3.5 sm:gap-5">
        <div
          className="mt-1 w-[2.5px] shrink-0 rounded-full bg-gradient-to-b from-[#ff3b1f] via-[#ff3b1f]/50 to-[#ff3b1f]/8 sm:mt-1.5 sm:w-[3px]"
          aria-hidden
        />
        {heading}
      </div>

      <DiscoveryCta
        className="mt-8 w-full max-w-md sm:mt-9"
        primaryLabel="Start Your Project"
        secondaryHref="#how-we-build"
        secondaryLabel="See How We Build"
      />

      <p
        data-reveal-item
        className="mt-6 max-w-lg text-left font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.14em] text-foreground/38 sm:mt-8 sm:text-[11px] sm:leading-normal sm:tracking-[0.16em]"
      >
        <span className="text-foreground/38">From strategy to production</span>
        <span className="mx-2 text-foreground/15" aria-hidden>
          ·
        </span>
        <span className="text-foreground/38">
          One studio · Global by default
        </span>
      </p>
    </div>
  );
}

/**
 * Mobile hero: no scroll-linked `useScroll` (saves per-frame work). Uses one-shot
 * entrance + ambient background pulse: same premium cues as desktop, lighter math.
 */
function HeroMobileLite({ heading }: { heading: ReactNode }) {
  const reduce = useReducedMotion();
  const easeOut = [0.22, 1, 0.36, 1] as const;

  return (
    <section className={sectionClassName} aria-labelledby="hero-heading">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_25%,rgba(255,90,60,0.12),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(255,59,31,0.1),transparent_40%)]"
        aria-hidden
      />
      <motion.div
        animate={reduce ? undefined : { opacity: [0.22, 0.32, 0.22] }}
        transition={{
          duration: 10,
          repeat: reduce ? 0 : Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_40%,rgba(255,59,31,0.18),transparent_35%)]"
        aria-hidden
      />

      <div className="clykur-story-shell relative z-[1] w-full max-w-6xl">
        <ScrollReveal className={scrollRevealRowClassName}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.65,
              ease: easeOut,
            }}
            className="will-change-transform w-full max-w-2xl text-left lg:max-w-[min(100%,40rem)]"
          >
            <HeroMarketingContent heading={heading} />
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : 0.06,
              ease: easeOut,
            }}
            className="will-change-transform w-full max-w-2xl lg:mt-6 lg:max-w-[min(100%,38rem)] max-lg:mx-auto max-lg:max-w-[min(100%,26rem)] xl:mt-8"
          >
            <HeroVisual />
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function HeroDesktopParallax({ heading }: { heading: ReactNode }) {
  const { scrollYProgress } = useScroll();

  const bgScale = useTransform(scrollYProgress, (v) => {
    if (v <= 0) return 1;
    if (v >= 0.4) return 1.1;
    return 1 + (v / 0.4) * 0.1;
  });
  const textY = useTransform(scrollYProgress, (v) => {
    if (v <= 0) return 0;
    if (v >= 0.45) return -48;
    return -(v / 0.45) * 48;
  });
  const visualY = useTransform(scrollYProgress, (v) => {
    if (v <= 0) return 0;
    if (v >= 0.45) return 36;
    return (v / 0.45) * 36;
  });

  return (
    <section className={sectionClassName} aria-labelledby="hero-heading">
      <motion.div
        style={{ scale: bgScale }}
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform bg-[radial-gradient(circle_at_25%_25%,rgba(255,90,60,0.12),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(255,59,31,0.1),transparent_40%)]"
        aria-hidden
      />
      <motion.div
        animate={{ opacity: [0.24, 0.34, 0.24] }}
        transition={{ duration: 9, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_40%,rgba(255,59,31,0.18),transparent_35%)]"
        aria-hidden
      />

      <div className="clykur-story-shell relative z-[1] w-full max-w-6xl">
        <ScrollReveal className={scrollRevealRowClassName}>
          <motion.div
            style={{ y: textY }}
            className="will-change-transform w-full max-w-2xl text-left lg:max-w-[min(100%,40rem)]"
          >
            <HeroMarketingContent heading={heading} />
          </motion.div>

          <motion.div
            style={{ y: visualY }}
            className="will-change-transform w-full max-w-2xl lg:mt-6 lg:max-w-[min(100%,38rem)] max-lg:mx-auto max-lg:max-w-[min(100%,26rem)] xl:mt-8"
          >
            <HeroVisual />
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function Hero({ heading }: { heading: ReactNode }) {
  const { isMobile } = useMobileViewport();
  return isMobile ? (
    <HeroMobileLite heading={heading} />
  ) : (
    <HeroDesktopParallax heading={heading} />
  );
}

"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

const HeroVisual = dynamic(
  () => import("@/components/landing/hero-visual").then((m) => m.HeroVisual),
  { ssr: false },
);

export function Hero() {
  const { scrollYProgress } = useScroll();
  const bgScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.45], [0, -48]);
  const visualY = useTransform(scrollYProgress, [0, 0.45], [0, 36]);

  return (
    <section
      className="clykur-story-section relative flex min-h-screen w-full items-center justify-center overflow-hidden !pb-[max(5rem,env(safe-area-inset-bottom))] !pt-[max(5.5rem,env(safe-area-inset-top))] md:!py-24 lg:!py-28"
      aria-labelledby="hero-heading"
    >
      <motion.div
        style={{ scale: bgScale }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_25%,rgba(255,90,60,0.12),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(255,59,31,0.1),transparent_40%)] will-change-transform"
        aria-hidden
      />
      <motion.div
        animate={{ opacity: [0.24, 0.34, 0.24] }}
        transition={{ duration: 9, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_40%,rgba(255,59,31,0.18),transparent_35%)]"
        aria-hidden
      />

      <div className="clykur-story-shell relative z-[1] w-full max-w-6xl">
        <ScrollReveal className="flex w-full flex-col items-stretch gap-14 lg:flex-row lg:items-start lg:justify-center lg:gap-14 xl:gap-16">
          <motion.div
            style={{ y: textY }}
            className="will-change-transform w-full max-w-xl text-left lg:max-w-[min(100%,28rem)]"
          >
            <div className="relative w-full">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground/40 sm:tracking-[0.28em]">
                Operating model
              </p>
              <h1
                id="hero-heading"
                className="mt-3.5 text-balance font-poppins text-[clamp(1.8125rem,5vw+0.65rem,3.1rem)] font-medium leading-[1.08] tracking-[-0.038em] text-foreground sm:mt-3 sm:leading-[1.1] sm:tracking-[-0.035em]"
              >
                Clykur operates as a{" "}
                <span className="font-semibold text-foreground">dual system</span>
                <span className="text-foreground/85">.</span>
              </h1>

              <div
                data-reveal-item
                className="mt-8 border-t border-foreground/[0.08] pt-7 text-left max-md:mt-9 max-md:rounded-2xl max-md:border max-md:border-foreground/[0.07] max-md:bg-gradient-to-b max-md:from-white/85 max-md:to-[#fafaf9]/95 max-md:p-5 max-md:pt-6 max-md:shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_24px_80px_-48px_rgba(10,10,10,0.14)] max-md:backdrop-blur-[2px]"
              >
                <div className="flex max-w-lg gap-3.5 sm:gap-5">
                  <div
                    className="w-px shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#ff3b1f]/55 via-foreground/12 to-transparent"
                    aria-hidden
                  />
                  <dl className="min-w-0 flex-1 space-y-0 text-left">
                    <div className="grid grid-cols-[2.25rem_1fr] items-start gap-x-3 gap-y-1 border-b border-foreground/[0.06] pb-5 sm:grid-cols-[2.75rem_1fr] sm:gap-x-8 sm:pb-6">
                      <dt className="pt-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff3b1f]">
                        01
                      </dt>
                      <dd>
                        <p className="font-poppins text-[1.03125rem] font-semibold tracking-[-0.024em] text-foreground md:text-[1.0625rem]">
                          Own IP
                        </p>
                        <p className="mt-1.5 text-[14.5px] leading-snug text-foreground/44 md:text-[15px]">
                          Products we design, build, and scale.
                        </p>
                      </dd>
                    </div>
                    <div className="grid grid-cols-[2.25rem_1fr] items-start gap-x-3 gap-y-1 pt-5 sm:grid-cols-[2.75rem_1fr] sm:gap-x-8 sm:pt-6">
                      <dt className="pt-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/30">
                        02
                      </dt>
                      <dd>
                        <p className="font-poppins text-[1.03125rem] font-semibold tracking-[-0.024em] text-foreground md:text-[1.0625rem]">
                          Client Systems
                        </p>
                        <p className="mt-1.5 text-[14.5px] leading-snug text-foreground/44 md:text-[15px]">
                          Engineering and delivery for teams that need execution done
                          right.
                        </p>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <p
                data-reveal-item
                className="mt-6 max-w-lg text-left font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.14em] text-foreground/38 sm:mt-6 sm:text-[11px] sm:leading-normal sm:tracking-[0.16em]"
              >
                <span className="text-foreground/38">From strategy to production</span>
                <span className="mx-2 text-foreground/15" aria-hidden>
                  ·
                </span>
                <span className="text-foreground/38">One studio · Global by default</span>
              </p>

              <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:justify-start sm:gap-4">
                <Link
                  href="#products"
                  className={cn(
                    primaryGradientCtaClassName,
                    "w-full justify-center sm:w-fit",
                  )}
                >
                  Explore products
                </Link>
                <Link
                  href="#services"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-foreground/[0.11] bg-white/70 px-6 py-2.5 text-[13px] font-semibold tracking-[-0.01em] text-foreground/88 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset] backdrop-blur-sm transition-[border-color,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-foreground/[0.18] hover:bg-white hover:text-foreground active:translate-y-0 sm:w-fit"
                >
                  Work with us
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: visualY }}
            className="will-change-transform w-full max-w-2xl lg:max-w-[min(100%,38rem)] max-lg:mx-auto max-lg:max-w-[min(100%,26rem)]"
          >
            <HeroVisual />
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

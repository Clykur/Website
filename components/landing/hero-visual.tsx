"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  EcosystemVisual,
  ecosystemVisualTypes,
  PortfolioWireframeSvg,
  ServicesPipelineSvg,
} from "@/components/landing/section-diagrams";

const diagramLabels: Record<(typeof ecosystemVisualTypes)[number], string> = {
  automation: "Automation",
  trust: "Trust layer",
  infrastructure: "Infrastructure",
  saas: "SaaS flow",
};

const portfolioLabels = [
  "Web layout",
  "Mobile shell",
  "App chrome",
  "Design system",
  "Commerce",
  "Dashboard",
];

const SLIDE_MS = 5200;
const easeLux = [0.22, 1, 0.28, 1] as const;

/** One line per scene — context without boxing diagrams in cards */
const sceneCaptions = [
  "How engagements flow — input, core build, shipped UI",
  `${diagramLabels.automation} · ${diagramLabels.trust}`,
  `${diagramLabels.infrastructure} · ${diagramLabels.saas}`,
  `${portfolioLabels[0]} · ${portfolioLabels[1]}`,
  `${portfolioLabels[2]} · ${portfolioLabels[3]}`,
  `${portfolioLabels[4]} · ${portfolioLabels[5]}`,
] as const;

/** Diagrams float on open canvas — no card chrome */
function ServicesScene() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-1 sm:px-2">
      <div className="relative w-full max-w-[min(100%,320px)] sm:max-w-[min(100%,340px)]">
        <div
          className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,90,60,0.06),transparent_72%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] [background-size:22px_22px]"
          aria-hidden
        />
        <div className="relative py-2">
          <ServicesPipelineSvg idPrefix="hero-svc" />
        </div>
      </div>
    </div>
  );
}

/** Scene-based presentation — floating line art, no background cards */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const sceneCount = 6;
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % sceneCount);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce, sceneCount]);

  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.88, ease: easeLux };

  const enter = reduce
    ? { opacity: 1, scale: 1, y: 0 }
    : { opacity: 0, scale: 0.96, y: 18 };
  const animate = { opacity: 1, scale: 1, y: 0 };
  const exit = reduce ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 1.02, y: -12 };

  const pairLayout =
    "grid h-full w-full grid-cols-1 justify-items-center gap-7 md:grid-cols-2 md:gap-x-12 md:gap-y-6";

  const renderScene = (index: number): ReactNode => {
    switch (index) {
      case 0:
        return (
          <div key="s0" className="flex h-full w-full items-center justify-center">
            <ServicesScene />
          </div>
        );
      case 1:
        return (
          <div key="s1" className={pairLayout}>
            <div className="flex justify-center">
              <EcosystemVisual
                type="automation"
                idPrefix="hero-a"
                density="compact"
                presentation="minimal"
              />
            </div>
            <div className="flex justify-center">
              <EcosystemVisual type="trust" idPrefix="hero-b" density="compact" presentation="minimal" />
            </div>
          </div>
        );
      case 2:
        return (
          <div key="s2" className={pairLayout}>
            <div className="flex justify-center">
              <EcosystemVisual
                type="infrastructure"
                idPrefix="hero-c"
                density="compact"
                presentation="minimal"
              />
            </div>
            <div className="flex justify-center">
              <EcosystemVisual type="saas" idPrefix="hero-d" density="compact" presentation="minimal" />
            </div>
          </div>
        );
      case 3:
        return (
          <div key="s3" className={pairLayout}>
            <PortfolioTile index={0} />
            <PortfolioTile index={1} />
          </div>
        );
      case 4:
        return (
          <div key="s4" className={pairLayout}>
            <PortfolioTile index={2} />
            <PortfolioTile index={3} />
          </div>
        );
      case 5:
        return (
          <div key="s5" className={pairLayout}>
            <PortfolioTile index={4} />
            <PortfolioTile index={5} />
          </div>
        );
      default:
        return null;
    }
  };

  const activeCaption = sceneCaptions[reduce ? 0 : slide];

  return (
    <div
      className="relative mx-auto mt-2 w-full max-w-xl sm:mt-5 lg:mt-0 lg:max-w-none"
      role="region"
      aria-label="Studio diagram presentation"
    >
      {/* Logo — top right of the diagram area */}
      <div
        className="pointer-events-none absolute right-2 top-2 z-30 md:right-0 md:top-0"
        aria-hidden
      >
        <motion.div
          className="drop-shadow-[0_4px_20px_rgba(10,10,10,0.08)]"
          animate={reduce ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src="/Clykur Logo.svg" alt="" className="h-10 w-10 object-contain md:h-11 md:w-11" />
        </motion.div>
      </div>

      {/* Open field — small screens get a soft framed stage; lg+ matches the open canvas layout */}
      <div className="relative min-h-[min(268px,42dvh)] w-full overflow-hidden rounded-[28px] border border-foreground/[0.06] bg-transparent shadow-[0_28px_90px_-46px_rgba(10,10,10,0.12)] lg:min-h-[280px] lg:overflow-visible lg:rounded-none lg:border-0 lg:shadow-none">
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(ellipse_85%_70%_at_50%_35%,rgba(255,90,60,0.045),transparent_65%)] lg:inset-x-0 lg:-bottom-8 lg:top-0 lg:h-auto lg:rounded-[32px]"
          aria-hidden
        />

        <div className="relative z-[1] flex min-h-[min(252px,40dvh)] flex-col justify-center px-1 pb-8 pt-4 sm:px-2 sm:pb-9 lg:min-h-[260px] lg:px-0 lg:pb-11 lg:pt-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={reduce ? 0 : slide}
              initial={enter}
              animate={animate}
              exit={exit}
              transition={transition}
              className="w-full px-1 md:px-2"
            >
              {reduce ? renderScene(0) : renderScene(slide)}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={activeCaption}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.45, ease: easeLux }}
              className="mx-auto mt-4 max-w-md px-2 text-center font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.18em] text-foreground/38 lg:mt-6 lg:px-0 lg:tracking-[0.2em]"
            >
              {activeCaption}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {!reduce && (
        <div className="mt-4 space-y-4 lg:mt-3 lg:space-y-5">
          <div className="mx-auto h-[1.5px] w-full max-w-[200px] overflow-hidden rounded-full bg-foreground/[0.05]">
            <motion.div
              key={slide}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#ff7a62] via-[#ff3b1f] to-[#ff6a4d]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
            />
          </div>

          <div className="flex items-end justify-center gap-1.5 md:gap-2" role="tablist" aria-label="Presentation scenes">
            {Array.from({ length: sceneCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === slide}
                className="group flex min-h-[44px] min-w-[40px] items-center justify-center py-2"
                aria-label={`Scene ${i + 1} of ${sceneCount}`}
                onClick={() => setSlide(i)}
              >
                <span
                  className={`block w-[1.5px] rounded-full transition-all duration-[520ms] ease-[cubic-bezier(0.22,1,0.28,1)] ${
                    i === slide
                      ? "h-6 bg-gradient-to-b from-[#ff7a62] to-[#ff3b1f] shadow-[0_0_14px_rgba(255,59,31,0.28)]"
                      : "h-1.5 bg-foreground/10 group-hover:h-2.5 group-hover:bg-foreground/18"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PortfolioTile({ index }: { index: number }) {
  return (
    <div className="flex min-h-[118px] w-full items-center justify-center lg:min-h-[180px]">
      <div className="relative h-[min(176px,48vw)] w-full max-w-[260px] sm:h-[min(200px,38vw)] sm:max-w-[280px] lg:h-[200px]">
        <PortfolioWireframeSvg index={index} />
      </div>
    </div>
  );
}

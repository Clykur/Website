"use client";

import { useLayoutEffect, useRef, useState } from "react";

/** Matches Tailwind `md` — phones / small tablets. */
export const MOBILE_VIEWPORT_MQ = "(max-width: 767px)";

/** Very small phones — disable non-essential motion, favor native feel. */
export const ULTRA_SMALL_VIEWPORT_MQ = "(max-width: 479px)";

export type PerformanceMode = {
  isMobile: boolean;
  isUltraSmall: boolean;
  prefersReducedMotion: boolean;
  lowEndHint: boolean;
  /** Lenis off, fewer concurrent animations, shorter tweens. */
  liteMode: boolean;
  /** No decorative / scroll-scrub motion; static or opacity+translate only. */
  ultraLiteMode: boolean;
};

/**
 * Central perf toggles: viewport + `prefers-reduced-motion` + coarse heuristics
 * (`saveData`, low CPU core count). Does not remove features — drives lighter paths.
 */
export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>(() => ({
    isMobile: false,
    isUltraSmall: false,
    prefersReducedMotion: false,
    lowEndHint: false,
    liteMode: false,
    ultraLiteMode: false,
  }));

  useLayoutEffect(() => {
    const mqMobile = window.matchMedia(MOBILE_VIEWPORT_MQ);
    const mqUltra = window.matchMedia(ULTRA_SMALL_VIEWPORT_MQ);
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const isMobile = mqMobile.matches;
      const isUltraSmall = mqUltra.matches;
      const prefersReducedMotion = mqReduce.matches;

      let lowEndHint = false;
      if (typeof navigator !== "undefined") {
        const conn = (
          navigator as Navigator & {
            connection?: { saveData?: boolean };
          }
        ).connection;
        if (conn?.saveData) lowEndHint = true;
        if (
          typeof navigator.hardwareConcurrency === "number" &&
          navigator.hardwareConcurrency <= 4
        ) {
          lowEndHint = true;
        }
      }

      const liteMode = isMobile || lowEndHint;
      const ultraLiteMode =
        isUltraSmall || prefersReducedMotion || (isMobile && lowEndHint);

      setMode({
        isMobile,
        isUltraSmall,
        prefersReducedMotion,
        lowEndHint,
        liteMode,
        ultraLiteMode,
      });
    };

    sync();
    mqMobile.addEventListener("change", sync);
    mqUltra.addEventListener("change", sync);
    mqReduce.addEventListener("change", sync);

    return () => {
      mqMobile.removeEventListener("change", sync);
      mqUltra.removeEventListener("change", sync);
      mqReduce.removeEventListener("change", sync);
    };
  }, []);

  return mode;
}

/**
 * Mobile viewport for perf toggles (legacy name).
 * `isMobileRef` stays in sync for Framer `useTransform` mappers.
 */
export function useMobileViewport() {
  const isMobileRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia(MOBILE_VIEWPORT_MQ);
    const sync = () => {
      const m = mq.matches;
      isMobileRef.current = m;
      setIsMobile(m);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return { isMobile, isMobileRef };
}

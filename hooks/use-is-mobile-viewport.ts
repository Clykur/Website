"use client";

import { useLayoutEffect, useRef, useState } from "react";

/** Matches Tailwind `md` breakpoint — phones / small tablets. */
export const MOBILE_VIEWPORT_MQ = "(max-width: 767px)";

/**
 * Mobile viewport for perf toggles: native-friendly scroll, fewer animations.
 * `isMobileRef` stays in sync for Framer `useTransform` mappers (no per-frame matchMedia).
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

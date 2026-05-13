"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/landing/smooth-scroll";

export function ScrollToTop() {
  const lenis = useLenis();

  useEffect(() => {
    const run = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    };
    run();
    const id = requestAnimationFrame(run);
    return () => cancelAnimationFrame(id);
  }, [lenis]);

  return null;
}

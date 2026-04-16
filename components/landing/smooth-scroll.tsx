"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.25,
      easing: easeOutExpo,
      lerp: 0.092,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchMultiplier: 1.08,
      touchInertiaExponent: 1.65,
      anchors: true,
    });

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenisScroll);

    return () => {
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}

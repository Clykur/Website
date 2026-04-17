"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function SmoothScroll({ children }: { children?: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const mobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;

    const instance = new Lenis({
      autoRaf: true,
      duration: mobile ? 0.78 : 1.25,
      easing: easeOutExpo,
      lerp: mobile ? 0.12 : 0.092,
      smoothWheel: true,
      wheelMultiplier: mobile ? 1 : 0.92,
      syncTouch: true,
      syncTouchLerp: mobile ? 0.2 : 0.1,
      touchMultiplier: mobile ? 0.92 : 1.08,
      touchInertiaExponent: mobile ? 1.5 : 1.65,
      anchors: true,
    });

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    instance.on("scroll", onLenisScroll);
    setLenis(instance);

    return () => {
      instance.off("scroll", onLenisScroll);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

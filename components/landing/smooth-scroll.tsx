"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/** Desktop / tablet only — mobile uses native scroll (no Lenis) for smooth touch + less main-thread work. */
export function SmoothScroll({ children }: { children?: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const loadTokenRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    let cancelled = false;

    const apply = () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setLenis(null);
      loadTokenRef.current += 1;
      const loadToken = loadTokenRef.current;

      if (mq.matches) {
        ScrollTrigger.refresh();
        return;
      }

      void (async () => {
        await import("lenis/dist/lenis.css");
        const { default: LenisCtor } = await import("lenis");
        if (cancelled || mq.matches || loadToken !== loadTokenRef.current) return;

        const instance = new LenisCtor({
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
        instance.on("scroll", onLenisScroll);
        lenisRef.current = instance;
        setLenis(instance);
        ScrollTrigger.refresh();
      })();
    };

    apply();
    mq.addEventListener("change", apply);
    return () => {
      cancelled = true;
      mq.removeEventListener("change", apply);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

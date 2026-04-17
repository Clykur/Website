"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MOBILE_VIEWPORT_MQ,
  ULTRA_SMALL_VIEWPORT_MQ,
} from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_MAX_REVEAL_ITEMS = 8;

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const all = Array.from(element.querySelectorAll("[data-reveal-item]"));
    const mobile = window.matchMedia(MOBILE_VIEWPORT_MQ).matches;
    const ultra = window.matchMedia(ULTRA_SMALL_VIEWPORT_MQ).matches;

    if (ultra) {
      all.forEach((child) => {
        const el = child as HTMLElement;
        el.style.opacity = "1";
        el.style.transform = "translate3d(0,0,0)";
      });
      return;
    }

    const overflowStatic =
      mobile && all.length > MOBILE_MAX_REVEAL_ITEMS
        ? all.slice(MOBILE_MAX_REVEAL_ITEMS)
        : [];
    if (overflowStatic.length) {
      overflowStatic.forEach((child) => {
        const el = child as HTMLElement;
        el.style.opacity = "1";
        el.style.transform = "translate3d(0,0,0)";
      });
    }

    const childrenToAnimate =
      mobile && all.length > MOBILE_MAX_REVEAL_ITEMS
        ? all.slice(0, MOBILE_MAX_REVEAL_ITEMS)
        : all;

    const ctx = gsap.context(() => {
      childrenToAnimate.forEach((child: Element) => {
        const rect = child.getBoundingClientRect();
        const isInViewport =
          rect.top < window.innerHeight && rect.bottom > 0;

        gsap.set(
          child,
          isInViewport
            ? { opacity: 1, y: 0, scale: 1 }
            : mobile
              ? { y: 22, opacity: 1 }
              : { y: 40, opacity: 1, scale: 0.95 },
        );
      });

      gsap.to(childrenToAnimate, {
        y: 0,
        ...(!mobile ? { scale: 1 } : {}),
        ease: "power2.out",
        duration: mobile ? 0.55 : 0.9,
        stagger: mobile ? 0.06 : 0.14,
        scrollTrigger: mobile
          ? {
              trigger: element,
              start: "top 90%",
              once: true,
            }
          : {
              trigger: element,
              start: "top 82%",
              end: "bottom 20%",
              scrub: 0.8,
            },
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

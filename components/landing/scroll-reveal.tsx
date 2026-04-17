"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOBILE_VIEWPORT_MQ } from "@/hooks/use-is-mobile-viewport";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const childrenToAnimate = element.querySelectorAll("[data-reveal-item]");
    const mobile = window.matchMedia(MOBILE_VIEWPORT_MQ).matches;

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
              ? { y: 20, opacity: 1, scale: 0.99 }
              : { y: 40, opacity: 1, scale: 0.95 },
        );
      });

      gsap.to(childrenToAnimate, {
        y: 0,
        scale: 1,
        ease: "power2.out",
        duration: mobile ? 0.68 : 0.9,
        stagger: mobile ? 0.09 : 0.14,
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
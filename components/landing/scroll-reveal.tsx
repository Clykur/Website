"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

    const ctx = gsap.context(() => {
      childrenToAnimate.forEach((child: Element) => {
        const rect = child.getBoundingClientRect();
        const isInViewport =
          rect.top < window.innerHeight && rect.bottom > 0;

        // FIX: Always keep opacity 1 (no fade ever)
        gsap.set(
          child,
          isInViewport
            ? { opacity: 1, y: 0, scale: 1 }
            : { y: 40, opacity: 1, scale: 0.95 }
        );
      });

      gsap.to(childrenToAnimate, {
        y: 0,
        scale: 1,
        ease: "power2.out",
        duration: 0.9,
        stagger: 0.14,
        scrollTrigger: {
          trigger: element,
          start: "top 82%",
          end: "bottom 20%",
          scrub: 0.8, // keeps motion, no fade now
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
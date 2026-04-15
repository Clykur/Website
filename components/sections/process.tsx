"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

const processSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    description:
      "We discuss your project requirements, timeline, and expectations to ensure we're aligned from the start.",
  },
  {
    step: "02",
    title: "Design Review",
    description:
      "We review your design files, identify technical considerations, and provide feedback on implementation feasibility.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "We convert your designs into clean, responsive, and performant frontend code following best practices and your specifications.",
  },
  {
    step: "04",
    title: "Quality Assurance",
    description:
      "Thorough testing across devices and browsers to ensure pixel-perfect accuracy and optimal performance.",
  },
  {
    step: "05",
    title: "Delivery & Support",
    description:
      "Clean, documented code delivered on time, with ongoing support for any adjustments or questions.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step) => {
        const heading = step.querySelector(".process-heading");
        const divider = step.querySelector(".process-divider");
        const copy = step.querySelector(".process-copy");

        gsap.fromTo(
          [heading, copy],
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.16,
            scrollTrigger: {
              trigger: step,
              start: "top 78%",
              end: "top 32%",
              scrub: 0.85,
            },
          },
        );

        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              ease: "power2.out",
              duration: 0.85,
              scrollTrigger: {
                trigger: step,
                start: "top 70%",
                end: "top 45%",
                scrub: 0.8,
              },
            },
          );
        }
      });
    }, section);

    mm.add("(min-width: 1024px)", () => {
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 20%",
          end: "bottom 20%",
          pin: true,
          pinSpacing: false,
        });
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="clykur-story-section clykur-section-soft"
      aria-labelledby="process-heading"
    >
      <ScrollReveal className="clykur-story-shell">
        <header data-reveal-item className="mb-16 md:mb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Engineering partnerships
          </p>
          <h2 id="process-heading" className="mb-4 text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            How we work
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            A clear, structured process that ensures quality and alignment, from
            kickoff to delivery and support.
          </p>
        </header>

        <ul className="space-y-0" aria-label="Process steps">
          {processSteps.map((item) => (
            <li
              key={item.step}
              data-reveal-item
              className="process-step flex flex-col gap-4 border-b border-border bg-[#F7F7F8] py-8 md:flex-row md:gap-12 md:py-12 first:pt-0 last:border-b-0"
            >
              <div className="flex shrink-0 flex-col items-start md:items-center">
                <span className="text-5xl md:text-6xl font-semibold tabular-nums text-foreground/15">
                  {item.step}
                </span>
              </div>
              <div className="min-w-0 flex-1 md:pt-1">
                <h3 className="process-heading text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2">
                  {item.title}
                </h3>
                <div className="process-divider mb-4 h-px w-full bg-border" />
                <p className="process-copy text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-muted-foreground w-full">
          Each phase is defined with clear outcomes and checkpoints so you
          always know where we stand.
        </p>
      </ScrollReveal>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

const HeroVisual = dynamic(
  () => import("@/components/landing/hero-visual").then((m) => m.HeroVisual),
  { ssr: false },
);

export function Hero() {
  const { scrollYProgress } = useScroll();
  const bgScale = useTransform(scrollYProgress, [0, 0.40], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.45], [0, -56]);
  const visualY = useTransform(scrollYProgress, [0, 0.45], [0, 42]);

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden clykur-story-section pt-36"
      aria-labelledby="hero-heading"
    >
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 -z-10 bg-white will-change-transform"
        aria-hidden
      />
      <motion.div
        style={{ scale: bgScale }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_25%,rgba(255,90,60,0.12),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(255,59,31,0.1),transparent_40%)] will-change-transform"
        aria-hidden
      />
      <motion.div
        animate={{ opacity: [0.24, 0.34, 0.24] }}
        transition={{ duration: 9, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_40%,rgba(255,59,31,0.18),transparent_35%)]"
        aria-hidden
      />

      <div className="clykur-story-shell max-w-7xl">
        <ScrollReveal className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <motion.div style={{ y: textY }} className="will-change-transform text-center lg:text-left">
            <p
              data-reveal-item
              className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:text-sm"
              id="hero-eyebrow"
            >
              Product innovation company & engineering partner
            </p>
            <h1
              id="hero-heading"
              className="mb-7 text-5xl font-semibold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl lg:text-[4.6rem]"
            >
              <SplitText text="Building software products that power modern businesses" />
            </h1>
            <p
              data-reveal-item
              className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl md:leading-relaxed lg:mx-0"
            >
              We build scalable products and partner with companies to create
              exceptional software, from category-defining SaaS to high-impact
              engineering partnerships.
            </p>
            <div
              data-reveal-item
              className="mb-12 inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/80 px-5 py-2.5 backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-foreground">
                Remote-first · Global · Ship fast
              </span>
            </div>
            <div
              data-reveal-item
              className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <div
                data-reveal-item
                className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              >
           <Button
  asChild
  size="lg"
  className="group w-full sm:w-auto rounded-2xl px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300"
>
  <Link href="#products">
    Explore Our Products
    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
  </Link>
</Button>

<Button
  asChild
  variant="outline"
  size="lg"
  className="group w-full sm:w-auto rounded-2xl px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300 bg-white/70"
>
  <Link href="#services" className="inline-flex items-center gap-2">
    <Briefcase className="h-4 w-4" />
    Work With Us
  </Link>
</Button>
              </div>
            </div>
          </motion.div>
          <motion.div style={{ y: visualY }} className="will-change-transform">
            <HeroVisual />
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SplitText({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-3">
          <motion.span
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}
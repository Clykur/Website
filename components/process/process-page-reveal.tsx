"use client";

import { ScrollReveal } from "@/components/landing/scroll-reveal";

type ProcessPageRevealProps = {
  children: React.ReactNode;
};

export function ProcessPageReveal({ children }: ProcessPageRevealProps) {
  return <ScrollReveal className="relative">{children}</ScrollReveal>;
}

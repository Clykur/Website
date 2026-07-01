"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { CONTACT_EMAIL, CONTACT_PHONE_WHATSAPP } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const faqInlineLinkClass =
  "font-semibold text-[#ff3b1f] underline-offset-2 transition-colors hover:underline";

type FaqItem = {
  question: string;
  answer: ReactNode;
};

const allFaqs: FaqItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on the size and scope of your project. We’ll give you a clear timeline once we understand what you need so you’re never left guessing.",
  },
  {
    question: "What design formats do you accept?",
    answer:
      "We work with Figma, Sketch, Adobe XD, and PDF. Figma is preferred for handoff; we adapt to your format.",
  },
  {
    question: "Do you provide revisions and what tech do you use?",
    answer:
      "Yes, we include 2 rounds of revisions so the result matches your vision. On tech: we’re fluent in React, Next.js, TypeScript, and Tailwind, but we can stick to your stack if you prefer. You’re never locked in; we adapt to what you need.",
  },
  {
    question: "Who owns the code and IP?",
    answer:
      "Clients own engagement deliverables per our statement of work and engagement terms. We retain pre-existing tools and general know-how only.",
  },
  {
    question: "How do you quote an MVP or project?",
    answer:
      "We run a short discovery, then propose phased milestones with clear scope. Budget bands on the contact form help us match you to the right plan. See our MVP cost article on the blog for typical drivers.",
  },
  {
    question: "Can we book a call this week?",
    answer: (
      <>
        Yes. Submit our{" "}
        <Link href="/contact#inquiry-form" className={faqInlineLinkClass}>
          contact form
        </Link>{" "}
        with your timeline and budget band, or message us on{" "}
        <a
          href={`https://wa.me/${CONTACT_PHONE_WHATSAPP}`}
          className={faqInlineLinkClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>{" "}
        or email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={faqInlineLinkClass}>
          {CONTACT_EMAIL}
        </a>
        . We reply with available times for a short discovery call.
      </>
    ),
  },
];

/** Homepage: decision-stage questions only (full list on /faq). */
const homeFaqs = allFaqs.filter((f) =>
  [
    "How long does a typical project take?",
    "How do you quote an MVP or project?",
    "Who owns the code and IP?",
    "Can we book a call this week?",
  ].includes(f.question),
);

const ITEMS_PER_PAGE = 10;

type FAQProps = {
  variant?: "home" | "full";
};

export function FAQ({ variant = "full" }: FAQProps) {
  const faqs = variant === "home" ? homeFaqs : allFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(faqs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFaqs = faqs.slice(startIndex, endIndex);

  const toggleQuestion = (index: number) => {
    const actualIndex = startIndex + index;
    setOpenIndex(openIndex === actualIndex ? null : actualIndex);
  };

  return (
    <section
      id="faq"
      className="clykur-story-section border-t border-foreground/[0.06] bg-gradient-to-b from-white via-[#fafaf9] to-white"
      aria-labelledby="faq-heading"
    >
      <ScrollReveal className="clykur-story-shell max-w-3xl">
        <header data-reveal-item className="mb-14 text-center md:mb-16">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground/40">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mb-5 font-semibold tracking-tight text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] text-foreground"
          >
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-foreground/52 md:text-base">
            Our services, process, and how we work together.
          </p>
        </header>

        {/* List: hairlines only: no card boxes */}
        <div
          className="divide-y divide-foreground/[0.08] border-t border-b border-foreground/[0.08]"
          data-reveal-item
        >
          {currentFaqs.map((faq, index) => {
            const actualIndex = startIndex + index;
            const isOpen = openIndex === actualIndex;

            return (
              <div key={actualIndex}>
                <button
                  type="button"
                  onClick={() => toggleQuestion(index)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:bg-foreground/[0.015] md:gap-8 md:py-7"
                  aria-expanded={isOpen}
                >
                  <span className="min-w-0 flex-1 text-[17px] font-medium leading-snug tracking-tight text-foreground md:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "mt-1 h-5 w-5 shrink-0 text-foreground/35 transition-transform duration-300 ease-out motion-safe:transition-transform",
                      isOpen && "rotate-180 text-[#ff3b1f]/80",
                    )}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="pb-7 pr-2 text-pretty text-justify [hyphens:auto] text-[15px] leading-[1.75] text-foreground/55 md:pb-8 md:text-[15px]">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {variant === "home" ? (
          <div data-reveal-item className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/45 transition-colors hover:text-[#ff3b1f]"
            >
              View all FAQs
              <ArrowUpRight
                className="h-4 w-4"
                strokeWidth={1.85}
                aria-hidden
              />
            </Link>
          </div>
        ) : null}

        {totalPages > 1 && (
          <div
            className="mt-10 flex items-center justify-center gap-6 text-sm"
            data-reveal-item
          >
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="font-medium text-foreground/45 transition-colors hover:text-[#ff3b1f] disabled:pointer-events-none disabled:opacity-30"
            >
              Previous
            </button>
            <span className="text-foreground/35 tabular-nums">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="font-medium text-foreground/45 transition-colors hover:text-[#ff3b1f] disabled:pointer-events-none disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </ScrollReveal>
    </section>
  );
}

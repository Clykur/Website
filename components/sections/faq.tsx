"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  // Product-related
  {
    question: "What is Cusown?",
    answer:
      "Cusown is our smart appointment and slot booking platform for service businesses. It helps manage bookings, reduce no-shows, and scale scheduling with automation and analytics.",
  },
  {
    question: "What is FreeTrust?",
    answer:
      "FreeTrust is a trust layer for freelancers and clients. It provides credibility validation, transparent profiles, trust scoring, and a future blockchain verification layer so both sides can work with confidence.",
  },
  {
    question: "Who is Cusown for?",
    answer:
      "Cusown is for service businesses that take appointments salons, clinics, consultants, agencies. Anyone who needs reliable booking, fewer no-shows, and scalable scheduling.",
  },
  // Service-related
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
];

const ITEMS_PER_PAGE = 10;

export function FAQ() {
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
      className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-6xl mx-auto w-full">
        <header className="text-center mb-16 md:mb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4"
          >
            Frequently asked questions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Our products, services, process, and how we work together.
          </p>
        </header>

        <div className="space-y-4 mb-8">
          {currentFaqs.map((faq, index) => {
            const actualIndex = startIndex + index;
            const isOpen = openIndex === actualIndex;

            return (
              <div
                key={actualIndex}
                className="border border-border rounded-lg overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-base md:text-lg pr-4">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  )}
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <div className="px-6 py-4 text-muted-foreground leading-relaxed border-t border-border">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity and scope. A simple website frontend typically takes 3-5 days, while more complex web applications may take 1-3 weeks. I provide a detailed timeline estimate after reviewing your design files and requirements.",
  },
  {
    question: "What design file formats do you accept?",
    answer:
      "I work with all major design tools including Figma, Sketch, Adobe XD, and even PDF mockups. Figma is preferred as it allows for better collaboration and design handoff, but I'm flexible with whatever format you have.",
  },
  {
    question: "Do you provide revisions?",
    answer:
      "Yes, I include 2 rounds of revisions in my standard process to ensure the final result matches your vision. Additional revisions can be discussed based on project scope.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "I work with modern frontend frameworks including React, Next.js, Vue.js, and vanilla JavaScript. I also use TypeScript, Tailwind CSS, and other modern tools based on project requirements. The technology stack is always discussed and agreed upon before starting.",
  },
  {
    question: "How do you handle responsive design?",
    answer:
      "All projects are built mobile-first and tested across multiple devices and screen sizes. I ensure pixel-perfect accuracy on desktop, tablet, and mobile devices, with smooth interactions and optimal performance on all platforms.",
  },
  {
    question: "What's included in the final delivery?",
    answer:
      "You'll receive clean, well-documented code, organized file structure, responsive design implementation, and basic browser testing. I also provide guidance on deployment and can assist with setup if needed.",
  },
  {
    question: "Do you work with existing codebases?",
    answer:
      "Yes, I can work with existing codebases. Whether you need to add new features, refactor existing code, or integrate new designs into your current project, I can help maintain consistency with your existing codebase.",
  },
  {
    question: "What's your communication style?",
    answer:
      "I believe in clear, regular communication throughout the project. I provide progress updates, ask questions when needed, and keep you informed at every step. I typically respond to messages within 2-4 hours during business hours.",
  },
  {
    question: "How do you handle project payments?",
    answer:
      "Payment terms are discussed during the initial consultation. Typically, I work with a 50% upfront payment and 50% upon completion, though I'm flexible and can work with your preferred payment structure.",
  },
  {
    question: "Can you help with deployment?",
    answer:
      "While my primary focus is frontend development, I can provide guidance on deployment and help with basic setup. For complex deployment needs, I can recommend reliable hosting solutions or work with your DevOps team.",
  },
];

const ITEMS_PER_PAGE = 5;

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
    <section id="faq" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Common questions about my process, timeline, and how we'll work together.
          </p>
        </div>

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
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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


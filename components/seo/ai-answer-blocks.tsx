import type { SeoFaqItem } from "@/lib/seo/types";

type AiAnswerBlocksProps = {
  answers: SeoFaqItem[];
};

/** Visible Q&A blocks for humans and AI crawlers (complements FAQ JSON-LD). */
export function AiAnswerBlocks({ answers }: AiAnswerBlocksProps) {
  if (answers.length === 0) return null;

  return (
    <section
      className="mt-12 rounded-2xl border border-foreground/[0.08] bg-[#fafaf9]/80 p-6 md:mt-14 md:p-8"
      aria-labelledby="ai-answers-heading"
    >
      <h2
        id="ai-answers-heading"
        className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45"
      >
        Quick answers
      </h2>
      <div className="space-y-6">
        {answers.map((item, index) => (
          <article key={`${item.question}-${index}`}>
            <h3 className="text-[15px] font-semibold leading-snug text-foreground md:text-base">
              {item.question}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/62">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

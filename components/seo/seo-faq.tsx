import type { SeoFaqItem } from "@/lib/seo/types";

type SeoFaqProps = {
  heading?: string;
  faqs: SeoFaqItem[];
};

export function SeoFaq({
  heading = "Frequently asked questions",
  faqs,
}: SeoFaqProps) {
  return (
    <section
      className="mt-16 scroll-mt-24 border-t border-foreground/[0.08] pt-14 md:mt-20 md:pt-16"
      aria-labelledby="seo-faq-heading"
    >
      <header className="mb-8 md:mb-10">
        <h2
          id="seo-faq-heading"
          className="font-semibold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] text-foreground"
        >
          {heading}
        </h2>
      </header>
      <dl className="divide-y divide-foreground/[0.08]">
        {faqs.map((faq, index) => (
          <div key={`${faq.question}-${index}`} className="py-6 md:py-7">
            <dt className="text-[15px] font-semibold leading-snug text-foreground md:text-base">
              {faq.question}
            </dt>
            <dd className="mt-3 text-[15px] leading-relaxed text-foreground/62 md:text-base">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

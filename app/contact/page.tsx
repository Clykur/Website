import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { Contact } from "@/components/sections/contact";
import {
  StoryPageBackdrop,
  StoryPageHero,
  StoryPageMain,
  storySectionH2Class,
  storySurfaceCardClass,
} from "@/components/layout/story-page-shell";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageSchema } from "@/lib/seo/schemas";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";

const CONTACT_FAQS = [
  {
    question: "How do I contact Clykur?",
    answer:
      "Use the form on this page, WhatsApp, email, or Calendly (if configured). We respond quickly to project and partnership inquiries.",
  },
  {
    question: "What should I include in my message?",
    answer:
      "Share your product idea, timeline, budget range if known, and any links to designs or repos. That helps us route you to the right engineer quickly.",
  },
  {
    question: "What services does Clykur provide?",
    answer:
      "Web development, mobile app development, UI/UX design, product engineering, and MVP development, plus our products Cusown and FreeTrust.",
  },
];

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Clykur",
  description:
    "Contact Clykur for web development, product engineering, and SaaS partnerships. Form, WhatsApp, email, and discovery calls.",
  path: "/contact",
});

export default function ContactPage() {
  const faqSchema = faqPageSchema(CONTACT_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <StoryPageBackdrop>
        <StoryPageHero
          titleId="contact-page-heading"
          title="Contact Clykur"
          eyebrow="Contact"
          lede="Building a product or need an engineering partner? Book a discovery call, send a message, or reach us on WhatsApp, we are remote-first and work globally."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ]}
          centered
          actions={
            <>
              {calendlyUrl ? (
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryGradientCtaClassName}
                >
                  Book discovery call
                </a>
              ) : null}
              <Link
                href="/services"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-foreground/15 px-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground/75 transition-colors hover:border-[#ff3b1f]/35 hover:text-[#ff3b1f]"
              >
                View services
              </Link>
            </>
          }
        />
        <StoryPageMain width="narrow">
          <div className={storySurfaceCardClass + " mb-10 p-6 md:p-8"}>
            <InquiryForm />
          </div>
          <section aria-labelledby="contact-faq">
            <h2 id="contact-faq" className={storySectionH2Class + " mb-6"}>
              Contact FAQ
            </h2>
            <dl
              className={
                storySurfaceCardClass +
                " divide-y divide-foreground/[0.08] px-5 md:px-8"
              }
            >
              {CONTACT_FAQS.map((faq, index) => (
                <div key={`${faq.question}-${index}`} className="py-5 md:py-6">
                  <dt className="font-semibold text-foreground">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-foreground/62">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </StoryPageMain>
      </StoryPageBackdrop>
      <Contact />
    </>
  );
}

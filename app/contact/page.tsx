import type { Metadata } from "next";
import Link from "next/link";
import { ContactChannels } from "@/components/contact/contact-channels";
import { ContactProjectSection } from "@/components/contact/contact-project-section";
import { ProcurementTrust } from "@/components/marketing/procurement-trust";
import { SocialProofStrip } from "@/components/marketing/social-proof-strip";
import {
  StoryPageBackdrop,
  StoryPageHero,
  StoryPageMain,
} from "@/components/layout/story-page-shell";
import { SeoCta } from "@/components/seo/seo-cta";
import { SeoFaq } from "@/components/seo/seo-faq";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageSchema } from "@/lib/seo/schemas";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";

const CONTACT_FAQS = [
  {
    question: "How do I contact Clykur?",
    answer:
      "Use the project form on this page, WhatsApp, or email info@clykur.com. We respond quickly to project and partnership inquiries.",
  },
  {
    question: "What should I include in my message?",
    answer:
      "Share your product idea, timeline, budget range if known, and any links to designs or repos. That helps us route you to the right engineer quickly.",
  },
  {
    question: "What services does Clykur provide?",
    answer:
      "Web development, mobile app development, UI/UX design, product engineering, and MVP development.",
  },
  {
    question: "Who owns the code and IP?",
    answer:
      "Clients own deliverables per our engagement terms and statement of work. See /engagement-terms for details.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Clykur",
  description:
    "Contact Clykur for web development, product engineering, and SaaS partnerships. Project form, WhatsApp, and email.",
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
          contentWidth="wide"
          showSectionDivider={false}
          lede="Building a product or need an engineering partner? Send a project brief, message us on WhatsApp, or email. We are remote-first and work globally."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ]}
          actions={
            <>
              <Link
                href="#inquiry-form"
                className={primaryGradientCtaClassName}
              >
                Start a project
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-foreground/15 px-6 text-[13px] font-semibold tracking-[-0.01em] text-foreground/75 transition-colors hover:border-[#ff3b1f]/35 hover:text-[#ff3b1f]"
              >
                View services
              </Link>
            </>
          }
        />
        <StoryPageMain width="default" className="!pt-0">
          <div className="flex w-full min-w-0 flex-col gap-12 md:gap-14 lg:gap-16">
            <SocialProofStrip />

            <ContactProjectSection />

            <ContactChannels />

            <ProcurementTrust />

            <SeoFaq heading="Contact FAQ" faqs={CONTACT_FAQS} />

            <SeoCta headingId="contact-page-cta" />
          </div>
        </StoryPageMain>
      </StoryPageBackdrop>
    </>
  );
}

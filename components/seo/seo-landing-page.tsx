import {
  StoryPageBackdrop,
  StoryPageHero,
  StoryPageMain,
  storyBodyProseClass,
  storySectionH2Class,
  storySurfaceCardClass,
} from "@/components/layout/story-page-shell";
import { LandingHeroCta } from "@/components/seo/landing-hero-cta";
import {
  OnThisPageNavDesktop,
  OnThisPageNavMobile,
} from "@/components/seo/on-this-page-nav";
import { RelatedLinks } from "@/components/seo/related-links";
import { SeoCta } from "@/components/seo/seo-cta";
import { SeoFaq } from "@/components/seo/seo-faq";
import { StructuredData } from "@/components/seo/structured-data";
import { mergePageFaqs } from "@/lib/seo/merge-page-faqs";
import {
  getOnPageNavItems,
  getOrderedSections,
} from "@/lib/seo/section-display-order";
import { mergeRelatedLinks } from "@/lib/seo/internal-links";
import type { SeoLandingPage, SeoContentSection } from "@/lib/seo/types";
import { cn } from "@/lib/utils";

type SeoLandingPageViewProps = {
  page: SeoLandingPage;
};

function ContentSection({
  section,
  emphasis = "primary",
}: {
  section: SeoContentSection;
  emphasis?: "primary" | "tertiary";
}) {
  return (
    <section
      aria-labelledby={`section-${section.id}`}
      className={cn(
        "scroll-mt-24",
        emphasis === "primary"
          ? cn(storySurfaceCardClass, "space-y-4 p-6 md:space-y-5 md:p-8")
          : "rounded-2xl border border-foreground/[0.06] bg-[#fafaf9]/60 px-5 py-8 md:px-7",
      )}
    >
      <h2
        id={`section-${section.id}`}
        className={cn(
          "mb-4 tracking-tight text-foreground",
          emphasis === "primary"
            ? storySectionH2Class + " text-[clamp(1.35rem,2.8vw,1.875rem)]"
            : "font-poppins text-[clamp(1.125rem,2.2vw,1.5rem)] font-medium text-foreground/88",
        )}
      >
        {section.title}
      </h2>
      <div className="space-y-4">
        {section.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={cn(
              storyBodyProseClass,
              emphasis === "primary"
                ? "text-foreground/62"
                : "text-foreground/55",
            )}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export function SeoLandingPageView({ page }: SeoLandingPageViewProps) {
  const relatedLinks = mergeRelatedLinks(page);
  const faqs = mergePageFaqs(page);
  const navItems = getOnPageNavItems(page).filter(
    (item) => item.id !== "related-links-heading" || relatedLinks.length > 0,
  );
  const { primary, tertiary } = getOrderedSections(page);
  const pageWithMergedFaqs = { ...page, faqs };

  return (
    <>
      <StructuredData page={pageWithMergedFaqs} />
      <StoryPageBackdrop>
        <StoryPageHero
          titleId="seo-landing-heading"
          title={page.h1}
          lede={page.lede}
          eyebrow={page.eyebrow}
          breadcrumbs={page.breadcrumbs}
          actions={<LandingHeroCta />}
        />
        <StoryPageMain
          as="article"
          className="seo-landing-page overflow-x-hidden"
        >
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:items-stretch lg:gap-14 xl:gap-16">
            <div className="min-w-0 overflow-x-hidden">
              <OnThisPageNavMobile items={navItems} />

              <div className="prose-clykur space-y-6 md:space-y-8">
                {primary.map((section) => (
                  <ContentSection
                    key={section.id}
                    section={section}
                    emphasis="primary"
                  />
                ))}
              </div>

              {page.caseStudy ? (
                <section
                  className="mt-14 scroll-mt-24 rounded-2xl border border-[#ff3b1f]/15 bg-gradient-to-br from-[#ff3b1f]/[0.05] via-white to-white p-6 md:mt-16 md:p-8"
                  aria-labelledby="case-study-heading"
                >
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ff3b1f]/90">
                    Proof · Case study
                  </p>
                  <h2
                    id="case-study-heading"
                    className="mb-6 font-semibold tracking-tight text-[clamp(1.35rem,2.8vw,1.875rem)] text-foreground"
                  >
                    {page.caseStudy.title}
                  </h2>
                  <dl className="grid gap-6">
                    <div>
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                        Challenge
                      </dt>
                      <dd className="mt-2 text-[15px] leading-relaxed text-foreground/62">
                        {page.caseStudy.challenge}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                        Approach
                      </dt>
                      <dd className="mt-2 text-[15px] leading-relaxed text-foreground/62">
                        {page.caseStudy.approach}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                        Result
                      </dt>
                      <dd className="mt-2 text-[15px] leading-relaxed text-foreground/62">
                        {page.caseStudy.result}
                      </dd>
                    </div>
                    {page.caseStudy.metric ? (
                      <div className="rounded-xl border border-[#ff3b1f]/20 bg-[#ff3b1f]/[0.04] px-5 py-4">
                        <dt className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#ff3b1f]">
                          Impact metric
                        </dt>
                        <dd className="mt-2 text-[15px] font-medium leading-relaxed text-foreground">
                          {page.caseStudy.metric}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                </section>
              ) : null}

              <SeoCta className="mt-14 md:mt-16" headingId="seo-cta-mid" />

              {tertiary.length > 0 ? (
                <div className="mt-14 space-y-8 border-t border-foreground/[0.06] pt-12 md:mt-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/38">
                    Additional detail
                  </p>
                  {tertiary.map((section) => (
                    <ContentSection
                      key={section.id}
                      section={section}
                      emphasis="tertiary"
                    />
                  ))}
                </div>
              ) : null}

              <div className="mt-12 opacity-95">
                <RelatedLinks links={relatedLinks} />
              </div>

              <SeoFaq faqs={faqs} />
              <SeoCta />
            </div>

            <aside className="relative hidden min-h-full w-[220px] shrink-0 self-stretch lg:block">
              <OnThisPageNavDesktop items={navItems} />
            </aside>
          </div>
        </StoryPageMain>
      </StoryPageBackdrop>
    </>
  );
}

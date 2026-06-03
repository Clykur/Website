import { SeoCta } from "@/components/seo/seo-cta";
import { SeoFaq } from "@/components/seo/seo-faq";
import {
  StoryPageBackdrop,
  StoryPageHero,
  StoryPageMain,
  eyebrowFromPath,
  storyBodyProseClass,
  storySectionH2Class,
  storySurfaceCardClass,
} from "@/components/layout/story-page-shell";
import { faqPageSchema, webPageSchema } from "@/lib/seo/schemas";
import type { HubPageContent } from "@/lib/seo/hubs";
import { cn } from "@/lib/utils";

type HubPageViewProps = {
  page: HubPageContent;
  children?: React.ReactNode;
};

export function HubPageView({ page, children }: HubPageViewProps) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: page.h1, href: page.path },
  ];

  const schemas: object[] = [
    webPageSchema({
      kind: "hub",
      slug: page.path.replace("/", ""),
      path: page.path,
      title: page.title,
      description: page.description,
      h1: page.h1,
      eyebrow: "Clykur",
      lede: page.lede,
      keywords: [],
      breadcrumbs,
      sections: [],
      faqs: page.faqs ?? [],
      relatedLinks: [],
    }),
  ];

  if (page.faqs?.length) {
    schemas.push(faqPageSchema(page.faqs));
  }

  const titleId = "hub-page-heading";

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <StoryPageBackdrop>
        <StoryPageHero
          titleId={titleId}
          title={page.h1}
          lede={page.lede}
          eyebrow={eyebrowFromPath(page.path)}
          breadcrumbs={breadcrumbs}
        />
        <StoryPageMain as="article">
          {page.sections.map((section) => (
            <section key={section.title} className="mb-8 md:mb-10">
              <div className={cn(storySurfaceCardClass, "p-6 md:p-8")}>
                <h2 className={cn(storySectionH2Class, "mb-4")}>
                  {section.title}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={cn("mb-4 last:mb-0", storyBodyProseClass)}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {children}

          {page.faqs?.length ? <SeoFaq faqs={page.faqs} /> : null}
          <SeoCta />
        </StoryPageMain>
      </StoryPageBackdrop>
    </>
  );
}

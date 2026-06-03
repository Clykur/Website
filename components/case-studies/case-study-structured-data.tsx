import {
  articleSchema,
  breadcrumbSchema,
  webPageSchemaFromPath,
} from "@/lib/seo/schemas";
import { SITE_URL } from "@/lib/site-config";
import type { CaseStudy } from "@/lib/case-studies";

type CaseStudyStructuredDataProps = {
  study: CaseStudy;
};

export function CaseStudyStructuredData({
  study,
}: CaseStudyStructuredDataProps) {
  const path = `/case-studies/${study.slug}`;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Case studies", href: "/case-studies" },
    { label: study.title, href: path },
  ];

  const schemas = [
    webPageSchemaFromPath({
      title: study.seoTitle,
      description: study.seoDescription,
      path,
    }),
    breadcrumbSchema(breadcrumbs),
    articleSchema({
      title: study.title,
      description: study.seoDescription,
      path,
      datePublished: study.datePublished,
    }),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function caseStudyCanonical(study: CaseStudy): string {
  return `${SITE_URL}/case-studies/${study.slug}`;
}

import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/seo/schemas";
import type { SeoLandingPage } from "@/lib/seo/types";

type StructuredDataProps = {
  page: SeoLandingPage;
};

export function StructuredData({ page }: StructuredDataProps) {
  const schemas: object[] = [
    webPageSchema(page),
    breadcrumbSchema(page.breadcrumbs),
    faqPageSchema(page.faqs),
  ];

  if (page.kind === "service" || page.kind === "programmatic") {
    schemas.push(serviceSchema(page));
  }

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

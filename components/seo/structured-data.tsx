import {
  breadcrumbSchema,
  faqPageSchema,
  productSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/seo/schemas";
import { SITE_URL } from "@/lib/site-config";
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

  if (page.kind === "product") {
    schemas.push(
      productSchema({
        name: page.serviceName ?? page.h1,
        description: page.description,
        url: `${SITE_URL}${page.path}`,
      }),
    );
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

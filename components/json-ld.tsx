import {
  organizationSchema,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "@/lib/seo/schemas";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Clykur is an AI-native product engineering company delivering web, mobile, and platform software for startups and enterprises.",
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/faq?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function JsonLd() {
  const org = organizationSchema();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [org, websiteSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph),
      }}
    />
  );
}

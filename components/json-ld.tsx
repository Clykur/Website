import {
  organizationSchema,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "@/lib/seo/schemas";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { PRODUCTS } from "@/lib/products";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Clykur builds scalable software products and offers engineering services for companies worldwide.",
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

function productToSoftwareApplication(product: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    url: product.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/contact`,
      availability: "https://schema.org/OnlineOnly",
      description: "Commercial and enterprise pricing available on request.",
    },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function JsonLd() {
  const productSchemas = PRODUCTS.map((p) => productToSoftwareApplication(p));
  const org = organizationSchema();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [org, websiteSchema, ...productSchemas],
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

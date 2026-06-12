import {
  CONTACT_EMAIL,
  CONTACT_PHONE_WHATSAPP,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";
import { getSocialUrlsForSchema } from "@/lib/social-links";
import { LEGAL_ENTITY } from "@/lib/legal-entity";
import type { CareerRole } from "@/lib/careers-roles";
import type {
  SeoBreadcrumbItem,
  SeoFaqItem,
  SeoLandingPage,
} from "@/lib/seo/types";

const LOGO_URL = `${SITE_URL}/ClykurLogo.webp`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: LEGAL_ENTITY.legalName,
    url: SITE_URL,
    logo: LOGO_URL,
    description:
      "Clykur builds software products and provides web development, mobile app development, UI/UX design, and product engineering services.",
    sameAs: getSocialUrlsForSchema(),
    address: {
      "@type": "PostalAddress",
      streetAddress: LEGAL_ENTITY.registeredAddressLines.slice(0, 2).join(", "),
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560016",
      addressCountry: "IN",
    },
    identifier: {
      "@type": "PropertyValue",
      name: "Udyam Registration Number",
      value: LEGAL_ENTITY.udyamRegistrationNumber,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      telephone: `+91${CONTACT_PHONE_WHATSAPP}`,
      availableLanguage: ["English"],
      areaServed: "Worldwide",
    },
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    brand: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    url: input.url,
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: `${SITE_URL}${input.path}`,
  };
}

export function jobPostingSchema(role: CareerRole, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.description.join("\n"),
    employmentType:
      role.employmentType === "Full-time"
        ? "FULL_TIME"
        : role.employmentType === "Part-time"
          ? "PART_TIME"
          : "CONTRACTOR",
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
    },
    jobLocationType: role.location === "Remote" ? "TELECOMMUTE" : undefined,
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Worldwide",
    },
    url,
  };
}

export function serviceSchema(page: SeoLandingPage) {
  const name = page.serviceName ?? page.h1;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description: page.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "Worldwide",
    url: `${SITE_URL}${page.path}`,
  };
}

export function faqPageSchema(faqs: SeoFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: SeoBreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href.startsWith("http")
        ? item.href
        : `${SITE_URL}${item.href}`,
    })),
  };
}

export function webPageSchemaFromPath(input: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.title,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function webPageSchema(page: SeoLandingPage) {
  return webPageSchemaFromPath({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

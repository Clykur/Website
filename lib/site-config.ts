/**
 * Site-wide config for SEO, canonical URLs, and shared metadata.
 * Optimized for: software product company, SaaS startup, engineering services.
 */
export const SITE_URL = "https://www.clykur.com";
export const SITE_NAME = "Clykur";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const CONTACT_EMAIL = "info@clykur.com";
export const CONTACT_PHONE_WHATSAPP = "8179299096";

/** Public trust metrics for marketing (update when numbers change). */
export const COMPANY_TRUST_STATS = {
  productsLaunched: 2,
  clientProjectsDelivered: 12,
  industriesServed: 6,
  yearsBuilding: 3,
} as const;

/** @deprecated Use CLYKUR_SOCIAL_LINKS from @/lib/social-links */
export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/clykur",
  "https://www.instagram.com/clykur",
  "https://clutch.co/profile/clykur",
  "https://www.producthunt.com/products/clykur",
  "https://dev.to/clykur",
  "https://hashnode.com/@clykur",
] as const;

export const DEFAULT_META = {
  title: "Clykur - A Click Away",
  description:
    "Clykur is a software product company and engineering partner. We build category-defining SaaS (appointment booking software, freelancer trust platform) and partner with companies to ship exceptional software. Frontend development, design-to-code, scalable systems.",
  keywords: [
    "software product company",
    "SaaS startup",
    "appointment booking software",
    "slot booking platform",
    "freelancer trust platform",
    "software engineering services",
    "frontend development company",
  ].join(", "),
};

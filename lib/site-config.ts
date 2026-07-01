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
    "Clykur is an AI-native product engineering company. We build production-ready software with AI-assisted delivery and experienced engineers who ensure quality, from SaaS products to custom engineering partnerships.",
  keywords: [
    "AI-native product engineering",
    "software engineering services",
    "product engineering company",
    "SaaS development",
    "frontend development company",
    "MVP development",
  ].join(", "),
};

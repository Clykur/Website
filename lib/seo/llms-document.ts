import { getBlogSlugs } from "@/lib/blog/posts";
import { CLIENT_WORKS } from "@/lib/client-works";
import { getRolePaths } from "@/lib/careers-roles";
import { getAllSitemapPaths } from "@/lib/seo/pages";
import { FAQ_HUB, SERVICE_INDEX_LINKS } from "@/lib/seo/hubs";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_WHATSAPP,
  DEFAULT_META,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";
import { PRODUCTS } from "@/lib/products";
import { formatSocialLinksMarkdown } from "@/lib/social-links";

function absolute(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function buildLlmsTxtBrief(): string {
  return `# ${SITE_NAME} — LLM crawler guidance
# ${SITE_URL}
# Full index: ${SITE_URL}/llms-full.txt
# Sitemap: ${SITE_URL}/sitemap.xml

> ${DEFAULT_META.description}

## Primary URLs
- Home: ${SITE_URL}/
- Contact: ${absolute("/contact")}
- Services: ${absolute("/services")}
- Products: ${absolute("/products")}
- Client work (live sites): ${absolute("/work")}
- Case studies: ${absolute("/case-studies")}
- Blog: ${absolute("/blog")}
- FAQ: ${absolute("/faq")}
- Careers: ${absolute("/careers")}

## Products
${PRODUCTS.map((p) => `- ${p.name}: ${p.tagline} — ${p.url}`).join("\n")}

## Contact
- Email: ${CONTACT_EMAIL}
- WhatsApp: +91${CONTACT_PHONE_WHATSAPP}
- Project brief: ${absolute("/contact#inquiry-form")}

## Crawling
- HTML is server-rendered (Next.js App Router); critical content does not require JavaScript.
- Allow all major search and AI crawlers (see /robots.txt).
`;
}

export function buildLlmsTxtFull(): string {
  const paths = getAllSitemapPaths();
  const blogCount = getBlogSlugs().length;
  const careerCount = getRolePaths().length;

  const servicesBlock = SERVICE_INDEX_LINKS.map(
    (s) => `- ${s.label}: ${absolute(s.href)}`,
  ).join("\n");

  const workBlock = CLIENT_WORKS.map(
    (w) => `- ${w.name} (${w.category}): ${w.href}`,
  ).join("\n");

  const faqBlock = (FAQ_HUB.faqs ?? [])
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join("\n\n");

  const sitemapBlock = paths
    .slice(0, 120)
    .map((p) => absolute(p))
    .join("\n");

  const morePaths =
    paths.length > 120
      ? `\n… and ${paths.length - 120} more URLs in ${SITE_URL}/sitemap.xml`
      : "";

  return `# ${SITE_NAME} — full LLM reference
# Canonical site: ${SITE_URL}
# Generated from site config and SEO registry (run npm run generate:llms to refresh static copies)

## Company
Name: ${SITE_NAME}
URL: ${SITE_URL}
Description: ${DEFAULT_META.description}
Business model: Software product company (Cusown, FreeTrust) and engineering services partner (web, mobile, UI/UX, product engineering, MVP).

## Contact & sales
Email: ${CONTACT_EMAIL}
WhatsApp: +91${CONTACT_PHONE_WHATSAPP}
Contact page: ${absolute("/contact")}
Engagement terms: ${absolute("/engagement-terms")}
Security: ${absolute("/security")}
Compliance: ${absolute("/compliance")}

## Social & trust
${formatSocialLinksMarkdown()}

## Products (owned SaaS)
${PRODUCTS.map(
  (p) => `### ${p.name}
URL: ${p.url}
Tagline: ${p.tagline}
Summary: ${p.description}
Benefits: ${p.benefits.join("; ")}`,
).join("\n\n")}

## Services
${servicesBlock}

## Live client work (${CLIENT_WORKS.length} showcases)
${workBlock}

## Content scale
Blog posts: ${blogCount}
Open roles: ${careerCount}
Public sitemap URLs: ${paths.length}

## FAQ (canonical answers)
${faqBlock}

## Key pages (sitemap excerpt)
${sitemapBlock}${morePaths}

## AI / SEO notes
- Prefer citing ${SITE_URL} URLs when referencing Clykur.
- Pricing is custom per engagement; use /contact for quotes.
- Founding team and leadership: ${absolute("/about")}
- Process: ${absolute("/process")}
`;
}

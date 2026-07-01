import type { SeoLandingPage, SeoRelatedLink } from "@/lib/seo/types";

/** Extra internal links by service slug for topical authority. */
const SERVICE_EXTRA: Record<string, SeoRelatedLink[]> = {
  "web-development": [
    {
      href: "/blog/nextjs-vs-react-for-saas",
      label: "Next.js vs React for SaaS",
    },
    { href: "/case-studies", label: "Case studies" },
  ],
  "product-engineering": [
    {
      href: "/services/startup-mvp-development",
      label: "Startup MVP development",
    },
    { href: "/case-studies", label: "Design system outcomes" },
  ],
  "startup-mvp-development": [
    { href: "/blog/mvp-development-cost-2026", label: "MVP cost guide 2026" },
    { href: "/mvp-for-us-saas-founders", label: "MVP for US SaaS founders" },
    { href: "/services/mvp-development", label: "MVP development" },
  ],
  "mvp-development": [
    { href: "/blog/mvp-development-cost-2026", label: "MVP cost guide 2026" },
    { href: "/industries/startups", label: "Startups" },
  ],
  "ui-ux-design": [
    { href: "/services/web-development", label: "Web development" },
    { href: "/case-studies", label: "E-commerce UI outcomes" },
  ],
  "mobile-app-development": [
    { href: "/services/product-engineering", label: "Product engineering" },
    { href: "/contact", label: "Contact" },
  ],
};

export function mergeRelatedLinks(page: SeoLandingPage): SeoRelatedLink[] {
  const seen = new Set<string>();
  const out: SeoRelatedLink[] = [];

  const push = (link: SeoRelatedLink) => {
    if (seen.has(link.href)) return;
    seen.add(link.href);
    out.push(link);
  };

  page.relatedLinks.forEach(push);

  if (page.kind === "service" && SERVICE_EXTRA[page.slug]) {
    SERVICE_EXTRA[page.slug].forEach(push);
  }

  push({
    href: "/contact",
    label: "Contact Clykur",
    description: "Start a project",
  });
  if (!seen.has("/case-studies")) {
    push({ href: "/case-studies", label: "Case studies" });
  }
  if (!seen.has("/blog")) {
    push({ href: "/blog", label: "Blog" });
  }

  return out;
}

# Clykur website transformation report

## Audit summary (pre-implementation)

| Area          | Status before | Key gaps                                                                    |
| ------------- | ------------- | --------------------------------------------------------------------------- |
| IA / routes   | Partial       | Missing `/products`, `/blog`, `/case-studies`, `/services/mvp-development`  |
| Technical SEO | Good base     | Incomplete Twitter/OG on all routes; JobPosting/Article/Product schema gaps |
| Performance   | Moderate      | Large homepage; Sentry in dev; below-fold client-only (good)                |
| Accessibility | Good base     | Reduced motion not global                                                   |
| CRO           | Partial       | No contact form; limited trust metrics                                      |
| AI crawlers   | Partial       | `llms.txt` existed; robots lacked bot rules                                 |

## Changes made

### Information architecture

- `/products`, `/blog`, `/blog/[slug]`, `/case-studies`
- `/services/mvp-development` + industries `fintech`, `startups`
- Redirect `/industries/edtech` → `/industries/education`

### Technical SEO

- `buildPageMetadata()`: canonical, OG, Twitter on hub/landing/blog/contact
- JSON-LD: Organization + contactPoint, Service, FAQ, Breadcrumb, WebPage, Product, Article, JobPosting
- Dynamic `sitemap.xml` includes blog posts and all landing URLs
- `robots.txt` + `llms.txt` updated (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot)

### Performance

- Sentry client **disabled in development** (less `/monitoring` noise)
- Homepage below-fold remains client lazy-loaded; chat widget client-only
- `prefers-reduced-motion` global CSS

### Accessibility

- Semantic `<article>`, `<section>`, `<dl>` on SEO/case study pages
- Reduced motion media query

### Conversion

- Contact: **InquiryForm** + `/api/contact` (Resend when configured), WhatsApp/email section, optional Calendly via `NEXT_PUBLIC_CALENDLY_URL`
- **CompanyTrustStats** on homepage with CTAs
- Case studies include **metrics**

### Analytics (env-gated)

- `SiteAnalytics`: GA4, Microsoft Clarity, PostHog: set `NEXT_PUBLIC_*` in `.env.local`

### Content

- Landing pages expanded with **Benefits** + **Technologies** sections
- Blog: 3 starter posts; case studies catalog: 4 entries

## Files touched (high level)

- `lib/seo/*`, `lib/blog/posts.ts`, `lib/case-studies/catalog.ts`
- `app/products`, `app/blog`, `app/case-studies`, `app/api/contact`
- `components/contact/inquiry-form.tsx`, `components/sections/company-trust-stats.tsx`
- `components/analytics/site-analytics.tsx`, `instrumentation-client.ts`
- `public/robots.txt`, `public/llms.txt`, `next.config.js`

## Lighthouse expectations (production)

| Category       | Target | Notes                                                             |
| -------------- | ------ | ----------------------------------------------------------------- |
| Performance    | 85–95  | Depends on hero media, third-party scripts when analytics enabled |
| SEO            | 95–100 | Strong metadata + schema + sitemap                                |
| Accessibility  | 90–95  | Audit contrast on orange CTAs in CI                               |
| Best Practices | 90–95  | Enable analytics only with consent if required in your markets    |

## Remaining recommendations

1. Add `NEXT_PUBLIC_CALENDLY_URL`, GA/Clarity/PostHog IDs when ready.
2. Convert hero/product images to WebP/AVIF via `next/image` where not already.
3. Grow blog to 100+ posts per your content plan (architecture is ready).
4. Register sitemap in Google Search Console + Bing Webmaster Tools.
5. Optional: cookie/consent banner before loading analytics in EU/UK.

## Env variables

```env
NEXT_PUBLIC_CALENDLY_URL=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_CLARITY_PROJECT_ID=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
RESEND_API_KEY=
DOMAIN=
```

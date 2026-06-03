# Clykur UX + conversion optimization refactor

Date: June 2026  
Scope: Structure and hierarchy only. No visual rebrand, no SEO content removal.

## 1. Homepage changes

Sales journey order:

1. **Hero** – Clearer H1/subcopy (what Clykur does, who it helps, outcomes). Primary CTA **Start a project** (`/contact`), secondary **View services** (`#services`).
2. **Trust bar** – Compact metrics (projects, products, industries, years).
3. **Core services** – Three linked service cards + link to `/services` (full capability map and flow diagram removed from home).
4. **Featured products** – Cusown and FreeTrust only (ecosystem pillar grid removed from home).
5. **Selected work** – Three client projects (unchanged limit) + links to `/work` and `/case-studies`.
6. **Why clients choose Clykur** – Existing About pillars (renamed heading).
7. **Process** – Same five-step summary + link to `/process`.
8. **Trust / proof** – Two case study narratives + MSME trust verification (portfolio grid removed from home).
9. **FAQ** – Four critical questions + link to `/faq`.
10. **Contact** – Prominent **Start a project** and **Book discovery call** above channels.

Removed from homepage (still on site): product ecosystem section, full portfolio grid, full six-case-study list, full FAQ list, six-service capability map.

## 2. Landing page improvements

- **On this page** navigation (mobile collapsible, desktop sticky sidebar).
- **Service pages** – Section order aligned to buyer flow: who it’s for → overview → benefits → process → technologies; deliverables, outcomes, and why Clykur grouped under “Additional detail” (content retained, lower visual weight).
- **Hero CTAs** on all SEO landings: Start a project + Book discovery call / Contact us.
- **Mid-page CTA** before tertiary content; **bottom CTA** unchanged pattern.
- **Case study** block emphasized (border/gradient) and placed before FAQ.
- **Related links** de-emphasized (still present for internal linking).

## 3. Content consolidation

- **Quick answers** merged into **FAQ** via `mergePageFaqs()` (deduplicated by question). All answer text remains on the page and in FAQ JSON-LD.
- Homepage FAQ reduced to four decision-stage items; full set on `/faq`.

## 4. CTA improvements

- Homepage hero and contact: Start a project + discovery/contact path.
- SEO template: consistent primary/secondary CTAs above the fold, mid-page, and footer (`SeoCta`, `LandingHeroCta`).

## 5. Conversion improvements

- Shorter path to contact from hero.
- Service cards link directly to money pages.
- Proof (case studies + client work) before FAQ and contact.
- Trust metrics immediately below hero.

## 6. UX improvements

- Less competing content per scroll on home.
- Landing pages scannable with TOC and tiered sections.
- Fewer duplicate Q&A blocks on the same URL.

## 7. Hierarchy improvements

- Primary vs tertiary section styling on service landings.
- Case study and CTAs elevated; related links and extra sections receded.

## 8. Files modified

| Area     | Files                                                                                                                                                                  |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home     | `app/page.tsx`, `components/home/home-below-fold.tsx`, `components/home/home-trust-bar.tsx`                                                                            |
| Sections | `hero.tsx`, `hero-heading.tsx`, `services.tsx`, `products.tsx`, `about.tsx`, `process.tsx`, `case-studies.tsx`, `faq.tsx`, `contact.tsx`, `client-works.tsx`           |
| SEO      | `components/seo/seo-landing-page.tsx`, `seo-cta.tsx`, `landing-hero-cta.tsx`, `on-this-page-nav.tsx`, `lib/seo/merge-page-faqs.ts`, `lib/seo/section-display-order.ts` |

## 9. Expected impact

| Metric                                          | Expected direction                                         |
| ----------------------------------------------- | ---------------------------------------------------------- |
| Engagement (scroll depth, time on key sections) | Up on home due to clearer sequence                         |
| Lead generation / inquiries                     | Up from repeated, visible CTAs and earlier trust           |
| Client inquiries quality                        | Up from service deep-links and clearer positioning         |
| Conversion rate (contact / visit)               | Moderate uplift; measure hero and contact CTR in analytics |

**Note:** Re-submit sitemap in Search Console after deploy; no URL removals.

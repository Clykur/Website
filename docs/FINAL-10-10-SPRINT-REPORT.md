# Final 10/10 optimization sprint: Clykur

Date: 2026-06-02  
Scope: Incremental improvements only (no rebuild). Production build: **passing**.

---

## 1. Files changed (summary)

| Area        | Files                                                                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Images      | `lib/products.ts`, `scripts/optimize-public-images.mjs`, `public/Product Images/*.webp`, `public/ClykurLogo.webp`, `components/sections/products.tsx`, `components/landing/hero-visual.tsx` |
| Fonts       | `app/layout.tsx`                                                                                                                                                                            |
| Analytics   | `components/analytics/site-analytics.tsx`                                                                                                                                                   |
| SEO / AI    | `lib/seo/ai-answers.ts`, `components/seo/ai-answer-blocks.tsx`, `lib/seo/internal-links.ts`, `components/seo/seo-landing-page.tsx`, `components/seo/seo-cta.tsx`, `lib/seo/schemas.ts`      |
| A11y        | `components/layout/skip-to-main.tsx`, `app/globals.css` (prior), `app/layout.tsx`                                                                                                           |
| Config      | `next.config.js`, `package.json`                                                                                                                                                            |
| Trust / CRO | `components/sections/company-trust-stats.tsx`, `app/blog/[slug]/page.tsx`                                                                                                                   |
| Nav         | `components/navigation.tsx`                                                                                                                                                                 |

---

## 2. Issues discovered

### Performance

- Product PNGs **~600 KB + ~813 KB** shipped to browsers.
- Analytics (GA, Clarity, PostHog) initialized on `afterInteractive`, competing with hydration.
- Nav logo used raw `<img>` with very large CSS height classes (CLS risk).
- Duplicate logo `<img>` in hero visual (alongside `next/image`).

### SEO / AI

- Service pages lacked **visible “quick answer”** blocks for AI retrieval.
- Internal links were static per page; missing cross-links to blog/case studies on many services.

### Accessibility

- No **skip to main content** link.

---

## 3. Issues fixed (implemented)

| Fix                                                                          | Impact                                                   |
| ---------------------------------------------------------------------------- | -------------------------------------------------------- |
| WebP assets + `next/image` sizes/quality/lazy on products                    | **~1.4 MB → ~52 KB** product imagery on wire (see §4)    |
| `formats: avif, webp` in `next.config.js`                                    | Automatic optimization for remote/local images via Image |
| Analytics deferred until **idle (3.5s) or first interaction** + `lazyOnload` | Better LCP/INP on first load                             |
| Poppins weights **400,600,700** only + `adjustFontFallback`                  | Smaller font payload, less CLS                           |
| Inter `adjustFontFallback`                                                   | Metric alignment                                         |
| Skip link                                                                    | WCAG 2.2 bypass block                                    |
| AI answer blocks on all SEO landing pages                                    | ChatGPT/Perplexity/Claude/Gemini retrievability          |
| `mergeRelatedLinks()`                                                        | Stronger internal linking                                |
| Enhanced `SeoCta` (discovery call + consultation paths)                      | CRO                                                      |
| Nav logo → `next/image` with stable dimensions                               | CLS + LCP discipline                                     |
| Hero duplicate `<img>` removed                                               | Less DOM + duplicate fetch                               |

---

## 4. Image optimization report

| Asset          | Before    | After (WebP) | Savings                          |
| -------------- | --------- | ------------ | -------------------------------- |
| Cusown.png     | 599 KB    | 21 KB        | **97%**                          |
| FreeTrust.png  | 813 KB    | 31 KB        | **96%**                          |
| ClykurLogo.png | 183 KB    | 9 KB         | **95%**                          |
| udyam QR       | 17 KB PNG | kept PNG     | QR kept raster PNG (WebP larger) |

**Command:** `npm run optimize-images`

Product cards now reference `.webp` paths. Hero/marketing logo remains **SVG** (appropriate for LCP).

---

## 5. Font optimization

| Before                                      | After                                          |
| ------------------------------------------- | ---------------------------------------------- |
| Poppins 400,500,600,700                     | **400,600,700**                                |
| Inter swap only                             | Inter + Poppins **`adjustFontFallback: true`** |
| Calegar OTF (decorative, case studies only) | Unchanged (limited use)                        |

Calegar is not loaded via `next/font` (display-only). Consider subsetting OTF later if case-study band is removed on mobile.

---

## 6. Bundle / JavaScript

No dependency removals in this sprint (avoids breakage). Existing mitigations retained:

- Homepage below-fold: **client dynamic imports** (`HomeBelowFold`)
- Chat: **client-only** loader
- Sentry: **production-only** client init
- `optimizePackageImports` for `lucide-react`, `framer-motion`

**Remaining weight:** `framer-motion`, `gsap`, `lenis` on desktop smooth scroll: acceptable for brand site; further cuts would need motion redesign.

---

## 7. Third-party scripts

| Tool        | Strategy                                       |
| ----------- | ---------------------------------------------- |
| GA4         | `lazyOnload` + deferred until idle/interaction |
| Clarity     | Same                                           |
| PostHog     | Same                                           |
| Chat widget | Already dynamic `ssr: false`                   |

---

## 8. Accessibility improvements

- Skip to `#main-content`
- Global `prefers-reduced-motion` (existing)
- Forms: labels on contact inquiry form (existing)
- Nav logo: explicit dimensions via `next/image`

**Target:** Lighthouse Accessibility **95+** (verify contrast on orange CTAs in CI).

---

## 9. CRO improvements

- SEO pages: **Start a project**, **Book discovery call** / **Request consultation**, **View all services**
- Trust band: MSME + products + industries copy
- Blog posts: related links to services, products, case studies, contact

---

## 10. Internal linking map (automatic merges)

`mergeRelatedLinks()` augments each landing page with:

- Page-specific extras (`lib/seo/internal-links.ts`)
- Always: `/contact`, `/case-studies`, `/blog` (if not already present)

Examples:

- `web-development` → blog Next.js article, case studies hub
- `startup-mvp-development` → MVP cost article, `/services/mvp-development`
- `cusown` → “How we built Cusown”, healthcare industry
- `freetrust` → SaaS industry, product engineering

---

## 11. SEO / schema

- Organization logo URL → **ClykurLogo.webp**
- FAQ + Service + Product + Breadcrumb + WebPage unchanged and valid
- Visible **Quick answers** complement FAQ JSON-LD (not duplicated in schema to avoid redundant entities)

---

## 12. AI discoverability

Each service/product/industry/programmatic landing page now includes **Quick answers** with factual sentences, e.g.:

- What is [service]?
- What does Clykur offer?
- How much does MVP development cost? (MVP-related slugs)

---

## 13. Trust signals

- Homepage stats band + proof line (MSME, products, industries)
- Case study metrics on SEO pages (existing)
- UDYAM QR unchanged (PNG for scan reliability)

---

## 14. QA performed

- [x] `npm run build` success
- [x] Invalid internal URLs avoided (case studies hub only)
- [ ] Manual Lighthouse run (run locally after deploy)
- [ ] Rich Results Test for sample URLs (recommended)

---

## 15. Remaining opportunities (low risk, next iteration)

1. Run **Lighthouse CI** on production URL and tune hero LCP (SVG logo + defer HeroVisual further).
2. Add **consent mode** before analytics if EU traffic is material.
3. Subset or drop **Calegar** on mobile case-study section.
4. Evaluate **PullToRefresh** off on desktop (already mobile-oriented).
5. Publish **og-image** as WebP under 150 KB if not already.
6. Grow blog to 100+ posts (architecture ready).

---

## 16. Estimated scores (production, after deploy)

| Metric                    | Estimate                                                                   |
| ------------------------- | -------------------------------------------------------------------------- |
| Lighthouse Performance    | **88–96** (analytics on → lower; off first paint → higher)                 |
| Lighthouse SEO            | **98–100**                                                                 |
| Lighthouse Accessibility  | **94–98**                                                                  |
| Lighthouse Best Practices | **92–98**                                                                  |
| LCP                       | **1.6–2.4 s** (hero + fonts; improved vs 600KB product images on homepage) |
| CLS                       | **&lt; 0.05** (nav logo sizing helps)                                      |
| INP                       | **&lt; 150 ms** (deferred analytics + less main-thread contention)         |

---

## 17. Internal linking diagram (high level)

```text
/services/* ──► /blog/*, /case-studies, /contact, /products/*
/products/* ──► /blog/*, /industries/*, /services/*
/blog/* ──► /services, /products, /case-studies, /contact
/case-studies ──► /contact, /services/*
```

---

_End of sprint report._

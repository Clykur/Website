# Navigation, IA & mobile UX refinement report

Date: June 2026  
Scope: Navigation clarity, discoverability, mobile usability, CTAs, footer IA, accessibility. No rebrand.

---

## 1. Navigation issues found (audit)

| Issue                                                                                                  | Impact                                |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| **“Offerings”** mixed services, products, about, and home anchors                                      | Confusing mental model                |
| **Duplicate destinations** (`/#faq` vs `/faq`, `/#services` vs `/services`, portfolio hash vs `/work`) | Same goal, different URLs             |
| **Work menu** pointed at removed homepage sections (`/#portfolio`)                                     | Broken or empty scroll targets        |
| **Resources** included “Trust” hash only on home                                                       | Hard to discover trust story off-home |
| **Careers + Contact** as loose top-level while Company items hidden in dropdowns                       | Uneven IA                             |
| **Single CTA** (“Get in Touch”)                                                                        | Weak alignment with CRO spec          |
| **Logo sizing** (`h-36` in `h-16` bar)                                                                 | Mobile overflow and tap clutter       |
| **Footer “Solutions”** mixed services, blog, work                                                      | Poor scanning                         |
| **Footer “Product”** column held About/Careers/Contact                                                 | Mislabeled group                      |

---

## 2. Mobile issues found

| Issue                                                        | Impact                            |
| ------------------------------------------------------------ | --------------------------------- |
| No **one-tap** paths to Services / Products / Work / Contact | Extra taps through nested groups  |
| **CTA only at bottom** of long sheet                         | Easy to miss when scrolling menu  |
| **Touch targets** below 44px on some sub-rows                | WCAG / usability risk             |
| **Oversized logo** in header                                 | Crowded bar, layout stress        |
| Landing pages without `overflow-x-hidden` on article         | Occasional horizontal scroll risk |

---

## 3. Changes implemented

### Desktop navbar

- **Home** link + logo (accessible home label on logo).
- Top-level groups: **Services**, **Products**, **Work**, **Industries**, **Resources**, **Company** (per approved IA).
- Dropdowns use **section headings**, **44px row height**, “View all” styling, no duplicate hash links.
- **Primary CTA:** Start a project → `/contact`
- **Secondary CTA:** Book discovery call (when `NEXT_PUBLIC_CALENDLY_URL` is set)

### Mobile menu

- **2×2 quick grid:** Services, Products, Work, Contact (one tap).
- Expandable groups for full tree.
- **Sticky footer** in sheet: Start a project + Book discovery call / Contact us.
- Improved row spacing and **48px** accordion headers.

### Footer

- Columns: **Services**, **Products**, **Resources**, **Company**, plus **Legal** row.
- Top **conversion strip** with Start a project + Book discovery call.

### Shared config

- Centralized in `lib/site-navigation.ts` (nav + footer links).

### Other

- `Escape` closes desktop dropdowns and mobile menu.
- Path-aware **active** states for nested routes (`/services/*`, `/products/*`, etc.).
- SEO landing article: `overflow-x-hidden` for mobile safety.

---

## 4. Files modified

| File                                      | Change                                                    |
| ----------------------------------------- | --------------------------------------------------------- |
| `lib/site-navigation.ts`                  | **New** – NAV_STRUCTURE, footer links, mobile quick links |
| `components/navigation.tsx`               | Full IA restructure, CTAs, mobile UX, a11y                |
| `components/footer.tsx`                   | Grouped links + footer CTAs                               |
| `components/seo/seo-landing-page.tsx`     | Overflow guard                                            |
| `docs/NAV-IA-MOBILE-REFINEMENT-REPORT.md` | This report                                               |

---

## 5. Conversion improvements

- Consistent **Start a project** in header (desktop + mobile), footer, and existing landing CTAs.
- **Book discovery call** visible where Calendly is configured.
- Faster mobile path to **Contact** and **Services**.

---

## 6. Discoverability improvements

- All major hubs reachable from nav within **≤2 clicks** (e.g. Home → Industries → Healthcare).
- Industry and service **child URLs** exposed in menus.
- Footer mirrors nav groups so crawlers and users see the same taxonomy.

---

## 7. Accessibility improvements

- `aria-expanded` / `aria-haspopup` on menu buttons (existing pattern retained).
- `role="menu"` / `menuitem` on desktop dropdown links.
- **Escape** to dismiss overlays.
- **Focus-visible** rings on footer links (existing).
- **44px+** targets on mobile menu rows and footer links.
- Logo link: `aria-label="Clykur home"`, decorative `alt=""` on mark (text link context).

---

## 8. Remaining recommendations

1. **XL breakpoints:** On viewports between `md` and `xl`, nav may wrap to two lines; monitor or add a “More” overflow menu if needed.
2. **Industries hub page** (`/industries`): Optional index page linked from nav “View all industries” (route not added to avoid new URLs without content).
3. **Analytics:** Track clicks on quick links, Start a project, and Book discovery call to validate IA changes.
4. **Blog hub:** Ensure `/blog` index is linked from in-content CTAs on posts (journey D).
5. **Periodic audit:** When adding pages, update `lib/site-navigation.ts` only (single source of truth).

---

## Success criteria check

| Criterion                              | Status                                                    |
| -------------------------------------- | --------------------------------------------------------- |
| Structure understandable in ~5 seconds | Improved via labeled groups (Services, Products, Work, …) |
| Major page within 2 clicks             | Yes, via nav dropdowns + footer                           |
| Contact / start path from any page     | Header + footer + landing CTAs                            |

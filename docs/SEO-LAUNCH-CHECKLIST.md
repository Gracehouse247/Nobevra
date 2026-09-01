# Nobevra SEO Launch Checklist

> **Purpose:** Step-by-step pre-launch and post-launch SEO verification checklist. Run this checklist before every significant deployment and after major content pushes.

---

## Phase 1 — Technical Foundation ✅

- [x] `next.config.js` sets `X-Robots-Tag: index, follow` for all public routes
- [x] `robots.txt` disallows: `/dashboard`, `/admin`, `/api`, `/embed`, `/settings`, `/portal/`, `/q/`
- [x] `sitemap.xml` is dynamically generated via `web-app/src/app/sitemap.ts`
- [x] All public routes appear in `sitemap.xml` with correct `priority` and `changeFrequency`
- [x] `<link rel="canonical">` is set on every public page
- [x] Auth routes (`/login`, `/register`, `/forgot-password`, `/reset-password`, `/logout`) have explicit `robots: { index: true, follow: true }` or `noindex` as appropriate
- [x] `next.config.js` has production `Cache-Control` headers for static assets
- [x] 222/222 routes build with 0 TypeScript errors (`npm run build`)

---

## Phase 2 — Metadata Completeness ✅

- [x] Every public page has `export const metadata` or `export const generateMetadata`
- [x] Every page has a unique, keyword-targeted `title` tag (≤ 60 characters)
- [x] Every page has a unique `description` (≤ 160 characters)
- [x] Every page has `openGraph.title`, `openGraph.description`, `openGraph.url`, `openGraph.type`
- [x] Every page has `openGraph.images` with a 1200×630px image path
- [x] Every page has `twitter.card: 'summary_large_image'`
- [x] Every page has `twitter.title`, `twitter.description`, `twitter.images`
- [x] `alternates.canonical` is set on every public page

---

## Phase 3 — Structured Data (JSON-LD) ✅

- [x] `/pricing` — `SoftwareApplication` + `PriceSpecification` (Explorer, Pulse, Elite) + `FAQPage`
- [x] `/invoicing` — `SoftwareApplication` + `FAQPage`
- [x] `/crm` — `SoftwareApplication` + `FAQPage` + `HowTo`
- [x] `/client-portal-software` — `SoftwareApplication` + `FAQPage` + `HowTo`
- [x] `/client-contracts` — `SoftwareApplication` + `FAQPage`
- [x] `/features` — `ItemList` (all feature sub-pages indexed)
- [x] `/solutions` — `ItemList` (all persona sub-pages indexed)
- [x] `/solutions/simple-invoicing-for-freelancers` — `SoftwareApplication` + `Service`
- [x] `/solutions/agency-billing-platform` — `SoftwareApplication` + `Service`
- [x] `/solutions/best-small-business-invoicing-software` — `SoftwareApplication` + `Service` + `FAQPage`
- [x] `/solutions/ecommerce-invoice-automation` — `SoftwareApplication` + `Service`
- [x] `/solutions/enterprise-billing-platform` — `SoftwareApplication` + `Service`
- [x] All `<script type="application/ld+json">` rendered via `dangerouslySetInnerHTML` (not JSX text children)
- [ ] Validate all schemas at https://validator.schema.org/
- [ ] Validate rich results at https://search.google.com/test/rich-results

---

## Phase 4 — Indexability ✅

- [x] `/features/best-free-invoice-app` → `index: true` (was noindex — reversed)
- [x] `/where-to-make-business-cards` → `index: true` (was noindex — reversed)
- [x] `/features/billing-software-online` → `index: true` (was noindex — reversed)
- [x] `/forgot-password`, `/reset-password`, `/logout` → `noindex, nofollow`
- [x] Admin routes (`/admin/*`) → `noindex, nofollow`
- [x] API routes → excluded from sitemap

---

## Phase 5 — Information Architecture ✅

- [x] `/solutions` hub page built and linked in footer
- [x] `/business-management-software` linked in footer
- [x] `/solutions/*` all have canonical breadcrumbs
- [x] `BreadcrumbSchema` component used on all major product and feature pages
- [ ] Run Screaming Frog crawl and verify no orphan pages with 0 inbound links
- [ ] Confirm `/solutions`, `/where-to-make-business-cards`, `/gamified-invoicing-software` have ≥ 3 inbound links (see `SEO-INTERNAL-LINK-MAP.md`)

---

## Phase 6 — Google Search Console

- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Verify all 55 public pages are **Discovered** or **Indexed**
- [ ] Request indexing for newly published pages:
  - [ ] `/solutions`
  - [ ] `/solutions/agency-billing-platform`
  - [ ] `/solutions/best-small-business-invoicing-software`
  - [ ] `/solutions/ecommerce-invoice-automation`
  - [ ] `/solutions/enterprise-billing-platform`
  - [ ] `/features/best-free-invoice-app`
  - [ ] `/where-to-make-business-cards`
  - [ ] `/features/billing-software-online`
- [ ] Check **Coverage Report** for any `Excluded` or `Crawl anomaly` pages
- [ ] Set target country to **Nigeria + Global** in GSC settings

---

## Phase 7 — Social Sharing Verification

- [ ] Test 5 key pages on [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Test 5 key pages on [Facebook Open Graph Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test `/pricing` on LinkedIn post composer (paste URL to verify preview)
- [ ] Test `/free-invoice-generator` on WhatsApp link preview

---

## Phase 8 — Performance & Core Web Vitals

- [ ] Run PageSpeed Insights on `/` — target LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Run PageSpeed Insights on `/pricing` — critical conversion page
- [ ] Run PageSpeed Insights on `/free-invoice-generator` — traffic-heavy tool
- [ ] Verify all OG images (`/images/*.png`) are served at correct 1200×630px resolution
- [ ] Confirm `next/image` is used for all above-fold hero images

---

## Phase 9 — Ongoing Governance

- [ ] Before creating any new page: check `SEO-KEYWORD-OWNERSHIP.json`
- [ ] After creating any page: update `SEO-URL-INVENTORY.json`
- [ ] Before any URL change: add entry to `SEO-REDIRECT-MAP.json`
- [ ] After any content cluster addition: update `SEO-CONTENT-MAP.json`
- [ ] Monthly: Review GSC impressions for top-20 pages and update underperforming meta titles
- [ ] Quarterly: Update `SEO-SERP-RESEARCH.md` with new keyword opportunities

---

## Next Priority Actions

| Priority | Action | Owner |
| :--- | :--- | :--- |
| P0 | Submit sitemap to Google Search Console | Dev |
| P0 | Validate all JSON-LD at schema.org/validator | Dev |
| P1 | Run Screaming Frog crawl to catch orphan pages | Dev |
| P1 | Test social cards for 5 priority pages | Marketing |
| P1 | Request indexing for 8 newly enabled pages in GSC | Dev |
| P2 | Add `HowTo` schema to `/features/what-is-invoicing-software` | Dev |
| P2 | Create `/templates/proforma-invoice-template` | Dev |
| P2 | Publish 3 original data-driven blog posts | Marketing |
| P3 | Add FAQPage schema to `/solutions/agency-billing-platform` | Dev |
| P3 | Create `/solutions/nonprofits` or `/solutions/service-businesses` | Dev |

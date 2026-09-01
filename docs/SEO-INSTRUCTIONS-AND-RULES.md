# Nobevra SEO — Standard Instructions & Rules

> **Document Type:** Governance Standard  
> **Authority Level:** Mandatory — applies to all SEO work on Nobevra  
> **Version:** 1.0.0 · 2026-09-01  
> **Agent Rule File:** `.agents/rules/nobevra-seo.md` (Antigravity reads this automatically)

---

## Why This Document Exists

The original Nobevra SEO strategy included guidance such as "250+ country/industry-specific invoice hubs." This document formally withdraws that guidance and replaces it with a standard that aligns with Google's current published Search Essentials — specifically Google's explicit warning against *large amounts of content produced primarily for search engines*.

This ruleset governs every future SEO decision, content creation task, page creation, and sitemap submission for Nobevra.

---

## The Governing Principle

> **Nobevra must be built to serve real users first.**  
> Every page must have a real user who searches a real query and receives complete, unique value from that page.  
> If that condition cannot be met, the page must not be created.

---

## Rule 1 — Keyword Ownership Is Absolute

Before creating any new page, check `docs/SEO-KEYWORD-OWNERSHIP.json`.

- If the search intent maps to an existing concept pillar → **strengthen that page**. Never create a competing URL.
- If the search intent is genuinely distinct → register the new concept, then create the page.
- After creating a new page, update both `SEO-KEYWORD-OWNERSHIP.json` and `SEO-URL-INVENTORY.json`.

This rule prevents keyword cannibalization permanently.

---

## Rule 2 — No Duplicate Commercial Pages

Two Nobevra pages must never target the same primary commercial keyword.

**If a duplicate exists:**
1. Identify the stronger page (better content, higher authority, more established URL).
2. Give the weaker page `robots: { index: false }` and canonical pointing to the stronger page.
3. Log the mapping in `docs/SEO-REDIRECT-MAP.json`.
4. Implement a one-hop 301/308 redirect in `next.config.js`.

---

## Rule 3 — Content Volume Is NOT a Goal

Content creation quotas, page-count targets, and word-count rules are prohibited.

**Content is only authorized when:**
1. There is genuine, measurable search demand for that specific intent.
2. The page provides unique value that does not exist on any current Nobevra page.
3. The content completely satisfies the user's task.

> Write until the user's task is completely satisfied — not until a word-count target is reached.

A 1,400-word article that completely solves *"How do I make a proforma invoice?"* is stronger than a padded 4,500-word article that only partially answers the question.

---

## Rule 4 — Template Pages Require Unique Value

Template and industry-specific pages are only authorized when each page provides:

| Requirement | Description |
| :--- | :--- |
| ✅ Unique fields | Industry-specific line items, fields, or tax considerations not present on other pages |
| ✅ Usable immediately | A downloadable asset or embedded generator the user can use right now |
| ✅ Original examples | Real examples that differ substantively from every other template page |
| ✅ Genuine demand | Evidence of search volume specific to that industry/template type |

**Prohibited:** Creating 10 template pages where 90% of the content is identical (e.g., Photography · Wedding · Freelancer · Designer · Consultant invoices with the same boilerplate). This is the pattern Google explicitly warns against.

---

## Rule 5 — Content Tier Priority

All SEO work follows this priority order. Higher tiers must be strong before investing in lower tiers.

### Tier 1 — Core Commercial Authority
*Must be exceptionally strong before any other content is created.*

| Page | Primary Concept |
| :--- | :--- |
| `/` | Brand / Platform Hub |
| `/business-management-software` | The Operating System |
| `/invoicing` | Invoicing Engine |
| `/crm` | Client Management |
| `/expense-management` | Expense Tracking |
| `/products-inventory` | Stock & Catalog |
| `/payments` | Global Payments |
| `/digital-business-card` | Digital Identity |
| `/ai-business-assistant` | Financial AI |
| `/client-contracts` | E-Signatures & Agreements |
| `/recurring-billing-software` | Subscription & Retainer Billing |
| `/client-portal-software` | White-Label Client Hub |
| `/cash-flow-analytics` | Forecasting & Receivables |

---

### Tier 2 — PLG Acquisition Tools
*These must be real tools that satisfy user intent immediately — not landing pages that describe a tool.*

- `/free-invoice-generator` — Instant PDF invoice generation. No signup required.
- `/ai-receipt-scanner` — Immediate OCR and categorization.
- `/qr-code-generator` — Functional, dynamic QR code creation.

SERP intent for tool queries differs fundamentally from informational queries. A user searching "free invoice generator" expects to use one immediately, not read about one.

---

### Tier 3 — Persona / Solution Pages
*Each page must show the exact workflow for that persona — not generic benefit statements.*

- `/solutions/simple-invoicing-for-freelancers`
- `/solutions/agency-billing-platform`
- `/solutions/best-small-business-invoicing-software`
- `/solutions/ecommerce-invoice-automation`
- `/solutions/enterprise-billing-platform`

❌ Weak: *"Nobevra helps freelancers manage invoices, expenses and clients."*  
✅ Strong: *A step-by-step walkthrough of exactly how a freelancer creates an invoice, sends it, tracks the view, and gets paid — with Nobevra's specific UI screenshots.*

---

### Tier 4 — Educational Content (Cluster-Based Only)
*Never publish educational content as isolated, unlinked pages.*

Build authoritative topic clusters. Every cluster page must connect to its Tier 1 pillar.

**Example — Invoicing Cluster:**
```
Pillar: /invoicing
  └── /features/how-do-i-make-an-invoice
  └── /features/how-to-make-a-proforma-invoice
  └── /features/how-to-bill-clients-on-retainer
  └── /features/what-is-invoicing-software
  └── /features/automated-invoicing-software → canonical: /invoicing
  └── /templates (invoice templates hub)
  └── /free-invoice-generator (tool node)
```

---

## Rule 6 — Technical Requirements Per Page

Every public SEO page must deliver the following in the **server-rendered initial HTML** — not merely after JavaScript executes:

```
✅ <title> tag
✅ <meta name="description">
✅ <link rel="canonical">
✅ <h1> — exactly one per page
✅ Primary body content (not JavaScript-rendered)
✅ Navigation links
✅ At least 2 internal links to related pages
✅ Important above-fold images with alt text
✅ <script type="application/ld+json"> structured data (where applicable)
```

**Verification command:**
```bash
curl -s https://nobevra.noblesworld.com.ng/<route> | grep -E "<title>|canonical|<h1>|application/ld\+json"
```

> Google can process JavaScript, but JavaScript-powered sites must still deliver critical metadata in the initial HTML response.

---

## Rule 7 — Structured Data Standards

### ✅ Authorized Schema Types for Nobevra

| Schema Type | Where To Use |
| :--- | :--- |
| `Organization` | Site-wide (in root layout or homepage) |
| `WebSite` | Homepage |
| `BreadcrumbList` | All product and feature pages |
| `SoftwareApplication` | Actual software product pages only |
| `FAQPage` | Only where FAQ questions are visibly rendered on the page |
| `HowTo` | Only where a real numbered step-by-step guide exists |
| `Article` / `BlogPosting` | Blog articles only |
| `PriceSpecification` | `/pricing` only |
| `Service` | `/solutions/*` persona pages |
| `ItemList` | Hub pages listing real child pages |

### ❌ Never

- Manufacture `AggregateRating` or `Review` data that is not from real users
- Mark content invisible to users but visible in schema markup
- Create `FAQPage` schema for questions not rendered on the page
- Add schema types that don't genuinely describe the page content
- Use schema to manipulate appearance of pages that don't qualify for rich results

> Google's documentation explicitly states: misleading or non-visible structured data can trigger manual actions.

---

## Rule 8 — Sitemap Governance

Source file: `web-app/src/app/sitemap.ts`

| Rule | Requirement |
| :--- | :--- |
| Only indexable pages | Never add `noindex` pages to sitemap |
| Auth pages excluded | `/login`, `/register`, `/forgot-password`, `/reset-password`, `/logout` must never appear |
| App/API excluded | `/dashboard/`, `/admin/`, `/api/`, `/settings/`, `/portal/`, `/embed/` etc. must be in `disallowList` in `robots.ts` |
| New indexed pages | Add to `sitemap.ts` immediately when a page goes from `noindex` to `index: true` |
| `/pitch` | Priority must be ≤ 0.40 |

**Priority Scale:**
```
Homepage:       1.0
Tier 1 pages:   0.90–0.95
Tier 2 tools:   0.85–0.90
Tier 3 pages:   0.80–0.85
Tier 4 guides:  0.65–0.75
Legal pages:    0.50
Auth pages:     NOT in sitemap
```

---

## Rule 9 — Internal Linking Requirements

Every newly created page requires before it is considered fully published:
- ≥ 3 inbound internal links from existing pages
- Outbound link to its concept pillar (Tier 1 page)
- Outbound link to at least 1 related tool or guide
- Outbound CTA link to `/pricing`

Reference: `docs/SEO-INTERNAL-LINK-MAP.md` — update the orphan watchlist whenever a page has fewer than 3 inbound links.

---

## Rule 10 — URL Stability

Published, indexed URLs must never change without completing all of:

1. Log the migration in `docs/SEO-REDIRECT-MAP.json`
2. Implement a one-hop 301/308 in `next.config.js`
3. Update all internal links (nav, footer, breadcrumbs, CTAs, body copy)
4. Update `sitemap.ts`
5. Submit updated sitemap in Google Search Console
6. Monitor GSC Coverage Report for 30 days

**One-hop maximum. No redirect chains.**

---

## Rule 11 — Launch Gate Checklist

The sitemap must not be submitted to Google Search Console until all gates pass.

### 🟢 Technical Gate
- [ ] All Tier 1 pages return HTTP 200
- [ ] All Tier 1 pages: `<title>`, `<meta description>`, canonical, OG, Twitter card
- [ ] Zero accidental `noindex` on Tier 1 or Tier 2 pages
- [ ] Zero redirect chains (max 1 hop per URL)
- [ ] No broken internal links on Tier 1 pages
- [ ] `/sitemap.xml` returns valid XML
- [ ] `/robots.txt` returns valid robots rules
- [ ] `npm run build` passes with 0 errors and 0 TypeScript warnings

### 🟢 Content Gate
- [ ] Each Tier 1 page has correct primary intent (not cannibalizing siblings)
- [ ] Each Tier 2 tool works as an actual functional tool
- [ ] Each Tier 3 solution page contains a real, differentiated persona workflow

### 🟢 Architecture Gate
- [ ] No Tier 1 page has fewer than 3 inbound internal links
- [ ] No two pages share the same primary keyword concept owner
- [ ] No active redirect chains
- [ ] No empty hub pages (categories with no child pages)

### 🟢 Trust Gate
- [ ] `/free-invoice-maker-app-about` — company identity clear
- [ ] `/pricing` — transparent pricing visible
- [ ] `/privacy`, `/terms`, `/security`, `/compliance` — accessible from footer
- [ ] `/help-center` — support accessible

### 🟢 UX Gate
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1 on Tier 1 pages
- [ ] Mobile-responsive on all Tier 1 and Tier 2 pages
- [ ] HTTPS on all pages

---

## Rule 12 — The Required Launch Sequence

This sequence must not be skipped or reordered.

```
BUILD
  ↓
FORENSIC SEO AUDIT
  ↓  (Read all docs/ source-of-truth files)
KEYWORD OWNERSHIP VERIFICATION
  ↓  (docs/SEO-KEYWORD-OWNERSHIP.json)
CONTENT GAP ANALYSIS
  ↓  (docs/SEO-CONTENT-MAP.json)
IMPLEMENTATION
  ↓
TECHNICAL VALIDATION
  ↓  (Rule 6 checklist applied to every changed page)
CONTENT QUALITY GATE
  ↓  (Rule 11)
npm run build — must pass 0 errors
  ↓
SITEMAP VALIDATION
  ↓  (verify /sitemap.xml is correct and complete)
GOOGLE SEARCH CONSOLE — verify property ownership
  ↓
SUBMIT SITEMAP
  ↓
REQUEST INDEXING for all Tier 1 and Tier 2 pages via URL Inspection tool
  ↓
MONITOR — wait 7–14 days for GSC data
  ↓
ITERATE from real GSC impression + click data
```

---

## Rule 13 — No Guarantee of Ranking

No SEO implementation, no matter how thorough, guarantees a specific ranking position or indexing timeline.

Google's own documentation explicitly states: there are no secrets that automatically rank a site first, and Google does not guarantee indexing of any submitted URL.

The correct goal is: **engineer Nobevra so that from the moment Google discovers it, there are as few technical, content-quality, architecture, and topical-authority weaknesses as possible** — then use real Search Console data to systematically close the remaining gaps.

Never promise specific ranking outcomes to stakeholders.

---

## Source of Truth File Reference

| File | Purpose | When to Read |
| :--- | :--- | :--- |
| `docs/SEO-MASTER-PLAN.md` | 5-layer architecture, flywheel, URL policy | Architecture decisions |
| `docs/SEO-KEYWORD-OWNERSHIP.json` | Concept pillar owners and semantic variants | Before any new page |
| `docs/SEO-URL-INVENTORY.json` | All 55 public pages with layer and schema status | Audits and gap analysis |
| `docs/SEO-REDIRECT-MAP.json` | All URL migration logs | Before any URL change |
| `docs/SEO-CONTENT-MAP.json` | Content clusters, gaps, upgrade actions | Content planning |
| `docs/SEO-INTERNAL-LINK-MAP.md` | Mandated link architecture, orphan watchlist | Internal linking tasks |
| `docs/SEO-SERP-RESEARCH.md` | Keyword tiers, SERP features, AI search strategy | Keyword and content research |
| `docs/SEO-LAUNCH-CHECKLIST.md` | Phase-by-phase pre-launch verification | Pre-launch audits |

## nobevra-seo

Nobevra SEO Standard Instructions & Rules — all SEO tasks must follow this ruleset.

### Source of Truth Files
Before any SEO task, read (in this order):
1. `docs/SEO-KEYWORD-OWNERSHIP.json` — check if the target intent already has a concept owner
2. `docs/SEO-URL-INVENTORY.json` — check if a page already exists for this intent
3. `docs/SEO-CONTENT-MAP.json` — check if this belongs in an existing cluster
4. `docs/SEO-REDIRECT-MAP.json` — check if a migration is already logged
5. `docs/SEO-MASTER-PLAN.md` — for architecture decisions

---

### RULE 1 — Keyword Ownership Is Absolute

Before creating ANY new page, query the Keyword Ownership Registry (`docs/SEO-KEYWORD-OWNERSHIP.json`):
- If the search intent maps to an **existing concept owner** → strengthen that page. Do NOT create a new URL.
- Only create a new page if the search intent is demonstrably distinct and cannot be satisfied by an existing page.
- After creating a new page, immediately register it in `SEO-KEYWORD-OWNERSHIP.json` and `SEO-URL-INVENTORY.json`.

---

### RULE 2 — No Duplicate Commercial Pages

Never create two pages that target the same primary commercial keyword.
Cannibalization signals to Google that neither page deserves to rank.

Canonical redirect pattern (if a duplicate exists):
- The weaker page gets `robots: { index: false }` and `alternates.canonical` pointing to the stronger page.
- Log the redirect in `docs/SEO-REDIRECT-MAP.json`.
- Implement a `301` in `next.config.js` redirects array.

---

### RULE 3 — Content Volume Is NOT a Goal

Do not create content to hit page counts, word counts, or article quotas.
Google explicitly warns against large amounts of content primarily for search engines.

Content creation is only authorized when:
- There is genuine, measurable search demand for that specific intent
- The page provides unique value that does NOT exist on any existing Nobevra page
- The content completely satisfies the user's task (not a word-count target)

Write until the user's task is completely satisfied — not until a word-count target is reached.

---

### RULE 4 — Template Pages: Unique Value Required

Do not produce template or industry pages that are 90% identical to each other.

Each template/industry/country page must provide:
- Industry-specific invoice fields unique to that vertical
- Tax or regulatory considerations specific to that use case
- An immediately usable generator or downloadable asset
- Original examples that differ substantively from other template pages

If a template page cannot meet these criteria, do not create it.

---

### RULE 5 — Tier Priority for All SEO Work

All SEO work must prioritize tiers in order:

**Tier 1 — Core Commercial Authority (Fix/Strengthen First)**
`/` · `/business-management-software` · `/invoicing` · `/crm` · `/expense-management`
`/products-inventory` · `/payments` · `/digital-business-card` · `/ai-business-assistant`
`/client-contracts` · `/recurring-billing-software` · `/client-portal-software` · `/cash-flow-analytics`

**Tier 2 — PLG Acquisition Tools (Must Work as Real Tools)**
`/free-invoice-generator` · `/ai-receipt-scanner` · `/qr-code-generator`
Tool pages must satisfy the user's intent immediately — not merely describe the tool.

**Tier 3 — Persona / Solution Pages (Differentiated Workflow Required)**
`/solutions/simple-invoicing-for-freelancers` · `/solutions/agency-billing-platform`
`/solutions/best-small-business-invoicing-software` · `/solutions/ecommerce-invoice-automation`
`/solutions/enterprise-billing-platform`
Each must show exactly how that persona uses Nobevra, not generic benefit statements.

**Tier 4 — Educational Content (Cluster-Based Only)**
Build authoritative topic clusters. Connect all supporting content back to a Tier 1 pillar.
Never publish educational content as isolated, unlinked pages.

---

### RULE 6 — Technical Validation Per Page

Every new or modified public page must have ALL of the following in the **server-rendered HTML** (not just after JS executes):

- `<title>` tag
- `<link rel="canonical">`
- `<h1>` (exactly one)
- Primary body content
- Navigation links
- Internal links to at least 2 related pages
- Important above-fold images with `alt` text
- `<script type="application/ld+json">` structured data (where applicable)

Verify using: `curl -s <url> | grep -E "<title>|canonical|<h1>"`

---

### RULE 7 — Structured Data: Use Only Where Genuine

Authorized structured data types for Nobevra:
- `Organization` · `WebSite` · `BreadcrumbList` — on all pages
- `SoftwareApplication` — only on actual software feature/product pages
- `FAQPage` — only where real FAQ sections are visible on the page
- `HowTo` — only where a real numbered step-by-step guide exists
- `Article` / `BlogPosting` — only on blog articles
- `PriceSpecification` · `Offer` — only on `/pricing`
- `Service` — on `/solutions/*` persona pages
- `ItemList` — on hub/index pages listing genuine child pages

**Never:**
- Manufacture `AggregateRating` or `Review` data that isn't real
- Mark content invisible to users but visible in schema
- Create FAQPage schema for questions not shown on the page
- Add irrelevant schema type to boost appearance

Google's documentation states: misleading or non-visible structured data can cause manual actions.

---

### RULE 8 — Sitemap Governance

`web-app/src/app/sitemap.ts` is the canonical sitemap source.
Rules:
- Add a page to the sitemap ONLY if it is `index: true` (or has no robots override) and serves genuine public value
- `noindex` pages must NEVER appear in the sitemap
- Auth pages (`/login`, `/register`, `/forgot-password`, `/reset-password`, `/logout`) must NOT be in the sitemap
- Admin, API, dashboard, and app routes must remain in the `disallowList` in `robots.ts`
- After any page is newly enabled for indexing, add it to `sitemap.ts` immediately
- `/pitch` and internal staging pages must remain at `priority: 0.40` or lower
- Priority values: Homepage=1.0 · Tier1=0.90–0.95 · Tier2=0.85–0.90 · Tier3=0.80–0.85 · Tier4=0.65–0.75 · Legal=0.50 · Auth=not in sitemap

---

### RULE 9 — Internal Linking Is Mandatory

Every new page must receive at least 3 inbound internal links from existing pages before it can be considered properly published.

All new pages must link outward to:
- Their concept pillar page (Tier 1 owner)
- At least 1 related tool or guide
- The `/pricing` conversion page (via CTA)

Consult `docs/SEO-INTERNAL-LINK-MAP.md` before and after creating any page.
Update the orphan watchlist in that file if a page has fewer than 3 inbound links.

---

### RULE 10 — URL Stability

Once a URL is published and indexed, it must not change without:
1. Logging the migration in `docs/SEO-REDIRECT-MAP.json`
2. Implementing a one-hop 301/308 in `next.config.js`
3. Updating all internal links
4. Updating `sitemap.ts`
5. Submitting updated sitemap in Google Search Console

**There are no exceptions.** URL changes without this process cause permanent loss of accumulated authority.

---

### RULE 11 — Launch Gate Requirements

Nobevra sitemap may only be submitted to Google Search Console when all of the following are true:

**Technical Gate:**
- [ ] All Tier 1 pages return HTTP 200
- [ ] All Tier 1 pages have `<title>`, `<meta name="description">`, `<link rel="canonical">`, OG, Twitter card
- [ ] Zero accidental `noindex` on any Tier 1 or Tier 2 page
- [ ] Zero redirect chains (max 1 hop)
- [ ] No broken internal links on Tier 1 pages
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] Build passes with 0 TypeScript errors (`npm run build`)

**Content Gate:**
- [ ] Each Tier 1 page has correct primary intent (not cannibalizing a sibling)
- [ ] Each Tier 2 tool works as an actual tool (not just a landing page)
- [ ] Each Tier 3 solution page contains a real differentiated workflow

**Architecture Gate:**
- [ ] No Tier 1 page is an orphan (has ≥ 3 inbound internal links)
- [ ] No two pages share the same primary concept owner in `SEO-KEYWORD-OWNERSHIP.json`
- [ ] No active redirect chains

**Trust Gate:**
- [ ] `/free-invoice-maker-app-about` — company identity clear
- [ ] `/pricing` — transparent plan pricing visible
- [ ] `/privacy`, `/terms`, `/security`, `/compliance` — all accessible from footer

---

### RULE 12 — The Correct Launch Sequence

Enforce this sequence. Do not skip steps.

```
BUILD
  ↓
FORENSIC SEO AUDIT (check all docs/ source-of-truth files)
  ↓
KEYWORD OWNERSHIP VERIFICATION (docs/SEO-KEYWORD-OWNERSHIP.json)
  ↓
CONTENT GAP ANALYSIS (docs/SEO-CONTENT-MAP.json)
  ↓
IMPLEMENTATION
  ↓
TECHNICAL VALIDATION (Rule 6 checklist per page)
  ↓
CONTENT QUALITY GATE (Rule 11)
  ↓
npm run build — must pass 0 errors
  ↓
SITEMAP VALIDATION (verify /sitemap.xml is correct)
  ↓
GOOGLE SEARCH CONSOLE — verify property, add sitemap
  ↓
SUBMIT SITEMAP
  ↓
REQUEST INDEXING for all Tier 1 and Tier 2 pages via URL Inspection
  ↓
MONITOR (wait 7–14 days for GSC data)
  ↓
ITERATE from real GSC impression + click data
```

---

### RULE 13 — No Guarantee of Ranking

No SEO task, no matter how well executed, guarantees ranking position or indexing timeline.
Google's own documentation explicitly states there are no secrets that automatically rank a site first, and Google does not guarantee indexing.

The goal is: engineer Nobevra so that from the moment Google discovers it, there are as few technical, content-quality, architecture, and topical-authority weaknesses as possible. Then use real Search Console data to close remaining gaps systematically.

Never promise specific ranking outcomes to stakeholders.

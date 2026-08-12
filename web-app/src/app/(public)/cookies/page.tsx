"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import {
  Cookie, ShieldCheck, BarChart3, Settings, X, Globe, Eye, Lock,
} from "lucide-react";

const CATEGORIES = [
  {
    title: "Overview",
    sections: [
      { id: "1-what-are-cookies", label: "What Are Cookies?", icon: Cookie },
      { id: "2-how-we-use-cookies", label: "How We Use Cookies", icon: ShieldCheck },
    ],
  },
  {
    title: "Cookie Types",
    sections: [
      { id: "3-strictly-necessary-cookies", label: "Strictly Necessary", icon: Lock },
      { id: "4-authentication-and-session", label: "Authentication & Session", icon: Lock },
      { id: "5-preference-cookies", label: "Preference Cookies", icon: Settings },
      { id: "6-analytics-cookies", label: "Analytics Cookies", icon: BarChart3 },
      { id: "7-marketing-cookies", label: "Marketing Cookies", icon: Globe },
      { id: "8-third-party-cookies", label: "Third-Party Cookies", icon: Globe },
    ],
  },
  {
    title: "Duration & Control",
    sections: [
      { id: "9-cookie-duration", label: "Cookie Duration", icon: Eye },
      { id: "10-consent", label: "Consent", icon: ShieldCheck },
      { id: "11-withdrawing-consent", label: "Withdrawing Consent", icon: X },
      { id: "12-browser-controls", label: "Browser Controls", icon: Settings },
    ],
  },
  {
    title: "Further Information",
    sections: [
      { id: "13-do-not-track", label: "Do Not Track", icon: Eye },
      { id: "14-changes-to-this-policy", label: "Policy Changes", icon: ShieldCheck },
      { id: "15-contact-us", label: "Contact Us", icon: ShieldCheck },
    ],
  },
];

const content = `
### 1. WHAT ARE COOKIES?

Cookies are small text files placed on your device by a website when you visit it. They are widely used to make websites work more efficiently, to remember your preferences, and to provide analytics information to site owners.

Cookies can be set by the website you are visiting ("first-party cookies") or by third-party services running content on that page ("third-party cookies"). Cookies may be stored for the duration of your browser session only ("session cookies") or for longer periods ("persistent cookies").

Similar technologies — including local storage, session storage, pixel tags, and device fingerprinting — may perform comparable functions. References to "cookies" in this policy include these similar technologies unless the context requires otherwise.

---

### 2. HOW WE USE COOKIES

NobleInvoice uses cookies and similar technologies to:

* Keep you signed in to your Account across page loads and browser sessions.
* Remember your preferences (currency, language, dark/light mode, cookie consent choice).
* Protect the platform against cross-site request forgery (CSRF) and session-hijacking attacks.
* Analyse how the Service is used so we can improve it (Google Analytics 4, consent-gated only).
* Detect fraud and abuse patterns.
* Ensure platform stability and performance.

We do **not** use cookies to serve third-party advertising or sell your browsing behaviour to data brokers.

---

### 3. STRICTLY NECESSARY COOKIES

Strictly necessary cookies are essential for NobleInvoice to function. They cannot be disabled. No consent is required for these cookies because they are necessary to provide the service you have requested.

| Cookie / Technology | Purpose | Duration |
|---|---|---|
| Supabase Auth session token | Maintains your authenticated session so you stay logged in | Session / up to 1 year |
| CSRF protection token | Prevents cross-site request forgery attacks | Session |
| cookie_consent | Stores your cookie consent choice | 1 year |
| sb-access-token / sb-refresh-token | JWT access and refresh tokens for API authentication | Session / rotating |

These cookies are set by NobleInvoice's infrastructure (Supabase, hosted on AWS us-east-1) and are strictly limited to operating the authentication system.

---

### 4. AUTHENTICATION AND SESSION

When you sign in to NobleInvoice — whether via email and password or Google Sign-In (OAuth) — authentication tokens are issued by Supabase Auth and stored in your browser.

* **JWT Access Token** — a short-lived token (typically 1 hour) used to authenticate API requests.
* **JWT Refresh Token** — a longer-lived token used to issue new access tokens without requiring you to log in again.

On mobile, these tokens are stored in **flutter_secure_storage** (iOS Keychain / Android EncryptedSharedPreferences) rather than a browser cookie.

Session tokens are transmitted only over HTTPS and are not accessible to third-party JavaScript running on the page.

If you sign out, your session token is immediately invalidated server-side.

---

### 5. PREFERENCE COOKIES

Preference cookies remember your settings and choices to personalise your experience. These are set by NobleInvoice's own systems.

| Cookie / Technology | Purpose | Duration |
|---|---|---|
| currency_preference | Remembers your selected invoice currency | 1 year |
| locale_preference | Remembers your language/locale setting | 1 year |
| theme_preference | Remembers light/dark mode selection | 1 year |
| sidebar_state | Remembers whether sidebar menus are open or collapsed | Session |

These cookies do not track you across other websites.

---

### 6. ANALYTICS COOKIES

NobleInvoice uses **Google Analytics 4 (GA4)** to understand how visitors use the public website. GA4 is **only loaded after you explicitly accept analytics cookies** via the cookie consent banner. GA4 is never loaded for visitors who decline or have not yet made a consent choice.

| Provider | Cookie | Purpose | Duration |
|---|---|---|---|
| Google Analytics 4 | _ga | Distinguishes unique users | 2 years |
| Google Analytics 4 | _ga_6ME42JV7BJ | Maintains session state for this property | 2 years |
| Google Analytics 4 | _gid | Distinguishes users over 24-hour periods | 24 hours |
| Google Analytics 4 | _gat | Throttles request rate | 1 minute |

**Measurement ID:** G-6ME42JV7BJ

**Data collected by GA4 (when consent is given):** anonymised page views, user interactions, device type, browser type, operating system, approximate country-level location (not city-level), and referral source.

**IP anonymisation:** IP address truncation is enabled. Full IP addresses are not stored by Google Analytics in connection with NobleInvoice analytics data.

**Data processor:** Google LLC. Google's Privacy Policy: [https://policies.google.com/privacy](https://policies.google.com/privacy)

You may also opt out of GA4 across all websites using the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout).

---

### 7. MARKETING COOKIES

NobleInvoice does **not** currently use cookies for advertising, retargeting, or behavioural marketing. We do not place advertising pixels or partner with ad networks that set tracking cookies on our website.

If this changes, we will update this Cookie Policy and obtain appropriate consent before deploying any marketing cookies.

---

### 8. THIRD-PARTY COOKIES

Some features of NobleInvoice involve third-party services that may set their own cookies or use similar technologies.

| Third-Party Service | Why It May Set Cookies | Their Privacy Policy |
|---|---|---|
| Google (OAuth / Sign-In) | Authentication via Google Sign-In | [policies.google.com/privacy](https://policies.google.com/privacy) |
| Flutterwave | Payment processing and fraud detection during checkout | [flutterwave.com/us/privacy-policy](https://flutterwave.com/us/privacy-policy) |
| Supabase | Database, authentication and API infrastructure | [supabase.com/privacy](https://supabase.com/privacy) |
| Vercel | Web hosting, edge delivery and performance | [vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy) |

NobleInvoice does not control third-party cookies. Their use is governed by the respective provider's own privacy and cookie policies.

---

### 9. COOKIE DURATION

Cookies on NobleInvoice fall into two duration categories:

**Session cookies** — deleted automatically when you close your browser. Used for CSRF tokens, short-lived authentication tokens, and temporary UI state.

**Persistent cookies** — remain on your device for a defined period or until you delete them. Used for preference storage, consent records, and (when consented) analytics. Persistent cookies on NobleInvoice typically expire between 24 hours and 2 years, as detailed in the tables above.

---

### 10. CONSENT

When you first visit the NobleInvoice website, a cookie consent banner is displayed. The banner offers the following choices:

* **Accept All** — enables strictly necessary cookies and Google Analytics 4.
* **Reject / Necessary Only** — enables only strictly necessary cookies. GA4 is not loaded.
* **Customise** — allows granular control over individual cookie categories.

Your consent choice is stored in a first-party cookie named **cookie_consent** for up to 1 year so you are not asked again on each visit.

In-app cookies (authentication, preferences) are set when you create an Account and log in; consent for strictly necessary in-app cookies is governed by your acceptance of the Terms of Service.

---

### 11. WITHDRAWING CONSENT

You may withdraw or change your analytics cookie consent at any time:

* **Website:** Click the "Cookie Settings" link in the website footer to re-open the consent banner.
* **Browser:** Delete existing cookies and reload the page — the consent banner will re-appear.
* **Google Analytics opt-out:** Install the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout).

Withdrawing consent does not affect the lawfulness of processing that took place before withdrawal. Strictly necessary cookies cannot be disabled via the consent mechanism because they are required for the platform to operate.

---

### 12. BROWSER CONTROLS

All major browsers provide built-in controls to manage cookies:

* **Google Chrome:** Settings → Privacy and Security → Cookies and other site data
* **Mozilla Firefox:** Preferences → Privacy & Security → Cookies and Site Data
* **Safari:** Preferences → Privacy → Manage Website Data
* **Microsoft Edge:** Settings → Privacy, search, and services → Cookies

You may block all cookies through browser settings. Be aware that blocking strictly necessary cookies will prevent you from signing in to your NobleInvoice account, and some platform features will not function correctly.

You may also use browser extensions such as Privacy Badger, uBlock Origin, or similar tools to manage third-party tracking.

**Mobile browsers:** similar settings are available under the privacy or site settings section of your mobile browser preferences.

---

### 13. DO NOT TRACK

Some browsers include a "Do Not Track" (DNT) signal. NobleInvoice currently does not alter its data-collection practices in response to DNT signals because no universally accepted standard for DNT has been adopted. We apply our standard consent-based analytics approach regardless of DNT signals. You may use the consent banner or browser controls described above to limit analytics cookies.

---

### 14. CHANGES TO THIS POLICY

We may update this Cookie Policy from time to time as our use of cookies changes or as legal or regulatory requirements evolve. When we make material changes, we will update the "Last Updated" date at the top of this page and, where appropriate, notify you via the consent banner or in-app notification.

We encourage you to review this policy periodically.

---

### 15. CONTACT US

If you have questions about our use of cookies or wish to exercise a data-subject right relating to data processed via cookies, please contact:

**NobleInvoice Data Protection Officer**  
Email: **privacy@noblesworld.com.ng**  
General: invoice@noblesworld.com.ng

For further information about your data-protection rights, you may also contact the **Nigeria Data Protection Commission (NDPC)** at [ndpc.gov.ng](https://ndpc.gov.ng) or your local data-protection supervisory authority.
`;

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      description="This policy explains how NobleInvoice uses cookies and similar technologies on our website and applications, what choices you have, and how to control them."
      categories={CATEGORIES}
    >
      <div className="prose prose-slate prose-a:text-blue-600 prose-headings:text-slate-900 max-w-none prose-h3:text-2xl prose-h3:font-black prose-h3:mt-12 prose-h3:scroll-mt-24 prose-table:text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
          {content}
        </ReactMarkdown>
      </div>
    </LegalLayout>
  );
}

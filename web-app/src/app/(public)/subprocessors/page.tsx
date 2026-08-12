"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { Globe, Database, ShieldCheck, Cpu, CreditCard, Mail, FileText } from "lucide-react";

const CATEGORIES = [
  {
    title: "Overview",
    sections: [
      { id: "1-about-this-list", label: "About This List", icon: FileText },
      { id: "2-how-we-use-subprocessors", label: "How We Use Subprocessors", icon: ShieldCheck },
    ],
  },
  {
    title: "Subprocessors by Category",
    sections: [
      { id: "3-infrastructure-and-hosting", label: "Infrastructure & Hosting", icon: Database },
      { id: "4-authentication", label: "Authentication", icon: ShieldCheck },
      { id: "5-payments", label: "Payments", icon: CreditCard },
      { id: "6-ai-and-machine-learning", label: "AI & Machine Learning", icon: Cpu },
      { id: "7-email-and-communications", label: "Email & Communications", icon: Mail },
      { id: "8-analytics", label: "Analytics", icon: Globe },
      { id: "9-geolocation", label: "Geolocation", icon: Globe },
      { id: "10-social-integrations", label: "Social Integrations", icon: Globe },
      { id: "11-contact-and-forms", label: "Contact & Forms", icon: Mail },
      { id: "12-mobile-push-notifications", label: "Push Notifications", icon: ShieldCheck },
    ],
  },
  {
    title: "Policy",
    sections: [
      { id: "13-data-transfer-mechanisms", label: "Data Transfers", icon: Globe },
      { id: "14-changes-to-subprocessors", label: "Changes", icon: FileText },
      { id: "15-contact", label: "Contact", icon: FileText },
    ],
  },
];

const content = `
### 1. ABOUT THIS LIST

This Subprocessor List identifies the third-party companies ("subprocessors") that NobleInvoice engages to process personal data on behalf of users of the NobleInvoice platform.

A **subprocessor** is a third-party service provider that may receive, store, or otherwise process personal data in the course of providing services to NobleInvoice. This list is maintained in accordance with Article 28 of the GDPR, applicable UK GDPR requirements, and the Nigeria Data Protection Act 2023 (NDPA).

**Effective Date:** August 8, 2026  
**Operated by:** The Noble's Technology Service (CAC-registered, Lagos, Nigeria)

This list reflects the verified, current production state of the NobleInvoice platform. We update it when subprocessors change.

---

### 2. HOW WE USE SUBPROCESSORS

All subprocessors listed here are:

* Engaged pursuant to a written contract that includes appropriate data-protection obligations.
* Permitted to process personal data only for the stated purpose and not for their own independent commercial purposes (except where they are independent controllers, as noted).
* Subject to technical and organizational security requirements appropriate to the nature of the data they process.

Where a subprocessor is located outside Nigeria and/or the EEA, we rely on appropriate transfer mechanisms including contractual arrangements, Standard Contractual Clauses (SCCs), or adequacy determinations where applicable.

---

### 3. INFRASTRUCTURE AND HOSTING

| Subprocessor | Role | Data Processed | Location | Website |
|---|---|---|---|---|
| **Supabase, Inc.** | Database (PostgreSQL), Authentication, File Storage, Edge Functions | Account data, invoices, client records, financial data, file uploads, auth tokens | United States (AWS us-east-1) | supabase.com |
| **Vercel, Inc.** | Web application hosting, edge delivery, serverless functions | Request logs, IP addresses (transient), web app traffic | United States + global edge | vercel.com |

Supabase and Vercel both operate on AWS infrastructure. Physical and environmental security is governed by AWS's certifications (SOC 2, ISO 27001, PCI DSS).

---

### 4. AUTHENTICATION

| Subprocessor | Role | Data Processed | Location | Notes |
|---|---|---|---|---|
| **Google LLC** (OAuth) | Sign in with Google | Google account identity (name, email, profile picture), OAuth tokens | United States | Independent controller for Google-side processing; acts as processor for token exchange |
| **LinkedIn Corporation** | LinkedIn Sign-In and social publishing (if connected) | LinkedIn OAuth access token, profile data used for authentication | United States | Only processed if you connect LinkedIn to your account |
| **Supabase Auth** | Email/password authentication, session management | Email, hashed password, session tokens, refresh tokens | United States | See Infrastructure row above |

---

### 5. PAYMENTS

| Subprocessor | Role | Data Processed | Location | Notes |
|---|---|---|---|---|
| **Flutterwave Technology Solutions Ltd** | Payment processing, card tokenization, subscription billing, payouts | Billing details, card tokens (last 4 digits, brand, expiry — not full card numbers), transaction records, bank account details for payouts | Nigeria + United States | Primary payment processor; PCI DSS compliant |

NobleInvoice does not store raw card numbers. Full cardholder data is processed only within Flutterwave's PCI DSS-compliant environment and never transits NobleInvoice servers.

---

### 6. AI AND MACHINE LEARNING

| Subprocessor | Role | Data Processed | Location | Notes |
|---|---|---|---|---|
| **Google LLC** (Gemini API) | AI assistant, voice invoice generation, receipt OCR, report insights | Message content (AI assistant), voice transcription, receipt images, aggregated financial metrics | United States | Per Google API terms: submitted data is not used to train general-purpose AI models |

NobleInvoice does not use Groq, OpenAI, Anthropic, or any other AI provider in its current production environment.

---

### 7. EMAIL AND COMMUNICATIONS

| Subprocessor | Role | Data Processed | Location | Notes |
|---|---|---|---|---|
| **Self-hosted SMTP** (mail.noblesworld.com.ng) | Transactional email delivery (invoice emails, reminders, account notifications) | Client name, client email address, invoice details, account notification content | Nigeria | Operated by The Noble's Technology Service |

---

### 8. ANALYTICS

| Subprocessor | Role | Data Processed | Location | Notes |
|---|---|---|---|---|
| **Google LLC** (Google Analytics 4) | Web analytics on public website | Anonymised page views, user interactions, device/browser type, approximate country-level location, referral source | United States | **Consent-gated only** — GA4 is loaded only after explicit user consent via cookie banner. IP anonymisation enabled. Measurement ID: G-6ME42JV7BJ |

GA4 is not loaded for users who have not consented or who have rejected analytics cookies.

---

### 9. GEOLOCATION

| Subprocessor | Role | Data Processed | Location | Notes |
|---|---|---|---|---|
| **ip-api.com** | IP geolocation — mobile app currency detection | Raw IP address of mobile device | European Union | IP is sent to detect country for automatic currency selection on the mobile app. HTTPS only. |
| **ipapi.co** | IP geolocation — web app currency detection (via server proxy) | Raw IP address of web visitor | United States | IP is proxied through a Next.js API route and sent to ipapi.co to detect country for currency selection. |

Both services receive the user's IP address for the sole purpose of determining the user's country to pre-select an appropriate invoice currency. IP addresses are not stored by NobleInvoice beyond the API response.

---

### 10. SOCIAL INTEGRATIONS

| Subprocessor | Role | Data Processed | Location | Notes |
|---|---|---|---|---|
| **LinkedIn Corporation** | Social media publishing (if connected) | LinkedIn OAuth access token, post content and media | United States | Only processed if you connect your LinkedIn account and use the social publishing feature |
| **Twitter/X Corp** | Social media publishing (if connected) | Post content | United States | Only processed if you connect your Twitter/X account and use the social publishing feature |

Social integrations are entirely optional. Connecting and disconnecting social accounts is controlled from your account settings.

---

### 11. CONTACT AND FORMS

| Subprocessor | Role | Data Processed | Location | Notes |
|---|---|---|---|---|
| **FormSubmit.co** | Contact form handling on public website | Name, email address, message content from contact form submissions | United States | Contact form submissions on the public website are delivered to our inbox via FormSubmit. This service acts as an independent controller for form delivery. |

---

### 12. MOBILE PUSH NOTIFICATIONS

| Subprocessor | Role | Data Processed | Location | Notes |
|---|---|---|---|---|
| **Google LLC** (Firebase Cloud Messaging / FCM) | Mobile push notification delivery | FCM device token (associated with your user account), notification payload | United States | FCM device tokens are stored in the NobleInvoice database and used to deliver platform notifications to your mobile device. |

FCM tokens are rotated on device re-registration and removed on sign-out.

---

### 13. DATA TRANSFER MECHANISMS

NobleInvoice's primary infrastructure (Supabase) and most subprocessors are located in the United States. For users in the EEA, UK, or other jurisdictions with data-export restrictions, transfers are made pursuant to:

* **Standard Contractual Clauses (SCCs)** — where Google LLC, Vercel, or other US-based processors have incorporated EU SCCs into their data processing terms.
* **Contractual arrangements** — with Nigerian-based subprocessors, including data-protection obligations consistent with NDPA requirements.
* **Adequacy or appropriate safeguards** — applied as available and applicable.

Enterprise customers requiring specific data-transfer documentation (e.g., a signed DPA with SCCs) should contact **legal@noblesworld.com.ng**.

---

### 14. CHANGES TO SUBPROCESSORS

NobleInvoice will update this list when we:

* Engage a new subprocessor.
* Terminate a subprocessor relationship.
* Change a subprocessor's location or role in material ways.

**Notification:** We aim to provide at least 14 days' notice before adding a new subprocessor that will process personal data, by updating this page and, for enterprise customers with an active DPA, by email notification. Users who object to a new subprocessor may terminate their subscription in accordance with the Terms of Service.

---

### 15. CONTACT

For questions about subprocessors, data transfers, or to exercise data-subject rights:

**Data Protection Officer:** privacy@noblesworld.com.ng  
**Legal / DPA inquiries:** legal@noblesworld.com.ng  
**General support:** invoice@noblesworld.com.ng
`;

export default function SubprocessorsPage() {
  return (
    <LegalLayout
      title="Subprocessor List"
      description="A complete, verified list of third-party companies that process personal data on behalf of NobleInvoice users. Updated when subprocessors change."
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

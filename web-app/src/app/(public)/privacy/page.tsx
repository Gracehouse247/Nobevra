"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { privacyPolicyMarkdown } from "./policy";
import {
  ShieldCheck,
  Users,
  Database,
  Cpu,
  BarChart3,
  Cookie,
  Globe,
  FileText,
  Eye,
  AlertCircle,
  CheckCircle2,
  Mail,
  ExternalLink,
} from "lucide-react";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { SectionHeading, InfoCard, CheckList, CountryBadge } from "@/components/shared/Legal/LegalUI";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA — all sections of the Privacy Policy, structured for the UI
───────────────────────────────────────────────────────────────────────────── */

const CATEGORIES = [
  {
    title: "General",
    sections: [
      { id: "introduction", label: "Introduction", icon: ShieldCheck },
      { id: "controller", label: "Who Controls Your Data", icon: Users },
      { id: "what-we-collect", label: "What We Collect", icon: Database },
    ]
  },
  {
    title: "Features & Analytics",
    sections: [
      { id: "ai-features", label: "AI Features", icon: Cpu },
      { id: "qr-analytics", label: "QR & Analytics", icon: BarChart3 },
      { id: "cookies-tracking", label: "Cookies & Tracking", icon: Cookie },
    ]
  },
  {
    title: "Data Sharing",
    sections: [
      { id: "sharing-providers", label: "Sharing & Providers", icon: Globe },
      { id: "subprocessors", label: "Subprocessors", icon: FileText },
    ]
  },
  {
    title: "Rights & Security",
    sections: [
      { id: "rights", label: "Your Rights", icon: Eye },
      { id: "security", label: "Security & Contact", icon: AlertCircle },
      { id: "full-legal-text", label: "Full Legal Text", icon: FileText },
    ]
  }
];

// Flatten for scroll spy logic
const SECTIONS = CATEGORIES.flatMap(c => c.sections);

/* ─────────────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────────── */



function ProcessorTable() {
  const rows = [
    { provider: "Supabase", country: "US", purpose: "Database, Auth, Storage, Edge Functions", data: "Account data, invoices, client records" },
    { provider: "Vercel", country: "US", purpose: "Web hosting & edge delivery", data: "Request logs, IP addresses" },
    { provider: "Google Gemini API", country: "US", purpose: "AI assistant, receipt OCR, report insights", data: "Receipt images, financial metrics, messages" },
    { provider: "Google Analytics 4", country: "US", purpose: "Web analytics (consent-gated only)", data: "Anonymized usage data, IP (anonymized)" },
    { provider: "Google OAuth / FCM", country: "US", purpose: "Sign in with Google, push notifications", data: "Google account identity, FCM device tokens" },
    { provider: "Flutterwave", country: "Nigeria", purpose: "Payment processing, card tokenization, payouts", data: "Billing details, card tokens, transaction records" },
    { provider: "LinkedIn API", country: "US", purpose: "Social media posting (if connected)", data: "LinkedIn OAuth access token, post content" },
    { provider: "Twitter / X API", country: "US", purpose: "Social media posting (if connected)", data: "Post content" },
    { provider: "Self-hosted SMTP", country: "Nigeria", purpose: "Transactional email delivery", data: "Client name, email, invoice details" },
    { provider: "ip-api.com", country: "EU", purpose: "IP geolocation (mobile — currency detection)", data: "IP address" },
    { provider: "ipapi.co", country: "US", purpose: "IP geolocation (web — currency detection)", data: "IP address" },
    { provider: "FormSubmit.co", country: "US", purpose: "Contact form handling", data: "Name, email, message" },
  ];

  return (
    <div className="rounded-2xl border overflow-hidden mt-4" style={{ borderColor: "#b9cacb" }}>
      <div className="overflow-x-auto">
        <table className="w-full text-lg">
          <thead>
            <tr style={{ background: "#0A1628", color: "rgba(255,255,255,0.85)" }}>
              <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider">Provider</th>
              <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider">Region</th>
              <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider">Purpose</th>
              <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wider hidden md:table-cell">Personal Data</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t transition-colors hover:bg-slate-50"
                style={{ borderColor: "#f1f5f9" }}>
                <td className="px-4 py-3 font-bold" style={{ color: "#050B1A" }}>{row.provider}</td>
                <td className="px-4 py-3"><CountryBadge country={row.country} /></td>
                <td className="px-4 py-3" style={{ color: "#3b494b" }}>{row.purpose}</td>
                <td className="px-4 py-3 hidden md:table-cell text-base" style={{ color: "#64748b" }}>{row.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RightsGrid() {
  const rights = [
    { title: "Right to Know", desc: "Know what personal data we hold about you" },
    { title: "Right to Access", desc: "Request a copy of your personal data" },
    { title: "Right to Correct", desc: "Fix inaccurate or incomplete data" },
    { title: "Right to Delete", desc: "Request deletion of your account and data" },
    { title: "Right to Portability", desc: "Export your data in a usable format" },
    { title: "Right to Object", desc: "Object to certain types of processing" },
    { title: "Right to Restrict", desc: "Limit how we use your data" },
    { title: "Right to Complain", desc: "Lodge a complaint with a supervisory authority" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {rights.map((r, i) => (
        <div key={i} className="rounded-xl border p-4 transition-shadow hover:shadow-md"
          style={{ borderColor: "#e2e8f0", background: "#fafcff" }}>
          <div className="font-bold text-lg mb-1" style={{ color: "#050B1A" }}>{r.title}</div>
          <div className="text-lg" style={{ color: "#64748b" }}>{r.desc}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION CONTENT COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

function SectionIntroduction() {
  return (
    <section id="introduction" className="privacy-section mb-12 scroll-mt-6">
      <SectionHeading id="introduction-h" number="01" icon={ShieldCheck}>Introduction</SectionHeading>
      <p className="text-lg leading-8 mb-4" style={{ color: "#3b494b" }}>
        NobleInvoice is a cross-platform business productivity and financial management platform operated by{" "}
        <strong style={{ color: "#050B1A" }}>The Noble's Technology Service</strong>, a company registered with the
        Corporate Affairs Commission (CAC) in Nigeria.
      </p>
      <InfoCard icon={CheckCircle2} title="Our Privacy Commitment" accent="#006970">
        NobleInvoice does not sell your personal information. We do not make money by showing you third-party advertisements.
        We collect only what we need to provide the service you requested.
      </InfoCard>
      <p className="text-lg leading-8 mb-4" style={{ color: "#3b494b" }}>
        This Privacy Policy applies whenever you visit our website, create an account, use our web or mobile applications,
        interact with our AI features, scan a QR code, or contact us.
      </p>
      <div className="rounded-2xl p-5 text-lg" style={{ background: "#f0fdf4", borderLeft: "3px solid #006970" }}>
        <strong className="font-bold" style={{ color: "#006970" }}>Applicable law baseline:</strong>
        <span style={{ color: "#3b494b" }}> Nigeria Data Protection Act 2023 (NDPA) · GDPR / UK GDPR · California Privacy Law (CCPA/CPRA)</span>
      </div>
    </section>
  );
}

function SectionController() {
  return (
    <section id="controller" className="privacy-section mb-12 scroll-mt-6">
      <SectionHeading id="controller-h" number="02" icon={Users}>Who Controls Your Data</SectionHeading>
      <div className="rounded-2xl border p-5 mb-5" style={{ borderColor: "#b9cacb" }}>
        <div className="font-black text-base mb-1" style={{ color: "#050B1A" }}>The Noble's Technology Service</div>
        <div className="text-sm" style={{ color: "#64748b" }}>CAC-Registered · Lagos, Nigeria</div>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href="mailto:privacy@noblesworld.com.ng"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
            style={{ background: "#EFF6FF", color: "#0599D5" }}>
            <Mail className="w-3 h-3" /> privacy@noblesworld.com.ng
          </a>
          <a href="mailto:invoice@noblesworld.com.ng"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: "#F3F4F6", color: "#374151" }}>
            <Mail className="w-3 h-3" /> invoice@noblesworld.com.ng
          </a>
        </div>
      </div>
      <InfoCard icon={AlertCircle} title="Controller vs. Processor" accent="#0599D5">
        <strong>When you use NobleInvoice as a business</strong> and store your own customers' data (names, emails,
        invoices), you are the <strong>data controller</strong> for that data — and NobleInvoice acts as your{" "}
        <strong>data processor</strong>. You are responsible for providing appropriate privacy notices to your customers.
      </InfoCard>
    </section>
  );
}

function SectionWhatWeCollect() {
  const accountData = ["Full name & username", "Email address & phone number", "Country & language preference", "Profile photograph", "Password (hashed — never stored in plain text)"];
  const businessData = ["Business name, address & tax details", "Logo, brand colors & invoice preferences", "Team workspace & role information", "API keys (hashed)", "Custom domain configuration"];
  const technicalData = ["IP address & approximate location", "Device type & operating system", "Browser & app version", "Session tokens (encrypted on device)", "Crash & performance data"];
  const financialData = ["Invoice amounts, line items & currencies", "Payment status & transaction references", "Card token (last 4 digits, brand, expiry — no full card numbers)", "Payout bank account details", "Wallet balance & transaction history"];

  return (
    <section id="what-we-collect" className="privacy-section mb-12 scroll-mt-6">
      <SectionHeading id="what-we-collect-h" number="03" icon={Database}>What We Collect</SectionHeading>
      <p className="text-lg leading-8 mb-5" style={{ color: "#3b494b" }}>
        We collect different categories of information depending on how you use NobleInvoice. Here is a transparent
        breakdown of every category.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: "Account & Identity", items: accountData, accent: "#0599D5" },
          { title: "Business & Workspace", items: businessData, accent: "#006970" },
          { title: "Technical & Device", items: technicalData, accent: "#7C3AED" },
          { title: "Financial & Payment", items: financialData, accent: "#DC2626" },
        ].map(({ title, items, accent }) => (
          <div key={title} className="rounded-2xl border p-5" style={{ borderColor: `${accent}22`, background: `${accent}06` }}>
            <div className="font-bold text-lg mb-3" style={{ color: accent }}>{title}</div>
            <CheckList items={items} />
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border p-4 text-sm" style={{ borderColor: "#FEE2E2", background: "#FFF7F7" }}>
        <strong style={{ color: "#DC2626" }}>Client CRM data (processor role):</strong>
        <span style={{ color: "#3b494b" }}> If you store your clients' personal information inside NobleInvoice (names, emails, invoices), you
          remain the controller of that data. NobleInvoice processes it on your instructions to provide the service.</span>
      </div>
    </section>
  );
}

function SectionAI() {
  return (
    <section id="ai-features" className="privacy-section mb-12 scroll-mt-6">
      <SectionHeading id="ai-features-h" number="04" icon={Cpu}>AI Features</SectionHeading>
      <p className="text-lg leading-8 mb-4" style={{ color: "#3b494b" }}>
        NobleInvoice uses AI to power the AI assistant, receipt/OCR scanning, and report insights.
        All AI features use <strong style={{ color: "#050B1A" }}>Google Gemini</strong> (via the Generative Language API).
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {[
          { title: "AI Assistant", data: "Your messages + aggregated financial context", model: "Gemini 1.5 Flash" },
          { title: "Receipt OCR", data: "Receipt image (base64)", model: "Gemini 1.5 Flash Vision" },
          { title: "Report Insights", data: "Aggregated financial metrics (no PII)", model: "Gemini 2.0 Flash" },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border p-4" style={{ borderColor: "#e2e8f0" }}>
            <div className="font-bold text-lg mb-2" style={{ color: "#050B1A" }}>{f.title}</div>
            <div className="text-xs mb-1" style={{ color: "#64748b" }}><span className="font-semibold">Data sent:</span> {f.data}</div>
            <div className="text-xs" style={{ color: "#64748b" }}><span className="font-semibold">Model:</span> {f.model}</div>
          </div>
        ))}
      </div>
      <InfoCard icon={CheckCircle2} title="Zero Training Guarantee" accent="#006970">
        Per Google's API Terms of Service: data submitted via the Gemini API is <strong>not used to train Google's
        general-purpose AI models</strong>. Google acts as a data processor with respect to content submitted through the
        API. AI usage is tracked only as a usage count — the content of your AI sessions is never stored in our database.
      </InfoCard>
      <InfoCard icon={AlertCircle} title="AI Output Disclaimer" accent="#DC2626">
        AI-generated invoices, financial classifications, and business recommendations may contain errors. You remain
        responsible for reviewing all AI outputs. NobleInvoice is not a substitute for a qualified accountant, lawyer,
        or financial adviser.
      </InfoCard>
    </section>
  );
}

function SectionQR() {
  return (
    <section id="qr-analytics" className="privacy-section mb-12 scroll-mt-6">
      <SectionHeading id="qr-analytics-h" number="05" icon={BarChart3}>QR Codes & Analytics</SectionHeading>
      <div className="rounded-2xl border p-5 mb-5" style={{ borderColor: "#FEF3C7", background: "#FFFBEB" }}>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4" style={{ color: "#D97706" }} />
          <span className="font-bold text-sm" style={{ color: "#D97706" }}>Third-Party Scan Data — Important</span>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: "#3b494b" }}>
          When someone (e.g. your customer) scans a QR code you created with NobleInvoice, our systems collect data
          about <strong>that third party's device</strong>, even though they may have no relationship with NobleInvoice.
          As the QR code owner, you are responsible for ensuring this is consistent with applicable privacy laws and
          providing appropriate notice to those individuals.
        </p>
      </div>
      <p className="text-lg font-bold mb-2" style={{ color: "#050B1A" }}>Data collected on each QR scan:</p>
      <CheckList items={[
        "Raw IP address of the scanning device",
        "User-Agent string (browser/device type and version)",
        "Accept-Language header (language/locale preference)",
        "Referer header",
        "City and country — derived from IP via Cloudflare geo-detection (Supabase infrastructure)",
        "Timestamp and QR code identifier",
      ]} />
      <div className="mt-5">
        <p className="text-lg font-bold mb-2" style={{ color: "#050B1A" }}>Contract Signatures</p>
        <p className="text-lg leading-relaxed mb-3" style={{ color: "#3b494b" }}>
          When a contract is electronically signed through NobleInvoice, we capture the signer's{" "}
          <strong>IP address and User-Agent</strong> at the moment of signing to create a legally valid audit trail.
          A <strong>SHA-256 cryptographic hash</strong> is generated and retained as part of the binding legal record.
        </p>
      </div>
    </section>
  );
}

function SectionCookies() {
  return (
    <section id="cookies-tracking" className="privacy-section mb-12 scroll-mt-6">
      <SectionHeading id="cookies-tracking-h" number="06" icon={Cookie}>Cookies & Tracking</SectionHeading>
      <div className="space-y-4">
        <div className="rounded-2xl border p-5" style={{ borderColor: "#e2e8f0" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-sm" style={{ color: "#050B1A" }}>Strictly Necessary</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#ECFDF5", color: "#065F46" }}>Always Active</span>
          </div>
          <p className="text-base leading-relaxed" style={{ color: "#64748b" }}>
            Authentication sessions, security tokens, cookie preference storage. No consent required — these are
            essential for the platform to function.
          </p>
        </div>
        <div className="rounded-2xl border p-5" style={{ borderColor: "#e2e8f0" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-sm" style={{ color: "#050B1A" }}>Google Analytics 4 (GA4)</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#FEF3C7", color: "#92400E" }}>Consent Required</span>
          </div>
          <p className="text-base leading-relaxed mb-2" style={{ color: "#64748b" }}>
            Measurement ID: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-xs">G-6ME42JV7BJ</code>.
            Collects anonymized page views, user interactions, device/browser type, and referral source. IP
            anonymization is enabled. GA4 is <strong>only loaded after you click "Accept All"</strong> on the cookie banner.
          </p>
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: "#0599D5" }}>
            Google Privacy Policy <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "FormSubmit.co", label: "Contact form", desc: "Your name, email, and message are sent to FormSubmit.co for delivery to our inbox when you use the contact form." },
            { title: "ip-api.com", label: "Mobile geo-detection", desc: "Mobile app sends your IP to ip-api.com (HTTPS) to auto-detect your country for currency selection." },
            { title: "ipapi.co", label: "Web geo-detection", desc: "Web app proxies your IP to ipapi.co to auto-detect your country for currency selection." },
          ].map((t) => (
            <div key={t.title} className="rounded-2xl border p-4" style={{ borderColor: "#e2e8f0" }}>
              <div className="font-bold text-lg mb-1" style={{ color: "#050B1A" }}>{t.title}</div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: "#F3F4F6", color: "#374151" }}>{t.label}</span>
              <p className="text-base leading-relaxed" style={{ color: "#64748b" }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionSharing() {
  return (
    <section id="sharing-providers" className="privacy-section mb-12 scroll-mt-6">
      <SectionHeading id="sharing-providers-h" number="07" icon={Globe}>Sharing & Providers</SectionHeading>
      <InfoCard icon={CheckCircle2} title="We do not sell your data" accent="#006970">
        NobleInvoice does not sell personal information as a business model. We do not share data with third-party
        advertisers.
      </InfoCard>
      <p className="text-lg leading-8 mb-4" style={{ color: "#3b494b" }}>
        We share information only with service providers that are necessary to operate NobleInvoice. Every provider
        is contractually required to protect your data and use it only for the stated purpose.
      </p>
      <div className="space-y-3">
        {[
          { label: "Cloud Infrastructure", detail: "Supabase (database, auth, storage) · Vercel (web hosting)", accent: "#0599D5" },
          { label: "Authentication", detail: "Supabase Auth · Google OAuth (Google Sign-In)", accent: "#7C3AED" },
          { label: "Payments", detail: "Flutterwave (subscription billing, card tokenization, payouts)", accent: "#059669" },
          { label: "AI Processing", detail: "Google Gemini API (AI assistant, OCR, insights)", accent: "#DC2626" },
          { label: "Email", detail: "Self-hosted SMTP (mail.noblesworld.com.ng)", accent: "#D97706" },
          { label: "Push Notifications", detail: "Firebase Cloud Messaging (FCM) — device tokens stored in database", accent: "#EA4335" },
          { label: "Social Media", detail: "LinkedIn API · Twitter/X API (only if you connect your accounts)", accent: "#0077B5" },
        ].map(({ label, detail, accent }) => (
          <div key={label} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: "#e2e8f0" }}>
            <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: accent }} />
            <div>
              <div className="font-bold text-lg" style={{ color: "#050B1A" }}>{label}</div>
              <div className="text-base mt-1" style={{ color: "#64748b" }}>{detail}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-base leading-8" style={{ color: "#3b494b" }}>
        <strong style={{ color: "#050B1A" }}>International transfers:</strong> Your data may be processed in countries
        outside Nigeria (primarily the United States) via Supabase, Vercel, Google, and Flutterwave. We implement
        appropriate safeguards including contractual protections.
      </div>
    </section>
  );
}

function SectionSubprocessors() {
  return (
    <section id="subprocessors" className="privacy-section mb-12 scroll-mt-6">
      <SectionHeading id="subprocessors-h" number="08" icon={FileText}>Subprocessors</SectionHeading>
      <p className="text-lg leading-8 mb-4" style={{ color: "#3b494b" }}>
        This table reflects the verified, production state of the NobleInvoice platform. We update it when providers change.
      </p>
      <ProcessorTable />
    </section>
  );
}

function SectionRights() {
  return (
    <section id="rights" className="privacy-section mb-12 scroll-mt-6">
      <SectionHeading id="rights-h" number="09" icon={Eye}>Your Rights</SectionHeading>
      <p className="text-lg leading-8 mb-4" style={{ color: "#3b494b" }}>
        Depending on your jurisdiction, you have the following rights. We honour these rights regardless of where you live.
      </p>
      <RightsGrid />
      <div className="mt-5 space-y-3">
        <div className="rounded-2xl border p-5 text-lg" style={{ borderColor: "#e2e8f0" }}>
          <div className="font-bold mb-1" style={{ color: "#050B1A" }}>Nigerian Users — NDPA 2023</div>
          <p style={{ color: "#64748b" }}>The Nigeria Data Protection Commission (NDPC) is the relevant supervisory authority. NobleInvoice processes personal data in accordance with the Nigeria Data Protection Act 2023 and applicable NDPC regulations.</p>
        </div>
        <div className="rounded-2xl border p-5 text-lg" style={{ borderColor: "#e2e8f0" }}>
          <div className="font-bold mb-1" style={{ color: "#050B1A" }}>EEA / UK Users — GDPR / UK GDPR</div>
          <p style={{ color: "#64748b" }}>You may lodge a complaint with your local data protection authority. For UK users, this is the ICO. For EEA users, contact your national supervisory authority.</p>
        </div>
        <div className="rounded-2xl border p-5 text-lg" style={{ borderColor: "#e2e8f0" }}>
          <div className="font-bold mb-1" style={{ color: "#050B1A" }}>California Users — CCPA / CPRA</div>
          <p style={{ color: "#64748b" }}>California residents have rights to access, delete, correct, and opt-out of the sale/sharing of personal information. NobleInvoice does not sell personal information.</p>
        </div>
      </div>
    </section>
  );
}

function SectionSecurity() {
  return (
    <section id="security" className="privacy-section mb-12 scroll-mt-6">
      <SectionHeading id="security-h" number="10" icon={AlertCircle}>Security & Contact</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {[
          { title: "Encryption in transit", desc: "TLS on all connections between clients and servers" },
          { title: "Row-level security", desc: "Supabase RLS policies enforce data isolation per user" },
          { title: "Tokenized payments", desc: "No full card numbers — Flutterwave tokenization only" },
          { title: "Device-level encryption", desc: "JWT tokens stored in flutter_secure_storage (iOS Keychain / Android EncryptedSharedPreferences)" },
          { title: "Access controls", desc: "Role-based permissions and workspace isolation" },
          { title: "Account deletion", desc: "Full data deletion pipeline via cleanup-user-data Edge Function" },
        ].map((s) => (
          <div key={s.title} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: "#e2e8f0" }}>
            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#006970" }} />
            <div>
              <div className="font-bold text-lg" style={{ color: "#050B1A" }}>{s.title}</div>
              <div className="text-base mt-1" style={{ color: "#64748b" }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <InfoCard icon={Mail} title="Contact the Data Protection Officer" accent="#0599D5">
        For privacy questions, data-subject requests, or complaints:
        <div className="mt-2 flex flex-col gap-1">
          <a href="mailto:privacy@noblesworld.com.ng" className="font-bold hover:underline" style={{ color: "#0599D5" }}>
            privacy@noblesworld.com.ng
          </a>
          <a href="mailto:invoice@noblesworld.com.ng" className="font-bold hover:underline" style={{ color: "#0599D5" }}>
            invoice@noblesworld.com.ng
          </a>
        </div>
      </InfoCard>
      <p className="text-xs mt-4" style={{ color: "#94a3b8" }}>
        Effective Date: August 8, 2026. We may update this policy periodically. Material changes will be notified via
        in-app notification or email. This policy is interpreted in accordance with applicable Nigerian, European, and
        international data-protection law. Governing law: Lagos, Nigeria.
      </p>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="We believe privacy is a right, not a feature. This policy explains exactly what we collect, why we collect it, who we share it with, and how you can control your data."
      categories={CATEGORIES}
    >
      <SectionIntroduction />
      <div className="border-t mb-12" style={{ borderColor: "#f1f5f9" }} />
      <SectionController />
      <div className="border-t mb-12" style={{ borderColor: "#f1f5f9" }} />
      <SectionWhatWeCollect />
      <div className="border-t mb-12" style={{ borderColor: "#f1f5f9" }} />
      <SectionAI />
      <div className="border-t mb-12" style={{ borderColor: "#f1f5f9" }} />
      <SectionQR />
      <div className="border-t mb-12" style={{ borderColor: "#f1f5f9" }} />
      <SectionCookies />
      <div className="border-t mb-12" style={{ borderColor: "#f1f5f9" }} />
      <SectionSharing />
      <div className="border-t mb-12" style={{ borderColor: "#f1f5f9" }} />
      <SectionSubprocessors />
      <div className="border-t mb-12" style={{ borderColor: "#f1f5f9" }} />
      <SectionRights />
      <div className="border-t mb-12" style={{ borderColor: "#f1f5f9" }} />
      <SectionSecurity />

      {/* Full Legal Document Integration */}
      <div className="mt-20 pt-16 border-t-2 border-slate-200">
        <h2 id="full-legal-text" className="text-3xl font-black text-slate-900 mb-8 scroll-mt-6">Full Legal Privacy Policy</h2>
        <div className="prose prose-slate prose-a:text-blue-600 prose-headings:text-slate-900 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {privacyPolicyMarkdown}
          </ReactMarkdown>
        </div>
      </div>
    </LegalLayout>
  );
}

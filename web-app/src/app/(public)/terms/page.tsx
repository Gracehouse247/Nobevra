"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { termsMarkdown } from "./policy";
import { LegalLayout } from "@/components/shared/Legal/LegalLayout";
import { ShieldCheck, CreditCard, Lock, FileText, Globe } from "lucide-react";

const CATEGORIES = [
  {
    title: "General",
    sections: [
      { id: "1-about-nobleinvoice", label: "About NobleInvoice", icon: ShieldCheck },
      { id: "2-definitions", label: "Definitions", icon: FileText },
      { id: "3-eligibility", label: "Eligibility", icon: ShieldCheck },
      { id: "4-account-registration", label: "Account Registration", icon: ShieldCheck },
      { id: "5-account-security", label: "Account Security", icon: Lock },
      { id: "6-acceptable-use", label: "Acceptable Use", icon: ShieldCheck },
    ],
  },
  {
    title: "Billing & Payments",
    sections: [
      { id: "9-payments", label: "Payments", icon: CreditCard },
      { id: "10-payment-disputes", label: "Payment Disputes", icon: CreditCard },
      { id: "11-subscriptions-and-plans", label: "Subscriptions & Plans", icon: CreditCard },
      { id: "15-billing-and-automatic-renewal", label: "Billing & Renewal", icon: CreditCard },
      { id: "16-cancellation", label: "Cancellation", icon: CreditCard },
      { id: "17-refunds", label: "Refunds", icon: CreditCard },
    ],
  },
  {
    title: "Data & Intellectual Property",
    sections: [
      { id: "20-customer-data-ownership", label: "Data Ownership", icon: Lock },
      { id: "23-personal-data", label: "Personal Data", icon: Lock },
      { id: "40-intellectual-property", label: "Intellectual Property", icon: FileText },
      { id: "41-user-content", label: "User Content", icon: FileText },
    ],
  },
  {
    title: "Service Functionality",
    sections: [
      { id: "7-invoices-and-business-records", label: "Invoices", icon: FileText },
      { id: "27-digital-business-cards", label: "Business Cards", icon: Globe },
      { id: "28-qr-codes", label: "QR Codes", icon: Globe },
      { id: "31-receipt-scanning-and-ocr", label: "Receipts & OCR", icon: FileText },
      { id: "32-artificial-intelligence-features", label: "AI Features", icon: ShieldCheck },
    ],
  },
  {
    title: "Legal & Liability",
    sections: [
      { id: "50-disclaimer-of-warranties", label: "Disclaimer", icon: ShieldCheck },
      { id: "51-limitation-of-liability", label: "Liability", icon: ShieldCheck },
      { id: "52-indemnification", label: "Indemnification", icon: ShieldCheck },
      { id: "61-governing-law", label: "Governing Law", icon: Globe },
      { id: "62-dispute-resolution", label: "Dispute Resolution", icon: ShieldCheck },
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      description="These Terms of Service govern your access to and use of the NobleInvoice website, web application, mobile applications, APIs, software, services, and related products."
      categories={CATEGORIES}
    >
      <div className="prose prose-slate prose-a:text-blue-600 prose-headings:text-slate-900 max-w-none prose-h3:text-2xl prose-h3:font-black prose-h3:mt-12 prose-h3:scroll-mt-24">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
          {termsMarkdown}
        </ReactMarkdown>
      </div>
    </LegalLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, CheckCircle2, AlertCircle, Clock, ShieldCheck, 
  Zap, BarChart3, Database, Globe, Check, X, FileText, 
  CreditCard, Sparkles, HelpCircle, BookOpen, Layers
} from 'lucide-react';

import SavingsCalculator from '@/components/landing/SavingsCalculator';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'What is Invoicing Software? Definition, Benefits & Guide | Nobevra',
  description: 'What is invoicing software? Discover how modern billing software automates invoicing, tracks client views, collects payments, and eliminates accounting errors.',
  keywords: [
    'what is invoicing software',
    'invoicing software definition',
    'benefits of invoicing software',
    'invoicing vs accounting software',
    'how does billing software work',
    'online invoice maker'
  ],
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/features/what-is-invoicing-software',
  },
  openGraph: {
    title: 'What is Invoicing Software? Definition, Benefits & Guide | Nobevra',
    description: 'What is invoicing software? Discover how modern billing software automates invoicing, tracks client views, collects payments, and eliminates accounting errors.',
    url: 'https://nobevra.noblesworld.com.ng/features/what-is-invoicing-software',
    type: 'article',
    images: [
      {
        url: '/images/hero-dashboard-actual.png',
        width: 1200,
        height: 630,
        alt: 'What is Invoicing Software — Comprehensive Guide by Nobevra',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is Invoicing Software? Definition, Benefits & Guide | Nobevra',
    description: 'Comprehensive guide to invoicing software, automation, and benefits for modern businesses.',
    images: ['/images/hero-dashboard-actual.png'],
  },
};

export default function WhatIsInvoicingSoftwarePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is invoicing software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Invoicing software is a business application designed to generate, send, track, and manage commercial billing documents (invoices, quotes, proformas) and collect client payments electronically. Unlike static spreadsheets, invoicing software automates tax calculations, provides real-time client open-tracking, issues automated payment reminders, and integrates directly with online payment gateways."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between invoicing software and accounting software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Invoicing software focuses specifically on accounts receivable, creating professional billing documents, tracking customer views, and collecting payments quickly. Accounting software is a broader system that covers double-entry bookkeeping, general ledgers, payroll, tax filings, and depreciation. For many small businesses and freelancers, standalone invoicing software provides the exact speed and payment tools they need without the complexity or high cost of full accounting suites."
        }
      },
      {
        "@type": "Question",
        "name": "How does automated invoicing software help get you paid faster?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Automated invoicing software speeds up payment cycles by embedding instant online checkout buttons (credit card, bank transfer, Apple Pay) directly inside digital invoices, automatically following up on overdue bills with scheduled reminders, and giving businesses telemetry on when clients view documents."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use invoicing software for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Nobevra offers a 100% free web-based invoice generator that allows freelancers and businesses to create, customize with brand colors and logos, calculate line items and taxes, and download professional PDF invoices instantly without signing up."
        }
      },
      {
        "@type": "Question",
        "name": "What essential features should I look for in invoicing software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Key features include customizable invoice templates, automated recurring billing, multi-currency support, real-time client view notifications, instant online payment processing (cards, bank transfers), expense tracking, and integrated client management (CRM)."
        }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What is Invoicing Software? Definition, Benefits & Complete Business Guide",
    "description": "A comprehensive guide explaining what invoicing software is, how it works, how it compares to accounting software, and why modern businesses use it to get paid faster.",
    "author": {
      "@type": "Organization",
      "name": "Nobevra",
      "url": "https://nobevra.noblesworld.com.ng"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nobevra",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nobevra.noblesworld.com.ng/logo.png"
      }
    },
    "mainEntityOfPage": "https://nobevra.noblesworld.com.ng/features/what-is-invoicing-software"
  };

  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
      <BreadcrumbSchema
        pageId="what-is-invoicing-software"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Features', item: 'https://nobevra.noblesworld.com.ng/features' },
          { name: 'What is Invoicing Software?' }
        ]}
      />
      <script
        id="faq-schema-invoicing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        id="article-schema-invoicing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6 border border-near-black/5 shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-noble-blue" />
              Comprehensive Business Guide
            </div>
            <h1 className="font-inter text-near-black mb-6 text-[32px] md:text-[52px] leading-[1.08] tracking-tight font-black">
              What is Invoicing Software? <br/>
              <span className="text-noble-blue">The Definitive Business Guide</span>
            </h1>
            <p className="text-base md:text-lg text-near-black/70 max-w-xl mb-8 leading-relaxed">
              Invoicing software is the digital engine that automates billing, manages client payment cycles, eliminates manual spreadsheet errors, and gets your business paid up to 2x faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/register"
                className="bg-[#166FBB] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-[0_12px_30px_rgba(22,111,187,0.35)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-3"
              >
                Try Nobevra Invoicing Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/free-invoice-generator"
                className="bg-white text-near-black border border-slate-200 px-7 py-4 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all inline-flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-noble-blue" /> Free PDF Generator
              </Link>
            </div>
          </div>
          <div className="relative w-full rounded-[24px] overflow-hidden shadow-2xl border border-slate-200/60 bg-white">
            <Image 
              src="/images/crm-engine-hero.png" 
              alt="Nobevra Invoicing Software Interface displaying automated invoice ledger, payment statuses, and client tracking"
              width={1200}
              height={800}
              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500 ease-in-out"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. Definition Callout Box */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-br from-blue-50/70 to-slate-50 border-2 border-blue-200/80 rounded-2xl p-8 md:p-10 relative shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-noble-blue text-white flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-black text-near-black">
                  Definition: What is Invoicing Software?
                </h2>
                <p className="text-base md:text-lg text-near-black/80 leading-relaxed">
                  <strong>Invoicing software</strong> is a dedicated business application that streamlines the complete accounts receivable cycle. It allows freelancers, agencies, and enterprises to draft legally compliant commercial invoices, automatically compute taxes and line-item totals, deliver digital payment links, monitor client open status via telemetry, and schedule automated payment reminders.
                </p>
                <p className="text-sm text-near-black/60 pt-2 border-t border-blue-100">
                  Unlike traditional paper bills or Word/Excel templates, cloud-based invoicing software connects billing directly to customer records (<Link href="/crm" className="text-noble-blue font-semibold underline">CRM</Link>), expense ledgers (<Link href="/expense-management" className="text-noble-blue font-semibold underline">Expense Management</Link>), and instant merchant settlement (<Link href="/payments" className="text-noble-blue font-semibold underline">Payments</Link>).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comparative Matrix: Invoicing Software vs Accounting vs Spreadsheets */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest">
              Comparison Matrix
            </div>
            <h2 className="font-inter text-3xl md:text-4xl font-black text-near-black">
              Invoicing Software vs. Accounting Software vs. Spreadsheets
            </h2>
            <p className="text-base md:text-lg text-near-black/60">
              Understanding which tool is right for your stage of business ensures you avoid overpaying for unnecessary software or drowning in manual admin.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                    <th className="py-5 px-6 font-bold">Feature / Capability</th>
                    <th className="py-5 px-6 font-bold bg-noble-blue text-white">Nobevra Invoicing</th>
                    <th className="py-5 px-6 font-bold">Full Accounting Software</th>
                    <th className="py-5 px-6 font-bold">Excel / Word Templates</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-near-black">Primary Focus</td>
                    <td className="py-4 px-6 font-medium text-noble-blue bg-blue-50/30">Getting Paid Fast & Cash Flow</td>
                    <td className="py-4 px-6 text-near-black/70">General Ledger & Tax Compliance</td>
                    <td className="py-4 px-6 text-near-black/70">Static Document Creation</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-near-black">Instant Online Checkout Button</td>
                    <td className="py-4 px-6 text-emerald-600 bg-blue-50/30 font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> Built-in (Cards, Bank)</td>
                    <td className="py-4 px-6 text-near-black/70">Often Requires Add-on Fee</td>
                    <td className="py-4 px-6 text-red-500 flex items-center gap-1.5"><X className="w-4 h-4" /> Not possible</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-near-black">Live Client Open-Tracking (Telemetry)</td>
                    <td className="py-4 px-6 text-emerald-600 bg-blue-50/30 font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> Instant Push Notification</td>
                    <td className="py-4 px-6 text-near-black/70">Limited or Basic</td>
                    <td className="py-4 px-6 text-red-500 flex items-center gap-1.5"><X className="w-4 h-4" /> Blind sending</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-near-black">Automated Late Payment Reminders</td>
                    <td className="py-4 px-6 text-emerald-600 bg-blue-50/30 font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> 100% Automated</td>
                    <td className="py-4 px-6 text-near-black/70">Available on higher tiers</td>
                    <td className="py-4 px-6 text-red-500 flex items-center gap-1.5"><X className="w-4 h-4" /> Manual chasing</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-near-black">Ease of Use / Setup Time</td>
                    <td className="py-4 px-6 text-noble-blue bg-blue-50/30 font-bold">Under 60 Seconds</td>
                    <td className="py-4 px-6 text-near-black/70">Days to weeks of configuration</td>
                    <td className="py-4 px-6 text-near-black/70">Manual formatting each time</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-near-black">Integrated Client CRM Vault</td>
                    <td className="py-4 px-6 text-emerald-600 bg-blue-50/30 font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> Included</td>
                    <td className="py-4 px-6 text-near-black/70">Separate CRM module</td>
                    <td className="py-4 px-6 text-red-500 flex items-center gap-1.5"><X className="w-4 h-4" /> None</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-near-black">Average Monthly Cost</td>
                    <td className="py-4 px-6 text-emerald-700 bg-blue-50/30 font-bold">Free to Low Flat Fee</td>
                    <td className="py-4 px-6 text-near-black/70"> – + / month</td>
                    <td className="py-4 px-6 text-near-black/70">Free (High Time Cost)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Features of Modern Invoicing Software */}
      <section className="py-20 bg-white">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-inter text-3xl md:text-4xl font-black text-near-black">
              5 Essential Capabilities of Modern Invoicing Software
            </h2>
            <p className="text-base md:text-lg text-near-black/60">
              When evaluating invoicing software for your business, ensure it provides these core automation workflows:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100/70 text-noble-blue flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">1. Template Customization</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Choose from dozens of professional layouts, upload your brand logo, set custom primary palette colors, and display regulatory tax IDs (VAT, EIN, GST).
              </p>
              <Link href="/invoicing" className="inline-flex items-center gap-1.5 text-xs font-bold text-noble-blue uppercase tracking-wider hover:underline pt-2">
                Explore Invoicing Features <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center font-bold">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">2. Instant Payment Gateway</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Enable clients to settle invoices directly on the digital invoice page via debit/credit card, bank transfer, or mobile money in 30+ international currencies.
              </p>
              <Link href="/payments" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider hover:underline pt-2">
                View Payment Processing <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100/70 text-purple-600 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">3. Automated Chasing</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Eliminate awkward follow-ups. Pre-schedule automated, polite email notifications that fire 3 days before the due date, on the due date, and at intervals post-due.
              </p>
              <Link href="/business-management-software" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 uppercase tracking-wider hover:underline pt-2">
                See Automation Suite <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center font-bold">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">4. Connected CRM Vault</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Maintain client contact cards, historical transaction records, lifetime revenue figures, and outstanding balances in a unified customer database.
              </p>
              <Link href="/crm" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider hover:underline pt-2">
                Explore CRM Engine <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100/70 text-sky-600 flex items-center justify-center font-bold">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">5. Real-Time Telemetry</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Receive instant notifications when your customer receives, opens, views, or downloads an invoice, giving you full visibility into payment progress.
              </p>
              <Link href="/ai-business-assistant" className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider hover:underline pt-2">
                AI Telemetry Insights <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-noble-blue text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-blue-200 font-bold">Instant Setup</span>
                <h3 className="text-2xl font-black">Ready to modernize your billing?</h3>
                <p className="text-white/80 text-sm">Join thousands of businesses accelerating cash flow with Nobevra.</p>
              </div>
              <Link 
                href="/register" 
                className="mt-6 bg-white text-noble-blue px-6 py-3.5 rounded-xl font-bold text-sm text-center shadow-md hover:bg-blue-50 transition-all inline-flex items-center justify-center gap-2"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Savings Calculator */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center">
          <div className="mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest">
              ROI & Cost Savings
            </div>
            <h2 className="font-inter text-3xl md:text-4xl font-black text-near-black">
              How Much Does Manual Invoicing Cost You?
            </h2>
            <p className="text-base md:text-lg text-near-black/60 max-w-2xl mx-auto">
              Calculate your administrative drag and see the direct financial return of switching to automated billing.
            </p>
          </div>
          <SavingsCalculator />
        </div>
      </section>

      {/* 6. Comprehensive PAA FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5 text-noble-blue" />
              Frequently Asked Questions
            </div>
            <h2 className="font-inter text-3xl md:text-4xl font-black text-near-black">
              Questions About Invoicing Software Answered
            </h2>
            <p className="text-base text-near-black/60">
              Clear answers to the most common questions about selecting and implementing billing tools.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-7 rounded-2xl border border-slate-200/70">
              <h3 className="text-lg font-bold text-near-black mb-2">What is invoicing software and how does it work?</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Invoicing software is a digital platform that generates, sends, tracks, and collects commercial invoices online. You select a client from your database, input services or goods with set prices and taxes, and the software generates a formatted PDF with embedded payment links. It automatically notifies you when the client opens the document and records payment upon settlement.
              </p>
            </div>

            <div className="bg-slate-50 p-7 rounded-2xl border border-slate-200/70">
              <h3 className="text-lg font-bold text-near-black mb-2">How is invoicing software different from accounting software?</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Invoicing software focuses strictly on the customer billing cycle (accounts receivable): creating invoices, collecting payments, and managing client relationships. Accounting software is a much larger system for double-entry bookkeeping, general ledgers, tax filing, and payroll. Most small businesses only need invoicing software to run daily operations smoothly.
              </p>
            </div>

            <div className="bg-slate-50 p-7 rounded-2xl border border-slate-200/70">
              <h3 className="text-lg font-bold text-near-black mb-2">Can I create an invoice online for free?</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Yes. You can use Nobevra's <Link href="/free-invoice-generator" className="text-noble-blue font-semibold underline">Free Invoice Generator</Link> to design, calculate taxes for, and download high-resolution PDF invoices instantly without creating an account.
              </p>
            </div>

            <div className="bg-slate-50 p-7 rounded-2xl border border-slate-200/70">
              <h3 className="text-lg font-bold text-near-black mb-2">What should be included on a professional commercial invoice?</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                A valid invoice must include your business name and contact info, client billing details, a unique sequential invoice number, issue date and due date, an itemized table of products/services with unit prices and tax rates, the total balance due, and accepted payment instructions. Learn more in our <Link href="/features/how-do-i-make-an-invoice" className="text-noble-blue font-semibold underline">Step-by-Step Invoice Creation Guide</Link>.
              </p>
            </div>

            <div className="bg-slate-50 p-7 rounded-2xl border border-slate-200/70">
              <h3 className="text-lg font-bold text-near-black mb-2">How do automated payment reminders work?</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Once configured, Nobevra's automated reminder system sends polite email alerts to clients at pre-set milestones (e.g., 3 days before due date, on the due date, and 7 days overdue). As soon as the client settles via the online payment link, the system immediately ceases reminder emails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Conversion CTA */}
      <section className="py-20 bg-near-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-6">
          <h2 className="font-inter text-3xl md:text-5xl font-black">
            Automate your billing workflow today.
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Stop losing hours to spreadsheet formatting and manual payment follow-ups. Experience the speed of intelligent business operating software.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="bg-[#166FBB] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-[0_12px_30px_rgba(22,111,187,0.35)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-3"
            >
              Start Free with Nobevra <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/invoicing"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center"
            >
              Explore Invoicing Software
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
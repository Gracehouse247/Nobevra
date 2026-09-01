import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
  Repeat, ArrowRight, CheckCircle2, ShieldCheck, Zap,
  Clock, CreditCard, RefreshCw, Calendar, Sparkles,
  HelpCircle, Check, X, Bell, Layers, FileText
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Recurring Billing Software — Automated Retainers & Subscriptions | Nobevra',
  description: 'Automate recurring monthly invoices, client retainers, and subscription billing with Nobevra. Set automated payment schedules, retry failed payments, and stop chasing clients.',
  keywords: [
    'recurring billing software',
    'automated recurring invoices',
    'subscription billing software',
    'retainer billing software',
    'automated client billing',
    'recurring invoice software'
  ],
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/recurring-billing-software',
  },
  openGraph: {
    title: 'Recurring Billing Software — Automated Retainers & Subscriptions | Nobevra',
    description: 'Automate recurring monthly invoices, client retainers, and subscription billing with Nobevra. Set automated payment schedules, retry failed payments, and stop chasing clients.',
    url: 'https://nobevra.noblesworld.com.ng/recurring-billing-software',
    type: 'website',
    images: [
      {
        url: '/images/precision-invoicing.png',
        width: 1200,
        height: 630,
        alt: 'Nobevra Recurring Billing Software — Automated Retainers & Subscriptions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recurring Billing Software | Nobevra',
    description: 'Automate recurring monthly invoices, client retainers, smart failed-payment retries, and scheduled billing.',
    images: ['/images/precision-invoicing.png'],
  },
};

export default function RecurringBillingSoftwarePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does recurring billing software work on Nobevra?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You define the invoice template, set the frequency (weekly, bi-weekly, monthly, quarterly, or annual), and assign the customer. Nobevra automatically generates the invoice on the scheduled date, emails it to the client, triggers the payment charge, and marks the ledger upon settlement."
        }
      },
      {
        "@type": "Question",
        "name": "Can clients update their credit card details for recurring subscriptions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Clients receive access to a self-service client portal where they can update their payment methods, view historical billing receipts, and manage active retainer agreements securely."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if a client's recurring payment fails?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nobevra uses smart retry logic (dunning management) to automatically re-attempt the charge at set intervals (e.g., 24h and 72h later) while emailing a polite notification with a direct link for the client to update their payment method."
        }
      },
      {
        "@type": "Question",
        "name": "Can I bill recurring retainers with variable hours or line items?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can configure fixed-price monthly retainers, base subscription fees plus overage line items, or pause and adjust active recurring profiles anytime with one click."
        }
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nobevra Recurring Billing Software",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Automated recurring invoice generation, subscription billing, and retainer management platform for growing businesses."
  };

  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
      <BreadcrumbSchema
        pageId="recurring-billing-software"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Recurring Billing Software' },
        ]}
      />
      <script
        id="faq-schema-recurring"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        id="software-schema-recurring"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* 1. Hero Section */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-6">
            <Repeat className="w-4 h-4 text-noble-blue animate-spin" style={{ animationDuration: '6s' }} />
            Automated Subscription & Retainer Engine
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
            Recurring Billing Software That Puts Your Cash Flow <span className="text-noble-blue">on Autopilot</span>
          </h1>
          <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
            Stop manually recreating the same client invoices every month. Set custom billing intervals, collect automated payments, and eliminate revenue leakage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
            >
              Start Automated Billing Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/invoicing"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-noble-blue" /> View Invoicing Suite
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-10 mt-10 border-t border-slate-200/80 text-sm font-semibold text-slate-600">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Weekly, Monthly & Custom Cycles</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Automated Dunning & Retries</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero Setup Fees</div>
          </div>
        </div>
      </section>

      {/* 2. Feature Grid */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest">
              Core Capabilities
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-near-black">
              Everything You Need for Effortless Subscription & Retainer Billing
            </h2>
            <p className="text-base md:text-lg text-near-black/60">
              Built specifically for modern service agencies, consultants, SaaS founders, and solopreneurs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-noble-blue flex items-center justify-center font-bold">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">Flexible Billing Schedules</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Set recurring schedules on weekly, bi-weekly, monthly, quarterly, or annual intervals. Define start dates, end milestones, or keep them active indefinitely.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center font-bold">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">Auto-Charge & Smart Retries</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Securely store client payment methods to charge cards automatically upon invoice generation. Failed charges are automatically re-attempted with smart dunning notifications.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">Client Self-Service Portal</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Provide clients with a branded portal where they can update expiring credit cards, download tax receipts, and view full payment histories without emailing you.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">Contract-to-Retainer Flow</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Link e-signed client contracts directly into recurring billing profiles. Once signed, the first deposit and monthly retainer are activated automatically.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center font-bold">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">Automated Receipts & Reminders</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Deliver instant branded PDF receipts upon successful auto-charges. Issue advance billing notices 3 days before upcoming renewals.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-noble-blue text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-blue-200 font-bold">Instant Setup</span>
                <h3 className="text-2xl font-black">Ready to automate your monthly retainer income?</h3>
                <p className="text-white/80 text-sm">Join thousands of businesses securing predictable monthly cash flow.</p>
              </div>
              <Link 
                href="/register" 
                className="mt-6 bg-white text-noble-blue px-6 py-3.5 rounded-xl font-bold text-sm text-center shadow-md hover:bg-blue-50 transition-all inline-flex items-center justify-center gap-2"
              >
                Create Recurring Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comparison Table */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-near-black">
              Why Modern Businesses Switch to Nobevra Recurring Billing
            </h2>
            <p className="text-base text-near-black/60">
              Compare automated recurring billing against traditional manual invoicing and bloated legacy platforms.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                  <th className="py-5 px-6 font-bold">Billing Feature</th>
                  <th className="py-5 px-6 font-bold bg-noble-blue text-white">Nobevra</th>
                  <th className="py-5 px-6 font-bold">Manual Invoicing</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-near-black">Time Spent per Month</td>
                  <td className="py-4 px-6 text-emerald-600 bg-blue-50/30 font-bold">0 Minutes (100% Automated)</td>
                  <td className="py-4 px-6 text-red-500 font-semibold">4–8 hours of manual re-typing</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-near-black">Auto-Charge Saved Cards</td>
                  <td className="py-4 px-6 text-emerald-600 bg-blue-50/30 font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> Built-in (PCI-DSS Level 1)</td>
                  <td className="py-4 px-6 text-red-500 flex items-center gap-1.5"><X className="w-4 h-4" /> Not available</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-near-black">Failed Payment Recovery (Dunning)</td>
                  <td className="py-4 px-6 text-emerald-600 bg-blue-50/30 font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> Automated email alerts & retry</td>
                  <td className="py-4 px-6 text-red-500 flex items-center gap-1.5"><X className="w-4 h-4" /> Awkward manual chasing</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-near-black">Self-Service Card Update Portal</td>
                  <td className="py-4 px-6 text-emerald-600 bg-blue-50/30 font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> Included for all clients</td>
                  <td className="py-4 px-6 text-red-500 flex items-center gap-1.5"><X className="w-4 h-4" /> Manual email requests</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5 text-noble-blue" /> FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-near-black">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-near-black mb-2">{faq.name}</h3>
                <p className="text-near-black/70 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources & Spoke Links */}
      <section className="py-16 bg-[#F8FAFC] border-t border-slate-200/60">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
          <h3 className="text-xl font-black text-near-black mb-6 text-center">Retainer & Billing Resources</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/features/how-to-bill-clients-on-retainer" className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-noble-blue hover:shadow-md transition-all group">
              <span className="text-[10px] font-black uppercase tracking-widest text-noble-blue block mb-1">Playbook</span>
              <h4 className="font-bold text-sm text-near-black group-hover:text-noble-blue transition-colors mb-1">How to Bill on Retainer</h4>
              <p className="text-xs text-slate-500">Contract structures & overage billing.</p>
            </Link>
            <Link href="/features/freelance-rate-calculator" className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-noble-blue hover:shadow-md transition-all group">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block mb-1">Interactive Tool</span>
              <h4 className="font-bold text-sm text-near-black group-hover:text-noble-blue transition-colors mb-1">Freelance Rate Calculator</h4>
              <p className="text-xs text-slate-500">Compute your target hourly & retainer rates.</p>
            </Link>
            <Link href="/client-contracts" className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-noble-blue hover:shadow-md transition-all group">
              <span className="text-[10px] font-black uppercase tracking-widest text-noble-blue block mb-1">Product</span>
              <h4 className="font-bold text-sm text-near-black group-hover:text-noble-blue transition-colors mb-1">Client Contracts & E-Sign</h4>
              <p className="text-xs text-slate-500">Legally binding retainer agreements.</p>
            </Link>
            <Link href="/client-portal-software" className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-noble-blue hover:shadow-md transition-all group">
              <span className="text-[10px] font-black uppercase tracking-widest text-noble-blue block mb-1">Product</span>
              <h4 className="font-bold text-sm text-near-black group-hover:text-noble-blue transition-colors mb-1">Client Portal Software</h4>
              <p className="text-xs text-slate-500">Automated card billing & self-service.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-near-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black">
            Automate your recurring cash flow today.
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Join thousands of modern agencies and solopreneurs collecting predictable monthly revenue on Nobevra.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="bg-[#166FBB] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-[0_12px_30px_rgba(22,111,187,0.35)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-3"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/solutions/agency-billing-platform"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center"
            >
              Agency Solutions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
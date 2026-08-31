import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
  LineChart, BarChart3, ArrowRight, CheckCircle2, TrendingUp,
  DollarSign, PieChart, Activity, Sparkles, HelpCircle,
  ShieldCheck, Clock, Zap, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cash Flow Analytics & Financial Forecasting Software | Nobevra',
  description: 'Track real-time business revenue, analyze overdue receivables, and forecast cash flow with AI-powered financial analytics from Nobevra.',
  keywords: [
    'cash flow analytics software',
    'business cash flow forecasting',
    'real time cash flow dashboard',
    'financial analytics for small business',
    'accounts receivable analytics',
    'small business financial reporting'
  ],
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/cash-flow-analytics',
  },
  openGraph: {
    title: 'Cash Flow Analytics & Financial Forecasting Software | Nobevra',
    description: 'Track real-time business revenue, analyze overdue receivables, and forecast cash flow with AI-powered financial analytics from Nobevra.',
    url: 'https://nobevra.noblesworld.com.ng/cash-flow-analytics',
    type: 'website',
  },
};

export default function CashFlowAnalyticsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Nobevra calculate cash flow analytics in real time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nobevra unifies your incoming payments, issued invoices, and logged expenses into a live financial ledger. As soon as an invoice is paid or a receipt is scanned, your cash balance, revenue pacing, and net profit metrics update automatically."
        }
      },
      {
        "@type": "Question",
        "name": "Can Nobevra forecast future cash flow runway?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Nobevra uses Google Gemini AI to analyze your recurring retainers, scheduled client invoices, and average monthly expense burn rate, providing 30, 60, and 90-day cash flow projections."
        }
      },
      {
        "@type": "Question",
        "name": "How does aging invoice reporting help collect overdue payments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The accounts receivable aging dashboard groups unpaid invoices by due date milestones (1-15 days, 16-30 days, 30+ days overdue), allowing you to trigger automated dunning workflows and prioritize high-value collections."
        }
      },
      {
        "@type": "Question",
        "name": "Does the analytics dashboard support multiple currencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can invoice clients in USD, EUR, GBP, or 30+ global currencies, and Nobevra will convert and consolidate all reporting into your chosen primary base currency using live institutional exchange rates."
        }
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nobevra Cash Flow Analytics Software",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Real-time cash flow analytics, AI financial forecasting, and accounts receivable reporting software for businesses."
  };

  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
      <BreadcrumbSchema
        pageId="cash-flow-analytics"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Cash Flow Analytics' },
        ]}
      />
      <script
        id="faq-schema-cashflow"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        id="software-schema-cashflow"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* 1. Hero Section */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-6">
            <LineChart className="w-4 h-4 text-noble-blue" />
            Financial Intelligence & Forecasting
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
            Cash Flow Analytics & Forecasting <span className="text-noble-blue">Without the Spreadsheets</span>
          </h1>
          <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
            Gain total visibility into your cash flow. Track real-time revenue, monitor overdue invoices, and forecast business runway with AI-driven intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
            >
              Explore Analytics Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/ai-business-assistant"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-noble-blue" /> AI Assistant Overview
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-10 mt-10 border-t border-slate-200/80 text-sm font-semibold text-slate-600">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-Time P&L Tracking</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Automated Aging Receivables</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Currency Consolidation</div>
          </div>
        </div>
      </section>

      {/* 2. Key Visual Metric Cards */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Monthly Recurring Revenue</span>
                <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full"><ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +18.4%</span>
              </div>
              <p className="text-3xl font-black text-slate-900 mb-1">,450.00</p>
              <p className="text-xs text-slate-500">Calculated from 34 active retainer contracts</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Accounts Receivable Aging</span>
                <span className="inline-flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">96.2% On-Time</span>
              </div>
              <p className="text-3xl font-black text-slate-900 mb-1">,120.00</p>
              <p className="text-xs text-slate-500">Outstanding balance across 4 invoices</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Projected 90-Day Runway</span>
                <span className="inline-flex items-center text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full"><Sparkles className="w-3.5 h-3.5 mr-0.5" /> Gemini AI</span>
              </div>
              <p className="text-3xl font-black text-slate-900 mb-1">11.4 Months</p>
              <p className="text-xs text-slate-500">Net positive runway based on historic burn</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Feature Capabilities */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest">
              Analytics Suite
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-near-black">
              Actionable Business Intelligence at Your Fingertips
            </h2>
            <p className="text-base md:text-lg text-near-black/60">
              Stop guessing your business health. Connect invoices, expenses, and cash flow in one unified view.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-noble-blue flex items-center justify-center font-bold">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">Live Inflows vs. Outflows</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Monitor real-time cash flow graphs. Automatically sync customer invoice payments with scanned business expenses for live net profit calculations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">AI Narrative Financial Reports</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Receive monthly executive summaries written in plain English by Google Gemini AI, highlighting top spending categories and growth opportunities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">Aging Invoices Breakdown</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Track days sales outstanding (DSO) and identify delayed client payments across 1-15, 16-30, and 30+ day aging buckets to maintain healthy liquidity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center font-bold">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">Category Spend Analysis</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Categorize business spending automatically with AI OCR receipt scanning. View visual breakdowns for software, travel, advertising, and contractors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-near-black">Client Lifetime Value (LTV)</h3>
              <p className="text-near-black/70 text-sm leading-relaxed">
                Identify your most profitable clients. Track total historical revenue, average payment speed, and repeat purchase rates per customer.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-noble-blue text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-blue-200 font-bold">Total Clarity</span>
                <h3 className="text-2xl font-black">Master your business finances.</h3>
                <p className="text-white/80 text-sm">Eliminate cash flow surprises and make confident growth decisions.</p>
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

      {/* 4. FAQ Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5 text-noble-blue" /> FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-near-black">
              Cash Flow Analytics Questions Answered
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
          <h3 className="text-xl font-black text-near-black mb-6 text-center">Cash Flow Resources & Tools</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/features/how-to-manage-business-cash-flow" className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-noble-blue hover:shadow-md transition-all group">
              <span className="text-[10px] font-black uppercase tracking-widest text-noble-blue block mb-1">Playbook</span>
              <h4 className="font-bold text-sm text-near-black group-hover:text-noble-blue transition-colors mb-1">Manage Cash Flow</h4>
              <p className="text-xs text-slate-500">DSO reduction framework & dunning schedules.</p>
            </Link>
            <Link href="/features/invoice-tax-calculator" className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-noble-blue hover:shadow-md transition-all group">
              <span className="text-[10px] font-black uppercase tracking-widest text-noble-blue block mb-1">Interactive Tool</span>
              <h4 className="font-bold text-sm text-near-black group-hover:text-noble-blue transition-colors mb-1">Invoice Tax Calculator</h4>
              <p className="text-xs text-slate-500">Compute VAT, GST, Sales Tax & WHT.</p>
            </Link>
            <Link href="/recurring-billing-software" className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-noble-blue hover:shadow-md transition-all group">
              <span className="text-[10px] font-black uppercase tracking-widest text-noble-blue block mb-1">Product</span>
              <h4 className="font-bold text-sm text-near-black group-hover:text-noble-blue transition-colors mb-1">Recurring Billing</h4>
              <p className="text-xs text-slate-500">Automate predictable monthly cash flow.</p>
            </Link>
            <Link href="/client-portal-software" className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-noble-blue hover:shadow-md transition-all group">
              <span className="text-[10px] font-black uppercase tracking-widest text-noble-blue block mb-1">Product</span>
              <h4 className="font-bold text-sm text-near-black group-hover:text-noble-blue transition-colors mb-1">Client Portal Hub</h4>
              <p className="text-xs text-slate-500">Instant one-click online card checkout.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-near-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black">
            Take control of your business runway.
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Join thousands of small businesses and founders getting clear financial visibility with Nobevra.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="bg-[#166FBB] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-[0_12px_30px_rgba(22,111,187,0.35)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-3"
            >
              Start Free Today <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/expense-management"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center"
            >
              Expense Tracking Suite
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
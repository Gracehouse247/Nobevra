import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { BookOpen, ArrowRight, Sparkles, FileText, TrendingUp, DollarSign, Shield, Zap, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Business & Invoicing Guides — Tutorials & Financial Playbooks | Nobevra',
  description: 'Comprehensive guides, financial playbooks, and tutorials on invoicing, client retainers, cash flow management, business contracts, and global tax compliance.',
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/guides',
  },
  keywords: [
    'business guides',
    'invoicing guides',
    'freelance billing playbook',
    'cash flow management tutorial',
    'how to bill clients',
    'proforma invoice guide',
  ],
  openGraph: {
    title: 'Business & Invoicing Guides — Tutorials & Financial Playbooks | Nobevra',
    description: 'Expert-crafted guides to help small businesses, agencies, and freelancers master invoicing, cash flow, retainers, and client contracts.',
    url: 'https://nobevra.noblesworld.com.ng/guides',
    type: 'website',
  },
};

const GUIDES_COLLECTION = [
  {
    category: 'Billing & Retainers',
    items: [
      {
        href: '/features/how-to-bill-clients-on-retainer',
        title: 'How to Bill Clients on Retainer',
        desc: 'The complete agency playbook: 3 retainer models, 8 contract clauses, and pricing math.',
        badge: 'Agency Playbook',
        readTime: '8 min read',
      },
      {
        href: '/features/how-do-i-make-an-invoice',
        title: 'How to Make an Invoice (Step-by-Step)',
        desc: 'Complete 7-step guide breaking down mandatory invoice anatomy with live examples.',
        badge: 'Beginner Guide',
        readTime: '6 min read',
      },
      {
        href: '/features/how-to-make-a-proforma-invoice',
        title: 'How to Make a Proforma Invoice',
        desc: 'When to use proforma vs commercial invoices, with downloadable templates.',
        badge: 'Template Guide',
        readTime: '5 min read',
      },
      {
        href: '/features/what-is-invoicing-software',
        title: 'What is Invoicing Software?',
        desc: 'Software vs manual spreadsheets, ROI calculation, and feature comparison matrix.',
        badge: 'Comprehensive',
        readTime: '7 min read',
      },
    ],
  },
  {
    category: 'Cash Flow & Operations',
    items: [
      {
        href: '/features/how-to-manage-business-cash-flow',
        title: 'How to Manage Business Cash Flow',
        desc: 'DSO reduction framework, 5 revenue leaks, and 5-stage automated dunning schedules.',
        badge: 'Financial Playbook',
        readTime: '9 min read',
      },
      {
        href: '/features/invoice-tax-calculator',
        title: 'Global Invoice Tax Calculator Guide',
        desc: 'How VAT, GST, Sales Tax, and Reverse Charge work across 8 international jurisdictions.',
        badge: 'Interactive Tool',
        readTime: '4 min read',
      },
      {
        href: '/features/freelance-rate-calculator',
        title: 'Freelance Hourly & Retainer Rate Modeling',
        desc: 'Calculate sustainable pricing based on take-home goals, tax reserves, and overhead.',
        badge: 'Pricing Engine',
        readTime: '5 min read',
      },
      {
        href: '/features/how-to-make-an-invoice-on-my-phone',
        title: 'How to Invoice from Your Smartphone',
        desc: 'Mobile billing best practices, instant PDF generation, and client payment links.',
        badge: 'Mobile Billing',
        readTime: '4 min read',
      },
    ],
  },
  {
    category: 'Identity, QR & Networking',
    items: [
      {
        href: '/features/how-to-generate-a-qr-code',
        title: 'How to Generate Dynamic QR Codes',
        desc: 'Creating custom branded QR codes with embedded payment links and scan analytics.',
        badge: 'Identity Guide',
        readTime: '4 min read',
      },
      {
        href: '/features/how-to-create-a-business-card-for-free',
        title: 'How to Create a Digital Business Card',
        desc: 'NFC tap card setup, vCard sharing, and instant CRM lead capture.',
        badge: 'Networking',
        readTime: '5 min read',
      },
      {
        href: '/features/best-ai-invoice-generator-free',
        title: 'AI Invoice Generation Workflow',
        desc: 'Drafting client invoices from plain natural language prompts in 10 seconds.',
        badge: 'AI Tool',
        readTime: '3 min read',
      },
      {
        href: '/features/free-invoice-generator-for-shopify',
        title: 'Shopify Store Invoice Automation',
        desc: 'Syncing online orders to PDF tax invoices automatically for B2B wholesale clients.',
        badge: 'E-Commerce',
        readTime: '4 min read',
      },
    ],
  },
];

export default function GuidesHubPage() {
  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
      <BreadcrumbSchema
        pageId="guides"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Business & Invoicing Guides' },
        ]}
      />

      {/* Hero */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-6">
            <BookOpen className="w-4 h-4" />
            Knowledge & Strategy Hub
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
            Business & Invoicing <span className="text-noble-blue">Guides</span>
          </h1>
          <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-8">
            Battle-tested financial playbooks, invoicing tutorials, and operational guides designed to help founders, agencies, and freelancers scale with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/templates"
              className="px-6 py-3 bg-[#166FBB] text-white font-extrabold rounded-xl hover:opacity-90 transition-all text-sm flex items-center gap-2 shadow-md shadow-blue-500/20"
            >
              Browse Invoice Templates →
            </Link>
            <Link
              href="/glossary"
              className="px-6 py-3 bg-white border border-slate-200 text-near-black font-bold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center gap-2"
            >
              Business Glossary →
            </Link>
          </div>
        </div>
      </section>

      {/* Categorized Guides Grid */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 pb-20 space-y-16">
        {GUIDES_COLLECTION.map((cat) => (
          <div key={cat.category} className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <h2 className="text-2xl font-black text-near-black">{cat.category}</h2>
              <span className="text-xs font-bold text-slate-400">{cat.items.length} guides</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cat.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-noble-blue hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-noble-blue/10 text-noble-blue">
                        {item.badge}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">{item.readTime}</span>
                    </div>
                    <h3 className="font-black text-base text-near-black group-hover:text-noble-blue transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-black text-noble-blue">
                    Read Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Bottom Cross-Hub Callout */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <div className="bg-gradient-to-br from-[#060D1A] to-[#0D1F38] text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black mb-2">Put these guides into practice.</h2>
            <p className="text-slate-300 text-sm">
              Create professional invoices, automate retainers, and track expenses inside Nobevra — 100% free to start.
            </p>
          </div>
          <Link
            href="/register"
            className="px-8 py-4 bg-[#01A0E2] hover:bg-[#166FBB] text-white font-extrabold rounded-2xl whitespace-nowrap flex items-center gap-2 transition-all shadow-lg shadow-sky-500/25"
          >
            <Sparkles className="w-4 h-4" />
            Get Started Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

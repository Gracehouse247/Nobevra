import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FreelanceRateCalculator from '@/components/tools/FreelanceRateCalculator';
import { TrendingUp, ArrowRight, CheckCircle2, ShieldCheck, DollarSign, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Freelance Rate & Retainer Calculator — Hourly & Retainer Pricing | Nobevra',
  description: 'Free freelance rate calculator to compute your minimum hourly rate, day rate, and recurring monthly retainers based on your target net income, billable hours, and overhead.',
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/features/freelance-rate-calculator',
  },
  keywords: [
    'freelance rate calculator',
    'hourly rate calculator',
    'retainer calculator',
    'calculate freelance pricing',
    'consultant day rate calculator',
    'freelance income calculator',
  ],
  openGraph: {
    title: 'Free Freelance Rate & Retainer Calculator | Nobevra',
    description: 'Calculate your exact target hourly rate, day rate, and monthly retainer fees based on real financial modeling.',
    url: 'https://nobevra.noblesworld.com.ng/features/freelance-rate-calculator',
    type: 'website',
    images: [
      {
        url: '/images/precision-invoicing.png',
        width: 1200,
        height: 630,
        alt: 'Nobevra Free Freelance Rate & Retainer Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Freelance Rate & Retainer Calculator | Nobevra',
    description: 'Calculate your exact target hourly rate, day rate, and monthly retainers mathematically.',
    images: ['/images/precision-invoicing.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'How many billable hours should a freelancer expect per week?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Solo freelancers typically average 20 to 28 billable hours per week. The remaining 12 to 20 hours are consumed by business development, client proposals, invoicing, administrative tasks, and continuing education.',
      },
    },
    {
      '@type': 'Question',
      'name': 'How do I convert my hourly rate into a monthly retainer?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Multiply your minimum hourly rate by the agreed monthly hours (e.g. 20 hours × $125/hr = $2,500/month). Add a 10% to 20% retainer premium for priority availability or offer a minor discount if the client commits to a 6-month guaranteed contract.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Why do freelancers need to include a tax and profit reserve?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Unlike salaried employees with employer contributions, freelancers must pay self-employment taxes, healthcare, pensions, and business expenses directly. A 25% tax reserve and 15% profit buffer ensures you remain financially solvent during slow months.',
      },
    },
  ],
};

export default function FreelanceRateCalculatorPage() {
  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BreadcrumbSchema
        pageId="freelance-rate-calculator"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Tools & Features', item: 'https://nobevra.noblesworld.com.ng/features' },
          { name: 'Freelance Rate Calculator' },
        ]}
      />

      {/* Hero */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-6">
            <TrendingUp className="w-4 h-4" />
            Pricing Strategy Tool
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
            Freelance <span className="text-noble-blue">Rate & Retainer</span> Calculator
          </h1>
          <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-8">
            Stop guessing your pricing. Model your take-home goals, billable time, tax buffers, and overhead to establish your true hourly rate and retainer tiers.
          </p>
        </div>
      </section>

      {/* Calculator Interactive Engine */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 pb-16">
        <FreelanceRateCalculator />
      </section>

      {/* FAQs */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-2xl sm:text-3xl font-black text-near-black mb-6">Pricing Calculator FAQs</h2>
        <div className="space-y-4 max-w-3xl">
          {faqSchema.mainEntity.map((faq) => (
            <div key={faq.name} className="p-6 bg-white rounded-2xl border border-slate-100">
              <h3 className="text-base font-black text-near-black mb-2">{faq.name}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

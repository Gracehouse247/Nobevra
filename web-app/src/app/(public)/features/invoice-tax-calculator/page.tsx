import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import TaxCalculator from '@/components/tools/TaxCalculator';
import { Calculator, ArrowRight, ShieldCheck, Globe, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Invoice Tax Calculator — VAT, GST & Sales Tax Calculator | Nobevra',
  description: 'Free international VAT, GST, and sales tax calculator for business invoices. Calculate tax inclusive/exclusive amounts, reverse charge 0%, and withholding tax across 8 countries.',
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/features/invoice-tax-calculator',
  },
  keywords: [
    'invoice tax calculator',
    'VAT calculator',
    'GST calculator',
    'sales tax calculator',
    'reverse charge calculator',
    'calculate tax on invoice',
    'free tax calculator online',
  ],
  openGraph: {
    title: 'Free Invoice Tax Calculator — VAT, GST & Sales Tax | Nobevra',
    description: 'Calculate exact invoice taxes across UK VAT, EU Reverse Charge, US Sales Tax, Canada GST/HST, Australia GST, and Nigeria FIRS VAT.',
    url: 'https://nobevra.noblesworld.com.ng/features/invoice-tax-calculator',
    type: 'website',
    images: [
      {
        url: '/images/precision-invoicing.png',
        width: 1200,
        height: 630,
        alt: 'Nobevra Free Invoice Tax Calculator — VAT, GST, Sales Tax',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Invoice Tax Calculator | Nobevra',
    description: 'Calculate VAT, GST, Sales Tax & Reverse Charge across 8 global tax jurisdictions.',
    images: ['/images/precision-invoicing.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'What is the difference between tax-inclusive and tax-exclusive pricing?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Tax-exclusive pricing means tax is added on top of the net price (e.g. $1,000 + 20% VAT = $1,200 total). Tax-inclusive pricing means the gross price already includes the tax, so tax must be backed out (e.g. $1,200 gross with 20% VAT contains $200 VAT and $1,000 net). B2B invoices typically use tax-exclusive pricing.',
      },
    },
    {
      '@type': 'Question',
      'name': 'How does the B2B EU Reverse Charge mechanism work?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'When a VAT-registered business sells services to a VAT-registered business in another EU member state, the supplier charges 0% VAT. The buyer accounts for both input and output VAT on their local VAT return. The invoice must state "Reverse charge: Customer to account for VAT" along with the buyer\'s valid VAT number.',
      },
    },
    {
      '@type': 'Question',
      'name': 'How do I add calculated tax to my invoice in Nobevra?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Once you calculate your tax amount using this calculator, click "Create Invoice with this Tax" to instantly pre-load the exact tax rate and currency directly into Nobevra\'s Free Invoice Generator without signing up.',
      },
    },
  ],
};

export default function InvoiceTaxCalculatorPage() {
  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BreadcrumbSchema
        pageId="invoice-tax-calculator"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Tools & Features', item: 'https://nobevra.noblesworld.com.ng/features' },
          { name: 'Invoice Tax Calculator' },
        ]}
      />

      {/* Hero */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-6">
            <Calculator className="w-4 h-4" />
            Free Online Tax Tool
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
            Global Invoice <span className="text-noble-blue">Tax Calculator</span>
          </h1>
          <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-8">
            Accurately calculate VAT, GST, state sales tax, reverse charge, and withholding tax for invoices across 8 international tax jurisdictions.
          </p>
        </div>
      </section>

      {/* Calculator Interactive Engine */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 pb-16">
        <TaxCalculator />
      </section>

      {/* Educational & Compliance Details */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-2xl sm:text-3xl font-black text-near-black mb-6">How International Invoice Taxes Work</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <h3 className="font-black text-base text-near-black mb-2">VAT vs Sales Tax</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              VAT (Value Added Tax) is levied incrementally at each stage of production and distribution, allowing registered businesses to reclaim input tax. Sales tax is a single-stage consumption tax levied only on the final end-user sale.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <h3 className="font-black text-base text-near-black mb-2">Cross-Border Reverse Charge</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For B2B cross-border services within the EU or GCC, tax liability shifts from the seller to the buyer under the Reverse Charge mechanism, preventing double taxation across borders.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <h3 className="font-black text-base text-near-black mb-2">Withholding Tax (WHT)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In countries like Nigeria, corporate clients deduct 5% to 10% Withholding Tax directly from invoice payments and remit it to the tax authority as an advance income tax credit on your behalf.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-2xl sm:text-3xl font-black text-near-black mb-6">Tax Calculator FAQs</h2>
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

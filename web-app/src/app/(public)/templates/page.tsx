import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import TemplatesDirectoryClient from '@/components/templates/TemplatesDirectoryClient';
import { FileText, Globe, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { PROGRAMMATIC_TEMPLATES } from '@/lib/templates/programmaticTemplatesData';

export const metadata: Metadata = {
  title: 'Free Invoice Templates — Industry & Country Billing Templates | Nobevra',
  description: 'Download free professional invoice templates for photographers, designers, contractors, consultants, and more. Includes country-specific VAT, GST, and sales tax templates for UK, US, Canada, Australia, Nigeria, EU, UAE, and South Africa.',
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/templates',
  },
  keywords: [
    'free invoice templates',
    'photography invoice template',
    'UK VAT invoice template',
    'consultant invoice template',
    'contractor invoice template',
    'freelance invoice template',
    'Canada GST invoice template',
    'Nigeria VAT invoice template',
  ],
  openGraph: {
    title: 'Free Invoice Templates — Industry & Country Billing | Nobevra',
    description: 'Professional invoice templates for every industry and country. Includes UK VAT, US Sales Tax, Canada GST, Nigeria FIRS, UAE FTA, and 10 industry-specific templates.',
    url: 'https://nobevra.noblesworld.com.ng/templates',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Invoice Templates — Industry & Country Billing | Nobevra',
    description: 'Professional invoice templates for photographers, consultants, agencies, and more. Country-specific VAT/GST templates included.',
  },
};

export default function TemplatesHubPage() {
  const industryTemplates = PROGRAMMATIC_TEMPLATES.filter((t) => t.type === 'industry');
  const countryTemplates = PROGRAMMATIC_TEMPLATES.filter((t) => t.type === 'country');

  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
      <BreadcrumbSchema
        pageId="templates"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Free Invoice Templates' },
        ]}
      />

      {/* Hero */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-6">
            <FileText className="w-4 h-4" />
            {PROGRAMMATIC_TEMPLATES.length}+ Professional Templates
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
            Free Professional{' '}
            <span className="text-noble-blue">Invoice Templates</span>
          </h1>
          <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
            Country-specific VAT, GST, and sales tax templates. Industry-specific billing layouts for photographers, designers, contractors, consultants, and more. All free, all customizable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/free-invoice-generator"
              className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
            >
              <Sparkles className="w-4 h-4" />
              Create Invoice Free
            </Link>
            <Link
              href="/invoicing"
              className="w-full sm:w-auto px-8 py-4 bg-noble-surface border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              Invoicing Software →
            </Link>
          </div>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 pb-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-violet-50 border border-violet-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-violet-700" />
              </div>
              <div>
                <h2 className="font-black text-near-black">By Industry</h2>
                <p className="text-xs text-violet-600 font-bold">{industryTemplates.length} industry templates</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {industryTemplates.slice(0, 5).map((t) => (
                <Link key={t.slug} href={`/templates/${t.slug}`} className="text-xs font-bold text-violet-700 bg-violet-100 px-2.5 py-1 rounded-lg hover:bg-violet-200 transition-colors">
                  {t.industry?.split('&')[0].trim()}
                </Link>
              ))}
              <span className="text-xs font-bold text-violet-400 px-2.5 py-1">+{industryTemplates.length - 5} more →</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="font-black text-near-black">By Country & Tax</h2>
                <p className="text-xs text-emerald-600 font-bold">{countryTemplates.length} jurisdiction templates</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {countryTemplates.map((t) => (
                <Link key={t.slug} href={`/templates/${t.slug}`} className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg hover:bg-emerald-200 transition-colors">
                  {t.flag} {t.name.split(' ')[0]} {t.name.split(' ')[1]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Directory */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-2xl font-black text-near-black mb-8">Browse All Invoice Templates</h2>
        <TemplatesDirectoryClient />
      </section>

      {/* Internal Links */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h3 className="text-lg font-black text-near-black mb-6">Related Nobevra Tools & Guides</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: '/invoicing', label: 'Online Invoicing Software', desc: '180+ premium invoice templates' },
            { href: '/free-invoice-generator', label: 'Free Invoice Generator', desc: 'Instant PDF invoice creator' },
            { href: '/features/what-is-invoicing-software', label: 'What Is Invoicing Software?', desc: 'Complete guide & comparison' },
            { href: '/recurring-billing-software', label: 'Recurring Billing', desc: 'Automate retainer invoicing' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-noble-blue hover:shadow-md transition-all group">
              <h4 className="font-black text-sm text-near-black group-hover:text-noble-blue transition-colors mb-1">{link.label}</h4>
              <p className="text-xs text-slate-500">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

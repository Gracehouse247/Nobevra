import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
  getAllProgrammaticSlugs,
  getTemplateBySlug,
  getRelatedTemplates,
} from '@/lib/templates/programmaticTemplatesData';
import { CheckCircle2, ArrowRight, FileText, Globe, Download, Sparkles } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProgrammaticSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tpl = getTemplateBySlug(slug);
  if (!tpl) return { title: 'Template Not Found | Nobevra' };
  return {
    title: tpl.metaTitle,
    description: tpl.metaDescription,
    alternates: {
      canonical: `https://nobevra.noblesworld.com.ng/templates/${slug}`,
    },
    keywords: [tpl.name, `${tpl.name} download`, `free ${tpl.name}`, 'invoice template', 'nobevra'],
    openGraph: {
      title: tpl.metaTitle,
      description: tpl.metaDescription,
      url: `https://nobevra.noblesworld.com.ng/templates/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tpl.metaTitle,
      description: tpl.metaDescription,
    },
  };
}

export default async function ProgrammaticTemplatePage({ params }: Props) {
  const { slug } = await params;
  const tpl = getTemplateBySlug(slug);
  if (!tpl) notFound();

  const related = getRelatedTemplates(slug);

  // JSON-LD schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
      { '@type': 'ListItem', position: 2, name: 'Invoice Templates', item: 'https://nobevra.noblesworld.com.ng/templates' },
      { '@type': 'ListItem', position: 3, name: tpl.name },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': tpl.faqs.map((f) => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
    })),
  };

  const digitalDocSchema = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    'name': tpl.name,
    'description': tpl.description,
    'url': `https://nobevra.noblesworld.com.ng/templates/${slug}`,
    'encodingFormat': 'application/pdf',
    'creator': {
      '@type': 'Organization',
      'name': 'Nobevra',
      'url': 'https://nobevra.noblesworld.com.ng',
    },
    'license': 'https://creativecommons.org/licenses/by/4.0/',
    'isAccessibleForFree': true,
  };

  // Calculate sample total
  const sampleNet = tpl.sampleLineItems.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const sampleTax = (sampleNet * tpl.taxRate) / 100;
  const sampleGross = sampleNet + sampleTax;

  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(digitalDocSchema) }} />

      {/* Hero */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 md:py-20">
        <div className="mb-4">
          <Link href="/templates" className="text-xs font-bold text-noble-blue hover:underline">
            ← Back to All Templates
          </Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {tpl.flag && <span className="text-3xl">{tpl.flag}</span>}
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                tpl.type === 'industry' ? 'bg-violet-50 text-violet-700' : 'bg-emerald-50 text-emerald-700'
              }`}>
                {tpl.type === 'industry' ? tpl.industry : `${tpl.taxLabel}`}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-4 leading-[1.1]">
              {tpl.headline}
            </h1>
            <p className="text-lg text-near-black/60 leading-relaxed mb-8">{tpl.description}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/free-invoice-generator?template=${tpl.matchingTemplateId}&currency=${tpl.currency}&taxRate=${tpl.taxRate}`}
                className="px-7 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Sparkles className="w-4 h-4" />
                Use This Template Free
              </Link>
              <Link
                href="/invoicing"
                className="px-7 py-4 bg-white border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                Learn About Invoicing →
              </Link>
            </div>
          </div>

          {/* Right: Sample Invoice Preview Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sample Invoice Preview</p>
                <p className="text-sm font-black text-near-black mt-0.5">{tpl.name}</p>
              </div>
              <span className="text-lg font-black text-noble-blue">{tpl.currencySymbol}</span>
            </div>

            {/* Sample Line Items */}
            <div className="space-y-2">
              {tpl.sampleLineItems.map((item, i) => (
                <div key={i} className="flex justify-between items-start text-sm py-2 border-b border-slate-50">
                  <div className="flex-1 pr-4">
                    <span className="font-bold text-near-black text-xs">{item.name}</span>
                    {item.qty > 1 && item.rate > 0 && (
                      <span className="text-[10px] text-slate-400 block">{item.qty} × {tpl.currencySymbol}{Math.abs(item.rate).toLocaleString()}</span>
                    )}
                  </div>
                  <span className={`font-black text-xs whitespace-nowrap ${
                    item.rate < 0 ? 'text-red-500' : 'text-near-black'
                  }`}>
                    {item.rate < 0 ? '-' : ''}{tpl.currencySymbol}{Math.abs(item.qty * item.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-bold">Subtotal</span>
                <span className="font-bold">{tpl.currencySymbol}{sampleNet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              {tpl.taxRate > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold">{tpl.taxLabel} ({tpl.taxRate}%)</span>
                  <span className="font-bold text-noble-blue">{tpl.currencySymbol}{sampleTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between text-base pt-2 border-t border-slate-200">
                <span className="font-black">Total Due</span>
                <span className="font-black text-near-black">{tpl.currencySymbol}{sampleGross.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Fields Checklist */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-2xl font-black text-near-black mb-6">Mandatory Invoice Fields</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {tpl.mandatoryFields.map((field) => (
            <div key={field} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-noble-blue shrink-0 mt-0.5" />
              <span className="text-sm font-bold text-near-black">{field}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      {tpl.faqs.length > 0 && (
        <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
          <h2 className="text-2xl font-black text-near-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl">
            {tpl.faqs.map((faq) => (
              <div key={faq.q} className="p-6 bg-white rounded-2xl border border-slate-100">
                <h3 className="text-base font-black text-near-black mb-3">{faq.q}</h3>
                <p className="text-sm text-near-black/70 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Templates */}
      {related.length > 0 && (
        <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
          <h2 className="text-2xl font-black text-near-black mb-6">Related Templates</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/templates/${r.slug}`} className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-noble-blue hover:shadow-md transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  {r.flag && <span className="text-xl">{r.flag}</span>}
                  <span className="text-xs font-black text-near-black/50">{r.type === 'industry' ? r.industry?.split('&')[0] : r.taxLabel}</span>
                </div>
                <h3 className="font-black text-sm text-near-black group-hover:text-noble-blue transition-colors mb-1">{r.name}</h3>
                <span className="text-xs text-noble-blue font-bold flex items-center gap-1">View Template <ArrowRight className="w-3 h-3" /></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <div className="bg-gradient-to-br from-[#060D1A] to-[#0D1F38] text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black mb-2">Ready to invoice professionally?</h2>
            <p className="text-slate-300 text-sm">Use this template and 180+ more inside Nobevra — no credit card required.</p>
          </div>
          <Link
            href="/register"
            className="px-8 py-4 bg-[#01A0E2] hover:bg-[#166FBB] text-white font-extrabold rounded-2xl whitespace-nowrap flex items-center gap-2 transition-all shadow-lg shadow-sky-500/25"
          >
            <Sparkles className="w-4 h-4" />
            Start Free — No Card Needed
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

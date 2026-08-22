import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SEO_FEATURES } from '@/lib/seoData';
import Link from 'next/link';
import { Palette, CreditCard, Eye, Crown, Download, Shield, Smartphone, Zap, BarChart3, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const iconMap: Record<string, any> = {
  Palette, CreditCard, Eye, Crown, Download, Shield, Smartphone, Zap, BarChart3
};

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400; // 24 hours

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = SEO_FEATURES[slug];
  if (!feature) return { title: 'Not Found' };

  return {
    title: feature.title,
    description: feature.metaDescription,
    keywords: [feature.primaryKeyword, 'Nobevra', 'invoicing software'],
    openGraph: {
      title: feature.title,
      description: feature.metaDescription,
      images: [feature.hero.image],
    }
  };
}

export default async function FeatureSEOPage({ params }: Props) {
  const { slug } = await params;
  const feature = SEO_FEATURES[slug];
  
  if (!feature) {
    notFound();
  }

  // Generate Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nobevra",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": feature.title,
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": feature.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      
      {/* 1. Hero Section (High Intent) */}
      <section className="pt-32 pb-20 px-4 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest border border-noble-blue/5">
            <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
            Nobevra Feature
          </div>
          <h1 className="text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-slate-900" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            {feature.hero.headline}
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
            {feature.hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
                href="/register"
                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: '#166FBB' }}
            >
                <span className="capitalize">{feature.hero.ctaText.toLowerCase()}</span>
            </Link>
            <Link 
                href="/pricing"
                className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
            >
                View Pricing
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-gradient-to-br from-[#e0f5f5] to-emerald-50 rounded-[40px] shadow-2xl overflow-hidden border border-white">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold text-sm">
              [Product Interface Visualization]
              {/* In production, this would be an actual next/image component using feature.hero.image */}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Benefits Section (Transformation focus) */}
      <section className="py-24 bg-white px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              {feature.hero.headline} — Deep Dive
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
              We focus on giving you back your time and accelerating your cash flow.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {feature.benefits.map((benefit, idx) => {
              const Icon = iconMap[benefit.icon] || CheckCircle2;
              return (
                <div key={idx} className="p-8 rounded-[32px] bg-[#F8FAFC] border border-slate-100 hover:shadow-xl hover:border-noble-blue/20 transition-all group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-noble-blue shadow-sm mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-3" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Social Proof */}
      <section className="py-24 bg-noble-blue text-white px-4 md:px-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {feature.socialProof.map((proof, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex justify-center text-amber-400 gap-1">
                {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
              </div>
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed italic">
                "{proof.quote}"
              </blockquote>
              <div>
                <p className="font-black text-lg tracking-wide">{proof.author}</p>
                <p className="text-blue-200 font-bold text-sm tracking-widest uppercase mt-1">{proof.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SEO FAQ Section */}
      <section className="py-24 bg-white px-4 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 mb-4" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 font-medium">Everything you need to know about our {feature.primaryKeyword}.</p>
          </div>
          <div className="space-y-6">
            {feature.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="text-xl font-black tracking-tight text-slate-900 mb-2">{faq.question}</h4>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-20 bg-[#F8FAFC] px-4 md:px-16 text-center border-t border-slate-100">
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 mb-8" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            Ready to streamline your workflow?
          </h2>
        <Link 
            href="/register"
            className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all inline-flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: '#166FBB' }}
        >
            <span className="capitalize">{feature.hero.ctaText.toLowerCase()}</span>
        </Link>
        </div>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  const existingPhysicalFolders = [
    'ai-invoice-generator',
    'how-to-make-an-invoice-for-free',
    'billing-software-online',
    'digital-business-cards',
    'crm-engine',
    'shopify-invoice-generator',
    'best-free-invoice-app',
    'how-to-generate-a-qr-code',
    'how-to-make-an-invoice-on-my-phone',
    'products-services',
    'lead-intelligence',
    'growth-reports'
  ];

  return Object.keys(SEO_FEATURES)
    .filter((slug) => !existingPhysicalFolders.includes(slug))
    .map((slug) => ({
      slug: slug,
    }));
}

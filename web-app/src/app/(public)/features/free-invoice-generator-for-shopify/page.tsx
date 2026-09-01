import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

import Image from 'next/image';
import {
    ArrowRight,
    CheckCircle2,
    TrendingDown,
    TrendingUp,
    Clock,
    Zap,
    FileText,
    Smartphone,
    CreditCard,
    ShieldCheck,
    Star,
    Globe,
    Users,
    AlertCircle,
    X,
    Check,
    Building2,
    Package,
    Wrench,
    PlayCircle
} from 'lucide-react';
import Footer from '@/components/shared/Footer';

/* ─────────────────────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
    title: 'Free Invoice Generator for Shopify — B2B PDF Invoices & QR Codes | Nobevra',
    description: 'Create compliant B2B PDF invoices for Shopify orders with Nobevra. Free invoice generator with automatic order sync, Apple Pay QR codes, and custom branding.',
    keywords: [
        'invoice generator shopify',
        'free invoice generator shopify',
        'shopify invoice generator app',
        'shopify invoice for customer',
        'online invoice generator shopify',
        'best invoice generator shopify',
        'shopify invoice template',
        'invoice generator shopify reddit',
        'shopify b2b invoice',
        'shopify invoice with payment link',
        'shopify qr code invoice',
        'shopify wholesale invoice',
    ],
    openGraph: {
        title: 'Free Invoice Generator for Shopify | Nobevra',
        description: 'Embed Apple Pay & Google Pay QR codes in your Shopify invoices. Get paid in 2.4 days instead of 14.',
        url: 'https://nobevra.noblesworld.com.ng/features/free-invoice-generator-for-shopify',
        type: 'website',
        images: [
            {
                url: '/images/precision-invoicing.png',
                width: 1200,
                height: 630,
                alt: 'Nobevra Free Invoice Generator for Shopify & B2B Orders',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Invoice Generator for Shopify | Nobevra',
        description: 'Automate B2B invoice generation directly from Shopify orders with payment QR codes and custom branding.',
        images: ['/images/precision-invoicing.png'],
    },
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/features/free-invoice-generator-for-shopify' },
};

/* ─────────────────────────────────────────────────────────────
   JSON-LD — FAQ Schema (wins People Also Ask SERP feature)
───────────────────────────────────────────────────────────── */
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Is Nobevra free?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Our core invoicing platform is completely free to use. You only pay standard processing fees when a client uses our integrated QR payment gateway to pay you. There are no monthly subscription fees for the base invoicing features.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I customize my Shopify invoice template?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Absolutely. Nobevra lets you add your brand colors, custom logo, business registration number, tax ID, payment terms, and custom line items. Every invoice is fully white-labeled so clients see your brand, not ours.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do QR payment links expire?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Nobevra creates permanent payment links. The QR code on your invoice remains valid and scannable until the specific invoice is settled in full, at which point it is automatically marked as paid in your dashboard.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does Nobevra work for B2C stores?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'While Nobevra works perfectly for any transaction, it is explicitly designed for B2B, wholesale, and high-ticket sellers who need to send a formal invoice requesting payment. If you only do standard B2C storefront checkout where customers pay instantly on Shopify, you likely don\'t need dedicated invoicing software.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is Nobevra compliant with EU VAT and GST requirements?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Nobevra invoice templates are designed to include all fields required for tax compliance including VAT number, GST registration, business registration ID, itemized tax breakdowns, and invoice numbering sequences.',
            },
        },
    ],
};

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
type FeatureComparisonItem = {
    feature: string;
    noble: boolean | 'partial';
    vify: boolean | 'partial';
    orderPrinter: boolean | 'partial';
    avada: boolean | 'partial';
};

const featureComparison: FeatureComparisonItem[] = [
    {
        feature: 'QR Payment Links in PDF',
        noble: true,
        vify: false,
        orderPrinter: false,
        avada: false,
    },
    {
        feature: 'Apple Pay / Google Pay',
        noble: true,
        vify: false,
        orderPrinter: false,
        avada: false,
    },
    {
        feature: 'Free plan',
        noble: true,
        vify: true,
        orderPrinter: true,
        avada: true,
    },
    {
        feature: 'B2B wholesale invoices',
        noble: true,
        vify: 'partial',
        orderPrinter: 'partial',
        avada: false,
    },
    {
        feature: 'Auto-reconciliation',
        noble: true,
        vify: false,
        orderPrinter: false,
        avada: false,
    },
];

const faqs = faqSchema.mainEntity;

const testimonials = [
    {
        quote: "We were manually exporting Shopify orders to spreadsheets to generate wholesale invoices. Switching to Nobevra completely automated the workflow. Our wholesale clients now scan the QR code and pay instantly.",
        name: 'Ayasha Khan',
        role: 'Marketing Director, NobleMart',
        image: '/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png',
        stars: 5,
        metric: '5× faster',
        metricLabel: 'B2B payment collection',
    },
    {
        quote: "Our EU clients require proper VAT invoices, not just receipts. Nobevra handles that automatically and the QR code payment link means I get paid the same week I send the invoice, not next month.",
        name: 'Beautrice Moreau',
        role: 'Operations Manager, Eagles Media',
        image: '/images/reviews/beautrice-moreau-operations-manager-at-eagles-media.png',
        stars: 5,
        metric: '€0',
        metricLabel: 'invoice disputes since switching',
    },
    {
        quote: "I run a Shopify store for custom manufacturing orders. Every order is different and requires a quote and formal invoice. Nobevra is the only tool that handles this workflow AND collects the payment.",
        name: 'David Okafor',
        role: 'Finance Lead, Spire Builds',
        image: '/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png',
        stars: 5,
        metric: '6 hrs/week',
        metricLabel: 'saved on manual invoicing',
    },
];

/* ─────────────────────────────────────────────────────────────
   HELPER COMPONENTS
───────────────────────────────────────────────────────────── */
function ComparisonCell({ value }: { value: boolean | 'partial' }) {
    if (value === true) return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    if (value === 'partial') return <span className="text-yellow-500 font-bold text-xs mx-auto block text-center">Partial</span>;
    return <X className="w-5 h-5 text-slate-300 mx-auto" />;
}

/* ─────────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────────── */
export default function ShopifyInvoiceGeneratorPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased selection:bg-electric-cyan/30 overflow-x-hidden pt-[118px]">

            {/* ── JSON-LD Schema ── */}
            <script
                id="faq-schema-shopify-invoice"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />



            {/* ══════════════════════════════════════════════════════
                SECTION 1 — HERO
            ══════════════════════════════════════════════════════ */}
            <section className="relative pt-10 pb-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                    {/* Left Text */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6 border border-near-black/5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Best Free Invoice Generator Shopify
                        </div>

                        <h1 className="font-inter text-near-black mb-6 text-[34px] md:text-[52px] lg:text-[58px] leading-[1.05] tracking-tight font-black">
                            Free Invoice Generator for Shopify | Nobevra
                        </h1>

                        <p className="text-near-black/60 mb-8 leading-relaxed text-lg max-w-xl mx-auto lg:mx-0">
                            Sending a generic Shopify invoice template is costing you cash flow.
                            Nobevra generates automated, professional invoices that embed{' '}
                            <strong className="text-near-black">Apple Pay and Google Pay QR codes</strong>{' '}
                            directly onto the PDF — so B2B clients pay in minutes, not weeks.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                            <Link
                                href="/register"
                                id="hero-cta-shopify-invoice"
                                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 bg-[#166FBB]"
                            >
                                Start Free Today
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="px-10 py-5 text-base font-extrabold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue/30 hover:text-noble-blue transition-all flex items-center justify-center gap-3"
                            >
                                See How It Works
                            </Link>
                        </div>
                    </div>

                    {/* 3. Hero Product Screenshot */}
                    <div className="relative hidden lg:block group">
                        <div className="absolute inset-0 bg-gradient-to-br from-noble-blue/20 to-electric-cyan/10 rounded-[40px] blur-3xl transition-opacity group-hover:opacity-70" />
                        <div className="relative rounded-[32px] border-4 border-white shadow-2xl overflow-hidden transform transition-transform group-hover:-translate-y-2">
                            <Image 
                                src="/images/product and service.png" 
                                alt="free invoice generator shopify" 
                                width={800} 
                                height={600} 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 2 — WHAT IS A SHOPIFY INVOICE GENERATOR?
            ══════════════════════════════════════════════════════ */}
            <section className="py-20 bg-white relative" id="what-is">
                <div className="max-w-[1000px] mx-auto px-4 md:px-16">
                    <h2 className="font-inter text-3xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-8 text-center">
                        What is a Shopify Invoice Generator?
                    </h2>

                    <div className="text-base md:text-lg text-near-black/65 space-y-5 leading-relaxed mb-14 text-center max-w-3xl mx-auto">
                        <p>
                            A <strong className="text-near-black">Shopify invoice generator</strong> is a tool — either a built-in feature or a third-party app — that automatically creates professional invoices for your Shopify orders. It pulls order data directly from your store (customer details, line items, taxes, shipping costs) and formats it into a clean, branded invoice document that you can send to customers, download as a PDF, or store for accounting purposes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* H3: How it differs */}
                        <div className="bg-[#F8FAFC] rounded-[24px] p-8 border border-slate-100">
                            <h3 className="font-black text-xl text-near-black mb-4 flex items-center gap-2">
                                <AlertCircle className="w-6 h-6 text-amber-500" />
                                How it differs from a standard Shopify receipt
                            </h3>
                            <p className="text-sm text-near-black/70 leading-relaxed mb-4">
                                The default Shopify order confirmation email is designed for consumer checkout flows — it is essentially a receipt, not a formal invoice. It confirms payment was received but lacks formal payment terms, tax ID fields, and a mechanism to collect unpaid balances.
                            </p>
                            <ul className="space-y-3 text-sm text-near-black/60">
                                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Consumer-facing format only</li>
                                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> No tax ID or registration fields</li>
                                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Not legally valid as a VAT invoice</li>
                            </ul>
                        </div>

                        {/* H3: Who needs it */}
                        <div className="bg-noble-blue/5 rounded-[24px] p-8 border border-noble-blue/15">
                            <h3 className="font-black text-xl text-near-black mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-noble-blue" />
                                Who needs dedicated invoice software on Shopify?
                            </h3>
                            <p className="text-sm text-near-black/70 leading-relaxed mb-4">
                                For wholesale buyers, international clients, or any business customer, a proper invoice is both professionally expected and legally required. You need an invoice generator if you are:
                            </p>
                            <ul className="space-y-3 text-sm text-near-black/70 font-medium">
                                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-noble-blue shrink-0 mt-0.5" /> <strong className="text-near-black">B2B Shopify merchants</strong></li>
                                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-noble-blue shrink-0 mt-0.5" /> <strong className="text-near-black">Wholesale/dropshippers</strong></li>
                                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-noble-blue shrink-0 mt-0.5" /> <strong className="text-near-black">EU merchants needing VAT invoices</strong></li>
                                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-noble-blue shrink-0 mt-0.5" /> <strong className="text-near-black">Service-based Shopify sellers</strong></li>
                                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-noble-blue shrink-0 mt-0.5" /> <strong className="text-near-black">High-ticket item sellers</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 3 — WHY MOST SOLUTIONS FALL SHORT
            ══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <h2 className="font-inter text-3xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-14 text-center">
                        Why Most Shopify Invoice Solutions Fall Short for B2B
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-black text-2xl text-near-black mb-3">The problem with static PDF invoices</h3>
                                <p className="text-near-black/70 leading-relaxed">
                                    Generic online invoice generator Shopify apps — like Vify, Order Printer Pro, or Avada — solve the document problem. They generate beautiful PDFs. But they do not solve the payment problem. Your client receives a static document, downloads it, forwards it to their finance team, who logs into a banking portal, manually copies your account details, and initiates a wire transfer.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="font-black text-2xl text-near-black mb-3">Why cash flow suffers with standard Shopify invoicing</h3>
                                <p className="text-near-black/70 leading-relaxed mb-4">
                                    This multi-step friction is the sole reason average B2B invoice settlement times hover around <strong className="text-near-black">14 days</strong>. Every one of those 14 days represents real cash sitting in your client's account instead of yours.
                                </p>
                                {/* 6. Statistics */}
                                <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
                                    <div className="flex items-center gap-3"><TrendingDown className="w-5 h-5 text-red-500 shrink-0" /><span className="text-sm font-medium">"Average B2B invoice takes 14.3 days to settle via bank transfer"</span></div>
                                    <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-amber-500 shrink-0" /><span className="text-sm font-medium">"Shopify merchants lose 6 hours/week on manual invoice chasing"</span></div>
                                    <div className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-red-500 shrink-0" /><span className="text-sm font-medium">"45% of late payments are due to friction in the payment process"</span></div>
                                    <div className="flex items-center gap-3"><TrendingUp className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm font-medium">"Businesses using digital invoices with payment links get paid 3x faster"</span></div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Mid-page dashboard screenshot */}
                        <div className="relative rounded-[24px] border-4 border-white shadow-xl overflow-hidden">
                            <Image 
                                src="/images/dashboard-desktop.png" 
                                alt="Nobevra dashboard interface showing invoice tracking" 
                                width={800} 
                                height={600} 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 4 — HOW NOBEVRA WORKS
            ══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-near-black text-white relative overflow-hidden" id="how-it-works">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-noble-blue/15 blur-[140px] rounded-full pointer-events-none" />
                <div className="max-w-[1200px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
                            How Nobevra Works as Your{' '}
                            <span className="text-electric-cyan">Shopify Invoice Generator</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: 'Step 1',
                                title: 'Connect your Shopify store',
                                desc: 'Link Nobevra to your Shopify store in one click. Your order data, customer details, and product line items sync automatically.',
                                img: '/images/app-step-1.png'
                            },
                            {
                                step: 'Step 2',
                                title: 'Generate a professional invoice in 60 seconds',
                                desc: 'Select an order or create a custom quote. Choose your branded template, add payment terms, and generate instantly.',
                                img: '/images/app-step-2.png'
                            },
                            {
                                step: 'Step 3',
                                title: 'Embed QR payment link automatically',
                                desc: 'Our system automatically attaches a secure Apple Pay / Google Pay QR code to the PDF. Zero code required.',
                                img: '/images/app-step-3.png'
                            },
                            {
                                step: 'Step 4',
                                title: 'Client scans and pays instantly',
                                desc: 'Your client scans the QR code with their phone camera, approves payment via FaceID, and funds hit your account.',
                                img: '/images/app-ui-dashboard.png'
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded-[24px] p-6 flex flex-col h-full">
                                <div className="text-electric-cyan text-sm font-bold uppercase tracking-widest mb-2">{item.step}</div>
                                <h3 className="text-lg font-black text-white mb-3">{item.title}</h3>
                                <p className="text-white/55 text-sm leading-relaxed mb-6 flex-1">{item.desc}</p>
                                <div className="rounded-xl overflow-hidden border border-white/10 h-32 relative">
                                    <Image src={item.img} alt={item.title} fill className="object-cover object-top" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 5 — KEY FEATURES
            ══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white relative">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-14 text-center">
                        Key Features of Nobevra vs Standard Shopify Invoicing
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: <CreditCard className="w-6 h-6 text-noble-blue" />,
                                    title: 'QR payment-embedded invoices',
                                    desc: '(unique to Nobevra). The only Shopify invoice tool that embeds Apple Pay and Google Pay QR codes directly onto the PDF. They scan and pay in two taps.',
                                },
                                {
                                    icon: <FileText className="w-6 h-6 text-noble-blue" />,
                                    title: 'B2B wholesale invoice templates',
                                    desc: 'Professional, fully branded templates. Add your logo, brand colors, business registration number, VAT ID, and custom payment terms.',
                                },
                                {
                                    icon: <Zap className="w-6 h-6 text-noble-blue" />,
                                    title: 'Automated reconciliation',
                                    desc: 'The moment a client pays via QR code, the invoice automatically marks as paid in your dashboard. Zero manual bookkeeping.',
                                },
                                {
                                    icon: <Globe className="w-6 h-6 text-noble-blue" />,
                                    title: 'Multi-currency global settlements',
                                    desc: 'Generate invoices in USD, EUR, GBP, AUD, and 130+ currencies. Tax fields for VAT, GST, and local requirements auto-populate.',
                                },
                            ].map((feat, i) => (
                                <div key={i} className="rounded-[24px] p-6 bg-[#F8FAFC] border border-slate-100">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 border border-slate-100">
                                        {feat.icon}
                                    </div>
                                    <h3 className="text-base font-black text-near-black mb-2">{feat.title}</h3>
                                    <p className="text-near-black/60 text-xs leading-relaxed">{feat.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="relative rounded-[32px] border-4 border-white shadow-xl overflow-hidden bg-slate-50">
                            <Image 
                                src="/images/invoice-templates-showcase.png" 
                                alt="Nobevra templates showcase" 
                                width={800} 
                                height={600} 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 6 — COMPETITOR COMPARISON
            ══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-[1100px] mx-auto px-4 md:px-16">
                    <h2 className="font-inter text-3xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-14 text-center">
                        How Nobevra Compares to Other Shopify Invoice Generators
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 mb-14">
                        <div className="bg-white rounded-[24px] p-6 border border-slate-200">
                            <h3 className="font-black text-lg text-near-black mb-3">Nobevra vs Vify Order Printer</h3>
                            <p className="text-near-black/65 text-sm leading-relaxed">
                                Vify focuses heavily on printing physical documents and receipts for standard orders. Nobevra focuses on the digital collection process for B2B and high-ticket orders with embedded digital payment links.
                            </p>
                        </div>
                        <div className="bg-white rounded-[24px] p-6 border border-slate-200">
                            <h3 className="font-black text-lg text-near-black mb-3">Nobevra vs Order Printer Pro</h3>
                            <p className="text-near-black/65 text-sm leading-relaxed">
                                Order Printer Pro requires you to customize HTML/Liquid templates manually which is powerful but complex. Nobevra provides beautiful, converting templates out of the box with zero coding.
                            </p>
                        </div>
                        <div className="bg-white rounded-[24px] p-6 border border-slate-200">
                            <h3 className="font-black text-lg text-near-black mb-3">Nobevra vs Avada Invoice PDF</h3>
                            <p className="text-near-black/65 text-sm leading-relaxed">
                                Avada provides simple PDF generation. Nobevra provides PDF generation plus a fully integrated payment collection engine, transforming your static PDF into a checkout terminal.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="text-left p-5 font-black text-near-black text-sm w-[35%]">Feature</th>
                                        <th className="p-5 text-center bg-noble-blue/5 border-l border-r border-noble-blue/10">
                                            <div className="font-black text-noble-blue text-sm">Nobevra</div>
                                            <div className="text-[10px] text-noble-blue/60 font-bold uppercase tracking-widest">Recommended</div>
                                        </th>
                                        <th className="p-5 text-center">
                                            <div className="font-bold text-near-black/60 text-sm">Vify</div>
                                        </th>
                                        <th className="p-5 text-center">
                                            <div className="font-bold text-near-black/60 text-sm">Order Printer Pro</div>
                                        </th>
                                        <th className="p-5 text-center">
                                            <div className="font-bold text-near-black/60 text-sm">Avada</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {featureComparison.map((row, i) => (
                                        <tr key={i} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                                            <td className="p-4 font-bold text-near-black/80 text-sm">{row.feature}</td>
                                            <td className="p-4 text-center bg-noble-blue/3 border-l border-r border-noble-blue/8">
                                                <ComparisonCell value={row.noble} />
                                            </td>
                                            <td className="p-4 text-center"><ComparisonCell value={row.vify} /></td>
                                            <td className="p-4 text-center"><ComparisonCell value={row.orderPrinter} /></td>
                                            <td className="p-4 text-center"><ComparisonCell value={row.avada} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 7 — VIDEO EMBED PLACEHOLDER
            ══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white relative">
                <div className="max-w-[1000px] mx-auto px-4 md:px-16 text-center">
                    <h2 className="font-inter text-3xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-8">
                        See Nobevra in Action
                    </h2>
                    <p className="text-lg text-near-black/65 leading-relaxed max-w-3xl mx-auto mb-12">
                        Watch our 2-minute walkthrough to see exactly how you can connect your Shopify store and generate a payment-ready invoice.
                    </p>
                    <div className="aspect-video bg-slate-900 rounded-[32px] border-8 border-slate-100 shadow-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                        <Image src="/images/dashboard-desktop.png" alt="Video thumbnail" fill className="object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                            <PlayCircle className="w-10 h-10 text-white" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 8 — TESTIMONIALS
            ══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-[1100px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-14">
                        <h2 className="font-inter text-3xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-4">
                            Shopify Merchants Who{' '}
                            <span className="text-noble-blue">Switched to Nobevra.</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white rounded-[28px] border border-slate-100 p-8 hover:shadow-lg hover:border-noble-blue/20 transition-all flex flex-col">
                                <div className="flex gap-1 mb-5">
                                    {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                                </div>
                                <p className="text-near-black/70 text-sm leading-relaxed italic flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                        <Image src={t.image} alt={t.name} width={40} height={40} className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <div className="font-black text-near-black text-sm">{t.name}</div>
                                        <div className="text-[10px] text-near-black/50 font-bold uppercase tracking-widest">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 9 — FAQ
            ══════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white relative" id="faq">
                <div className="max-w-[800px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-14">
                        <h2 className="font-inter text-3xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight">
                            Shopify Invoice Generator Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-[#F8FAFC] rounded-[20px] p-6 border border-slate-100"
                                itemScope
                                itemProp="mainEntity"
                                itemType="https://schema.org/Question"
                            >
                                <h3 className="text-base font-black text-near-black mb-3" itemProp="name">{faq.name}</h3>
                                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                    <p className="text-near-black/65 text-sm leading-relaxed" itemProp="text">
                                        {faq.acceptedAnswer.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 10 — INTERNAL LINKS
            ══════════════════════════════════════════════════════ */}
            <section className="py-20 bg-[#F8FAFC] border-t border-slate-100">
                <div className="max-w-[1100px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-12">
                        <h2 className="font-inter text-2xl md:text-4xl font-black text-near-black leading-tight mb-3">
                            Related Guides & Tools
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'How to invoice wholesale customers on Shopify', href: '/blog/how-to-invoice-wholesale-customers-on-shopify', icon: <FileText className="w-5 h-5" /> },
                            { label: 'B2B invoicing best practices', href: '/blog/b2b-invoicing-best-practices', icon: <Users className="w-5 h-5" /> },
                            { label: 'How to reduce invoice payment times', href: '/blog/how-to-reduce-invoice-payment-times', icon: <TrendingDown className="w-5 h-5" /> },
                            { label: 'QR Code Generator', href: '/features/how-to-generate-a-qr-code', icon: <CreditCard className="w-5 h-5" /> },
                        ].map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-3 hover:border-noble-blue/20 hover:shadow-sm transition-all group"
                            >
                                <div className="w-9 h-9 rounded-xl bg-noble-blue/8 flex items-center justify-center text-noble-blue shrink-0 group-hover:bg-noble-blue/15 transition-colors">
                                    {link.icon}
                                </div>
                                <span className="text-sm font-bold text-near-black/70 group-hover:text-noble-blue transition-colors leading-tight">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SECTION 11 — FINAL CTA
            ══════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-32 bg-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                        The Best Shopify Invoice Generator{' '}
                        <span className="text-noble-blue">That Pays You Back.</span>
                    </h2>
                    <p className="text-lg text-near-black/60 mb-10 leading-relaxed">
                        Join growing Shopify businesses that have replaced manual invoicing with QR-powered payment collection. Get paid in 2.4 days, not 14.
                    </p>
                    <Link
                        href="/register"
                        id="final-cta-shopify-invoice"
                        className="text-white px-12 py-6 text-lg font-extrabold rounded-2xl hover:opacity-90 transition-all inline-flex items-center justify-center gap-3 shadow-[0_20px_60px_rgba(22,111,187,0.35)] hover:scale-[1.02] active:scale-95 bg-[#166FBB]"
                    >
                        Create Your First Shopify Invoice Free
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}

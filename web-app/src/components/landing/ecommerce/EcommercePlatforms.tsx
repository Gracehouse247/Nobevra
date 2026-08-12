import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const platforms = [
    {
        name: 'Shopify',
        emoji: '🛍️',
        bg: 'bg-green-50 border-green-200',
        badge: 'text-green-700 bg-green-100',
        features: [
            'Auto-invoice on every fulfilled order',
            'Branded PDF sent to buyer instantly',
            'B2B wholesale tier pricing support',
            'Works with Shopify Plus & multi-location',
        ],
    },
    {
        name: 'WooCommerce',
        emoji: '🔌',
        bg: 'bg-purple-50 border-purple-200',
        badge: 'text-purple-700 bg-purple-100',
        features: [
            'Status-triggered invoice generation',
            'Customer self-service download (My Account)',
            'Multi-tax & global shipping support',
            'PDF Invoices & Packing Slips compatible',
        ],
    },
    {
        name: 'B2B Wholesale',
        emoji: '🏭',
        bg: 'bg-blue-50 border-blue-200',
        badge: 'text-noble-blue bg-noble-blue/10',
        features: [
            'Net 30 / 60 / 90 payment terms',
            'PO numbers & VAT/Tax ID fields',
            'Bulk generation for distribution runs',
            'AR aging dashboard for overdue accounts',
        ],
    },
    {
        name: 'Custom API',
        emoji: '⚙️',
        bg: 'bg-slate-50 border-noble-border',
        badge: 'text-slate-700 bg-slate-100',
        features: [
            'RESTful API for custom integrations',
            'Webhooks for real-time order events',
            'Headless commerce & marketplace support',
            'Works with any backend or OMS',
        ],
    },
];

export default function EcommercePlatforms() {
    return (
        <section className="py-24 md:py-32 bg-[#F8FAFC] border-t border-slate-100" aria-labelledby="platforms-heading">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 id="platforms-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                        Works with your store, whatever platform it runs on.
                    </h2>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        From a Shopify invoice generator to a WooCommerce invoice plugin to a custom API integration — one platform covers every channel.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {platforms.map(p => (
                        <div key={p.name} className={`rounded-[28px] border p-7 ${p.bg} hover:shadow-lg transition-all hover:-translate-y-1`}>
                            <div className="text-3xl mb-4">{p.emoji}</div>
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 ${p.badge}`}>{p.name}</span>
                            <ul className="space-y-3 mt-2">
                                {p.features.map(feat => (
                                    <li key={feat} className="flex items-start gap-2 text-sm text-slate-700 font-medium leading-snug">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{feat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/register" className="inline-flex items-center gap-3 text-white bg-[#166FBB] px-10 py-5 text-base font-extrabold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(22,111,187,0.3)]">
                        Connect your store <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

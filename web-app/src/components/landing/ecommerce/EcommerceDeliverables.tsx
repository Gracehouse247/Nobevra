import React from 'react';
import { ShoppingCart, Package, Globe, TrendingUp, FileText, Bell, CheckCircle2 } from 'lucide-react';

const features = [
    {
        icon: ShoppingCart,
        title: 'Shopify invoice generator',
        tag: 'Shopify Integration',
        desc: 'Connect your Shopify store in under 5 minutes. Every fulfilled order triggers an automatic, fully branded PDF invoice — sent to your buyer before they even close the confirmation page. Supports B2B wholesale workflows, custom metafields, and multi-location stores.',
        bullets: ['Auto-invoice on every order', 'Custom branded PDF templates', 'B2B wholesale tier support'],
        color: 'bg-green-500/10 text-green-600 group-hover:bg-green-500 group-hover:text-white',
    },
    {
        icon: Package,
        title: 'Bulk order billing tool',
        tag: 'Wholesale Invoicing Software',
        desc: 'Selling to distributors or wholesale buyers? Generate invoices for 500 orders in a single batch. Our bulk order billing tool processes every line item, applies your wholesale pricing tiers, and emails each buyer their individual invoice — all in one click.',
        bullets: ['Batch generate 500+ invoices', 'Wholesale price tier rules', 'Net 30/60/90 payment terms'],
        color: 'bg-noble-blue/10 text-noble-blue group-hover:bg-noble-blue group-hover:text-white',
    },
    {
        icon: Globe,
        title: 'B2B invoice generator',
        tag: 'B2B Ecommerce Invoicing',
        desc: 'B2B buyers need proper invoices — not order receipts. Generate compliant invoices with PO numbers, VAT and tax IDs, custom payment terms, and buyer-specific pricing. Your buyers can submit these directly to their accounts payable department without a single back-and-forth email.',
        bullets: ['PO number + VAT ID fields', 'Buyer-specific pricing rules', 'Multi-currency B2B invoicing'],
        color: 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white',
    },
    {
        icon: FileText,
        title: 'WooCommerce invoice plugin',
        tag: 'WooCommerce Integration',
        desc: 'Nobevra connects directly to your WooCommerce store and generates professional PDF invoices the moment an order status changes to "Processing" or "Completed." Customers can download their invoices from the My Account area — no support ticket required.',
        bullets: ['Status-triggered auto generation', 'Customer self-service downloads', 'Multi-tax region support'],
        color: 'bg-purple-500/10 text-purple-600 group-hover:bg-purple-500 group-hover:text-white',
    },
    {
        icon: Bell,
        title: 'Automated payment reminders',
        tag: 'Ecommerce Billing Automation',
        desc: 'Stop chasing unpaid invoices manually. Set your reminder schedule once — 7 days before due, on due date, 3 days after — and our engine fires the right message at the right time. Smart dunning that never sounds pushy, just professional.',
        bullets: ['Scheduled reminder sequences', 'Late payment escalation logic', 'Automated statement of account'],
        color: 'bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white',
    },
    {
        icon: TrendingUp,
        title: 'Ecommerce revenue analytics',
        tag: 'Store Analytics',
        desc: 'Track which SKUs generate the most revenue, which B2B accounts have outstanding balances, and where your cash flow gaps are forming. Real-time dashboards built specifically for store operators who sell product — not services.',
        bullets: ['Revenue by SKU & buyer segment', 'AR aging + outstanding reports', 'Cash flow projections'],
        color: 'bg-violet-500/10 text-violet-600 group-hover:bg-violet-500 group-hover:text-white',
    },
];

export default function EcommerceDeliverables() {
    return (
        <section className="py-24 md:py-32 bg-noble-surface border-t border-slate-100" aria-labelledby="features-heading">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 id="features-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                        Everything your store needs. <span className="text-noble-blue">Nothing it doesn't.</span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed font-medium">
                        The complete <strong>ecommerce invoice software</strong> built for stores that ship products — Shopify, WooCommerce, and wholesale B2B alike.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f) => (
                        <div key={f.title} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:border-orange-500/20 hover:shadow-xl transition-all group flex flex-col h-full">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all ${f.color}`}>
                                <f.icon className="w-6 h-6" />
                            </div>
                            <span className="inline-flex self-start px-2.5 py-0.5 bg-noble-surface rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 border border-slate-100">{f.tag}</span>
                            <h3 className="font-black text-noble-text text-xl mb-3">{f.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm mb-6 font-medium">{f.desc}</p>
                            <ul className="space-y-2.5 mt-auto pt-6 border-t border-noble-border/70">
                                {f.bullets.map(b => (
                                    <li key={b} className="flex items-start gap-2 text-sm text-slate-700 font-bold leading-snug">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

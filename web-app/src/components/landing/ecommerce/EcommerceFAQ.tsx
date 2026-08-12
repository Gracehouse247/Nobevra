'use client';
import React from 'react';
import { ChevronDown, AlertOctagon } from 'lucide-react';

const faqs = [
    {
        q: 'How does the Shopify invoice generator work?',
        a: 'You connect your Shopify store through our integration. Every time an order comes in, NobleInvoice automatically generates a branded PDF invoice and can email it directly to the buyer. You do not touch a single thing manually.',
    },
    {
        q: 'Is this a proper WooCommerce invoice plugin?',
        a: 'Yes. Our WooCommerce integration generates invoices automatically on checkout completion. The invoices are fully branded, include your tax information, and are downloadable by the customer directly from their order page.',
    },
    {
        q: 'Can I handle wholesale invoicing software for large B2B buyers?',
        a: 'Absolutely. B2B wholesale is our sweet spot. You can set up custom payment terms (Net 30, Net 60), add PO numbers, include tax IDs, and send invoices in bulk for every order in a distribution run.',
    },
    {
        q: 'Does it work as a B2B invoice generator for international buyers?',
        a: 'Yes. You can generate invoices in 160+ currencies with real-time FX rates. Your international buyers receive an invoice in their local currency, and you get settled in yours.',
    },
    {
        q: 'What makes this better than the invoicing built into my ecommerce platform?',
        a: 'Basic platform invoicing is generic. NobleInvoice gives you fully branded PDF invoices, automated sending, reminder sequences, bulk processing for wholesale orders, and revenue analytics — none of which are available in standard Shopify or WooCommerce.',
    },
    {
        q: 'Can I use the bulk order billing tool for seasonal large orders?',
        a: 'Yes. You can import an order list and generate invoices for all of them simultaneously. Seasonal wholesale runs that used to take a full day of admin work now take about three minutes.',
    },
    {
        q: 'How do you handle B2B PO numbers and VAT fields?',
        a: 'We map custom checkout fields (or metafields) directly to the invoice. If a B2B buyer enters their PO number and VAT ID at checkout, it automatically populates in the correct legal format on their PDF invoice.',
    },
];

export default function EcommerceFAQ() {
    return (
        <section className="py-24 md:py-32 bg-noble-surface border-t border-slate-100" aria-labelledby="faq-heading">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
                
                <div className="sticky top-32">
                    <h2 id="faq-heading" className="font-inter text-[32px] md:text-[48px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                        Frequent questions
                    </h2>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                        Everything you need to know about automating your ecommerce invoice workflow.
                    </p>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-noble-border">
                        <div className="flex items-center gap-3 mb-3">
                            <AlertOctagon className="w-5 h-5 text-slate-400" />
                            <h4 className="font-bold text-noble-text text-sm uppercase tracking-widest">We may not be right for you if...</h4>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            If you only sell low-ticket digital downloads to consumers (B2C) and your buyers never ask for a formal PDF receipt, a full B2B ecommerce invoicing software might be overkill for your current needs.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <details key={i} className="group bg-slate-50 rounded-[24px] border border-noble-border overflow-hidden shadow-sm hover:border-noble-blue/30 transition-colors">
                            <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer list-none gap-6 outline-none">
                                <span className="font-black text-noble-text text-lg leading-snug">{faq.q}</span>
                                <div className="w-10 h-10 rounded-full bg-noble-surface border border-noble-border flex items-center justify-center shrink-0 group-open:bg-noble-blue group-open:border-noble-blue group-open:text-white transition-all">
                                    <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" />
                                </div>
                            </summary>
                            <div className="px-6 md:px-8 pb-8 text-slate-600 text-base leading-relaxed">{faq.a}</div>
                        </details>
                    ))}
                </div>

            </div>
        </section>
    );
}

import React from 'react';
import { XCircle } from 'lucide-react';

const failures = [
    {
        title: 'Using the platform\'s built-in invoicing',
        desc: 'Shopify and WooCommerce generate order confirmations — not invoices. There\'s no PO number field, no custom payment terms, no bulk generation, and no branded PDF. Your B2B buyers can\'t submit these to their accounts payable departments.',
        icon: '🛒',
    },
    {
        title: 'Piecing together spreadsheets + email',
        desc: 'Some stores export their orders to a spreadsheet, manually format each row into a PDF, then email them one at a time. It works — until you hit 50 orders in a single day. Then it becomes a full-time job that still produces errors.',
        icon: '📊',
    },
    {
        title: 'Using generic invoicing tools that don\'t know ecommerce',
        desc: 'Standard invoice software like Word templates or basic SaaS tools have no connection to your store. You\'re manually keying in order numbers, SKUs, and shipping addresses. Every sale creates two data entry jobs instead of one.',
        icon: '📄',
    },
];

export default function EcommerceFailureSection() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="font-inter text-[32px] md:text-[48px] font-black leading-[1.1] mb-6 tracking-tight">
                        Why 68% of ecommerce stores still invoice manually — and pay for it.
                    </h2>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed">
                        Most stores don't have a billing problem. They have a tooling problem. Here's why their current setup keeps failing them.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {failures.map((f, i) => (
                        <div key={i} className="bg-noble-card border border-noble-card-border rounded-[28px] p-8 hover:bg-noble-surface/10 transition-colors">
                            <div className="text-4xl mb-6">{f.icon}</div>
                            <div className="flex items-start gap-3 mb-4">
                                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                <h3 className="font-black text-lg text-white leading-snug">{f.title}</h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

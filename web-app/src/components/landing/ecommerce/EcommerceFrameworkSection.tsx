import React from 'react';
import { Zap, FileCheck, DollarSign } from 'lucide-react';

const steps = [
    {
        num: '1',
        icon: Zap,
        title: 'Capture (Order to Invoice)',
        tag: 'Ecommerce Billing Automation',
        desc: 'The moment a buyer completes checkout on your Shopify store, WooCommerce shop, or B2B wholesale portal, Nobevra captures the order data automatically. No imports, no copy-paste — the invoice builds itself from the live order.',
        color: 'bg-orange-100 text-orange-600',
        numBg: 'bg-orange-500',
    },
    {
        num: '2',
        icon: FileCheck,
        title: 'Format (Compliant PDF)',
        tag: 'B2B Invoice Generator',
        desc: 'Before the invoice goes out, our engine applies your brand, appends the correct PO number, populates tax IDs, sets payment terms (Net 30/60/90), and converts to the buyer\'s currency. Every invoice your B2B buyers receive is AP-department ready on the first send.',
        color: 'bg-noble-blue/10 text-noble-blue',
        numBg: 'bg-noble-blue',
    },
    {
        num: '3',
        icon: DollarSign,
        title: 'Collect (Automatic Follow-up)',
        tag: 'Wholesale Billing Software',
        desc: 'Once sent, our collection engine takes over. Payment reminders fire automatically on your schedule. Overdue invoices trigger escalation sequences. You can process 500 wholesale orders and follow up on every single one without opening your email once.',
        color: 'bg-emerald-100 text-emerald-600',
        numBg: 'bg-emerald-500',
    },
];

export default function EcommerceFrameworkSection() {
    return (
        <section className="py-24 md:py-32 bg-[#F0F4FF] relative overflow-hidden">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6 border border-noble-blue/20">
                        The Order-to-Cash System
                    </div>
                    <h2 className="font-inter text-[32px] md:text-[48px] font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                        How Nobevra closes the gap between a completed order and cash in your account.
                    </h2>
                    <p className="text-slate-600 text-lg font-medium leading-relaxed">
                        Most ecommerce invoice software stops at sending a PDF. We close the entire order-to-cash cycle.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* connector line */}
                    <div className="hidden md:block absolute top-14 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-noble-blue/10 z-0" />

                    {steps.map((s) => (
                        <div key={s.num} className="bg-noble-surface rounded-[32px] p-8 border border-noble-blue/10 shadow-xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
                            <div className={`w-10 h-10 rounded-full ${s.numBg} text-white font-black text-lg flex items-center justify-center mb-6`}>
                                {s.num}
                            </div>
                            <span className="inline-flex px-2.5 py-0.5 bg-slate-50 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 border border-slate-100">{s.tag}</span>
                            <h3 className="font-black text-xl text-near-black mb-3">{s.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

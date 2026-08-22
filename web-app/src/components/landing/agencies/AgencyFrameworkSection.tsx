import React from 'react';
import { Target, FileEdit, CreditCard } from 'lucide-react';

const steps = [
    {
        num: '1',
        icon: Target,
        title: 'Track (Scope & Retainers)',
        tag: 'Agency CRM and Invoicing',
        desc: 'Set up your recurring monthly retainers and log fixed-bid projects in the CRM. When a client requests extra work outside the retainer scope, log the overage directly against their profile instantly.',
        color: 'bg-indigo-100 text-indigo-600',
        numBg: 'bg-indigo-500',
    },
    {
        num: '2',
        icon: FileEdit,
        title: 'Bill (Automated Generation)',
        tag: 'Creative Agency Invoicing',
        desc: 'On the 1st of the month, Nobevra automatically generates the invoice. It pulls in the base retainer amount AND automatically appends any out-of-scope overages logged during the month into a single, beautiful PDF.',
        color: 'bg-violet-100 text-violet-600',
        numBg: 'bg-violet-500',
    },
    {
        num: '3',
        icon: CreditCard,
        title: 'Collect (Client Portal)',
        tag: 'Client Billing',
        desc: 'The client receives an email linking them to your white-label portal. They view the invoice under your brand and pay via ACH or credit card in seconds. If they forget, automated reminders follow up for you.',
        color: 'bg-emerald-100 text-emerald-600',
        numBg: 'bg-emerald-500',
    },
];

export default function AgencyFrameworkSection() {
    return (
        <section className="py-24 md:py-32 bg-[#F5F7FF] relative overflow-hidden">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-6 border border-indigo-500/20">
                        The Proposal-to-Payment Flow
                    </div>
                    <h2 className="font-inter text-[32px] md:text-[48px] font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                        How Nobevra handles client billing for marketing agencies.
                    </h2>
                    <p className="text-slate-600 text-lg font-medium leading-relaxed">
                        A single, automated flow that ensures every hour worked translates into cash collected.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* connector line */}
                    <div className="hidden md:block absolute top-14 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-indigo-500/10 z-0" />

                    {steps.map((s) => (
                        <div key={s.num} className="bg-noble-surface rounded-[32px] p-8 border border-indigo-500/10 shadow-xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
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

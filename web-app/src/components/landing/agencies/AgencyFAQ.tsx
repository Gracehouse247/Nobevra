'use client';
import React from 'react';
import { ChevronDown, AlertOctagon } from 'lucide-react';

const faqs = [
    {
        q: 'Is this a proper agency billing platform or just a generic invoice tool?',
        a: 'It is built specifically for service businesses. The retainer automation, multi-user team workspace, white-label client portal, and per-client revenue reports are all designed around how marketing agencies and creative studios actually work.',
    },
    {
        q: 'How does the retainer billing software work exactly?',
        a: 'You set up a billing profile for a client: the retainer amount, the billing date, and the payment terms. The system generates and sends the invoice automatically every month. If you log out-of-scope overages during the month, they are automatically appended to the next invoice.',
    },
    {
        q: 'Can my whole team access it, or is it just for the founder?',
        a: 'Your whole team can use it. You control who can create invoices, who can view client financials, and who has admin rights. It is perfect for agencies where Account Managers handle billing but founders want oversight.',
    },
    {
        q: 'Does it really support a white-label client portal?',
        a: 'Yes. You can set your custom domain, upload your logo, and choose your exact brand colors. Your clients see a fully branded experience. NobleInvoice is invisible to them.',
    },
    {
        q: 'What makes this better than other invoicing software for agencies?',
        a: 'Most invoicing tools are built for solo freelancers or accountants. We built this specifically for marketing agencies. Retainer automation, overage tracking to prevent scope creep, and white-label portals come standard.',
    },
    {
        q: 'Does it handle client billing for marketing agencies with complex projects?',
        a: 'Yes. You can bill flat retainers, hourly rates, or project-based milestones. You can add expenses and time entries to any invoice seamlessly.',
    },
];

export default function AgencyFAQ() {
    return (
        <section className="py-24 md:py-32 bg-[#F8FAFC] border-t border-slate-100" aria-labelledby="faq-heading">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
                
                <div className="sticky top-32">
                    <h2 id="faq-heading" className="font-inter text-[32px] md:text-[48px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                        Frequent questions
                    </h2>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                        Everything you need to know about automating your agency's retainer workflow.
                    </p>

                    <div className="bg-noble-surface rounded-2xl p-6 border border-noble-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <AlertOctagon className="w-5 h-5 text-slate-400" />
                            <h4 className="font-bold text-noble-text text-sm uppercase tracking-widest">We may not be right for you if...</h4>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            If you are a solo freelancer who only sends one or two simple invoices a month and doesn't need to track ongoing retainers or provide a branded portal, our full agency billing software might be more power than you need right now.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <details key={i} className="group bg-noble-surface rounded-[24px] border border-noble-border overflow-hidden shadow-sm hover:border-indigo-500/30 transition-colors">
                            <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer list-none gap-6 outline-none">
                                <span className="font-black text-noble-text text-lg leading-snug">{faq.q}</span>
                                <div className="w-10 h-10 rounded-full bg-slate-50 border border-noble-border flex items-center justify-center shrink-0 group-open:bg-indigo-500 group-open:border-indigo-500 group-open:text-white transition-all">
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

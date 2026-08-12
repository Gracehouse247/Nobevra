import React from 'react';
import { XCircle } from 'lucide-react';

const failures = [
    {
        title: 'Accounting software (like QuickBooks)',
        desc: 'These tools are built for accountants to balance ledgers, not for creative agencies to manage retainers. They are clunky, overly complex for project managers, and offer a terrible, unbranded experience for your clients.',
        icon: '📊',
    },
    {
        title: 'Manual spreadsheet tracking',
        desc: 'Tracking billable hours in a spreadsheet and manually copying them into a Word document invoice at the end of the month is a recipe for lost revenue. It is slow, prone to data-entry errors, and looks amateurish to premium clients.',
        icon: '📝',
    },
    {
        title: 'Disconnected project tools',
        desc: 'If your team tracks time in one app, manages projects in another, and bills in a third, your agency is leaking money. Disconnected tools mean missed billable hours and a fractured view of project profitability.',
        icon: '🔗',
    },
];

export default function AgencyFailureSection() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="font-inter text-[32px] md:text-[48px] font-black leading-[1.1] mb-6 tracking-tight">
                        Why traditional invoicing fails creative agencies.
                    </h2>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed">
                        Agencies don't just sell products; they sell time, expertise, and ongoing relationships. Your billing stack needs to reflect that.
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

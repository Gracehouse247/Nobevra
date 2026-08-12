import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

const faqs = [
    {
        q: 'What makes this a true enterprise billing platform and not just invoicing software?',
        a: 'Three things separate an enterprise billing platform from a standard invoice tool: API access to integrate with your existing systems, role-based team workspaces with audit trails, and multi-currency settlement at scale. NobleInvoice Elite covers all three out of the box.',
    },
    {
        q: 'How does the API invoicing integration work with our existing ERP?',
        a: 'Our RESTful API lets your developers connect NobleInvoice to any internal system. You can trigger invoice creation from your CRM, sync payment status back to your ERP, and stream all events via webhooks in real time.',
    },
    {
        q: 'Can it handle enterprise accounts receivable software requirements?',
        a: 'Yes. The bulk generation engine, automated payment reminders, AR aging dashboards, and reconciliation reports are all built for high-volume enterprise AR operations. You can process thousands of invoices a month without any manual intervention.',
    },
    {
        q: 'Does it support multi-currency invoicing software for international operations?',
        a: 'Absolutely. We support 160+ currencies with real-time interbank FX rates. You bill in the client\'s currency, and the system handles cross-border settlement calculations automatically.',
    },
    {
        q: 'What compliance standards does the enterprise plan meet?',
        a: 'The platform is SOC 2 Type II certified. We support GDPR-compliant data handling, offer private data residency options for regulated industries, and provide full audit trails on every financial transaction.',
    },
    {
        q: 'Is there a dedicated account manager for enterprise customers?',
        a: 'Yes. Every Enterprise plan customer gets a dedicated account manager who handles onboarding, API integration support, and ongoing platform optimization. You are never talking to a support queue.',
    },
];

export default function EnterpriseFAQ() {
    return (
        <section className="py-24 md:py-32 bg-noble-surface border-t border-slate-100" aria-labelledby="faq-heading">
            <div className="max-w-4xl mx-auto px-4 md:px-16">
                
                {/* The "Not for you" qualifier section (Information Gain) */}
                <div className="mb-20 bg-amber-50 rounded-[32px] border border-amber-200 p-8 md:p-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <h3 className="font-black text-2xl text-amber-900 mb-2">We may not be right for you if...</h3>
                            <p className="text-amber-700 leading-relaxed font-medium">
                                We believe in transparent partnerships. NobleInvoice Enterprise is an incredibly powerful corporate billing solution, but it is not for everyone. You should probably look elsewhere if:
                            </p>
                        </div>
                    </div>
                    <ul className="space-y-3 pl-16 text-amber-800 font-medium">
                        <li className="list-disc">You process less than 100 invoices a month (Our Pro plan is better suited for you).</li>
                        <li className="list-disc">You want a heavily customized, on-premise installation (We are fully cloud-native).</li>
                        <li className="list-disc">You are looking for a cheap, bare-bones tool and don't care about SOC 2 compliance.</li>
                    </ul>
                </div>

                <div className="text-center mb-16">
                    <h2 id="faq-heading" className="font-inter text-[32px] md:text-[48px] text-near-black font-black leading-[1.1] tracking-tight">
                        Enterprise questions answered
                    </h2>
                </div>
                
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <details key={i} className="group bg-slate-50 rounded-[24px] border border-slate-100 overflow-hidden hover:border-noble-blue/30 transition-colors">
                            <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer list-none gap-4">
                                <span className="font-black text-noble-text text-lg leading-snug pr-8">{faq.q}</span>
                                <div className="w-10 h-10 rounded-full bg-noble-surface border border-noble-border flex items-center justify-center shrink-0 group-open:bg-noble-blue group-open:border-noble-blue group-open:text-white transition-colors">
                                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                                </div>
                            </summary>
                            <div className="px-6 md:px-8 pb-8 text-slate-600 text-base leading-relaxed border-t border-slate-100 pt-6 bg-noble-surface font-medium">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>

            </div>
        </section>
    );
}

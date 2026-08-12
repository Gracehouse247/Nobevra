import React from 'react';
import { Clock, TrendingDown, DollarSign } from 'lucide-react';

export default function AgencyProblemSection() {
    return (
        <section className="py-24 md:py-32 bg-noble-surface relative overflow-hidden">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: copy */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-6 border border-red-100">
                            The Scope Creep Tax
                        </div>

                        <h2 className="font-inter text-[32px] md:text-[48px] font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                            The "quick changes" that are silently killing your agency's margins.
                        </h2>

                        <div className="space-y-5 text-lg text-slate-600 leading-relaxed font-medium">
                            <p>
                                When your project management is disconnected from your billing, scope creep is inevitable. A client asks for a "quick revision" on Slack. Your designer spends two hours on it. 
                            </p>
                            <p>
                                Because there is no immediate way to log that overage to an invoice, the work goes unbilled. You eat the cost to keep the client happy.
                            </p>
                            <p className="text-near-black font-bold">
                                If a 5-person agency misses just 4 billable hours a week at $150/hr, they are losing $31,200 a year. That is a junior employee's salary lost to bad tooling.
                            </p>
                        </div>
                    </div>

                    {/* Right: cost calculator card */}
                    <div className="bg-slate-50 rounded-[32px] border border-noble-border p-8 md:p-12 shadow-sm">
                        <h3 className="font-black text-2xl text-near-black mb-8">The cost of disconnected billing</h3>

                        <div className="space-y-6">
                            <div className="flex gap-5 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 shadow-sm">
                                    <Clock className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-noble-text mb-1">Unlogged revisions</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">Creative agencies lose an average of 15% of their potential billable hours because out-of-scope requests aren't easily added to the final invoice.</p>
                                </div>
                            </div>

                            <div className="flex gap-5 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 shadow-sm">
                                    <TrendingDown className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-noble-text mb-1">$31,200/year "Scope Creep Tax"</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">It doesn't feel like much in the moment, but 4 lost hours a week completely erodes the profit margin on your retainer contracts.</p>
                                </div>
                            </div>

                            <div className="flex gap-5 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 shadow-sm">
                                    <DollarSign className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-noble-text mb-1">Delayed cash flow</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">When project delivery and invoicing are handled in different systems, invoices get sent late. Late sends mean late payments.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

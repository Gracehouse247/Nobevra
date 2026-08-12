import React from 'react';
import { Clock, DollarSign, AlertTriangle } from 'lucide-react';

export default function EcommerceProblemSection() {
    return (
        <section className="py-24 md:py-32 bg-noble-surface relative overflow-hidden">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: copy */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 font-bold text-[10px] uppercase tracking-widest mb-6 border border-orange-100">
                            The 3-Hour Admin Tax
                        </div>

                        <h2 className="font-inter text-[32px] md:text-[48px] font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                            Manual invoicing is costing your store more than you think.
                        </h2>

                        <div className="space-y-5 text-lg text-slate-600 leading-relaxed font-medium">
                            <p>
                                A store doing 200 orders a month spends roughly <strong className="text-near-black">3 hours every week</strong> on manual invoicing. Copying order details, formatting PDFs, emailing buyers one by one.
                            </p>
                            <p>
                                At a conservative $50 per hour, that is <strong className="text-near-black">$600 a month</strong> — just for paperwork. Scale to 1,000 orders and you are burning $3,000 monthly on a job a machine should be doing.
                            </p>
                            <p className="text-near-black font-bold">
                                That is $36,000 a year in lost productivity. Not from bad products, not from slow shipping — from a process that has a better solution.
                            </p>
                        </div>
                    </div>

                    {/* Right: cost calculator card */}
                    <div className="bg-slate-50 rounded-[32px] border border-noble-border p-8 md:p-12 shadow-sm">
                        <h3 className="font-black text-2xl text-near-black mb-8">The real cost of manual invoicing</h3>

                        <div className="space-y-6">
                            <div className="flex gap-5 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 shadow-sm">
                                    <Clock className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-noble-text mb-1">200 orders/month = 3 hrs/week wasted</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">Every manual copy-paste, every formatting fix, every email you send individually — it compounds into a part-time job nobody applied for.</p>
                                </div>
                            </div>

                            <div className="flex gap-5 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 shadow-sm">
                                    <DollarSign className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-noble-text mb-1">$36,000/year in admin at 1,000 orders</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">At scale, that expense doesn't just stay flat — it grows proportionally with your revenue. The more you sell, the more manual work piles up.</p>
                                </div>
                            </div>

                            <div className="flex gap-5 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 shadow-sm">
                                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-noble-text mb-1">1 in 3 manually created invoices has an error</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">A wrong PO number, a missing tax ID, or an incorrect amount causes B2B buyers to reject the invoice and delay payment by 2–4 weeks.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

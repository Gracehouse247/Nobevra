'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GhostingFrameworkSection() {
    return (
        <section className="py-24 md:py-32 relative bg-[#F8FAFC] overflow-hidden">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                        Protect Your Revenue
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
                        The 3-Step Ghosting Framework: How to Follow Up <span className="text-red-500">Without Ruining the Relationship</span>
                    </h2>
                    <p className="text-lg text-near-black/60 leading-relaxed">
                        The absolute worst part of independent contractor invoicing isn't making the bill—it's chasing down the cash. Here is the exact system NobleInvoice uses to handle overdue payments while keeping things strictly professional.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            day: 'Day 1',
                            title: 'The "Did You Miss This?" Nudge',
                            desc: 'A polite, automated email sent 24 hours after the due date. It gives them the benefit of the doubt—assuming they simply forgot.',
                            icon: 'mail'
                        },
                        {
                            day: 'Day 3',
                            title: 'The Firm Follow-Up',
                            desc: 'A direct reminder highlighting the overdue amount. We include a 1-click payment link right at the top so there is zero friction to pay.',
                            icon: 'schedule'
                        },
                        {
                            day: 'Day 7',
                            title: 'The Final Notice',
                            desc: 'A formal escalation. NobleInvoice can automatically apply your pre-set late fees, enforcing your payment terms without you having to be the bad guy.',
                            icon: 'gavel'
                        }
                    ].map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.6 }}
                            className="bg-noble-surface rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all relative"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-red-500">{step.icon}</span>
                            </div>
                            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{step.day}</div>
                            <h3 className="text-xl font-black text-near-black mb-4">{step.title}</h3>
                            <p className="text-near-black/60 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    );
}

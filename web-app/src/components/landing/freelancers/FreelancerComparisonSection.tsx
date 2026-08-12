'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FreelancerComparisonSection() {
    return (
        <section className="py-24 md:py-32 relative bg-noble-surface">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                    The Smart Choice
                </div>
                <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
                    Free Templates vs. <span className="text-noble-blue">Freelance Billing Software</span>
                </h2>
                <p className="text-lg text-near-black/70 leading-relaxed max-w-2xl mx-auto mb-16">
                    A free Word document template might seem appealing when you first start, but it quickly becomes a liability. See why upgrading to a dedicated invoicing software for freelancers protects your time and income.
                </p>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
                    {/* The Old Way */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-50 border border-noble-border rounded-[32px] p-8 md:p-12 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 text-slate-200">
                            <span className="material-symbols-outlined text-6xl">description</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-6">Generic Templates</h3>
                        <ul className="space-y-4 relative z-10">
                            {[
                                "Zero automation. You must manually type out every client detail.",
                                "Requires clients to manually copy-paste your banking details to pay.",
                                "No tracking. You have to guess if the client actually opened the PDF.",
                                "Looks identical to thousands of other amateur invoices.",
                                "You must manually send awkward follow-up emails for late payments."
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-slate-600">
                                    <span className="material-symbols-outlined text-red-400 shrink-0">close</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* The NobleInvoice Way */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-noble-blue rounded-[32px] p-8 md:p-12 relative overflow-hidden text-white shadow-xl shadow-noble-blue/20"
                    >
                        <div className="absolute top-0 right-0 p-6 text-white/10">
                            <span className="material-symbols-outlined text-6xl">rocket_launch</span>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-6">NobleInvoice App</h3>
                        <ul className="space-y-4 relative z-10">
                            {[
                                "Client CRM auto-fills details instantly.",
                                "Integrated 1-click checkout (Credit Card, ACH, Apple Pay).",
                                "Read receipts alert you the second your invoice is viewed.",
                                "Stunning, customizable professional identity.",
                                "Automated reminder sequences act as your personal collections agent."
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-white/90">
                                    <span className="material-symbols-outlined text-green-400 shrink-0">check_circle</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

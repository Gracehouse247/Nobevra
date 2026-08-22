'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PsychologicalImpactSection() {
    return (
        <section className="py-24 md:py-32 relative bg-noble-surface overflow-hidden">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-widest mb-6">
                        Client Trust Factor
                    </div>
                    
                    <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
                        The Freelancer Imposter Syndrome: Why Asking for Money Feels Hard <span className="text-noble-blue">(And How to Fix It)</span>
                    </h2>
                    
                    <div className="space-y-6 text-near-black/70 text-lg leading-relaxed">
                        <p>
                            Why do some freelancers get paid within hours, while others wait 45 days and silently panic? It is rarely about the actual work. Usually, it comes down to how you present the bill.
                        </p>
                        <p>
                            Sending a messy, manually typed Word document signals amateurism. It subconsciously tells your client that payment is not urgent. On the flip side, using a dedicated <strong>invoice tool for freelancers</strong> instantly elevates your credibility. It removes the awkwardness of asking for money because the system does the asking for you.
                        </p>
                        <ul className="space-y-4 mt-6">
                            {[
                                'Removes payment friction with one-click secure checkout links.',
                                'Positions your self-employed billing process as premium and organized.',
                                'Stops the endless back-and-forth about line item confusion.',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-green-600 text-xs font-bold">check</span>
                                    </div>
                                    <span className="font-medium text-near-black/80">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative"
                >
                    <div className="bg-slate-50 border border-noble-border rounded-[32px] p-8 shadow-sm">
                        <p className="text-center font-bold text-near-black/40 text-sm uppercase tracking-widest mb-6">Spreadsheet vs. Nobevra</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            {/* The old way */}
                            <div className="opacity-50 blur-[1px] hover:blur-none transition-all">
                                <div className="bg-noble-surface border border-slate-300 p-4 font-mono text-[10px] text-slate-500 h-[280px]">
                                    <p className="mb-4">INVOICE.docx</p>
                                    <p>To: Client</p>
                                    <p className="mb-4">Amount: $1,200</p>
                                    <p>Please pay to bank account:</p>
                                    <p>0123456789</p>
                                    <p className="mt-8 text-red-400">Payment Overdue</p>
                                </div>
                            </div>

                            {/* The Nobevra way */}
                            <div className="bg-noble-surface rounded-xl shadow-xl border border-slate-100 overflow-hidden h-[280px] transform scale-110 z-10 relative">
                                <div className="h-2 bg-noble-blue w-full"></div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="w-8 h-8 bg-near-black rounded-lg"></div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold">INVOICE</p>
                                            <p className="text-[8px] text-slate-400">#INV-2026</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 mb-6">
                                        <div className="h-1.5 w-full bg-slate-100 rounded"></div>
                                        <div className="h-1.5 w-3/4 bg-slate-100 rounded"></div>
                                        <div className="h-1.5 w-1/2 bg-slate-100 rounded"></div>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                                        <p className="font-black text-sm">$1,200.00</p>
                                        <div className="bg-green-500 text-white text-[8px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                                            Pay Now
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

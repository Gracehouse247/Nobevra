'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FreelancerHowToSection() {
    return (
        <section className="py-24 md:py-32 relative bg-[#F8FAFC]">
            <div className="max-w-[1000px] mx-auto px-4 md:px-16">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                        Step-by-Step Guide
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
                        How to Create a <span className="text-noble-blue">Professional Invoice for Freelancers</span> in 3 Steps
                    </h2>
                    <p className="text-lg text-near-black/70 leading-relaxed max-w-3xl mx-auto">
                        Setting up your independent contractor invoicing shouldn't take hours. By using the right invoicing software for freelancers, you can automate the entire process and focus on the work that actually pays you. Here is the exact blueprint to follow.
                    </p>
                </div>

                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 md:before:ml-[4.5rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {/* Step 1 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-noble-blue text-white font-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            1
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-noble-surface p-8 rounded-3xl shadow-sm border border-slate-100"
                        >
                            <h3 className="text-xl font-black text-near-black mb-4">
                                Generate your self-employed billing profile
                            </h3>
                            <p className="text-near-black/70 leading-relaxed mb-4">
                                The first step in establishing an effective freelance billing software workflow is setting up your business profile. You do not need a registered LLC to start—you can simply use your legal name.
                            </p>
                            <p className="text-near-black/70 leading-relaxed">
                                Enter your contact details, upload a clean logo if you have one, and connect your bank account. A premium invoice app for self employed individuals, like Nobevra, will securely store this data so you never have to type it again.
                            </p>
                        </motion.div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-noble-blue text-white font-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            2
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-noble-surface p-8 rounded-3xl shadow-sm border border-slate-100"
                        >
                            <h3 className="text-xl font-black text-near-black mb-4">
                                Itemize your freelance billing software template
                            </h3>
                            <p className="text-near-black/70 leading-relaxed mb-4">
                                Ambiguity kills cash flow. When clients are confused about what they are paying for, they delay the payment to ask questions. Your invoice tool for freelancers must support crystal-clear line items.
                            </p>
                            <p className="text-near-black/70 leading-relaxed">
                                Break down your services logically (e.g., "Homepage Design," "Copywriting," "Server Setup"). Set clear quantities and rates. Additionally, clearly state your payment terms (Net 15, Net 30) directly on the template to set expectations immediately.
                            </p>
                        </motion.div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-green-500 text-white font-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            3
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-noble-surface p-8 rounded-3xl shadow-sm border border-slate-100"
                        >
                            <h3 className="text-xl font-black text-near-black mb-4">
                                Send via a dedicated freelancer billing app
                            </h3>
                            <p className="text-near-black/70 leading-relaxed mb-4">
                                Do not attach a PDF to a manual email. That forces the client to download a file, open their banking app, and manually route a transfer. It is a friction-heavy process that guarantees late payments.
                            </p>
                            <p className="text-near-black/70 leading-relaxed">
                                Instead, use a freelance invoice app to email them a secure, interactive web link. This allows them to view the invoice in their browser and click a single "Pay Now" button to settle the balance via Credit Card or ACH instantly. 
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

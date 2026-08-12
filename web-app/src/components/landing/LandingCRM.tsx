'use client';

import React from 'react';
import Image from 'next/image';

export default function LandingCRM() {
    return (
        <section className="py-32 relative overflow-hidden bg-noble-surface">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/20 to-electric-cyan/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <Image 
                            src="/images/crm-intelligence.png" 
                            alt="CRM Intelligence Dashboard — Predictive lead scoring and automated follow-ups" 
                            className="relative rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-near-black/5 z-10 group-hover:scale-[1.02] transition-transform duration-700"
                            width={720}
                            height={540}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className="lg:pl-12">
                        <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black mb-8 leading-[1.1] tracking-tight max-w-4xl">
                            Intelligence Built for <span className="text-noble-blue">Modern Enterprise.</span>
                        </h2>
                        <p className="text-body-lg text-near-black/70 mb-12 leading-relaxed font-medium">
                            Our collaborative ecosystem ensures that every touchpoint with your clients is tracked, analyzed, and optimized for maximum lifetime value.
                        </p>
                        
                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-near-black shadow-lg group-hover:bg-noble-blue transition-colors">
                                    <span className="material-symbols-outlined text-3xl">insights</span>
                                </div>
                                <div>
                                    <p className="font-bold text-2xl mb-2">Predictive Lead Scoring</p>
                                    <p className="text-near-black/60 text-sm leading-relaxed">Prioritize high-value opportunities with AI-driven engagement metrics and behavior tracking.</p>
                                </div>
                            </div>
                            <div className="flex gap-8 group">
                                <div className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-near-black shadow-lg group-hover:bg-noble-blue transition-colors">
                                    <span className="material-symbols-outlined text-3xl">auto_mode</span>
                                </div>
                                <div>
                                    <p className="font-bold text-2xl mb-2">Automated Follow-ups</p>
                                    <p className="text-near-black/60 text-sm leading-relaxed">Never let a deal go cold. Set up intelligent workflows that nurture clients until the final settlement.</p>
                                </div>
                            </div>
                            <div className="flex gap-8 group">
                                <div className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-near-black shadow-lg group-hover:bg-noble-blue transition-colors">
                                    <span className="material-symbols-outlined text-3xl">portal</span>
                                </div>
                                <div>
                                    <p className="font-bold text-2xl mb-2">White-Label Client Portal</p>
                                    <p className="text-near-black/60 text-sm leading-relaxed">Give your clients a premium branded dashboard to view invoices, make payments, and manage projects.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

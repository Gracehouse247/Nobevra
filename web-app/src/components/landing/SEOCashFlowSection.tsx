'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SEOCashFlowSection() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                    className="bg-near-black rounded-[32px] md:rounded-[48px] p-8 md:p-12 lg:p-20 relative overflow-hidden"
                >
                    {/* Background gradients */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-noble-blue/25 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-electric-cyan/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
                    
                    {/* Grain texture overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center relative z-10">
                        {/* Left — Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-card border border-noble-card-border text-electric-cyan font-bold text-[10px] uppercase tracking-widest mb-8">
                                <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
                                Information Gain
                            </div>
                            <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                                The 14-Day Cash Flow Gap{' '}
                                <span className="text-white/40">(And How We Close It)</span>
                            </h2>
                            <div className="space-y-5">
                                <p className="text-white/60 text-base md:text-lg leading-relaxed">
                                    Industry data shows that businesses relying on manual bank transfers wait an average of <strong className="text-white/90">14 days longer</strong> to get paid.
                                </p>
                                <p className="text-white/60 text-base md:text-lg leading-relaxed">
                                    Why? Because friction kills conversions. If a client has to log into their bank to authorize a transfer—they will put it off until tomorrow.
                                </p>
                                <p className="text-white/60 text-base md:text-lg leading-relaxed">
                                    The <strong className="text-white/90">best invoice generator program</strong> creates a seamless checkout experience. Our users get paid <strong className="text-electric-cyan">2x faster</strong> simply because they made it easier to hit &quot;Pay.&quot;
                                </p>
                            </div>
                        </div>

                        {/* Right — Visual Comparison Card */}
                        <div className="space-y-6">
                            {/* Traditional Method */}
                            <div className="bg-noble-surface/[0.06] backdrop-blur-md border border-white/10 rounded-[24px] p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-red-400/20 flex items-center justify-center border border-red-400/20">
                                        <span className="material-symbols-outlined text-red-400 text-lg">timer_off</span>
                                    </div>
                                    <div>
                                        <p className="text-white/90 font-black text-sm">Traditional Method</p>
                                        <p className="text-white/30 text-xs font-bold">Manual bank transfers</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-white/40 font-bold uppercase tracking-wider">Avg. payment time</span>
                                        <span className="text-red-400 font-black">14+ days</span>
                                    </div>
                                    <div className="h-3 w-full bg-noble-surface/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                                            className="h-full bg-gradient-to-r from-red-400/60 to-red-500/40 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Nobevra Method */}
                            <div className="bg-gradient-to-br from-noble-blue/20 to-electric-cyan/10 backdrop-blur-md border border-electric-cyan/20 rounded-[24px] p-6 md:p-8 shadow-lg shadow-noble-blue/10">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-green-400/20 flex items-center justify-center border border-green-400/20">
                                        <span className="material-symbols-outlined text-green-400 text-lg">bolt</span>
                                    </div>
                                    <div>
                                        <p className="text-white/90 font-black text-sm">Nobevra</p>
                                        <p className="text-white/30 text-xs font-bold">One-click payment links</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-white/40 font-bold uppercase tracking-wider">Avg. payment time</span>
                                        <span className="text-green-400 font-black">2–3 days</span>
                                    </div>
                                    <div className="h-3 w-full bg-noble-surface/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '22%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                                            className="h-full bg-gradient-to-r from-green-400 to-electric-cyan rounded-full shadow-lg shadow-green-400/30"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Result badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                                className="flex items-center justify-center gap-3 bg-noble-surface/[0.06] border border-white/10 rounded-2xl p-4"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-400 text-xl">trending_up</span>
                                </div>
                                <div>
                                    <p className="text-white font-black text-xl tracking-tight">2x Faster Payments</p>
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-wider">Average across all users</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

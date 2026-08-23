'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function IdentityNFCDeepDive() {
    return (
        <section
            id="identity-nfc"
            className="py-24 md:py-32 bg-noble-surface relative overflow-hidden"
            aria-label="Section 12: Business Identity, NFC Smart Cards and Dynamic QR"
        >
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/15 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">badge</span>
                        Business Identity & Smart Connect
                    </div>

                    <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-black text-near-black leading-[1.15] tracking-tight mb-4">
                        Make Every First Impression{' '}
                        <span className="text-noble-blue italic">Unforgettable.</span>
                    </h2>

                    <p className="text-base text-near-black/50 leading-relaxed">
                        Say goodbye to paper business cards that end up in the trash. Share your portfolio, social links, payment portals, and contact info with a single tap or scan.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Card 1: NFC Tap Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-violet-50/50 via-white to-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-6">
                            <span className="material-symbols-outlined text-2xl" aria-hidden="true">contactless</span>
                        </div>
                        <h3 className="text-2xl font-black text-near-black mb-3">NFC Tap-to-Share Technology</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                            Tap your physical Nobevra card against any smartphone. It opens your verified digital business card profile instantly. No app installation needed on their phone.
                        </p>
                        <div className="bg-white rounded-2xl p-4 border border-violet-100 shadow-sm space-y-2 mb-6">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-600">vCard Contact Download</span>
                                <span className="font-black text-emerald-600">Instant Phone Save</span>
                            </div>
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-600">CRM Lead Submission</span>
                                <span className="font-black text-violet-600">Auto-Linked to Pipeline</span>
                            </div>
                        </div>
                        <Link
                            href="/digital-business-card"
                            className="inline-flex items-center gap-2 text-xs font-black text-violet-700 hover:underline uppercase tracking-wider"
                        >
                            Design Digital Card
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </motion.div>

                    {/* Card 2: Dynamic QR Engine */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-br from-amber-50/50 via-white to-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6">
                            <span className="material-symbols-outlined text-2xl" aria-hidden="true">qr_code_2</span>
                        </div>
                        <h3 className="text-2xl font-black text-near-black mb-3">Dynamic QR Code Engine</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                            Generate vector-sharp QR codes for payment links, web pages, WiFi credentials, and menus. Update destination URLs anytime without changing the printed QR code.
                        </p>
                        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-sm space-y-2 mb-6">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-600">Dynamic URL Redirection</span>
                                <span className="font-black text-amber-600">Editable Anytime</span>
                            </div>
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-600">Scan Analytics & Location</span>
                                <span className="font-black text-emerald-600">Real-Time Telemetry</span>
                            </div>
                        </div>
                        <Link
                            href="/qr-code-generator"
                            className="inline-flex items-center gap-2 text-xs font-black text-amber-700 hover:underline uppercase tracking-wider"
                        >
                            Generate Dynamic QR
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

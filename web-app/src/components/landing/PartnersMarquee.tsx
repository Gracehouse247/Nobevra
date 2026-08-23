'use client';

import React from 'react';

export default function PartnersMarquee() {
    const capabilities = [
        { name: 'Invoicing Engine', color: '#166FBB', icon: 'receipt_long', desc: '180+ Templates' },
        { name: 'Flutterwave', color: '#F5A623', icon: 'payments', desc: 'Verified Gateway' },
        { name: 'Lightweight CRM', color: '#8B5CF6', icon: 'diversity_3', desc: 'Client Vault' },
        { name: 'NFC Smart Cards', color: '#01A0E2', icon: 'badge', desc: 'Digital Identity' },
        { name: 'Supabase RLS', color: '#3ECF8E', icon: 'lock', desc: 'PostgreSQL Security' },
        { name: 'Gemini AI', color: '#4285F4', icon: 'psychology', desc: 'Financial Intelligence' },
        { name: 'Dynamic QR Engine', color: '#F59E0B', icon: 'qr_code_2', desc: 'Live Telemetry' },
        { name: 'Real-Time Inventory', color: '#10B981', icon: 'inventory_2', desc: 'Stock Tracking' },
        { name: 'Multi-Device Sync', color: '#0F172A', icon: 'devices', desc: 'Web · Android · iOS' },
    ];

    return (
        <section
            className="py-12 bg-noble-surface border-y border-near-black/5 overflow-hidden"
            aria-label="Nobevra Platform Architecture & Capabilities"
        >
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-near-black/50 mb-8">
                The Connected Business Operating System — Unified Architecture
            </p>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="overflow-hidden">
                    <div className="animate-marquee gap-8 sm:gap-12 items-center whitespace-nowrap">
                        {/* Set 1 */}
                        {capabilities.map((c) => (
                            <div
                                key={`cap-1-${c.name}`}
                                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-near-black/[0.02] border border-near-black/5 mx-2 shrink-0 hover:border-noble-blue/20 hover:bg-noble-blue/5 transition-all duration-300 cursor-default"
                            >
                                <div
                                    className="w-7 h-7 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                                    style={{ backgroundColor: c.color }}
                                >
                                    <span className="material-symbols-outlined text-sm" aria-hidden="true">{c.icon}</span>
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-near-black leading-none">{c.name}</p>
                                    <p className="text-[9px] font-bold text-near-black/50 uppercase tracking-wider mt-0.5">{c.desc}</p>
                                </div>
                            </div>
                        ))}
                        {/* Set 2 (for continuous smooth loop) */}
                        {capabilities.map((c) => (
                            <div
                                key={`cap-2-${c.name}`}
                                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-near-black/[0.02] border border-near-black/5 mx-2 shrink-0 hover:border-noble-blue/20 hover:bg-noble-blue/5 transition-all duration-300 cursor-default"
                            >
                                <div
                                    className="w-7 h-7 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                                    style={{ backgroundColor: c.color }}
                                >
                                    <span className="material-symbols-outlined text-sm" aria-hidden="true">{c.icon}</span>
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-near-black leading-none">{c.name}</p>
                                    <p className="text-[9px] font-bold text-near-black/50 uppercase tracking-wider mt-0.5">{c.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import React from 'react';

export default function PartnersMarquee() {
    const partners = [
        { name: 'Flutterwave', color: '#F5A623', icon: 'payments', desc: 'Payments' },
        { name: 'Stripe', color: '#635BFF', icon: 'credit_card', desc: 'Billing' },
        { name: 'Supabase', color: '#3ECF8E', icon: 'database', desc: 'Database' },
        { name: 'PayStack', color: '#00C3F7', icon: 'account_balance_wallet', desc: 'Payments' },
        { name: 'Google Cloud', color: '#4285F4', icon: 'cloud', desc: 'Infrastructure' },
        { name: 'Vercel', color: '#000000', icon: 'rocket_launch', desc: 'Deployment' },
        { name: 'WhatsApp', color: '#25D366', icon: 'chat', desc: 'Messaging' },
        { name: 'Mailgun', color: '#E8592C', icon: 'mail', desc: 'Email' },
        { name: 'Twilio', color: '#F22F46', icon: 'phone', desc: 'SMS' },
        { name: 'Zapier', color: '#FF4A00', icon: 'bolt', desc: 'Automation' },
    ];

    return (
        <section className="py-16 bg-noble-surface border-y border-near-black/5 overflow-hidden">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-near-black/60 mb-10">
                Trusted by teams powered by these platforms
            </p>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="overflow-hidden">
                    <div className="animate-marquee gap-16 items-center whitespace-nowrap">
                        {/* Set 1 */}
                        {partners.map((p) => (
                            <div
                                key={`a-${p.name}`}
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-near-black/[0.03] border border-near-black/5 mx-3 shrink-0 group hover:border-noble-blue/20 hover:bg-noble-blue/5 transition-all duration-300 cursor-default"
                            >
                                <div
                                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0"
                                    style={{ backgroundColor: p.color }}
                                >
                                    <span className="material-symbols-outlined text-sm">{p.icon}</span>
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-near-black leading-none">{p.name}</p>
                                    <p className="text-[9px] font-bold text-near-black/60 uppercase tracking-wider">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                        {/* Set 2 */}
                        {partners.map((p) => (
                            <div
                                key={`b-${p.name}`}
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-near-black/[0.03] border border-near-black/5 mx-3 shrink-0 group hover:border-noble-blue/20 hover:bg-noble-blue/5 transition-all duration-300 cursor-default"
                            >
                                <div
                                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0"
                                    style={{ backgroundColor: p.color }}
                                >
                                    <span className="material-symbols-outlined text-sm">{p.icon}</span>
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-near-black leading-none">{p.name}</p>
                                    <p className="text-[9px] font-bold text-near-black/60 uppercase tracking-wider">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import React from 'react';
import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-noble-surface border-t border-slate-100" aria-label="Start Using Nobevra">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-noble-blue/5 blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-50/30 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">rocket_launch</span>
                    Start Your Business Operating System
                </div>

                <h2 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-near-black mb-6 tracking-tight leading-[1.1]">
                    Run Your Business.{' '}
                    <span className="text-noble-blue">Connect Everything.</span>
                </h2>

                <p className="text-base sm:text-lg md:text-xl text-near-black/60 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
                    Invoicing, client CRM, automated expenses, payments, and AI business intelligence — unified in one single workspace.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 items-center mb-8">
                    <Link 
                        href="/register"
                        className="w-full sm:w-auto bg-noble-blue text-white px-10 py-4 text-base font-extrabold rounded-2xl hover:bg-noble-blue/90 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(22,111,187,0.3)] flex items-center justify-center gap-2"
                    >
                        Start Free
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                    </Link>

                    <Link 
                        href="/#run"
                        className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">visibility</span>
                        Explore Platform
                    </Link>
                </div>

                <p className="text-[11px] text-near-black/40 font-bold uppercase tracking-widest">
                    Free forever Starter plan · No credit card required · Instant setup
                </p>
            </div>
        </section>
    );
}


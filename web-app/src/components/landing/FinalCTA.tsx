'use client';

import React from 'react';
import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="relative py-[200px] overflow-hidden bg-noble-surface">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-noble-blue/5 blur-[180px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-50/30 blur-[150px] rounded-full"></div>
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center relative z-10">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-noble-blue/5 border border-noble-blue/10 text-blue-800 font-black text-[10px] uppercase tracking-[0.3em] mb-12">
                    Initialize Your Account
                </div>
                <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-noble-text mb-12 tracking-tighter leading-[1.1]">
                    Try it Right Now. <br /> <span className="text-noble-blue">No Risks, No Limits.</span>
                </h2>
                <p className="text-2xl text-slate-500 mb-20 max-w-2xl mx-auto font-black leading-relaxed">
                    Create professional invoices, track payment status, and get paid sooner. The 1% choice.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-8 items-center">
                    <Link 
                        href="/register"
                        className="bg-noble-blue text-white px-12 py-6 text-xl font-black rounded-[24px] hover:bg-noble-blue/90 hover:scale-105 transition-all shadow-2xl shadow-noble-blue/30 flex items-center justify-center"
                    >
                        Get Started Now
                    </Link>
                    <Link 
                        href="/login"
                        className="text-noble-text/60 hover:text-noble-text transition-colors text-xl font-black underline underline-offset-8 decoration-noble-blue/30"
                    >
                        Member Login
                    </Link>
                </div>
            </div>
        </section>
    );
}

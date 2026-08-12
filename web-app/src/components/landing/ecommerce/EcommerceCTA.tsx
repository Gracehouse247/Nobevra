import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EcommerceCTA() {
    return (
        <section className="py-24 md:py-32 bg-slate-900 text-center relative overflow-hidden" aria-label="CTA">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-noble-blue/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <h2 className="font-inter text-[40px] md:text-[60px] text-white font-black mb-6 tracking-tight leading-[1.05]">
                    Every order deserves a proper invoice.
                </h2>
                <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                    Stop generating invoices manually. Connect your store and let NobleInvoice handle it from order to payment.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/register" className="inline-flex items-center justify-center gap-3 text-white bg-[#166FBB] px-12 py-6 text-lg font-extrabold rounded-[24px] hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(22,111,187,0.3)] w-full sm:w-auto">
                        Start free today <ArrowRight className="w-6 h-6" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center gap-3 text-white bg-noble-card border border-noble-card-border px-10 py-6 text-lg font-bold rounded-[24px] hover:bg-noble-surface/10 transition-all w-full sm:w-auto">
                        Talk to sales
                    </Link>
                </div>
                <p className="mt-8 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                    No credit card · Free plan · Cancel anytime
                </p>
            </div>
        </section>
    );
}

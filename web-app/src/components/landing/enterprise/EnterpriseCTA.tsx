import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export default function EnterpriseCTA() {
    return (
        <section className="py-32 bg-slate-900 text-white text-center relative overflow-hidden" aria-label="CTA">
            <div className="absolute inset-0 bg-gradient-to-br from-noble-blue/20 to-transparent pointer-events-none" />
            
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <h2 className="font-inter text-[40px] md:text-[60px] font-black mb-6 tracking-tight leading-[1.05]">
                    Ready to scale your revenue operations?
                </h2>
                
                <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                    From 100 to 10,000 invoices a month. Nobevra Elite grows with your operation, without the usual enterprise pain.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 items-center mb-8">
                    <Link href="/register" className="text-white bg-[#166FBB] px-12 py-6 text-lg font-extrabold rounded-[24px] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-noble-blue/30 flex items-center gap-3">
                        Start free today <ArrowRight className="w-6 h-6" />
                    </Link>
                    <Link href="/contact" className="flex items-center gap-3 px-8 py-6 rounded-[24px] border-2 border-white/10 text-white font-bold hover:bg-noble-surface/5 transition-colors">
                        <Phone className="w-5 h-5" /> Talk to sales
                    </Link>
                </div>
                
                <div className="flex items-center justify-center gap-3 text-sm text-white/50 font-bold uppercase tracking-widest">
                    <span>Custom contracts</span>
                    <span className="w-1 h-1 rounded-full bg-noble-surface/20" />
                    <span>Dedicated manager</span>
                    <span className="w-1 h-1 rounded-full bg-noble-surface/20" />
                    <span>SLA guarantee</span>
                </div>
            </div>
        </section>
    );
}

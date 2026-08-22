import React from 'react';
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export default function EnterpriseFrameworkSection() {
    return (
        <section className="py-24 md:py-32 bg-[#F0F2FF] relative overflow-hidden">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center mb-16">
                
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6 border border-noble-blue/20">
                    The Revenue Framework
                </div>
                
                <h2 className="font-inter text-[32px] md:text-[48px] font-black text-near-black leading-[1.1] mb-6 tracking-tight max-w-3xl mx-auto">
                    Stop the leakage. <br/>Automate the collection.
                </h2>
                
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                    Nobevra Elite is high volume invoicing software built around a closed-loop revenue framework. We ensure that every billable event in your product translates into cash in your bank account.
                </p>

            </div>

            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                <div className="grid md:grid-cols-3 gap-8 relative">
                    
                    {/* Connection line for desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-noble-blue/10 -translate-y-1/2 z-0" />

                    <div className="bg-noble-surface rounded-[32px] p-8 border border-noble-blue/10 shadow-xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-6">
                            <Zap className="w-6 h-6 text-violet-600" />
                        </div>
                        <h3 className="font-black text-xl text-near-black mb-3">1. Capture (API Integration)</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            Connect your app via our API invoicing integration. The moment a customer upgrades, hits a usage limit, or renews a contract, Nobevra instantly generates the bill. Zero manual data entry.
                        </p>
                    </div>

                    <div className="bg-noble-surface rounded-[32px] p-8 border border-noble-blue/10 shadow-xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-noble-blue/10 flex items-center justify-center mb-6">
                            <ShieldCheck className="w-6 h-6 text-noble-blue" />
                        </div>
                        <h3 className="font-black text-xl text-near-black mb-3">2. Orchestrate (Compliance)</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            Before the invoice goes out, our engine automatically calculates regional VAT, applies custom enterprise discounts, and converts to any of our 160+ supported currencies. Total compliance.
                        </p>
                    </div>

                    <div className="bg-noble-surface rounded-[32px] p-8 border border-noble-blue/10 shadow-xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                            <BarChart3 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 className="font-black text-xl text-near-black mb-3">3. Recover (Smart AR)</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            If a payment fails or terms expire, our enterprise accounts receivable software takes over. Intelligent dunning and automated email sequences recover the revenue without bothering your sales team.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

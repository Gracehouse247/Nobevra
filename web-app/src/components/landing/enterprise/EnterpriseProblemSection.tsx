import React from 'react';
import { Code2, Cpu, Wrench } from 'lucide-react';

export default function EnterpriseProblemSection() {
    return (
        <section className="py-24 md:py-32 bg-noble-surface relative overflow-hidden">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                
                <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
                    
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                            The Engineering Bottleneck
                        </div>
                        
                        <h2 className="font-inter text-[32px] md:text-[48px] font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                            Large business billing software shouldn't require your best developers.
                        </h2>
                        
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                            <p>
                                As you scale, billing stops being a finance problem and becomes an engineering nightmare. Every new pricing model, regional tax law, or custom enterprise contract requires developer hours.
                            </p>
                            <p>
                                You end up with a brittle, custom-built enterprise invoicing software that breaks every time sales closes a non-standard deal. 
                            </p>
                            <p className="text-near-black font-bold">
                                The result? Your most expensive technical talent is stuck maintaining infrastructure instead of shipping features.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-[32px] border border-noble-border p-8 md:p-12 shadow-sm relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <Cpu className="w-48 h-48" />
                        </div>
                        
                        <h3 className="font-black text-2xl text-near-black mb-8">The hidden cost of internal billing</h3>
                        
                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-noble-surface border border-noble-border flex items-center justify-center shrink-0 shadow-sm">
                                    <Code2 className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-noble-text mb-1">30% of engineering resources</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">Companies building in-house billing spend nearly a third of their engineering capacity maintaining the ledger, fixing edge cases, and updating tax compliance.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-noble-surface border border-noble-border flex items-center justify-center shrink-0 shadow-sm">
                                    <Wrench className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-noble-text mb-1">6-12 month launch cycles</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">Want to launch usage-based billing or enter a new European market? Your legacy system requires a complete database migration and months of refactoring.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

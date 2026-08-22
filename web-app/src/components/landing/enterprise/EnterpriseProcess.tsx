import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function EnterpriseProcess() {
    return (
        <section className="py-24 md:py-32 bg-near-black text-white relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-noble-blue/10 blur-[100px] rounded-full translate-x-1/2 pointer-events-none" />
            
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    <div>
                        <h2 className="font-inter text-[32px] md:text-[48px] font-black leading-[1.1] mb-6 tracking-tight">
                            Migrate your billing <span className="text-noble-blue">without downtime.</span>
                        </h2>
                        
                        <p className="text-lg text-slate-400 max-w-xl mb-12 font-medium leading-relaxed">
                            Replacing a large business billing software can paralyze your cash flow. We developed a phased migration process that ensures you don't miss a single payment during the transition.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-noble-blue text-white flex items-center justify-center font-black text-xl shrink-0">1</div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Technical Mapping</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">Your dedicated account manager works with your engineering team to map your existing CRM data and ERP ledgers to our API invoicing integration.</p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-xl shrink-0">2</div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Parallel Processing</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">We run Nobevra alongside your existing system in a sandbox environment to verify calculations, tax compliance, and multi-currency conversions.</p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-xl shrink-0">3</div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2">Live Cutover</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">Once verified, we flip the switch. Your historical data remains accessible, and all new revenue flows securely through our SOC 2 certified infrastructure.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-[40px] p-8 md:p-12 relative backdrop-blur-sm">
                        <div className="text-center mb-8">
                            <h4 className="font-bold text-lg text-white mb-2">Average Implementation Time</h4>
                            <p className="text-5xl font-black text-emerald-400">14 Days</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-700 flex justify-between items-center">
                                <span className="text-slate-300 font-bold">Standard ERPs (NetSuite, SAP)</span>
                                <span className="text-emerald-400 font-mono text-sm">6-8 months</span>
                            </div>
                            <div className="bg-noble-blue/20 rounded-2xl p-4 border border-noble-blue/30 flex justify-between items-center relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-noble-blue" />
                                <span className="text-white font-bold ml-2">Nobevra Elite</span>
                                <span className="text-noble-blue font-mono text-sm font-bold">14 days</span>
                            </div>
                        </div>
                        
                        <p className="text-center text-sm text-slate-500 mt-8 italic">
                            "We were terrified of moving off our legacy billing system. Nobevra migrated 4,000 active subscriptions in a weekend without a single missed invoice."
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

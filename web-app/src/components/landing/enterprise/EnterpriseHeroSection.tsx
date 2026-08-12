import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';

export default function EnterpriseHeroSection() {
    return (
        <section className="relative pt-12 pb-24 md:pb-32 overflow-hidden" aria-label="Hero">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-noble-blue/5 blur-[130px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900/3 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-surface text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
                        Enterprise Billing Platform
                    </div>

                    <h1 className="font-inter text-near-black mb-6 text-[40px] md:text-[60px] lg:text-[72px] leading-[1.05] tracking-tight font-black">
                        Automate revenue operations <span className="text-noble-blue">at scale.</span>
                    </h1>

                    <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed font-medium">
                        Stop treating billing like an engineering project. Get a complete, automated enterprise billing platform with global tax orchestration, API invoicing integration, and dynamic accounts receivable. Deploy in weeks, not years.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <Link href="/register" className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 bg-[#166FBB]">
                            Start free today <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/contact" className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all">
                            <Phone className="w-5 h-5" /> Talk to sales
                        </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-near-black/10">
                        <div>
                            <p className="text-[28px] font-black text-near-black leading-none mb-1">99.999%</p>
                            <p className="text-[11px] text-near-black/50 font-bold uppercase tracking-widest">Uptime SLA</p>
                        </div>
                        <div>
                            <p className="text-[28px] font-black text-near-black leading-none mb-1">SOC 2</p>
                            <p className="text-[11px] text-near-black/50 font-bold uppercase tracking-widest">Type II Certified</p>
                        </div>
                        <div>
                            <p className="text-[28px] font-black text-near-black leading-none mb-1">160+</p>
                            <p className="text-[11px] text-near-black/50 font-bold uppercase tracking-widest">Global Currencies</p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="relative aspect-square md:aspect-auto md:h-[600px] w-full bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl p-8 border border-white/20 flex flex-col">
                        <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/10">
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">API Event Stream</h3>
                                <p className="text-slate-400 text-sm">invoice.payment_succeeded</p>
                            </div>
                            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
                                LIVE
                            </div>
                        </div>
                        
                        <div className="flex-1 space-y-4 font-mono text-sm">
                            <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-emerald-400">
                                <span className="text-slate-500">2026-07-05 14:01:22</span> POST /v1/invoices
                            </div>
                            <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-blue-400 ml-8 relative before:absolute before:-left-4 before:top-1/2 before:w-4 before:h-px before:bg-noble-surface/10">
                                <span className="text-slate-500">2026-07-05 14:01:23</span> FX Conversion (EUR -{'>'} USD)
                            </div>
                            <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-purple-400 ml-16 relative before:absolute before:-left-12 before:top-1/2 before:w-12 before:h-px before:bg-noble-surface/10">
                                <span className="text-slate-500">2026-07-05 14:01:25</span> Tax Orchestration Completed
                            </div>
                            <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 font-bold ml-8 relative before:absolute before:-left-4 before:top-1/2 before:w-4 before:h-px before:bg-noble-surface/10">
                                <span className="text-emerald-500/50 font-normal">2026-07-05 14:01:27</span> 200 OK — Invoice Sent
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-gradient-to-r from-noble-blue to-blue-600 rounded-2xl flex justify-between items-center text-white">
                            <div>
                                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-1">Total Processed Today</p>
                                <p className="text-3xl font-black">$4.2M</p>
                            </div>
                            <svg className="w-8 h-8 opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted By Logo Cloud */}
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 mt-24">
                <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
                    Trusted by operations and finance teams at scale
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <Image src="/images/logos/netflix-logo.png" alt="Netflix" width={100} height={30} className="h-6 w-auto object-contain" />
                    <Image src="/images/logos/google-logo.png" alt="Google" width={100} height={30} className="h-6 w-auto object-contain" />
                    <Image src="/images/logos/amazon-logo.png" alt="Amazon" width={100} height={30} className="h-7 w-auto object-contain" />
                    <Image src="/images/logos/microsoft-logo.png" alt="Microsoft" width={100} height={30} className="h-6 w-auto object-contain" />
                    <Image src="/images/logos/spotify-logo.png" alt="Spotify" width={100} height={30} className="h-7 w-auto object-contain" />
                </div>
            </div>
        </section>
    );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MagneticCard from '@/components/shared/MagneticCard';

export default function FeaturesBento() {
    return (
        <section id="features" className="py-32 relative">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="mb-24 text-center">
                    <h2 className="font-inter text-h1 text-near-black mb-6">
                        One Platform. <span className="italic text-noble-blue underline decoration-electric-cyan/30">Every Tool You Need.</span>
                    </h2>
                    <p className="text-body-lg text-near-black/50 max-w-2xl mx-auto">A world-class suite of financial tools engineered to replace your entire back-office stack.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[340px]">
                    
                    {/* Bento Card 1: Precision Invoicing */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-8 md:row-span-2"
                    >
                        <Link 
                            href="/features/how-to-make-an-invoice-for-free"
                            className="block h-full w-full bg-gradient-to-br from-[#E6F5FB] to-white rounded-[40px] p-12 group overflow-hidden relative border border-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            <MagneticCard strength={15} className="h-full w-full">
                                <div className="relative z-10">
                                    <span className="text-primary font-bold uppercase text-[10px] tracking-widest mb-4 block">Core Engine</span>
                                    <h3 className="text-4xl font-extrabold mb-6 max-w-md tracking-tight">Precision Invoicing with 180+ Templates</h3>
                                    <p className="text-near-black/50 max-w-sm mb-8 leading-relaxed font-medium">Generate pixel-perfect documents that command respect and reinforce your brand's prestige.</p>
                                    <div className="flex items-center gap-2 font-black text-sm text-near-black group-hover:gap-4 transition-all">
                                        Explore Engine <span className="material-symbols-outlined text-noble-blue">arrow_right_alt</span>
                                    </div>
                                </div>
                                <div className="absolute right-0 bottom-0 w-[65%] transform translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
                                    <Image 
                                        src="/images/precision-invoicing.png" 
                                        alt="Invoice Preview — Precision Invoicing with 180+ templates"
                                        className="w-full h-full object-contain object-bottom"
                                        width={512}
                                        height={512}
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                            </MagneticCard>
                        </Link>
                    </motion.div>

                    {/* Bento Card 2: Unified CRM */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-4 md:row-span-1"
                    >
                        <Link 
                            href="/features/crm-engine"
                            className="block h-full w-full bg-gradient-to-br from-blue-50 to-white rounded-[40px] p-10 overflow-hidden relative group hover:scale-[1.02] transition-transform shadow-xl border border-white cursor-pointer"
                        >
                            <MagneticCard strength={20} className="h-full w-full">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                    <span className="material-symbols-outlined text-[120px] text-noble-blue">diversity_3</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-noble-blue/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-noble-blue">hub</span>
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-noble-surface border border-slate-100 text-[10px] font-black text-noble-blue uppercase tracking-widest shadow-sm">
                                            Pipeline Live
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black mb-2 text-noble-text tracking-tight">Unified CRM</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">Full lifecycle client management from lead to final settlement.</p>
                                    
                                    <div className="space-y-3 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-noble-surface border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center">
                                                <span className="text-[10px] font-black text-slate-400">AN</span>
                                            </div>
                                            <div className="h-2 w-24 bg-slate-100 rounded-full"></div>
                                            <div className="ml-auto px-3 py-1 rounded-full bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-tighter border border-green-100">Qualified</div>
                                        </div>
                                    </div>
                                </div>
                            </MagneticCard>
                        </Link>
                    </motion.div>

                    {/* Bento Card 3: Shopify Invoice Generator */}
                    <Link 
                        href="/features/shopify-invoice-generator"
                        className="md:col-span-4 md:row-span-1 bg-gradient-to-br from-[#E6F5FB] to-white rounded-[40px] p-10 flex flex-col justify-between border border-white shadow-xl hover:shadow-2xl transition-all group overflow-hidden cursor-pointer"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl text-primary">shopping_bag</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-near-black/30 uppercase tracking-widest">Shopify App</div>
                                    <div className="text-lg font-black text-near-black">Pro</div>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Shopify Invoices</h3>
                            <p className="text-near-black/50 text-sm leading-relaxed mb-6">Automated B2B billing with embedded Apple Pay and Google Pay.</p>
                            
                            <div className="space-y-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                <div className="flex items-center justify-between p-3 rounded-2xl bg-noble-surface/50 border border-white">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-noble-blue/10 flex items-center justify-center text-noble-blue">
                                            <span className="material-symbols-outlined text-sm">package_2</span>
                                        </div>
                                        <span className="text-[11px] font-bold">Standard License</span>
                                    </div>
                                    <span className="text-[9px] font-black text-green-600 uppercase">In Stock</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Bento Card 4: Digital Cards */}
                    <Link 
                        href="/features/digital-business-cards"
                        className="md:col-span-4 md:row-span-1 bg-gradient-to-br from-[#E6F5FB] to-white rounded-[40px] p-10 flex flex-col overflow-hidden relative group hover:scale-[1.02] transition-transform shadow-xl border border-white cursor-pointer"
                    >
                        <div className="relative z-30 mb-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-noble-blue/10 border border-noble-blue/10 text-noble-blue font-black text-[9px] uppercase tracking-widest mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-noble-blue animate-pulse"></span>
                                NFC 3.0 Ready
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-near-black">Digital Cards</h3>
                            <p className="text-near-black/50 text-sm leading-relaxed max-w-[280px]">NFC-enabled networking with built-in instant payment links.</p>
                        </div>

                        <div className="relative h-[150px] w-full flex justify-center items-center z-20 mt-4">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-noble-blue/20 blur-[60px] rounded-full"></div>
                            <div className="relative w-[260px] h-[150px] bg-noble-blue rounded-2xl border border-white/30 overflow-hidden shadow-2xl flex flex-col p-5 rotate-[-6deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-700 pointer-events-none translate-y-2 group-hover:translate-y-[-5px]">
                                <div className="absolute inset-0 bg-gradient-to-tr from-near-black/20 via-transparent to-white/30"></div>
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="flex flex-col gap-1">
                                        <div className="w-6 h-6 bg-noble-surface/20 backdrop-blur-md rounded-md flex items-center justify-center border border-white/20">
                                            <span className="material-symbols-outlined text-white text-[14px]">diamond</span>
                                        </div>
                                        <div className="text-[6px] font-black text-white/40 uppercase tracking-[0.3em]">Noble Protocol</div>
                                    </div>
                                </div>
                                <div className="mt-auto relative z-10">
                                    <div className="text-sm font-black text-white tracking-tight mb-0.5">ALEXANDER NOBLE</div>
                                    <div className="text-[7px] font-bold text-white/60 uppercase tracking-[0.3em] mb-3">Principal Designer</div>
                                </div>
                                <div className="absolute top-0 left-[-150%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[150%] transition-all duration-1500"></div>
                            </div>
                        </div>
                    </Link>

                    {/* Bento Card 5: International Payments */}
                    <Link 
                        href="/features/settlements"
                        className="md:col-span-8 md:row-span-1 bg-gradient-to-br from-indigo-50 to-white rounded-[40px] p-12 flex items-center gap-12 overflow-hidden relative group hover:shadow-2xl transition-all cursor-pointer shadow-xl border border-white"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-noble-blue/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        
                        <div className="flex-1 relative z-10">
                            <span className="text-noble-blue font-black uppercase text-[10px] tracking-widest mb-4 block">Global Settlement</span>
                            <h3 className="text-4xl font-extrabold mb-4 tracking-tight text-noble-text">International Payments. <span className="text-noble-blue">Simplified.</span></h3>
                            <p className="text-slate-500 font-medium max-w-sm mb-8">Accept payments globally with real-time settlement in 50+ currencies. Powered by Flutterwave.</p>
                            <div className="flex items-center gap-2 font-black text-sm text-noble-text group-hover:gap-4 transition-all">
                                Configure Gateway <span className="material-symbols-outlined text-noble-blue">arrow_right_alt</span>
                            </div>
                        </div>

                        {/* Redesigned Visual: Currency Converter Mock */}
                        <div className="hidden lg:flex flex-col gap-4 w-[300px] relative z-10">
                            <div className="bg-noble-surface rounded-2xl p-5 border border-slate-100 shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-noble-text">US</div>
                                        <span className="text-xs font-bold text-noble-text">USD</span>
                                    </div>
                                    <span className="text-lg font-black text-noble-text">$4,500.00</span>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-noble-blue flex items-center justify-center text-white shadow-lg">
                                        <span className="material-symbols-outlined text-sm font-black">sync</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-[10px] font-black text-green-600">NG</div>
                                        <span className="text-xs font-bold text-noble-text">NGN</span>
                                    </div>
                                    <span className="text-lg font-black text-noble-blue">₦7,200,000.00</span>
                                </div>
                            </div>
                            <div className="bg-noble-surface rounded-xl p-3 border border-slate-50 flex items-center justify-between shadow-sm">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Rate</span>
                                <span className="text-[10px] font-bold text-noble-blue">1 USD = 1,600 NGN</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}

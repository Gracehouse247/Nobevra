import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#F8FAFC] dark:bg-[#060D1A] border-t border-near-black/5 pt-20 pb-10 px-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-noble-blue/5 blur-[150px] rounded-full -mr-64 -mt-64" />
            
            <div className="max-w-[1430px] mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Image src="/images/logo.png" alt="NobleInvoice Logo" width={155} height={64} className="h-14 w-auto object-contain group-hover:scale-105 transition-transform" priority />
                        </Link>
                        <p className="text-near-black/40 text-base leading-relaxed font-medium">
                            The world's most advanced invoicing and global settlement engine. Engineered for performance, designed for clarity, and built for the 1%.
                        </p>
                        
                        {/* Store Badges */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <a href="#" className="hover:scale-105 transition-transform duration-300">
                                <img src="/images/badges/app-store.png" alt="Download on the App Store" className="h-8 w-auto object-contain" />
                            </a>
                            <a href="#" className="hover:scale-105 transition-transform duration-300">
                                <img src="/images/badges/play-store.png" alt="Get it on Google Play" className="h-[36px] w-auto object-contain" />
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-6 items-center">
                            {['X', 'LinkedIn', 'Instagram'].map((social) => (
                                <a key={social} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-near-black/60 hover:text-noble-blue transition-colors">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Products (Curated Major Features Only) */}
                    <div>
                        <p className="text-[10px] font-black text-near-black uppercase tracking-[0.3em] mb-8">Products</p>
                        <ul className="space-y-4">
                            <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/free-invoice-generator">Free Invoice Generator</Link></li>
                            <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/features/best-ai-invoice-generator-free">AI Invoice Generator</Link></li>
                            <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/gamified-invoicing-software">Gamified Invoicing</Link></li>
                            <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/lightweight-crm-for-freelancers">Freelance CRM</Link></li>
                            <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/solutions/enterprise-billing-platform">Enterprise Billing Platform</Link></li>
                            <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/ai-receipt-scanner">Receipt Scanner</Link></li>
                            <li className="pt-2">
                                <Link className="text-noble-blue font-bold hover:text-near-black transition-colors text-sm flex items-center gap-1 group" href="/features">
                                    View all our features
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <p className="text-[10px] font-black text-near-black uppercase tracking-[0.3em] mb-8">Company</p>
                        <ul className="space-y-4">
                            <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/free-invoice-maker-app-about">Our Story</Link></li>
                            <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/blog">Press Kit</Link></li>
                            <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/free-invoice-maker-app-about">Careers</Link></li>
                            <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/where-to-make-business-cards">Contact</Link></li>
                            <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/compliance">Global Compliance</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal & Connected */}
                    <div className="space-y-10">
                        <div>
                            <p className="text-[10px] font-black text-near-black uppercase tracking-[0.3em] mb-8">Legal</p>
                            <ul className="space-y-3">
                                <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/terms">Terms of Service</Link></li>
                                <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/privacy">Privacy Policy</Link></li>
                                <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/refund">Refund Policy</Link></li>
                                <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/acceptable-use">Acceptable Use</Link></li>
                                <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/compliance">Global Compliance</Link></li>
                                <li><Link className="text-near-black/50 font-bold hover:text-noble-blue transition-colors text-sm" href="/security">Security</Link></li>
                            </ul>
                        </div>
                        
                        {/* Newsletter */}
                        <div>
                            <p className="text-[10px] font-black text-near-black uppercase tracking-[0.3em] mb-4">Stay Noble</p>
                            <div className="relative group">
                                <input 
                                    type="email" 
                                    placeholder="Enter email"
                                    className="w-full bg-noble-surface dark:bg-noble-card border border-near-black/5 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-noble-blue/20 transition-all"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-near-black text-white flex items-center justify-center hover:bg-noble-blue transition-colors">
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Zoho-style bottom legal row - positioned before copyright */}
                <div className="w-full bg-[#000000] py-2 px-6 rounded-lg mb-8">
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12px] font-semibold">
                        <Link href="/cookies" className="text-slate-300 hover:text-white transition-colors">Cookie Policy</Link>
                        <span className="text-slate-600 dark:text-slate-400 dark:text-slate-500">|</span>
                        <Link href="/ai-policy" className="text-slate-300 hover:text-white transition-colors">AI Policy</Link>
                        <span className="text-slate-600 dark:text-slate-400 dark:text-slate-500">|</span>
                        <Link href="/dpa" className="text-slate-300 hover:text-white transition-colors">DPA</Link>
                        <span className="text-slate-600 dark:text-slate-400 dark:text-slate-500">|</span>
                        <Link href="/subprocessors" className="text-slate-300 hover:text-white transition-colors">Subprocessors</Link>
                        <span className="text-slate-600 dark:text-slate-400 dark:text-slate-500">|</span>
                        <Link href="/data-retention" className="text-slate-300 hover:text-white transition-colors">Data Retention</Link>
                        <span className="text-slate-600 dark:text-slate-400 dark:text-slate-500">|</span>
                        <Link href="/esa" className="text-slate-300 hover:text-white transition-colors">Enterprise Security Addendum</Link>
                        <span className="text-slate-600 dark:text-slate-400 dark:text-slate-500">|</span>
                        <Link href="/sla" className="text-slate-300 hover:text-white transition-colors">Service Level Agreement</Link>
                        <span className="text-slate-600 dark:text-slate-400 dark:text-slate-500">|</span>
                        <Link href="/disaster-recovery" className="text-slate-300 hover:text-white transition-colors">Disaster Recovery</Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between border-t border-near-black/5 pt-10 text-[10px] text-near-black/50 font-black uppercase tracking-[0.4em] gap-8">
                    <p>© 2026 NOBLEINVOICE. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span>POWERED BY</span>
                        </div>
                        <div className="h-1 w-12 bg-near-black/5"></div>
                        <span>The Noble's Technology Services</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

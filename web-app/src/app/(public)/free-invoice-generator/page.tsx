'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    FileText, Zap, Shield, CheckCircle, Download, ChevronDown,
    TrendingUp, AlertTriangle, Clock, Star, ArrowRight, Receipt, Users
} from 'lucide-react';
import Footer from '@/components/shared/Footer';
import FinalCTA from '@/components/landing/FinalCTA';
import TemplateShowcase from '@/components/landing/TemplateShowcase';

export default function InvoiceGeneratorPage() {
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowSticky(window.scrollY > 600);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">

            {/* ── STICKY CTA BAR ── */}
            <div className={`fixed bottom-0 left-0 right-0 z-[110] bg-white/95 backdrop-blur-md border-t border-near-black/5 shadow-[0_-20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 ${showSticky ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="hidden sm:block">
                        <p className="text-sm font-black text-near-black">Free Invoice Generator</p>
                        <p className="text-xs text-near-black/50 font-bold">Trusted by 2,000,000+ businesses worldwide</p>
                    </div>
                    <Link
                        href="/register"
                        className="w-full sm:w-auto text-white px-8 py-3 text-sm font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-noble-blue/30 hover:scale-[1.02] active:scale-95 transition-all"
                        style={{ backgroundColor: '#166FBB' }}
                    >
                        <Download className="w-4 h-4" /> Generate Free Invoice
                    </Link>
                </div>
            </div>

            {/* ── 1 & 2. HERO ── */}
            <section className="relative min-h-screen flex items-center pb-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center z-10">

                    {/* Left: Copy */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            100% Free · No Credit Card
                        </div>

                        <h1 className="font-inter text-near-black mb-6 text-[38px] md:text-[52px] leading-[1.05] tracking-tight font-black">
                            The Free Online <span className="text-noble-blue">Invoice Generator</span> That Actually Gets You Paid.
                        </h1>

                        <p className="text-lg md:text-xl text-near-black/60 max-w-xl mb-8 leading-relaxed font-medium">
                            Create a polished PDF invoice in under 30 seconds. No Word templates. No Excel formulas. No accounting degree.
                            The professional invoice maker used by 2,000,000+ businesses worldwide.
                        </p>

                        {/* Trust stat row */}
                        <div className="flex flex-wrap items-center gap-6 mb-10">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[{ bg: 'bg-noble-blue', t: 'SJ' }, { bg: 'bg-[#0599D5]', t: 'MT' }, { bg: 'bg-emerald-500', t: 'ER' }, { bg: 'bg-violet-500', t: 'AK' }].map((a, i) => (
                                        <div key={i} className={`w-8 h-8 rounded-full ${a.bg} border-2 border-white flex items-center justify-center text-white text-[9px] font-black shadow-sm`}>{a.t}</div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}</div>
                                    <p className="text-[11px] font-bold text-near-black/50">2M+ happy users</p>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-near-black/10" />
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-500 text-lg">verified_user</span>
                                <div>
                                    <p className="text-[10px] font-black text-near-black uppercase tracking-tight">SOC 2 Type II</p>
                                    <p className="text-[9px] text-near-black/40 font-bold uppercase">Certified</p>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-near-black/10" />
                            <div>
                                <p className="text-lg font-black text-near-black">100%</p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-near-black/40">Free Forever</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <Link
                                href="/register"
                                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                                style={{ backgroundColor: '#166FBB' }}
                            >
                                Build Your Invoice Free
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>

                        <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest">
                            No signup required · Download PDF instantly
                        </p>
                    </div>

                    {/* Right: Mock Invoice Builder */}
                    <div className="relative" style={{ perspective: '1200px' }}>
                        <div
                            className="bg-white rounded-[32px] shadow-[0_50px_100px_rgba(0,0,0,0.12)] border border-slate-100 p-6 md:p-8 text-near-black relative group transition-transform duration-700 hover:rotate-0"
                            style={{ transform: 'rotateY(-8deg) rotateX(2deg)' }}
                        >
                            <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/10 to-electric-cyan/10 blur-2xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                            {/* Invoice header */}
                            <div className="flex justify-between items-start border-b border-slate-100 pb-6 mb-6">
                                <div>
                                    <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 font-bold cursor-pointer hover:bg-slate-100 transition-colors">
                                        + Logo
                                    </div>
                                    <div className="mt-3 space-y-1">
                                        <div className="h-3 w-28 bg-slate-100 rounded animate-pulse"></div>
                                        <div className="h-2.5 w-20 bg-slate-100 rounded animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="text-right space-y-2">
                                    <p className="text-4xl font-black text-slate-200 uppercase tracking-widest">Invoice</p>
                                    <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                                        <span className="text-slate-400 font-bold text-xs">#</span>
                                        <span className="text-sm font-bold text-slate-700">INV-0001</span>
                                    </div>
                                    <div className="text-xs text-slate-400 space-y-1">
                                        <div className="flex justify-end gap-4"><span>Date:</span><span className="font-bold text-slate-600">04 Jul 2026</span></div>
                                        <div className="flex justify-end gap-4"><span>Due:</span><span className="font-bold text-slate-600">Net 30</span></div>
                                    </div>
                                </div>
                            </div>

                            {/* Bill To */}
                            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Billed To</span>
                                <div className="h-3.5 w-36 bg-slate-200 rounded animate-pulse mb-1.5"></div>
                                <div className="h-2.5 w-24 bg-slate-100 rounded animate-pulse"></div>
                            </div>

                            {/* Line items */}
                            <div className="mb-6 border border-slate-100 rounded-xl overflow-hidden">
                                <div className="grid grid-cols-[1fr_auto_auto] bg-slate-50 border-b border-slate-100 p-3">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Item</span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider text-right w-12">Qty</span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider text-right w-24">Amount</span>
                                </div>
                                {[
                                    { name: 'Consulting Services', qty: '1', amt: '$1,200.00' },
                                    { name: 'Design Deliverables', qty: '3', amt: '$900.00' },
                                ].map((item, i) => (
                                    <div key={i} className="grid grid-cols-[1fr_auto_auto] p-3 items-center border-b border-slate-50 last:border-0">
                                        <span className="text-sm font-bold text-slate-700">{item.name}</span>
                                        <span className="text-sm text-slate-500 text-right w-12">{item.qty}</span>
                                        <span className="text-sm font-bold text-slate-700 text-right w-24">{item.amt}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="flex justify-end mb-8">
                                <div className="w-1/2 space-y-2">
                                    <div className="flex justify-between text-sm text-slate-400 font-medium"><span>Subtotal</span><span>$2,100.00</span></div>
                                    <div className="flex justify-between text-sm text-slate-400 font-medium"><span>Tax (7.5%)</span><span>$157.50</span></div>
                                    <div className="flex justify-between text-lg font-black text-near-black border-t border-slate-200 pt-2 mt-1"><span>Total</span><span>$2,257.50</span></div>
                                </div>
                            </div>

                            <Link href="/register" className="w-full py-4 bg-noble-blue text-white rounded-xl font-extrabold shadow-lg hover:opacity-90 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" /> Download PDF Free
                            </Link>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-near-black/5 z-20 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-near-black uppercase tracking-wider">Invoice Sent</p>
                                <p className="text-sm font-black text-green-700">+$2,257.50</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TRUST STRIP ── */}
            <section className="border-y border-near-black/5 bg-white py-8">
                <div className="max-w-[1200px] mx-auto px-4 text-center">
                    <p className="text-[10px] font-black text-near-black/30 uppercase tracking-[0.3em] mb-6">Trusted by 2,000,000+ freelancers & businesses worldwide</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {['Stripe', 'PayPal', 'Upwork', 'Fiverr', 'Shopify'].map(b => (
                            <div key={b} className="text-xl font-black tracking-tighter text-near-black/20" style={{ fontFamily: 'Clash Display' }}>{b}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. PROBLEM ── */}
            <section className="py-24 bg-white">
                <div className="max-w-[800px] mx-auto px-4 text-center">
                    <h2 className="font-inter text-3xl md:text-[40px] font-black text-near-black mb-6 tracking-tight leading-tight">
                        The hidden cost of billing manually.
                    </h2>
                    <p className="text-lg text-near-black/60 leading-relaxed">
                        Most freelancers start with a Word document someone sent them in 2019. It has no auto-calc. It uses the wrong currency symbol. And every new client gets a slightly different version. The result? Inconsistent branding, math errors, and delayed payments. Using a dedicated <strong className="text-near-black">professional invoice maker</strong> fixes this from invoice one.
                    </p>
                </div>
            </section>

            {/* ── 4. WHAT IS AN INVOICE? (NEW - SEO block) ── */}
            <section className="py-24 bg-[#F8FAFC] border-t border-near-black/5">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                            <FileText className="w-3 h-3" /> The Basics
                        </div>
                        <h2 className="text-3xl md:text-[40px] font-black text-near-black mb-6 tracking-tight leading-[1.1]">
                            What is an invoice?
                        </h2>
                        <div className="space-y-4 text-lg text-near-black/60 leading-relaxed">
                            <p>
                                An invoice is a formal document you send to a client after delivering a product or service. It itemises exactly what was delivered, the agreed price, and when payment is expected.
                            </p>
                            <p>
                                A proper invoice does more than request payment — it is a legally binding commercial document that records the transaction for both your accounts and your client's. Missing a single required field (like a unique invoice number or your registered business address) can make it invalid for corporate clients.
                            </p>
                            <p>
                                That's why using a <strong className="text-near-black">free invoice generator</strong> with the correct fields pre-built beats a blank template every single time.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: '🔢', label: 'Unique Invoice Number', desc: 'Required for tax filing and audit trails.' },
                            { icon: '📅', label: 'Issue & Due Dates', desc: 'Define exactly when payment is expected (Net 15, Net 30).' },
                            { icon: '📋', label: 'Line Item Breakdown', desc: 'Itemise every deliverable to prevent payment disputes.' },
                            { icon: '💳', label: 'Payment Method', desc: 'Tell your client exactly how to pay you to trigger faster action.' },
                            { icon: '🏢', label: 'Business Details', desc: 'Full legal name, address, and registration number if applicable.' },
                            { icon: '💰', label: 'Tax Calculations', desc: 'Auto-calculated tax rates prevent compliance errors.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-noble-blue/30 transition-colors">
                                <span className="text-2xl mb-2 block">{item.icon}</span>
                                <p className="font-bold text-near-black text-sm mb-1">{item.label}</p>
                                <p className="text-xs text-near-black/50 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. THE CASH FLOW TRAP (Information Gain) ── */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-noble-blue/20 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-[1200px] mx-auto px-4 md:px-16 relative z-10 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-bold text-[10px] uppercase tracking-widest mb-6 border border-red-500/20">
                            <AlertTriangle className="w-3 h-3" /> The Cash Flow Trap
                        </div>
                        <h2 className="text-3xl md:text-[40px] font-black mb-6 tracking-tight leading-[1.1]">
                            Why a static PDF keeps you stuck in a 14-day payment gap.
                        </h2>
                        <div className="space-y-5 text-slate-300 text-lg leading-relaxed">
                            <p>
                                Other sites teach you <em>how</em> to generate a PDF. They miss the actual problem. Small businesses fail because of cash flow gaps — not ugly documents.
                            </p>
                            <p>
                                When you email a static PDF, you're flying blind. Did the client open it? Did it land in spam? Are they ignoring it deliberately? You have no way to know.
                            </p>
                            <p>
                                Research shows that businesses using basic PDFs wait an average of <strong className="text-white">14 extra days</strong> to get paid versus those using smart, trackable billing software. That gap costs you real money every month.
                            </p>
                            <Link href="/features/how-to-make-an-invoice-for-free" className="inline-flex items-center gap-2 text-noble-blue font-bold hover:gap-3 transition-all text-sm mt-2">
                                See how smart invoicing works <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-8 rounded-3xl space-y-8">
                        <h3 className="text-xl font-bold text-white">Average days to payment</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-slate-400">Static PDF invoice</span>
                                    <span className="text-red-400 font-black">21 Days</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-3">
                                    <div className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full w-full transition-all duration-1000"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-2">
                                    <span className="text-white font-bold">Smart billing software</span>
                                    <span className="text-emerald-400 font-black">7 Days</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-3">
                                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full" style={{ width: '33%' }}></div>
                                </div>
                            </div>
                            <div className="border-t border-slate-700 pt-6">
                                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                    Our full billing software tracks opens, sends automated reminders, and lets clients pay by credit card in one click — turning 21-day waits into 7-day wins.
                                </p>
                                <Link href="/pricing" className="inline-flex items-center gap-1.5 text-xs font-black text-noble-blue mt-4 hover:gap-2.5 transition-all">
                                    Upgrade to Pro billing <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. HOW TO CREATE INVOICE ONLINE ── */}
            <section className="py-24 bg-white border-y border-near-black/5">
                <div className="max-w-[800px] mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-[40px] font-black text-near-black tracking-tight leading-tight mb-4">
                            How to <span className="text-noble-blue">create invoice online</span> in 3 steps
                        </h2>
                        <p className="text-lg text-near-black/50">No software to install. No templates to wrangle. Works on any device.</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                step: '1',
                                title: 'Brand your document',
                                desc: 'Upload your company logo and fill in your business name and address. A branded invoice immediately signals that you are a legitimate, professional operation — not someone who threw a document together at the last minute.',
                            },
                            {
                                step: '2',
                                title: 'Add your line items and payment terms',
                                desc: "Input your client's billing details, the exact scope of work, your per-item rate, and any applicable taxes. The generator auto-calculates the total — no Excel required. Set your due date (e.g., Net 30) so the client knows precisely when you expect payment.",
                            },
                            {
                                step: '3',
                                title: 'Download and send',
                                desc: "Click download to get a crisp PDF you can email to your client directly. Or, create a free NobleInvoice account to send it through our secure portal — and get a notification the moment your client opens the invoice.",
                            },
                        ].map((s, i) => (
                            <div key={i} className="flex gap-6 items-start p-6 bg-[#F8FAFC] rounded-[28px] border border-slate-100 hover:border-noble-blue/30 transition-colors">
                                <div className="w-14 h-14 shrink-0 rounded-2xl bg-noble-blue text-white font-black text-xl flex items-center justify-center shadow-lg shadow-noble-blue/20">
                                    {s.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-near-black mb-2">{s.title}</h3>
                                    <p className="text-near-black/60 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. TEMPLATE SHOWCASE (NEW) ── */}
            <TemplateShowcase 
                title={<>Professional <span className="text-noble-blue">invoice templates</span> included.</>}
                subtitle="Every template is designed to make your business look polished. Pick a style, fill in your details, and download."
            />

            {/* ── 8. SERVICE DELIVERABLES ── */}
            <section className="py-24 bg-white border-t border-near-black/5">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-[700px] mx-auto mb-16">
                        <h2 className="text-3xl md:text-[40px] font-black text-near-black mb-6 tracking-tight leading-tight">
                            What makes a <span className="text-noble-blue">professional invoice maker</span> different?
                        </h2>
                        <p className="text-lg text-near-black/60 leading-relaxed">
                            A basic template lets you type numbers. A real professional invoice maker ensures every invoice is correct, consistent, and converts into actual payment.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: FileText,
                                title: 'Auto-calculating line items',
                                desc: 'Add items with quantity and rate. Taxes, discounts, and totals update live. Zero mental math required.',
                            },
                            {
                                icon: Shield,
                                title: 'Legally valid structure',
                                desc: 'All required fields are pre-built. Invoice number, payment terms, business registration — nothing gets forgotten.',
                            },
                            {
                                icon: TrendingUp,
                                title: 'Designed to get paid',
                                desc: 'Clear layout, bold total, and a payment section that tells clients exactly what to do next — reducing friction and delays.',
                            },
                            {
                                icon: Clock,
                                title: 'Ready in 30 seconds',
                                desc: 'No registration needed to generate a basic PDF. Open the tool, fill in your details, click download.',
                            },
                            {
                                icon: Receipt,
                                title: 'Works with any currency',
                                desc: 'USD, GBP, EUR, NGN, and 160+ currencies supported. The professional invoice maker for global businesses.',
                            },
                            {
                                icon: Users,
                                title: 'Client management upgrade',
                                desc: 'Graduate to full billing software — save client details, send recurring invoices, and track every open and payment.',
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 rounded-[28px] bg-[#F8FAFC] border border-slate-100 hover:border-noble-blue/30 transition-colors">
                                <div className="w-12 h-12 bg-noble-blue/5 rounded-2xl flex items-center justify-center text-noble-blue mb-6">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-near-black mb-3">{item.title}</h3>
                                <p className="text-near-black/60 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 9. RELATED TOOLS (Internal Links) ── */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <h2 className="text-2xl md:text-3xl font-black text-center mb-12 tracking-tight">Related free tools you might need</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                href: '/receipt-scanner',
                                icon: '🔍',
                                label: 'AI Receipt Scanner',
                                desc: 'Photograph any receipt. Our AI extracts the data and logs it as an expense automatically.',
                            },
                            {
                                href: '/freelance-crm',
                                icon: '🗂',
                                label: 'Freelance CRM',
                                desc: 'Track clients, projects, and outstanding invoices from one clean dashboard.',
                            },
                            {
                                href: '/features/ai-invoice-generator',
                                icon: '✨',
                                label: 'AI Invoice Generator',
                                desc: 'Type a plain-English description of your work. AI converts it into a perfectly formatted invoice.',
                            },
                        ].map((tool, i) => (
                            <Link key={i} href={tool.href} className="group bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:border-noble-blue/50 hover:bg-slate-800 transition-all">
                                <span className="text-3xl block mb-4">{tool.icon}</span>
                                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-noble-blue transition-colors">{tool.label}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{tool.desc}</p>
                                <div className="mt-4 flex items-center gap-1 text-xs font-black text-noble-blue opacity-0 group-hover:opacity-100 transition-all">
                                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 10. REVIEWS ── */}
            <section className="py-24 bg-[#F8FAFC] border-t border-near-black/5">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <h2 className="text-3xl md:text-[40px] font-black text-near-black text-center mb-12 tracking-tight">
                        Real results from real businesses.
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                quote: `"Before NobleInvoice, I was chasing clients for weeks. Switching from a basic PDF generator to their full billing software cut my average collection time from 22 days to 6. Zero late payments in 3 months."`,
                                name: 'Alex K.',
                                role: 'Creative Agency Founder',
                                img: '/images/reviews/alex.jpg',
                            },
                            {
                                quote: `"The simplest create invoice online tool I've ever used. I built my first invoice while sitting in my truck at a job site. Professional-looking, correct totals, sent in 4 minutes."`,
                                name: 'Sarah J.',
                                role: 'Independent Contractor',
                                img: '/images/reviews/sarah.jpg',
                            },
                        ].map((r, i) => (
                            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex gap-1 mb-6">
                                        {[1,2,3,4,5].map(j => <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                                    </div>
                                    <p className="text-lg text-near-black font-medium leading-relaxed mb-8 italic">
                                        {r.quote}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                                    <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden shrink-0">
                                        <Image src={r.img} alt={r.name} width={48} height={48} className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <p className="font-black text-near-black">{r.name}</p>
                                        <p className="text-sm text-near-black/50">{r.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 11. BILLING SOFTWARE UPGRADE (Secondary keyword payoff) ── */}
            <section className="py-20 bg-white border-t border-near-black/5">
                <div className="max-w-[800px] mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-[40px] font-black text-near-black mb-6 tracking-tight">
                        Ready for more than a generator?
                    </h2>
                    <p className="text-lg text-near-black/60 leading-relaxed mb-10">
                        A free invoice generator is the right tool for one-off jobs. But as your business grows, you need <strong className="text-near-black">billing software</strong> that remembers your clients, automates reminders, and shows you who owes what at a glance. NobleInvoice Pro handles all of it — and it starts free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                            style={{ backgroundColor: '#166FBB' }}
                        >
                            Start Free Today
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                        <Link
                            href="/pricing"
                            className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
                        >
                            View Pro Plans
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── 12. FAQ ── */}
            <section className="py-24 bg-[#F8FAFC] border-t border-near-black/5">
                <div className="max-w-[800px] mx-auto px-4">
                    <h2 className="text-3xl md:text-[40px] font-black text-near-black text-center mb-12 tracking-tight">Frequently asked questions</h2>

                    <div className="space-y-4">
                        {[
                            {
                                q: 'Is this free invoice generator actually free?',
                                a: 'Yes, completely. You can fill in your details and download a PDF invoice without creating an account or entering a credit card. The free tier has no hidden costs.',
                            },
                            {
                                q: 'What is the difference between this tool and billing software?',
                                a: 'This generator creates a static PDF file. Billing software (like NobleInvoice Pro) saves your client history, tracks whether the invoice has been opened, sends automated payment reminders, and lets your clients pay by card directly on the invoice. The generator is perfect for occasional use — billing software is for growing businesses who invoice regularly.',
                            },
                            {
                                q: 'Can I add my company logo?',
                                a: 'Yes. You can upload your logo and it will appear at the top of your generated PDF exactly as you would expect on a professionally designed invoice.',
                            },
                            {
                                q: 'Are these invoices legally binding?',
                                a: 'When filled out correctly with your registered business information, the client\'s details, accurate line items, and a unique invoice number, the generated document is a legally valid commercial invoice in most jurisdictions.',
                            },
                            {
                                q: 'This may not be right for you if…',
                                a: 'If you run a large enterprise with complex ERP integrations, multi-entity accounting, or bespoke approval workflows, this free generator is too lightweight. We built NobleInvoice for freelancers, solopreneurs, and growing small businesses — not 500-person finance departments.',
                            },
                            {
                                q: 'Can I use this internationally with different currencies?',
                                a: 'Yes. The generator supports 160+ currencies including USD, GBP, EUR, NGN, GHS, and more. You can also adjust the tax rate to match your local government requirements (VAT, GST, Sales Tax, etc.).',
                            },
                        ].map((faq, i) => (
                            <details key={i} className="group bg-white rounded-2xl border border-slate-100 shadow-sm [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-near-black font-bold">
                                    <h3 className="text-base md:text-lg leading-snug">{faq.q}</h3>
                                    <span className="shrink-0 w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-near-black group-open:-rotate-180 transition duration-300">
                                        <ChevronDown className="w-4 h-4" />
                                    </span>
                                </summary>
                                <p className="px-6 pb-6 text-near-black/60 leading-relaxed text-base">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SOFT CTA ── */}
            <FinalCTA />
            <Footer />
        </div>
    );
}

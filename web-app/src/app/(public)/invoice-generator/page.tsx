import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import {
    FileCheck, Sparkles, ArrowRight, Download,
    Send, ShieldCheck, Zap
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Free Invoice Generator Online | Create Invoices Instantly | Nobevra',
    description: 'Generate, download, and email professional invoices for free. 180+ templates, automatic tax calculation, and PDF export with Nobevra.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/invoice-generator',
    },
    keywords: [
        'free invoice generator',
        'invoice generator online',
        'free invoice maker',
        'simple invoice generator',
        'invoice template PDF free'
    ],
    openGraph: {
        title: 'Free Invoice Generator Online | Nobevra',
        description: 'Create and send professional invoices in under 60 seconds.',
        url: 'https://nobevra.noblesworld.com.ng/invoice-generator',
        type: 'website',
    },
};

export default function InvoiceGeneratorPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
            {/* Hero */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-6">
                        <FileCheck className="w-4 h-4" />
                        100% Free Invoice Generator
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
                        Create & Send Invoices in <span className="text-emerald-600">60 Seconds.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
                        Choose from 180+ designer invoice templates, customize your brand colors and logo, and download a pixel-perfect PDF or send a payment link.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/free-invoice-generator"
                            className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                        >
                            Open Free Generator Tool
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-noble-surface border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            Save Your Invoices (Free Account)
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Benefits */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                            <Download className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Instant PDF Download</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Export print-ready, vectorized PDF documents formatted for global commercial compliance.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">No Sign-Up Required to Start</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Draft and download your first invoice immediately without creating an account or providing a credit card.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-6">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Automatic Tax & Totals</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Calculate VAT, GST, discounts, and currency totals dynamically in real time as you type.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

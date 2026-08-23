import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    Receipt, FileText, ArrowRight, CheckCircle2,
    DollarSign, Globe, Sparkles, Send
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Online Invoicing Software for Small Business | Nobevra',
    description: 'Create and send professional invoices in seconds. 180+ templates, automated payment reminders, multi-currency support, and online checkout with Nobevra.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/invoicing',
    },
    keywords: [
        'invoicing software',
        'invoice software for small business',
        'online invoicing software',
        'free invoice software',
        'automated billing software'
    ],
    openGraph: {
        title: 'Online Invoicing Software | Nobevra',
        description: 'Send professional invoices and get paid 2x faster with automated reminders.',
        url: 'https://nobevra.noblesworld.com.ng/invoicing',
        type: 'website',
    },
};

export default function InvoicingPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
            <BreadcrumbSchema
                pageId="invoicing"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Invoicing Software' },
                ]}
            />
            {/* Hero */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-6">
                        <Receipt className="w-4 h-4" />
                        Professional Invoicing Engine
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
                        The Professional <span className="text-noble-blue">Invoicing Software</span> Built to Get You Paid Faster.
                    </h1>
                    <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
                        Design pixel-perfect invoices with 180+ templates, automate payment follow-ups, and offer clients a one-click payment portal via Flutterwave.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                        >
                            Create Free Invoice
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/free-invoice-generator"
                            className="w-full sm:w-auto px-8 py-4 bg-noble-surface border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            Instant Generator Tool
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core Modules */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">180+ Premium Templates</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Clean, Modern, Minimal, Bold, and Classic styles tailored for agencies, contractors, freelancers, and enterprise consultancies.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                            <Send className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Automated Reminders</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Never chase late payments manually again. Send polite automated reminder emails before and on due dates.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">One-Click Client Portal</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Clients receive a direct web checkout link to review and pay invoices instantly using debit cards or bank transfers.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

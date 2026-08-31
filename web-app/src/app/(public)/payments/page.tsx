import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    CreditCard, DollarSign, ArrowRight, ShieldCheck,
    Wallet, Globe, Lock, RefreshCw
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'International Business Payments — Multi-Currency Invoicing & Checkout | Nobevra',
    description: 'Accept global credit card payments, bank transfers, and mobile money in 30+ currencies with Nobevra. Fast settlement, zero hidden fees, and PCI-DSS Level 1 security.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/payments',
    },
    keywords: [
        'business payment software',
        'online billing software',
        'small business payment solutions',
        'invoice payment gateway',
        'multi currency billing software'
    ],
    openGraph: {
        title: 'International Business Payments — Multi-Currency Invoicing & Checkout | Nobevra',
        description: 'Accept global credit card payments, bank transfers, and mobile money in 30+ currencies with Nobevra. Fast settlement, zero hidden fees, and PCI-DSS Level 1 security.',
        url: 'https://nobevra.noblesworld.com.ng/payments',
        type: 'website',
    },
};

export default function PaymentsPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
            <BreadcrumbSchema
                pageId="payments"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Business Payments' },
                ]}
            />
            {/* Hero */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 font-bold text-xs uppercase tracking-widest mb-6">
                        <CreditCard className="w-4 h-4" />
                        Business Payments & Settlements
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
                        The Intelligent <span className="text-amber-600">Payment Software</span> for Growing Businesses.
                    </h1>
                    <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
                        Get paid 2x faster with verified Flutterwave payment links on every invoice. Accept debit cards, bank transfers, and USSD with bank-grade encryption.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                        >
                            Start Accepting Payments
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="w-full sm:w-auto px-8 py-4 bg-noble-surface border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            View Transaction Fees
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">One-Click Checkout Portal</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed mb-4">
                            Clients click the link on your invoice and pay instantly on web or mobile without registering or remembering passwords.
                        </p>
                        <Link href="/client-portal-software" className="text-amber-600 font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1">
                            Client Portal Checkout <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Automated Retainer Billing</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed mb-4">
                            Auto-charge saved payment methods on monthly retainers and recover failed charges with automated dunning workflows.
                        </p>
                        <Link href="/recurring-billing-software" className="text-emerald-600 font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1">
                            Recurring Billing <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Integrated Invoicing Engine</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed mb-4">
                            Payments automatically reconcile against your accounts receivable ledger as soon as the client transaction settles.
                        </p>
                        <Link href="/invoicing" className="text-noble-blue font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1">
                            Online Invoicing <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

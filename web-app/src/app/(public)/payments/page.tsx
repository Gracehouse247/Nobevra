import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import {
    CreditCard, DollarSign, ArrowRight, ShieldCheck,
    Wallet, Globe, Lock, RefreshCw
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Business Payment Software & Online Billing Solutions | Nobevra',
    description: 'Accept credit cards, bank transfers, and mobile payments securely via Flutterwave. Integrated in-app wallet and instant checkout for small businesses.',
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
        title: 'Business Payment Software | Nobevra',
        description: 'Accelerate cash flow with instant online checkout and multi-currency billing.',
        url: 'https://nobevra.noblesworld.com.ng/payments',
        type: 'website',
    },
};

export default function PaymentsPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
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
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Clients click the link on your invoice and pay instantly on web or mobile without registering or remembering passwords.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">In-App Business Wallet</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Monitor incoming transaction revenue in your real-time wallet ledger and initiate direct payouts to your corporate bank account.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">PCI-DSS Compliant Security</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Card data is handled exclusively by certified payment processors with 256-bit TLS encryption. Zero raw card storage on server.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

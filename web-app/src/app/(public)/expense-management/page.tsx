import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    Receipt, Camera, Sparkles, ArrowRight, CheckCircle2,
    PieChart, ShieldCheck, DollarSign
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Expense Management & AI Receipt Tracking Software | Nobevra',
    description: 'Track business expenses, scan receipts with Gemini AI, and categorize spending automatically. The simple expense management software for small business.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/expense-management',
    },
    keywords: [
        'expense tracking software',
        'expense management software',
        'small business expense tracker',
        'AI receipt scanner',
        'business expense categorization'
    ],
    openGraph: {
        title: 'Expense Management Software | Nobevra',
        description: 'Track business expenses and scan receipts automatically with Gemini AI.',
        url: 'https://nobevra.noblesworld.com.ng/expense-management',
        type: 'website',
    },
};

export default function ExpenseManagementPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
            <BreadcrumbSchema
                pageId="expense-management"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Expense Management' },
                ]}
            />
            {/* Hero */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-6">
                        <Receipt className="w-4 h-4" />
                        Expense Tracking & Management
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
                        Automated <span className="text-emerald-600">Expense Tracking</span> with AI Receipt Scanning.
                    </h1>
                    <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
                        Stop manual data entry. Capture receipts on your phone, categorize expenses by project or tax bracket, and maintain real-time profit & loss visibility.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                        >
                            Track Expenses Free
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/ai-receipt-scanner"
                            className="w-full sm:w-auto px-8 py-4 bg-noble-surface border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            Try AI Scanner Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                            <Camera className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Gemini OCR Extraction</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Extract vendor names, transaction dates, tax totals, and line items instantly from camera photos and PDF receipts.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-6">
                            <PieChart className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Profit & Loss Ledger</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Compare incoming invoice revenue directly against operating expenses to see your real net margins at any second.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Tax Season Ready</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Categorize deductions by standard tax categories and export clean CSV/PDF reports for your accountant in one click.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

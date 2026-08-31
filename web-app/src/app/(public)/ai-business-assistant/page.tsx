import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    Brain, Sparkles, ArrowRight, CheckCircle2,
    TrendingUp, Bot, FileText, Zap
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'AI Business Assistant — Intelligent Operations & Cash Flow Advisor | Nobevra',
    description: "Harness the power of AI to run your business. Nobevra's AI Business Assistant drafts invoices from natural language, forecasts cash flow, and automates tasks.",
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/ai-business-assistant',
    },
    keywords: [
        'AI business assistant',
        'AI financial intelligence',
        'automated financial reports',
        'AI receipt scanner',
        'cash flow forecasting AI'
    ],
    openGraph: {
        title: 'AI Business Assistant — Intelligent Operations & Cash Flow Advisor | Nobevra',
        description: "Harness the power of AI to run your business. Nobevra's AI Business Assistant drafts invoices from natural language, forecasts cash flow, and automates tasks.",
        url: 'https://nobevra.noblesworld.com.ng/ai-business-assistant',
        type: 'website',
    },
};

export default function AIBusinessAssistantPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
            <BreadcrumbSchema
                pageId="ai-business-assistant"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'AI Business Assistant' },
                ]}
            />
            {/* Hero */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-cyan/15 text-noble-blue font-bold text-xs uppercase tracking-widest mb-6">
                        <Brain className="w-4 h-4" />
                        Gemini AI Business Intelligence
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
                        The <span className="text-noble-blue">AI Business Assistant</span> Built for Financial Growth.
                    </h1>
                    <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
                        Stop drowning in spreadsheets. Nobevra translates raw transaction numbers into clear financial narrative summaries, cash flow forecasts, and automated recommendations.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                        >
                            Try AI Assistant Free
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/ai-receipt-scanner"
                            className="w-full sm:w-auto px-8 py-4 bg-noble-surface border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            Try Receipt Scanner
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core AI Capabilities */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">AI Invoice Creation</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed mb-4">
                            Draft line-item invoices from natural language prompts, voice notes, and contract milestones in seconds.
                        </p>
                        <Link href="/features/best-ai-invoice-generator-free" className="text-noble-blue font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1">
                            AI Invoice Generator <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Cash Flow Predictions</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed mb-4">
                            Analyze client payment turnaround patterns to forecast your cash balance for the next 30, 60, and 90 days.
                        </p>
                        <Link href="/cash-flow-analytics" className="text-emerald-600 font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1">
                            Cash Flow Analytics <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-6">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Automated Receipt Extraction</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed mb-4">
                            Gemini AI extracts invoice line items, tax breakdowns, and vendor metadata from receipts in under 3 seconds.
                        </p>
                        <Link href="/ai-receipt-scanner" className="text-violet-600 font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1">
                            AI Receipt Scanner <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

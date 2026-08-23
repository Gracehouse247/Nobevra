import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    Briefcase, CheckCircle2, ArrowRight, ShieldCheck,
    Zap, Layers, BarChart3, Users, DollarSign
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Business Management Software for Small Business | Nobevra',
    description: 'Nobevra is the all-in-one business management software suite. Unify invoicing, CRM, expense tracking, payments, inventory, and AI in one platform.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/business-management-software',
    },
    keywords: [
        'business management software',
        'business management software for small business',
        'small business management software',
        'business operations software',
        'business operating system software',
        'all in one software for business'
    ],
    openGraph: {
        title: 'Business Management Software Suite | Nobevra',
        description: 'Run your entire business operations from one intelligent software platform.',
        url: 'https://nobevra.noblesworld.com.ng/business-management-software',
        type: 'website',
    },
};

export default function BusinessManagementSoftwarePage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
            <BreadcrumbSchema
                pageId="business-management-software"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Business Management Software' },
                ]}
            />
            {/* Hero */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-6">
                        <Briefcase className="w-4 h-4" />
                        Business Management Software Suite
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
                        The Complete <span className="text-noble-blue">Business Management Software</span> for Small Business.
                    </h1>
                    <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
                        Consolidate your back-office operations into a single intelligent system. Invoicing, lightweight CRM, AI expenses, real-time inventory, and Flutterwave payments.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                        >
                            Start Free Business Suite
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="w-full sm:w-auto px-8 py-4 bg-noble-surface border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            Compare Plans & Features
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core Modules Grid */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                            <Layers className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">All-in-One Operations</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Replace 7 disconnected apps with one unified platform that syncs invoices, expenses, client data, and inventory in real time.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Accelerated Cash Flow</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Integrated online checkout via Flutterwave allows your customers to pay instantly with cards, bank transfers, or mobile money.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-6">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Automated Financial Insights</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Gemini AI narrative reports summarize your monthly revenue pacing, operating margins, and overdue accounts automatically.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

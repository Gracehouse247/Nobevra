import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    Users, Briefcase, Database, Lock, ShieldCheck, ChevronDown,
    Zap, Star, ArrowRight, FolderOpen, Search, CheckCircle2, MessageSquare
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Small Business CRM Software & Client Portal | Nobevra',
    description: 'Manage clients, track deal pipelines, monitor invoice views, and collaborate seamlessly. The lightweight CRM built for small business founders.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/crm',
    },
    keywords: [
        'CRM for small business',
        'small business CRM software',
        'lightweight CRM',
        'freelance client tracker',
        'client management software',
        'client portal software'
    ],
    openGraph: {
        title: 'Small Business CRM Software | Nobevra',
        description: 'Organize your clients and pipeline without enterprise bloat.',
        url: 'https://nobevra.noblesworld.com.ng/crm',
        type: 'website',
    },
};

export default function CRMPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
           <BreadcrumbSchema
               pageId="crm"
               crumbs={[
                   { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                   { name: 'CRM for Small Business' },
               ]}
           />
           {/* Hero */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-700 font-bold text-xs uppercase tracking-widest mb-6">
                        <Users className="w-4 h-4" />
                        CRM & Client Management
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
                        The CRM Built for <span className="text-violet-600">Action</span>, Not Data Entry.
                    </h1>
                    <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
                        Stop drowning in enterprise CRM spreadsheets. Nobevra connects client profiles directly to invoices, contracts, payment history, and business identity.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                        >
                            Start Free CRM
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/lightweight-crm-for-freelancers"
                            className="w-full sm:w-auto px-8 py-4 bg-noble-surface border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            Freelancer Guide
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-6">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Live Invoice Tracking</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Know the exact second a client opens their invoice. No more guessing if your email was delivered or lost in spam.
                        </p>
                    </div>
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                            <FolderOpen className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Unified Client Vault</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Every contract, invoice, receipt, and meeting note linked directly to the client's record in one secure place.
                        </p>
                    </div>
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Branded Client Portal</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Give your clients a friction-free payment portal where they can view invoices and pay online with zero login required.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

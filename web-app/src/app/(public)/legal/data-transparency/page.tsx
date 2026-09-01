import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Eye, Lock, RefreshCcw, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Transparency Report — Nobevra Security',
  description: 'Nobevra data transparency report. See how we handle your billing data, invoice records, and financial information with complete accountability and security.',
  keywords: ['data transparency', 'privacy transparency', 'billing security', 'secure financial data'],
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/legal/data-transparency',
  },
  openGraph: {
    title: 'Data Transparency Report — Nobevra Security',
    description: 'Nobevra data transparency report. See how we handle your billing data, invoice records, and financial information with complete accountability and security.',
    url: 'https://nobevra.noblesworld.com.ng/legal/data-transparency',
    type: 'website',
    images: [
      {
        url: '/images/hero-dashboard-actual.png',
        width: 1200,
        height: 630,
        alt: 'Nobevra Data Transparency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Transparency Report — Nobevra Security',
    description: 'Nobevra data transparency report. See how we handle your billing data, invoice records, and financial information with complete accountability and security.',
    images: ['/images/hero-dashboard-actual.png'],
  },
};

export default function DataTransparencyPage() {
    return (
        <div className="min-h-screen bg-black/95 bg-[url('/img/grid.svg')] bg-center bg-fixed text-white py-12 px-6">
            <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
                
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase text-slate-500 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Return Home
                </Link>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Data Transparency</h1>
                        <p className="text-sm text-slate-400 mt-1 font-medium tracking-wide">Clear outline of what we track, and why.</p>
                    </div>
                </div>

                <div className="space-y-8 text-slate-300 leading-relaxed text-sm md:text-base selection:bg-emerald-500/30">
                    <p className="text-lg font-medium text-white border-b border-white/10 pb-6 mb-8">
                        Nobevra relies on behavioral telemetry to synchronize your schedule with your biological rhythms. Because this requires personal workflow data, we believe in radical transparency regarding what is stored.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <h3 className="text-sm font-black uppercase text-emerald-400 flex items-center gap-2 mb-3">
                                <Eye className="w-4 h-4" /> What We Collect
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-400 list-inside list-disc">
                                <li>Task duration and completion rates.</li>
                                <li>Timestamps for entering and exiting deep focus sessions.</li>
                                <li>Mind Map relational structures (node maps).</li>
                                <li>Basic account metadata (Email, OAuth IDs).</li>
                            </ul>
                        </div>
                        
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <h3 className="text-sm font-black uppercase text-red-400 flex items-center gap-2 mb-3">
                                <Lock className="w-4 h-4" /> What We NEVER Collect
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-400 list-inside list-disc">
                                <li>Background applications running on your device.</li>
                                <li>Keystrokes outside of our web application.</li>
                                <li>Selling your contact data to 3rd party marketers.</li>
                                <li>Using your private task contents for core foundation AI training.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <RefreshCcw className="w-5 h-5 text-[#006970]" /> Data Storage & Retention
                        </h2>
                        <p>
                            All active user data represents your current "Cognitive State" and is stored securely in Supabase (AWS) infrastructure using industry-standard AES-256 encryption at rest. 
                        </p>
                        <p>
                            If you initiate a <b>Global Account Deletion</b> from the Settings dashboard, we execute a hard wipe of your UID and associated collections (Tasks, Habits, Maps, Notes) within 72 hours. Anonymized statistical logs may remain in aggregate system performance graphs.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}


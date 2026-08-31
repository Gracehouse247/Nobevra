import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    QrCode, Link as LinkIcon, Wifi, CreditCard, ArrowRight,
    BarChart3, ShieldCheck, Sparkles, Download
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Dynamic QR Code Generator — Custom QR with Logo & Scan Tracking | Nobevra',
    description: 'Create custom dynamic QR codes with Nobevra. Add your business logo, embed payment links, update destinations anytime, and track real-time scan analytics.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/qr-code-generator',
    },
    keywords: [
        'QR code generator for business',
        'free QR code generator',
        'dynamic QR code generator',
        'custom QR code maker',
        'QR code scan analytics',
        'vCard QR generator'
    ],
    openGraph: {
        title: 'Dynamic QR Code Generator — Custom QR with Logo & Scan Tracking | Nobevra',
        description: 'Create custom dynamic QR codes with Nobevra. Add your business logo, embed payment links, update destinations anytime, and track real-time scan analytics.',
        url: 'https://nobevra.noblesworld.com.ng/qr-code-generator',
        type: 'website',
    },
};

export default function QRCodeGeneratorPublicPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
            <BreadcrumbSchema
                pageId="qr-code-generator"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'QR Code Generator for Business' },
                ]}
            />
            {/* Hero */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 font-bold text-xs uppercase tracking-widest mb-6">
                        <QrCode className="w-4 h-4" />
                        Dynamic QR Engine
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
                        The Professional <span className="text-amber-600">QR Code Generator</span> for Growing Businesses.
                    </h1>
                    <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
                        Create high-resolution dynamic QR codes for URLs, digital business cards, payment portals, and WiFi passwords — with real-time scan telemetry.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                        >
                            Generate Free QR Codes
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="w-full sm:w-auto px-8 py-4 bg-noble-surface border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            View Analytics Features
                        </Link>
                    </div>
                </div>
            </section>

            {/* QR Types */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-noble-surface p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-4">
                            <LinkIcon className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold mb-2">Website & Landing URLs</h2>
                        <p className="text-near-black/60 text-xs leading-relaxed">
                            Direct customers to product pages, menus, or promotional links with instant redirect speed.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-4">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold mb-2">Payment Links</h2>
                        <p className="text-near-black/60 text-xs leading-relaxed">
                            Generate invoice payment QR codes that open your checkout portal directly on client phones.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4">
                            <Wifi className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold mb-2">WiFi Access QR</h2>
                        <p className="text-near-black/60 text-xs leading-relaxed">
                            Let office guests and cafe visitors connect to your secure WiFi network with a single camera scan.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-4">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold mb-2">Real-Time Telemetry</h2>
                        <p className="text-near-black/60 text-xs leading-relaxed">
                            Track total scans, unique scanners, city breakdown, and device types across all campaigns.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

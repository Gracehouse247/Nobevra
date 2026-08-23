import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    CreditCard, Smartphone, Wifi, QrCode, ArrowRight,
    Sparkles, ShieldCheck, Share2, Eye
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Digital Business Card Maker & NFC Smart Cards | Nobevra',
    description: 'Create modern digital business cards with QR codes and NFC tap-to-share capabilities. Share your contact info, social links, and portfolio instantly.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/digital-business-card',
    },
    keywords: [
        'digital business card',
        'digital business card creator',
        'NFC business card',
        'smart business card',
        'vCard QR code maker',
        'digital identity card'
    ],
    openGraph: {
        title: 'Digital Business Card Maker & NFC Smart Cards | Nobevra',
        description: 'Share your profile and capture leads with modern NFC & QR digital cards.',
        url: 'https://nobevra.noblesworld.com.ng/digital-business-card',
        type: 'website',
    },
};

export default function DigitalBusinessCardPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
            <BreadcrumbSchema
                pageId="digital-business-card"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Digital Business Card' },
                ]}
            />
            {/* Hero */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-6">
                        <CreditCard className="w-4 h-4" />
                        Digital Identity & Networking
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
                        The Smart <span className="text-noble-blue">Digital Business Card</span> for Modern Professionals.
                    </h1>
                    <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
                        Never run out of paper business cards again. Share your contact information, portfolio, payment links, and social channels with a single tap or scan.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                        >
                            Create Your Free Card
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/business-card-maker"
                            className="w-full sm:w-auto px-8 py-4 bg-noble-surface border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            Explore Studio
                        </Link>
                    </div>
                </div>
            </section>

            {/* Capability Pillars */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                            <Wifi className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">NFC Tap to Connect</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Tap your physical NFC card against any smartphone to open your digital profile instantly. No app installation required.
                        </p>
                    </div>
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-6">
                            <QrCode className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Dynamic QR Codes</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Update your phone number, email, or company role at any time without changing your QR code or reprinting anything.
                        </p>
                    </div>
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                            <Share2 className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Instant CRM Lead Capture</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Contacts who view your card can save your vCard directly to their contacts or submit their details to your Nobevra CRM pipeline.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

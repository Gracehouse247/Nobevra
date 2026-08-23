import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    Package, Boxes, ArrowRight, CheckCircle2,
    RefreshCw, AlertTriangle, QrCode
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Product & Inventory Management Software for Business | Nobevra',
    description: 'Track stock levels, manage product catalogs, set low-stock alerts, and link inventory to invoices in real time with Nobevra.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/products-inventory',
    },
    keywords: [
        'inventory management software',
        'product inventory management',
        'small business stock tracker',
        'product catalog software',
        'invoice inventory sync'
    ],
    openGraph: {
        title: 'Product & Inventory Management Software | Nobevra',
        description: 'Track inventory and connect stock levels directly to invoicing.',
        url: 'https://nobevra.noblesworld.com.ng/products-inventory',
        type: 'website',
    },
};

export default function ProductsInventoryPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
            <BreadcrumbSchema
                pageId="products-inventory"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Products & Inventory Management' },
                ]}
            />
            {/* Hero */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-700 font-bold text-xs uppercase tracking-widest mb-6">
                        <Boxes className="w-4 h-4" />
                        Products & Inventory Management
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
                        Real-Time <span className="text-violet-600">Inventory & Stock Tracking</span> Linked to Invoices.
                    </h1>
                    <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-10">
                        Manage physical goods and digital service catalogs with SKU codes, automated low-stock warnings, and instant inventory deductions when orders settle.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                        >
                            Start Free Inventory
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="w-full sm:w-auto px-8 py-4 bg-noble-surface border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            View Plan Limits
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-6">
                            <RefreshCw className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Invoice-Linked Deductions</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            When an invoice is marked paid, items are deducted from your inventory automatically with zero manual adjustments.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Low-Stock Warnings</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Set custom threshold quantities for each SKU and receive instant dashboard alerts before items run out of stock.
                        </p>
                    </div>

                    <div className="bg-noble-surface p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                            <Package className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Digital & Physical Goods</h2>
                        <p className="text-near-black/60 text-sm leading-relaxed">
                            Support for physical tangible products, hourly professional services, and digital subscriptions in one unified catalog.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

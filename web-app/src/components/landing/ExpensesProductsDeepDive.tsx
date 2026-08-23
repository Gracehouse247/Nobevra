'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ExpensesProductsDeepDive() {
    return (
        <section
            id="expenses-products"
            className="py-24 md:py-32 bg-noble-surface relative overflow-hidden"
            aria-label="Section 9: Expenses, Receipt Scanning and Product Inventory"
        >
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/15 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">receipt_long</span>
                        Expenses & Product Catalog
                    </div>

                    <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-black text-near-black leading-[1.15] tracking-tight mb-4">
                        Master Expenses & Inventory in{' '}
                        <span className="text-noble-blue italic">One Place.</span>
                    </h2>

                    <p className="text-base text-near-black/50 leading-relaxed">
                        Stop losing receipts in shoeboxes and overselling out-of-stock items. Nobevra connects your expense ledger and product inventory directly to your revenue stream.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Card 1: AI Receipt Scanner & Expense Manager */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-emerald-50/50 via-white to-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                            <span className="material-symbols-outlined text-2xl" aria-hidden="true">document_scanner</span>
                        </div>
                        <h3 className="text-2xl font-black text-near-black mb-3">AI Receipt Scanner (Gemini)</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                            Snap a photo of any receipt on your phone. Gemini AI automatically extracts the vendor, date, line items, taxes, and total amount straight into your expense ledger.
                        </p>
                        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm space-y-2 mb-6">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-600">AWS Cloud Hosting Server</span>
                                <span className="font-black text-red-600">-₦48,500.00</span>
                            </div>
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-600">Office High-Speed Internet</span>
                                <span className="font-black text-red-600">-₦25,000.00</span>
                            </div>
                            <p className="text-[10px] text-emerald-700 font-bold pt-1">
                                ✓ Reconciled with business profit & loss ledger
                            </p>
                        </div>
                        <Link
                            href="/expense-management"
                            className="inline-flex items-center gap-2 text-xs font-black text-emerald-700 hover:underline uppercase tracking-wider"
                        >
                            Explore Expense Management
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </motion.div>

                    {/* Card 2: Products & Real-Time Inventory */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-br from-violet-50/50 via-white to-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-6">
                            <span className="material-symbols-outlined text-2xl" aria-hidden="true">inventory_2</span>
                        </div>
                        <h3 className="text-2xl font-black text-near-black mb-3">Real-Time Stock & Catalog</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                            Organize your physical and digital goods with SKU codes, unit pricing, and low-stock alerts. Deduct inventory automatically whenever an invoice is paid.
                        </p>
                        <div className="bg-white rounded-2xl p-4 border border-violet-100 shadow-sm space-y-2 mb-6">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-600">Custom Smart NFC Card (Matte Black)</span>
                                <span className="font-black text-emerald-600">84 in Stock</span>
                            </div>
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-600">Consulting Advisory Retainer (Digital)</span>
                                <span className="font-black text-violet-600">Unlimited</span>
                            </div>
                            <p className="text-[10px] text-violet-700 font-bold pt-1">
                                ✓ Live synchronization across mobile and web
                            </p>
                        </div>
                        <Link
                            href="/products-inventory"
                            className="inline-flex items-center gap-2 text-xs font-black text-violet-700 hover:underline uppercase tracking-wider"
                        >
                            Explore Inventory Engine
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

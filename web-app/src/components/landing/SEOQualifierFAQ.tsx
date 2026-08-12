'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function SEOQualifierFAQ() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: 'Is this actually a free invoice generator program?',
            a: 'Yes. You can use the core invoicing features, create unlimited clients, and send professional bills completely free. We only charge a small premium for advanced automation and team collaboration tools.',
        },
        {
            q: 'What is the best billing software online?',
            a: 'The best billing software online combines easy invoicing with a professional checkout experience. NobleInvoice leads the market by providing a secure, white-labeled client portal rather than just a basic PDF attachment.',
        },
        {
            q: 'Do my clients need an account to pay me?',
            a: 'Never. They click the link on your invoice and pay via a secure web portal. No logins or account creation required on their end.',
        },
        {
            q: 'Can I use this as GST billing software online?',
            a: 'Absolutely. We offer full GST/VAT compliance. You can configure local tax rates, and they will automatically apply to your invoices, making tax season a breeze.',
        },
        {
            q: 'Is there billing software online free of hidden charges?',
            a: 'Yes, NobleInvoice offers a genuinely free tier. Unlike other platforms that lock you out after 3 invoices, our free tier lets you bill clients without hidden transaction fee markups from us.',
        },
        {
            q: 'What is the difference between an invoice generator and billing software?',
            a: 'An invoice generator simply creates a static document (like a PDF). Billing software online is a complete monetization system—it generates the document, emails the client, hosts a payment portal, tracks the transaction, and sends automated reminders.',
        },
        {
            q: 'What is the best invoice app free to download for mobile?',
            a: 'NobleInvoice is fully optimized as a mobile web app. You can generate, send, and track payments directly from your smartphone without needing to download a bulky app from the app store.',
        },
        {
            q: 'How does NobleInvoice compare to QuickBooks or FreshBooks?',
            a: 'We are purpose-built for speed and client experience. Where legacy tools bloat your workflow with double-entry accounting features you don\'t need, we focus exclusively on making your brand look premium and getting you paid faster.',
        },
        {
            q: 'Can I accept international payments?',
            a: 'Yes, our software supports multi-currency invoicing. You can bill international clients in their local currency, and our payment gateways (like Stripe) handle the conversion automatically.',
        },
        {
            q: 'Is my financial data secure?',
            a: 'We are SOC 2 Type II certified and PCI-DSS compliant. All data is encrypted at rest and in transit using banking-grade AES-256 encryption. Your data is never sold or shared.',
        },
        {
            q: 'Do I need accounting knowledge to use this?',
            a: 'Not at all. NobleInvoice is designed for freelancers, creators, and business owners—not accountants. You can send your first professional invoice in under 60 seconds with zero financial training.',
        },
        {
            q: 'Can I customize my invoice templates?',
            a: 'Yes. You can upload your logo, choose your exact brand hex colors, and add custom terms and conditions. The software automatically applies your branding to the client portal.',
        },
        {
            q: 'Does it send automated payment reminders?',
            a: 'Yes. You can set up custom, polite payment reminders that go out automatically if an invoice is overdue, completely removing the awkwardness of asking clients for money.',
        },
        {
            q: 'Can I set up recurring billing for subscriptions?',
            a: 'Yes. Our platform allows you to create recurring invoices for monthly retainers or subscriptions. It will automatically generate and send the invoice on the schedule you define.',
        },
        {
            q: 'What payment methods can I accept?',
            a: 'You can accept credit cards, debit cards, Apple Pay, Google Pay, and standard bank transfers (ACH) depending on the payment gateway you connect to your portal.',
        }
    ];

    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-[#F8FAFC]">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-noble-blue/[0.03] blur-[100px] rounded-full -translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-electric-cyan/[0.03] blur-[120px] rounded-full translate-x-1/3 pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left — Qualifier Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 border border-noble-border text-slate-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                            <span className="w-2 h-2 rounded-full bg-slate-400" />
                            Transparency
                        </div>
                        <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] mb-8 tracking-tight">
                            We might not be{' '}
                            <span className="text-near-black/30">the right fit for you.</span>
                        </h2>
                        <div className="text-base md:text-lg text-near-black/60 space-y-5 leading-relaxed">
                            <p>
                                We built the most effective <strong className="text-near-black/80">free invoice generator program</strong> on the market, but we aren&apos;t for everyone.
                            </p>
                            <p>
                                If you are running a 500-person enterprise that requires complex double-entry bookkeeping, legacy ERP integrations, and multi-layered corporate approvals—we are not the tool for you. You should look into heavy-duty enterprise accounting software.
                            </p>
                            <p>
                                But if you are a freelancer, a growing agency, or a modern small business that wants a sleek, fast <strong className="text-near-black/80">invoice generator program</strong> to manage clients and collect revenue without the headache?
                            </p>
                        </div>

                        {/* CTA callout */}
                        <div className="mt-8 bg-gradient-to-r from-noble-blue/8 to-transparent rounded-2xl p-6 border-l-4 border-noble-blue/30">
                            <p className="text-near-black/70 font-bold text-sm mb-3">You are exactly who we built this for.</p>
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 text-noble-blue font-black text-sm hover:gap-3 transition-all"
                            >
                                Start billing for free
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right — FAQ Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                            <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
                            FAQ
                        </div>
                        <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] mb-8 tracking-tight">
                            Questions you{' '}
                            <span className="text-noble-blue">probably have.</span>
                        </h2>

                        <div className="space-y-3">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`border rounded-2xl overflow-hidden bg-noble-surface transition-all duration-300 ${
                                        openFaqIndex === index
                                            ? 'border-noble-blue/30 shadow-lg shadow-noble-blue/5'
                                            : 'border-noble-border hover:border-noble-blue/20 shadow-sm'
                                    }`}
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                                    >
                                        <span className={`text-base md:text-lg font-bold pr-4 transition-colors ${
                                            openFaqIndex === index ? 'text-noble-blue' : 'text-near-black group-hover:text-noble-blue'
                                        }`}>
                                            {faq.q}
                                        </span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                                            openFaqIndex === index
                                                ? 'bg-noble-blue text-white rotate-45'
                                                : 'bg-slate-100 text-near-black/40 group-hover:bg-noble-blue/10'
                                        }`}>
                                            <span className="material-symbols-outlined text-sm">add</span>
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {openFaqIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 md:px-6 pb-5 md:pb-6 text-[15px] text-near-black/55 leading-relaxed border-t border-slate-50 pt-4">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

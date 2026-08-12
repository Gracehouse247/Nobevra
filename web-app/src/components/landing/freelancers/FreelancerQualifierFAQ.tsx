'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function FreelancerQualifierFAQ() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: 'How do I invoice as a freelancer if I don\'t have a registered company?',
            a: 'You don\'t need one. As a sole proprietor or independent contractor, your full legal name and address is all you need. NobleInvoice lets you set up your self-employed billing profile in under two minutes — no business registration required. Your invoices will still look completely professional to clients.',
        },
        {
            q: 'What exactly should I include on a professional invoice for freelancers?',
            a: 'At minimum: your name and contact details, the client\'s name and address, a unique invoice number, the date issued and the payment due date, an itemized list of the services you delivered (with rates and quantities), the total amount due, and clear payment instructions. NobleInvoice auto-fills most of this from your client CRM so you\'re not typing it out every single time.',
        },
        {
            q: 'How do I get clients to pay faster?',
            a: 'Three things move the needle the most: (1) Send your invoice the moment the work is done — not at the end of the month. (2) Make payment effortless with a one-click payment link instead of a PDF attachment. (3) Set payment terms clearly (e.g. Net 14). NobleInvoice handles all three out of the box, and our users typically see a 40% reduction in late payments within the first 60 days.',
        },
        {
            q: 'What if a client goes quiet and doesn\'t pay?',
            a: 'This is the number one frustration in freelance billing. Our 3-Step Ghosting Framework handles it automatically: a polite 24-hour nudge, a firm Day 3 follow-up with a 1-click payment link, and a formal Day 7 notice with automated late fees applied. You never have to write an awkward email again — the system plays the bad cop while you stay professional.',
        },
        {
            q: 'Can I use NobleInvoice as my freelancer billing app on mobile?',
            a: 'Yes — it\'s built mobile-first. Whether you\'re on a job site, at a client meeting, or on the train home, you can create and send a professional invoice from your phone in under 60 seconds. No app download needed; it runs as a fully optimized mobile web app.',
        },
        {
            q: 'Is there a free plan for freelancers just starting out?',
            a: 'Yes. Our free tier gives you access to core invoicing features, unlimited clients, and professional templates — no credit card required. You only upgrade when you need advanced automation like scheduled reminders, recurring billing, late fee enforcement, and priority support.',
        },
        {
            q: 'How is this different from just using a Word or Excel template?',
            a: 'A Word template creates a static PDF your client receives by email and then has to manually transfer money from. There is no tracking, no payment link, no reminders, and no read receipts. NobleInvoice turns your invoice into an interactive payment experience — your client clicks a link, sees a clean branded checkout, and pays in seconds. That single difference alone cuts average payment time from 30+ days to under 7.',
        },
        {
            q: 'Do I need any accounting knowledge to use this?',
            a: 'None at all. NobleInvoice is built for freelancers, creators, and independent contractors — not accountants. The interface is intentionally simple. If you can fill out a form, you can use it. Send your first professional invoice in under 60 seconds with zero financial training.',
        },
        {
            q: 'Can I brand my invoices with my own logo and colors?',
            a: 'Absolutely. Upload your logo, set your exact brand hex colors, and add custom payment terms. Every invoice and the client payment portal will reflect your brand — not ours. This is what separates a professional invoice for freelancers from a generic template.',
        },
        {
            q: 'Does it handle taxes like VAT and GST for self-employed billing?',
            a: 'Yes. You can configure your local tax rates (VAT, GST, sales tax) and they apply automatically to every invoice. When tax season arrives, all your records are already organized and exportable. No spreadsheet reconciliation needed.',
        },
        {
            q: 'Can I invoice international clients in their currency?',
            a: 'Yes. NobleInvoice supports multi-currency invoicing. Bill a UK client in GBP, a German client in EUR, and a US client in USD — all from the same account. Our integrated payment gateways handle the currency conversion automatically.',
        },
        {
            q: 'Can I set up recurring invoices for monthly retainer clients?',
            a: 'Yes. If you have clients on monthly retainers or subscriptions, you can set up recurring invoices that generate and send automatically on your defined schedule. Your retainer billing runs on autopilot while you focus on the actual work.',
        },
    ];

    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-[#F8FAFC]">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-noble-blue/[0.03] blur-[100px] rounded-full -translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-electric-cyan/[0.03] blur-[120px] rounded-full translate-x-1/3 pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left — Not For You / Qualifier */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 border border-noble-border text-slate-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                            <span className="w-2 h-2 rounded-full bg-slate-400" />
                            Honest Transparency
                        </div>
                        <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] mb-8 tracking-tight">
                            We might not be{' '}
                            <span className="text-near-black/30">right for every freelancer.</span>
                        </h2>
                        <div className="text-base md:text-lg text-near-black/60 space-y-5 leading-relaxed">
                            <p>
                                NobleInvoice is built for freelancers, independent contractors, and self-employed professionals who want to get paid faster without the complexity of enterprise accounting software.
                            </p>
                            <p>
                                If you are a one-person operation doing a handful of invoices a year and you genuinely don't mind copy-pasting bank details into emails — a basic template works fine. You probably don't need us yet.
                            </p>
                            <p>
                                But if late payments are stressing you out, chasing clients feels awkward, and your <strong className="text-near-black/80">freelance billing</strong> is costing you evenings you'd rather spend on actual work? That is exactly the problem we exist to solve.
                            </p>
                        </div>

                        {/* CTA callout */}
                        <div className="mt-8 bg-gradient-to-r from-noble-blue/8 to-transparent rounded-2xl p-6 border-l-4 border-noble-blue/30">
                            <p className="text-near-black/70 font-bold text-sm mb-3">Stop chasing. Start getting paid.</p>
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 text-noble-blue font-black text-sm hover:gap-3 transition-all"
                            >
                                Start free — no credit card needed
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right — FAQ */}
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
                            Questions freelancers{' '}
                            <span className="text-noble-blue">always ask.</span>
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

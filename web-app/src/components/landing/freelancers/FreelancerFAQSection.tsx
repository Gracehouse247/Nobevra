'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "How do I invoice as a freelancer with no company?",
        answer: "You do not need an LLC or registered company to send an invoice. As a sole proprietor or independent contractor, you can simply use your full legal name and personal address. Our invoice tool for freelancers allows you to generate professional bills seamlessly without needing an official business entity."
    },
    {
        question: "What should I include in a professional invoice for freelancers?",
        answer: "Every freelance invoice should include: your contact info, the client's details, a unique invoice number, dates (issue and due date), an itemized breakdown of services, the total amount, and clear payment instructions. NobleInvoice pre-builds all these fields for you."
    },
    {
        question: "When should I send my invoice?",
        answer: "It depends on your contract. Common practices include billing upfront (50% deposit), milestone billing, or invoicing immediately upon project completion. Never wait until the end of the month if you finished the work on the 5th—send it right away."
    },
    {
        question: "What if a client doesn't pay my freelance invoice?",
        answer: "Follow our 3-Step Ghosting Framework. First, send a gentle 24-hour reminder. Next, send a firm follow-up with a 1-click payment link. Finally, issue a formal notice with late fees applied. A dedicated freelance billing app automates this entire process so you don't have to stress about it."
    },
    {
        question: "Is there an invoice app for self-employed professionals?",
        answer: "Yes! NobleInvoice is built specifically for independent contractors, solopreneurs, and freelancers. Unlike enterprise accounting software, our platform focuses purely on getting your invoices paid faster and managing your cash flow simply."
    }
];

export default function FreelancerFAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 md:py-32 relative bg-noble-surface">
            <div className="max-w-4xl mx-auto px-4 md:px-16">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                        FAQ
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
                        Common Questions About <span className="text-noble-blue">Simple Invoicing for Freelancers</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className={`border rounded-2xl overflow-hidden transition-colors ${openIndex === index ? 'border-noble-blue bg-blue-50/30' : 'border-noble-border bg-noble-surface'}`}
                        >
                            <button
                                className="w-full text-left px-6 py-5 flex items-center justify-between"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-bold text-lg text-near-black">{faq.question}</span>
                                <span className={`material-symbols-outlined text-noble-blue transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                                    expand_more
                                </span>
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 text-near-black/70 leading-relaxed border-t border-noble-blue/10 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

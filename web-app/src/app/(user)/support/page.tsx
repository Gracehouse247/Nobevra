'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, MessageSquareHeart, Bug, Lightbulb, BookOpen } from 'lucide-react';

const FAQS = [
    { 
        q: 'How do I customize my invoice branding?', 
        a: 'You can customize your branding in the Invoicing Engine by choosing a template and using the Color Palette picker in the Live Preview pane. For global branding, visit Settings > Brand to upload your logo and signature.' 
    },
    { 
        q: 'How does the automatic tax calculation work?', 
        a: 'Nobevra supports both inclusive and exclusive tax modes. You can set a global tax rate in Settings or adjust it per-invoice. The engine automatically calculates the total based on your taxable subtotal.' 
    },
    { 
        q: 'Can I import my existing client list?', 
        a: 'Yes. In the Client CRM section, you can upload a CSV file containing your client details. Our system will automatically map the fields and create your database in seconds.' 
    },
    { 
        q: 'Is my data secure?', 
        a: 'Absolutely. We use enterprise-grade encryption for all financial data. Your invoices and client records are stored in a secure Supabase environment with row-level security enabled.' 
    },
    { 
        q: 'What is the difference between Pulse and Elite?', 
        a: 'Noble Pulse offers unlimited invoicing and CRM. Noble Elite adds advanced team collaboration, roles & permissions, multi-currency settlements, and priority 24/7 phone support.' 
    },
    { 
        q: 'How do I accept online payments?', 
        a: 'Nobevra integrates directly with Flutterwave. Once you link your account in Wallet & Payments, you can enable "Accept Online Payments" on any invoice to get paid via card or bank transfer.' 
    }
];

export default function HelpCenterPage() {
    const [search, setSearch] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const filteredFaqs = FAQS.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#F0F4F8] dark:bg-transparent dark:bg-[#060D1A] text-noble-text pb-32 font-inter relative overflow-hidden selection:bg-noble-blue/20">
            {/* Ambient Background Mesh Gradients */}
            <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-noble-blue/10 blur-[150px] rounded-full pointer-events-none z-0" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-electric-cyan/10 blur-[150px] rounded-full pointer-events-none z-0" />

            <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-12 pb-24 md:pb-20 relative z-10">
                {/* Header */}
                <div className="text-center space-y-6 pt-12 pb-8">
                    <div className="inline-flex p-4 bg-noble-blue/10 border border-noble-blue/20 rounded-3xl mb-2 shadow-inner">
                        <BookOpen className="w-10 h-10 text-noble-blue" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-noble-text" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        How can we <span className="text-noble-blue">help?</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold max-w-lg mx-auto">
                        Search our knowledge base or get in touch with the Nobevra Cognitive Team.
                    </p>
                    
                    <div className="relative max-w-2xl mx-auto mt-8">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 z-10" />
                        <input 
                            type="text"
                            placeholder="Search for templates, billing, or export tips..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-noble-surface dark:bg-noble-card/60 backdrop-blur-md border border-white/60 rounded-2xl pl-14 pr-6 py-5 text-sm font-bold text-noble-text placeholder:text-slate-400 dark:text-slate-500 focus:outline-none focus:border-noble-blue/40 focus:ring-4 focus:ring-noble-blue/10 transition-all shadow-inner"
                        />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Link href="/support/report-issue" className="group p-8 rounded-[32px] bg-noble-surface dark:bg-noble-card/40 backdrop-blur-xl border border-white/60 hover:border-red-500/30 hover:bg-noble-surface dark:bg-noble-card hover:shadow-[0_20px_40px_rgba(239,68,68,0.05)] transition-all flex flex-col items-center text-center shadow-sm">
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 group-hover:scale-110 transition-transform mb-5 shadow-inner">
                            <Bug className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-100 group-hover:text-red-500 transition-colors">Report Bug</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-2 font-bold">Found a glitch? Let us fix it.</p>
                    </Link>
                    <Link href="/support/suggest-feature" className="group p-8 rounded-[32px] bg-noble-surface dark:bg-noble-card/40 backdrop-blur-xl border border-white/60 hover:border-amber-500/30 hover:bg-noble-surface dark:bg-noble-card hover:shadow-[0_20px_40px_rgba(245,158,11,0.05)] transition-all flex flex-col items-center text-center shadow-sm">
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform mb-5 shadow-inner">
                            <Lightbulb className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-100 group-hover:text-amber-500 transition-colors">Feature Request</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-2 font-bold">Suggest a brilliant addition.</p>
                    </Link>
                    <Link href="/support/chat" className="group p-8 rounded-[32px] bg-noble-surface dark:bg-noble-card/40 backdrop-blur-xl border border-white/60 hover:border-noble-blue/30 hover:bg-noble-surface dark:bg-noble-card hover:shadow-[0_20px_40px_rgba(22,111,187,0.05)] transition-all flex flex-col items-center text-center shadow-sm">
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-noble-blue group-hover:scale-110 transition-transform mb-5 shadow-inner">
                            <MessageSquareHeart className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-100 group-hover:text-noble-blue transition-colors">Live Chat</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-2 font-bold">Speak with our support agents.</p>
                    </Link>
                </div>

                {/* FAQ Accordion */}
                <div className="pt-10">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-6 px-2">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {filteredFaqs.length > 0 ? filteredFaqs.map((faq, idx) => (
                            <div key={idx} className="bg-noble-surface dark:bg-noble-card/40 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/60 shadow-sm transition-all hover:border-noble-blue/20">
                                <button 
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-noble-surface dark:bg-noble-card/40 transition-colors"
                                >
                                    <span className={`text-sm font-black tracking-tight ${openIndex === idx ? 'text-noble-blue' : 'text-noble-text'}`} style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{faq.q}</span>
                                    <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-400 dark:text-slate-500 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-noble-blue' : ''}`} />
                                </button>
                                <div 
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="p-6 pt-0 text-sm text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed border-t border-white/40 font-bold">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 text-slate-500 dark:text-slate-400 dark:text-slate-500 italic text-sm font-bold bg-noble-surface dark:bg-noble-card/40 backdrop-blur-md border border-white/60 rounded-[24px]">No results found for "{search}"</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}



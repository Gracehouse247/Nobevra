'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Rocket, CreditCard, Users, Plug, Settings, FileText, Clock, ChevronRight } from 'lucide-react';
import { helpCategories, allArticles } from '@/lib/helpData';

const iconMap: Record<string, React.ElementType> = {
    Rocket, CreditCard, Users, Plug, Settings, FileText,
};

export default function HelpClientPage() {
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);

    const results = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q || q.length < 2) return [];
        return allArticles
            .filter(a =>
                a.title.toLowerCase().includes(q) ||
                a.summary.toLowerCase().includes(q) ||
                a.categoryTitle.toLowerCase().includes(q)
            )
            .slice(0, 8);
    }, [query]);

    const showResults = focused && query.length >= 2;

    return (
        <>
            {/* ── Hero / Search ── */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-[#F8FAFC] border-b border-noble-border overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-noble-blue/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-surface text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6 border border-noble-blue/20 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
                        Support · {allArticles.length} Articles
                    </div>
                    <h1 className="font-inter text-near-black text-[40px] md:text-[56px] leading-[1.1] tracking-tight font-black mb-6">
                        How can we help you today?
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-medium">
                        Search our knowledge base for quick answers, setup guides, and troubleshooting tips.
                    </p>

                    {/* Live Search */}
                    <div className="relative max-w-2xl mx-auto">
                        <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[24px]">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Search className="h-6 w-6 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-16 pr-8 py-6 text-lg border-2 border-noble-border rounded-[24px] focus:ring-0 focus:border-noble-blue text-near-black placeholder-slate-400 bg-noble-surface transition-colors outline-none"
                                placeholder="Search articles, guides, or features..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setTimeout(() => setFocused(false), 150)}
                            />
                        </div>

                        {/* Results dropdown */}
                        {showResults && (
                            <div className="absolute top-full mt-2 left-0 right-0 bg-noble-surface rounded-2xl border border-noble-border shadow-2xl z-50 overflow-hidden">
                                {results.length > 0 ? (
                                    results.map((r, i) => (
                                        <Link
                                            key={i}
                                            href={`/help-center/${r.categorySlug}/${r.slug}`}
                                            className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                                        >
                                            <FileText className="w-5 h-5 text-noble-blue shrink-0 mt-0.5" />
                                            <div className="text-left">
                                                <p className="font-bold text-near-black text-sm mb-0.5">{r.title}</p>
                                                <p className="text-xs text-slate-400 font-medium">{r.categoryTitle} · {r.readTime}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="px-6 py-8 text-center text-slate-500 font-medium">
                                        No articles found for "<strong>{query}</strong>"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-medium text-slate-500">
                        <span>Popular:</span>
                        {['How to set up a white-label client portal', 'Automating monthly retainer invoices', 'How to connect Stripe'].map((s, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <span className="opacity-40">•</span>}
                                <Link
                                    href={`/help-center/${i === 0 ? 'client-portals-and-crm/setup-client-portal' : i === 1 ? 'billing-and-subscriptions/set-up-recurring-retainer' : 'integrations-and-api/connect-stripe'}`}
                                    className="text-noble-blue hover:underline"
                                >
                                    {s}
                                </Link>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Category Grid ── */}
            <section className="py-20 md:py-28 bg-noble-surface">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-14">
                        <h2 className="font-inter text-3xl md:text-4xl font-black text-near-black tracking-tight mb-4">
                            Browse by Category
                        </h2>
                        <p className="text-slate-500 text-lg font-medium">Find the exact resources you need to master Nobevra.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {helpCategories.map((cat) => {
                            const Icon = iconMap[cat.icon] || FileText;
                            return (
                                <Link
                                    key={cat.slug}
                                    href={`/help-center/${cat.slug}`}
                                    className="group p-8 rounded-[32px] border border-noble-border hover:border-noble-blue/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-noble-surface block"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all group-hover:scale-110 duration-300 ${cat.bg} ${cat.color}`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-black text-xl text-near-black mb-2 group-hover:text-noble-blue transition-colors">{cat.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium text-sm mb-4">{cat.desc}</p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-noble-blue transition-colors">
                                        <span>{cat.articles.length} articles</span>
                                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Popular Articles ── */}
            <section className="py-20 bg-[#F8FAFC] border-t border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h2 className="font-inter text-3xl font-black text-near-black tracking-tight mb-3">Popular Articles</h2>
                            <p className="text-slate-500 font-medium">The most frequently accessed guides from our community.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                        {allArticles.slice(0, 6).map((article, i) => (
                            <Link
                                key={i}
                                href={`/help-center/${article.categorySlug}/${article.slug}`}
                                className="flex items-center gap-4 p-5 rounded-2xl bg-noble-surface border border-noble-border hover:border-noble-blue/30 hover:shadow-md transition-all group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-noble-blue/10 group-hover:text-noble-blue transition-colors">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-near-black text-sm md:text-base group-hover:text-noble-blue transition-colors truncate mb-1">
                                        {article.title}
                                    </h4>
                                    <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                                        <span>{article.categoryTitle}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {article.readTime}
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-noble-blue group-hover:translate-x-0.5 transition-all shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Contact Support ── */}
            <section className="py-24 bg-noble-surface border-t border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="bg-slate-900 rounded-[40px] p-8 md:p-16 relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-noble-blue/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="font-inter text-3xl md:text-4xl font-black text-white tracking-tight mb-6">
                                Can't find what you're looking for?
                            </h2>
                            <p className="text-lg text-slate-400 font-medium mb-10 leading-relaxed">
                                Our support team is made up of real humans who know the product inside out. We typically respond within 2 hours.
                            </p>
                            <Link href="/contact#contact-form" className="inline-flex items-center justify-center gap-3 text-white bg-noble-blue px-10 py-5 text-base font-extrabold rounded-2xl hover:bg-[#01A0E2] hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(22,111,187,0.3)]">
                                Contact Support
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

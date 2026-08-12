'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, FileText } from 'lucide-react';
import { allArticles } from '@/lib/helpData';

export default function HelpSearchBar() {
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown if clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
        <div className="bg-[#F8FAFC] border-b border-noble-border py-6" ref={containerRef}>
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                <div className="relative max-w-3xl">
                    <div className="relative shadow-sm rounded-xl">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-3.5 text-base border-2 border-noble-border rounded-xl focus:ring-0 focus:border-noble-blue text-near-black placeholder-slate-400 bg-noble-surface transition-colors outline-none"
                            placeholder="Search for articles, guides, or features..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onFocus={() => setFocused(true)}
                        />
                    </div>

                    {/* Results dropdown */}
                    {showResults && (
                        <div className="absolute top-full mt-2 left-0 right-0 bg-noble-surface rounded-xl border border-noble-border shadow-2xl z-50 overflow-hidden max-h-[400px] overflow-y-auto">
                            {results.length > 0 ? (
                                results.map((r, i) => (
                                    <Link
                                        key={i}
                                        href={`/help-center/${r.categorySlug}/${r.slug}`}
                                        onClick={() => { setFocused(false); setQuery(''); }}
                                        className="flex items-start gap-4 px-5 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                                    >
                                        <FileText className="w-5 h-5 text-noble-blue shrink-0 mt-0.5" />
                                        <div className="text-left min-w-0">
                                            <p className="font-bold text-near-black text-sm mb-0.5 truncate">{r.title}</p>
                                            <p className="text-xs text-slate-400 font-medium truncate">{r.categoryTitle} · {r.readTime}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="px-5 py-6 text-center text-slate-500 font-medium text-sm">
                                    No articles found for "<strong>{query}</strong>"
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ShieldCheck, AlertTriangle, CheckCircle2, Search, ArrowRight,
    Copy, Check, Sparkles, ExternalLink, RefreshCw, Layers, Lock
} from 'lucide-react';

interface Alternative {
    keyword: string;
    source: string;
    intent: string;
}

interface CollisionInfo {
    tier: string;
    matchedOn: string;
    matchedKeyword: string;
    url: string;
    file: string;
    title: string;
}

interface CheckResult {
    isAvailable: boolean;
    keyword: string;
    totalScanned: number;
    generatedSlug?: string;
    generatedTitle?: string;
    metaDescTemplate?: string;
    collision?: CollisionInfo;
    alternatives?: Alternative[];
}

export default function InternalSeoGuardPage() {
    const [inputKeyword, setInputKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CheckResult | null>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [allRoutes, setAllRoutes] = useState<any[]>([]);
    const [filterQuery, setFilterQuery] = useState('');

    useEffect(() => {
        // Pre-load all registered routes for browsing
        fetch('/api/internal-seo-guard')
            .then(res => res.json())
            .then(data => {
                if (data.routes) setAllRoutes(data.routes);
            })
            .catch(() => {});
    }, []);

    const handleCheck = async (keywordToCheck?: string) => {
        const query = keywordToCheck || inputKeyword;
        if (!query.trim()) return;

        setLoading(true);
        if (keywordToCheck) setInputKeyword(keywordToCheck);

        try {
            const res = await fetch('/api/internal-seo-guard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword: query.trim() }),
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error('Check failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text: string, fieldId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldId);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const filteredRoutes = allRoutes.filter(r => 
        (r.url && r.url.toLowerCase().includes(filterQuery.toLowerCase())) ||
        (r.primaryKeyword && r.primaryKeyword.toLowerCase().includes(filterQuery.toLowerCase())) ||
        (r.title && r.title.toLowerCase().includes(filterQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-slate-50 text-near-black font-inter antialiased pt-28 pb-20 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header Banner */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#166FBB]/20 blur-3xl rounded-full pointer-events-none" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#01A0E2] text-xs font-black uppercase tracking-wider mb-4 border border-white/10">
                            <Lock className="w-3.5 h-3.5" />
                            Internal Management Tool (Local PC)
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
                            Nobevra SEO Keyword Guard & Cannibalization Studio
                        </h1>
                        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                            Check any focus keyword before creating or updating a blog post or landing page. Automatically detects if the concept is already owned and finds fresh Google alternatives.
                        </p>
                    </div>
                </div>

                {/* Search / Checker Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
                        Enter Focus Keyword or Target Concept
                    </label>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCheck();
                        }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <div className="relative flex-1">
                            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={inputKeyword}
                                onChange={(e) => setInputKeyword(e.target.value)}
                                placeholder="e.g. online invoicing software, client contracts, expense tracker..."
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-bold text-near-black focus:outline-none focus:border-noble-blue transition-colors shadow-inner"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !inputKeyword.trim()}
                            className="px-8 py-4 text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 whitespace-nowrap"
                            style={{ backgroundColor: '#166FBB' }}
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Scanning Repository...
                                </>
                            ) : (
                                <>
                                    Check Keyword
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Result Section */}
                {result && (
                    <div className="transition-all animate-in fade-in duration-300">
                        {result.isAvailable ? (
                            /* 🟢 Available Result Card */
                            <div className="bg-emerald-50/80 rounded-3xl p-8 border border-emerald-200 shadow-sm space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                                            100% Available & Safe to Use
                                        </span>
                                        <h2 className="text-2xl font-black text-emerald-950 mt-2">
                                            &ldquo;{result.keyword}&rdquo; has zero cannibalization conflicts!
                                        </h2>
                                        <p className="text-xs text-emerald-800/80 mt-1">
                                            Scanned {result.totalScanned} active pages across your website and database. No collisions found.
                                        </p>
                                    </div>
                                </div>

                                {/* Generated Metadata Helpers */}
                                <div className="bg-white rounded-2xl p-6 border border-emerald-100 space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                                        Ready-to-Use SEO Pack (1-Click Copy)
                                    </h3>

                                    {/* Suggested Slug */}
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400">Recommended URL Slug</p>
                                            <p className="text-xs font-mono font-bold text-near-black">{result.generatedSlug}</p>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(result.generatedSlug || '', 'slug')}
                                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                                        >
                                            {copiedField === 'slug' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                            {copiedField === 'slug' ? 'Copied' : 'Copy Slug'}
                                        </button>
                                    </div>

                                    {/* Suggested Title */}
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="pr-4">
                                            <p className="text-[10px] uppercase font-bold text-slate-400">Recommended SEO Title ({result.generatedTitle?.length || 0} chars)</p>
                                            <p className="text-xs font-bold text-near-black">{result.generatedTitle}</p>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(result.generatedTitle || '', 'title')}
                                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shrink-0"
                                        >
                                            {copiedField === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                            {copiedField === 'title' ? 'Copied' : 'Copy Title'}
                                        </button>
                                    </div>

                                    {/* Suggested Meta Description */}
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="pr-4">
                                            <p className="text-[10px] uppercase font-bold text-slate-400">Recommended Meta Description ({result.metaDescTemplate?.length || 0} chars)</p>
                                            <p className="text-xs text-slate-600">{result.metaDescTemplate}</p>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(result.metaDescTemplate || '', 'desc')}
                                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shrink-0"
                                        >
                                            {copiedField === 'desc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                            {copiedField === 'desc' ? 'Copied' : 'Copy Desc'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* 🔴 Collision Result Card */
                            <div className="bg-rose-50/80 rounded-3xl p-8 border border-rose-200 shadow-sm space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                                        <AlertTriangle className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-3 py-1 rounded-full">
                                            Cannibalization Conflict Detected
                                        </span>
                                        <h2 className="text-2xl font-black text-rose-950 mt-2">
                                            &ldquo;{result.keyword}&rdquo; is already owned by another page!
                                        </h2>
                                        <p className="text-xs text-rose-800/80 mt-1">
                                            Creating another page targeting this exact keyword will cause Google to split your rankings.
                                        </p>
                                    </div>
                                </div>

                                {/* Conflicting Page Details */}
                                {result.collision && (
                                    <div className="bg-white rounded-2xl p-6 border border-rose-100 space-y-3">
                                        <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                            Currently Owning Page:
                                        </p>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                                                        {result.collision.url}
                                                    </span>
                                                    <span className="text-xs text-slate-400 font-medium">({result.collision.file})</span>
                                                </div>
                                                <p className="text-xs font-bold text-near-black mt-1">{result.collision.title}</p>
                                                <p className="text-[11px] text-slate-500 mt-0.5">
                                                    Conflict Reason: <strong className="text-rose-700">{result.collision.tier}</strong>
                                                </p>
                                            </div>
                                            <Link
                                                href={result.collision.url}
                                                target="_blank"
                                                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shrink-0"
                                            >
                                                View Page <ExternalLink className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {/* Recommended Alternatives */}
                                {result.alternatives && result.alternatives.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-noble-blue" />
                                            <h3 className="text-base font-black text-near-black">
                                                Recommended Unowned Alternative Keywords (Verified Unique):
                                            </h3>
                                        </div>
                                        <p className="text-xs text-slate-600">
                                            Click any alternative keyword below to verify and auto-fill your SEO pack:
                                        </p>

                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {result.alternatives.map((alt, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-noble-blue transition-all flex flex-col justify-between shadow-xs"
                                                >
                                                    <div>
                                                        <span className="text-[10px] font-black uppercase tracking-wider text-noble-blue bg-noble-blue/10 px-2 py-0.5 rounded">
                                                            {alt.intent}
                                                        </span>
                                                        <p className="text-sm font-bold text-near-black mt-2">
                                                            &ldquo;{alt.keyword}&rdquo;
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 mt-1">Source: {alt.source}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleCheck(alt.keyword)}
                                                        className="mt-4 w-full py-2 bg-noble-blue/10 hover:bg-noble-blue text-noble-blue hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                                                    >
                                                        Select This Keyword <ArrowRight className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Directory Browser: Registered Routes */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-black text-near-black flex items-center gap-2">
                                <Layers className="w-5 h-5 text-noble-blue" />
                                All Registered Repository Routes ({allRoutes.length})
                            </h3>
                            <p className="text-xs text-slate-500">
                                Real-time catalog of all active pages and their primary focus keywords.
                            </p>
                        </div>
                        <input
                            type="text"
                            value={filterQuery}
                            onChange={(e) => setFilterQuery(e.target.value)}
                            placeholder="Filter routes or keywords..."
                            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-noble-blue w-full sm:w-64"
                        />
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-100 max-h-96 overflow-y-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-slate-50 border-b border-slate-100 sticky top-0">
                                <tr>
                                    <th className="py-3 px-4 font-black text-slate-600 uppercase">Route URL</th>
                                    <th className="py-3 px-4 font-black text-slate-600 uppercase">Primary Focus Keyword</th>
                                    <th className="py-3 px-4 font-black text-slate-600 uppercase">Page Title</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredRoutes.slice(0, 50).map((r, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="py-2.5 px-4 font-mono font-bold text-noble-blue">{r.url}</td>
                                        <td className="py-2.5 px-4 font-medium text-near-black">{r.primaryKeyword || '—'}</td>
                                        <td className="py-2.5 px-4 text-slate-500 truncate max-w-xs">{r.title || '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Globe, Briefcase, ArrowRight, FileText } from 'lucide-react';
import { PROGRAMMATIC_TEMPLATES, ProgrammaticTemplate } from '@/lib/templates/programmaticTemplatesData';

export default function TemplatesDirectoryClient() {
  const [filter, setFilter] = useState<'all' | 'industry' | 'country'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return PROGRAMMATIC_TEMPLATES.filter((t) => {
      const matchesFilter = filter === 'all' || t.type === filter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.industry?.toLowerCase().includes(q) ?? false);
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Filter Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl">
          {(['all', 'industry', 'country'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-black capitalize transition-all ${
                filter === f
                  ? 'bg-[#166FBB] text-white shadow-md'
                  : 'text-near-black/60 hover:text-near-black'
              }`}
            >
              {f === 'all' ? 'All Templates' : f === 'industry' ? '🏭 By Industry' : '🌍 By Country'}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-near-black focus:outline-none focus:ring-2 focus:ring-noble-blue/30 focus:border-noble-blue"
          />
        </div>

        <span className="text-xs font-bold text-near-black/40 ml-auto">{filtered.length} templates</span>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <Link
            key={t.slug}
            href={`/templates/${t.slug}`}
            className="group p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-noble-blue hover:shadow-lg transition-all flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {t.flag ? (
                  <span className="text-2xl">{t.flag}</span>
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-noble-blue/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-noble-blue" />
                  </div>
                )}
                <span
                  className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    t.type === 'industry'
                      ? 'bg-violet-50 text-violet-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {t.type === 'industry' ? t.industry?.split('&')[0].trim() : `${t.taxLabel}`}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-noble-blue group-hover:translate-x-1 transition-all" />
            </div>

            <div>
              <h3 className="text-base font-black text-near-black group-hover:text-noble-blue transition-colors leading-snug mb-1.5">
                {t.name}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{t.description}</p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] text-slate-400 font-bold">
                {t.sampleLineItems.length} sample line items · {t.mandatoryFields.length} compliance fields
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <Search className="w-10 h-10 mx-auto mb-4 opacity-30" />
          <p className="font-bold">No templates match your search.</p>
          <button onClick={() => { setSearchQuery(''); setFilter('all'); }} className="mt-3 text-noble-blue text-sm font-bold underline">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

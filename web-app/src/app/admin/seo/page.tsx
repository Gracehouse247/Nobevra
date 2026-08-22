'use client';

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Database, 
  BarChart, 
  TrendingUp, 
  Activity, 
  UploadCloud, 
  Play, 
  RefreshCw, 
  Sliders, 
  CheckCircle, 
  XCircle, 
  Search, 
  Plus, 
  Eye, 
  AlertTriangle,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import { seoEngineService } from '@/lib/services/seoEngineService';
import { SEOKeyword, SEOArticle, RankingsTracker } from '@/lib/seoData';

// Tooltip component that renders below the header text, inside the visible area
function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-flex items-center ml-1.5 align-middle"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-300 text-slate-700 text-[9px] font-bold cursor-help select-none hover:bg-[#006970] hover:text-white transition-colors">?</span>
      {show && (
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-slate-800 text-white text-[11px] leading-relaxed rounded-lg z-50 font-normal normal-case tracking-normal shadow-xl pointer-events-none">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45 rounded-sm" />
          {text}
        </span>
      )}
    </span>
  );
}

export default function AdminSEOPanel() {
  const [keywords, setKeywords] = useState<SEOKeyword[]>([]);
  const [articles, setArticles] = useState<SEOArticle[]>([]);
  const [rankings, setRankings] = useState<RankingsTracker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({ pending: 0, processing: 0, completed: 0, failed: 0 });

  // Input forms
  const [singleKeyword, setSingleKeyword] = useState('');
  const [singleIntent, setSingleIntent] = useState<'Informational' | 'Transactional' | 'Commercial' | 'Navigational' | 'Local'>('Informational');
  const [singleVolume, setSingleVolume] = useState('1200');
  const [bulkInput, setBulkInput] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);

  // Settings
  const [settings, setSettings] = useState({
    default_meta_title: 'Nobevra - Premium Financial Management & CRM Platform',
    default_meta_description: 'Streamline your professional workflow, collect payments rapidly with Flutterwave, and leverage smart client portals.',
    auto_publish: true,
    cron_expression: '0 8 * * *'
  });

  const loadAllData = async () => {
    setLoading(true);

    // Safety timeout — always stop spinner after 8 seconds no matter what
    const safetyTimer = setTimeout(() => setLoading(false), 8000);

    try {
      // Run each query independently so one failure doesn't block the rest
      const kwRes = await seoEngineService.getKeywords().catch(() => ({ data: null, error: 'Keywords table unavailable' }));
      const artRes = await seoEngineService.getArticles().catch(() => ({ data: null, error: 'Articles table unavailable' }));
      const rankRes = await seoEngineService.getRankings().catch(() => ({ data: null, error: 'Rankings table unavailable' }));
      const qStats = await seoEngineService.getQueueStats().catch(() => ({ pending: 0, processing: 0, completed: 0, failed: 0 }));

      if (kwRes.data) setKeywords(kwRes.data);
      if (artRes.data) setArticles(artRes.data);
      if (rankRes.data) setRankings(rankRes.data);
      setStats(qStats);
    } catch (err) {
      console.error('SEO Engine load error:', err);
    } finally {
      clearTimeout(safetyTimer);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleAddSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleKeyword.trim()) return;

    const trimmedKw = singleKeyword.trim();
    const existing = keywords.find(k => k.keyword?.toLowerCase() === trimmedKw.toLowerCase());
    
    if (existing && existing.status === 'completed') {
      alert(`The focus keyword '${existing.keyword}' has already been used to generate a post. Skipping to prevent duplicates.`);
      return;
    }

    const newKeyword = {
      keyword: trimmedKw,
      intent: singleIntent,
      volume: parseInt(singleVolume) || 0,
      cpc: 1.25,
      pd: 45,
      seo_difficulty: 35
    };

    const { error } = await seoEngineService.importKeywords([newKeyword]);
    if (!error) {
      setSingleKeyword('');
      loadAllData();
    } else {
      alert(`Error: ${error.message || error}`);
    }
  };

  const handleBulkImport = async () => {
    if (!bulkInput.trim()) return;

    // Parse CSV: keyword, intent, volume, cpc, pd, seo_difficulty
    const rows = bulkInput.split('\n');
    const parsedKeywords: any[] = [];
    let skippedCount = 0;

    rows.forEach(row => {
      const cols = row.split(',');
      if (cols[0] && cols[0].trim() !== 'keyword') {
        const kwString = cols[0].trim();
        const existing = keywords.find(k => k.keyword?.toLowerCase() === kwString.toLowerCase());

        if (existing && existing.status === 'completed') {
          skippedCount++;
        } else {
          parsedKeywords.push({
            keyword: kwString,
            intent: (cols[1]?.trim() as any) || 'Informational',
            volume: parseInt(cols[2]?.trim()) || 0,
            cpc: parseFloat(cols[3]?.trim()) || 0.85,
            pd: parseInt(cols[4]?.trim()) || 30,
            seo_difficulty: parseInt(cols[5]?.trim()) || 25
          });
        }
      }
    });

    if (parsedKeywords.length === 0) {
      if (skippedCount > 0) alert(`All ${skippedCount} keywords were skipped because they have already been used.`);
      else alert('No valid rows found to parse. Format: keyword,intent,volume,cpc,pd,difficulty');
      return;
    }

    const { error } = await seoEngineService.importKeywords(parsedKeywords);
    if (!error) {
      setBulkInput('');
      setShowBulkModal(false);
      loadAllData();
      if (skippedCount > 0) {
        alert(`Import successful. Note: ${skippedCount} keywords were skipped because they had already been used.`);
      }
    } else {
      alert(`Import Failed: ${error.message || error}`);
    }
  };

  const handleTriggerGeneration = async (id: string) => {
    setActioningId(id);
    const { success, error } = await seoEngineService.triggerGeneration(id);
    setActioningId(null);
    if (success) {
      alert('Autonomous engine started! Article generation in progress.');
      loadAllData();
    } else {
      alert(`Autonomous run failed: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <Cpu className="text-[#006970] w-8 h-8" /> Autonomous SEO Engine
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
            Autonomous Keyword Clustering, Long-Form Brand Copywriting, Semantic Interlinking, and SERP Tracking. Manage the entire organic funnel directly from this continuous pipeline dashboard.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={loadAllData}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 hover:shadow-md rounded-xl text-sm font-semibold text-slate-700 transition-all duration-300 shadow-sm"
          >
            <RefreshCw size={16} /> Sync Engine
          </button>
          <button 
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#006970] hover:bg-[#005a60] rounded-xl text-sm font-bold text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <UploadCloud size={16} /> Bulk Import Keywords
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <RefreshCw className="animate-spin text-[#006970] mb-4" size={32} />
          <p className="text-slate-500 font-semibold text-sm">Syncing Autonomous Cluster Maps...</p>
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* SECTION: DASHBOARD */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">Engine Overview</h2>
            {/* Stats Panel */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                <Database className="text-slate-100 absolute -right-4 -top-4 w-24 h-24" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3 relative z-10">Pending Generation</span>
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight relative z-10">{stats.pending}</h2>
              </div>
              <div className="bg-white border border-slate-200 p-8 rounded-2xl flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                <Activity className="text-[#f0fafa] absolute -right-4 -top-4 w-24 h-24 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#006970] mb-3 relative z-10">Active Pipeline</span>
                <h2 className="text-4xl font-bold text-[#006970] tracking-tight relative z-10">{stats.processing}</h2>
              </div>
              <div className="bg-white border border-slate-200 p-8 rounded-2xl flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                <CheckCircle className="text-emerald-50 absolute -right-4 -top-4 w-24 h-24" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-3 relative z-10">Completed & Live</span>
                <h2 className="text-4xl font-bold text-emerald-600 tracking-tight relative z-10">{stats.completed}</h2>
              </div>
              <div className="bg-white border border-slate-200 p-8 rounded-2xl flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                <XCircle className="text-red-50 absolute -right-4 -top-4 w-24 h-24" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 mb-3 relative z-10">Failed Runs</span>
                <h2 className="text-4xl font-bold text-red-600 tracking-tight relative z-10">{stats.failed}</h2>
              </div>
            </div>

            {/* Forms and Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Single Add Keyword Form */}
              <div className="bg-white border border-slate-200 p-8 rounded-2xl h-fit shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-6 flex items-center gap-2">
                  <Plus size={20} className="text-[#006970]" /> Add Target Keyword
                </h3>
                <form onSubmit={handleAddSingle} className="space-y-5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-2">Focus Keyword</label>
                    <input 
                      type="text"
                      placeholder="e.g. best invoicing app for developers"
                      value={singleKeyword}
                      onChange={(e) => setSingleKeyword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#006970] focus:ring-2 focus:ring-[#006970]/20 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-2">Search Intent</label>
                      <select
                        value={singleIntent}
                        onChange={(e: any) => setSingleIntent(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#006970] focus:ring-2 focus:ring-[#006970]/20 transition-all appearance-none"
                      >
                        <option>Informational</option>
                        <option>Transactional</option>
                        <option>Commercial</option>
                        <option>Navigational</option>
                        <option>Local</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-2">Monthly Volume</label>
                      <input 
                        type="number"
                        value={singleVolume}
                        onChange={(e) => setSingleVolume(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#006970] focus:ring-2 focus:ring-[#006970]/20 transition-all"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#006970] hover:bg-[#005a60] rounded-xl text-sm font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm mt-2"
                  >
                    <Plus size={16} /> Add keyword to Cluster
                  </button>
                </form>
              </div>

              {/* Queue status */}
              <div className="lg:col-span-2 bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-6 flex items-center gap-2">
                  <Activity size={20} className="text-[#006970]" /> Autonomous Campaign Queue
                </h3>
                <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {keywords.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                      <p className="text-sm text-slate-500 mb-4">No keywords currently registered. Bulk import to deploy campaigns.</p>
                      <button 
                        onClick={() => setShowBulkModal(true)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-lg transition"
                      >
                        Bulk Import Now
                      </button>
                    </div>
                  ) : (
                    keywords.slice(0, 5).map((kw) => (
                      <div key={kw.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{kw.keyword}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-[11px] font-bold uppercase tracking-widest bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{kw.intent}</span>
                            <span className="text-[11px] font-bold uppercase tracking-widest bg-slate-100 text-slate-600 px-2 py-1 rounded-md">Vol: {kw.volume}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                          <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                            kw.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                            kw.status === 'processing' ? 'bg-[#f0fafa] text-[#006970]' :
                            kw.status === 'failed' ? 'bg-red-50 text-red-700' :
                            'bg-amber-50 text-amber-700'
                          }`}>
                            {kw.status}
                          </span>
                          {kw.status === 'pending' && (
                            <button
                              onClick={() => handleTriggerGeneration(kw.id!)}
                              disabled={actioningId !== null}
                              className="p-2.5 bg-[#f0fafa] hover:bg-[#006970] text-[#006970] hover:text-white rounded-xl transition-all duration-300 disabled:opacity-50"
                            >
                              <Play size={14} className="ml-0.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: KEYWORDS */}
          <section className="space-y-6 pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Target Focus Keywords Cluster</h2>
                <p className="text-sm text-slate-500 mt-1">Manage and track your primary search terms and their autonomous generation status.</p>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 bg-slate-200/50 px-4 py-2 rounded-xl">{keywords.length} Target Terms</span>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-visible">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-5">
                        Keyword
                        <Tooltip text="Words that people type into Google." />
                      </th>
                      <th className="px-6 py-5">
                        Intent
                        <Tooltip text="Search intent, or user intent, refers to the purpose behind a user's search query. It reveals what the user hopes to achieve, whether that's gathering information, finding a service, downloading a resource, or making a purchase." />
                      </th>
                      <th className="px-6 py-5 text-center">
                        Volume
                        <Tooltip text="Volume is the number of searches this particular keyword has during a month." />
                      </th>
                      <th className="px-6 py-5 text-center">
                        Difficulty
                        <Tooltip text="SEO Difficulty - Estimated competition in organic search, the higher the number the more competitive." />
                      </th>
                      <th className="px-6 py-5 text-center">
                        CPC
                        <Tooltip text="Cost Per Click (CPC) - Average cost per click if you wanted to pay Google to be seen as an ad. If someone is paying a high CPC, the keyword is usually more valuable." />
                      </th>
                      <th className="px-6 py-5 text-right">Autonomous Pipeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {keywords.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No keywords found.</td>
                      </tr>
                    ) : (
                      keywords.map((kw) => (
                        <tr key={kw.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-5 font-bold text-slate-900">{kw.keyword}</td>
                          <td className="px-6 py-5">
                            <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest">{kw.intent}</span>
                          </td>
                          <td className="px-6 py-5 text-center font-bold text-slate-900">{kw.volume.toLocaleString()}</td>
                          <td className="px-6 py-5 text-center">
                            <span className={`font-bold ${
                              kw.seo_difficulty > 60 ? 'text-red-600' :
                              kw.seo_difficulty > 40 ? 'text-amber-600' :
                              'text-emerald-600'
                            }`}>{kw.seo_difficulty}/100</span>
                          </td>
                          <td className="px-6 py-5 text-center text-slate-900 font-bold">${kw.cpc ? kw.cpc.toFixed(2) : '0.00'}</td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-end gap-3">
                              <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                                kw.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                                kw.status === 'processing' ? 'bg-[#f0fafa] text-[#006970]' :
                                kw.status === 'failed' ? 'bg-red-50 text-red-700' :
                                'bg-amber-50 text-amber-700'
                              }`}>
                                {kw.status === 'completed' ? `USED (${kw.intent === 'Transactional' || kw.intent === 'Commercial' ? 'Service Page' : 'Blog Post'})` : kw.status}
                              </span>
                              {kw.status === 'pending' && (
                                <button
                                  onClick={() => handleTriggerGeneration(kw.id!)}
                                  disabled={actioningId !== null}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-[#f0fafa] hover:bg-[#006970] text-[#006970] hover:text-white text-[11px] font-bold uppercase tracking-widest rounded-lg transition-colors duration-300"
                                >
                                  <Play size={12} className="ml-0.5" /> Auto-Gen
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION: ARTICLES */}
          <section className="space-y-6 pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Generated Blog Posts & Service Pages</h2>
                <p className="text-sm text-slate-500 mt-1">Review AI-authored, SEO-optimized long-form content deployed to your site.</p>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 bg-slate-200/50 px-4 py-2 rounded-xl">{articles.length} Published Pages</span>
            </div>

            {articles.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center py-16 shadow-sm">
                <FileText className="text-slate-200 mb-4" size={56} />
                <p className="text-sm text-slate-500">No articles generated yet. Fire up the queue in the dashboard!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((art) => (
                  <div key={art.id} className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg ${
                          art.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>{art.status}</span>
                        <div className="text-right">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">SEO Score</span>
                          <strong className="text-lg font-bold text-slate-900 tracking-tight">{art.seo_score}<span className="text-slate-400 text-sm">/100</span></strong>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-3 leading-tight tracking-tight">{art.title}</h4>
                      <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-6">{art.meta_description}</p>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-auto">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{art.word_count.toLocaleString()} Words</span>
                      <a 
                        href={`/blog/${art.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm font-bold text-[#006970] hover:text-[#005a60] hover:underline transition-colors"
                      >
                        <Eye size={14} /> View Page
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SECTION: RANKINGS */}
          <section className="space-y-6 pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Google Rank Tracking (Organic Monitor)</h2>
                <p className="text-sm text-slate-500 mt-1">Monitor real-time SERP positions for your target clusters.</p>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 bg-slate-200/50 px-4 py-2 rounded-xl">Active Insights</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              {rankings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <TrendingUp className="text-slate-200 mb-4" size={56} />
                  <p className="text-sm text-slate-500">No ranking history collected. Cron job fires historical SERP scrapes weekly.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-5">Keyword</th>
                        <th className="px-6 py-5 text-center">Google Position</th>
                        <th className="px-6 py-5 text-center">Last Tracked</th>
                        <th className="px-6 py-5 text-right">SERPs Evidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rankings.map((rank) => (
                        <tr key={rank.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-5 font-bold text-slate-900">{rank.keyword}</td>
                          <td className="px-6 py-5 text-center">
                            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm shadow-sm border ${
                              rank.google_rank <= 3 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              rank.google_rank <= 10 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              'bg-slate-50 text-slate-700 border-slate-200'
                            }`}>
                              #{rank.google_rank}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-center font-bold text-slate-600">{new Date(rank.tracked_at).toLocaleDateString()}</td>
                          <td className="px-6 py-5 text-right">
                            {rank.serps_snapshot_url ? (
                              <a 
                                href={rank.serps_snapshot_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-[#006970] text-slate-700 hover:text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-colors duration-300"
                              >
                                <Eye size={14} /> View Snap
                              </a>
                            ) : (
                              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Unavailable</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* SECTION: SETTINGS */}
          <section className="space-y-6 pt-6 border-t border-slate-200">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Orchestration Settings</h2>
              <p className="text-sm text-slate-500 mt-1">Configure global automation behaviors and metadata fallbacks.</p>
            </div>
            
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 max-w-3xl">
              <div className="space-y-8">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-2">Global Fallback Meta Title</label>
                  <input 
                    type="text"
                    value={settings.default_meta_title}
                    onChange={(e) => setSettings({...settings, default_meta_title: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#006970] focus:ring-2 focus:ring-[#006970]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-2">Global Fallback Meta Description</label>
                  <textarea 
                    rows={4}
                    value={settings.default_meta_description}
                    onChange={(e) => setSettings({...settings, default_meta_description: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#006970] focus:ring-2 focus:ring-[#006970]/20 transition-all resize-none"
                  />
                </div>
                <div className="flex items-center justify-between py-6 border-t border-b border-slate-100">
                  <div className="pr-8">
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">Auto-Publish Content</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">Toggle auto-publishing articles without manual admin drafts review. When enabled, generation goes straight to live.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input 
                      type="checkbox"
                      checked={settings.auto_publish}
                      onChange={(e) => setSettings({...settings, auto_publish: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#006970]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006970]"></div>
                  </label>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-2">Automated System Cron Interval</label>
                  <input 
                    type="text"
                    value={settings.cron_expression}
                    onChange={(e) => setSettings({...settings, cron_expression: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:border-[#006970] focus:ring-2 focus:ring-[#006970]/20 transition-all"
                  />
                  <span className="text-xs text-slate-500 mt-2 block font-medium">Configures edge scheduler triggering keywords queue execution automatically.</span>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={async () => {
                      setSavingSettings(true);
                      try {
                        const { error } = await seoEngineService.saveSettings(settings);
                        if (error) {
                          alert(`Failed to save: ${error.message || error}`);
                        } else {
                          alert('Settings saved successfully!');
                        }
                      } catch (err: any) {
                        alert(`Error: ${err.message}`);
                      } finally {
                        setSavingSettings(false);
                      }
                    }}
                    disabled={savingSettings}
                    className="px-8 py-3 bg-[#006970] hover:bg-[#005a60] rounded-xl text-sm font-bold text-white transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 flex items-center gap-2"
                  >
                    {savingSettings && <RefreshCw size={14} className="animate-spin" />}
                    {savingSettings ? 'Saving...' : 'Save Configuration'}
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-2xl p-8 rounded-2xl space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-5">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                <FileSpreadsheet className="text-[#006970]" /> Bulk CSV Import
              </h3>
              <button onClick={() => setShowBulkModal(false)} className="text-slate-400 hover:text-slate-900 p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            <div className="bg-[#f0fafa]/50 border border-[#d0eded] p-5 rounded-xl flex gap-4 text-sm text-[#004a4f] leading-relaxed">
              <AlertTriangle className="text-[#006970] shrink-0 mt-0.5" size={20} />
              <div>
                <strong className="text-[#004a4f] text-base block mb-1">CSV Structure Guidelines</strong>
                <p className="text-[#005a60]/80">Provide data sequentially in lines without header row: <code className="bg-white border border-[#b9cacb] px-2 py-1 rounded-md text-[#006970] font-mono text-xs mx-1">keyword,intent,volume,cpc,pd,difficulty</code></p>
                <p className="mt-3 text-[#005a60]/80 text-xs">Example: <code className="bg-white border border-[#b9cacb] px-2 py-1 rounded-md font-mono text-xs ml-1">free invoice maker,Transactional,2500,1.20,35,15</code></p>
              </div>
            </div>
            <textarea
              rows={8}
              placeholder="Paste raw CSV content here..."
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-5 rounded-xl text-sm font-mono focus:outline-none focus:border-[#006970] focus:ring-2 focus:ring-[#006970]/20 text-slate-900 placeholder:text-slate-400 transition-all custom-scrollbar"
            />
            <div className="flex gap-4 justify-end pt-4 border-t border-slate-100">
              <button 
                onClick={() => setShowBulkModal(false)}
                className="px-6 py-3 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleBulkImport}
                className="px-6 py-3 bg-[#006970] hover:bg-[#005a60] rounded-xl text-sm font-bold text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Start Bulk Parsing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

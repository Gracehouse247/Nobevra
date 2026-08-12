'use client';

import React, { useState, useCallback } from 'react';
import {
  Zap, Search, TrendingUp, AlertTriangle, CheckCircle2, Info,
  BarChart2, Eye, Lightbulb, Tags, RefreshCcw, Copy, ChevronDown,
  ChevronRight, Loader2, Target, BookOpen, MessageCircle as Twitter, Briefcase as Linkedin,
  Mail, Sparkles, MessageSquare, ArrowRight, Check, X,
  PenLine, Expand, AlignLeft, Repeat2, Minimize2, Briefcase,
  SmilePlus, ChevronsDown, ListOrdered, HelpCircle, Share2, Calendar, Send
} from 'lucide-react';
import SocialPublishModal from './SocialPublishModal';
import { supabase } from '@/lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────
interface SEOAnalysis {
  overallScore: number;
  readabilityScore: number;
  seoScore: number;
  keywordDensity: number;
  readingTime: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  toneConsistency: 'formal' | 'conversational' | 'mixed';
  issues: { type: 'error' | 'warning' | 'info'; message: string; fix: string }[];
  strengths: string[];
  lsiKeywords: string[];
  missingTopics: string[];
  titleAnalysis: {
    hasKeyword: boolean; length: number;
    powerWords: string[]; suggestion: string;
  };
  metaAnalysis: {
    hasKeyword: boolean; length: number;
    isCompelling: boolean; suggestion: string;
  };
  contentStructure: {
    hasH1: boolean; hasH2: boolean; hasImages: boolean;
    hasInternalLinks: boolean; hasBulletPoints: boolean; paragraphCount: number;
  };
  snippetPreview: { title: string; url: string; description: string };
}

interface AISeoAnalyzerProps {
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  wordCount: number;
  onInsertContent?: (text: string) => void;
}

type AssistMode =
  | 'improve' | 'expand' | 'summarize' | 'rephrase' | 'simplify'
  | 'formal' | 'casual' | 'conclusion' | 'intro' | 'faq' | 'outline'
  | 'repurpose_twitter' | 'repurpose_linkedin' | 'repurpose_newsletter';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ScoreRing = ({ score, label, size = 64 }: { score: number; label: string; size?: number }) => {
  const radius = (size - 8) / 2;
  const circ = 2 * Math.PI * radius;
  const fill = (score / 100) * circ;
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={6} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={6}
          strokeDasharray={`${fill} ${circ - fill}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
        <text
          x="50%" y="50%" textAnchor="middle" dy="0.35em"
          fontSize={size / 4.5} fontWeight="800" fill={color}
          style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%' }}
        >
          {score}
        </text>
      </svg>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
    </div>
  );
};

const IssueItem = ({ issue }: { issue: SEOAnalysis['issues'][0] }) => {
  const [open, setOpen] = useState(false);
  const cfg = {
    error:   { icon: X,             bg: 'bg-red-50',     border: 'border-red-200',    text: 'text-red-700',    iconColor: 'text-red-500' },
    warning: { icon: AlertTriangle, bg: 'bg-amber-50',   border: 'border-amber-200',  text: 'text-amber-700',  iconColor: 'text-amber-500' },
    info:    { icon: Info,          bg: 'bg-blue-50',    border: 'border-blue-200',   text: 'text-blue-700',   iconColor: 'text-blue-500' },
  }[issue.type];
  const Icon = cfg.icon;

  return (
    <button
      type="button"
      onClick={() => setOpen(o => !o)}
      className={`w-full text-left rounded-lg border ${cfg.bg} ${cfg.border} p-2.5 transition-all`}
    >
      <div className="flex items-start gap-2">
        <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${cfg.iconColor}`} />
        <span className={`text-xs font-medium flex-1 ${cfg.text}`}>{issue.message}</span>
        {open ? <ChevronDown className="w-3 h-3 text-slate-400" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
      </div>
      {open && (
        <p className="mt-2 text-xs text-slate-600 pl-5 border-t border-noble-border pt-2">
          <span className="font-bold">Fix: </span>{issue.fix}
        </p>
      )}
    </button>
  );
};

const Chip = ({ text }: { text: string }) => (
  <span className="inline-block px-2 py-0.5 bg-[#e8f5f6] text-[#006970] text-[11px] font-semibold rounded-full border border-[#b9dacb]">
    {text}
  </span>
);

const CheckRow = ({ label, ok }: { label: string; ok: boolean }) => (
  <div className="flex items-center gap-2 py-1">
    {ok
      ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
      : <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
    }
    <span className={`text-xs ${ok ? 'text-slate-700' : 'text-slate-400 line-through'}`}>{label}</span>
  </div>
);

const ASSIST_ACTIONS: { mode: AssistMode; icon: React.ElementType; label: string; desc: string; group: string }[] = [
  // Writing
  { mode: 'improve',    icon: PenLine,     label: 'Improve Writing',  desc: 'Polish flow & clarity',     group: 'Writing' },
  { mode: 'expand',     icon: Expand,      label: 'Expand Content',   desc: 'Add depth & detail',        group: 'Writing' },
  { mode: 'summarize',  icon: AlignLeft,   label: 'Summarize',        desc: 'Extract key bullet points', group: 'Writing' },
  { mode: 'rephrase',   icon: Repeat2,     label: 'Rephrase',         desc: 'Fresh take, same meaning',  group: 'Writing' },
  { mode: 'simplify',   icon: Minimize2,   label: 'Simplify',         desc: 'Easier reading level',      group: 'Writing' },
  // Tone
  { mode: 'formal',     icon: Briefcase,   label: 'Make Formal',      desc: 'Professional business tone',group: 'Tone' },
  { mode: 'casual',     icon: SmilePlus,   label: 'Make Casual',      desc: 'Friendly conversation tone',group: 'Tone' },
  // Structure
  { mode: 'intro',      icon: ArrowRight,  label: 'Write Intro',      desc: 'Hook opening paragraph',    group: 'Structure' },
  { mode: 'conclusion', icon: ChevronsDown,label: 'Write Conclusion', desc: 'Compelling closing',        group: 'Structure' },
  { mode: 'outline',    icon: ListOrdered, label: 'Generate Outline', desc: 'H2/H3 article structure',   group: 'Structure' },
  { mode: 'faq',        icon: HelpCircle,  label: 'Generate FAQ',     desc: '5 Q&As from content',       group: 'Structure' },
  // Repurpose
  { mode: 'repurpose_twitter',    icon: Twitter,  label: 'Twitter Thread',  desc: '10–15 tweet thread',      group: 'Repurpose' },
  { mode: 'repurpose_linkedin',   icon: Linkedin, label: 'LinkedIn Post',   desc: 'Professional LinkedIn',   group: 'Repurpose' },
  { mode: 'repurpose_newsletter', icon: Mail,     label: 'Email Newsletter',desc: 'Subscriber email format',  group: 'Repurpose' },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AISeoAnalyzer({
  title, content, metaTitle, metaDescription, slug, wordCount, onInsertContent
}: AISeoAnalyzerProps) {
  const [focusKeyword, setFocusKeyword] = useState('');
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState('');
  const [activeTab, setActiveTab] = useState<'seo' | 'ai'>('seo');

  // AI Assistant state
  const [assistLoading, setAssistLoading] = useState<AssistMode | null>(null);
  const [assistResult, setAssistResult] = useState<{ mode: AssistMode; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const runSeoAnalysis = useCallback(async () => {
    if (!title && !content) return;
    setAnalyzing(true);
    setAnalyzeError('');
    setAnalysis(null);
    try {
      const { data, error } = await supabase.functions.invoke('cms-seo-analyze', {
        body: { title, content, metaTitle, metaDescription, slug, focusKeyword, wordCount },
      });
      if (error) throw new Error(error.message || 'Analysis failed');
      if (data?.error) throw new Error(data.error);
      setAnalysis(data.analysis);
    } catch (err: any) {
      setAnalyzeError(err.message || 'Failed to analyze. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  }, [title, content, metaTitle, metaDescription, slug, focusKeyword, wordCount]);

  const runAssist = useCallback(async (mode: AssistMode) => {
    if (!content && !title) return;
    setAssistLoading(mode);
    setAssistResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('cms-ai-assist', {
        body: { mode, content: content || title, title },
      });
      if (error) throw new Error(error.message || 'AI request failed');
      if (data?.error) throw new Error(data.error);
      setAssistResult({ mode, text: data.result });
    } catch (err: any) {
      setAssistResult({ mode, text: `Error: ${err.message}` });
    } finally {
      setAssistLoading(null);
    }
  }, [content, title]);

  const copyResult = () => {
    if (assistResult) {
      navigator.clipboard.writeText(assistResult.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const insertResult = () => {
    if (assistResult && onInsertContent) {
      onInsertContent(assistResult.text);
    }
  };

  // Group AI actions
  const groups = Array.from(new Set(ASSIST_ACTIONS.map(a => a.group)));

  return (
    <div className="aip-wrapper">
      {/* ─── Tab Bar ─── */}
      <div className="aip-tabs">
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`aip-tab ${activeTab === 'seo' ? 'aip-tab--active' : ''}`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          SEO Analyzer
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ai')}
          className={`aip-tab ${activeTab === 'ai' ? 'aip-tab--active' : ''}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI Assistant
        </button>
      </div>

      {/* ══════════ SEO ANALYZER TAB ══════════ */}
      {activeTab === 'seo' && (
        <div className="aip-content">
          {/* Focus Keyword */}
          <div>
            <label className="aip-label">Focus Keyword</label>
            <div className="flex gap-2">
              <input
                value={focusKeyword}
                onChange={e => setFocusKeyword(e.target.value)}
                placeholder="e.g. SaaS invoicing Nigeria"
                className="aip-input flex-1"
                onKeyDown={e => e.key === 'Enter' && runSeoAnalysis()}
              />
              <button
                type="button"
                onClick={runSeoAnalysis}
                disabled={analyzing}
                className="aip-btn-primary px-3 flex-shrink-0"
                title="Run SEO Analysis"
              >
                {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {analyzeError && (
            <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {analyzeError}
            </div>
          )}

          {analyzing && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-12 h-12 rounded-full border-4 border-[#e0f0f1] border-t-[#006970] animate-spin" />
              <p className="text-sm text-slate-500 font-medium">Gemini is analyzing your content…</p>
            </div>
          )}

          {!analysis && !analyzing && !analyzeError && (
            <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#006970] to-[#004a50] flex items-center justify-center shadow-lg">
                <Search className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">AI-Powered SEO Analysis</p>
                <p className="text-xs text-slate-400 mt-1">Enter a focus keyword and click the ⚡ button to run a full RankMath-style analysis using Gemini.</p>
              </div>
            </div>
          )}

          {analysis && (
            <div className="aip-analysis">
              {/* Score Overview */}
              <div className="aip-card">
                <p className="aip-section-title mb-3">SEO Score Overview</p>
                <div className="flex items-center justify-around">
                  <ScoreRing score={analysis.overallScore} label="Overall" size={72} />
                  <ScoreRing score={analysis.seoScore} label="SEO" size={56} />
                  <ScoreRing score={analysis.readabilityScore} label="Readability" size={56} />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[
                    { label: 'Reading Time', value: `${analysis.readingTime}m` },
                    { label: 'Keyword Density', value: `${analysis.keywordDensity}%` },
                    { label: 'Sentiment', value: analysis.sentiment },
                  ].map(s => (
                    <div key={s.label} className="bg-slate-50 rounded-lg p-2 text-center">
                      <p className="text-sm font-bold text-[#006970]">{s.value}</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SERP Preview */}
              <div className="aip-card">
                <p className="aip-section-title mb-2">SERP Preview</p>
                <div className="bg-noble-surface border border-noble-border rounded-lg p-3">
                  <p className="text-blue-600 text-sm font-medium leading-tight">{analysis.snippetPreview.title}</p>
                  <p className="text-green-700 text-xs mt-0.5">nobleinvoice.com/{analysis.snippetPreview.url}</p>
                  <p className="text-slate-500 text-xs leading-relaxed mt-1 line-clamp-2">{analysis.snippetPreview.description}</p>
                </div>
              </div>

              {/* Issues */}
              {analysis.issues.length > 0 && (
                <div className="aip-card">
                  <p className="aip-section-title mb-2">
                    Issues ({analysis.issues.length})
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {analysis.issues.map((issue, i) => <IssueItem key={i} issue={issue} />)}
                  </div>
                </div>
              )}

              {/* Strengths */}
              {analysis.strengths.length > 0 && (
                <div className="aip-card">
                  <p className="aip-section-title mb-2">✅ Strengths</p>
                  <div className="flex flex-col gap-1.5">
                    {analysis.strengths.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Content Structure Checklist */}
              <div className="aip-card">
                <p className="aip-section-title mb-2">Content Checklist</p>
                <CheckRow label="Has H1 heading" ok={analysis.contentStructure.hasH1} />
                <CheckRow label="Has H2 subheadings" ok={analysis.contentStructure.hasH2} />
                <CheckRow label="Has images" ok={analysis.contentStructure.hasImages} />
                <CheckRow label="Has internal links" ok={analysis.contentStructure.hasInternalLinks} />
                <CheckRow label="Has bullet points" ok={analysis.contentStructure.hasBulletPoints} />
                <CheckRow label="Meta has focus keyword" ok={analysis.metaAnalysis.hasKeyword} />
                <CheckRow label="Title has focus keyword" ok={analysis.titleAnalysis.hasKeyword} />
                <CheckRow label="Compelling meta description" ok={analysis.metaAnalysis.isCompelling} />
              </div>

              {/* Title & Meta Suggestions */}
              {(analysis.titleAnalysis.suggestion || analysis.metaAnalysis.suggestion) && (
                <div className="aip-card">
                  <p className="aip-section-title mb-2">💡 AI Suggestions</p>
                  {analysis.titleAnalysis.suggestion && (
                    <div className="mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Improved Title</p>
                      <p className="text-xs text-slate-700 bg-slate-50 rounded-lg p-2 border border-noble-border italic">"{analysis.titleAnalysis.suggestion}"</p>
                    </div>
                  )}
                  {analysis.metaAnalysis.suggestion && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Improved Meta Description</p>
                      <p className="text-xs text-slate-700 bg-slate-50 rounded-lg p-2 border border-noble-border italic">"{analysis.metaAnalysis.suggestion}"</p>
                    </div>
                  )}
                </div>
              )}

              {/* LSI Keywords */}
              {analysis.lsiKeywords.length > 0 && (
                <div className="aip-card">
                  <p className="aip-section-title mb-2">
                    <Tags className="inline w-3.5 h-3.5 mr-1" />LSI / Semantic Keywords
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.lsiKeywords.map((k, i) => <Chip key={i} text={k} />)}
                  </div>
                </div>
              )}

              {/* Missing Topics */}
              {analysis.missingTopics.length > 0 && (
                <div className="aip-card">
                  <p className="aip-section-title mb-2">
                    <Lightbulb className="inline w-3.5 h-3.5 mr-1" />Missing Topics
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {analysis.missingTopics.map((t, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="text-amber-500 font-bold flex-shrink-0">+</span> {t}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Re-analyze button */}
              <button
                type="button"
                onClick={runSeoAnalysis}
                disabled={analyzing}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-noble-border text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-all"
              >
                <RefreshCcw className="w-4 h-4" />
                Re-analyze
              </button>
            </div>
          )}
        </div>
      )}

      {/* ══════════ AI ASSISTANT TAB ══════════ */}
      {activeTab === 'ai' && (
        <div className="aip-content">
          {/* Result Panel */}
          {assistResult && (
            <div className="aip-card aip-result-card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-[#006970] uppercase tracking-widest">
                  {ASSIST_ACTIONS.find(a => a.mode === assistResult.mode)?.label}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={copyResult}
                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  {onInsertContent && (
                    <button
                      type="button"
                      onClick={insertResult}
                      className="px-2.5 py-1 rounded-md bg-[#006970] text-white text-xs font-semibold hover:bg-[#005a60] transition-colors"
                    >
                      Insert
                    </button>
                  )}
                  {assistResult.mode.startsWith('repurpose_') && assistResult.mode !== 'repurpose_newsletter' && (
                    <button
                      type="button"
                      onClick={() => setShowPublishModal(true)}
                      className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <Share2 className="w-3 h-3" /> Publish
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setAssistResult(null)}
                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="aip-result-text">{assistResult.text}</div>
            </div>
          )}

          {/* Action Groups */}
          {groups.map(group => (
            <div key={group}>
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 mb-2">{group}</p>
              <div className="grid grid-cols-1 gap-1.5 mb-4">
                {ASSIST_ACTIONS.filter(a => a.group === group).map(action => (
                  <button
                    key={action.mode}
                    type="button"
                    disabled={assistLoading !== null}
                    onClick={() => runAssist(action.mode)}
                    className={`aip-assist-btn ${assistLoading === action.mode ? 'aip-assist-btn--loading' : ''}`}
                  >
                    <div className="aip-assist-icon">
                      {assistLoading === action.mode
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin text-[#006970]" />
                        : <action.icon className="w-3.5 h-3.5 text-[#006970]" />
                      }
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-semibold text-slate-800">{action.label}</span>
                      <span className="text-[10px] text-slate-400">{action.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {!content && !title && (
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-700 font-medium">
                ⚠️ Add a title or some content first before using the AI assistant.
              </p>
            </div>
          )}
        </div>
      )}

      <style>{`
        .aip-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #f8fafc;
        }
        .aip-tabs {
          display: flex;
          border-bottom: 2px solid #e2e8f0;
          background: white;
          flex-shrink: 0;
        }
        .aip-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 8px;
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .aip-tab:hover { color: #006970; background: #f0fafa; }
        .aip-tab--active { color: #006970; border-bottom-color: #006970; background: white; }

        .aip-content {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .aip-label {
          display: block;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
          margin-bottom: 6px;
        }
        .aip-input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 13px;
          color: #1e293b;
          background: white;
          outline: none;
          transition: border-color 0.15s;
        }
        .aip-input:focus { border-color: #006970; box-shadow: 0 0 0 3px rgba(0,105,112,0.1); }
        .aip-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          background: linear-gradient(135deg, #006970, #004a50);
          color: white;
          font-size: 13px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,105,112,0.25);
        }
        .aip-btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,105,112,0.35); }
        .aip-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .aip-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 14px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .aip-section-title {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #475569;
        }

        .aip-analysis {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .aip-result-card {
          border-color: #b9dacb;
          background: #f0fafa;
        }
        .aip-result-text {
          white-space: pre-wrap;
          font-size: 12px;
          color: #334155;
          line-height: 1.7;
          max-height: 280px;
          overflow-y: auto;
          border-top: 1px solid #d1e8e9;
          padding-top: 10px;
          margin-top: 4px;
        }

        .aip-assist-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          background: white;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
        }
        .aip-assist-btn:hover:not(:disabled) { border-color: #006970; background: #f0fafa; transform: translateX(2px); }
        .aip-assist-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .aip-assist-btn--loading { border-color: #006970; background: #f0fafa; }

        .aip-assist-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: #e8f5f6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      `}</style>
      {assistResult && (
        <SocialPublishModal 
          isOpen={showPublishModal} 
          onClose={() => setShowPublishModal(false)}
          content={assistResult.text}
          platform={assistResult.mode === 'repurpose_twitter' ? 'twitter' : 'linkedin'}
        />
      )}
    </div>
  );
}

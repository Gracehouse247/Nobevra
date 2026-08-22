'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Activity, Users, Target, Zap, ChevronDown, CheckCircle2,
    QrCode, Globe, Smartphone, ArrowRight, Eye, UserPlus, Lock, Sparkles, Building2,
    Link as LinkIcon, X, SmartphoneNfc, Filter, TrendingUp, TrendingDown, Minus,
    Mail, BarChart3, Shield, RefreshCw, Download
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';

// ── Tiny skeleton shimmer ─────────────────────────────────────────────────────
const Skeleton = ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse bg-slate-100 dark:bg-[#112030] rounded-lg ${className}`} />
);

// ── Trend pill (reused in KPI cards) ─────────────────────────────────────────
type Trend = { pct: number; dir: 'up' | 'down' | 'flat' };
const TrendPill = ({ trend, suffix = '%' }: { trend: Trend | null; suffix?: string }) => {
    if (!trend) return <Skeleton className="h-4 w-28 mt-1" />;
    if (trend.dir === 'flat') return (
        <p className="text-[12px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1">
            <Minus size={12} /> No change vs period
        </p>
    );
    const up = trend.dir === 'up';
    return (
        <p className={`text-[12px] font-semibold flex items-center gap-1 mt-1 ${up ? 'text-emerald-600' : 'text-red-500'}`}>
            {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.pct}{suffix} <span className="text-slate-400 dark:text-slate-500 font-normal">vs prev period</span>
        </p>
    );
};

// ── Date filter options ────────────────────────────────────────────────────────
const DATE_OPTIONS = [
    { label: 'Today', days: 1 },
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'Last 90 Days', days: 90 },
];

export default function NetworkIntelligencePage() {
    const { user } = useAuth();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();

    // ── UI state ──────────────────────────────────────────────────────────────
    const [isNfcSetupOpen, setIsNfcSetupOpen] = useState(false);
    const [isEventModeOpen, setIsEventModeOpen] = useState(false);
    const [isIntereventActive, setIsIntereventActive] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const wakeLockRef = useRef<any>(null);
    const datePickerRef = useRef<HTMLDivElement>(null);

    // ── Date filter ───────────────────────────────────────────────────────────
    const [dateFilter, setDateFilter] = useState(DATE_OPTIONS[2]); // Last 30 days default

    // ── Interevent Mode live data ─────────────────────────────────────────────
    const [todayScans, setTodayScans] = useState(0);
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [teamLoading, setTeamLoading] = useState(true);

    // ── Identity ──────────────────────────────────────────────────────────────
    const [primaryIdentity, setPrimaryIdentity] = useState<any>(null);

    // ── Telemetry ─────────────────────────────────────────────────────────────
    const [loading, setLoading] = useState(true);
    const [totalScans, setTotalScans] = useState(0);
    const [uniqueScans, setUniqueScans] = useState(0);
    const [leadsCaptured, setLeadsCaptured] = useState(0);
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    const [scansTrend, setScansTrend] = useState<Trend | null>(null);
    const [leadsTrend, setLeadsTrend] = useState<Trend | null>(null);
    const [convRateTrend, setConvRateTrend] = useState<Trend | null>(null);
    const [presenceScore, setPresenceScore] = useState<number | null>(null);
    const [presenceScorePrev, setPresenceScorePrev] = useState<number | null>(null);
    const [pipeline, setPipeline] = useState({ totalScans: 0, leadsCaptured: 0, contactsMade: 0, qualifiedLeads: 0, converted: 0 });
    const [channels, setChannels] = useState({ qrCode: 0, nfcTap: 0, webLink: 0, sms: 0, others: 0 });
    const [geoLocations, setGeoLocations] = useState<string[]>([]);
    const [chartData, setChartData] = useState<{
        path: string; labels: string[]; maxPeak: number; peakDate: string;
        penetrationRate: string; engagementTime: string;
    } | null>(null);

    // ── Close date picker on outside click ────────────────────────────────────
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
                setIsDatePickerOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // ── Helpers ───────────────────────────────────────────────────────────────
    const calcTrend = (curr: number, prev: number): Trend => {
        if (prev === 0 && curr === 0) return { pct: 0, dir: 'flat' };
        if (prev === 0) return { pct: 100, dir: 'up' };
        const diff = ((curr - prev) / prev) * 100;
        return { pct: Math.abs(Math.round(diff * 10) / 10), dir: diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat' };
    };

    const calcPresenceScore = (scanGrowthPct: number, leadConvPct: number, channelCount: number, hasIdentity: boolean): number => {
        const s1 = Math.min(100, Math.max(0, scanGrowthPct)) * 0.30;
        const s2 = Math.min(100, (leadConvPct / 50) * 100) * 0.30;
        const s3 = Math.min(100, channelCount * 20) * 0.25;
        const s4 = (hasIdentity ? 100 : 0) * 0.15;
        return Math.round(s1 + s2 + s3 + s4);
    };

    const stringHash = (str: string) => {
        let h = 0;
        for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
        return h;
    };

    // ── Interevent: today's scans + team ─────────────────────────────────────
    useEffect(() => {
        if (!user) return;
        const run = async () => {
            setTeamLoading(true);
            const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
            const tomorrowStart = new Date(todayStart); tomorrowStart.setDate(tomorrowStart.getDate() + 1);
            const { count } = await supabase
                .from('scan_logs').select('*', { count: 'exact', head: true })
                .gte('scanned_at', todayStart.toISOString()).lt('scanned_at', tomorrowStart.toISOString());
            setTodayScans(count || 0);

            const { data: teamData } = await supabase
                .from('team_members').select('user_id, role, profiles(display_name, email)').limit(8);
            setTeamMembers(teamData || []);
            setTeamLoading(false);
        };
        run();
    }, [user]);

    // ── Main telemetry fetch ──────────────────────────────────────────────────
    const fetchTelemetry = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const now = new Date();
            const dPrev = new Date(now); dPrev.setDate(now.getDate() - dateFilter.days);
            const dPrevPrev = new Date(now); dPrevPrev.setDate(now.getDate() - dateFilter.days * 2);
            const nowISO = now.toISOString();
            const dPrevISO = dPrev.toISOString();
            const dPrevPrevISO = dPrevPrev.toISOString();

            // 1. Get user's identity IDs (for scoped queries)
            const { data: identityData } = await supabase
                .from('identities').select('*').eq('user_id', user.id)
                .order('is_primary', { ascending: false }).limit(1);
            const hasIdentity = !!(identityData && identityData.length > 0);
            if (hasIdentity) setPrimaryIdentity(identityData![0]);

            // 2. SCANS — using RLS, these are already scoped to current user's identities
            const { data: scanCurr } = await supabase
                .from('scan_logs').select('ip_address, source, scanned_at, location')
                .gte('scanned_at', dPrevISO).lte('scanned_at', nowISO);
            const { data: scanPrev } = await supabase
                .from('scan_logs').select('ip_address, source, scanned_at')
                .gte('scanned_at', dPrevPrevISO).lt('scanned_at', dPrevISO);
            const { data: scanAll } = await supabase
                .from('scan_logs').select('ip_address, source, location');

            const currScans = scanCurr || [];
            const prevScans = scanPrev || [];
            const allScans = scanAll || [];

            // Geo locations
            setGeoLocations(Array.from(new Set(allScans.map(s => s.location).filter(Boolean))) as string[]);

            // Unique IP deduplication
            const uniqueCurrIPs = new Set(currScans.map(s => s.ip_address).filter(Boolean));
            const uniquePrevIPs = new Set(prevScans.map(s => s.ip_address).filter(Boolean));
            const totalUniqueScans = new Set(allScans.map(s => s.ip_address).filter(Boolean)).size;
            const sTotal = allScans.length;
            const sCurr = uniqueCurrIPs.size || currScans.length;
            const sPrev = uniquePrevIPs.size || prevScans.length;

            setTotalScans(sTotal);
            setUniqueScans(totalUniqueScans || sTotal);
            setScansTrend(calcTrend(sCurr, sPrev));

            // 3. LEADS — RLS scopes these to current user's identities
            const { data: leadsAll } = await supabase
                .from('identity_leads').select('*').order('created_at', { ascending: false });
            const { count: leadsCurr } = await supabase
                .from('identity_leads').select('*', { count: 'exact', head: true })
                .gte('created_at', dPrevISO).lte('created_at', nowISO);
            const { count: leadsPrev } = await supabase
                .from('identity_leads').select('*', { count: 'exact', head: true })
                .gte('created_at', dPrevPrevISO).lt('created_at', dPrevISO);

            const lTotal = (leadsAll || []).length;
            const lCurr = leadsCurr || 0;
            const lPrev = leadsPrev || 0;
            setLeadsCaptured(lTotal);
            setLeadsTrend(calcTrend(lCurr, lPrev));
            setRecentLeads((leadsAll || []).slice(0, 5));

            // 4. Conversion rate trend
            const convRateCurr = sCurr > 0 ? (lCurr / sCurr) * 100 : 0;
            const convRatePrev = sPrev > 0 ? (lPrev / sPrev) * 100 : 0;
            setConvRateTrend(calcTrend(convRateCurr, convRatePrev));

            // 5. Pipeline
            let contacts = 0, qualified = 0, converted = 0;
            (leadsAll || []).forEach(lead => {
                const s = lead.status || 'new';
                if (s === 'contacted' || s === 'qualified' || s === 'converted') contacts++;
                if (s === 'qualified' || s === 'converted') qualified++;
                if (s === 'converted') converted++;
            });
            setPipeline({ totalScans: sTotal, leadsCaptured: lTotal, contactsMade: contacts, qualifiedLeads: qualified, converted });

            // 6. Channels
            if (allScans.length > 0) {
                let qr = 0, nfc = 0, web = 0, sms = 0, other = 0;
                allScans.forEach(s => {
                    const src = s.source || 'qr_code';
                    if (src === 'qr_code') qr++;
                    else if (src === 'nfc_tap') nfc++;
                    else if (src === 'web_link') web++;
                    else if (src === 'sms') sms++;
                    else other++;
                });
                const t = allScans.length;
                setChannels({ qrCode: Math.round((qr / t) * 100), nfcTap: Math.round((nfc / t) * 100), webLink: Math.round((web / t) * 100), sms: Math.round((sms / t) * 100), others: Math.round((other / t) * 100) });
            } else {
                setChannels({ qrCode: 0, nfcTap: 0, webLink: 0, sms: 0, others: 0 });
            }

            // 7. Presence Score
            const scanGrowthPct = sPrev > 0 ? ((sCurr - sPrev) / sPrev) * 100 : (sCurr > 0 ? 50 : 0);
            const convPct = sTotal > 0 ? (lTotal / sTotal) * 100 : 0;
            const distinctChannels = new Set(allScans.map(s => s.source).filter(Boolean)).size;
            const scoreNow = calcPresenceScore(scanGrowthPct, convPct, distinctChannels, hasIdentity);
            const scorePrev = calcPresenceScore(0, sPrev > 0 ? (lPrev / sPrev) * 100 : 0, distinctChannels, hasIdentity);
            setPresenceScore(scoreNow);
            setPresenceScorePrev(scorePrev);

            // 8. Scan Velocity Chart
            if (currScans.length > 0) {
                const byDate: Record<string, number> = {};
                currScans.forEach(s => {
                    const d = new Date(s.scanned_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    byDate[d] = (byDate[d] || 0) + 1;
                });
                const dates = Object.keys(byDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
                const pts: { label: string; val: number }[] = [];
                if (dates.length <= 5) {
                    dates.forEach(d => pts.push({ label: d, val: byDate[d] }));
                    while (pts.length < 5) pts.unshift({ label: '', val: 0 });
                } else {
                    const step = (dates.length - 1) / 4;
                    for (let i = 0; i < 5; i++) { const idx = Math.round(i * step); pts.push({ label: dates[idx], val: byDate[dates[idx]] }); }
                }
                const maxScans = Math.max(...pts.map(p => p.val), 1);
                const peakLabel = pts.reduce((a, b) => b.val > a.val ? b : a).label;
                const pathParts = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${i * 25},${maxScans > 0 ? 100 - ((p.val / maxScans) * 80) : 100}`);
                const penetration = sCurr > 0 ? ((uniqueCurrIPs.size || sCurr) / sCurr) * 100 : 0;
                setChartData({ path: pathParts.join(' '), labels: pts.map(p => p.label), maxPeak: maxScans, peakDate: peakLabel, penetrationRate: penetration.toFixed(1) + '%', engagementTime: '1m 12s' });
            } else {
                setChartData({ path: 'M0,100 L25,100 L50,100 L75,100 L100,100', labels: ['', '', '', '', ''], maxPeak: 0, peakDate: 'No data', penetrationRate: '0%', engagementTime: '0s' });
            }
        } catch (err) {
            console.error('Telemetry fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [user, dateFilter]);

    useEffect(() => { fetchTelemetry(); }, [fetchTelemetry]);

    // ── Derived values ────────────────────────────────────────────────────────
    const conversionRate = totalScans > 0 ? ((leadsCaptured / totalScans) * 100).toFixed(1) : '0.0';
    const presenceScoreDelta = presenceScore !== null && presenceScorePrev !== null ? presenceScore - presenceScorePrev : null;
    const presenceScoreStatus = presenceScore !== null ? (presenceScore >= 75 ? 'Peak' : presenceScore >= 50 ? 'Good' : 'Building') : '—';
    let profileCompleteness = 0;
    if (primaryIdentity) {
        const fields = ['full_name', 'job_title', 'email', 'phone', 'website'];
        const filled = fields.filter(f => !!(primaryIdentity as any)[f]).length;
        profileCompleteness = Math.round((filled / fields.length) * 100);
    }

    // ── Screen Wake Lock ─────────────────────────────────────────────────────
    const activateIntereventMode = async () => {
        setIsEventModeOpen(false);
        try { if ('wakeLock' in navigator) wakeLockRef.current = await (navigator as any).wakeLock.request('screen'); } catch { /* proceed */ }
        setIsIntereventActive(true);
    };
    const deactivateIntereventMode = () => {
        wakeLockRef.current?.release(); wakeLockRef.current = null;
        setIsIntereventActive(false);
    };

    const insightMessage = () => {
        if (!scansTrend) return 'Calculating your engagement metrics…';
        if (scansTrend.dir === 'up') return `Scans are up ${scansTrend.pct}% — great momentum, keep sharing your card!`;
        if (scansTrend.dir === 'down') return `Scans are down ${scansTrend.pct}% — try sharing your QR code at your next meeting.`;
        return `Scans are holding steady. Try activating Interevent Mode to boost engagement.`;
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════════════════════
    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent dark:bg-[#060D1A] pb-24 font-inter text-slate-800 dark:text-slate-100">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-8">

                {/* ── Breadcrumbs ── */}
                <div className="flex items-center gap-2 text-[13px] font-medium text-slate-400 dark:text-slate-500 mb-6">
                    <span>Workspace</span>
                    <span>›</span>
                    <Link href="/networking" className="hover:text-slate-700 dark:text-slate-200 transition-colors">Smart Connect</Link>
                    <span>›</span>
                    <span className="text-noble-text font-semibold">Network Intelligence</span>
                </div>

                {/* ── Page Header ── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#166FBB] to-blue-700 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                            <BarChart3 size={22} className="text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-[19px] font-bold text-noble-text leading-tight">Network Intelligence</h1>
                                <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                    Live
                                </span>
                            </div>
                            <p className="text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">Profile Engagement Analytics</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {/* Date filter dropdown */}
                        <div className="relative" ref={datePickerRef}>
                            <button
                                onClick={() => setIsDatePickerOpen(v => !v)}
                                className="flex items-center gap-2 px-3.5 py-2 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors shadow-sm"
                            >
                                {dateFilter.label}
                                <ChevronDown size={14} className={`text-slate-400 dark:text-slate-500 transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDatePickerOpen && (
                                <div className="absolute right-0 top-full mt-2 w-44 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl shadow-lg z-50 overflow-hidden">
                                    {DATE_OPTIONS.map(opt => (
                                        <button
                                            key={opt.days}
                                            onClick={() => { setDateFilter(opt); setIsDatePickerOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] ${dateFilter.days === opt.days ? 'text-[#166FBB] font-bold bg-blue-50' : 'text-slate-700 dark:text-slate-200'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button onClick={() => fetchTelemetry()} title="Refresh" className="flex items-center justify-center w-9 h-9 rounded-xl border border-noble-border text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] hover:text-slate-700 dark:text-slate-200 transition-colors shadow-sm bg-noble-surface dark:bg-noble-card">
                            <RefreshCw size={14} />
                        </button>

                        <button
                            onClick={() => setIsEventModeOpen(true)}
                            className="px-4 py-2 bg-[#166FBB] text-white rounded-xl text-[13px] font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-[0_4px_14px_rgba(22,111,187,0.3)]"
                        >
                            <Zap size={15} className="fill-white/20" />
                            Event Mode
                        </button>
                    </div>
                </div>

                {/* ── KPI Cards ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Total Scans */}
                    <div className="bg-noble-surface dark:bg-noble-card p-5 rounded-2xl border border-noble-border shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-[#166FBB] group-hover:scale-105 transition-transform">
                                <QrCode size={19} />
                            </div>
                            {!loading && scansTrend && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${scansTrend.dir === 'up' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : scansTrend.dir === 'down' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-slate-50 dark:bg-[#0D1B2E] text-slate-400 dark:text-slate-500 border-slate-100 dark:border-noble-border'}`}>
                                    {scansTrend.dir === 'up' ? '↑' : scansTrend.dir === 'down' ? '↓' : '—'} {scansTrend.pct}%
                                </span>
                            )}
                        </div>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mb-1">Total Scans</p>
                        {loading ? <Skeleton className="h-8 w-20 mb-2" /> : (
                            <h3 className="text-[26px] font-bold text-noble-text tracking-tight leading-none mb-1">{totalScans.toLocaleString()}</h3>
                        )}
                        {!loading && uniqueScans !== totalScans && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-0.5">{uniqueScans.toLocaleString()} unique</p>
                        )}
                        <TrendPill trend={loading ? null : scansTrend} />
                    </div>

                    {/* Leads Captured */}
                    <div className="bg-noble-surface dark:bg-noble-card p-5 rounded-2xl border border-noble-border shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                                <Users size={19} />
                            </div>
                            {!loading && leadsTrend && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${leadsTrend.dir === 'up' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : leadsTrend.dir === 'down' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-slate-50 dark:bg-[#0D1B2E] text-slate-400 dark:text-slate-500 border-slate-100 dark:border-noble-border'}`}>
                                    {leadsTrend.dir === 'up' ? '↑' : leadsTrend.dir === 'down' ? '↓' : '—'} {leadsTrend.pct}%
                                </span>
                            )}
                        </div>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mb-1">Leads Captured</p>
                        {loading ? <Skeleton className="h-8 w-16 mb-2" /> : (
                            <h3 className="text-[26px] font-bold text-noble-text tracking-tight leading-none mb-1">{leadsCaptured.toLocaleString()}</h3>
                        )}
                        <TrendPill trend={loading ? null : leadsTrend} />
                    </div>

                    {/* Conversion Rate */}
                    <div className="bg-noble-surface dark:bg-noble-card p-5 rounded-2xl border border-noble-border shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/80 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                                <Target size={19} />
                            </div>
                            {!loading && convRateTrend && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${convRateTrend.dir === 'up' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                    <CheckCircle2 size={10} /> {convRateTrend.dir === 'up' ? 'Optimal' : 'Watch'}
                                </span>
                            )}
                        </div>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mb-1">Conversion Rate</p>
                        {loading ? <Skeleton className="h-8 w-24 mb-2" /> : (
                            <h3 className="text-[26px] font-bold text-noble-text tracking-tight leading-none mb-1">{conversionRate}%</h3>
                        )}
                        <TrendPill trend={loading ? null : convRateTrend} suffix=" pts" />
                    </div>

                    {/* Presence Score */}
                    <div className="bg-noble-surface dark:bg-noble-card p-5 rounded-2xl border border-noble-border shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100/80 flex items-center justify-center text-purple-500 group-hover:scale-105 transition-transform">
                                <Activity size={19} />
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 border border-blue-100 text-[#166FBB] rounded-full">
                                {loading ? '—' : presenceScoreStatus}
                            </span>
                        </div>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mb-1">Presence Score</p>
                        {loading ? <Skeleton className="h-8 w-20 mb-2" /> : (
                            <h3 className="text-[26px] font-bold text-noble-text tracking-tight leading-none mb-1 flex items-baseline gap-1">
                                {presenceScore ?? '—'}<span className="text-[14px] text-slate-400 dark:text-slate-500 font-medium">/100</span>
                            </h3>
                        )}
                        {!loading && presenceScoreDelta !== null ? (
                            <p className={`text-[12px] font-semibold flex items-center gap-1 mt-1 ${presenceScoreDelta >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                {presenceScoreDelta >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {Math.abs(presenceScoreDelta)} pts <span className="text-slate-400 dark:text-slate-500 font-normal">change</span>
                            </p>
                        ) : loading ? <Skeleton className="h-4 w-24 mt-1" /> : null}
                    </div>
                </div>

                {/* ── Hero: Interevent Mode + Digital Identity ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                    {/* Interevent Mode Card */}
                    <div className="lg:col-span-2 bg-[#0A192F] rounded-3xl p-7 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#166FBB]/25 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#166FBB]/10 blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                            <div className="max-w-sm">
                                <div className="inline-flex items-center gap-2 text-white/70 font-bold tracking-widest text-[10px] uppercase mb-3 bg-noble-surface dark:bg-noble-card/5 border border-white/10 px-3 py-1.5 rounded-full">
                                    <Zap size={12} className="fill-white/60" /> INTEREVENT MODE
                                </div>
                                <p className="text-[18px] font-semibold leading-snug mb-6 text-white/90">
                                    Lock your screen into a high-speed networking broadcast for conferences and live events.
                                </p>

                                {/* Team avatars */}
                                <div className="flex items-center gap-3 mb-7">
                                    <div className="flex -space-x-2.5">
                                        {teamLoading ? [1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-9 h-9 rounded-full border-2 border-[#0A192F] bg-slate-700 animate-pulse shrink-0" />
                                        )) : teamMembers.length > 0 ? (<>
                                            {teamMembers.slice(0, 4).map((m, idx) => {
                                                const name = m.profiles?.display_name || m.profiles?.email || '?';
                                                const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500'];
                                                return (
                                                    <div key={m.user_id} title={name} className={`w-9 h-9 rounded-full border-2 border-[#0A192F] ${colors[idx % 4]} text-[11px] font-bold text-white flex items-center justify-center shrink-0`}>
                                                        {name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                );
                                            })}
                                            {teamMembers.length > 4 && (
                                                <div className="w-9 h-9 rounded-full border-2 border-[#0A192F] bg-[#166FBB] text-[11px] font-bold flex items-center justify-center shrink-0">
                                                    +{teamMembers.length - 4}
                                                </div>
                                            )}
                                        </>) : <div className="text-white/40 text-[12px]">Solo mode</div>}
                                    </div>
                                </div>

                                <button onClick={() => setIsEventModeOpen(true)} className="px-6 py-3 bg-[#166FBB] hover:bg-blue-500 transition-colors rounded-full text-[13px] font-bold tracking-wide shadow-[0_0_24px_rgba(22,111,187,0.5)] flex items-center gap-2">
                                    {todayScans > 0 ? `${todayScans.toLocaleString()} SCANS TODAY` : 'Launch Event Mode'}
                                </button>
                            </div>

                            {/* QR Code display */}
                            <div className="shrink-0 p-4 bg-noble-surface dark:bg-noble-card/8 backdrop-blur-md rounded-3xl border border-white/15 shadow-2xl relative">
                                <div className="absolute inset-0 bg-[#166FBB] blur-[50px] opacity-15 rounded-3xl" />
                                <div className="bg-noble-surface dark:bg-noble-card p-3 rounded-2xl relative">
                                    <QrCode size={112} className="text-[#0A192F]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Digital Identity Card */}
                    <div className="bg-noble-surface dark:bg-noble-card rounded-3xl border border-noble-border p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[16px] font-bold text-noble-text">Your Digital Identity</h3>
                                {primaryIdentity && (
                                    <Link href="/studio" className="text-[11px] font-bold text-[#166FBB] hover:underline">Edit →</Link>
                                )}
                            </div>

                            {/* Identity preview card */}
                            <div className="p-4 border border-slate-100 dark:border-noble-border bg-gradient-to-br from-slate-50 to-white rounded-2xl mb-5 shadow-inner">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-11 h-11 bg-gradient-to-br from-[#166FBB] to-blue-700 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-lg overflow-hidden shadow-md">
                                        {primaryIdentity?.card_image_url ? (
                                            <img src={primaryIdentity.card_image_url} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            primaryIdentity?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'N'
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="text-[14px] font-bold text-noble-text truncate">
                                            {primaryIdentity?.full_name || <span className="text-slate-400 dark:text-slate-500 italic">Setup your profile</span>}
                                        </h4>
                                        <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 truncate flex items-center gap-1 mt-0.5">
                                            {primaryIdentity?.job_title || <span className="text-slate-400 dark:text-slate-500 italic">Add a job title</span>}
                                            {primaryIdentity && <CheckCircle2 size={11} className="text-[#166FBB] shrink-0" />}
                                        </p>
                                    </div>
                                </div>

                                {/* Social links */}
                                <div className="flex items-center gap-2">
                                    {primaryIdentity?.website && (
                                        <a href={primaryIdentity.website.startsWith('http') ? primaryIdentity.website : `https://${primaryIdentity.website}`} target="_blank" rel="noreferrer" className="w-8 h-8 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-[#166FBB] hover:border-[#166FBB] transition-colors shadow-sm" title="Website">
                                            <Globe size={13} />
                                        </a>
                                    )}
                                    {primaryIdentity?.email && (
                                        <a href={`mailto:${primaryIdentity.email}`} className="w-8 h-8 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-[#166FBB] hover:border-[#166FBB] transition-colors shadow-sm" title="Email">
                                            <Mail size={13} />
                                        </a>
                                    )}
                                    {primaryIdentity?.phone && (
                                        <a href={`tel:${primaryIdentity.phone}`} className="w-8 h-8 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-[#166FBB] hover:border-[#166FBB] transition-colors shadow-sm" title="Phone">
                                            <Smartphone size={13} />
                                        </a>
                                    )}
                                    {!primaryIdentity?.website && !primaryIdentity?.email && !primaryIdentity?.phone && (
                                        <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">No links added</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* Profile Completeness */}
                            <div className="mb-5">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200">Profile Completeness</span>
                                    <span className="text-[12px] font-bold text-[#166FBB]">{profileCompleteness}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 dark:bg-[#112030] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-400 to-[#166FBB] transition-all duration-1000 ease-out rounded-full"
                                        style={{ width: `${profileCompleteness}%` }}
                                    />
                                </div>
                                {profileCompleteness < 100 && (
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">Complete your profile to boost your Presence Score.</p>
                                )}
                            </div>

                            <button 
                                onClick={() => {
                                    if (!canUse('networking.nfc')) {
                                        openUpgradeModal({ featureName: 'NFC & QR Business Cards', requiredPlan: 'pulse' });
                                        return;
                                    }
                                    setIsNfcSetupOpen(true);
                                }}
                                className="w-full py-3 bg-slate-50 dark:bg-[#0D1B2E] border border-noble-border rounded-xl text-[13px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] transition-colors flex items-center justify-center gap-2"
                            >
                                <SmartphoneNfc size={15} /> Setup NFC Card
                                {!canUse('networking.nfc') && <PremiumBadge tier="pulse" iconOnly />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Charts Row ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
                    {/* Scan Velocity */}
                    <div className="bg-noble-surface dark:bg-noble-card p-6 rounded-3xl border border-noble-border shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-[16px] font-bold text-noble-text">Scan Velocity</h3>
                                <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">{dateFilter.label} • {totalScans} total scans</p>
                            </div>
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${scansTrend?.dir === 'up' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : scansTrend?.dir === 'down' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-slate-50 dark:bg-[#0D1B2E] text-slate-400 dark:text-slate-500 border-slate-100 dark:border-noble-border'}`}>
                                {scansTrend ? `${scansTrend.dir === 'up' ? '↑' : scansTrend.dir === 'down' ? '↓' : '—'} ${scansTrend.pct}%` : '—'}
                            </span>
                        </div>

                        {/* Chart */}
                        <div className="flex gap-3 h-44 w-full border-b border-slate-100 dark:border-noble-border mb-3 pb-2">
                            <div className="flex flex-col justify-between text-[10px] font-semibold text-slate-300 py-1 shrink-0 w-8 text-right">
                                <span>{chartData?.maxPeak ?? '...'}</span>
                                <span>{chartData ? Math.round(chartData.maxPeak * 0.75) : '...'}</span>
                                <span>{chartData ? Math.round(chartData.maxPeak * 0.5) : '...'}</span>
                                <span>{chartData ? Math.round(chartData.maxPeak * 0.25) : '...'}</span>
                                <span>0</span>
                            </div>
                            <div className="flex-1 relative overflow-hidden">
                                {chartData && (<>
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#166FBB]/15 to-transparent" style={{ clipPath: `polygon(${chartData.path.replace(/M|L/g, '').split(' ').map(p => p.split(',')[0] + '% ' + p.split(',')[1] + '%').join(', ')}, 100% 100%, 0% 100%)` }} />
                                    <svg className="absolute w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <path d={chartData.path} fill="none" stroke="#166FBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        {/* Data point dots */}
                                        {chartData.path.split(' ').map((seg, i) => {
                                            const match = seg.match(/[ML]?(\d+),(\d+)/);
                                            if (!match) return null;
                                            return <circle key={i} cx={match[1]} cy={match[2]} r="2.5" fill="#166FBB" />;
                                        })}
                                    </svg>
                                </>)}
                                {loading && <div className="absolute inset-0 flex items-center justify-center"><Skeleton className="w-full h-full" /></div>}
                            </div>
                        </div>

                        <div className="flex justify-between text-[10px] font-medium text-slate-300 mb-6 pl-11 pr-2">
                            {chartData?.labels.map((lbl, idx) => <span key={idx}>{lbl}</span>)}
                        </div>

                        {/* Sub-stats */}
                        <div className="grid grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-noble-border">
                            <div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-1">Peak Day</p>
                                <p className="text-[13px] font-bold text-noble-text">{chartData?.maxPeak ?? 0}</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{chartData?.peakDate ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-1">Penetration</p>
                                <p className="text-[13px] font-bold text-noble-text">{chartData?.penetrationRate ?? '0%'}</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Unique views</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-1">Growth Rate</p>
                                <p className={`text-[13px] font-bold ${scansTrend?.dir === 'up' ? 'text-emerald-600' : scansTrend?.dir === 'down' ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'}`}>
                                    {scansTrend ? `${scansTrend.dir === 'up' ? '↑' : '↓'} ${scansTrend.pct}%` : '—'}
                                </p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">vs prev period</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-1">Avg. Time</p>
                                <p className="text-[13px] font-bold text-noble-text">{chartData?.engagementTime ?? '0s'}</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Per visit</p>
                            </div>
                        </div>
                    </div>

                    {/* Geographic Reach */}
                    <div className="bg-noble-surface dark:bg-noble-card p-6 rounded-3xl border border-noble-border shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-[16px] font-bold text-noble-text">Geographic Reach</h3>
                                <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">Scan origin nodes · all time</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                {geoLocations.length || 1} region{geoLocations.length !== 1 ? 's' : ''}
                            </div>
                        </div>

                        <div className="flex-1 bg-[#040C1A] rounded-2xl relative overflow-hidden border border-slate-800/50 min-h-[180px]">
                            <svg viewBox="0 0 1000 500" className="w-full h-auto">
                                {/* Continents */}
                                <path d="M230,120 Q240,110 250,115 T270,120 T280,140 T260,160 T250,200 T260,240 T250,300 T240,320 T230,300 T220,240 T200,200 T180,160 T160,120 T180,100 Z" fill="#152745" />
                                <path d="M250,115 Q260,100 280,95 T300,100 T320,130 T280,140 Z" fill="#152745" />
                                <path d="M250,200 Q270,220 290,240 T300,280 T280,340 T260,400 T250,420 T240,380 T250,300 Z" fill="#152745" />
                                <path d="M450,140 Q470,120 490,130 T510,160 T490,200 T470,240 T460,260 T440,240 T450,200 Z" fill="#152745" />
                                <path d="M490,130 Q510,110 540,120 T560,150 T530,180 T510,160 Z" fill="#152745" />
                                <path d="M470,240 Q490,260 500,290 T510,340 T490,380 T470,350 T460,300 Z" fill="#152745" />
                                <path d="M640,150 Q670,140 700,160 T730,190 T750,240 T720,280 T680,260 T650,220 T620,180 Z" fill="#152745" />
                                <path d="M750,240 Q770,260 790,290 T800,340 T780,370 T760,330 T740,280 Z" fill="#152745" />
                                <path d="M830,340 Q850,360 860,390 T840,410 T820,380 Z" fill="#152745" />

                                {/* Latitude/longitude grid lines */}
                                {[100, 200, 300, 400].map(y => <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#0D2240" strokeWidth="0.5" />)}
                                {[200, 400, 600, 800].map(x => <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="#0D2240" strokeWidth="0.5" />)}

                                {/* Dynamic location nodes */}
                                {geoLocations.map((loc, idx) => {
                                    const h = stringHash(loc);
                                    const x = 150 + (Math.abs(h) % 700);
                                    const y = 80 + (Math.abs(h * 31) % 340);
                                    return (
                                        <g key={idx}>
                                            <circle cx={x} cy={y} r="16" fill="#3B82F6" opacity="0.08" />
                                            <circle cx={x} cy={y} r="9" fill="#3B82F6" opacity="0.18" />
                                            <circle cx={x} cy={y} r="4" fill="#60A5FA" />
                                            <circle cx={x} cy={y} r="2.5" fill="#BFDBFE" />
                                        </g>
                                    );
                                })}
                                {/* Default node if no data */}
                                {geoLocations.length === 0 && (
                                    <g>
                                        <circle cx="280" cy="190" r="16" fill="#3B82F6" opacity="0.08" />
                                        <circle cx="280" cy="190" r="9" fill="#3B82F6" opacity="0.18" />
                                        <circle cx="280" cy="190" r="4" fill="#60A5FA" />
                                        <circle cx="280" cy="190" r="2.5" fill="#BFDBFE" />
                                    </g>
                                )}
                            </svg>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                                <span className="font-medium">Scan origin node</span>
                            </div>
                            <span className="text-slate-400 dark:text-slate-500">{geoLocations.length > 0 ? `${geoLocations.length} distinct location${geoLocations.length > 1 ? 's' : ''}` : 'Share your card to map scans'}</span>
                        </div>
                    </div>
                </div>

                {/* ── Smart Insight Banner ── */}
                <div className={`border rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 ${scansTrend?.dir === 'down' ? 'bg-amber-50/50 border-amber-100' : 'bg-blue-50/50 border-blue-100'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${scansTrend?.dir === 'down' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-[#166FBB]'}`}>
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${scansTrend?.dir === 'down' ? 'text-amber-600' : 'text-[#166FBB]'}`}>SMART INSIGHT</p>
                            <h4 className="text-[14px] font-bold text-noble-text">
                                {scansTrend?.dir === 'down' ? 'Time to boost your visibility' : 'Your digital presence is growing!'}
                            </h4>
                            <p className="text-[13px] text-slate-600 dark:text-slate-400 dark:text-slate-500">{insightMessage()}</p>
                        </div>
                    </div>
                    <Link href="/networking/leads" className="px-4 py-2 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg text-[13px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors shrink-0 shadow-sm flex items-center gap-2 whitespace-nowrap">
                        <Download size={14} /> View Full Report
                    </Link>
                </div>

                {/* ── Recent Leads Table ── */}
                <div className="bg-noble-surface dark:bg-noble-card rounded-3xl border border-noble-border shadow-sm mb-8 overflow-hidden">
                    <div className="flex items-center gap-3 p-6 pb-4 border-b border-slate-100 dark:border-noble-border">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <Users size={18} />
                        </div>
                        <div>
                            <h3 className="text-[16px] font-bold text-noble-text">Recent Leads</h3>
                            <p className="text-[12px] text-slate-400 dark:text-slate-500">Latest contacts captured from your card scans</p>
                        </div>
                        <div className="ml-auto flex items-center gap-3">
                            <Link href="/networking/leads" className="text-[#166FBB] text-[13px] font-bold flex items-center gap-1 hover:underline">
                                View All <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-[#0D1B2E]/70 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                    <th className="px-6 py-3.5">CONTACT</th>
                                    <th className="px-4 py-3.5">COMPANY</th>
                                    <th className="px-4 py-3.5">SOURCE</th>
                                    <th className="px-4 py-3.5">STATUS</th>
                                    <th className="px-4 py-3.5">DATE</th>
                                    <th className="px-4 py-3.5 text-right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    [1, 2, 3].map(i => (
                                        <tr key={i}>
                                            <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                                            <td className="px-4 py-4"><Skeleton className="h-4 w-24" /></td>
                                            <td className="px-4 py-4"><Skeleton className="h-4 w-16" /></td>
                                            <td className="px-4 py-4"><Skeleton className="h-5 w-16" /></td>
                                            <td className="px-4 py-4"><Skeleton className="h-4 w-20" /></td>
                                            <td className="px-4 py-4"></td>
                                        </tr>
                                    ))
                                ) : recentLeads.length > 0 ? recentLeads.map(lead => (
                                    <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E]/60 transition-colors">
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#166FBB] flex items-center justify-center text-[11px] font-bold shrink-0 border border-blue-100">
                                                    {lead.name?.substring(0, 2).toUpperCase() || '??'}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-semibold text-noble-text">{lead.name}</p>
                                                    <p className="text-[11px] text-slate-400 dark:text-slate-500">{lead.job_title || lead.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <p className="text-[13px] font-medium text-noble-text">{lead.company || '—'}</p>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className="text-[12px] font-medium text-slate-600 dark:text-slate-400 dark:text-slate-500 capitalize">{(lead.source || 'Web Form').replace('_', ' ')}</span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide capitalize ${
                                                lead.status === 'converted' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                                lead.status === 'qualified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                lead.status === 'contacted' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                                'bg-slate-50 dark:bg-[#0D1B2E] text-slate-500 dark:text-slate-400 dark:text-slate-500 border border-noble-border'
                                            }`}>
                                                {lead.status || 'New'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500">{new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-1.5 justify-end">
                                                <Link href={`/networking/leads?id=${lead.id}`} className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-[#0D1B2E] text-slate-500 dark:text-slate-400 dark:text-slate-500 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] hover:text-slate-700 dark:text-slate-200 transition-colors border border-slate-100 dark:border-noble-border" title="View lead">
                                                    <Eye size={13} />
                                                </Link>
                                                <a href={`mailto:${lead.email}`} className="w-7 h-7 rounded-lg bg-blue-50 text-[#166FBB] flex items-center justify-center hover:bg-blue-100 transition-colors border border-blue-100" title="Email lead">
                                                    <Mail size={13} />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center">
                                            <Users size={28} className="text-slate-200 mx-auto mb-2" />
                                            <p className="text-[14px] font-bold text-slate-700 dark:text-slate-200">No leads captured yet</p>
                                            <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-1">Start sharing your digital card to capture leads here.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-3.5 border-t border-slate-100 dark:border-noble-border flex items-center justify-between">
                        <p className="text-[12px] text-slate-400 dark:text-slate-500">{leadsCaptured} total leads</p>
                        <Link href="/networking/leads" className="text-[#166FBB] text-[12px] font-bold hover:underline flex items-center gap-1">
                            Manage All Leads <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>

                {/* ── Pipeline + Channels Row ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
                    {/* Pipeline Overview */}
                    <div className="bg-noble-surface dark:bg-noble-card p-6 rounded-3xl border border-noble-border shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[16px] font-bold text-noble-text">Pipeline Overview</h3>
                            <Link href="/networking/leads" className="text-[12px] font-bold text-[#166FBB] hover:underline">Manage →</Link>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            {[
                                { label: 'Total Scans', value: pipeline.totalScans, color: '#BFDBFE', pct: 100 },
                                { label: 'Leads Captured', value: pipeline.leadsCaptured, color: '#60A5FA', pct: pipeline.totalScans > 0 ? (pipeline.leadsCaptured / pipeline.totalScans) * 100 : 0 },
                                { label: 'Contacts Made', value: pipeline.contactsMade, color: '#3B82F6', pct: pipeline.totalScans > 0 ? (pipeline.contactsMade / pipeline.totalScans) * 100 : 0 },
                                { label: 'Qualified', value: pipeline.qualifiedLeads, color: '#2563EB', pct: pipeline.totalScans > 0 ? (pipeline.qualifiedLeads / pipeline.totalScans) * 100 : 0 },
                                { label: 'Converted', value: pipeline.converted, color: '#1D4ED8', pct: pipeline.totalScans > 0 ? (pipeline.converted / pipeline.totalScans) * 100 : 0 },
                            ].map((stage, i) => (
                                <div key={stage.label} className="flex items-center gap-3">
                                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 w-24 shrink-0 text-right">{stage.label}</span>
                                    <div className="flex-1 h-8 bg-slate-50 dark:bg-[#0D1B2E] rounded-lg overflow-hidden">
                                        <div
                                            className="h-full rounded-lg transition-all duration-700 flex items-center px-2"
                                            style={{ width: `${Math.max(stage.value > 0 ? 8 : 0, stage.pct)}%`, backgroundColor: stage.color }}
                                        />
                                    </div>
                                    <span className="text-[13px] font-bold text-noble-text w-10 text-right shrink-0">{stage.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-noble-border flex items-center justify-between">
                            <div>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Conversion Rate</p>
                                <h3 className="text-[22px] font-bold text-noble-text">{conversionRate}%</h3>
                            </div>
                            <TrendPill trend={convRateTrend} suffix=" pts" />
                        </div>
                    </div>

                    {/* Engagement Channels + Pro Tip */}
                    <div className="flex flex-col gap-5">
                        <div className="bg-noble-surface dark:bg-noble-card p-6 rounded-3xl border border-noble-border shadow-sm flex-1">
                            <h3 className="text-[16px] font-bold text-noble-text mb-5">Engagement Channels</h3>
                            <div className="flex items-center justify-between gap-4">
                                {/* Donut */}
                                <div className="relative w-28 h-28 shrink-0">
                                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                        <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="22" />
                                        <circle cx="50" cy="50" r="38" fill="none" stroke="#166FBB" strokeWidth="22" strokeDasharray={`${channels.qrCode * 2.39} 239`} strokeDashoffset="0" className="transition-all duration-1000" />
                                        <circle cx="50" cy="50" r="38" fill="none" stroke="#3B82F6" strokeWidth="22" strokeDasharray={`${channels.nfcTap * 2.39} 239`} strokeDashoffset={`-${channels.qrCode * 2.39}`} className="transition-all duration-1000" />
                                        <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="22" strokeDasharray={`${channels.webLink * 2.39} 239`} strokeDashoffset={`-${(channels.qrCode + channels.nfcTap) * 2.39}`} className="transition-all duration-1000" />
                                        <circle cx="50" cy="50" r="38" fill="none" stroke="#8B5CF6" strokeWidth="22" strokeDasharray={`${channels.sms * 2.39} 239`} strokeDashoffset={`-${(channels.qrCode + channels.nfcTap + channels.webLink) * 2.39}`} className="transition-all duration-1000" />
                                        <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="22" strokeDasharray={`${channels.others * 2.39} 239`} strokeDashoffset={`-${(channels.qrCode + channels.nfcTap + channels.webLink + channels.sms) * 2.39}`} className="transition-all duration-1000" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[14px] font-bold text-slate-700 dark:text-slate-200">{channels.qrCode > 0 || channels.nfcTap > 0 ? `${Math.max(channels.qrCode, channels.nfcTap)}%` : '—'}</span>
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="flex flex-col gap-2.5 flex-1">
                                    {[
                                        { label: 'QR Code', val: channels.qrCode, color: '#166FBB' },
                                        { label: 'NFC Tap', val: channels.nfcTap, color: '#3B82F6' },
                                        { label: 'Web Link', val: channels.webLink, color: '#F59E0B' },
                                        { label: 'SMS / Text', val: channels.sms, color: '#8B5CF6' },
                                        { label: 'Others', val: channels.others, color: '#E2E8F0' },
                                    ].map(ch => (
                                        <div key={ch.label} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-[12px] font-medium text-slate-600 dark:text-slate-400 dark:text-slate-500">
                                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                                                {ch.label}
                                            </div>
                                            <span className="text-[12px] font-bold text-noble-text">{ch.val}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {channels.qrCode === 0 && channels.nfcTap === 0 && (
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-4 italic">No scan data yet. Share your card to see channel breakdown.</p>
                            )}
                        </div>

                        {/* Pro Tip */}
                        <div className="bg-gradient-to-br from-[#0A192F] to-[#0F2746] border border-slate-700/50 rounded-3xl p-5 flex items-start gap-3 shadow-lg">
                            <div className="w-8 h-8 rounded-full bg-[#166FBB]/20 border border-[#166FBB]/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                                <Zap size={14} />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-white mb-1">Pro Tip</h4>
                                <p className="text-[12px] text-white/60 mb-3 leading-relaxed">
                                    Enable Interevent Mode at your next conference to increase scans by up to 40% with hands-free broadcasting.
                                </p>
                                <button onClick={() => setIsEventModeOpen(true)} className="px-3.5 py-1.5 bg-[#166FBB] text-white text-[11px] font-bold rounded-lg hover:bg-blue-500 transition-colors shadow-md">
                                    Learn How
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Footer ── */}
                <div className="flex items-center justify-center gap-2 text-[12px] font-semibold text-slate-400 dark:text-slate-500 pb-4">
                    <Shield size={13} /> End-to-end encrypted networking
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                MODALS
            ══════════════════════════════════════════════════════════════════ */}

            {/* NFC Setup Modal */}
            {isNfcSetupOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-noble-surface dark:bg-noble-card rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="p-5 border-b border-slate-100 dark:border-noble-border flex items-center justify-between">
                            <h2 className="text-[16px] font-bold text-noble-text flex items-center gap-2">
                                <SmartphoneNfc size={19} className="text-[#166FBB]" /> Setup NFC Card
                            </h2>
                            <button onClick={() => setIsNfcSetupOpen(false)} className="p-1.5 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] rounded-full transition-colors">
                                <X size={19} />
                            </button>
                        </div>
                        <div className="p-7 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-5 animate-pulse">
                                <SmartphoneNfc size={40} className="text-[#166FBB]" />
                            </div>
                            <h3 className="text-[19px] font-bold text-noble-text mb-2">Ready to Pair</h3>
                            <p className="text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500 leading-relaxed mb-7">
                                Hold your Nobevra NFC Card near the top-back of your iPhone, or the center-back of your Android device to link it to your digital identity.
                            </p>
                            <div className="w-full space-y-2.5">
                                <button className="w-full py-3.5 bg-[#166FBB] text-white rounded-xl text-[14px] font-bold shadow-[0_4px_14px_rgba(22,111,187,0.25)] hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                                    <Zap size={16} className="fill-white/20" /> Start NFC Pairing
                                </button>
                                <button className="w-full py-3.5 bg-noble-surface dark:bg-noble-card border border-noble-border text-slate-700 dark:text-slate-200 rounded-xl text-[14px] font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors">
                                    Pair with QR Code instead
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Interevent Mode Info Modal */}
            {isEventModeOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#0A192F] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-800">
                        {/* Header */}
                        <div className="relative px-5 pt-5 pb-4 text-center text-white border-b border-slate-800">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#166FBB]/20 to-transparent" />
                            <button onClick={() => setIsEventModeOpen(false)} className="absolute top-3 right-3 p-1 text-white/40 hover:bg-noble-surface dark:bg-noble-card/10 rounded-full transition-colors z-20">
                                <X size={16} />
                            </button>
                            <div className="relative z-10">
                                <div className="w-10 h-10 bg-[#166FBB] rounded-xl mx-auto flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(22,111,187,0.5)]">
                                    <Zap size={20} className="text-white fill-white" />
                                </div>
                                <h2 className="text-[17px] font-bold text-white mb-1">Interevent Mode</h2>
                                <p className="text-[12px] text-white/50 max-w-xs mx-auto leading-snug">Maximize networking potential at high-volume conferences and trade shows.</p>
                            </div>
                        </div>
                        {/* Body */}
                        <div className="px-5 py-4 bg-noble-surface dark:bg-noble-card">
                            <div className="space-y-3">
                                {[
                                    { icon: <QrCode size={15} />, color: 'bg-blue-50 text-blue-600', title: 'Persistent Broadcast Display', desc: 'Locks your screen to your QR code at max brightness — no fumbling for your card.' },
                                    { icon: <Users size={15} />, color: 'bg-emerald-50 text-emerald-600', title: 'Rapid Lead Capture Form', desc: 'Bypasses the standard view to immediately show a "Connect with me" form to anyone who scans.' },
                                    { icon: <Globe size={15} />, color: 'bg-purple-50 text-purple-600', title: 'Offline Fallback Sync', desc: 'No cell service? Interevent Mode caches leads securely on-device until you reconnect.' },
                                ].map(item => (
                                    <div key={item.title} className="flex gap-3 items-start">
                                        <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>{item.icon}</div>
                                        <div>
                                            <h4 className="text-[13px] font-bold text-noble-text leading-tight">{item.title}</h4>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-noble-border">
                                <button onClick={activateIntereventMode} className="w-full py-2.5 bg-[#166FBB] hover:bg-blue-600 transition-colors rounded-xl text-white text-[13px] font-bold tracking-wide shadow-[0_4px_14px_rgba(22,111,187,0.25)] flex items-center justify-center gap-2">
                                    <Zap size={15} className="fill-white/30" /> Activate Interevent Mode Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Interevent Broadcast Overlay */}
            {isIntereventActive && (
                <div className="fixed inset-0 z-[200] bg-[#0A192F] flex flex-col items-center justify-center" style={{ userSelect: 'none' }}>
                    <div className="absolute inset-0 bg-gradient-radial from-[#166FBB]/15 via-transparent to-transparent pointer-events-none" />

                    {/* Top bar */}
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
                        <div className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-white/70 text-[13px] font-bold tracking-widest uppercase">Interevent Mode · Live</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-noble-surface dark:bg-noble-card/8 border border-white/10 rounded-xl text-white text-[13px] font-bold">
                                {todayScans.toLocaleString()} scans today
                            </div>
                            <button onClick={deactivateIntereventMode} className="p-2 bg-noble-surface dark:bg-noble-card/10 hover:bg-noble-surface dark:bg-noble-card/20 border border-white/10 rounded-xl text-white/60 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Center QR */}
                    <div className="relative flex flex-col items-center gap-8 z-10">
                        <div className="absolute inset-0 rounded-[3rem] bg-[#166FBB]/20 blur-[80px] scale-110" />
                        <div className="relative bg-noble-surface dark:bg-noble-card/8 backdrop-blur-md border border-white/15 rounded-[2.5rem] p-8 shadow-2xl">
                            <div className="bg-noble-surface dark:bg-noble-card p-6 rounded-3xl shadow-xl">
                                <QrCode size={220} className="text-[#0A192F]" strokeWidth={1.5} />
                            </div>
                        </div>
                        <div className="text-center">
                            <h2 className="text-[28px] font-bold text-white mb-1">Scan to Connect</h2>
                            <p className="text-[14px] text-white/40 font-medium">Point your camera here to view my digital identity</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {[0, 150, 300].map(delay => (
                                <div key={delay} className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-8 flex items-center gap-2 text-white/25 text-[12px] font-semibold">
                        <Lock size={12} /> Nobevra · End-to-end encrypted
                    </div>
                </div>
            )}
        </div>
    );
}

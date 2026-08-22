'use client';

import React, { useEffect, useState } from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    badgeText: string;
    badgeType: 'positive' | 'warning' | 'neutral';
    iconBgColor: string;
    iconColor: string;
    loading?: boolean;
    variant?: 'default' | 'hero';
    trend?: number;
    sparklineData?: number[];
}

// Animated number reveal on mount
function AnimatedValue({ value, loading }: { value: string; loading: boolean }) {
    const [displayed, setDisplayed] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setDisplayed(true), 100);
        return () => clearTimeout(t);
    }, []);

    if (loading) {
        return <div className="h-7 w-24 rounded-lg animate-pulse bg-slate-200" />;
    }

    return (
        <p className={`text-[20px] font-semibold tracking-[-0.02em] leading-none text-noble-text transition-all duration-700 ${
            displayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
            {value}
        </p>
    );
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    badgeText,
    badgeType,
    iconBgColor,
    iconColor,
    loading = false,
    variant = 'default',
    trend,
    sparklineData,
}: StatCardProps) {
    const isHero = variant === 'hero';

    const getBadgeStyle = () => {
        if (isHero) return 'bg-noble-surface/20 text-white border-white/20';
        switch (badgeType) {
            case 'positive': return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20';
            case 'warning':  return 'bg-orange-50 dark:bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-100 dark:border-orange-500/20';
            case 'neutral':  return 'bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-300 border-noble-card-border';
            default:         return 'bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-300 border-noble-card-border';
        }
    };

    const hasTrend = trend !== undefined && trend !== null;
    const trendUp = hasTrend && trend! >= 0;
    const trendColor = isHero
        ? (trendUp ? 'text-emerald-300' : 'text-red-300')
        : (trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400');
    const trendBg = isHero
        ? (trendUp ? 'bg-emerald-400/20' : 'bg-red-400/20')
        : (trendUp ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-red-50 dark:bg-red-500/10');

    const sparkData = sparklineData?.map(v => ({ v })) || [];

    if (isHero) {
        return (
            <div className="bg-gradient-to-br from-[#006970] via-[#01A0E2] to-[#00b4cc] shadow-[0_12px_40px_rgba(1,160,226,0.22)] border border-white/15 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden hover:shadow-[0_20px_60px_rgba(1,160,226,0.32)] transition-all duration-300 group">
                {/* Background mesh pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                }} />
                {/* Sparkline in background */}
                {sparkData.length > 0 && (
                    <div className="absolute bottom-0 right-0 w-24 h-12 opacity-25">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={sparkData}>
                                <Line type="monotone" dataKey="v" stroke="#ffffff" strokeWidth={1.5} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-8 h-8 rounded-xl bg-noble-surface/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                            <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider ${getBadgeStyle()}`}>
                            {badgeText}
                        </div>
                    </div>

                    <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-1.5">{title}</p>

                    {loading ? (
                        <div className="h-7 w-28 rounded-lg animate-pulse bg-noble-surface/10" />
                    ) : (
                        <p className="text-[22px] font-semibold tracking-[-0.02em] leading-none text-white transition-all duration-700">{value}</p>
                    )}

                    {hasTrend && !loading && (
                        <div className={`inline-flex items-center gap-1 mt-2.5 px-2 py-0.5 rounded-full ${trendBg}`}>
                            {trendUp
                                ? <TrendingUp className={`w-2.5 h-2.5 ${trendColor}`} />
                                : <TrendingDown className={`w-2.5 h-2.5 ${trendColor}`} />
                            }
                            <span className={`text-[9px] font-bold ${trendColor}`}>
                                {trendUp ? '+' : ''}{trend!.toFixed(1)}% vs last month
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default variant
    return (
        <div className="bg-noble-card border border-noble-card-border rounded-2xl p-4 shadow-[0_2px_12px_rgba(15,23,42,0.05)] dark:shadow-none flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:hover:shadow-none hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
            {/* Sparkline background */}
            {sparkData.length > 0 && (
                <div className="absolute bottom-0 right-0 w-20 h-10 opacity-15">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparkData}>
                            <Line type="monotone" dataKey="v" stroke="#01A0E2" strokeWidth={1.5} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${iconBgColor} dark:bg-noble-icon-bg`}>
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                    </div>
                    <div className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider ${getBadgeStyle()}`}>
                        {badgeText}
                    </div>
                </div>

                <p className="text-[9px] font-black uppercase tracking-widest text-noble-muted mb-1.5">{title}</p>

                <AnimatedValue value={value} loading={loading} />

                {hasTrend && !loading && (
                    <div className={`inline-flex items-center gap-1 mt-2.5 px-2 py-0.5 rounded-full ${trendBg}`}>
                        {trendUp
                            ? <TrendingUp className={`w-2.5 h-2.5 ${trendColor}`} />
                            : <TrendingDown className={`w-2.5 h-2.5 ${trendColor}`} />
                        }
                        <span className={`text-[9px] font-bold ${trendColor}`}>
                            {trendUp ? '+' : ''}{trend!.toFixed(1)}%
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

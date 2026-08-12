import React from 'react';

interface AdminCardProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    headerAction?: React.ReactNode;
}

export function AdminCard({ title, description, children, footer, className = '', headerAction }: AdminCardProps) {
    return (
        <div className={`bg-noble-surface dark:bg-noble-card border border-noble-border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
            {(title || description || headerAction) && (
                <div className="px-7 py-5 border-b border-slate-100 dark:border-noble-border flex items-start justify-between">
                    <div>
                        {title && <h3 className="text-lg font-bold text-noble-text tracking-tight">{title}</h3>}
                        {description && <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500">{description}</p>}
                    </div>
                    {headerAction && (
                        <div className="ml-4 flex-shrink-0">
                            {headerAction}
                        </div>
                    )}
                </div>
            )}
            
            <div className="px-7 py-6">
                {children}
            </div>

            {footer && (
                <div className="px-7 py-4 bg-slate-50 dark:bg-[#0D1B2E]/50 border-t border-slate-100 dark:border-noble-border rounded-b-2xl flex items-center justify-end">
                    {footer}
                </div>
            )}
        </div>
    );
}

export function AdminMetricCard({ title, value, trend, trendLabel, icon: Icon }: {
    title: string;
    value: string | number;
    trend?: number; // e.g., 12.5 for +12.5%
    trendLabel?: string; // e.g., "vs last month"
    icon?: any;
}) {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;

    return (
        <div className="bg-noble-surface dark:bg-noble-card border border-noble-border rounded-2xl shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow duration-300 group">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">{title}</span>
                {Icon && (
                    <div className="p-2.5 bg-[#f0fafa] rounded-xl group-hover:bg-[#e0f5f5] group-hover:scale-110 transition-all duration-300 border border-[#d0eded]">
                        <Icon className="w-4 h-4 text-[#006970]" />
                    </div>
                )}
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-noble-text tracking-tight">{value}</span>
            </div>
            {(trend !== undefined || trendLabel) && (
                <div className="mt-4 flex items-center gap-2">
                    {trend !== undefined && (
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold tracking-widest px-2 py-0.5 rounded-full border ${isPositive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : isNegative ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-50 dark:bg-[#0D1B2E] text-slate-700 dark:text-slate-200 border-noble-border'}`}>
                            {isPositive ? '↑' : isNegative ? '↓' : ''} {Math.abs(trend)}%
                        </span>
                    )}
                    {trendLabel && <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">{trendLabel}</span>}
                </div>
            )}
        </div>
    );
}

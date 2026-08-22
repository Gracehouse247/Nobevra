import React from 'react';

export function MiniBarChart({ values, color, barCount = 10 }: { values: number[]; color: string; barCount?: number }) {
    const padded = Array.from({ length: barCount }, (_, i) => values[i] ?? 0);
    const max = Math.max(...padded, 1);

    return (
        <div className="flex items-end gap-[3px]" style={{ height: 40 }}>
            {padded.map((v, i) => {
                const pct = Math.max(8, (v / max) * 100);
                const isLast = i === padded.length - 1;
                return (
                    <div
                        key={i}
                        style={{
                            width: 5,
                            height: `${pct}%`,
                            backgroundColor: color,
                            borderRadius: 3,
                            opacity: isLast ? 1 : 0.35 + (i / barCount) * 0.55,
                        }}
                    />
                );
            })}
        </div>
    );
}

export function SkeletonRow() {
    return (
        <tr className="border-b border-noble-border">
            <td className="px-4 py-3.5"><div className="w-4 h-4 rounded bg-noble-icon-bg animate-pulse" /></td>
            <td className="px-4 py-3.5"><div className="h-3.5 w-24 rounded bg-noble-icon-bg animate-pulse" /></td>
            <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-noble-icon-bg animate-pulse shrink-0" />
                    <div className="space-y-1.5">
                        <div className="h-3 w-28 rounded bg-noble-icon-bg animate-pulse" />
                        <div className="h-2.5 w-20 rounded bg-noble-icon-bg animate-pulse" />
                    </div>
                </div>
            </td>
            <td className="px-4 py-3.5"><div className="h-3 w-16 rounded bg-noble-icon-bg animate-pulse" /></td>
            <td className="px-4 py-3.5"><div className="h-3 w-16 rounded bg-noble-icon-bg animate-pulse ml-auto" /></td>
            <td className="px-4 py-3.5"><div className="h-3 w-14 rounded bg-noble-icon-bg animate-pulse ml-auto" /></td>
            <td className="px-4 py-3.5"><div className="h-5 w-16 rounded-full bg-noble-icon-bg animate-pulse" /></td>
            <td className="px-4 py-3.5"><div className="h-3 w-16 rounded bg-noble-icon-bg animate-pulse ml-auto" /></td>
            <td className="px-4 py-3.5">
                <div className="flex gap-1.5 justify-end">
                    <div className="w-6 h-6 rounded-md bg-noble-icon-bg animate-pulse" />
                    <div className="w-6 h-6 rounded-md bg-noble-icon-bg animate-pulse" />
                    <div className="w-6 h-6 rounded-md bg-noble-icon-bg animate-pulse" />
                </div>
            </td>
        </tr>
    );
}

const AVATAR_PALETTE = [
    { bg: '#1D4ED820', text: '#60A5FA' },
    { bg: '#6D28D920', text: '#A78BFA' },
    { bg: '#06572020', text: '#34D399' },
    { bg: '#92400E20', text: '#FCD34D' },
    { bg: '#9F123920', text: '#FCA5A5' },
    { bg: '#0E749020', text: '#22D3EE' },
    { bg: '#9A341220', text: '#FDBA74' },
    { bg: '#0F766E20', text: '#2DD4BF' },
];

export function ClientAvatar({ name }: { name: string }) {
    const safeName = name?.trim() || 'U';
    const initials = safeName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    const charCode = safeName.charCodeAt(0) || 0;
    const p = AVATAR_PALETTE[charCode % AVATAR_PALETTE.length] || AVATAR_PALETTE[0];
    return (
        <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
            style={{ backgroundColor: p.bg, color: p.text, border: `1px solid ${p.text}30` }}
        >
            {initials}
        </div>
    );
}

type StatusKey = 'paid' | 'overdue' | 'pending' | 'sent' | 'unpaid' | 'draft';
const STATUS_CFG: Record<StatusKey, { cls: string; label: string }> = {
    paid:    { cls: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/25', label: 'Paid' },
    overdue: { cls: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/25', label: 'Overdue' },
    pending: { cls: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/25', label: 'Pending' },
    sent:    { cls: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/25', label: 'Sent' },
    unpaid:  { cls: 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/25', label: 'Unpaid' },
    draft:   { cls: 'bg-noble-table-header-bg text-noble-muted border-noble-card-border', label: 'Draft' },
};

export function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_CFG[status?.toLowerCase() as StatusKey] ?? STATUS_CFG.draft;
    return (
        <span
            className={`inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-semibold whitespace-nowrap border ${cfg.cls}`}
        >
            {cfg.label}
        </span>
    );
}

export function ActionBtn({ color, hoverColor, children, onClick, title, href, target }: {
    color: string; hoverColor: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void; title?: string; href?: string; target?: string;
}) {
    const Component = href ? 'a' : 'button';
    return (
        <Component
            href={href as any}
            target={target}
            rel={href && target === '_blank' ? 'noreferrer' : undefined}
            onClick={onClick}
            title={title}
            aria-label={title}
            className="relative w-[26px] h-[26px] rounded-md flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-sm sm:min-h-0 sm:min-w-0 min-h-[44px] min-w-[44px] sm:!min-h-0 sm:!min-w-0"
            style={{ backgroundColor: color }}
            onMouseEnter={(e: any) => (e.currentTarget.style.backgroundColor = hoverColor)}
            onMouseLeave={(e: any) => (e.currentTarget.style.backgroundColor = color)}
        >
            {children}
        </Component>
    );
}

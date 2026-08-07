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
        <tr className="border-b border-slate-50">
            <td className="px-4 py-3.5"><div className="w-4 h-4 rounded bg-slate-100 animate-pulse" /></td>
            <td className="px-4 py-3.5"><div className="h-3.5 w-24 rounded bg-slate-100 animate-pulse" /></td>
            <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse shrink-0" />
                    <div className="space-y-1.5">
                        <div className="h-3 w-28 rounded bg-slate-100 animate-pulse" />
                        <div className="h-2.5 w-20 rounded bg-slate-100 animate-pulse" />
                    </div>
                </div>
            </td>
            <td className="px-4 py-3.5"><div className="h-3 w-16 rounded bg-slate-100 animate-pulse" /></td>
            <td className="px-4 py-3.5"><div className="h-3 w-16 rounded bg-slate-100 animate-pulse ml-auto" /></td>
            <td className="px-4 py-3.5"><div className="h-3 w-14 rounded bg-slate-100 animate-pulse ml-auto" /></td>
            <td className="px-4 py-3.5"><div className="h-5 w-16 rounded-full bg-slate-100 animate-pulse" /></td>
            <td className="px-4 py-3.5"><div className="h-3 w-16 rounded bg-slate-100 animate-pulse ml-auto" /></td>
            <td className="px-4 py-3.5">
                <div className="flex gap-1.5 justify-end">
                    <div className="w-6 h-6 rounded-md bg-slate-100 animate-pulse" />
                    <div className="w-6 h-6 rounded-md bg-slate-100 animate-pulse" />
                    <div className="w-6 h-6 rounded-md bg-slate-100 animate-pulse" />
                </div>
            </td>
        </tr>
    );
}

const AVATAR_PALETTE = [
    { bg: '#EFF6FF', text: '#1D4ED8' },
    { bg: '#F5F3FF', text: '#6D28D9' },
    { bg: '#ECFDF5', text: '#065F46' },
    { bg: '#FFFBEB', text: '#92400E' },
    { bg: '#FFF1F2', text: '#9F1239' },
    { bg: '#ECFEFF', text: '#0E7490' },
    { bg: '#FFF7ED', text: '#9A3412' },
    { bg: '#F0FDFA', text: '#0F766E' },
];

export function ClientAvatar({ name }: { name: string }) {
    const initials = (name || 'U').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    const p = AVATAR_PALETTE[(name.charCodeAt(0) || 0) % AVATAR_PALETTE.length];
    return (
        <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
            style={{ backgroundColor: p.bg, color: p.text }}
        >
            {initials}
        </div>
    );
}

type StatusKey = 'paid' | 'overdue' | 'pending' | 'sent' | 'unpaid' | 'draft';
const STATUS_CFG: Record<StatusKey, { bg: string; text: string; border: string; label: string }> = {
    paid:    { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0', label: 'Paid' },
    overdue: { bg: '#FFF1F2', text: '#9F1239', border: '#FECDD3', label: 'Overdue' },
    pending: { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A', label: 'Pending' },
    sent:    { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE', label: 'Sent' },
    unpaid:  { bg: '#FFF7ED', text: '#9A3412', border: '#FED7AA', label: 'Unpaid' },
    draft:   { bg: '#F8FAFC', text: '#475569', border: '#E2E8F0', label: 'Draft' },
};

export function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_CFG[status?.toLowerCase() as StatusKey] ?? STATUS_CFG.draft;
    return (
        <span
            className="inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-semibold whitespace-nowrap border"
            style={{ backgroundColor: cfg.bg, color: cfg.text, borderColor: cfg.border }}
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
            className="w-[26px] h-[26px] rounded-md flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
            style={{ backgroundColor: color }}
            onMouseEnter={(e: any) => (e.currentTarget.style.backgroundColor = hoverColor)}
            onMouseLeave={(e: any) => (e.currentTarget.style.backgroundColor = color)}
        >
            {children}
        </Component>
    );
}

import React from 'react';
import PremiumBadge from './../shared/PremiumBadge';

interface ToggleRowProps {
    label: string;
    description: string;
    icon: React.ReactNode;
    iconBg: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    premium?: 'pulse' | 'elite';
}

export const ToggleRow = ({ label, description, icon, iconBg, checked = false, onChange, premium }: ToggleRowProps) => {
    return (
        <div
            role="switch"
            aria-checked={checked}
            tabIndex={0}
            className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E]/70 cursor-pointer transition-colors"
            onClick={() => onChange?.(!checked)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onChange?.(!checked);
                }
            }}
        >
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>{icon}</div>
                <div>
                    <div className="flex items-center gap-1.5">
                        <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 font-[Inter,sans-serif]">{label}</p>
                        {premium && <PremiumBadge tier={premium} iconOnly />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5 font-[Inter,sans-serif]">{description}</p>
                </div>
            </div>
            <div className={`relative w-10 h-5 rounded-full transition-all duration-200 ${checked ? 'bg-[#01A0E2]' : 'bg-slate-200'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-noble-surface dark:bg-noble-card rounded-full shadow-sm transition-all duration-200 ${checked ? 'left-5' : 'left-0.5'}`} />
            </div>
        </div>
    );
};

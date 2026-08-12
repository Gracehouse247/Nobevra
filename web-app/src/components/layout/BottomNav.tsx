'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MENU_GROUPS } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import { Lock, Crown } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const { userData } = useAuth();
    const { openUpgradeModal } = useUpgradeModal();

    const hasPlanAccess = (requiredPlan?: 'pulse' | 'elite') => {
        if (!requiredPlan) return true;
        const plan = userData?.plan || 'explorer';
        if (plan === 'admin' || plan === 'elite') return true;
        if (requiredPlan === 'pulse' && plan === 'pulse' && userData?.subscriptionStatus === 'active') return true;
        return false;
    };

    const handleItemClick = (e: React.MouseEvent, item: any) => {
        if (item.requiredPlan && !hasPlanAccess(item.requiredPlan)) {
            e.preventDefault();
            openUpgradeModal({ featureName: item.name, requiredPlan: item.requiredPlan });
        } else {
            router.push(item.href);
        }
    };

    const navItems = MENU_GROUPS[0].items.concat(MENU_GROUPS[1].items).slice(0, 5);

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[68px] bg-noble-surface dark:bg-noble-card/90 backdrop-blur-2xl border-t border-noble-border/70 flex items-center justify-around px-2 z-50 shadow-[0_-4px_24px_rgba(15,23,42,0.06)]">
            {navItems.map(item => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const locked = (item as any).requiredPlan && !hasPlanAccess((item as any).requiredPlan);
                return (
                    <button
                        key={item.name}
                        onClick={(e) => handleItemClick(e, item)}
                        className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 ${
                            isActive
                                ? 'text-[#0599D5]'
                                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:text-slate-500'
                        }`}
                    >
                        {/* Active indicator dot above icon */}
                        {isActive && (
                            <span className="absolute top-1.5 w-1 h-1 rounded-full bg-[#0599D5]" />
                        )}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                            isActive ? 'bg-[#0599D5]/10' : 'bg-transparent'
                        }`}>
                            <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
                        </div>
                        <span className={`text-[8px] uppercase tracking-widest mt-0.5 font-black truncate max-w-[44px] text-center ${
                            isActive ? 'text-[#0599D5]' : 'text-slate-400 dark:text-slate-500'
                        }`}>{item.name.split(' ')[0]}</span>
                        {locked && (
                            <div className={`absolute top-1 right-1.5 flex items-center justify-center w-3.5 h-3.5 rounded-full shadow-sm ${
                                (item as any).requiredPlan === 'elite' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-[#0599D5]'
                            }`}>
                                {(item as any).requiredPlan === 'elite' ? <Crown className="w-2 h-2" /> : <Lock className="w-2 h-2" />}
                            </div>
                        )}
                    </button>
                );
            })}
        </nav>
    );
}

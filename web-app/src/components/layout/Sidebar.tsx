'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Crown, Sparkles, Zap } from 'lucide-react';
import PremiumBadge from '@/components/shared/PremiumBadge';
import { MENU_GROUPS } from '@/lib/constants';
import { UserData } from '@/types';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { brand } from '@/lib/brand';

interface SidebarProps {
    userData: UserData | null;
    mounted: boolean;
    setIsSearchOpen: (val: boolean) => void;
    setIsProfileModalOpen: (val: boolean) => void;
}

export default function Sidebar({
    userData,
    mounted,
    setIsSearchOpen,
    setIsProfileModalOpen,
}: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { openUpgradeModal } = useUpgradeModal();
    const { canUse } = useEntitlements();
    const [collapsed, setCollapsed] = useState(false);

    // Determine user plan — default to 'explorer' (free) if unknown
    const plan = userData?.plan || 'explorer';
    const isPremium = plan === 'pulse' || plan === 'elite' || plan === 'admin';
    const isElite = plan === 'elite' || plan === 'admin';

    const handleItemClick = (e: React.MouseEvent, item: any) => {
        e.preventDefault();
        const fid = item.featureId;
        if (fid && !canUse(fid)) {
            openUpgradeModal({ featureName: item.name, requiredPlan: 'pulse' });
        } else {
            router.push(item.href);
        }
    };

    const displayName = userData?.name || 'User';
    const initials = displayName
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'US';

    const planLabel = isElite ? 'Elite' : plan === 'pulse' ? 'Pulse' : 'Free';
    const planColor = isElite ? 'text-amber-400' : plan === 'pulse' ? 'text-[#01A0E2]' : 'text-slate-400 dark:text-slate-500';

    return (
        <aside
            className={`hidden lg:flex flex-col flex-shrink-0 z-20 relative transition-all duration-300 ease-in-out bg-[#0A1628] border-r border-white/[0.07] ${
                collapsed ? 'w-[68px]' : 'w-[260px]'
            }`}
        >
            {/* Logo Row */}
            <div className="flex items-center justify-between px-4 pt-6 pb-5 border-b border-white/[0.07] flex-shrink-0">
                {!collapsed && (
                    <Link href="/" className="flex items-center gap-2 group" aria-label="Nobevra Home">
                        <div className="relative">
                            <img
                                src={brand.assets.logo}
                                alt="Nobevra"
                                className="h-6.5 w-auto object-contain brightness-0 invert"
                            />
                            <div className="absolute -top-0.5 -right-1.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#0A1628]" />
                        </div>
                    </Link>
                )}
                {collapsed && (
                    <div className="w-full flex justify-center">
                        <div className="w-8 h-8 rounded-lg bg-[#01A0E2]/20 border border-[#01A0E2]/30 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-[#01A0E2]" />
                        </div>
                    </div>
                )}
                {!collapsed && (
                    <button
                        onClick={() => setCollapsed(true)}
                        className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all flex-shrink-0"
                        title="Collapse sidebar"
                        aria-label="Collapse sidebar"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Expand button when collapsed */}
            {collapsed && (
                <div className="flex flex-col items-center pt-3 gap-2">
                    <button
                        onClick={() => setCollapsed(false)}
                        className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all shadow-sm"
                        title="Expand sidebar"
                        aria-label="Expand sidebar"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Navigation Groups */}
            <nav className="flex flex-col gap-5 flex-1 overflow-y-auto py-4 min-h-0 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full px-2">
                {MENU_GROUPS.map((group) => (
                    <div key={group.label} className="space-y-0.5">
                        {!collapsed && (
                            <h3 className="px-3 mb-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-white/30">
                                {group.label}
                            </h3>
                        )}
                        <div className="flex flex-col gap-0.5">
                            {group.items.map(item => {
                                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                                const fid = item.featureId;
                                const locked = fid ? !canUse(fid) : false;
                                const eliteGated = fid === 'settings.team' || fid === 'brand.whitelabel';

                                return (
                                    <button
                                        key={item.name}
                                        type="button"
                                        onClick={(e) => handleItemClick(e, item)}
                                        title={collapsed ? item.name : undefined}
                                        className={[
                                            'relative flex w-full items-center rounded-xl transition-all duration-150 group',
                                            collapsed ? 'justify-center h-10 w-10 mx-auto px-0' : 'px-3 py-2.5',
                                            isActive
                                                ? 'bg-[#01A0E2]/15 border-l-2 border-[#01A0E2] text-white'
                                                : locked
                                                ? 'text-white/50 hover:bg-white/[0.04] hover:text-white/70'
                                                : 'text-white/60 hover:bg-white/[0.05] hover:text-white/90',
                                        ].join(' ')}
                                    >
                                        {/* Icon + Label */}
                                        <div className={`flex items-center flex-1 min-w-0 ${collapsed ? '' : 'gap-3'}`}>
                                            <div className={[
                                                'flex items-center justify-center w-5 h-5 rounded flex-shrink-0 transition-colors',
                                                isActive ? 'text-white' : locked ? 'text-white/25' : 'text-white/40 group-hover:text-[#01A0E2]',
                                            ].join(' ')}>
                                                <item.icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                                            </div>
                                            {!collapsed && (
                                                <span className="text-[13px] font-semibold tracking-tight truncate flex-1 text-left">
                                                    {item.name}
                                                </span>
                                            )}
                                        </div>

                                        {/* Premium Badge — visible pill, only for locked items on free plan */}
                                        {!collapsed && locked && (
                                            <PremiumBadge tier={eliteGated ? 'elite' : 'pro'} iconOnly className="ml-auto flex-shrink-0 w-3.5 h-3.5 drop-shadow-md" />
                                        )}

                                        {/* Active chevron — only when not locked */}
                                        {!collapsed && !locked && isActive && (
                                            <ChevronRight className="w-3 h-3 text-[#01A0E2]/70 flex-shrink-0 ml-1" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="flex-shrink-0 border-t border-white/[0.07] p-3 space-y-3">
                {/* Upgrade Banner — only for free users, only when not collapsed */}
                {!isPremium && !collapsed && (
                    <div className="rounded-2xl bg-gradient-to-br from-[#01A0E2]/15 to-[#006970]/15 border border-[#01A0E2]/20 p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <PremiumBadge tier="pro" iconOnly className="w-5 h-5 drop-shadow-md" />
                            <p className="text-[11px] font-black text-white/80">Power Up</p>
                        </div>
                        <p className="text-[10px] text-white/40 leading-relaxed mb-2.5">
                            Unlock advanced invoicing, payments &amp; AI tools.
                        </p>
                        <Link
                            href="/upgrade"
                            className="flex items-center justify-center w-full py-2 bg-[#01A0E2] hover:bg-[#0588c0] rounded-xl text-[10px] font-black text-white uppercase tracking-widest transition-colors shadow-lg shadow-[#01A0E2]/20"
                        >
                            Upgrade Now
                        </Link>
                    </div>
                )}

                {/* User Profile */}
                {mounted && (
                    <button
                        onClick={() => setIsProfileModalOpen(true)}
                        className={`w-full flex items-center rounded-xl hover:bg-white/[0.05] transition-all p-2 group ${
                            collapsed ? 'justify-center' : 'gap-3'
                        }`}
                        title={collapsed ? displayName : undefined}
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0 rounded-full" style={{ boxShadow: isElite ? '0 0 0 2px #F59E0B' : plan === 'pulse' ? '0 0 0 2px #01A0E2' : '0 0 0 2px #94A3B8' }}>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#01A0E2] to-[#006970] flex items-center justify-center shadow-lg shadow-[#01A0E2]/20">
                                <span className="text-[11px] font-black text-white">{initials}</span>
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-1 ring-[#0A1628]" />
                        </div>
                        {/* Name + Plan */}
                        {!collapsed && (
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-[12px] font-bold text-white/80 truncate leading-tight">{displayName}</p>
                                <p className={`text-[9px] font-black uppercase tracking-widest ${planColor}`}>{planLabel} Plan</p>
                            </div>
                        )}
                        {!collapsed && (
                            <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
                        )}
                    </button>
                )}
            </div>
        </aside>
    );
}

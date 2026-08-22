'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Search, Crown, Sparkles, X, Zap } from 'lucide-react';
import PremiumBadge from '@/components/shared/PremiumBadge';
import { MENU_GROUPS } from '@/lib/constants';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import { useEntitlements } from '@/context/EntitlementsContext';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    userData: any;
    mounted: boolean;
}

export default function MobileSidebar({
    isOpen,
    onClose,
    userData,
    mounted
}: MobileSidebarProps) {
    const pathname = usePathname();
    const { openUpgradeModal } = useUpgradeModal();
    const { canUse } = useEntitlements();

    // Determine user plan — default to 'explorer' (free) if unknown
    const plan = userData?.plan || 'explorer';
    const isPremium = plan === 'pulse' || plan === 'elite' || plan === 'admin';

    const handleItemClick = (e: React.MouseEvent, item: any) => {
        const fid = item.featureId;
        if (fid && !canUse(fid)) {
            e.preventDefault();
            onClose();
            setTimeout(() => {
                openUpgradeModal({ featureName: item.name, requiredPlan: 'pulse' });
            }, 100);
        } else {
            onClose();
        }
    };

    const displayName = userData?.name || 'User';
    const initials = displayName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'US';
    const planLabel = plan === 'elite' ? 'Elite' : plan === 'pulse' ? 'Pulse' : 'Free';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
                    />
                    {/* Drawer */}
                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 w-[280px] z-[70] lg:hidden flex flex-col shadow-2xl overflow-y-auto bg-[#0A1628] border-r border-white/[0.07]"
                    >
                        {/* Top: logo + close */}
                        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/[0.07] flex-shrink-0">
                            <Link href="/" onClick={onClose} className="flex items-center gap-2" aria-label="Nobevra Home">
                                <div className="w-7 h-7 rounded-lg bg-[#01A0E2]/20 border border-[#01A0E2]/30 flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-[#01A0E2]" />
                                </div>
                                <span className="text-sm font-black text-white">Nobevra</span>
                            </Link>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-xl bg-noble-surface dark:bg-noble-card/[0.06] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="px-4 pt-4 pb-2">
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input
                                    placeholder="Search workspace..."
                                    className="w-full bg-noble-surface dark:bg-noble-card/[0.06] border border-white/[0.08] rounded-xl py-2.5 pl-10 pr-4 text-[12px] text-white/70 placeholder:text-white/25 focus:outline-none focus:border-[#01A0E2]/50 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex flex-col gap-4 flex-1 overflow-y-auto py-3 px-3 pb-6">
                            {MENU_GROUPS.map(group => (
                                <div key={group.label} className="space-y-0.5">
                                    <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.18em] px-3 mb-1.5">{group.label}</h3>
                                    <div className="flex flex-col gap-0.5">
                                        {group.items.map(item => {
                                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                                            const fid = item.featureId;
                                            const locked = fid ? !canUse(fid) : false;
                                            const eliteGated = fid === 'settings.team' || fid === 'brand.whitelabel';
                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={(e) => handleItemClick(e, item)}
                                                    className={[
                                                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all',
                                                        isActive
                                                            ? 'bg-[#01A0E2]/15 border-l-2 border-[#01A0E2] text-white'
                                                            : locked
                                                            ? 'text-white/50 hover:bg-noble-surface dark:bg-noble-card/[0.04] hover:text-white/70'
                                                            : 'text-white/60 hover:bg-noble-surface dark:bg-noble-card/[0.05] hover:text-white/90',
                                                    ].join(' ')}
                                                >
                                                    <item.icon
                                                        className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : locked ? 'text-white/25' : 'text-white/40'}`}
                                                        strokeWidth={isActive ? 2.5 : 2}
                                                    />
                                                    <span className={`flex-1 text-[13px] ${isActive ? 'font-bold text-white' : 'font-medium'}`}>
                                                        {item.name}
                                                    </span>
                                                    {/* Premium Badge */}
                                                    {locked && (
                                                        <PremiumBadge tier={eliteGated ? 'elite' : 'pro'} iconOnly className="flex-shrink-0 ml-auto w-3.5 h-3.5 drop-shadow-md" />
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </nav>

                        {/* Bottom section */}
                        <div className="flex-shrink-0 border-t border-white/[0.07] p-3 space-y-3">
                            {/* Upgrade banner — free users only */}
                            {!isPremium && (
                                <div className="rounded-2xl bg-gradient-to-br from-[#01A0E2]/15 to-[#006970]/15 border border-[#01A0E2]/20 p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <PremiumBadge tier="pro" iconOnly className="w-5 h-5 drop-shadow-md" />
                                        <p className="text-[11px] font-black text-white/80">Unlock Full Power</p>
                                    </div>
                                    <Link
                                        href="/upgrade"
                                        onClick={onClose}
                                        className="flex items-center justify-center w-full py-2 bg-[#01A0E2] rounded-xl text-[10px] font-black text-white uppercase tracking-widest"
                                    >
                                        Upgrade Now
                                    </Link>
                                </div>
                            )}

                            {/* User + logout */}
                            {mounted && (
                                <div className="flex items-center gap-3 px-2 py-2">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#01A0E2] to-[#006970] flex items-center justify-center shadow-md flex-shrink-0">
                                        <span className="text-[11px] font-black text-white">{initials}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[12px] font-bold text-white/80 truncate">{displayName}</p>
                                        <p className="text-[9px] font-black text-[#01A0E2] uppercase tracking-widest">{planLabel}</p>
                                    </div>
                                    <Link
                                        href="/logout"
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                                        title="Sign out"
                                    >
                                        <LogOut className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}

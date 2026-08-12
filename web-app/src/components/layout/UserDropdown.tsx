'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
    Settings, CreditCard, LogOut, Sparkles, Award, Shield, ChevronRight, Crown, CheckCircle2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function UserAvatar({ 
    avatarUrl, initials, plan, size = 'md' 
}: { 
    avatarUrl?: string | null; 
    initials: string; 
    plan: string;
    size?: 'sm' | 'md' | 'lg';
}) {
    const sizeMap = { sm: 'w-8 h-8 text-[10px]', md: 'w-9 h-9 text-[11px]', lg: 'w-14 h-14 text-base' };
    const ringColor = plan === 'elite' 
        ? '0 0 0 2.5px #F59E0B' 
        : plan === 'pulse' 
        ? '0 0 0 2.5px #0599D5' 
        : '0 0 0 2px #CBD5E1';

    return (
        <div 
            className={`${sizeMap[size]} rounded-full flex-shrink-0 overflow-hidden relative`}
            style={{ boxShadow: ringColor }}
        >
            {avatarUrl ? (
                <img 
                    src={avatarUrl} 
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0599D5] to-[#006970] flex items-center justify-center">
                    <span className={`font-black text-white ${sizeMap[size].split(' ')[2]}`}>{initials}</span>
                </div>
            )}
        </div>
    );
}

export default function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { userData: authUserData, user } = useAuth();

    const displayName = authUserData?.name || user?.email?.split('@')[0] || 'Noble User';
    const displayEmail = authUserData?.email || user?.email || '';
    const displayPlan = authUserData?.plan || 'explorer';
    // Get avatar from Google OAuth or any set avatar URL
    const avatarUrl = user?.user_metadata?.avatar_url || authUserData?.avatar_url || null;

    const initials = displayName
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'NU';

    const isElite = displayPlan === 'elite' || displayPlan === 'admin';
    const isPulse = displayPlan === 'pulse';
    const isSuperAdmin = !!authUserData?.isSuperAdmin;
    const isPremium = isElite || isPulse || isSuperAdmin;

    const planLabel = isSuperAdmin ? 'Super Admin' : isElite ? 'Noble Elite' : isPulse ? 'Noble Pulse' : 'Free Tier';
    const planColor = isSuperAdmin ? 'text-amber-500' : isElite ? 'text-amber-500' : isPulse ? 'text-[#0599D5]' : 'text-slate-400 dark:text-slate-500';
    const planBadgeBg = isSuperAdmin ? 'bg-amber-50 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20' : isElite ? 'bg-amber-50 border-amber-100' : isPulse ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 dark:bg-[#0D1B2E] border-slate-100 dark:border-noble-border';

    // Handle clicking outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2.5 py-1.5 pl-3 pr-1.5 rounded-full border transition-all duration-200 ${
                    isOpen 
                    ? 'bg-slate-50 dark:bg-[#0D1B2E] border-noble-border shadow-inner' 
                    : 'bg-noble-dropdown-bg border-noble-border hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] shadow-sm'
                }`}
            >
                {/* Name + Plan (desktop only) */}
                <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[12px] font-bold text-noble-dropdown-text leading-tight tracking-tight">{displayName}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${planColor}`}>
                        {isSuperAdmin ? 'SUPER ADMIN' : isElite ? 'ELITE' : isPulse ? 'PULSE' : 'STARTER'}
                    </span>
                </div>

                {/* Avatar with plan ring */}
                <UserAvatar avatarUrl={avatarUrl} initials={initials} plan={displayPlan} size="sm" />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute right-0 mt-2.5 w-72 bg-noble-dropdown-bg rounded-[24px] border border-noble-border/80 shadow-[0_20px_60px_rgba(15,23,42,0.14)] z-[9999] overflow-hidden origin-top-right"
                    >
                        {/* Header Profile Area */}
                        <div className="p-5 border-b border-slate-100 dark:border-noble-border bg-gradient-to-b from-slate-50 to-white">
                            <div className="flex items-center gap-4">
                                <UserAvatar avatarUrl={avatarUrl} initials={initials} plan={displayPlan} size="lg" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h3 className="text-[14px] font-black text-noble-text truncate">{displayName}</h3>
                                        {isPremium && <CheckCircle2 className="w-3.5 h-3.5 text-[#0599D5] flex-shrink-0" />}
                                    </div>
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">{displayEmail}</p>
                                    <div className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full border ${planBadgeBg}`}>
                                        {(isElite || isSuperAdmin) ? <Crown className="w-2.5 h-2.5 text-amber-500" /> : <Sparkles className="w-2.5 h-2.5 text-[#0599D5]" />}
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${planColor}`}>{planLabel}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upgrade / Plan Status Card */}
                        {!isPremium && (
                            <div className="px-3 pt-3">
                                <div className="bg-gradient-to-br from-[#0599D5]/8 to-[#006970]/8 rounded-2xl p-4 border border-[#0599D5]/15">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-lg bg-[#0599D5]/15 flex items-center justify-center">
                                            <Sparkles className="w-3 h-3 text-[#0599D5]" />
                                        </div>
                                        <p className="text-[11px] font-black text-slate-700 dark:text-slate-200">Unlock Full Power</p>
                                    </div>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium leading-relaxed mb-3">
                                        Advanced AI invoicing, payments & client management.
                                    </p>
                                    <Link 
                                        href="/upgrade"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center w-full py-2 bg-gradient-to-r from-[#006970] to-[#0599D5] rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:shadow-lg hover:shadow-[#0599D5]/20 hover:-translate-y-0.5 transition-all"
                                    >
                                        Upgrade Now
                                    </Link>
                                </div>
                            </div>
                        )}
                        {isPremium && (
                            <div className="px-3 pt-3">
                                <div className={`rounded-2xl p-3 border ${planBadgeBg} flex items-center justify-between`}>
                                    <div className="flex items-center gap-2">
                                        {isElite ? <Award className="w-4 h-4 text-amber-500" /> : <Shield className="w-4 h-4 text-[#0599D5]" />}
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${planColor}`}>
                                            {planLabel} — Active
                                        </p>
                                    </div>
                                    <Link 
                                        href="/settings/billing"
                                        onClick={() => setIsOpen(false)}
                                        className="text-[9px] font-black text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:text-slate-200 uppercase tracking-widest transition-colors"
                                    >
                                        Manage →
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Menu Links */}
                        <div className="p-3 mt-1">
                            {[
                                { href: '/settings/brand', icon: Settings, label: 'Workspace Settings' },
                                { href: '/settings/billing', icon: CreditCard, label: 'Billing & Invoices' },
                                { href: '/settings/security', icon: Shield, label: 'Security & Identity' },
                            ].map(({ href, icon: Icon, label }) => (
                                <Link 
                                    key={href}
                                    href={href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-noble-text transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#112030] flex items-center justify-center group-hover:bg-noble-dropdown-bg group-hover:shadow-sm transition-all">
                                            <Icon className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-[12px] font-semibold">{label}</span>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                </Link>
                            ))}
                        </div>

                        {/* Logout Section */}
                        <div className="px-3 pb-3 border-t border-slate-100 dark:border-noble-border pt-1">
                            <button 
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push('/logout');
                                }}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 text-slate-400 dark:text-slate-500 hover:text-rose-600 transition-all group"
                            >
                                <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#112030] group-hover:bg-rose-100 flex items-center justify-center transition-all">
                                    <LogOut className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[12px] font-semibold">Sign Out securely</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

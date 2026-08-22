'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import { UserCircle, Shield, Bell, HardDrive, Palette, Users, Settings as SettingsIcon, CreditCard, Puzzle, ExternalLink, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import PremiumBadge from '@/components/shared/PremiumBadge';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    
    const pathname = usePathname();
    const { userData } = useAuth();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();

    const plan = userData?.plan || 'explorer';
    const hasPlanAccess = (requiredPlan?: string): boolean => {
        if (!requiredPlan) return true;
        if (plan === 'admin') return true;
        if (plan === 'elite') return true;
        if (requiredPlan === 'elite') return false;
        if (plan === 'pulse' && userData?.subscriptionStatus === 'active') return true;
        return false;
    };

    const handleTabClick = (e: React.MouseEvent, item: any) => {
        const fid = item.featureId;
        if (fid && !canUse(fid)) {
            e.preventDefault();
            openUpgradeModal({ featureName: item.name, requiredPlan: 'elite' });
        }
    };

    const menuItems = [
        { name: 'Profile', path: '/settings/profile', icon: UserCircle },
        { name: 'Branding', path: '/settings/brand', icon: Palette },
        { name: 'Billing & Subscription', path: '/settings/billing', icon: CreditCard },
        { name: 'Integrations', path: '/settings/integrations', icon: Puzzle, featureId: 'settings.integrations' },
        { name: 'Developer', path: '/settings/developer', icon: Terminal, featureId: 'developer.api' },
        { name: 'Security', path: '/settings/security', icon: Shield },
        { name: 'Preferences', path: '/settings/preferences', icon: Bell },
        { name: 'Data & Backup', path: '/settings/data', icon: HardDrive },
    ];

    const visibleMenuItems = menuItems.filter(item => {
        if (item.path === '/settings/team' && !canUse('team.members')) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-noble-surface dark:bg-[#060D1A] dark:bg-noble-card text-noble-text pb-20 font-inter selection:bg-[#166FBB]/20">
            
            {/* Header Area */}
            {pathname !== '/settings/team' && (
                <div className="pt-10 px-6 lg:px-10 max-w-[1400px] mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-5">
                            <div className="w-[64px] h-[64px] rounded-[18px] bg-[#EEF5FC] flex items-center justify-center text-[#166FBB]">
                                <SettingsIcon className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h1 className="text-[19px] font-bold text-noble-text tracking-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                                    Settings <span className="text-[#166FBB] italic font-medium">Hub</span>
                                </h1>
                                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Manage your profile, preferences, and data privacy</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl text-[12.5px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] hover:border-slate-300 hover:shadow-sm transition-all shadow-sm">
                            View Workspace
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        </button>
                    </div>

                    {/* Horizontal Tab Navigation */}
                    <div className="border-b border-noble-border">
                        <nav className="flex items-center gap-5 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth py-1">
                            {visibleMenuItems.map((item) => {
                                const isActive = pathname === item.path;
                                const fid = item.featureId;
                                const locked = !!fid && !canUse(fid);
                                const rp = fid ? (fid === 'developer.api' ? 'elite' : 'pro') : undefined;
                                
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onClick={(e) => handleTabClick(e, item)}
                                        className={`flex items-center gap-2 pb-4 pt-1 border-b-[2px] transition-all duration-200 whitespace-nowrap ${
                                            isActive
                                                ? 'border-[#166FBB] text-[#166FBB] font-black'
                                                : locked
                                                ? 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:text-slate-500 font-bold'
                                                : 'border-transparent text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:text-slate-100 hover:border-slate-300 font-bold'
                                        }`}
                                    >
                                        <item.icon className={`w-4 h-4 ${isActive ? 'text-[#166FBB]' : locked ? 'text-slate-300' : 'text-slate-400 dark:text-slate-500'}`} strokeWidth={isActive ? 2.5 : 2} />
                                        <span className={`text-[13px] capitalize tracking-wide ${locked ? 'opacity-70' : ''}`}>{item.name}</span>
                                        {locked && (
                                            <PremiumBadge tier={rp === 'elite' ? 'elite' : 'pro'} iconOnly className="w-3.5 h-3.5 ml-1 drop-shadow-sm opacity-90" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className={`max-w-[1400px] mx-auto px-6 lg:px-10 ${pathname === '/settings/team' ? 'pt-10' : 'pt-8'}`}>
                {children}
            </div>
        </div>
    );
}

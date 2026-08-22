'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Script from 'next/script';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MobileSidebar from '@/components/layout/MobileSidebar';
import BottomNav from '@/components/layout/BottomNav';
import Modals from '@/components/layout/Modals';
import LiveLedgerTicker from '@/components/shared/LiveLedgerTicker';
import ConflictResolverModal from '@/components/shared/ConflictResolverModal';
import FloatingVoiceAssistant from '@/components/shared/FloatingVoiceAssistant';
import CookieConsent from '@/components/shared/CookieConsent';
import { brand } from '@/lib/brand';

/**
 * UserLayoutClient — interactive client island for the app shell.
 *
 * RSC Boundary: This component owns ALL browser-state (auth guard, hotkeys,
 * mobile menu, search open state). The outer layout.tsx is an RSC that renders
 * the static provider tree (RealtimeProvider, UpgradeModalProvider) and then
 * slots this component as the single client root. This means Next.js can
 * server-render the provider wrappers and only hydrate from here down.
 */
export default function UserLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, userData, loading, logout } = useAuth();

    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Global hotkeys — Cmd/Ctrl+K opens command palette
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Auth guard — redirect unauthenticated users
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    // Loading state — animated splash screen
    if (loading) {
        return (
            <div className="h-screen w-full bg-noble-bg flex items-center justify-center overflow-hidden relative">
                {/* Ambient glow — uses brand primary */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-noble-primary/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="flex flex-col items-center gap-8 relative z-10">
                    {/* Spinner ring */}
                    <motion.div
                        className="relative w-24 h-24 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <svg className="w-full h-full text-noble-primary" viewBox="0 0 100 100" fill="none">
                            <motion.circle
                                cx="50" cy="50" r="45"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="150 200"
                                strokeLinecap="round"
                                className="opacity-20"
                            />
                            <motion.circle
                                cx="50" cy="50" r="45"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeDasharray="50 300"
                                strokeLinecap="round"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                style={{ transformOrigin: "center" }}
                            />
                        </svg>
                        {/* Brand icon center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                className="w-12 h-12 bg-white dark:bg-[#0A1628] rounded-2xl shadow-[0_0_30px_rgba(1,160,226,0.35)] border border-[#01A0E2]/20 flex items-center justify-center p-2"
                                animate={{ scale: [1, 1.08, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <img src={brand.assets.icon} alt="Nobevra" className="w-full h-full object-contain" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Brand name + subtitle */}
                    <div className="text-center space-y-2">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-noble-text font-black tracking-tight text-4xl"
                            style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
                        >
                            {brand.shortName}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-noble-muted font-extrabold text-[10px] uppercase tracking-[0.3em]"
                        >
                            {brand.tagline}
                        </motion.p>
                    </div>
                </div>
            </div>
        );
    }


    if (!user) return null;

    const isStudio = pathname === '/studio';

    if (isStudio) {
        return (
            <>
                <div className="flex h-screen w-screen bg-[#F3F6FC] dark:bg-[#060D1A] overflow-hidden font-manrope">
                    {children}
                </div>
                <Script src="https://checkout.flutterwave.com/v3.js" strategy="lazyOnload" />
            </>
        );
    }

    return (
        <>
            <div className="flex h-screen bg-[#F3F6FC] dark:bg-[#060D1A] overflow-hidden font-manrope">
                {/* Desktop Sidebar */}
                <Sidebar
                    userData={userData}
                    mounted={mounted}
                    setIsSearchOpen={setIsSearchOpen}
                    setIsProfileModalOpen={setIsProfileModalOpen}
                />

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 flex flex-col overflow-visible relative pb-16 md:pb-0">
                    {/* Top Header */}
                    <Header setIsMobileMenuOpen={setIsMobileMenuOpen} />

                    <div className="flex-1 overflow-auto bg-[#F3F6FC] dark:bg-[#060D1A] custom-scrollbar">
                        {children}
                    </div>

                    {/* Mobile Navigation */}
                    <BottomNav />
                </main>

                {/* Mobile Sidebar Drawer */}
                <MobileSidebar
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    userData={userData}
                    mounted={mounted}
                />

                {/* Centralized Modals */}
                <Modals
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                    isProfileModalOpen={isProfileModalOpen}
                    setIsProfileModalOpen={setIsProfileModalOpen}
                />

                {/* Live Intelligence Feed */}
                <LiveLedgerTicker />

                {/* Conflict Resolution Panel */}
                <ConflictResolverModal />

                {/* AI Voice Assistant */}
                <FloatingVoiceAssistant />

                {/* GDPR/NDPR Cookie Consent */}
                <CookieConsent />
            </div>
            <Script src="https://checkout.flutterwave.com/v3.js" strategy="lazyOnload" />
        </>
    );
}

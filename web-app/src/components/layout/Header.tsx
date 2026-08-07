'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Bell, Search, Clock } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import HeaderSearch from './HeaderSearch';
import UserDropdown from './UserDropdown';

interface HeaderProps {
    setIsMobileMenuOpen: (val: boolean) => void;
}

function useLiveDateTime() {
    const [info, setInfo] = useState({ date: '', time: '' });
    useEffect(() => {
        const update = () => {
            const now = new Date();
            const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
            const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            setInfo({ date, time });
        };
        update();
        const timer = setInterval(update, 30000); // Update every 30 seconds
        return () => clearInterval(timer);
    }, []);
    return info;
}

export default function Header({ setIsMobileMenuOpen }: HeaderProps) {
    const pathname = usePathname();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const { date, time } = useLiveDateTime();

    const currentPathName = pathname.split('/')[1] || 'dashboard';
    const formattedPathName = currentPathName.charAt(0).toUpperCase() + currentPathName.slice(1);

    return (
        <header className="h-[68px] border-b border-slate-100/80 flex items-center justify-between px-6 md:px-8 flex-shrink-0 bg-white/95 backdrop-blur-xl z-40 sticky top-0 shadow-[0_1px_0_rgba(15,23,42,0.06)]">
            {/* LEFT — mobile menu + breadcrumb */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsMobileMenuOpen(true);
                    }}
                    className="lg:hidden p-2 -ml-1 text-slate-500 hover:text-slate-900 transition-all active:scale-90 bg-slate-50 rounded-xl border border-slate-200"
                    aria-label="Toggle Navigation Drawer"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Breadcrumb */}
                <div className="hidden lg:flex items-center gap-2.5 shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Workspace</span>
                    <div className="w-1 h-1 rounded-full bg-[#0599D5]" />
                    <span className="text-[13px] font-bold text-slate-800 tracking-tight">{formattedPathName}</span>
                </div>

                {/* Live Date + Time — prominent pill */}
                {date && (
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80">
                        <Clock className="w-3 h-3 text-[#0599D5] flex-shrink-0" />
                        <span className="text-[11px] font-semibold text-slate-600 tracking-tight">{date}</span>
                        <div className="w-px h-3 bg-slate-200" />
                        <span className="text-[11px] font-bold text-slate-900 tracking-tight tabular-nums">{time}</span>
                    </div>
                )}

                {/* Search bar */}
                <div className="hidden lg:flex items-center flex-1 max-w-[380px] ml-1">
                    <HeaderSearch />
                </div>
            </div>

            {/* RIGHT — bell + user */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
                {/* Mobile search icon */}
                <button className="lg:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-xl hover:bg-slate-100">
                    <Search className="w-5 h-5" />
                </button>

                {/* Notification bell */}
                <div className="relative">
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className="relative text-slate-500 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100"
                        aria-label="Notifications"
                    >
                        <Bell className="w-5 h-5" />
                        {/* Pulsing unread badge */}
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0599D5] rounded-full ring-1 ring-white">
                            <span className="absolute inset-0 rounded-full bg-[#0599D5] animate-ping opacity-75" />
                        </span>
                    </button>
                    <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
                </div>

                {/* User dropdown */}
                <UserDropdown />
            </div>
        </header>
    );
}

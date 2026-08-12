'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Bell, Search, Clock } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import HeaderSearch from './HeaderSearch';
import UserDropdown from './UserDropdown';
import { ThemeToggle } from '@/components/ui/theme-toggle';

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
 <header className="h-[68px] border-b border-noble-border flex items-center justify-between px-6 md:px-8 flex-shrink-0 bg-noble-surface dark:bg-noble-card/95 dark:bg-[#0A1628]/95 backdrop-blur-xl z-40 sticky top-0 shadow-[0_1px_0_rgba(15,23,42,0.06)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]">
 {/* LEFT — mobile menu + breadcrumb */}
 <div className="flex items-center gap-4 flex-1 min-w-0">
 <button
 type="button"
 onClick={(e) => {
 e.preventDefault();
 e.stopPropagation();
 setIsMobileMenuOpen(true);
 }}
 className="lg:hidden p-2 -ml-1 text-noble-muted hover:text-noble-text transition-all active:scale-90 dark:bg-white/5 bg-noble-surface rounded-xl border border-noble-border"
 aria-label="Toggle Navigation Drawer"
 >
 <Menu className="w-5 h-5" />
 </button>

 {/* Breadcrumb */}
 <div className="hidden lg:flex items-center gap-2 shrink-0">
 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">WORKSPACE</span>
 <span className="text-slate-500 font-bold mx-0.5">›</span>
 <span className="text-[14px] font-bold text-noble-text tracking-tight">{formattedPathName}</span>
 </div>

 {/* Live Date + Time — prominent pill */}
 {date && (
 <div className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full bg-noble-interactive-bg/80 border border-noble-border shadow-inner backdrop-blur-md ml-4">
 <Clock className="w-3.5 h-3.5 text-noble-primary flex-shrink-0" />
 <span className="text-[12px] font-semibold text-noble-muted tracking-tight">{date}</span>
 <span className="text-[12px] font-bold text-noble-text tracking-tight tabular-nums ml-1">{time}</span>
 </div>
 )}

 {/* Search bar */}
 <div className="hidden lg:flex items-center flex-1 max-w-[420px] ml-4">
 <HeaderSearch />
 </div>
 </div>

 {/* RIGHT — bell + user */}
 <div className="flex items-center gap-2.5 flex-shrink-0">
 {/* Mobile search icon */}
 <button className="lg:hidden p-2 text-noble-muted hover:text-noble-text transition-colors rounded-xl hover:bg-noble-bg dark:hover:bg-noble-interactive-bg">
 <Search className="w-5 h-5" />
 </button>

 <ThemeToggle />

 {/* Notification bell */}
 <div className="relative">
 <button
 onClick={() => setIsNotifOpen(!isNotifOpen)}
 className="relative text-noble-muted hover:text-noble-text transition-colors p-2 rounded-xl hover:bg-noble-bg dark:hover:bg-noble-interactive-bg"
 aria-label="Notifications"
 >
 <Bell className="w-5 h-5" />
 {/* Pulsing unread badge */}
 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-noble-primary rounded-full ring-1 ring-white dark:ring-noble-surface">
 <span className="absolute inset-0 rounded-full bg-noble-primary animate-ping opacity-75" />
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

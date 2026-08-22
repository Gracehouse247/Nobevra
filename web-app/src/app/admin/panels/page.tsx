'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard, FileText, MessageSquare, Mail,
    CreditCard, BarChart3, Settings, LogOut, ShieldCheck
} from 'lucide-react';
import LiveChatPanel from '@/components/features/admin/LiveChatPanel';
import EmailMarketingPanel from '@/components/features/admin/EmailMarketingPanel';
import SubscriptionsPanel from '@/components/features/admin/SubscriptionsPanel';
import Link from 'next/link';

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { id: 'cms', label: 'Blog CMS', icon: FileText, href: '/admin/cms' },
    { id: 'chat', label: 'Live Chat', icon: MessageSquare, href: null },
    { id: 'email', label: 'Email Marketing', icon: Mail, href: null },
    { id: 'subs', label: 'Subscriptions', icon: CreditCard, href: null },
];

export default function AdminPanelsHub() {
    const [activePanel, setActivePanel] = useState<'chat' | 'email' | 'subs'>('chat');

    const renderPanel = () => {
        switch (activePanel) {
            case 'chat': return <LiveChatPanel />;
            case 'email': return <EmailMarketingPanel />;
            case 'subs': return <SubscriptionsPanel />;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#020617]">
            {/* Sidebar */}
            <aside className="w-72 glass border-r border-black/5  p-6 flex flex-col gap-8 flex-shrink-0">
                <div className="flex items-center gap-3 px-4">
                    <div className="w-10 h-10 bg-[#006970] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="text-foreground  font-bold text-xl font-sans">N</span>
                    </div>
                    <div>
                        <span className="text-xl font-bold font-sans text-foreground  block">Nobevra</span>
                        <span className="text-[10px] text-[#006970] font-bold uppercase tracking-widest">Admin Suite</span>
                    </div>
                </div>

                <nav className="flex flex-col gap-2 flex-1">
                    {NAV_ITEMS.map(item => {
                        const isActive = item.id === activePanel;
                        if (item.href) {
                            return (
                                <Link key={item.id} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-600  hover:bg-black/5 :bg-white/5 hover:text-slate-200`}>
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        }
                        return (
                            <button key={item.id} onClick={() => setActivePanel(item.id as any)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${isActive ? 'bg-[#006970]/10 text-[#006970] border border-[#006970]/20' : 'text-slate-600  hover:bg-black/5 :bg-white/5 hover:text-slate-200'}`}>
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-black/5 ">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-slate-600  font-medium">Admin Access</span>
                    </div>
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-400/5 transition-all text-left">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 p-8 overflow-auto ${activePanel === 'chat' ? 'flex flex-col' : ''}`}>
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground  font-sans">
                            {activePanel === 'chat' ? 'Live Chat' : activePanel === 'email' ? 'Email Marketing' : 'Subscriptions'}
                        </h1>
                        <p className="text-slate-600  mt-1">Manage your audience and operations.</p>
                    </div>
                </header>
                <div className={activePanel === 'chat' ? 'flex-1 overflow-hidden' : ''}>
                    {renderPanel()}
                </div>
            </main>
        </div>
    );
}


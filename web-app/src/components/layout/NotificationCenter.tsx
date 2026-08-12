'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle2, AlertCircle, MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AdminNotification {
    id: number;
    type: 'success' | 'alert' | 'message' | 'info';
    title: string;
    description: string | null;
    is_read: boolean;
    created_at: string;
}

interface NotificationCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [notifications, setNotifications] = useState<AdminNotification[]>([]);
    const [loading, setLoading] = useState(false);
    const [markingAll, setMarkingAll] = useState(false);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    // Fetch notifications from Supabase when panel opens
    useEffect(() => {
        if (!isOpen) return;
        const fetchNotifications = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('admin_notifications')
                    .select('id, type, title, description, is_read, created_at')
                    .order('created_at', { ascending: false })
                    .limit(20);

                if (error) {
                    console.error('Failed to fetch notifications:', error);
                } else {
                    setNotifications((data as AdminNotification[]) || []);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [isOpen]);

    const markAllAsRead = async () => {
        const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
        if (unreadIds.length === 0) return;
        setMarkingAll(true);
        const { error } = await supabase
            .from('admin_notifications')
            .update({ is_read: true })
            .in('id', unreadIds);
        if (!error) {
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        }
        setMarkingAll(false);
    };

    const markAsRead = async (id: number) => {
        await supabase
            .from('admin_notifications')
            .update({ is_read: true })
            .eq('id', id);
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, is_read: true } : n)
        );
    };

    if (!isOpen) return null;

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <div 
            ref={dropdownRef}
            className="absolute top-14 right-4 sm:right-24 w-[380px] bg-noble-surface dark:bg-noble-card rounded-2xl shadow-xl border border-noble-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200"
        >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-noble-border bg-slate-50 dark:bg-[#0D1B2E]/50">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-noble-text">Notifications</h3>
                    {unreadCount > 0 && (
                        <span className="bg-[#006970] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {unreadCount} new
                        </span>
                    )}
                </div>
                <button
                    onClick={markAllAsRead}
                    disabled={markingAll || unreadCount === 0}
                    className="text-xs font-bold text-[#006970] hover:text-[#005a60] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {markingAll ? 'Marking…' : 'Mark all as read'}
                </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {loading ? (
                    <div className="py-10 flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <p className="text-xs font-medium">Loading notifications…</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="py-10 text-center text-slate-500 dark:text-slate-400 dark:text-slate-500">
                        <Bell className="w-8 h-8 mx-auto mb-3 text-slate-200" />
                        <p className="text-sm font-medium">You're all caught up!</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {notifications.map((notif) => (
                            <div 
                                key={notif.id} 
                                onClick={() => !notif.is_read && markAsRead(notif.id)}
                                className={`px-5 py-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors border-b border-slate-100 dark:border-noble-border last:border-0 cursor-pointer ${notif.is_read ? '' : 'bg-[#f0fafa]/30'}`}
                            >
                                <div className="shrink-0 mt-0.5">
                                    {notif.type === 'message' && <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><MessageSquare className="w-4 h-4" /></div>}
                                    {notif.type === 'success' && <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>}
                                    {notif.type === 'alert'   && <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center"><AlertCircle className="w-4 h-4" /></div>}
                                    {notif.type === 'info'    && <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#112030] text-slate-500 dark:text-slate-400 dark:text-slate-500 flex items-center justify-center"><Bell className="w-4 h-4" /></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className={`text-sm font-bold truncate ${notif.is_read ? 'text-slate-700 dark:text-slate-200' : 'text-noble-text'}`}>
                                            {notif.title}
                                        </p>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 shrink-0 ml-2">
                                            {timeAgo(notif.created_at)}
                                        </span>
                                    </div>
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 line-clamp-2">
                                        {notif.description}
                                    </p>
                                </div>
                                {!notif.is_read && (
                                    <div className="shrink-0 flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-[#006970]"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-3 border-t border-slate-100 dark:border-noble-border bg-slate-50 dark:bg-[#0D1B2E]/50">
                <button className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:text-noble-text transition-colors">
                    View Complete Activity Log <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}

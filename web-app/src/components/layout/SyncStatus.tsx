'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSyncStore } from '@/store/useSyncStore';

export default function SyncStatus() {
    const { isOnline, setOnlineStatus, queue } = useSyncStore();
    const isSyncing = queue.length > 0;

    useEffect(() => {
        // Browser Connectivity Status
        const handleOnline = () => setOnlineStatus(true);
        const handleOffline = () => setOnlineStatus(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        setOnlineStatus(navigator.onLine);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [setOnlineStatus]);

    return (
        <div className="flex items-center gap-3 px-3 py-1.5 bg-black/5 rounded-full border border-black/5 relative overflow-hidden group">
            <AnimatePresence mode="wait">
                {isOnline ? (
                    <motion.div
                        key="online"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center gap-2"
                    >
                        <div className="relative">
                            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-[#006970]' : 'bg-emerald-500'} transition-colors duration-500`} />
                            {isSyncing && (
                                <motion.div 
                                    layoutId="pulse"
                                    initial={{ scale: 1, opacity: 0.5 }}
                                    animate={{ scale: 2.5, opacity: 0 }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="absolute inset-0 bg-[#006970] rounded-full"
                                />
                            )}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 transition-colors">
                            {isSyncing ? 'Synchronizing Intelligence' : <span><span className="hidden sm:inline">Neural Stream Connected</span><span className="sm:hidden">Connected</span></span>}
                        </span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="offline"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-[0.1em] text-amber-500">
                            Internal Backup Matrix Only
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Visual background indicator */}
            {!isOnline && (
                <div className="absolute inset-0 bg-amber-500/5 pointer-events-none" />
            )}
        </div>
    );
}


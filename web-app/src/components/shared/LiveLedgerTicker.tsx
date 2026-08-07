'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, TrendingUp, DollarSign } from 'lucide-react';

import { useDashboardData } from '@/hooks/useDashboardData';

export default function LiveLedgerTicker() {
    const { stats } = useDashboardData();
    const LOGS = stats.tickerEvents || ["SYSTEM READY: WAITING FOR DATA"];
    return (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-[60] bg-[#166FBB] py-3 overflow-hidden shadow-[0_-10px_40px_rgba(22,111,187,0.2)]">
            <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
                {[...LOGS, ...LOGS].map((log, i) => (
                    <div key={i} className="flex items-center gap-4 text-[9px] font-black tracking-[0.2em] text-white/70 uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                        <span>{log}</span>
                        <TrendingUp size={10} className="text-white" />
                        <span className="text-white/20 mx-4">|</span>
                    </div>
                ))}
            </div>
            
            {/* Legend / Status Overlay */}
            <div className="absolute left-0 top-0 bottom-0 bg-[#166FBB] px-6 flex items-center gap-3 border-r border-white/10 z-10 shadow-[20px_0_40px_rgba(22,111,187,1)]">
                <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-white animate-spin-slow" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Noble Intelligence Feed</span>
                </div>
            </div>
        </div>
    );
}

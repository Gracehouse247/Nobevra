'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Battery, ShieldAlert } from 'lucide-react';

interface WellbeingMonitorProps {
    score: number; // 0-100
    status: 'Optimal' | 'Stable' | 'Strained' | 'Burnout Risk';
}

export default function WellbeingMonitor({ score, status }: WellbeingMonitorProps) {
    const getColor = () => {
        if (score > 80) return 'text-emerald-500';
        if (score > 60) return 'text-[#F4B400]';
        if (score > 40) return 'text-orange-500';
        return 'text-red-500';
    };

    const getBg = () => {
        if (score > 80) return 'bg-emerald-500/10 border-emerald-500/20';
        if (score > 60) return 'bg-[#F4B400]/10 border-[#F4B400]/20';
        if (score > 40) return 'bg-orange-500/10 border-orange-500/20';
        return 'bg-red-500/10 border-red-500/20';
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative bg-noble-surface/40 backdrop-blur-2xl p-8 rounded-[40px] border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.03)] space-y-8 overflow-hidden"
        >
            {/* Ambient Background Glow */}
            <div className={`absolute top-[-30%] right-[-10%] w-[200px] h-[200px] rounded-full blur-[80px] pointer-events-none opacity-50 ${
                score > 80 ? 'bg-emerald-400/20' : score > 60 ? 'bg-[#F4B400]/20' : 'bg-red-400/20'
            }`} />

            <motion.div variants={itemVariants} className="flex items-center justify-between relative z-10">
                <h3 className="text-xl font-black text-noble-text flex items-center gap-3 tracking-tighter" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                    <div className="w-10 h-10 rounded-2xl bg-noble-blue/10 flex items-center justify-center border border-white/50 shadow-sm">
                        <Zap className="w-5 h-5 text-noble-blue fill-current" />
                    </div>
                    Vitality Sync
                </h3>
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border shadow-sm ${getBg()} ${getColor()}`}>
                    {status}
                </span>
            </motion.div>

            <motion.div variants={itemVariants} className="relative h-4 w-full bg-slate-100/50 backdrop-blur-sm rounded-full overflow-hidden border border-white/40 shadow-inner z-10">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r shadow-[0_0_15px_rgba(255,255,255,0.5)] ${
                        score > 80 ? 'from-emerald-400 to-emerald-300' :
                        score > 60 ? 'from-[#F4B400] to-[#F9D406]' :
                        'from-red-400 to-red-300'
                    }`}
                />
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 relative z-10">
                <motion.div whileHover={{ scale: 1.02 }} className="p-5 rounded-3xl bg-noble-surface/50 backdrop-blur-md border border-white/60 shadow-sm transition-all">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Focus Energy</p>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Battery className="w-4 h-4 text-emerald-500" />
                        </div>
                        <span className="text-2xl font-black text-noble-text tracking-tighter">{score}%</span>
                    </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="p-5 rounded-3xl bg-noble-surface/50 backdrop-blur-md border border-white/60 shadow-sm transition-all">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Stress Load</p>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                            <ShieldAlert className="w-4 h-4 text-[#F4B400]" />
                        </div>
                        <span className="text-2xl font-black text-noble-text tracking-tighter">{100 - score}%</span>
                    </div>
                </motion.div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-[13px] text-slate-500 font-bold leading-relaxed tracking-wide relative z-10 border-t border-slate-100/50 pt-6">
                {score > 80 ? "Your cognitive load is optimal. High-intensity tasks recommended." :
                 score > 60 ? "Stable performance. Consider a short break after this session." :
                 "Burnout risk detected. Time to disconnect and recharge."}
            </motion.p>
        </motion.div>
    );
}


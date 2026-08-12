'use client';

import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Action {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
}

interface NobleEmptyStateProps {
    icon: LucideIcon;
    accentIcon?: LucideIcon;
    title: string;
    description: string;
    actions?: Action[];
    /** Gradient accent color class e.g. 'from-indigo-500/10 to-purple-500/5' */
    gradient?: string;
    /** Icon color class e.g. 'text-[#006970]/60' */
    iconColor?: string;
    /** Top accent icon color class */
    accentColor?: string;
}

export default function NobleEmptyState({
    icon: Icon,
    accentIcon: AccentIcon,
    title,
    description,
    actions = [],
    gradient = 'from-noble-blue/10 to-electric-cyan/5',
    iconColor = 'text-noble-blue',
    accentColor = 'text-electric-cyan',
}: NobleEmptyStateProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div 
            className="flex flex-col items-center justify-center py-24 px-8 text-center relative select-none w-full max-w-2xl mx-auto rounded-[40px] bg-noble-surface dark:bg-noble-card/40 backdrop-blur-2xl border border-white/60 shadow-[0_40px_100px_rgba(22,111,187,0.05)] overflow-hidden"
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Ambient Mesh Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] bg-noble-blue/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-electric-cyan/10 blur-[100px] rounded-full pointer-events-none" />

            {/* 3D Floating Icon Container */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative z-10"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                    className={`relative w-32 h-32 rounded-[2rem] bg-gradient-to-br ${gradient} flex items-center justify-center mb-8 border border-white/80 shadow-2xl backdrop-blur-md`}
                    style={{ transform: "translateZ(50px)" }}
                >
                    {/* Floating accent icon */}
                    {AccentIcon && (
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                            className={`absolute -top-4 -right-4 ${accentColor} bg-noble-surface dark:bg-noble-card rounded-xl p-2 shadow-xl border border-white/50`}
                            style={{ transform: "translateZ(80px)" }}
                        >
                            <AccentIcon className="w-6 h-6 drop-shadow-md" />
                        </motion.div>
                    )}
                    <Icon className={`w-14 h-14 ${iconColor}`} style={{ transform: "translateZ(30px)" }} />
                </motion.div>
            </motion.div>

            {/* Typography */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 max-w-sm relative z-10"
            >
                <h3 className="text-3xl font-black text-noble-text tracking-tighter leading-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                    {title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-[13px] leading-relaxed font-bold tracking-wide">
                    {description}
                </p>
            </motion.div>

            {/* Staggered CTAs */}
            {actions.length > 0 && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                        }
                    }}
                    className="flex flex-wrap items-center justify-center gap-4 mt-10 relative z-10"
                >
                    {actions.map((action, i) => (
                        <motion.button
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={action.onClick}
                            className={
                                action.variant === 'secondary'
                                    ? 'px-8 py-4 bg-noble-surface dark:bg-noble-card/60 backdrop-blur-md hover:bg-noble-surface dark:bg-noble-card rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 dark:text-slate-500 transition-all border border-noble-border shadow-sm'
                                    : 'px-8 py-4 bg-noble-blue hover:bg-noble-blue/90 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-[0_20px_40px_rgba(22,111,187,0.3)]'
                            }
                        >
                            {action.label}
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}


'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EmptyStateIllustrationProps {
    icons: LucideIcon[];
    primaryColor?: string;
    secondaryColor?: string;
}

export function EmptyStateIllustration({
    icons,
    primaryColor = 'text-[#01A0E2]',
    secondaryColor = 'text-[#006970]'
}: EmptyStateIllustrationProps) {
    if (!icons || icons.length === 0) return null;

    const [PrimaryIcon, ...secondaryIcons] = icons;

    return (
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            {/* Ambient Nobevra Electric Blue Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-0 bg-gradient-to-tr from-[#01A0E2]/20 via-[#00F0FF]/10 to-[#006970]/10 rounded-full blur-2xl pointer-events-none"
            />
            
            {/* Brand Accent Dots */}
            <div className="absolute top-3 right-5 w-2.5 h-2.5 rounded-full bg-[#01A0E2] ring-2 ring-white dark:ring-[#0A1628] animate-pulse z-20" />
            <div className="absolute bottom-4 left-6 w-2 h-2 rounded-full bg-[#00F0FF] ring-2 ring-white dark:ring-[#0A1628] z-20" />

            {/* Primary Center Icon */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="relative z-10 p-6 bg-noble-surface dark:bg-noble-card rounded-3xl shadow-xl border border-slate-100 dark:border-noble-border"
            >
                <PrimaryIcon className={`w-16 h-16 ${primaryColor}`} strokeWidth={1.5} />
            </motion.div>

            {/* Secondary Floating Icons */}
            {secondaryIcons.map((Icon, index) => {
                const angle = (index / secondaryIcons.length) * Math.PI * 2;
                const radius = 65;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, x, y }}
                        transition={{ 
                            opacity: { duration: 0.5, delay: 0.2 + index * 0.1 },
                            scale: { type: 'spring', stiffness: 200, delay: 0.2 + index * 0.1 },
                            x: { duration: 0.8, ease: 'easeOut', delay: 0.2 + index * 0.1 },
                            y: { duration: 0.8, ease: 'easeOut', delay: 0.2 + index * 0.1 }
                        }}
                        className="absolute inset-0 m-auto w-10 h-10 bg-noble-surface dark:bg-noble-card rounded-xl shadow-lg border border-slate-50 flex items-center justify-center z-20"
                    >
                        <motion.div
                            animate={{ y: [-3, 3, -3] }}
                            transition={{ repeat: Infinity, duration: 3, delay: index * 0.5, ease: 'easeInOut' }}
                        >
                            <Icon className={`w-5 h-5 ${index % 2 === 0 ? secondaryColor : 'text-slate-400 dark:text-slate-500'}`} strokeWidth={2} />
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}

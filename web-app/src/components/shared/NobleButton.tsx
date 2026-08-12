'use client';

import React from 'react';
import { motion, useAnimation } from 'framer-motion';

interface NobleButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'glass';
    type?: 'button' | 'submit';
}

export default function NobleButton({ 
    children, 
    onClick, 
    className = "", 
    variant = 'primary',
    type = 'button'
}: NobleButtonProps) {
    const controls = useAnimation();

    const handleClick = async (e: React.MouseEvent) => {
        // Visual Haptic: Squishy Scale
        await controls.start({
            scale: 0.94,
            transition: { duration: 0.1, ease: "easeOut" }
        });
        controls.start({
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 10 }
        });

        if (onClick) onClick();
    };

    const variants = {
        primary: "bg-[#166FBB] text-white shadow-xl shadow-noble-blue/20 hover:bg-[#125A96] hover:shadow-2xl hover:shadow-noble-blue/30",
        secondary: "bg-noble-surface dark:bg-noble-card border border-noble-border text-noble-text hover:border-noble-blue/30 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E]",
        glass: "bg-noble-blue/5 backdrop-blur-md border border-noble-blue/10 text-noble-blue hover:bg-noble-blue/10"
    };

    return (
        <motion.button
            type={type}
            animate={controls}
            whileHover={{ y: -2 }}
            onClick={handleClick}
            className={`relative overflow-hidden px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${variants[variant]} ${className}`}
        >
            {/* Dynamic Shine Layer */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"
            />
            
            <span className="relative z-10 flex items-center gap-3">
                {children}
            </span>

            {/* Tap Ripple Simulation (Visual Haptic) */}
            <AnimatePresence>
                <motion.div 
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-noble-surface dark:bg-noble-card/20 rounded-full pointer-events-none"
                />
            </AnimatePresence>
        </motion.button>
    );
}

import { AnimatePresence } from 'framer-motion';

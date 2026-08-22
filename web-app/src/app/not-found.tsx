'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Home, Compass, Sparkles, Brain, 
    ArrowRight, Map, Zap
} from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] flex flex-col items-center justify-center p-6 relative overflow-hidden font-inter selection:bg-electric-cyan/30">
            {/* Dynamic Subtle Glow */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-1000 hidden md:block"
                style={{
                    background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(22, 111, 187, 0.08), transparent 80%)`
                }}
            />
            
            {/* Decorative Blurs */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-noble-blue/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-electric-cyan/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Main Content */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-5xl w-full text-center"
            >
                <div className="relative inline-block mb-12">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-noble-blue/5 border border-noble-blue/10 text-noble-blue text-[10px] font-black uppercase tracking-[0.25em] mb-8"
                    >
                        <Brain className="w-3.5 h-3.5 animate-pulse" />
                        Coordinate System Error
                    </motion.div>
                    
                    <div className="relative">
                        <motion.h1 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                            className="text-[180px] md:text-[280px] font-black text-transparent bg-clip-text bg-gradient-to-b from-noble-blue/20 via-noble-blue/5 to-transparent leading-none select-none"
                        >
                            404
                        </motion.h1>
                        <div className="absolute inset-0 flex items-center justify-center pt-12 md:pt-20">
                            <h2 className="text-4xl md:text-6xl font-black text-near-black tracking-tighter leading-tight">
                                Lost in the <span className="italic text-noble-blue underline decoration-electric-cyan/30">System?</span>
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="max-w-xl mx-auto space-y-12">
                    <p className="text-near-black/50 text-lg font-medium leading-relaxed">
                        The resource you're searching for has been moved or doesn't exist in our current ledger. 
                        Let's get you back to high-fidelity productivity.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link 
                            href="/"
                            className="w-full sm:w-auto h-16 px-12 rounded-2xl bg-near-black text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-noble-blue hover:scale-105 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] group"
                        >
                            <Home className="w-4 h-4" />
                            Return Home
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link 
                            href="/contact"
                            className="w-full sm:w-auto h-16 px-12 rounded-2xl bg-white border border-near-black/5 text-near-black font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-slate-50 hover:border-near-black/10 transition-all"
                        >
                            Report Issue
                            <Compass className="w-4 h-4 text-noble-blue" />
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Interaction / Status */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1 }}
                className="absolute bottom-12 left-0 right-0 overflow-hidden hidden lg:block"
            >
                <div className="flex items-center justify-center gap-12 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 text-[9px] font-black text-near-black/30 uppercase tracking-[0.5em]">
                            <span>• NOBEVRA OS</span>
                            <span>• VERSION 4.0.2</span>
                            <span>• STATUS: 404_NOT_FOUND</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Floating Geometric Elements */}
            <motion.div 
                animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute top-20 right-[15%] opacity-[0.03] pointer-events-none"
            >
                <Sparkles size={200} className="text-noble-blue" />
            </motion.div>
            <motion.div 
                animate={{ 
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                className="absolute bottom-20 left-[10%] opacity-[0.03] pointer-events-none"
            >
                <Zap size={240} className="text-electric-cyan" />
            </motion.div>
        </div>
    );
}

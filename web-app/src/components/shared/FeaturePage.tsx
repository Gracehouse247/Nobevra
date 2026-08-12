'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FeaturePage({ 
    title, 
    description, 
    icon, 
    tag 
}: { 
    title: string; 
    description: string; 
    icon: string;
    tag: string;
}) {
    return (
        <div className="min-h-screen bg-noble-surface dark:bg-noble-card pt-32 pb-20 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-8 border border-noble-blue/5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
                        {tag}
                    </div>
                    
                    <h1 className="text-h1 text-near-black mb-6 leading-tight">
                        {title}
                    </h1>
                    
                    <p className="text-body-lg text-near-black/60 mb-12 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mb-20">
                        <Link 
                            href="/register"
                            className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95" 
                            style={{ backgroundColor: '#166FBB' }}
                        >
                            Get Started Now <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                        <Link 
                            href="/#features"
                            className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
                        >
                            Back to Features
                        </Link>
                    </div>
                </motion.div>

                {/* Coming Soon Graphic Section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full h-[500px] rounded-[40px] bg-gradient-to-br from-[#F8FAFC] to-white border border-near-black/5 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    
                    <div className="w-24 h-24 rounded-3xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-8 relative">
                        <div className="absolute inset-0 bg-noble-blue/20 blur-2xl rounded-full" />
                        <span className="material-symbols-outlined text-5xl relative z-10">{icon}</span>
                    </div>
                    
                    <h2 className="text-3xl font-black text-near-black mb-4">Detailed Page Coming Soon</h2>
                    <p className="text-near-black/40 font-bold uppercase tracking-[0.2em] text-xs">Architectural Design in Progress</p>
                    
                    {/* Floating elements for aesthetic */}
                    <div className="absolute top-20 left-20 w-32 h-2 bg-noble-blue/10 rounded-full blur-sm rotate-12" />
                    <div className="absolute bottom-40 right-20 w-48 h-2 bg-electric-cyan/10 rounded-full blur-sm -rotate-6" />
                </motion.div>
            </div>
        </div>
    );
}

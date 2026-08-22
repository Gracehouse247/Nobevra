'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TemplateEngine } from '@/components/invoice/TemplateEngine';
import { TEMPLATES } from '@/lib/templates/templateRegistry';

const MOCK_DATA = {
    invoiceNumber: "INV-2026-001",
    date: "May 12, 2026",
    dueDate: "May 26, 2026",
    client: {
        name: "Acme Global Holdings",
        email: "finance@acme.com",
        address: "123 Enterprise Way, Silicon Valley, CA"
    },
    items: [
        { name: "Enterprise SaaS License", quantity: 1, price: 12000 },
        { name: "Custom Integration Services", quantity: 40, price: 150 },
        { name: "Dedicated Support (Annual)", quantity: 1, price: 2500 }
    ],
    subtotal: 20500,
    taxTotal: 1640,
    discountTotal: 0,
    total: 22140,
    currencySymbol: "$",
    sender: {
        company: "Nobevra Inc.",
        address: "7th Floor, Innovation Tower, London",
        brand_logo_url: "/images/logo.png"
    }
};

export default function LiveTemplatePreview() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const featuredTemplates = TEMPLATES.filter(t => ['plat-obsidian', 'prof-carbon-fiber', 'geo-navy-prism'].includes(t.id));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredTemplates.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [featuredTemplates.length]);

    const template = featuredTemplates[currentIndex];

    return (
        <div className="w-full h-full relative group/preview overflow-hidden rounded-[40px] bg-noble-surface border border-near-black/5 shadow-2xl">
            {/* Header / Labels */}
            <div className="absolute top-8 left-8 z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-noble-blue text-white font-bold text-[9px] uppercase tracking-widest shadow-lg mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-noble-surface animate-pulse" />
                    Live Engine
                </div>
                <h4 className="text-xl font-black text-near-black tracking-tight">{template.name}</h4>
            </div>

            <div className="absolute top-8 right-8 z-20">
                <div className="w-10 h-10 rounded-full bg-noble-surface/80 backdrop-blur-md flex items-center justify-center text-noble-blue shadow-lg border border-white">
                    <span className="material-symbols-outlined text-xl">auto_awesome</span>
                </div>
            </div>

            {/* The Scaled Template */}
            <div className="absolute inset-0 flex items-center justify-center pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="relative w-[1000px] h-[1414px] origin-center scale-[0.28] md:scale-[0.38] shadow-[0_50px_100px_rgba(0,0,0,0.15)] rounded-lg overflow-hidden"
                    >
                        <TemplateEngine 
                            template={{
                                ...template,
                                accentColor: '#166FBB'
                            }} 
                            data={MOCK_DATA} 
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Shine & Glass Effects */}
            <div className="absolute inset-0 bg-gradient-to-tr from-noble-blue/5 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute inset-0 translate-x-[-150%] group-hover/preview:translate-x-[150%] transition-transform duration-[1500ms] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-30deg] pointer-events-none" />
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEMPLATES } from '@/lib/templates/templateRegistry';
import { TemplateEngine } from '@/components/invoice/TemplateEngine';

export function InvoiceTemplateCarousel({ mockData }: { mockData: any }) {
    // Get up to 15 invoice templates
    const invoiceTemplates = TEMPLATES.filter(t => t.type === 'invoice').slice(0, 15);
    
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (invoiceTemplates.length <= 1) return;
        
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % invoiceTemplates.length);
        }, 3000); // cycle every 3 seconds

        return () => clearInterval(timer);
    }, [invoiceTemplates.length]);

    if (invoiceTemplates.length === 0) return null;

    const currentTemplate = invoiceTemplates[currentIndex];

    return (
        <div className="relative bg-noble-surface border border-gray-200 rounded-[32px] shadow-2xl overflow-hidden w-full max-w-md aspect-[1/1.414] group">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentTemplate.id}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-[1000px] h-[1414px] origin-top-left scale-[0.38] md:scale-[0.44] transition-transform duration-1000 ease-out group-hover:scale-[0.41] md:group-hover:scale-[0.46]"
                >
                    <TemplateEngine
                        template={{
                            ...currentTemplate,
                            accentColor: currentTemplate.accentColor || '#166FBB'
                        }}
                        data={mockData}
                    />
                </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-noble-blue/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg] pointer-events-none" />
            
            {/* Template name overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-noble-surface/90 backdrop-blur-md border border-white/40 rounded-xl p-3 shadow-lg flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <span className="text-sm font-bold text-near-black">{currentTemplate.name}</span>
                <span className="text-xs px-2 py-1 bg-noble-blue/10 text-noble-blue font-bold rounded-full">
                    {currentIndex + 1} / {invoiceTemplates.length}
                </span>
            </div>
        </div>
    );
}

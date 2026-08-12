'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Box, CheckCircle2, QrCode } from 'lucide-react';

const slides = [
    {
        title: 'Smart Business Toolkit',
        subtitle: 'Generate & manage professional invoicing, QR codes, and Business cards in one powerful dashboard.',
        icon: Box
    },
    {
        title: 'Invoicing Made Simple',
        subtitle: 'Create and send professional invoices in seconds. Stay organized with cloud-based tracking.',
        icon: CheckCircle2
    },
    {
        title: 'Smart QR Codes',
        subtitle: 'Create versatile QR codes for your business. From digital cards to contactless menus, share info instantly.',
        icon: QrCode
    }
];

export const QuickTour = ({ onComplete }: { onComplete: () => void }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F8FAFC]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="flex flex-col items-center max-w-md"
                >
                    {React.createElement(slides[currentSlide].icon, { className: "w-24 h-24 text-noble-blue mb-8" })}
                    <h2 className="text-3xl font-black text-noble-text mb-4">{slides[currentSlide].title}</h2>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12">
                        {slides[currentSlide].subtitle}
                    </p>
                </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 mb-12">
                {slides.map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-noble-blue' : 'w-2 bg-slate-200'}`} 
                    />
                ))}
            </div>

            <button 
                onClick={nextSlide}
                className="w-full max-w-sm py-4 bg-noble-blue text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
                {currentSlide === slides.length - 1 ? 'Start Setup' : 'Continue'} <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
                onClick={onComplete}
                className="mt-6 text-sm font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
            >
                Skip Tour
            </button>
        </div>
    );
};

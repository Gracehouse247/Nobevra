'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEMPLATES } from '@/lib/templates/templateRegistry';
import { TemplateEngine } from '@/components/invoice/TemplateEngine';
import PremiumBadge from '@/components/shared/PremiumBadge';
import Link from 'next/link';

const MOCK_DATA = {
  invoiceNumber: "INV-2026-001",
  date: "24 Aug 2026",
  dueDate: "07 Sep 2026",
  sender: {
    full_name: "Noble Studio",
    address: "100 Innovation Drive\nTech District, NY 10001",
    email: "billing@noblestudio.com",
    phone_number: "+1 (555) 123-4567",
    preferred_currency: "USD"
  },
  client: {
    name: "Acme Corp",
    address: "400 Business Pkwy\nSuite 200, CA 94016",
    email: "accounts@acme.corp"
  },
  items: [
    { name: "Premium Design Services", quantity: 1, price: 4005.00 },
    { name: "Brand Identity Consultation", quantity: 1, price: 500.00 }
  ],
  subtotal: 4505.00,
  taxTotal: 0,
  discountTotal: 5.00,
  total: 4500.00,
  currencySymbol: "$",
  currencyCode: "USD"
};

const SHOWCASE_COLORS = [
    { name: 'Noble Blue', value: '#166FBB' },
    { name: 'Electric Cyan', value: '#00D1FF' },
    { name: 'Indigo', value: '#312E81' },
    { name: 'Sunset', value: '#F97316' },
    { name: 'Emerald', value: '#059669' },
    { name: 'Royal', value: '#7C3AED' },
    { name: 'Rose', value: '#E11D48' },
    { name: 'Obsidian', value: '#111827' },
];

// User-selected high-impact templates for the landing page showcase
const SHOWCASE_TEMPLATES = TEMPLATES.filter(t => [
    'geo-purple', 
    'creative-wave', 
    'creative-swirl',
    'plat-obsidian',
    'plat-ivory-gold',
    'prof-carbon-fiber',
    'geo-navy-prism',
    'prof-dark-gold',
    'creative-fluid-wave',
    'plat-sapphire',
    'prof-emerald-nexus',
    'geo-onyx-glass'
].includes(t.id));

const CATEGORIES = ['Creative', 'Geometric', 'Platinum', 'Professional'];

interface TemplateShowcaseProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
}

export default function TemplateShowcase({ 
    title = (
        <>
            World-Class <span className="text-noble-blue">Invoice Design</span><br />Engineered for Authority.
        </>
    ),
    subtitle = "Every template is a masterpiece of financial clarity and brand authority. Choose a palette and watch your professional identity transform."
}: TemplateShowcaseProps) {
    const [activeColor, setActiveColor] = useState(SHOWCASE_COLORS[0].value);
    const [activeCategory, setActiveCategory] = useState('Creative');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section id="templates" className="py-32 bg-[#F8FAFC] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-noble-blue/5 blur-[120px] rounded-full -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-noble-blue/5 blur-[120px] rounded-full -ml-64 -mb-64" />
            
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                    <div className="max-w-2xl">
                        <h2 className="font-inter text-4xl md:text-6xl font-black text-near-black mb-6 leading-[1.1] tracking-tighter">
                            {title}
                        </h2>
                        <p className="text-body-lg text-near-black/70 font-medium">
                            {subtitle}
                        </p>
                    </div>

                    {/* Color Swatches & Filters Container */}
                    <div className="flex flex-col gap-8">
                        {/* Categories */}
                        <div className="flex flex-nowrap items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                        activeCategory === cat 
                                        ? 'bg-noble-blue text-white shadow-[0_10px_25px_rgba(22,111,187,0.4)] scale-105' 
                                        : 'bg-noble-surface text-near-black/60 border border-near-black/5 hover:border-near-black/20'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Color Swatches */}
                        <div className="bg-noble-surface p-6 rounded-[32px] border border-near-black/5 shadow-sm inline-flex flex-col">
                            <p className="text-[10px] font-black uppercase tracking-widest text-near-black/60 mb-4 ml-2">Brand Palette</p>
                            <div className="flex flex-wrap gap-3">
                                {SHOWCASE_COLORS.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => setActiveColor(color.value)}
                                        aria-label={`Select ${color.name} color`}
                                        className={`w-10 h-10 rounded-full transition-all duration-300 relative ${activeColor === color.value ? 'scale-125 shadow-lg' : 'hover:scale-110'}`}
                                        style={{ backgroundColor: color.value }}
                                    >
                                        {activeColor === color.value && (
                                            <motion.div 
                                                layoutId="activeColor"
                                                className="absolute -inset-1.5 rounded-full border-2"
                                                style={{ borderColor: color.value }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Templates Gallery */}
                <div className="relative group">
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar"
                    >
                        {SHOWCASE_TEMPLATES
                            .filter(t => activeCategory === 'All' || t.category.some(c => c.toLowerCase() === activeCategory.toLowerCase()))
                            .map((template, idx) => (
                            <motion.div
                                key={template.id}
                                layout
                                className="min-w-[280px] md:min-w-[380px] snap-start"
                            >
                                <motion.div 
                                    whileHover={{ 
                                        y: -20,
                                        rotateX: 2,
                                        rotateY: -2,
                                        scale: 1.02
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className="bg-noble-surface rounded-[40px] overflow-hidden border border-near-black/5 hover:border-noble-blue/40 transition-all duration-700 group/card relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_48px_96px_rgba(22,111,187,0.15)]"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {/* Real Template Preview */}
                                    <div className="aspect-[1/1.414] relative bg-noble-surface overflow-hidden">
                                        <div className="absolute top-0 left-0 w-[1000px] h-[1414px] origin-top-left scale-[0.28] md:scale-[0.38] transition-transform duration-1000 ease-out group-hover/card:scale-[0.31] md:group-hover/card:scale-[0.41]">
                                            <TemplateEngine 
                                                template={{
                                                    ...template,
                                                    accentColor: activeColor
                                                }} 
                                                data={MOCK_DATA} 
                                            />
                                        </div>
                                        
                                        {/* Pro Badge for every 3rd template */}
                                        {idx % 3 === 2 && (
                                            <div className="absolute top-6 right-6 z-20">
                                                <PremiumBadge tier="pro" />
                                            </div>
                                        )}

                                        {/* Premium Glass Overlay on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-noble-blue/15 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                        
                                        {/* Intense Shine Effect */}
                                        <div className="absolute inset-0 translate-x-[-150%] group-hover/card:translate-x-[150%] transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg] pointer-events-none" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    <button 
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-noble-surface shadow-2xl flex items-center justify-center text-near-black hover:bg-noble-blue hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                    >
                        <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-noble-surface shadow-2xl flex items-center justify-center text-near-black hover:bg-noble-blue hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                    >
                        <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                    </button>
                </div>

                {/* CTA Group */}
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        href="/register"
                        className="w-full sm:w-auto px-10 py-5 bg-noble-blue text-white rounded-2xl font-extrabold hover:bg-noble-blue/90 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-noble-blue/25 flex items-center justify-center gap-3"
                    >
                        Start Free
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                    </Link>

                    <Link 
                        href="/invoicing"
                        className="w-full sm:w-auto px-8 py-5 bg-white border border-slate-200 text-near-black rounded-2xl font-bold hover:border-noble-blue hover:text-noble-blue transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">visibility</span>
                        Explore Invoicing Platform
                    </Link>
                </div>
            </div>
        </section>
    );
}

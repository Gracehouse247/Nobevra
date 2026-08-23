'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        quote: "I used to spend my Sunday evenings organizing bills. I switched to Nobevra, set up automated recurring profiles, and bought my weekends back.",
        name: "Sarah T.",
        role: "Design Agency Founder",
        image: "/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png",
    },
    {
        quote: "Our marketplace generates hundreds of global leads daily. Nobevra's Lead Intelligence tools let us track intent perfectly, connecting marketing right to our revenue pipeline.",
        name: "Ayasha Khan",
        role: "Marketing Director, NobleMart Marketplace US Region",
        image: "/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png",
    },
    {
        quote: "Nobevra's secure client portal has transformed how our law firm handles billings. The transparency it provides to our clients is invaluable.",
        name: "Barr Emma Duruigbo",
        role: "Founder, Ducex Solicitors Ltd.",
        image: "/images/reviews/barr-emma-duruigbo-founder-of-ducex-solicitors-ltd.png",
    },
    {
        quote: "Tracking media production expenses used to be a nightmare. The Smart Expense Manager categorizes everything automatically across our team, saving us hours each week.",
        name: "Beautrice Moreau",
        role: "Operations Manager, Eagles Media",
        image: "/images/reviews/beautrice-moreau-operations-manager-at-eagles-media.png",
    },
    {
        quote: "The CRM engine keeps all our consulting engagements perfectly tracked. Knowing exactly when a client views an invoice saves us countless follow-up emails.",
        name: "Celestine Nzubbychukwu",
        role: "Founder, MyStaff Consulting Limited",
        image: "/images/reviews/celestine-nzubbychukwu-founder-of-mystaff-consulting-limited.png",
    },
    {
        quote: "Digital Business Cards with NFC have completely upgraded how our agents network. Being able to share portfolios and collect retainers instantly is a game changer for real estate.",
        name: "David Rodriguez",
        role: "Region Director, Surebricks Real Estate",
        image: "/images/reviews/david-rodriguez-region-director-for-surebricks-real-estate.png",
    },
    {
        quote: "The Inventory Hub is a game changer for our agricultural supplies. Real-time stock tracking connected directly to invoicing prevents stockouts entirely.",
        name: "Glory Ebasabor",
        role: "Founder, D-Amin Grow",
        image: "/images/reviews/glory-ebasabor-founder-of-d-amin-grow.jpeg",
    },
    {
        quote: "Managing international distribution requires flawless global settlements. The interbank conversion rates have saved our Asian supply chains thousands in hidden fees.",
        name: "Kenji Tanaka",
        role: "China Sales Manager, Bodyfit Ventures",
        image: "/images/reviews/kenji-tanaka-china-sales-manager-of-bodyfit-ventures.png",
    },
    {
        quote: "The precision of the invoice templates and automated payment collection gives our fintech startup the enterprise-grade look we need to build trust with investors.",
        name: "Kenneth Matthew",
        role: "CEO, FundMe Naija",
        image: "/images/reviews/kenneth-matthew-ceo-of-fundme-naija.jpeg",
    },
    {
        quote: "Contactless QR payments have sped up checkout times at the mall significantly. Our customers love the modern, seamless payment experience without extra hardware.",
        name: "Major EC Opumie",
        role: "Founder, Opuforty Mall",
        image: "/images/reviews/major-ec-opumie-fiunder-of-opuforty-mall.png",
    },
    {
        quote: "Nobevra completely streamlined our logistics billing. With the API integrations, our high-volume transactions are processed flawlessly every single day.",
        name: "McGerald Olfordile",
        role: "CEO, Rapidbox Limited",
        image: "/images/reviews/mcgerald-olfordile-ceo-of-rapidbox-limited.png",
    },
    {
        quote: "The Growth Reports dashboard provides our UK operations with incredible insights. The lifetime value mapping is top-tier for our B2B strategy.",
        name: "Micheal C.",
        role: "Business Strategist, Pure Insight UK",
        image: "/images/reviews/micheal-c-business-strategist-of-pure-insight-uk.png",
    },
    {
        quote: "Standardizing our hospitality packages in the Products & Services Catalog has saved our reception desk hours of manual billing input.",
        name: "Priya Sharma",
        role: "Managing Director, Wavecreast Beach Hotel",
        image: "/images/reviews/priya-sharma-managing-director-wavecreast-beach-hotel.png",
    },
    {
        quote: "The Professional Identity features allowed us to completely white-label our billing portal. Our ecommerce customers have a beautiful, cohesive brand experience.",
        name: "Rejoice Ahmed",
        role: "Director, JoiceCollections",
        image: "/images/reviews/rejoice-ahmed-director-of-joicecollections.jpeg",
    },
    {
        quote: "We unified our entire marketing agency's billing under the Elite Team Workspace. Role-based access ensures our accountants and creatives can collaborate securely.",
        name: "Samuel",
        role: "CEO, BodyFit Marketing & Sport Ltd.",
        image: "/images/reviews/samuel-ceo-of-bodyfit-marketing-sport-ltd.png",
    },
    {
        quote: "Scaling our manufacturing operations required a robust CRM. Nobevra connects our client pipelines directly to our massive inventory ledgers effortlessly.",
        name: "Timileyin Oluwafemi",
        role: "CEO, Ceejee Foam",
        image: "/images/reviews/timileyin-oluwafemi-ceo-of-ceejee-foam.jpeg",
    },
];

export default function SEOStatsSection() {
    const stats = [
        { value: '85%', label: 'Reduction in time spent drafting invoices', icon: 'schedule' },
        { value: '40%', label: 'Decrease in late payments within 60 days', icon: 'trending_up' },
        { value: '0 hrs', label: 'Spent manually reconciling paid invoices', icon: 'auto_mode' },
        { value: 'Global', label: 'Businesses billing with Nobevra', icon: 'groups' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }, []);

    // Auto-advance sliding timer (pauses completely when hovered)
    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(timer);
    }, [isHovered, nextSlide]);

    const currentReview = testimonials[currentIndex];

    return (
        <section
            className="py-24 md:py-32 relative overflow-hidden bg-[#F8FAFC] border-y border-slate-200/60"
            aria-label="Proven Results and Customer Reviews"
        >
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/8 border border-green-500/10 text-green-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Proven Results &amp; Verified Evidence
                    </div>

                    <h2 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
                        The numbers speak{' '}
                        <span className="text-noble-blue">for themselves.</span>
                    </h2>

                    <p className="text-base md:text-lg text-near-black/50 max-w-2xl mx-auto leading-relaxed">
                        Trusted by founders, agency owners, and growing enterprises worldwide to manage billing, pipelines, and revenue operations.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="group"
                        >
                            <div className="bg-noble-surface rounded-[24px] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 text-center h-full flex flex-col items-center justify-center">
                                <div className="w-12 h-12 rounded-2xl bg-noble-blue/8 flex items-center justify-center mb-5 group-hover:bg-noble-blue group-hover:shadow-lg group-hover:shadow-noble-blue/20 transition-all duration-300">
                                    <span className="material-symbols-outlined text-noble-blue group-hover:text-white transition-colors text-xl">{stat.icon}</span>
                                </div>
                                <p className="text-3xl md:text-4xl font-black text-near-black tracking-tight mb-2">{stat.value}</p>
                                <p className="text-xs md:text-sm text-near-black/40 font-bold leading-snug">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Unified One-at-a-Time Testimonial Slider ("Sarah T." Design Architecture) */}
                <div
                    className="max-w-3xl mx-auto relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Navigation Prev Button */}
                    <button
                        onClick={prevSlide}
                        aria-label="Previous review"
                        className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-noble-surface border border-slate-200/80 shadow-md text-near-black hover:bg-noble-blue hover:text-white hover:border-noble-blue transition-all items-center justify-center z-20 focus-visible:ring-2 focus-visible:ring-noble-blue focus-visible:outline-none"
                    >
                        <span className="material-symbols-outlined text-xl" aria-hidden="true">chevron_left</span>
                    </button>

                    {/* Navigation Next Button */}
                    <button
                        onClick={nextSlide}
                        aria-label="Next review"
                        className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-noble-surface border border-slate-200/80 shadow-md text-near-black hover:bg-noble-blue hover:text-white hover:border-noble-blue transition-all items-center justify-center z-20 focus-visible:ring-2 focus-visible:ring-noble-blue focus-visible:outline-none"
                    >
                        <span className="material-symbols-outlined text-xl" aria-hidden="true">chevron_right</span>
                    </button>

                    {/* Active Slide Card */}
                    <div className="bg-noble-surface rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-xl relative overflow-hidden min-h-[320px] flex flex-col justify-between">
                        {/* Decorative quote mark */}
                        <div className="absolute top-4 left-6 text-noble-blue/8 text-[120px] font-serif leading-none pointer-events-none select-none" aria-hidden="true">
                            &ldquo;
                        </div>

                        {/* Interactive Pause Indicator on Hover */}
                        {isHovered && (
                            <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider animate-fadeIn">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                Paused on Hover
                            </div>
                        )}

                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: direction === 1 ? 40 : -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction === 1 ? -40 : 40 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="relative z-10 text-center flex flex-col justify-between h-full"
                            >
                                <div>
                                    {/* 5-star rating */}
                                    <div className="flex gap-1 justify-center mb-6" aria-label="5 out of 5 stars">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <span key={i} className="text-yellow-400 text-lg select-none">★</span>
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="text-lg md:text-2xl text-near-black/85 font-medium leading-relaxed mb-8 italic max-w-2xl mx-auto">
                                        &ldquo;{currentReview.quote}&rdquo;
                                    </blockquote>
                                </div>

                                {/* Author info */}
                                <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-50">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-noble-blue/20 shadow-sm shrink-0">
                                        <Image
                                            src={currentReview.image}
                                            alt={currentReview.name}
                                            className="w-full h-full object-cover"
                                            width={56}
                                            height={56}
                                            sizes="56px"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-black text-near-black text-base">{currentReview.name}</p>
                                        <p className="text-near-black/50 text-xs font-bold uppercase tracking-wider">{currentReview.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Pagination Dots & Controls */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <button
                            onClick={prevSlide}
                            aria-label="Previous review"
                            className="md:hidden p-2 rounded-full text-near-black hover:text-noble-blue"
                        >
                            <span className="material-symbols-outlined text-lg">chevron_left</span>
                        </button>

                        <div className="flex items-center gap-1.5 flex-wrap justify-center">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setDirection(idx > currentIndex ? 1 : -1);
                                        setCurrentIndex(idx);
                                    }}
                                    className="p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-noble-blue rounded-full"
                                    aria-label={`Go to review ${idx + 1}`}
                                    aria-current={currentIndex === idx ? 'true' : 'false'}
                                >
                                    <span
                                        className={`block rounded-full transition-all duration-300 ${
                                            currentIndex === idx
                                                ? 'bg-noble-blue w-6 h-2.5 shadow-sm'
                                                : 'bg-near-black/15 hover:bg-near-black/30 w-2.5 h-2.5'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            aria-label="Next review"
                            className="md:hidden p-2 rounded-full text-near-black hover:text-noble-blue"
                        >
                            <span className="material-symbols-outlined text-lg">chevron_right</span>
                        </button>
                    </div>

                    {/* Counter indicator */}
                    <p className="text-center text-[11px] font-mono text-near-black/40 font-bold mt-4">
                        {currentIndex + 1} of {testimonials.length} Verified Founder Experiences
                    </p>
                </div>
            </div>
        </section>
    );
}

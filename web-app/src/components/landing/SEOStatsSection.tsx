'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "I used to spend my Sunday evenings organizing bills. I switched to Nobevra, set up automated recurring profiles, and bought my weekends back.",
        name: "Sarah T.",
        role: "Design Agency Founder",
        image: "/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png",
        featured: true
    },
    {
        quote: "Our marketplace generates hundreds of global leads daily. Nobevra's Lead Intelligence tools let us track intent perfectly, connecting marketing right to our revenue pipeline.",
        name: "Ayasha Khan",
        role: "Marketing Director, NobleMart Marketplace US Region",
        image: "/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png",
        featured: false
    },
    {
        quote: "Nobevra's secure client portal has transformed how our law firm handles billings. The transparency it provides to our clients is invaluable.",
        name: "Barr Emma Duruigbo",
        role: "Founder, Ducex Solicitors Ltd.",
        image: "/images/reviews/barr-emma-duruigbo-founder-of-ducex-solicitors-ltd.png",
        featured: false
    },
    {
        quote: "Tracking media production expenses used to be a nightmare. The Smart Expense Manager categorizes everything automatically across our team, saving us hours each week.",
        name: "Beautrice Moreau",
        role: "Operations Manager, Eagles Media",
        image: "/images/reviews/beautrice-moreau-operations-manager-at-eagles-media.png",
        featured: true
    },
    {
        quote: "The CRM engine keeps all our consulting engagements perfectly tracked. Knowing exactly when a client views an invoice saves us countless follow-up emails.",
        name: "Celestine Nzubbychukwu",
        role: "Founder, MyStaff Consulting Limited",
        image: "/images/reviews/celestine-nzubbychukwu-founder-of-mystaff-consulting-limited.png",
        featured: false
    },
    {
        quote: "Digital Business Cards with NFC have completely upgraded how our agents network. Being able to share portfolios and collect retainers instantly is a game changer for real estate.",
        name: "David Rodriguez",
        role: "Region Director, Surebricks Real Estate",
        image: "/images/reviews/david-rodriguez-region-director-for-surebricks-real-estate.png",
        featured: false
    },
    {
        quote: "The Inventory Hub is a game changer for our agricultural supplies. Real-time stock tracking connected directly to invoicing prevents stockouts entirely.",
        name: "Glory Ebasabor",
        role: "Founder, D-Amin Grow",
        image: "/images/reviews/glory-ebasabor-founder-of-d-amin-grow.jpeg",
        featured: true
    },
    {
        quote: "Managing international distribution requires flawless global settlements. The interbank conversion rates have saved our Asian supply chains thousands in hidden fees.",
        name: "Kenji Tanaka",
        role: "China Sales Manager, Bodyfit Ventures",
        image: "/images/reviews/kenji-tanaka-china-sales-manager-of-bodyfit-ventures.png",
        featured: false
    },
    {
        quote: "The precision of the invoice templates and automated payment collection gives our fintech startup the enterprise-grade look we need to build trust with investors.",
        name: "Kenneth Matthew",
        role: "CEO, FundMe Naija",
        image: "/images/reviews/kenneth-matthew-ceo-of-fundme-naija.jpeg",
        featured: false
    },
    {
        quote: "Contactless QR payments have sped up checkout times at the mall significantly. Our customers love the modern, seamless payment experience without extra hardware.",
        name: "Major EC Opumie",
        role: "Founder, Opuforty Mall",
        image: "/images/reviews/major-ec-opumie-fiunder-of-opuforty-mall.png",
        featured: true
    },
    {
        quote: "Nobevra completely streamlined our logistics billing. With the API integrations, our high-volume transactions are processed flawlessly every single day.",
        name: "McGerald Olfordile",
        role: "CEO, Rapidbox Limited",
        image: "/images/reviews/mcgerald-olfordile-ceo-of-rapidbox-limited.png",
        featured: false
    },
    {
        quote: "The Growth Reports dashboard provides our UK operations with incredible insights. The lifetime value mapping is top-tier for our B2B strategy.",
        name: "Micheal C.",
        role: "Business Strategist, Pure Insight UK",
        image: "/images/reviews/micheal-c-business-strategist-of-pure-insight-uk.png",
        featured: false
    },
    {
        quote: "Standardizing our hospitality packages in the Products & Services Catalog has saved our reception desk hours of manual billing input.",
        name: "Priya Sharma",
        role: "Managing Director, Wavecreast Beach Hotel",
        image: "/images/reviews/priya-sharma-managing-director-wavecreast-beach-hotel.png",
        featured: true
    },
    {
        quote: "The Professional Identity features allowed us to completely white-label our billing portal. Our ecommerce customers have a beautiful, cohesive brand experience.",
        name: "Rejoice Ahmed",
        role: "Director, JoiceCollections",
        image: "/images/reviews/rejoice-ahmed-director-of-joicecollections.jpeg",
        featured: false
    },
    {
        quote: "We unified our entire marketing agency's billing under the Elite Team Workspace. Role-based access ensures our accountants and creatives can collaborate securely.",
        name: "Samuel",
        role: "CEO, BodyFit Marketing & Sport Ltd.",
        image: "/images/reviews/samuel-ceo-of-bodyfit-marketing-sport-ltd.png",
        featured: false
    },
    {
        quote: "Scaling our manufacturing operations required a robust CRM. Nobevra connects our client pipelines directly to our massive inventory ledgers effortlessly.",
        name: "Timileyin Oluwafemi",
        role: "CEO, Ceejee Foam",
        image: "/images/reviews/timileyin-oluwafemi-ceo-of-ceejee-foam.jpeg",
        featured: true
    }
];

export default function SEOStatsSection() {
    const stats = [
        { value: '85%', label: 'Reduction in time spent drafting invoices', icon: 'schedule' },
        { value: '40%', label: 'Decrease in late payments within 60 days', icon: 'trending_up' },
        { value: '0 hrs', label: 'Spent manually reconciling paid invoices', icon: 'auto_mode' },
        { value: 'Global', label: 'Businesses billing with Nobevra', icon: 'groups' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isHovered) return;
        
        const maxIndex = Math.max(0, testimonials.length - itemsPerView);
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 4000);
        
        return () => clearInterval(timer);
    }, [itemsPerView, isHovered]);

    const handleDotClick = (index: number) => {
        const maxIndex = Math.max(0, testimonials.length - itemsPerView);
        setCurrentIndex(Math.min(index, maxIndex));
    };

    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-[#F8FAFC]">
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
                        Proven Results
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
                        The numbers speak{' '}
                        <span className="text-noble-blue">for themselves.</span>
                    </h2>
                    <p className="text-base md:text-lg text-near-black/50 max-w-2xl mx-auto leading-relaxed">
                        Businesses across the world are switching to our <strong className="text-near-black/70">billing software online</strong>. Here is what happens when they do.
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

                {/* Featured Testimonial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <div className="bg-noble-surface rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
                        {/* Decorative quote mark */}
                        <div className="absolute top-4 left-6 text-noble-blue/8 text-[120px] font-serif leading-none pointer-events-none select-none">&ldquo;</div>
                        
                        <div className="relative z-10">
                            <div className="flex gap-1 justify-center mb-6">
                                {[1,2,3,4,5].map(i => (
                                    <span key={i} className="text-yellow-400 text-lg">★</span>
                                ))}
                            </div>
                            <blockquote className="text-lg md:text-xl text-near-black/80 font-medium leading-relaxed mb-8 italic">
                                &quot;I used to spend my Sunday evenings organizing bills. I switched to Nobevra, set up automated recurring profiles, and bought my weekends back.&quot;
                            </blockquote>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-noble-blue/20 shadow-sm">
                                    <Image
                                        src="/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png"
                                        alt="Sarah T. — Design Agency Founder"
                                        className="w-full h-full object-cover"
                                        width={48}
                                        height={48}
                                        sizes="48px"
                                    />
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-near-black text-sm">Sarah T.</p>
                                    <p className="text-near-black/40 text-xs font-bold uppercase tracking-wider">Design Agency Founder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Review Carousel */}
                <div className="mt-24 md:mt-32">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-blue-800 font-bold text-[10px] uppercase tracking-widest mb-4">
                            Global Reach
                        </div>
                        <h3 className="font-inter text-3xl md:text-4xl font-black text-near-black tracking-tight">
                            Trusted by the <span className="text-noble-blue">Next Generation</span> of Founders.
                        </h3>
                    </div>

                    <div 
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="overflow-hidden pb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
                            <motion.div 
                                className="flex"
                                animate={{ 
                                    x: `calc(-${currentIndex * (100 / itemsPerView)}%)` 
                                }}
                                transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                            >
                                {testimonials.map((testimonial, idx) => (
                                    <div 
                                        key={idx} 
                                        className="px-4 shrink-0"
                                        style={{ width: `${100 / itemsPerView}%` }}
                                    >
                                        <div className={`h-full flex flex-col p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 group border ${testimonial.featured ? 'bg-noble-blue text-white shadow-xl shadow-noble-blue/20 border-noble-blue' : 'bg-noble-surface text-near-black border-slate-100'}`}>
                                            <div className="flex gap-1 mb-6">
                                                {[1,2,3,4,5].map(i => (
                                                    <span key={i} className={`material-symbols-outlined text-sm ${testimonial.featured ? 'text-white/80' : 'text-yellow-400'}`}>star</span>
                                                ))}
                                            </div>
                                            <p className={`text-base font-medium mb-8 leading-relaxed ${testimonial.featured ? 'text-white' : 'text-slate-800'}`}>
                                                "{testimonial.quote}"
                                            </p>
                                            <div className="flex items-center gap-4 mt-auto">
                                                <div className={`w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 shadow-sm ${testimonial.featured ? 'bg-noble-surface/10 border-white/20' : 'bg-slate-100 border-white'}`}>
                                                    <Image src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover object-center" width={40} height={40} sizes="40px" />
                                                </div>
                                                <div>
                                                    <p className={`font-black text-sm uppercase ${testimonial.featured ? 'text-white' : 'text-near-black'}`}>{testimonial.name}</p>
                                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${testimonial.featured ? 'text-white/60' : 'text-near-black/40'}`}>{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Pagination Dots — enlarged touch targets for accessibility */}
                        <div className="flex justify-center gap-1 mt-8 flex-wrap max-w-xl mx-auto">
                            {Array.from({ length: Math.max(1, testimonials.length - itemsPerView + 1) }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleDotClick(idx)}
                                    className="p-2.5 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-noble-blue rounded-full"
                                    aria-label={`Go to slide ${idx + 1}`}
                                >
                                    <span className={`block rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-noble-blue w-5 h-2.5' : 'bg-near-black/10 hover:bg-near-black/20 w-2.5 h-2.5'}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

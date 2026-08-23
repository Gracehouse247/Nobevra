'use client';

import React from 'react';
import SavingsCalculator from '@/components/landing/SavingsCalculator';
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import Footer from '@/components/shared/Footer';

// Extracted Components
import HeroSection from '@/components/landing/HeroSection';
import PartnersMarquee from '@/components/landing/PartnersMarquee';
import FeaturesBento from '@/components/landing/FeaturesBento';
import LandingCRM from '@/components/landing/LandingCRM';
import FinalCTA from '@/components/landing/FinalCTA';

// SEO Optimized Sections
import SEOProblemSection from '@/components/landing/SEOProblemSection';
import SEOSolutionSection from '@/components/landing/SEOSolutionSection';
import SEOCashFlowSection from '@/components/landing/SEOCashFlowSection';
import SEOStatsSection from '@/components/landing/SEOStatsSection';
import SEOQualifierFAQ from '@/components/landing/SEOQualifierFAQ';

export default function FormalHomepage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased selection:bg-electric-cyan/30 overflow-x-hidden pt-[118px]">
            <HeroSection />
            <PartnersMarquee />
            
            {/* The Problem (Contrarian Hook) */}
            <SEOProblemSection />
            
            {/* The Nobevra Approach (Bento Grid) */}
            <SEOSolutionSection />
            
            <FeaturesBento />
            <TemplateShowcase />
            
            {/* 14-Day Cash Flow Gap (Information Gain) */}
            <SEOCashFlowSection />
            
            {/* Savings Calculator Section */}
            <section className="py-24 md:py-32 relative overflow-hidden">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10 text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                        Return on Investment
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                        Reclaim <span className="text-noble-blue">20+ Hours</span> Every Month.
                    </h2>
                    <p className="text-base md:text-lg text-near-black/50 max-w-2xl mx-auto leading-relaxed">
                        Calculate exactly how much you're losing to manual billing and how much you'll gain with Nobevra.
                    </p>
                </div>
                <div className="px-4 md:px-16">
                    <SavingsCalculator />
                </div>
            </section>

            {/* Stats & Featured Social Proof */}
            <SEOStatsSection />

            <LandingCRM />
            
            {/* Not For You & FAQ */}
            <SEOQualifierFAQ />
            
            <FinalCTA />
            <Footer />
        </div>
    );
}

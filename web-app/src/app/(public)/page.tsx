import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/shared/Footer';

// Core Landing Components
import HeroSection from '@/components/landing/HeroSection';
import PartnersMarquee from '@/components/landing/PartnersMarquee';
import SEOProblemSection from '@/components/landing/SEOProblemSection';
import RunSection from '@/components/landing/RunSection';
import ConnectSection from '@/components/landing/ConnectSection';
import GrowSection from '@/components/landing/GrowSection';
import PlatformEcosystemSection from '@/components/landing/PlatformEcosystemSection';
import FeaturesBento from '@/components/landing/FeaturesBento';
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import SEOStatsSection from '@/components/landing/SEOStatsSection';
import SecurityTrustSection from '@/components/landing/SecurityTrustSection';
import PricingSnapshotSection from '@/components/landing/PricingSnapshotSection';
import SEOQualifierFAQ from '@/components/landing/SEOQualifierFAQ';
import FinalCTA from '@/components/landing/FinalCTA';

export const metadata: Metadata = {
    title: 'Nobevra — Intelligent Business Operating System | Invoicing, CRM & More',
    description: 'Run your business from one intelligent platform. Nobevra combines invoicing, CRM, expenses, payments, AI, business identity, teams and business intelligence. Start free.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng',
    },
    openGraph: {
        title: 'Nobevra — The Intelligent Business Operating System',
        description: 'Everything your business needs. One intelligent platform. Run. Connect. Grow.',
        url: 'https://nobevra.noblesworld.com.ng',
        siteName: 'NOBEVRA',
        images: [
            {
                url: '/images/Nobevra1.png',
                width: 1536,
                height: 1024,
                alt: 'Nobevra — The Intelligent Business Operating System',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nobevra — Intelligent Business Operating System',
        description: 'Run your business from one intelligent platform. Invoicing, CRM, expenses, payments, AI & more.',
        images: ['/images/Nobevra1.png'],
    },
};

export default function LandingPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased selection:bg-electric-cyan/30 overflow-x-hidden pt-[118px]">
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. Brand & Ecosystem Marquee */}
            <PartnersMarquee />

            {/* 3. The Business Fragmentation Problem */}
            <SEOProblemSection />

            {/* 4. RUN Pillar — Invoicing, Expenses, Products, Payments */}
            <RunSection />

            {/* 5. CONNECT Pillar — CRM, Client Portal, Business Identity, QR, Teams */}
            <ConnectSection />

            {/* 6. GROW Pillar — AI Intelligence, Reports, Lead Analytics */}
            <GrowSection />

            {/* 7. Unified Ecosystem — Web + Android + iOS Cross-Device Platform */}
            <PlatformEcosystemSection />

            {/* 8. Feature Deep Dive Bento Grid */}
            <FeaturesBento />

            {/* 9. Template Engine Showcase */}
            <TemplateShowcase />

            {/* 10. Customer Proof & Testimonials */}
            <SEOStatsSection />

            {/* 11. Security, Data Privacy & Trust */}
            <SecurityTrustSection />

            {/* 12. Transparent Pricing Snapshot */}
            <PricingSnapshotSection />

            {/* 13. Comprehensive FAQ */}
            <SEOQualifierFAQ />

            {/* 14. Final Conversion Call To Action */}
            <FinalCTA />

            {/* 15. Standardized Footer */}
            <Footer />
        </div>
    );
}

import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/shared/Footer';

// 19-Section Information Architecture Components
import HeroSection from '@/components/landing/HeroSection';
import PartnersMarquee from '@/components/landing/PartnersMarquee';
import SEOProblemSection from '@/components/landing/SEOProblemSection';
import RunSection from '@/components/landing/RunSection';
import ConnectSection from '@/components/landing/ConnectSection';
import GrowSection from '@/components/landing/GrowSection';
import PlatformEcosystemSection from '@/components/landing/PlatformEcosystemSection';
import FeaturesBento from '@/components/landing/FeaturesBento';
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import CRMDeepDive from '@/components/landing/CRMDeepDive';
import ExpensesProductsDeepDive from '@/components/landing/ExpensesProductsDeepDive';
import PaymentsDeepDive from '@/components/landing/PaymentsDeepDive';
import AIDeepDive from '@/components/landing/AIDeepDive';
import IdentityNFCDeepDive from '@/components/landing/IdentityNFCDeepDive';
import TeamsScalingDeepDive from '@/components/landing/TeamsScalingDeepDive';
import SEOStatsSection from '@/components/landing/SEOStatsSection';
import SecurityTrustSection from '@/components/landing/SecurityTrustSection';
import PricingSnapshotSection from '@/components/landing/PricingSnapshotSection';
import SEOQualifierFAQ from '@/components/landing/SEOQualifierFAQ';
import FinalCTA from '@/components/landing/FinalCTA';

export const metadata: Metadata = {
    title: 'Nobevra — Intelligent Business Operating System | Invoicing, CRM & More',
    description: 'Run your business from one intelligent platform. Nobevra combines invoicing, CRM, expenses, payments, AI, business identity, teams and business intelligence.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng',
        languages: {
            'en': 'https://nobevra.noblesworld.com.ng',
            'en-US': 'https://nobevra.noblesworld.com.ng',
            'en-NG': 'https://nobevra.noblesworld.com.ng',
            'x-default': 'https://nobevra.noblesworld.com.ng',
        },
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
            {/* 1. Hero */}
            <HeroSection />

            {/* 2. Immediate Platform Value & Architecture */}
            <PartnersMarquee />

            {/* 2b. The Business Fragmentation Problem */}
            <SEOProblemSection />

            {/* 3. RUN Pillar Overview */}
            <RunSection />

            {/* 4. CONNECT Pillar Overview */}
            <ConnectSection />

            {/* 5. GROW Pillar Overview */}
            <GrowSection />

            {/* 6. Unified Ecosystem Visualization */}
            <PlatformEcosystemSection />

            {/* 7. Invoicing Acquisition Section */}
            <FeaturesBento />
            <TemplateShowcase />

            {/* 8. CRM Section */}
            <CRMDeepDive />

            {/* 9. Expenses and Products Section */}
            <ExpensesProductsDeepDive />

            {/* 10. Payments Section */}
            <PaymentsDeepDive />

            {/* 11. AI Section */}
            <AIDeepDive />

            {/* 12. Business Identity / QR / NFC */}
            <IdentityNFCDeepDive />

            {/* 13. Teams and Enterprise Scaling */}
            <TeamsScalingDeepDive />

            {/* 14. Customer Social Proof */}
            <SEOStatsSection />

            {/* 15. Security and Trust */}
            <SecurityTrustSection />

            {/* 16. Pricing */}
            <PricingSnapshotSection />

            {/* 17. FAQ */}
            <SEOQualifierFAQ />

            {/* 18. Final CTA */}
            <FinalCTA />

            {/* 19. Footer */}
            <Footer />
        </div>
    );
}

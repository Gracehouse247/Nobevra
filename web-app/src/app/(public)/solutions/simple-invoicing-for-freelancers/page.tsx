import React from 'react';
import type { Metadata } from 'next';

// Shared Components
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import Footer from '@/components/shared/Footer';
import SEOStatsSection from '@/components/landing/SEOStatsSection';
import FreelancerQualifierFAQ from '@/components/landing/freelancers/FreelancerQualifierFAQ';
import FinalCTA from '@/components/landing/FinalCTA';

// Freelancer Specific Components
import FreelancerHeroSection from '@/components/landing/freelancers/FreelancerHeroSection';
import FreelancerHowToSection from '@/components/landing/freelancers/FreelancerHowToSection';
import FreelancerComparisonSection from '@/components/landing/freelancers/FreelancerComparisonSection';
import FreelancerFeaturesBento from '@/components/landing/freelancers/FreelancerFeaturesBento';
import PsychologicalImpactSection from '@/components/landing/freelancers/PsychologicalImpactSection';
import GhostingFrameworkSection from '@/components/landing/freelancers/GhostingFrameworkSection';
import FreelancerROISection from '@/components/landing/freelancers/FreelancerROISection';

// SEO Metadata matching SEO_BEST_PRACTICES.md
export const metadata: Metadata = {
    title: 'Freelance Invoicing Software — Simple, Fast Billing for Solopreneurs | Nobevra',
    description: 'Simple, powerful invoicing software for freelancers. Create branded invoices in 30 seconds, track client views, and get paid internationally with zero setup hassle.',
    keywords: 'simple invoicing for freelancers, invoice tool for freelancers, self-employed billing, Freelance billing software, professional invoice for freelancers, invoice app for self employed',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/solutions/simple-invoicing-for-freelancers',
    },
};

export default function FreelancersLandingPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased selection:bg-electric-cyan/30 overflow-x-hidden pt-[118px]">
            {/* H1 and Hero */}
            <FreelancerHeroSection />

            {/* How-To Step-by-Step Guide */}
            <FreelancerHowToSection />

            {/* Software vs Templates Comparison */}
            <FreelancerComparisonSection />
            
            {/* Information Gain 1 — Imposter Syndrome */}
            <PsychologicalImpactSection />

            {/* Freelancer Feature Grid — purpose-built for self-employed professionals */}
            <FreelancerFeaturesBento />

            
            {/* Invoice Templates — freelancer-specific heading via props */}
            <TemplateShowcase
                title={
                    <>Pick a template that matches your <span className="text-noble-blue">freelance brand.</span></>
                }
                subtitle="Every template works as a professional invoice for freelancers. Customize with your logo and brand colors in seconds — your clients will notice the difference."
            />
            
            {/* Information Gain 2 — Ghosting Framework */}
            <GhostingFrameworkSection />
            
            {/* ROI Section — freelancer-specific editorial design */}
            <FreelancerROISection />
            
            {/* Stats and Reviews */}
            <SEOStatsSection />
            
            {/* FAQ + Not For You — 100% freelancer-specific */}
            <FreelancerQualifierFAQ />
            
            <FinalCTA />
            <Footer />
        </div>
    );
}

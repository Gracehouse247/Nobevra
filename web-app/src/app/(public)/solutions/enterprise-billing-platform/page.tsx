import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/shared/Footer';

// Custom Enterprise Components
import EnterpriseHeroSection from '@/components/landing/enterprise/EnterpriseHeroSection';
import EnterpriseProblemSection from '@/components/landing/enterprise/EnterpriseProblemSection';
import EnterpriseFailureSection from '@/components/landing/enterprise/EnterpriseFailureSection';
import EnterpriseFrameworkSection from '@/components/landing/enterprise/EnterpriseFrameworkSection';
import EnterpriseDeliverables from '@/components/landing/enterprise/EnterpriseDeliverables';
import EnterpriseProcess from '@/components/landing/enterprise/EnterpriseProcess';
import EnterpriseCaseStudy from '@/components/landing/enterprise/EnterpriseCaseStudy';
import EnterpriseFAQ from '@/components/landing/enterprise/EnterpriseFAQ';
import EnterpriseCTA from '@/components/landing/enterprise/EnterpriseCTA';

/* ── SEO Metadata ─────────────────────────────────────────────────
   Focus Keyword    : enterprise billing platform
   Semantic Keywords: enterprise invoice management, corporate billing solutions,
                      api invoicing integration, enterprise accounts receivable software,
                      automated enterprise billing, large business billing software,
                      multi currency invoicing software, enterprise invoicing software,
                      high volume invoicing software
──────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
    title: 'Enterprise Billing Platform — High-Volume Financial Infrastructure | Nobevra',
    description: 'Scale financial operations with Nobevra Enterprise. High-volume billing APIs, dedicated database instances, custom SLAs, SSO/SAML, and multi-entity support.',
    keywords: [
        'enterprise billing platform',
        'enterprise invoice management',
        'corporate billing solutions',
        'api invoicing integration',
        'enterprise accounts receivable software',
        'automated enterprise billing',
        'large business billing software',
        'multi currency invoicing software',
        'enterprise invoicing software',
        'high volume invoicing software',
    ],
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/solutions/enterprise-billing-platform',
    },
    openGraph: {
        title: 'Enterprise Billing Platform | Nobevra',
        description: 'Scale your billing operations globally with automated enterprise billing, API integration, and multi-currency support.',
        url: 'https://nobevra.noblesworld.com.ng/solutions/enterprise-billing-platform',
        type: 'website',
    },
};

/* ── JSON-LD Schema ─────────────────────────────────────────────── */
const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nobevra Enterprise Billing Platform",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

export default function EnterpriseSolutionPage() {
    return (
        <div className="bg-white text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

            {/* 1. Hero */}
            <EnterpriseHeroSection />

            {/* 2. Problem Explanation (Information Gain 1) */}
            <EnterpriseProblemSection />

            {/* 3. Why Businesses Fail */}
            <EnterpriseFailureSection />

            {/* 4. The Framework (Information Gain 2) */}
            <EnterpriseFrameworkSection />

            {/* 5. Service Deliverables */}
            <EnterpriseDeliverables />

            {/* 6. Process Breakdown */}
            <EnterpriseProcess />

            {/* 7. Case Study */}
            <EnterpriseCaseStudy />

            {/* 8. FAQ (With 'Not right for you' qualifier) */}
            <EnterpriseFAQ />

            {/* 9. Soft CTA */}
            <EnterpriseCTA />

            <Footer />
        </div>
    );
}

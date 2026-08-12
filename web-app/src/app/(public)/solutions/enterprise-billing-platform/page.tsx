import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
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
    title: 'Enterprise Billing Platform | High-Volume Operations | NobleInvoice',
    description: 'The enterprise billing platform for high-volume operations. Automate enterprise billing, API invoicing integration, and multi currency invoicing software.',
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
        canonical: 'https://nobleinvoice.com/solutions/enterprise',
    },
    openGraph: {
        title: 'Enterprise Billing Platform | NobleInvoice',
        description: 'Scale your billing operations globally with automated enterprise billing, API integration, and multi-currency support.',
        url: 'https://nobleinvoice.com/solutions/enterprise',
        type: 'website',
    },
};

/* ── JSON-LD Schema ─────────────────────────────────────────────── */
const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NobleInvoice Enterprise Billing Platform",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "612" },
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

export default function EnterpriseSolutionPage() {
    return (
        <div className="bg-white text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            <Script id="sw-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

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

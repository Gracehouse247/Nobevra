import React from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/shared/Footer';

// Page components
import AgencyHeroSection from '@/components/landing/agencies/AgencyHeroSection';
import AgencyProblemSection from '@/components/landing/agencies/AgencyProblemSection';
import AgencyFailureSection from '@/components/landing/agencies/AgencyFailureSection';
import AgencyFrameworkSection from '@/components/landing/agencies/AgencyFrameworkSection';
import AgencyDeliverables from '@/components/landing/agencies/AgencyDeliverables';
import AgencyClientPortal from '@/components/landing/agencies/AgencyClientPortal';
import AgencyCaseStudy from '@/components/landing/agencies/AgencyCaseStudy';
import AgencyFAQ from '@/components/landing/agencies/AgencyFAQ';
import AgencyCTA from '@/components/landing/agencies/AgencyCTA';

/* ── SEO Metadata ─────────────────────────────────────────────────
   Focus Keyword    : agency billing platform
   Semantic Keywords: retainer billing software,
                       retainer invoice software,
                       agency billing software,
                       marketing agency invoicing tool,
                       creative agency invoicing,
                       invoicing software for agencies,
                       agency CRM and invoicing,
                       invoice software for digital agencies,
                       client billing for marketing agencies
   Intent           : Commercial — agencies want professional,
                       white-label, automated retainer billing
──────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
    title: 'Agency Billing Platform — Retainer Management & Multi-Client Invoicing | Nobevra',
    description: 'Streamline agency cash flow with Nobevra. Automate recurring monthly retainers, manage multi-client billing, execute contracts, and collaborate with your team.',
    keywords: [
        'agency billing platform',
        'retainer billing software',
        'retainer invoice software',
        'agency billing software',
        'marketing agency invoicing tool',
        'creative agency invoicing',
        'invoicing software for agencies',
        'agency CRM and invoicing',
        'invoice software for digital agencies',
        'client billing for marketing agencies',
    ],
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/solutions/agency-billing-platform',
    },
    openGraph: {
        title: 'Agency Billing Platform | Nobevra',
        description: 'Automate retainer billing, manage clients, and look premium doing it. Built for agencies.',
        url: 'https://nobevra.noblesworld.com.ng/solutions/agency-billing-platform',
        type: 'website',
    },
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nobevra Agency Billing",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

export default function AgenciesSolutionPage() {
    return (
        <div className="bg-white text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

            <AgencyHeroSection />
            <AgencyProblemSection />
            <AgencyFailureSection />
            <AgencyFrameworkSection />
            <AgencyDeliverables />
            <AgencyClientPortal />
            <AgencyCaseStudy />
            <AgencyFAQ />
            <AgencyCTA />

            <Footer />
        </div>
    );
}

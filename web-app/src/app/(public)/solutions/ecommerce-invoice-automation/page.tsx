import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import Footer from '@/components/shared/Footer';

// Page components
import EcommerceHeroSection from '@/components/landing/ecommerce/EcommerceHeroSection';
import EcommerceProblemSection from '@/components/landing/ecommerce/EcommerceProblemSection';
import EcommerceFailureSection from '@/components/landing/ecommerce/EcommerceFailureSection';
import EcommerceFrameworkSection from '@/components/landing/ecommerce/EcommerceFrameworkSection';
import EcommerceDeliverables from '@/components/landing/ecommerce/EcommerceDeliverables';
import EcommercePlatforms from '@/components/landing/ecommerce/EcommercePlatforms';
import EcommerceBuyerProblem from '@/components/landing/ecommerce/EcommerceBuyerProblem';
import EcommerceCaseStudy from '@/components/landing/ecommerce/EcommerceCaseStudy';
import EcommerceFAQ from '@/components/landing/ecommerce/EcommerceFAQ';
import EcommerceCTA from '@/components/landing/ecommerce/EcommerceCTA';

/* ── SEO Metadata ─────────────────────────────────────────────────
   Focus Keyword    : ecommerce invoice automation
   Semantic Keywords: shopify invoice generator,
                       woocommerce invoice plugin,
                       wholesale billing software,
                       b2b invoice generator,
                       ecommerce invoice software,
                       b2b ecommerce invoicing software,
                       bulk order billing tool,
                       wholesale invoicing software,
                       ecommerce billing automation
   Intent           : Commercial — Shopify/WooCommerce stores &
                       B2B wholesale sellers needing automated invoicing
──────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
    title: 'Ecommerce Invoice Automation | Shopify & B2B | NobleInvoice',
    description: 'Automate ecommerce invoice generation for Shopify, WooCommerce, and B2B wholesale orders. Generate bulk invoices, send automatically, and get paid faster.',
    keywords: [
        'ecommerce invoice automation',
        'shopify invoice generator',
        'woocommerce invoice plugin',
        'wholesale billing software',
        'b2b invoice generator',
        'ecommerce invoice software',
        'b2b ecommerce invoicing software',
        'bulk order billing tool',
        'wholesale invoicing software',
        'ecommerce billing automation'
    ],
    openGraph: {
        title: 'Ecommerce Invoice Automation | NobleInvoice',
        description: 'Automate your Shopify, WooCommerce, or B2B wholesale invoicing. Generate and send invoices automatically with every order.',
        url: 'https://nobleinvoice.com/solutions/ecommerce',
        type: 'website',
    },
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NobleInvoice Ecommerce Invoicing",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "734" },
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

export default function EcommerceSolutionPage() {
    return (
        <div className="bg-white text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            <Script id="sw-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

            <EcommerceHeroSection />
            <EcommerceProblemSection />
            <EcommerceFailureSection />
            <EcommerceFrameworkSection />
            <EcommerceDeliverables />
            <EcommercePlatforms />
            <EcommerceBuyerProblem />
            <EcommerceCaseStudy />
            <EcommerceFAQ />
            <EcommerceCTA />

            <Footer />
        </div>
    );
}

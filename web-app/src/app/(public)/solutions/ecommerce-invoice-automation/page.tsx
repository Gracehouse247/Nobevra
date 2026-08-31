import React from 'react';
import type { Metadata } from 'next';
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
    title: 'E-Commerce Invoice Automation — Automated Invoicing for Online Stores | Nobevra',
    description: 'Automate PDF invoice generation for your e-commerce store with Nobevra. Sync orders from Shopify and WooCommerce, calculate taxes, and deliver branded receipts.',
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
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/solutions/ecommerce-invoice-automation',
    },
    openGraph: {
        title: 'Ecommerce Invoice Automation | Nobevra',
        description: 'Automate your Shopify, WooCommerce, or B2B wholesale invoicing. Generate and send invoices automatically with every order.',
        url: 'https://nobevra.noblesworld.com.ng/solutions/ecommerce-invoice-automation',
        type: 'website',
    },
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nobevra Ecommerce Invoicing",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

export default function EcommerceSolutionPage() {
    return (
        <div className="bg-white text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

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

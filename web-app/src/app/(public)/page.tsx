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

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': 'https://nobevra.noblesworld.com.ng/#organization',
            'name': 'Nobevra',
            'legalName': "The Noble's Technology Services",
            'url': 'https://nobevra.noblesworld.com.ng',
            'logo': 'https://nobevra.noblesworld.com.ng/images/brand%20identies/logo.png',
            'sameAs': [
                'https://twitter.com/Nobevra',
                'https://linkedin.com/company/nobevra',
                'https://instagram.com/Nobevra'
            ]
        },
        {
            '@type': 'SoftwareApplication',
            '@id': 'https://nobevra.noblesworld.com.ng/#software',
            'name': 'Nobevra',
            'applicationCategory': 'BusinessApplication',
            'operatingSystem': 'Web, Android, iOS',
            'url': 'https://nobevra.noblesworld.com.ng',
            'offers': {
                '@type': 'Offer',
                'price': '0',
                'priceCurrency': 'USD',
                'description': 'Starter free plan available'
            },
            'author': {
                '@id': 'https://nobevra.noblesworld.com.ng/#organization'
            }
        },
        {
            '@type': 'FAQPage',
            '@id': 'https://nobevra.noblesworld.com.ng/#faq',
            'mainEntity': [
                {
                    '@type': 'Question',
                    'name': 'What is Nobevra and how does it work?',
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Nobevra is an intelligent Business Operating System that unifies invoicing, lightweight CRM, expense management, digital business cards, QR code generation, team workspaces, and AI business intelligence into one single platform.'
                    }
                },
                {
                    '@type': 'Question',
                    'name': 'Can I start using Nobevra for free?',
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Yes! Nobevra offers a Starter tier with no time limits or hidden fees. You can create invoices, manage clients, and build your digital business card without entering a credit card.'
                    }
                },
                {
                    '@type': 'Question',
                    'name': 'How do my clients pay their invoices?',
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Your clients receive a secure web payment link leading to your branded Client Portal. They can view the invoice details and pay online instantly via Flutterwave using debit cards, bank transfers, or mobile money without creating an account.'
                    }
                },
                {
                    '@type': 'Question',
                    'name': 'What makes Nobevra different from basic invoice generators?',
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Standard invoice generators only create a static PDF document. Nobevra is a complete business management platform: it tracks invoice views in real time, manages customer relationship pipelines, automates recurring billing, scans expense receipts with AI, and provides digital identity NFC cards.'
                    }
                },
                {
                    '@type': 'Question',
                    'name': 'Can I use Nobevra on my mobile phone?',
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Yes. Nobevra is available as both a high-performance web app and native mobile apps for Android and iOS, keeping your business data synced seamlessly across all devices.'
                    }
                },
                {
                    '@type': 'Question',
                    'name': 'How is my business and financial data protected?',
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Nobevra employs PostgreSQL Row-Level Security (RLS) policies to ensure strict workspace and multi-tenant data isolation. All network traffic is encrypted via 256-bit TLS/HTTPS protocols, and online payments are securely processed by certified payment gateways.'
                    }
                }
            ]
        }
    ]
};

export default function LandingPage() {
    return (
        <>
            {/* Server-rendered JSON-LD structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
        </>
    );
}

import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import HelpClientPage from '@/components/help/HelpClientPage';

export const metadata: Metadata = {
    title: 'Help Center | Customer Support | Nobevra',
    description: 'Explore the Nobevra Help Center. Find setup guides, billing troubleshooting, integration help, and API documentation.',
    keywords: ['help center', 'customer support', 'nobevra help', 'setup guide', 'billing troubleshooting'],
    openGraph: {
        title: 'Help Center | Nobevra',
        description: 'Find answers, setup guides, and best practices for using Nobevra.',
        url: '/help-center',
        type: 'website',
    },
};

const helpCenterSchema = [
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Nobevra Help Center",
        "description": "Explore the Nobevra Help Center for setup guides, billing troubleshooting, integration help, and API documentation.",
        "url": "https://nobevra.noblesworld.com.ng/help-center",
        "publisher": { "@type": "Organization", "name": "Nobevra" }
    },
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://nobevra.noblesworld.com.ng/help-center",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://nobevra.noblesworld.com.ng/help-center?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
];

export default function HelpCenterPage() {
    return (
        <div className="bg-white text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            <Script id="help-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(helpCenterSchema) }} />
            <HelpClientPage />
        </div>
    );
}

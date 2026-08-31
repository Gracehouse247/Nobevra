import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy — Global Data Protection & GDPR Compliance | Nobevra',
    description: 'Read the Nobevra Privacy Policy. Learn how we protect customer financial data, enforce GDPR compliance, and safeguard business information.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/privacy' },
    openGraph: {
        title: 'Privacy Policy | Nobevra',
        description: 'Read the Nobevra Privacy Policy. Global data protection, encryption, and GDPR compliance.',
        url: 'https://nobevra.noblesworld.com.ng/privacy',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy | Nobevra',
        description: 'How Nobevra protects your business data with strict privacy standards and encryption.',
    },
};

const privacySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Nobevra Privacy Policy',
    description: 'Privacy policy and data protection practices for the Nobevra business management platform.',
    url: 'https://nobevra.noblesworld.com.ng/privacy',
    publisher: {
        '@type': 'Organization',
        name: 'Nobevra',
        url: 'https://nobevra.noblesworld.com.ng',
        logo: {
            '@type': 'ImageObject',
            url: 'https://nobevra.noblesworld.com.ng/icon.png',
        },
    },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
            />
            {children}
        </>
    );
}

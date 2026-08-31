import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Enterprise Security, Encryption & Data Protection | Nobevra',
    description: 'Learn how Nobevra secures your financial data with 256-bit encryption, SOC2-aligned infrastructure, PCI-DSS Level 1 compliance, and automated backups.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/security',
    },
    openGraph: {
        title: 'Enterprise Security & Data Protection | Nobevra',
        description: 'Bank-grade security, 256-bit encryption, and PCI-DSS compliance built into every transaction.',
        url: 'https://nobevra.noblesworld.com.ng/security',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Enterprise Security & Data Protection | Nobevra',
        description: 'Bank-grade 256-bit encryption, PCI-DSS Level 1 compliance, and SOC2-aligned infrastructure protecting every Nobevra transaction.',
    },
};

const securityPolicySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Nobevra Security Policy',
    description: 'Security architecture, encryption standards, and compliance certifications for the Nobevra business management platform.',
    url: 'https://nobevra.noblesworld.com.ng/security',
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

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(securityPolicySchema) }}
            />
            {children}
        </>
    );
}

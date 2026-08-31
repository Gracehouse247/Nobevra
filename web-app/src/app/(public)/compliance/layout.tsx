import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compliance, GDPR, UETA & Regulatory Standards | Nobevra',
    description: 'Nobevra is architected to meet global regulatory and financial compliance standards, including GDPR, ESIGN Act, UETA, and international data residency.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/compliance',
    },
    openGraph: {
        title: 'Regulatory & Legal Compliance | Nobevra',
        description: 'GDPR, ESIGN Act, UETA, and global e-invoicing compliance standards.',
        url: 'https://nobevra.noblesworld.com.ng/compliance',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Compliance & Regulatory Standards | Nobevra',
        description: 'GDPR, ESIGN Act, UETA, and global data residency compliance built into the Nobevra business platform.',
    },
};

const complianceSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Nobevra Compliance & Regulatory Standards',
    description: 'Legal and regulatory compliance documentation for GDPR, ESIGN Act, UETA, and international invoicing standards.',
    url: 'https://nobevra.noblesworld.com.ng/compliance',
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

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(complianceSchema) }}
            />
            {children}
        </>
    );
}

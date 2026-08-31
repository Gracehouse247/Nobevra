import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service — Platform Usage & Customer Agreements | Nobevra',
    description: 'Review the Nobevra Terms of Service, subscription agreements, acceptable use policies, and billing terms for our intelligent business operating system.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/terms' },
    openGraph: {
        title: 'Terms of Service | Nobevra',
        description: 'Nobevra Terms of Service and customer agreements for business management software.',
        url: 'https://nobevra.noblesworld.com.ng/terms',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms of Service | Nobevra',
        description: 'Terms of service and subscription agreements for the Nobevra business platform.',
    },
};

const termsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Nobevra Terms of Service',
    description: 'Terms of service, user agreements, and commercial policies governing the use of Nobevra.',
    url: 'https://nobevra.noblesworld.com.ng/terms',
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

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
            />
            {children}
        </>
    );
}

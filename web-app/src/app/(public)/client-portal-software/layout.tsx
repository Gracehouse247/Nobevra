import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Client Portal Software — Give Clients a White-Label Payment Hub | Nobevra',
    description: 'Offer clients a branded portal to view invoices, download receipts, sign contracts, and pay instantly. No passwords needed — magic-link access on any device. Built into Nobevra.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/client-portal-software',
    },
    keywords: [
        'client portal software',
        'white label client portal',
        'invoice client portal',
        'online client payment portal',
        'branded client portal',
        'client self-service portal',
        'magic link invoice access',
        'secure client portal for freelancers',
        'client portal with e-signature',
        'client billing portal',
        'small business client portal',
    ],
    openGraph: {
        title: 'Client Portal Software — Branded Payment Hub | Nobevra',
        description: 'Give clients a white-label portal to view invoices, sign contracts, and pay in one click. No passwords required — magic-link access on every device.',
        url: 'https://nobevra.noblesworld.com.ng/client-portal-software',
        type: 'website',
        images: [
            {
                url: '/images/client-portal-hero.png',
                width: 1200,
                height: 630,
                alt: 'Nobevra Client Portal Software — branded invoice payment hub',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Client Portal Software | Nobevra',
        description: 'Branded portals where clients view invoices, sign contracts, and pay instantly — no login required.',
        images: ['/images/client-portal-hero.png'],
    },
};

const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nobevra Client Portal',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description: 'White-label client portal that allows businesses to give clients instant access to invoices, payment checkout, receipts, and contract e-signatures via a secure magic-link.',
    url: 'https://nobevra.noblesworld.com.ng/client-portal-software',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Included in all Nobevra plans including the free Explorer tier.',
    },
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

export default function ClientPortalSoftwareLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            {children}
        </>
    );
}

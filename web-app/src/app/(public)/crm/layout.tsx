import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Client Management CRM — Invoice-Connected CRM for SMBs | Nobevra',
    description: 'Manage clients, track deal pipelines, and monitor customer lifetime value with Nobevra CRM. Connect customer relationships directly to your invoicing engine.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/crm',
    },
    keywords: [
        'CRM for small business',
        'small business CRM software',
        'client management CRM',
        'lightweight CRM',
        'freelance client tracker',
        'client management software',
        'invoice CRM'
    ],
    openGraph: {
        title: 'Client Management CRM — Invoice-Connected CRM for SMBs | Nobevra',
        description: 'Manage clients, track deal pipelines, and monitor customer lifetime value with Nobevra CRM. Connect customer relationships directly to your invoicing engine.',
        url: 'https://nobevra.noblesworld.com.ng/crm',
        type: 'website',
        images: [
            {
                url: '/images/crm-engine-hero.png',
                width: 1200,
                height: 630,
                alt: 'Nobevra CRM Engine — Client Management and Deal Pipeline',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Client Management CRM | Nobevra',
        description: 'Manage clients, track deal pipelines, and connect relationships directly to your invoicing engine.',
        images: ['/images/crm-engine-hero.png'],
    },
};

export default function CRMLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

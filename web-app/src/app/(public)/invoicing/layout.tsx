import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Online Invoicing Software — 180+ Templates & Instant Payments | Nobevra',
    description: 'Create professional invoices in seconds with Nobevra. Choose from 180+ templates, track real-time client view telemetry, automate recurring billing, and accept instant global card payments.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/invoicing',
    },
    keywords: [
        'online invoicing software',
        'invoicing software',
        'invoice software for small business',
        'free invoice software',
        'automated billing software',
        'client billing software',
        'recurring billing software',
        'professional invoice creator',
        'cloud billing system',
        'business invoicing platform'
    ],
    openGraph: {
        title: 'Online Invoicing Software — 180+ Templates & Instant Payments | Nobevra',
        description: 'Create professional invoices in seconds with Nobevra. 180+ templates, real-time client view telemetry, recurring billing, and instant global card checkout.',
        url: 'https://nobevra.noblesworld.com.ng/invoicing',
        type: 'website',
        images: ['/images/precision-invoicing.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Online Invoicing Software | Nobevra',
        description: '180+ templates, real-time client view telemetry, and instant card payments.',
        images: ['/images/precision-invoicing.png'],
    },
};

export default function InvoicingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

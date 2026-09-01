import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Enterprise Subscription Agreement (ESA) — Commercial Terms | Nobevra',
    description: 'Read the Nobevra Enterprise Subscription Agreement. Covers commercial service terms, multi-seat licensing, enterprise data ownership, SLA commitments, and custom billing arrangements.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/esa' },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Enterprise Subscription Agreement (ESA) | Nobevra',
        description: 'Commercial terms for Nobevra enterprise customers: multi-seat licensing, SLAs, data ownership, and custom billing.',
        url: 'https://nobevra.noblesworld.com.ng/esa',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Enterprise Subscription Agreement | Nobevra',
        description: 'Multi-seat licensing, SLA commitments, and enterprise commercial terms for Nobevra.',
    },
};

export default function ESALayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

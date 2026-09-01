import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Service Level Agreement (SLA) — Uptime & Availability Commitments | Nobevra',
    description: "Read Nobevra's Service Level Agreement. Covers uptime guarantees (99.9% SLA), scheduled maintenance windows, incident response times, service credit policies, and support escalation paths.",
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/sla' },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Service Level Agreement (SLA) | Nobevra',
        description: '99.9% uptime commitment, incident response times, maintenance windows, and service credit policy.',
        url: 'https://nobevra.noblesworld.com.ng/sla',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Service Level Agreement (SLA) | Nobevra',
        description: 'Uptime guarantees, maintenance windows, and service credits for the Nobevra platform.',
    },
};

export default function SLALayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

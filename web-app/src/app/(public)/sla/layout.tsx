import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Service Level Agreement (SLA) | Nobevra',
    description: 'Nobevra system uptime, availability commitments, and SLA guarantees.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/sla' },
};

export default function SLALayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

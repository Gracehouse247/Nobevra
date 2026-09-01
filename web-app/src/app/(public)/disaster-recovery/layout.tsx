import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disaster Recovery & Business Continuity Plan | Nobevra',
    description: "Read Nobevra's Disaster Recovery and Business Continuity Plan. Covers RTO/RPO targets, failover architecture, data backup schedules, and service restoration procedures to protect your business data.",
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/disaster-recovery' },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Disaster Recovery & Business Continuity | Nobevra',
        description: 'RTO/RPO targets, failover systems, data backup schedules, and service restoration architecture.',
        url: 'https://nobevra.noblesworld.com.ng/disaster-recovery',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Disaster Recovery & Business Continuity | Nobevra',
        description: 'Failover systems, backup schedules, and service restoration targets for the Nobevra platform.',
    },
};

export default function DisasterRecoveryLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }


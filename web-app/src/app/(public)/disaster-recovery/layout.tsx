import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disaster Recovery & Business Continuity | Nobevra',
    description: 'Nobevra disaster recovery, failover systems, and business continuity architecture.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/disaster-recovery' },
};

export default function DisasterRecoveryLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

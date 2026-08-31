import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Data Retention Policy | Nobevra',
    description: 'Nobevra data retention schedules, backups, and deletion procedures.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/data-retention' },
};

export default function DataRetentionLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

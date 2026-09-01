import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Data Retention Policy — How Long We Keep Your Data | Nobevra',
    description: 'Read the Nobevra Data Retention Policy. Learn how long we retain account data, invoice records, and personal information, and how to request deletion under GDPR and global privacy laws.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/data-retention' },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Data Retention Policy | Nobevra',
        description: 'Data retention schedules, backup procedures, and deletion policies for all Nobevra user and business data.',
        url: 'https://nobevra.noblesworld.com.ng/data-retention',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Data Retention Policy | Nobevra',
        description: 'How long Nobevra keeps your data, backup procedures, and how to request deletion.',
    },
};

export default function DataRetentionLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }


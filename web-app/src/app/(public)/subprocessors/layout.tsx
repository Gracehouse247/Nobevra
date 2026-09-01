import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authorized Subprocessors — Third-Party Vendors | Nobevra',
    description: 'View the complete list of authorized subprocessors used by Nobevra. Includes cloud hosting providers, AI infrastructure, payment processors, and analytics tools — with GDPR transfer basis for each.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/subprocessors' },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Authorized Subprocessors | Nobevra',
        description: 'Full list of third-party vendors and subprocessors used by Nobevra for hosting, AI, payments, and analytics — with GDPR transfer safeguards.',
        url: 'https://nobevra.noblesworld.com.ng/subprocessors',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Authorized Subprocessors | Nobevra',
        description: 'Third-party hosting, AI, payment, and analytics vendors used by Nobevra, with GDPR transfer basis.',
    },
};

export default function SubprocessorsLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

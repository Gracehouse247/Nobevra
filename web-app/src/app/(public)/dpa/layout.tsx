import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Data Processing Agreement (DPA) — GDPR Compliance | Nobevra',
    description: "Read the Nobevra Data Processing Agreement (DPA). Covers GDPR Article 28 obligations, sub-processor list, data transfer safeguards, security measures, and customer data rights.",
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/dpa' },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Data Processing Agreement (DPA) | Nobevra',
        description: 'GDPR-compliant Data Processing Agreement covering sub-processors, transfer safeguards, security measures, and data subject rights.',
        url: 'https://nobevra.noblesworld.com.ng/dpa',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Data Processing Agreement (DPA) | Nobevra',
        description: 'GDPR Article 28 DPA with sub-processor list, transfer safeguards, and data subject rights.',
    },
};

export default function DPALayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }


import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Data Processing Agreement (DPA) | Nobevra',
    description: 'Nobevra data processing terms and GDPR compliance commitments.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/dpa' },
};

export default function DPALayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

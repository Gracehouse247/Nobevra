import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refund & Cancellation Policy | Nobevra',
    description: 'Nobevra subscription refund, cancellation, and dispute policies.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/refund' },
};

export default function RefundLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

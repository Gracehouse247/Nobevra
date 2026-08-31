import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Acceptable Use Policy | Nobevra',
    description: 'Nobevra acceptable use policy and platform conduct guidelines.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/acceptable-use' },
};

export default function AcceptableUseLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

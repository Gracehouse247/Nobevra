import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy | Nobevra',
    description: 'Nobevra cookie policy and tracking preferences.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/cookies' },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

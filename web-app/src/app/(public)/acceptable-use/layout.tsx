import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Acceptable Use Policy — Platform Rules & Conduct Guidelines | Nobevra',
    description: 'Read the Nobevra Acceptable Use Policy. Understand prohibited conduct, content standards, AI feature usage rules, QR code restrictions, API guidelines, and enforcement procedures.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/acceptable-use' },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Acceptable Use Policy | Nobevra',
        description: 'Platform conduct rules, prohibited activities, AI usage guidelines, and enforcement terms for all Nobevra users.',
        url: 'https://nobevra.noblesworld.com.ng/acceptable-use',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Acceptable Use Policy | Nobevra',
        description: 'Platform conduct, prohibited activities, and enforcement terms for all Nobevra users.',
    },
};

export default function AcceptableUseLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }


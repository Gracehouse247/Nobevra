import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy — How We Use Cookies & Tracking | Nobevra',
    description: 'Read the Nobevra Cookie Policy. Learn what cookies we use, why we use them, how to manage your cookie preferences, and how we comply with GDPR and ePrivacy regulations.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/cookies' },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Cookie Policy | Nobevra',
        description: 'What cookies Nobevra uses, why we use them, and how to manage your tracking preferences.',
        url: 'https://nobevra.noblesworld.com.ng/cookies',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Cookie Policy | Nobevra',
        description: 'Cookie usage, tracking categories, and your privacy preferences on the Nobevra platform.',
    },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }


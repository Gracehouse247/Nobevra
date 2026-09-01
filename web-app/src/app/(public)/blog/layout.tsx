import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Business Insights, Invoicing Tips & Growth Guides | Nobevra Blog',
    description: 'Actionable guides on scaling your business, getting paid faster, mastering client contracts, and optimizing cash flow.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/blog',
    },
    openGraph: {
        title: 'Nobevra Blog | Business & Financial Insights',
        description: 'Actionable guides on business operations, cash flow optimization, and client management.',
        url: 'https://nobevra.noblesworld.com.ng/blog',
        type: 'website',
        images: [
            {
                url: '/images/hero-dashboard-actual.png',
                width: 1200,
                height: 630,
                alt: 'Nobevra Blog — Business Insights, Invoicing Tips & Growth Guides',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nobevra Blog | Business & Financial Insights',
        description: 'Actionable guides on scaling your business, getting paid faster, mastering client contracts, and optimizing cash flow.',
        images: ['/images/hero-dashboard-actual.png'],
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

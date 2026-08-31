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
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

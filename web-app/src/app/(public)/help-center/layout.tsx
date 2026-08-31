import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Help Center & Documentation | Nobevra Support',
    description: 'Find guides, tutorials, API documentation, and answers to common questions about invoicing, CRM, payments, and account setup on Nobevra.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/help-center',
    },
    openGraph: {
        title: 'Help Center & Documentation | Nobevra',
        description: 'Browse comprehensive guides, tutorials, and support articles for Nobevra.',
        url: 'https://nobevra.noblesworld.com.ng/help-center',
        type: 'website',
    },
};

export default function HelpCenterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

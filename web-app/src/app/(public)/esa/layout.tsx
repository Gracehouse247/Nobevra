import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Enterprise Subscription Agreement (ESA) | Nobevra',
    description: 'Nobevra enterprise subscription agreement and commercial service terms.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/esa' },
};

export default function ESALayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

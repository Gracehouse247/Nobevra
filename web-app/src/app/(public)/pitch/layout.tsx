import type { Metadata } from 'next';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
    title: 'NOBEVRA: The Intelligent OPS Platform — Pitch Deck',
    description: 'Official live pitch deck of Nobevra, an intelligent AI-driven business operations and automated invoicing platform presented by the Nobevra Team.',
    openGraph: {
        title: 'NOBEVRA: The Intelligent OPS Platform — Pitch Deck',
        description: 'Discover how Nobevra is automating operations, invoicing, and cash flow intelligence for African and global businesses.',
        url: `${brand.urls.canonical}/pitch`,
        siteName: brand.name,
        type: 'website',
        images: [
            {
                url: brand.assets.ogImage,
                width: 1536,
                height: 1024,
                alt: 'NOBEVRA Live Pitch Deck',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NOBEVRA: The Intelligent OPS Platform — Pitch Deck',
        description: 'Discover how Nobevra is automating operations, invoicing, and cash flow intelligence for African and global businesses.',
        images: [brand.assets.ogImage],
    },
    alternates: {
        canonical: `${brand.urls.canonical}/pitch`,
    },
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function PitchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Usage & Safety Policy — How Nobevra Uses AI | Nobevra',
    description: "Understand how Nobevra uses AI in its platform: which AI providers power our features, how your data is handled, what we don't train on, and your rights regarding AI-generated content.",
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/ai-policy' },
    robots: { index: true, follow: true },
    openGraph: {
        title: 'AI Usage & Safety Policy | Nobevra',
        description: 'How Nobevra uses AI, which LLM providers we work with, data privacy guarantees, and your rights regarding AI-generated outputs.',
        url: 'https://nobevra.noblesworld.com.ng/ai-policy',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'AI Usage & Safety Policy | Nobevra',
        description: "Nobevra's AI providers, data privacy practices, accuracy limitations, and user rights for AI-generated content.",
    },
};

export default function AIPolicyLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }


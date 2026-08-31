import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Usage & Safety Policy | Nobevra',
    description: 'Nobevra AI policy, data privacy with LLMs, and responsible AI practices.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/ai-policy' },
};

export default function AIPolicyLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

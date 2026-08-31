import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authorized Subprocessors | Nobevra',
    description: 'List of third-party subprocessors utilized by Nobevra for hosting, AI, and payments.',
    alternates: { canonical: 'https://nobevra.noblesworld.com.ng/subprocessors' },
};

export default function SubprocessorsLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

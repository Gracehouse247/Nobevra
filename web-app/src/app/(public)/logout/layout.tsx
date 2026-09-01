import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Signing Out | Nobevra',
    description: 'Securely signing out of your Nobevra account.',
    robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
    },
};

export default function LogoutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

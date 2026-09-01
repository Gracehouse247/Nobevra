import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Forgot Password | Nobevra',
    description: 'Recover access to your Nobevra account.',
    robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
    },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

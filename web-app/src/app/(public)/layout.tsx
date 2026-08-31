'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import CookieConsent from '@/components/shared/CookieConsent';
import { ThemeProvider } from '@/components/providers/theme-provider';

const AUTH_PATHS = ['/register', '/login', '/logout', '/forgot-password', '/reset-password'];

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage = AUTH_PATHS.includes(pathname);
    const isPitchPage = pathname?.startsWith('/pitch');

    return (
        <div data-theme-force="light" className="flex flex-col min-h-screen bg-[#F8FAFC]">
            {!isAuthPage && !isPitchPage && <Navbar />}
            <main className="flex-1 w-full">
                {children}
            </main>
            <CookieConsent />
        </div>
    );
}

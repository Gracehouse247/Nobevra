/**
 * UserLayout — React Server Component (RSC)
 *
 * RSC Boundary Design:
 *   - This file has NO 'use client' directive, making it a Server Component.
 *   - All static provider wrappers (RealtimeProvider, UpgradeModalProvider)
 *     are rendered on the server — their JSX shell is part of the HTML payload
 *     with zero hydration cost.
 *   - UserLayoutClient is the single client island that owns all browser-state:
 *     auth guard, hotkeys, mobile menu, sidebar state, etc.
 *   - This pattern follows the Next.js 13+ "push 'use client' down" principle,
 *     reducing Time-to-Interactive (TTI) by keeping the outer shell server-rendered.
 */

import React from 'react';
import RealtimeProvider from '@/components/providers/RealtimeProvider';
import { UpgradeModalProvider } from '@/context/UpgradeModalContext';
import UserLayoutClient from '@/components/layout/UserLayoutClient';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <RealtimeProvider>
            <UpgradeModalProvider>
                <UserLayoutClient>
                    {children}
                </UserLayoutClient>
            </UpgradeModalProvider>
        </RealtimeProvider>
    );
}

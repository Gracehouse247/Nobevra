import { useMemo } from 'react';
import { Invoice } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export type UserDashboardState = 'brand_new' | 'empty_returning' | 'early_stage' | 'active' | 'returning_gap';

interface UseDashboardGreetingParams {
    invoices: Invoice[];
    clientsLength: number;
}

export function useDashboardGreeting({ invoices, clientsLength }: UseDashboardGreetingParams) {
    const { userData } = useAuth();
    
    // Derived state
    const state = useMemo<UserDashboardState>(() => {
        if (!userData) return 'active';

        // Check if brand new (created in last 24h)
        const now = new Date();
        const firstLogin = userData.onboarding_completed 
            ? new Date(userData.first_login_at || now) 
            : now; // Fallback
        const isBrandNew = (now.getTime() - firstLogin.getTime()) < 24 * 60 * 60 * 1000;

        const hasActivity = invoices.length > 0 || clientsLength > 0;
        
        if (isBrandNew && !hasActivity) return 'brand_new';
        if (!isBrandNew && !hasActivity) return 'empty_returning';
        if (invoices.length > 0 && invoices.length < 5) return 'early_stage';
        
        // Returning gap: Has activity, but last login was > 7 days ago
        // To implement this perfectly we need the previous last_login_at.
        // For now, if active, return active.
        return 'active';
    }, [invoices.length, clientsLength, userData]);

    const timeGreeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    }, []);

    const firstName = userData?.name ? userData.name.split(' ')[0] : 'there';

    const getMessageForState = (s: UserDashboardState, name: string) => {
        switch (s) {
            case 'brand_new':
                return {
                    title: `Welcome to NobleInvoice, ${name}!`,
                    sub: 'Everything you need to run your business is right here. Let\'s get you set up to send your first invoice.',
                    cta: 'Create First Invoice',
                    href: '/invoices/new',
                };
            case 'empty_returning':
                return {
                    title: `Welcome back, ${name}. Let's get started.`,
                    sub: 'Your workspace is ready. Add a client or create an invoice to see your dashboard come to life.',
                    cta: 'Add a Client',
                    href: '/clients/new',
                };
            case 'early_stage':
                return {
                    title: `Great start, ${name}!`,
                    sub: 'You\'re on your way. Keep adding invoices and clients to build your business profile.',
                    cta: 'Create Invoice',
                    href: '/invoices/new',
                };
            case 'returning_gap':
                return {
                    title: `Welcome back, ${name}!`,
                    sub: 'It\'s been a while. Here is a summary of what\'s happening with your business.',
                    cta: 'View Reports',
                    href: '/reports',
                };
            case 'active':
            default:
                return {
                    title: `${timeGreeting}, ${name} 👋`,
                    sub: 'Here is your business at a glance today.',
                    cta: 'New Invoice',
                    href: '/invoices/new',
                };
        }
    };

    const content = getMessageForState(state, firstName);

    const markTourCompleted = async () => {
        if (!userData?.uid) return;
        await supabase.from('profiles').update({ onboarding_tour_completed: true }).eq('id', userData.uid);
    };

    return {
        state,
        timeGreeting,
        firstName,
        content,
        markTourCompleted,
        tourCompleted: userData?.onboarding_tour_completed || false,
    };
}

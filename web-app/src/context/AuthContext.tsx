'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { UserData } from '@/types';
import { User } from '@supabase/supabase-js';



export interface ProfileRow {
    display_name?: string;
    business_name?: string;
    brand_logo_url?: string;
    subscription_tier?: string;
    subscription_status?: string;
    subscription_expires_at?: string | null;
    onboarding_completed?: boolean;
    onboarding_tour_completed?: boolean;
    first_login_at?: string;
    last_login_at?: string;
    /** Platform admin flag — stored in profiles.is_superadmin */
    is_superadmin?: boolean;
    /** Admin role: 'super_admin' | 'seo_manager' | 'support_staff' */
    role?: string | null;
}

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    logout: () => Promise<void>;
    refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    loading: true,
    logout: async () => {},
    refreshUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    
    // Track the last fetched user ID to prevent redundant fetches on token refresh
    const lastFetchedUserId = React.useRef<string | null>(null);

    const fetchUserProfile = async (currentUser: User) => {
        try {
            // Fetch profile first
            const profileResult = await supabase
                .from('profiles')
                .select('display_name, business_name, brand_logo_url, subscription_tier, subscription_status, subscription_expires_at, onboarding_completed, onboarding_tour_completed, first_login_at, last_login_at, is_superadmin, role')
                .eq('id', currentUser.id)
                .single();

            const profile = profileResult.data as ProfileRow;
            if (profileResult.error && profileResult.error.code !== 'PGRST116') {
                console.error('Error fetching Supabase profile:', profileResult.error);
            }

            // limits and features are now handled exclusively by EntitlementsContext.

            // Map only the fields we need — never spread the entire profile row
            // to avoid accidentally exposing sensitive columns (e.g. bank_account_number)
            // Super admins are ALWAYS treated as 'admin' plan with 'active' status,
            // regardless of what's in subscription_tier — they are billing-exempt.
            const isSuperAdmin = !!(profile?.is_superadmin || profile?.role === 'super_admin');
            const resolvedTier = isSuperAdmin
                ? 'admin'
                : (['explorer', 'pulse', 'elite', 'admin', 'pro'].includes(profile?.subscription_tier || '')
                    ? (profile!.subscription_tier === 'pro' ? 'pulse' : profile!.subscription_tier)
                    : 'explorer') as 'explorer' | 'pulse' | 'elite' | 'admin';

            setUserData({
                uid: currentUser.id,
                email: currentUser.email || '',
                name: profile?.display_name || profile?.business_name || 'Noble User',
                photoUrl: profile?.brand_logo_url || undefined,
                subscriptionStatus: isSuperAdmin ? 'active' : (
                    ['active', 'past_due'].includes(profile?.subscription_status || '')
                    && (profile?.subscription_tier && profile.subscription_tier !== 'explorer')
                ) ? 'active' : (
                    profile?.subscription_tier && profile.subscription_tier !== 'explorer' ? 'expired' : 'cancelled'
                ) as 'active' | 'past_due' | 'cancelled' | 'expired',
                plan: resolvedTier as 'explorer' | 'pulse' | 'elite' | 'admin',
                isSuperAdmin,
                adminRole: profile?.role || null,
                // Subscription dates (expose for billing page)
                subscription_expires_at: profile?.subscription_expires_at || null,
                // Explicit profile fields used by UI
                display_name: profile?.display_name,
                business_name: profile?.business_name,
                brand_logo_url: profile?.brand_logo_url,
                onboarding_completed: profile?.onboarding_completed,
                onboarding_tour_completed: profile?.onboarding_tour_completed,
                first_login_at: profile?.first_login_at,
                last_login_at: profile?.last_login_at,
            });
        } catch (error) {
            console.error('Error in fetchUserProfile:', error);
        }
    };

    useEffect(() => {


        // Safety timeout — if auth hasn't resolved in 6s, unblock the UI
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 6000);

        // 1. Check active session initially
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            clearTimeout(timeout);
            const currentUser = session?.user || null;

            setUser(currentUser);
            if (currentUser) {
                if (lastFetchedUserId.current !== currentUser.id) {
                    // Record last login time, and set first_login_at if null
                    const { data: prof } = await supabase.from('profiles').select('first_login_at').eq('id', currentUser.id).single();
                    const now = new Date().toISOString();
                    await supabase.from('profiles').update({
                        last_login_at: now,
                        ...(prof && !prof.first_login_at ? { first_login_at: now } : {})
                    }).eq('id', currentUser.id);

                    await fetchUserProfile(currentUser);
                    lastFetchedUserId.current = currentUser.id;
                }
                setLoading(false);
            } else {
                setUserData(null);
                lastFetchedUserId.current = null;
                setLoading(false);
            }
        }).catch((err) => {
            clearTimeout(timeout);
            console.error('Session fetch error:', err);
            setLoading(false);
        });

        // 2. Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            const currentUser = session?.user || null;
            setUser(currentUser);

            if (currentUser) {
                if (event === 'SIGNED_IN') {
                    const { data: prof } = await supabase.from('profiles').select('first_login_at').eq('id', currentUser.id).single();
                    const now = new Date().toISOString();
                    await supabase.from('profiles').update({
                        last_login_at: now,
                        ...(prof && !prof.first_login_at ? { first_login_at: now } : {})
                    }).eq('id', currentUser.id);
                }

                // Prevent refetching if just refreshing token
                if (lastFetchedUserId.current !== currentUser.id || event === 'SIGNED_IN') {
                    lastFetchedUserId.current = currentUser.id;
                    await fetchUserProfile(currentUser);
                }
            } else {
                setUserData(null);
                lastFetchedUserId.current = null;
            }
            setLoading(false);
        });

        return () => {
            clearTimeout(timeout);
            subscription.unsubscribe();
        };
    }, []);



    const refreshUserData = async () => {
        if (!user) return;
        await fetchUserProfile(user);
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setUser(null);
            setUserData(null);
            lastFetchedUserId.current = null;
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, userData, loading, logout, refreshUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

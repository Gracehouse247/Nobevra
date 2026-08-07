'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';
import { getCurrencyForCountry, DEFAULT_CURRENCY } from '@/lib/geo/countryToCurrency';
import { currencyService } from '@/lib/services/currencyService';

interface CurrencyContextType {
    /** Active ISO 4217 currency code, e.g. "GBP", "NGN", "USD" */
    currencyCode: string;
    /** Native currency symbol, e.g. "£", "₦", "$" */
    currencySymbol: string;
    /** Detected country code from IP, e.g. "GB" */
    detectedCountry: string | null;
    /** Whether the currency was explicitly set by the user vs auto-detected */
    isUserOverride: boolean;
    /** Format an amount using the active currency */
    formatMoney: (amount: number, opts?: { compact?: boolean; decimals?: number }) => string;
    /** Update currency preference — saves to DB profile */
    updateCurrency: (code: string) => Promise<void>;
    /** Whether geo-detection is still loading */
    isDetecting: boolean;
}

const CurrencyContext = createContext<CurrencyContextType>({
    currencyCode: DEFAULT_CURRENCY,
    currencySymbol: '$',
    detectedCountry: null,
    isUserOverride: false,
    formatMoney: (amount) => `$${amount}`,
    updateCurrency: async () => {},
    isDetecting: true,
});

export const useCurrency = () => useContext(CurrencyContext);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [currencyCode, setCurrencyCode] = useState<string>(DEFAULT_CURRENCY);
    const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
    const [isUserOverride, setIsUserOverride] = useState(false);
    const [isDetecting, setIsDetecting] = useState(true);
    const initialized = useRef(false);

    const detect = useCallback(async () => {
        if (initialized.current) return;
        initialized.current = true;

        try {
            // ── Priority 1: Check sessionStorage cache (avoid repeat detections in same session)
            const cached = typeof window !== 'undefined' ? sessionStorage.getItem('ni_currency_cache') : null;
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed.code && Date.now() - parsed.ts < 3_600_000) {
                    setCurrencyCode(parsed.code);
                    setDetectedCountry(parsed.country);
                    setIsUserOverride(parsed.isUserOverride || false);
                    setIsDetecting(false);
                    return;
                }
            }

            // ── Priority 2: DB saved preference (logged-in users)
            if (user?.id) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('preferred_currency, currency_set_by, detected_country')
                    .eq('id', user.id)
                    .single();

                if (profile?.preferred_currency) {
                    const isOverride = profile.currency_set_by === 'user';
                    setCurrencyCode(profile.preferred_currency);
                    setDetectedCountry(profile.detected_country || null);
                    setIsUserOverride(isOverride);
                    sessionStorage.setItem('ni_currency_cache', JSON.stringify({
                        code: profile.preferred_currency,
                        country: profile.detected_country,
                        isUserOverride: isOverride,
                        ts: Date.now(),
                    }));
                    setIsDetecting(false);
                    return;
                }
            }

            // ── Priority 3: Vercel geo cookie (set by proxy.ts middleware)
            const geoCountryCookie = document.cookie
                .split(';')
                .find(c => c.trim().startsWith('ni_detected_country='))
                ?.split('=')?.[1]?.trim();

            if (geoCountryCookie) {
                const detected = getCurrencyForCountry(geoCountryCookie);
                setCurrencyCode(detected);
                setDetectedCountry(geoCountryCookie);
                await saveDetectedCurrency(detected, geoCountryCookie);
                sessionStorage.setItem('ni_currency_cache', JSON.stringify({
                    code: detected, country: geoCountryCookie, isUserOverride: false, ts: Date.now()
                }));
                setIsDetecting(false);
                return;
            }

            // ── Priority 4: Server-side API route (calls ipapi.co)
            const geoRes = await fetch('/api/geo');
            if (geoRes.ok) {
                const geoData = await geoRes.json();
                if (geoData.currency && geoData.currency !== 'USD') {
                    setCurrencyCode(geoData.currency);
                    setDetectedCountry(geoData.country);
                    await saveDetectedCurrency(geoData.currency, geoData.country);
                    sessionStorage.setItem('ni_currency_cache', JSON.stringify({
                        code: geoData.currency, country: geoData.country, isUserOverride: false, ts: Date.now()
                    }));
                    setIsDetecting(false);
                    return;
                }
            }

            // ── Priority 5: Browser locale hint
            const locale = typeof navigator !== 'undefined' ? navigator.language : null;
            if (locale) {
                const regionCode = locale.includes('-') ? locale.split('-')[1] : null;
                if (regionCode) {
                    const localeCurrency = getCurrencyForCountry(regionCode);
                    if (localeCurrency !== DEFAULT_CURRENCY) {
                        setCurrencyCode(localeCurrency);
                        setIsDetecting(false);
                        return;
                    }
                }
            }

            // ── Final fallback: USD
            setCurrencyCode(DEFAULT_CURRENCY);
        } catch (err) {
            console.warn('[CurrencyContext] Detection error, using USD fallback:', err);
            setCurrencyCode(DEFAULT_CURRENCY);
        } finally {
            setIsDetecting(false);
        }
    }, [user?.id]);

    useEffect(() => {
        detect();
    }, [detect]);

    /** Persist auto-detected currency to DB (only if user hasn't manually set it) */
    async function saveDetectedCurrency(currency: string, country: string | null) {
        if (!user?.id) return;
        try {
            await supabase.from('profiles').update({
                preferred_currency: currency,
                detected_country: country,
                currency_set_by: 'auto',
            }).eq('id', user.id).is('currency_set_by', null); // Only update if never set
        } catch {/* non-critical */ }
    }

    /** User manually changes currency — saves to DB with 'user' flag */
    const updateCurrency = useCallback(async (code: string) => {
        setCurrencyCode(code);
        setIsUserOverride(true);
        sessionStorage.removeItem('ni_currency_cache');

        if (user?.id) {
            await supabase.from('profiles').update({
                preferred_currency: code,
                currency_set_by: 'user',
            }).eq('id', user.id);
        }
    }, [user?.id]);

    const formatMoney = useCallback(
        (amount: number, opts?: { compact?: boolean; decimals?: number }) =>
            currencyService.format(amount, currencyCode, opts),
        [currencyCode]
    );

    const currencySymbol = currencyService.getCurrencySymbol(currencyCode);

    return (
        <CurrencyContext.Provider value={{
            currencyCode,
            currencySymbol,
            detectedCountry,
            isUserOverride,
            formatMoney,
            updateCurrency,
            isDetecting,
        }}>
            {children}
        </CurrencyContext.Provider>
    );
}

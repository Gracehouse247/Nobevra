'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

// Initialises GA4 with Google Consent Mode v2 standards.
export function loadGoogleAnalytics(consentState: 'granted' | 'denied' = 'granted') {
    if (typeof window === 'undefined') return;

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
    (window as any).gtag = gtag;

    // Google Consent Mode v2 default signal
    gtag('consent', 'default', {
        analytics_storage: consentState,
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
    });

    if (consentState === 'granted') {
        if ((window as any).__gaLoaded) return;
        (window as any).__gaLoaded = true;

        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-6ME42JV7BJ';
        script.async = true;
        document.head.appendChild(script);

        gtag('js', new Date());
        gtag('config', 'G-6ME42JV7BJ', {
            anonymize_ip: true,
            product_identity: 'nobevra',
        });
    }
}

export default function CookieConsent() {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check new key first, then fallback to historical legacy key
        const consent = localStorage.getItem('nobevra_cookie_consent') || localStorage.getItem('noble_cookie_consent');
        if (!consent) {
            setIsVisible(true);
        } else if (consent === 'accepted') {
            loadGoogleAnalytics('granted');
        } else {
            loadGoogleAnalytics('denied');
        }
    }, []);

    const handleConsent = (status: 'accepted' | 'declined') => {
        localStorage.setItem('nobevra_cookie_consent', status);
        localStorage.setItem('noble_cookie_consent', status);
        
        if (status === 'accepted') {
            document.cookie = 'nobevra_consent=1; max-age=31536000; path=/; SameSite=Lax';
            document.cookie = 'noble_consent=1; max-age=31536000; path=/; SameSite=Lax';
            loadGoogleAnalytics('granted');
        } else {
            loadGoogleAnalytics('denied');
        }
        setIsVisible(false);
    };

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                    className="fixed bottom-5 left-5 z-[100] pointer-events-auto max-w-[300px] w-full"
                >
                    <div className="bg-noble-surface dark:bg-noble-card/95 backdrop-blur-xl border border-noble-border/80 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
                        {/* Top accent bar */}
                        <div className="h-0.5 w-full bg-gradient-to-r from-noble-blue via-blue-400 to-cyan-400" />

                        <div className="p-4">
                            {/* Icon + Title */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-lg bg-noble-blue/10 flex items-center justify-center shrink-0">
                                    <Cookie className="w-3.5 h-3.5 text-noble-blue" />
                                </div>
                                <h3 className="font-bold text-noble-text text-sm tracking-tight">
                                    Your Privacy Matters
                                </h3>
                            </div>

                            {/* Body */}
                            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed mb-4">
                                We use essential cookies to keep Nobevra secure and running smoothly. Optional analytics cookies (Google Analytics) help us improve performance. Manage your preferences anytime in our{' '}
                                <Link
                                    href="/privacy"
                                    className="text-noble-blue font-semibold hover:underline underline-offset-2"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>

                            {/* Buttons */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleConsent('declined')}
                                    className="flex-1 py-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#112030] hover:bg-slate-200 rounded-lg transition-colors"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={() => handleConsent('accepted')}
                                    className="flex-1 py-1.5 text-[11px] font-bold text-white bg-noble-blue hover:bg-blue-700 rounded-lg transition-all shadow-md shadow-noble-blue/25 hover:shadow-noble-blue/40"
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

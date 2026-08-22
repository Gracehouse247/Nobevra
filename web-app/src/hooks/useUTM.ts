'use client';

import { useEffect } from 'react';

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Hook to capture UTM parameters from current URL search params and store them in sessionStorage.
 */
export function useUTM(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmKeys: (keyof UTMParams)[] = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
      ];

      const captured: UTMParams = {};
      let hasUtm = false;

      utmKeys.forEach((key) => {
        const val = urlParams.get(key);
        if (val) {
          captured[key] = val;
          hasUtm = true;
        }
      });

      if (hasUtm) {
        sessionStorage.setItem('nobevra_utm_params', JSON.stringify(captured));
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);
}

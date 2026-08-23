'use client';

import React, { useEffect } from 'react';

export default function UTMClientLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmKeys = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
      ];

      const captured: Record<string, string> = {};
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

  return null;
}

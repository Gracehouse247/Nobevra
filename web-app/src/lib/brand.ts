/**
 * NOBEVRA — Centralized Brand Configuration
 *
 * This is the single authoritative source of truth for all customer-facing
 * brand identity across the entire application stack.
 *
 * USAGE:
 *   import { brand } from '@/lib/brand';
 *   brand.name         // "NOBEVRA"
 *   brand.tagline      // "The Intelligent Business Operating System"
 *   brand.assets.logo  // "/images/brand identies/logo.png"
 *
 * RULES:
 *   - Do NOT duplicate these values anywhere else in the codebase.
 *   - Do NOT use raw string literals for any of these values in components.
 *   - Do NOT rename internal DB identifiers, schema fields, or storage buckets.
 *   - This file ONLY governs customer-facing presentation, not infrastructure.
 */

// ─── Core Identity ────────────────────────────────────────────────────────────

export const brand = {
  /** Official product name displayed to customers. */
  name: 'NOBEVRA',

  /** Short name for compact display contexts (e.g. mobile nav). */
  shortName: 'Nobevra',

  /** Product category / positioning statement. */
  tagline: 'The Intelligent Business Operating System',

  /** Core brand promise shown in marketing and onboarding. */
  promise: 'Everything Your Business Needs. One Intelligent Platform.',

  /** Product mantra — used in splash screens, hero sections, email footers. */
  mantra: 'Run. Connect. Grow.',

  /** CAC-registered legal parent entity. */
  parentCompany: "The Noble's Technology Services",

  // ─── URLs ──────────────────────────────────────────────────────────────────

  urls: {
    /** Current production launch URL. */
    production: 'https://nobevra.noblesworld.com.ng',

    /** Future primary domain (post-migration). */
    future: 'https://nobevra.com',

    /** Legacy domain — MUST NOT be broken during migration. */
    legacy: 'https://invoice.noblesworld.com.ng',

    /** Canonical website URL dynamically resolved from environment variables or production default. */
    get canonical() {
      const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
      if (envUrl && envUrl.trim() !== '') {
        return envUrl.replace(/\/$/, '');
      }
      if (process.env.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== '') {
        return `https://${process.env.NEXT_PUBLIC_VERCEL_URL.replace(/\/$/, '')}`;
      }
      return brand.urls.production;
    },

    /** Helper to resolve full absolute URLs for any route. */
    getUrl(path: string = '') {
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `${brand.urls.canonical}${cleanPath}`;
    },
  },

  // ─── Contact & Support ─────────────────────────────────────────────────────

  contact: {
    /** Support & transactional email address. */
    supportEmail: 'invoice@noblesworld.com.ng',

    /** Full SMTP "From" display string for transactional emails. */
    get smtpFrom() {
      return `Nobevra <${brand.contact.supportEmail}>`;
    },
  },

  // ─── Brand Assets ──────────────────────────────────────────────────────────

  assets: {
    /**
     * Primary horizontal logo — for desktop navbar, PDF/invoice headers.
     * Source: 729×170 PNG (high-resolution, transparent background).
     */
    logo: '/images/brand identies/logo.png',

    /**
     * Compact horizontal logo — for email headers, mobile navbar.
     * Source: 411×88 PNG (transparent background).
     */
    logoHorizontal: '/images/brand identies/horizontal_logo.png',

    /**
     * Standalone logomark / icon — for favicon, social avatar, app icon.
     * Source: 206×210 PNG (~1:1 ratio, transparent background).
     */
    icon: '/images/brand identies/icon.png',

    /**
     * Dark-background logo variant — for dark mode nav & footers.
     * Source: 434×100 PNG (transparent, white/Electric Blue lettering).
     */
    logoDark: '/images/brand identies/dark_background_version.png',

    /**
     * Light-background logo variant — for light mode cards & client portal.
     * Source: 427×88 PNG (transparent, Deep Teal lettering).
     */
    logoLight: '/images/brand identies/light_background_version.png',

    /**
     * Product mantra graphic — for landing heroes and splash banners.
     * Source: 447×60 PNG ("Run. Connect. Grow.").
     */
    mantraGraphic: '/images/brand identies/product_mantra.png',

    /**
     * OpenGraph / social preview card — 1536×1024 (3:2 ratio).
     */
    ogImage: '/images/Nobevra1.png',

    /**
     * Favicon path (served from /public/favicon.ico).
     */
    favicon: '/favicon.ico',

    /**
     * Apple touch icon path.
     */
    appleTouchIcon: '/apple-touch-icon.png',
  },

  // ─── Social & External Links ───────────────────────────────────────────────

  social: {
    twitter: 'https://twitter.com/Nobevra',
    twitterHandle: '@Nobevra',
    instagram: 'https://instagram.com/Nobevra',
    linkedin: 'https://linkedin.com/company/nobevra',
  },

  // ─── SEO Defaults ──────────────────────────────────────────────────────────

  seo: {
    /** Default page <title> when no page-level override is provided. */
    defaultTitle: 'NOBEVRA | The Intelligent Business Operating System',

    /** Title template applied to all page-level titles. */
    titleTemplate: '%s | NOBEVRA',

    /** Default meta description. */
    defaultDescription:
      'Everything Your Business Needs. One Intelligent Platform. Run. Connect. Grow. NOBEVRA is the intelligent all-in-one Business Operating System.',

    /** Default keywords array. */
    keywords: [
      'nobevra',
      'business operating system',
      'invoice software small business',
      'free invoice generator',
      'invoice maker app free',
      'AI invoice generator',
      'simple invoice generator',
      'invoice template',
      'online invoicing software',
      'billing software online',
      'business card creator',
      'QR code generator',
    ],
  },

  // ─── OpenGraph Defaults ────────────────────────────────────────────────────

  openGraph: {
    siteName: 'NOBEVRA',
    type: 'website' as const,
    locale: 'en_US',
    get title() { return brand.seo.defaultTitle; },
    get description() { return brand.seo.defaultDescription; },
    get url() { return brand.urls.canonical; },
    get image() {
      return {
        url: brand.assets.ogImage,
        width: 1536,
        height: 1024,
        alt: 'NOBEVRA — The Intelligent Business Operating System',
      };
    },
  },

  legal: {
    /**
     * Entity ownership statement.
     */
    entityName: "The Noble's Technology Services",

    /**
     * Standard legal relationship declaration.
     */
    ownershipStatement: "Nobevra is a business software platform owned and operated by The Noble's Technology Services.",

    /**
     * Full copyright attribution string for footers.
     * @example "© 2026 Nobevra. A product of The Noble's Technology Services. All rights reserved."
     */
    get fullCopyright() {
      return `© ${new Date().getFullYear()} Nobevra. A product of The Noble's Technology Services. All rights reserved.`;
    },

    /**
     * Compact copyright string.
     */
    get copyright() {
      return `© ${new Date().getFullYear()} Nobevra. All rights reserved.`;
    },

    /** Legal footer attribution line. */
    get poweredBy() {
      return `A product of ${brand.parentCompany}`;
    },

    /** Email footer legal line for transactional emails. */
    get emailFooter() {
      return `© ${new Date().getFullYear()} Nobevra. A product of ${brand.parentCompany}. All rights reserved.`;
    },
  },

  // ─── Feature Copy ──────────────────────────────────────────────────────────

  copy: {
    /** Upgrade prompt watermark label shown in brand settings. */
    watermarkLabel: 'Remove Nobevra Watermark',

    /** Watermark description shown in brand settings toggle. */
    watermarkDescription:
      "Remove the 'Powered by Nobevra' watermark from all your outgoing invoices.",

    /** Text rendered on invoice watermark for free tier users. */
    watermarkText: 'Powered by Nobevra',
  },
} as const;

export type Brand = typeof brand;

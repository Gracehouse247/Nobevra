/** @type {import('next').NextConfig} */
// NOTE: next-pwa@5.x is incompatible with Next.js 16 + Turbopack and causes
// all routes to return 404. PWA functionality is provided via the static
// manifest.webmanifest and sw.js already in the public/ directory.

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(self), geolocation=(self), interest-cohort=(), unload=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.flutterwave.com https://api.flutterwave.com https://*.ravepay.co https://maps.googleapis.com https://maps.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://images.pexels.com https://lh3.googleusercontent.com https://maps.googleapis.com https://maps.gstatic.com https://i.pravatar.cc https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com",
      "connect-src 'self' ws: wss: https://*.supabase.co https://*.supabase.in https://api.flutterwave.com https://checkout.flutterwave.com https://*.ravepay.co https://api.ravepay.co https://ravesandboxapi.flutterwave.com https://*.f4b-flutterwave.com https://open.er-api.com https://maps.googleapis.com https://fonts.googleapis.com https://fonts.gstatic.com https://www.google-analytics.com https://www.googletagmanager.com https://ip-api.com",
      "frame-src 'self' https://checkout.flutterwave.com https://checkout-v3.flutterwave.com https://checkout-v3-ui-prod.f4b-flutterwave.com https://*.ravepay.co https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com https://www.canva.com https://*.canva.com https://canva.com",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ].join('; '),
  },
  {
    key: 'X-Permitted-Cross-Domain-Policies',
    value: 'none',
  },
];

const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-hot-toast'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // output: 'standalone',
  // turbopack: {},
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // ── Legacy route kept for backward compat ──────────────────────────────
      { source: '/features/ai-voice-assistant',                destination: '/features/best-ai-invoice-generator-free',         permanent: true },

      // ── Core consolidation redirects ───────────────────────────────────────
      { source: '/invoice-generator',                          destination: '/free-invoice-generator',                          permanent: true },
      { source: '/features/ai-invoice-generator',              destination: '/features/best-ai-invoice-generator-free',         permanent: true },
      { source: '/gamified-invoicing',                         destination: '/gamified-invoicing-software',                     permanent: true },
      { source: '/features/shopify-invoice-generator',         destination: '/features/free-invoice-generator-for-shopify',     permanent: true },
      { source: '/freelance-crm',                              destination: '/lightweight-crm-for-freelancers',                 permanent: true },
      { source: '/receipt-scanner',                            destination: '/ai-receipt-scanner',                              permanent: true },

      // Invoicing consolidation
      { source: '/features/best-free-invoice-app',             destination: '/free-invoice-generator',                          permanent: true },
      { source: '/features/how-to-make-an-invoice-for-free',   destination: '/free-invoice-generator',                          permanent: true },
      { source: '/features/billing-software-online',           destination: '/invoicing',                                       permanent: true },
      { source: '/features/automated-invoicing-software',      destination: '/invoicing',                                       permanent: true },
      { source: '/features/enterprise-scaling',                destination: '/solutions/enterprise-billing-platform',           permanent: true },

      // Digital Business Card consolidation
      { source: '/business-card-maker',                        destination: '/digital-business-card',                           permanent: true },
      { source: '/where-to-make-business-cards',                destination: '/digital-business-card',                           permanent: true },
      { source: '/features/business-card-creation-free',        destination: '/digital-business-card',                           permanent: true },
      { source: '/features/digital-business-cards',            destination: '/digital-business-card',                           permanent: true },
      { source: '/features/professional-identity',             destination: '/digital-business-card',                           permanent: true },

      // QR Code consolidation
      { source: '/features/how-to-make-a-qr-code-for-a-website-free', destination: '/qr-code-generator',                       permanent: true },

      // CRM, Products & Operations mappings
      { source: '/features/lead-intelligence',                 destination: '/crm',                                             permanent: true },
      { source: '/features/crm-engine',                        destination: '/crm',                                             permanent: true },
      { source: '/features/products-services',                 destination: '/products-inventory',                              permanent: true },
      { source: '/features/growth-reports',                    destination: '/business-management-software',                   permanent: true },
      { source: '/features/team-workspace',                    destination: '/business-management-software',                   permanent: true },

      // Solutions pages
      { source: '/solutions/agencies',                         destination: '/solutions/agency-billing-platform',               permanent: true },
      { source: '/solutions/small-businesses',                 destination: '/solutions/best-small-business-invoicing-software', permanent: true },
      { source: '/solutions/ecommerce',                        destination: '/solutions/ecommerce-invoice-automation',          permanent: true },
      { source: '/solutions/enterprise',                       destination: '/solutions/enterprise-billing-platform',           permanent: true },
      { source: '/solutions/freelancers',                      destination: '/solutions/simple-invoicing-for-freelancers',      permanent: true },

      // Duplicate Homepage & Legacy Route consolidation
      { source: '/formal-homepage',                            destination: '/client-contracts',                                permanent: true },
      { source: '/home-v2',                                    destination: '/client-contracts',                                permanent: true },
      { source: '/contracts-esignature',                       destination: '/client-contracts',                                permanent: true },

      // Global pages
      { source: '/about',                                      destination: '/free-invoice-maker-app-about',                    permanent: true },
      { source: '/contact',                                    destination: '/help-center',                                     permanent: true },
      { source: '/pitch-deck',                                  destination: '/pitch',                                           permanent: true },
      { source: '/deck',                                        destination: '/pitch',                                           permanent: true },
    ];
  },
};

module.exports = nextConfig;


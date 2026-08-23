import Script from 'next/script';
import { brand } from '@/lib/brand';

/**
 * SchemaOrg — Phase 8 Structured Data Implementation
 *
 * Entities implemented:
 * - Organization   (verified: CAC-registered entity, social profiles)
 * - WebSite        (no SearchAction — no implemented site search)
 * - SoftwareApplication (with real pricing offers from live pricing page)
 * - WebPage        (homepage with primaryImageOfPage)
 * - FAQPage        (matches visible FAQ section content exactly)
 *
 * NOT implemented (no visible truthful content to support):
 * - AggregateRating / Review (zero reviews collected — no fabrication)
 * - Award / Certification (no certifications held)
 * - Customer quotes / testimonials (no verified public sources)
 */
export default function SchemaOrg() {
  const base = brand.urls.canonical;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [

      // ─── 1. ORGANIZATION ──────────────────────────────────────────────────
      // Source: CAC-registered legal entity, verified social handles in brand.ts
      {
        '@type': 'Organization',
        '@id': `${base}/#organization`,
        'name': brand.parentCompany,
        'legalName': brand.parentCompany,
        'alternateName': 'Nobevra',
        'description': 'The Noble\'s Technology Services is the CAC-registered legal entity that owns and operates Nobevra, the Intelligent Business Operating System.',
        'url': base,
        'logo': {
          '@type': 'ImageObject',
          '@id': `${base}/#logo`,
          'url': `${base}${brand.assets.logo}`,
          'contentUrl': `${base}${brand.assets.logo}`,
          'width': 729,
          'height': 170,
          'caption': 'Nobevra — The Intelligent Business Operating System',
        },
        'image': {
          '@type': 'ImageObject',
          'url': `${base}${brand.assets.ogImage}`,
          'width': 1536,
          'height': 1024,
        },
        'foundingDate': '2024',
        'areaServed': 'NG',
        'knowsAbout': [
          'Business Management Software',
          'Invoice Software',
          'CRM for Small Business',
          'Expense Tracking',
          'Digital Business Cards',
          'NFC Smart Cards',
          'QR Code Generation',
          'AI Business Intelligence',
        ],
        'sameAs': [
          brand.social.twitter,
          brand.social.instagram,
          brand.social.linkedin,
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'email': brand.contact.supportEmail,
          'contactType': 'customer support',
          'availableLanguage': 'English',
        },
        'brand': {
          '@type': 'Brand',
          'name': brand.shortName,
          'slogan': brand.promise,
        },
      },

      // ─── 2. WEBSITE ───────────────────────────────────────────────────────
      // No SearchAction — help-center search is not yet implemented
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        'url': base,
        'name': brand.name,
        'alternateName': [
          'Nobevra',
          'Nobevra OS',
          'Nobevra Business Operating System',
        ],
        'description': 'The Intelligent Business Operating System. Run, Connect and Grow your business from one platform.',
        'publisher': {
          '@id': `${base}/#organization`,
        },
        'inLanguage': 'en-NG',
      },

      // ─── 3. WEBPAGE — Homepage ────────────────────────────────────────────
      // Corresponds directly to visible page content and H1
      {
        '@type': 'WebPage',
        '@id': `${base}/#webpage`,
        'url': base,
        'name': 'Nobevra — Intelligent Business Operating System | Invoicing, CRM & More',
        'headline': 'Run Your Business. Connect Everything. Grow Without Limits.',
        'description': 'Run your business from one intelligent platform. Nobevra combines invoicing, CRM, expenses, payments, AI, business identity, teams and business intelligence.',
        'isPartOf': {
          '@id': `${base}/#website`,
        },
        'about': {
          '@id': `${base}/#software`,
        },
        'primaryImageOfPage': {
          '@type': 'ImageObject',
          'url': `${base}${brand.assets.ogImage}`,
          'width': 1536,
          'height': 1024,
          'caption': 'Nobevra — The Intelligent Business Operating System Dashboard',
        },
        'publisher': {
          '@id': `${base}/#organization`,
        },
        'inLanguage': 'en-NG',
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': base,
            },
          ],
        },
      },

      // ─── 4. SOFTWARE APPLICATION ──────────────────────────────────────────
      // Pricing corresponds exactly to the live pricing page (Starter/Pulse/Elite)
      // Only Starter (free) uses a concrete price; paid tiers use currency NGN
      // Zero fake reviews, ratings, or award claims
      {
        '@type': 'SoftwareApplication',
        '@id': `${base}/#software`,
        'name': brand.shortName,
        'alternateName': 'Nobevra Business Operating System',
        'operatingSystem': 'Web, Android, iOS',
        'applicationCategory': 'BusinessApplication',
        'applicationSubCategory': [
          'InvoicingSoftware',
          'CRMSoftware',
          'ExpenseManagementSoftware',
          'InventoryManagementSoftware',
          'PaymentSoftware',
        ],
        'description': 'Nobevra is an all-in-one intelligent business operating system combining invoicing, CRM, expense tracking, payments, AI, digital business cards, QR codes, and team workspaces.',
        'url': base,
        'offers': [
          {
            '@type': 'Offer',
            'name': 'Starter',
            'description': 'Free forever plan. Create invoices, manage clients, and build your digital business card without a credit card.',
            'price': '0',
            'priceCurrency': 'NGN',
            'availability': 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            'name': 'Pulse',
            'description': 'Advanced automations, AI business intelligence, recurring billing, and priority support.',
            'price': '7500',
            'priceCurrency': 'NGN',
            'availability': 'https://schema.org/InStock',
            'billingIncrement': 1,
          },
          {
            '@type': 'Offer',
            'name': 'Elite',
            'description': 'Team workspaces, custom domain branding, watermark removal, and full platform access.',
            'price': '22500',
            'priceCurrency': 'NGN',
            'availability': 'https://schema.org/InStock',
            'billingIncrement': 1,
          },
        ],
        'featureList': [
          'Smart Invoicing with 180+ Templates',
          'AI Expense Tracking and Receipt Scanning via Gemini',
          'Lightweight CRM and Branded Client Portal',
          'Digital Business Identity with NFC Smart Cards',
          'Dynamic QR Code Engine with Scan Telemetry',
          'Real-Time Products and Inventory Management',
          'Flutterwave Payment Gateway and In-App Wallet',
          'Team Workspaces with PostgreSQL Row-Level Security',
          'Gemini AI Business Intelligence and Growth Reports',
        ],
        'publisher': {
          '@id': `${base}/#organization`,
        },
      },

      // ─── 5. FAQPAGE ───────────────────────────────────────────────────────
      // Questions match the visible SEOQualifierFAQ section content exactly
      {
        '@type': 'FAQPage',
        '@id': `${base}/#faq`,
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is Nobevra and what does it do?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Nobevra is an intelligent Business Operating System that unifies invoicing, lightweight CRM, expense management, digital business cards, QR code generation, team workspaces, and AI business intelligence into one connected platform.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Can I start using Nobevra for free?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. Nobevra offers a Starter tier at no cost with no time limits or hidden fees. You can create invoices, manage clients, and build your digital business card without entering a credit card.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How do my clients pay their invoices?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Clients receive a secure web payment link leading to your branded Client Portal. They pay online instantly via Flutterwave using debit cards, bank transfers, or mobile money without creating an account.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What makes Nobevra different from a basic invoice generator?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Basic invoice generators produce a static PDF. Nobevra is a complete business management platform: it tracks invoice views in real time, manages CRM pipelines, automates recurring billing, scans expense receipts with Gemini AI, and provides NFC digital business cards.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Can I use Nobevra on my mobile phone?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. Nobevra is available as a high-performance web application and as native mobile apps for Android and iOS, keeping business data synced across all devices.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How is my business data protected in Nobevra?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Nobevra uses PostgreSQL Row-Level Security (RLS) policies to enforce strict multi-tenant workspace isolation. All network traffic is encrypted with 256-bit TLS, and online payments are handled by certified payment processor Flutterwave.',
            },
          },
        ],
      },
    ],
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}

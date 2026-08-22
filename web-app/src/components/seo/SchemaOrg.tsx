'use client';

import Script from 'next/script';
import { brand } from '@/lib/brand';

export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${brand.urls.canonical}/#website`,
        "url": brand.urls.canonical,
        "name": brand.name,
        "alternateName": ["Nobevra", "Nobevra OS"],
        "description": brand.seo.defaultDescription,
        "publisher": {
          "@id": `${brand.urls.canonical}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${brand.urls.canonical}/help-center?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${brand.urls.canonical}/#organization`,
        "name": brand.parentCompany,
        "legalName": brand.parentCompany,
        "url": brand.urls.canonical,
        "logo": `${brand.urls.canonical}${brand.assets.logo}`,
        "image": `${brand.urls.canonical}${brand.assets.ogImage}`,
        "sameAs": [
          brand.social.twitter,
          brand.social.instagram,
          brand.social.linkedin
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": brand.contact.supportEmail,
          "contactType": "customer support"
        },
        "brand": {
          "@type": "Brand",
          "name": brand.name,
          "slogan": brand.promise
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${brand.urls.canonical}/#software`,
        "name": brand.shortName,
        "operatingSystem": "All (Web, iOS, Android)",
        "applicationCategory": "BusinessApplication",
        "description": brand.seo.defaultDescription,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "publisher": {
          "@id": `${brand.urls.canonical}/#organization`
        },
        "featureList": [
          "Invoicing & Billing Automation",
          "Client Management & CRM",
          "Expense Management & Receipt Scanning",
          "Business Financial Intelligence",
          "QR & NFC Digital Business Cards",
          "Global Payments & Settlements"
        ]
      }
    ]
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

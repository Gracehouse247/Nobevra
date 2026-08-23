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
        "alternateName": ["Nobevra", "Nobevra OS", "Nobevra Business Operating System"],
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
          "priceCurrency": "USD",
          "description": "Starter free forever plan available"
        },
        "publisher": {
          "@id": `${brand.urls.canonical}/#organization`
        },
        "featureList": [
          "Smart Invoicing with 180+ Templates",
          "AI Expense Tracking & Receipt Scanning via Gemini",
          "Lightweight CRM & Client Portal",
          "Business Identity & Smart NFC Cards",
          "Dynamic QR Code Engine & Scan Telemetry",
          "Real-Time Products & Inventory Management",
          "Flutterwave Payment Gateway & In-App Wallet",
          "Team Workspaces with PostgreSQL Row-Level Security",
          "Gemini AI Business Intelligence & Growth Reports"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${brand.urls.canonical}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Nobevra and how does it work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nobevra is an intelligent Business Operating System that unifies invoicing, lightweight CRM, expense management, digital business cards, QR code generation, team workspaces, and AI business intelligence into one single platform."
            }
          },
          {
            "@type": "Question",
            "name": "Can I start using Nobevra for free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Nobevra offers a Starter tier with no time limits or hidden fees. You can create invoices, manage clients, and build your digital business card without entering a credit card."
            }
          },
          {
            "@type": "Question",
            "name": "How do my clients pay their invoices?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your clients receive a secure web payment link leading to your branded Client Portal. They can view invoice details and pay online instantly via Flutterwave using debit cards, bank transfers, or mobile money without creating an account."
            }
          },
          {
            "@type": "Question",
            "name": "What makes Nobevra different from basic invoice generators?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard invoice generators only create a static PDF document. Nobevra is a complete business management platform: it tracks invoice views in real time, manages customer relationship pipelines, automates recurring billing, scans expense receipts with AI, and provides digital identity NFC cards."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use Nobevra on my mobile phone?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Nobevra is available as both a high-performance web app and native mobile apps for Android and iOS, keeping your business data synced seamlessly across all devices."
            }
          },
          {
            "@type": "Question",
            "name": "How is my business and financial data protected?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nobevra employs PostgreSQL Row-Level Security (RLS) policies to ensure strict workspace and multi-tenant data isolation. All network traffic is encrypted via 256-bit TLS/HTTPS protocols, and online payments are securely processed by certified payment gateways."
            }
          }
        ]
      }
    ]
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

import type { Metadata } from 'next';

/* ── SEO Metadata ─────────────────────────────────────────────────
   Focus Keyword    : invoicing software features
   Semantic Keywords: expense tracking software, client management software,
                       billing software with CRM, recurring billing software,
                       automated billing platform, invoice automation software,
                       invoice generator tools, online payment integration software,
                       billing and invoicing software features
   Intent           : Evaluative / Commercial — Users comparing
                       features and specific software capabilities
   Source           : Live SerpAPI data · Jul 2026
──────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
    title: 'Invoicing Software Features & Small Business Tools Suite | Nobevra',
    description: 'Explore all Nobevra platform features: smart invoicing software, CRM, AI receipt scanning, multi-currency payments, client portals, e-signatures, and digital business cards.',
    keywords: [
        'invoicing software features',
        'expense tracking software',
        'client management software',
        'billing software with CRM',
        'recurring billing software',
        'automated billing platform',
        'invoice automation software',
        'invoice generator tools',
        'online payment integration software',
        'billing and invoicing software features',
        'nobevra features',
        'business operating system',
    ],
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/features',
    },
    openGraph: {
        title: 'Invoicing Software Features & Small Business Tools Suite | Nobevra',
        description: 'Explore all Nobevra platform features: smart invoicing, CRM, AI tools, multi-currency payments, client portals, and digital business cards — all in one platform.',
        url: 'https://nobevra.noblesworld.com.ng/features',
        type: 'website',
        images: [
            {
                url: '/images/precision-invoicing.png',
                width: 1200,
                height: 630,
                alt: 'Nobevra platform features overview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'All Nobevra Features — Invoicing, CRM, AI & Payments',
        description: 'Invoicing, recurring billing, CRM, client portals, AI tools, global payments and more — all in one platform.',
        images: ['/images/precision-invoicing.png'],
    },
};

const featuresHubSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Nobevra Platform Features',
    description: 'Complete list of features available in the Nobevra business operating system.',
    url: 'https://nobevra.noblesworld.com.ng/features',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Online Invoicing Software', url: 'https://nobevra.noblesworld.com.ng/invoicing' },
        { '@type': 'ListItem', position: 2, name: 'Free Invoice Generator', url: 'https://nobevra.noblesworld.com.ng/free-invoice-generator' },
        { '@type': 'ListItem', position: 3, name: 'Recurring Billing Software', url: 'https://nobevra.noblesworld.com.ng/recurring-billing-software' },
        { '@type': 'ListItem', position: 4, name: 'Client Management CRM', url: 'https://nobevra.noblesworld.com.ng/crm' },
        { '@type': 'ListItem', position: 5, name: 'Client Portal Software', url: 'https://nobevra.noblesworld.com.ng/client-portal-software' },
        { '@type': 'ListItem', position: 6, name: 'Client Contracts & E-Signature', url: 'https://nobevra.noblesworld.com.ng/client-contracts' },
        { '@type': 'ListItem', position: 7, name: 'Cash Flow Analytics', url: 'https://nobevra.noblesworld.com.ng/cash-flow-analytics' },
        { '@type': 'ListItem', position: 8, name: 'Expense Management', url: 'https://nobevra.noblesworld.com.ng/expense-management' },
        { '@type': 'ListItem', position: 9, name: 'AI Business Assistant', url: 'https://nobevra.noblesworld.com.ng/ai-business-assistant' },
        { '@type': 'ListItem', position: 10, name: 'Digital Business Cards', url: 'https://nobevra.noblesworld.com.ng/digital-business-card' },
        { '@type': 'ListItem', position: 11, name: 'Dynamic QR Code Generator', url: 'https://nobevra.noblesworld.com.ng/qr-code-generator' },
        { '@type': 'ListItem', position: 12, name: 'Global Payments', url: 'https://nobevra.noblesworld.com.ng/payments' },
    ],
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresHubSchema) }}
            />
            {children}
        </>
    );
}

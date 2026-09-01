import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Industry Solutions — Tailored Billing & Business Software | Nobevra',
    description: 'Discover tailored billing, invoicing, and business management solutions engineered for freelancers, digital agencies, small businesses, e-commerce stores, and enterprises.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/solutions',
    },
    keywords: [
        'invoicing solutions',
        'agency billing platform',
        'freelance invoicing software',
        'small business billing software',
        'ecommerce invoice automation',
        'enterprise billing platform',
        'industry billing software',
        'custom invoicing systems',
    ],
    openGraph: {
        title: 'Industry Solutions — Tailored Business & Invoicing Platforms | Nobevra',
        description: 'Explore purpose-built billing and operating solutions for freelancers, agencies, growing businesses, online merchants, and enterprise organizations.',
        url: 'https://nobevra.noblesworld.com.ng/solutions',
        type: 'website',
        images: [
            {
                url: '/images/precision-invoicing.png',
                width: 1200,
                height: 630,
                alt: 'Nobevra Industry Solutions Overview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Industry Solutions | Nobevra',
        description: 'Purpose-built billing and business management platforms for freelancers, agencies, e-commerce, and enterprises.',
        images: ['/images/precision-invoicing.png'],
    },
};

const solutionsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Nobevra Industry Solutions',
    description: 'Tailored invoicing, billing, and operational software solutions for specific business models and industries.',
    url: 'https://nobevra.noblesworld.com.ng/solutions',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Invoicing for Freelancers & Solopreneurs',
            url: 'https://nobevra.noblesworld.com.ng/solutions/simple-invoicing-for-freelancers',
            description: 'Fast, branded billing, client portals, and instant global card settlements for solopreneurs.',
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Agency Billing Platform',
            url: 'https://nobevra.noblesworld.com.ng/solutions/agency-billing-platform',
            description: 'Retainer billing, multi-client management, and automated contracts for creative and digital agencies.',
        },
        {
            '@type': 'ListItem',
            position: 3,
            name: 'Small Business Invoicing Software',
            url: 'https://nobevra.noblesworld.com.ng/solutions/best-small-business-invoicing-software',
            description: 'Expense management, cash flow analytics, and multi-currency billing for growing teams.',
        },
        {
            '@type': 'ListItem',
            position: 4,
            name: 'E-Commerce Invoice Automation',
            url: 'https://nobevra.noblesworld.com.ng/solutions/ecommerce-invoice-automation',
            description: 'Automated order-to-invoice generation, tax calculation, and receipt delivery for online stores.',
        },
        {
            '@type': 'ListItem',
            position: 5,
            name: 'Enterprise Billing Platform',
            url: 'https://nobevra.noblesworld.com.ng/solutions/enterprise-billing-platform',
            description: 'High-volume financial infrastructure, custom SLAs, dedicated databases, and multi-entity support.',
        },
    ],
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionsSchema) }}
            />
            {children}
        </>
    );
}

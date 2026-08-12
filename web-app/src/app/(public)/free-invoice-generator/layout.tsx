import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Invoice Generator — Create Professional Invoices Online | NobleInvoice',
    description:
        'Use our free invoice generator to create invoice online in seconds. Download a polished PDF, add your logo, set payment terms, and get paid faster. Trusted by 2M+ businesses. No sign-up required.',
    keywords: [
        'free invoice generator',
        'create invoice online',
        'professional invoice maker',
        'billing software',
        'invoice PDF download',
        'free invoice template',
        'online invoice creator',
    ],
    openGraph: {
        title: 'Free Invoice Generator — Create Invoices Online in 30 Seconds',
        description:
            'The professional invoice maker trusted by 2,000,000+ freelancers. Create, download, and send invoices free. No sign-up required.',
        url: 'https://nobleinvoice.com/invoice-generator',
        siteName: 'NobleInvoice',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Invoice Generator | NobleInvoice',
        description:
            'Create professional invoices online free. Download PDF instantly. No credit card needed.',
    },
    alternates: {
        canonical: 'https://nobleinvoice.com/invoice-generator',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Is this free invoice generator actually free?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, completely. You can fill in your details and download a PDF invoice without creating an account or entering a credit card. The free tier has no hidden costs.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the difference between a free invoice generator and billing software?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'A free invoice generator creates a static PDF file. Billing software saves your client history, tracks whether the invoice has been opened, sends automated payment reminders, and lets clients pay by card directly on the invoice.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I add my company logo?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. You can upload your logo and it will appear at the top of your generated PDF exactly as you would expect on a professionally designed invoice.',
            },
        },
        {
            '@type': 'Question',
            name: 'Are these invoices legally binding?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: "When filled out correctly with your registered business information, the client's details, accurate line items, and a unique invoice number, the generated document is a legally valid commercial invoice in most jurisdictions.",
            },
        },
        {
            '@type': 'Question',
            name: 'Can I use this internationally with different currencies?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. The generator supports 160+ currencies including USD, GBP, EUR, NGN, GHS, and more. You can also adjust the tax rate to match your local government requirements (VAT, GST, Sales Tax, etc.).',
            },
        },
    ],
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nobleinvoice.com' },
        { '@type': 'ListItem', position: 2, name: 'Free Invoice Generator', item: 'https://nobleinvoice.com/invoice-generator' },
    ],
};

const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NobleInvoice Free Invoice Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '2841',
        bestRating: '5',
    },
};

export default function InvoiceGeneratorLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            {children}
        </>
    );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Client Contract Software & E-Signatures — Legally Binding Agreements | Nobevra',
    description: 'Create, send, and e-sign legally binding client contracts online with Nobevra. Pre-built freelance & service agreement templates, SHA-256 audit trails, and 1-click invoice conversion.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/client-contracts',
    },
    keywords: [
        'client contract software',
        'online contract maker',
        'contract e-signature',
        'freelance contract generator',
        'esignature software for small business',
        'service agreement template',
        'digital signature software',
        'legally binding digital contracts',
        'online service agreement signer',
        'ESIGN compliant contracts',
        'agency proposal and contract'
    ],
    openGraph: {
        title: 'Client Contract Software & E-Signatures | Nobevra',
        description: 'Create, send, and e-sign legally binding client contracts online. Pre-built templates, SHA-256 audit trails, and automatic deposit invoice conversion.',
        url: 'https://nobevra.noblesworld.com.ng/client-contracts',
        type: 'website',
        images: ['/images/precision-invoicing.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Client Contract Software & E-Signatures | Nobevra',
        description: 'Legally binding digital contracts, mobile e-signatures, and instant 1-click invoice conversion.',
        images: ['/images/precision-invoicing.png'],
    },
};

export default function ClientContractsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

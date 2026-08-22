import type { Metadata } from 'next';

/* ── SEO Metadata ─────────────────────────────────────────────────
   Focus Keyword    : expense tracking software (120 results · 6 ads)
   Semantic Keywords: client management software (120),
                       billing software with CRM (125),
                       recurring billing software (128),
                       automated billing platform (129),
                       invoice automation software (129),
                       invoice generator tools (130),
                       online payment integration software (140),
                       billing and invoicing software features (155),
                       invoicing software features (192)
   Intent           : Evaluative / Commercial — Users comparing
                       features and specific software capabilities
   Source           : Live SerpAPI data · Jul 2026
──────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
    title: 'Expense Tracking Software & Invoicing Features | Nobevra',
    description: 'Explore all features: expense tracking software, invoice automation, recurring billing, and client management CRM all built into one platform.',
    keywords: [
        'expense tracking software',
        'client management software',
        'billing software with CRM',
        'recurring billing software',
        'automated billing platform',
        'invoice automation software',
        'invoice generator tools',
        'online payment integration software',
        'billing and invoicing software features',
        'invoicing software features',
    ],
    alternates: {
        canonical: '/features',
    },
    openGraph: {
        title: 'Platform Features | Nobevra',
        description: 'Explore our full suite of expense tracking software, CRM tools, and invoice automation built for modern service businesses.',
        url: '/features',
        type: 'website',
    },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

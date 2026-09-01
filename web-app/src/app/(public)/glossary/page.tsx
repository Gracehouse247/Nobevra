import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { BookMarked, Search, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Business & Invoicing Glossary — Financial & SaaS Terms Defined | Nobevra',
  description: 'The complete A–Z glossary of business management, invoicing, tax, and SaaS financial terms: DSO, retainage, reverse charge, proforma invoice, withholding tax, and more.',
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/glossary',
  },
  keywords: [
    'invoicing glossary',
    'business terms dictionary',
    'what is DSO',
    'what is proforma invoice',
    'reverse charge meaning',
    'withholding tax defined',
    'SaaS billing terms',
  ],
  openGraph: {
    title: 'Business & Invoicing Glossary — Financial & SaaS Terms Defined | Nobevra',
    description: 'Clear, authoritative definitions for essential business management, billing, accounting, and tax terms.',
    url: 'https://nobevra.noblesworld.com.ng/glossary',
    type: 'website',
    images: [
      {
        url: '/images/precision-invoicing.png',
        width: 1200,
        height: 630,
        alt: 'Nobevra Business & Invoicing Glossary',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business & Invoicing Glossary | Nobevra',
    description: 'Clear definitions for essential business management, billing, accounting, and tax terms.',
    images: ['/images/precision-invoicing.png'],
  },
};

const GLOSSARY_TERMS = [
  {
    letter: 'A',
    terms: [
      {
        term: 'Accounts Receivable (AR)',
        def: 'The total balance of money owed to a business for goods or services delivered but not yet paid for by customers. Tracked as an asset on the balance sheet.',
        link: '/cash-flow-analytics',
        linkText: 'Track AR in Cash Flow Analytics →',
      },
      {
        term: 'Agile Sprint Billing',
        def: 'A billing model where software developers or agencies invoice clients on fixed 2-week intervals aligned with completed development sprints rather than open-ended hours.',
        link: '/templates/web-developer-invoice-template',
        linkText: 'Web Developer Invoice Template →',
      },
      {
        term: 'Automated Dunning',
        def: 'The automated communication process of retrying failed customer credit card payments and sending structured email reminders for past-due invoices.',
        link: '/recurring-billing-software',
        linkText: 'Automated Dunning in Recurring Billing →',
      },
    ],
  },
  {
    letter: 'B',
    terms: [
      {
        term: 'Billable Hours',
        def: 'The time spent directly on revenue-generating client deliverables that can be itemized and billed according to an agreed hourly rate.',
        link: '/features/freelance-rate-calculator',
        linkText: 'Calculate Billable Rates →',
      },
      {
        term: 'Burn Rate',
        def: 'The rate at which a company spends its cash reserves before generating positive operating cash flow, typically measured on a monthly basis.',
        link: '/cash-flow-analytics',
        linkText: 'Monitor Cash Runway →',
      },
    ],
  },
  {
    letter: 'C',
    terms: [
      {
        term: 'Client Portal',
        def: 'A secure, white-labeled web hub where clients can review outstanding invoices, make instant credit card payments, download historical receipts, and sign contracts.',
        link: '/client-portal-software',
        linkText: 'Client Portal Software →',
      },
      {
        term: 'Commercial Invoice',
        def: 'The official legal billing document issued by a seller to a buyer demanding payment for delivered goods or rendered services. Essential for tax and customs declaration.',
        link: '/features/what-is-invoicing-software',
        linkText: 'What is Invoicing Software? →',
      },
    ],
  },
  {
    letter: 'D',
    terms: [
      {
        term: 'Days Sales Outstanding (DSO)',
        def: 'A critical financial metric measuring the average number of days required to collect payment after an invoice is issued. Calculated as: (Accounts Receivable ÷ Total Sales) × 365.',
        link: '/features/how-to-manage-business-cash-flow',
        linkText: 'DSO Reduction Playbook →',
      },
      {
        term: 'Digital Business Card',
        def: 'An interactive digital identity profile accessible via NFC tap card, QR code, or short link that captures contact details and syncs directly to a CRM.',
        link: '/digital-business-card',
        linkText: 'Digital Business Cards →',
      },
      {
        term: 'Due on Receipt',
        def: 'A payment term requiring the client to remit payment immediately upon receiving the invoice, with zero grace period.',
        link: '/invoicing',
        linkText: 'Invoicing Software →',
      },
    ],
  },
  {
    letter: 'E',
    terms: [
      {
        term: 'Economic Nexus',
        def: 'A US tax principle established under South Dakota v. Wayfair (2018) stating that remote out-of-state sellers must collect and remit state sales tax once exceeding specific sales thresholds ($100K or 200 transactions).',
        link: '/templates/us-sales-tax-invoice-template',
        linkText: 'US Sales Tax Template →',
      },
      {
        term: 'Electronic Signature (E-Sign)',
        def: 'A legally recognized digital indication of an intent to agree to the terms of a contract, backed by cryptographic audit trails.',
        link: '/client-contracts',
        linkText: 'Client Contract Software →',
      },
    ],
  },
  {
    letter: 'N',
    terms: [
      {
        term: 'Net 30 / Net 60 Terms',
        def: 'Credit terms granting the client 30 or 60 calendar days from the invoice date to complete payment before the balance is classified as overdue.',
        link: '/features/how-to-manage-business-cash-flow',
        linkText: 'Managing Payment Terms →',
      },
      {
        term: 'NFC Tap Card',
        def: 'A physical plastic or metal smart card containing a Near Field Communication chip that instantly broadcasts a digital business profile to any smartphone with one tap.',
        link: '/digital-business-card',
        linkText: 'NFC Smart Cards →',
      },
    ],
  },
  {
    letter: 'P',
    terms: [
      {
        term: 'Proforma Invoice',
        def: 'A preliminary quotation or estimated invoice sent to a buyer prior to work commencement or shipment to clarify scope, pricing, and customs value. Not a formal tax demand.',
        link: '/features/how-to-make-a-proforma-invoice',
        linkText: 'How to Make a Proforma Invoice →',
      },
      {
        term: 'Progress Billing',
        def: 'An incremental invoicing method commonly used in construction and long-term consulting where invoices are issued upon completing defined milestone percentages.',
        link: '/templates/contractor-construction-invoice-template',
        linkText: 'Contractor Invoice Template →',
      },
    ],
  },
  {
    letter: 'R',
    terms: [
      {
        term: 'Retainage / Retention',
        def: 'A percentage (usually 5%–10%) of each progress payment withheld by a client in construction or contracting until the entire project is completed satisfactorily.',
        link: '/templates/contractor-construction-invoice-template',
        linkText: 'Progress Billing & Retainage →',
      },
      {
        term: 'Reverse Charge Mechanism',
        def: 'A European Union and GCC tax rule for B2B cross-border services where VAT liability shifts from the seller to the buyer, allowing the seller to issue an invoice with 0% VAT.',
        link: '/templates/eu-reverse-charge-invoice-template',
        linkText: 'EU Reverse Charge Invoice Template →',
      },
    ],
  },
  {
    letter: 'W',
    terms: [
      {
        term: 'Withholding Tax (WHT)',
        def: 'An advance income tax deducted at source by a corporate client before remitting payment to a service vendor, commonly required in Nigeria (5%–10%) and other jurisdictions.',
        link: '/templates/nigeria-vat-invoice-template',
        linkText: 'Nigeria VAT & WHT Template →',
      },
      {
        term: 'Working Capital',
        def: 'The difference between a company’s current assets (cash, accounts receivable) and current liabilities (accounts payable). Measures short-term liquidity.',
        link: '/cash-flow-analytics',
        linkText: 'Cash Flow & Working Capital →',
      },
    ],
  },
];

export default function GlossaryPage() {
  const definedTermSetSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    'name': 'Nobevra Business & Invoicing Glossary',
    'description': 'Authoritative glossary of invoicing, SaaS, accounting, and business operations terminology.',
    'url': 'https://nobevra.noblesworld.com.ng/glossary',
    'hasDefinedTerm': GLOSSARY_TERMS.flatMap((group) =>
      group.terms.map((t) => ({
        '@type': 'DefinedTerm',
        'name': t.term,
        'description': t.def,
        'inDefinedTermSet': 'https://nobevra.noblesworld.com.ng/glossary',
      }))
    ),
  };

  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }} />

      <BreadcrumbSchema
        pageId="glossary"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Business & Invoicing Glossary' },
        ]}
      />

      {/* Hero */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-6">
            <BookMarked className="w-4 h-4" />
            Financial & SaaS Dictionary
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
            Business & Invoicing <span className="text-noble-blue">Glossary</span>
          </h1>
          <p className="text-lg md:text-xl text-near-black/60 leading-relaxed mb-8">
            Essential definitions for financial metrics, payment terms, tax mechanisms, and invoicing concepts to help you navigate modern commerce.
          </p>
        </div>
      </section>

      {/* Alphabetical Terms List */}
      <section className="max-w-[1000px] mx-auto px-4 md:px-8 pb-20 space-y-12">
        {GLOSSARY_TERMS.map((group) => (
          <div key={group.letter} className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-noble-blue/20 pb-2">
              <span className="text-3xl font-black text-noble-blue">{group.letter}</span>
              <div className="h-0.5 flex-1 bg-slate-100" />
            </div>

            <div className="space-y-4">
              {group.terms.map((item) => (
                <div key={item.term} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <h2 className="text-lg font-black text-near-black">{item.term}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.def}</p>
                  {item.link && (
                    <div className="pt-2">
                      <Link href={item.link} className="text-xs font-bold text-noble-blue hover:underline inline-flex items-center gap-1">
                        {item.linkText}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

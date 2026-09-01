import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FreelanceRateCalculator from '@/components/tools/FreelanceRateCalculator';
import { CheckCircle2, ArrowRight, AlertCircle, FileText, DollarSign, Clock, Shield, Repeat, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Bill Clients on Retainer — Agency Retainer Guide 2025 | Nobevra',
  description: 'Complete guide to agency retainer billing: how to structure retainer contracts, set pricing, handle scope creep, automate recurring invoices, and protect cashflow.',
  alternates: { canonical: 'https://nobevra.noblesworld.com.ng/features/how-to-bill-clients-on-retainer' },
  keywords: [
    'how to bill on retainer',
    'agency retainer contract guide',
    'retainer invoice template',
    'freelance retainer billing',
    'how to set up recurring billing',
    'retainer agreement pricing',
  ],
  openGraph: {
    title: 'How to Bill Clients on Retainer — Complete Agency Guide | Nobevra',
    description: 'Structure, price, and automate agency retainer billing. The complete guide to recurring revenue and client retainer contracts.',
    url: 'https://nobevra.noblesworld.com.ng/features/how-to-bill-clients-on-retainer',
    type: 'article',
    images: [
      {
        url: '/images/precision-invoicing.png',
        width: 1200,
        height: 630,
        alt: 'Nobevra Agency Guide: How to Bill Clients on Retainer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Bill Clients on Retainer | Nobevra',
    description: 'Complete guide to structuring retainer models, pricing math, contract clauses, and auto-billing.',
    images: ['/images/precision-invoicing.png'],
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'How to Bill Clients on Retainer',
  'description': 'A step-by-step guide to structuring, pricing, contracting, and automating agency retainer billing.',
  'step': [
    { '@type': 'HowToStep', 'position': 1, 'name': 'Choose Your Retainer Model', 'text': 'Decide between deliverables-based, hours-cap with overage, or standby access retainer structures based on your client relationship and service type.' },
    { '@type': 'HowToStep', 'position': 2, 'name': 'Calculate Your Retainer Price', 'text': 'Use your target hourly rate, estimated monthly hours, and overhead costs to determine a sustainable monthly retainer fee.' },
    { '@type': 'HowToStep', 'position': 3, 'name': 'Draft a Retainer Agreement', 'text': 'Document scope, deliverables, overage policy, rollover terms, termination clause, and late payment fees in a signed contract before starting work.' },
    { '@type': 'HowToStep', 'position': 4, 'name': 'Set Up Automated Recurring Invoices', 'text': 'Configure automatic monthly invoices in Nobevra so billing happens on the 1st of every month without manual effort.' },
    { '@type': 'HowToStep', 'position': 5, 'name': 'Send Monthly Progress Reports', 'text': 'Pair every retainer invoice with a brief status report showing work completed, hours used, and upcoming deliverables to build trust and reduce cancellations.' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    { '@type': 'Question', 'name': 'What is a retainer in billing?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'A retainer is a recurring, pre-agreed fee paid by a client to reserve an agency or freelancer\'s ongoing availability and services. Unlike project billing, a retainer creates predictable monthly revenue and ensures the client has priority access to your capacity.' } },
    { '@type': 'Question', 'name': 'How much should I charge for a monthly retainer?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Calculate your retainer fee by multiplying your minimum hourly rate by the estimated monthly hours you will dedicate to the client, then add a 15–25% buffer for admin, revisions, and overhead. Use the Freelance Rate Calculator on this page to compute your exact minimum rate before negotiating retainer terms.' } },
    { '@type': 'Question', 'name': 'What happens to unused hours in a retainer?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Unused retainer hours are typically non-refundable and non-rollover unless your retainer agreement explicitly states otherwise. Always define this in writing. Offering a maximum one-month rollover can help retain client goodwill while protecting your revenue.' } },
    { '@type': 'Question', 'name': 'How do I invoice a retainer client?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Retainer invoices should be sent on a fixed date each month (e.g. the 1st), before work begins for that month for pre-paid retainers. Include the retainer fee, billing period, and reference the signed retainer agreement number. Use Nobevra\'s recurring billing feature to automate this entirely.' } },
  ],
};

const RETAINER_MODELS = [
  {
    icon: FileText,
    title: 'Deliverables-Based Retainer',
    color: 'blue',
    best: 'Best for: Design agencies, content studios, PR firms',
    description: 'Client pays a fixed monthly fee for a defined set of deliverables: 4 blog posts, 12 social graphics, 1 strategy report. Hours are irrelevant — only output is tracked.',
    pros: ['Client knows exactly what they are buying', 'Protects your time from scope creep', 'Encourages efficiency — finish faster, earn more per hour', 'Easy to scope and track in monthly reports'],
    cons: ['Requires crystal-clear deliverable definitions upfront', 'Scope changes require formal amendment process'],
  },
  {
    icon: Clock,
    title: 'Hours-Cap with Overage Billing',
    color: 'emerald',
    best: 'Best for: Development agencies, consultancies, legal/accounting firms',
    description: 'Client pays for a set number of hours per month (e.g. 20 hours @ $150/hr = $3,000/month). Hours beyond the cap are billed at the overage rate (typically 1.25–1.5× standard rate).',
    pros: ['Fair and transparent — client sees exactly what their budget buys', 'Overage billing rewards you for extra work', 'Flexible for variable-scope client relationships'],
    cons: ['Requires time tracking and monthly time reports', 'Clients may resist overage invoices without prior approval'],
  },
  {
    icon: Shield,
    title: 'Standby Access / Availability Retainer',
    color: 'amber',
    best: 'Best for: Senior consultants, fractional executives, specialized lawyers',
    description: 'Client pays to keep you "on call" and available as a priority resource. They pay for access, not a specific output. Usage is typically capped (e.g. up to 8 advisory hours/month).',
    pros: ['Premium pricing — clients pay for priority access', 'Low deliverable commitment — you are paid to be available', 'Ideal for senior strategic advisors and specialists'],
    cons: ['Harder to justify to clients without senior reputation', 'Requires clear availability window definitions'],
  },
];

const CONTRACT_CLAUSES = [
  { title: 'Scope of Services', desc: 'Define exactly what is and is not included each month. Ambiguity in scope is the primary cause of retainer disputes.' },
  { title: 'Monthly Billing Date', desc: 'State the fixed date invoices will be issued (e.g. 1st of each month) and the payment due date (e.g. Net 7 or Net 15).' },
  { title: 'Unused Hours / Deliverables Policy', desc: 'Explicitly state whether unused hours or deliverables roll over, expire, or credit toward next month. Non-rollover is the professional standard.' },
  { title: 'Overage & Change Order Process', desc: 'Define the hourly rate for work beyond the retainer scope, and require written approval from the client before incurring overages.' },
  { title: 'Termination Notice Period', desc: 'Require 30–60 days written notice from either party. This protects your pipeline and gives clients time to transition.' },
  { title: 'Late Payment Fees', desc: 'Apply 1.5–2% monthly interest on overdue balances. State this clearly on every invoice to deter consistent late payers.' },
  { title: 'IP Ownership Milestone', desc: 'Define when intellectual property transfers to the client — typically upon receipt of cleared payment for that billing period.' },
  { title: 'Confidentiality & Non-Solicitation', desc: 'Include an NDA clause and a non-solicitation clause preventing the client from hiring your team members directly.' },
];

export default function HowToBillOnRetainerPage() {
  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BreadcrumbSchema
        pageId="how-to-bill-on-retainer"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Invoicing Guides', item: 'https://nobevra.noblesworld.com.ng/features' },
          { name: 'How to Bill Clients on Retainer' },
        ]}
      />

      {/* Hero */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-6">
            <Repeat className="w-4 h-4" />
            Agency Retainer Billing Masterclass
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
            How to Bill Clients on Retainer: The Complete Agency Guide
          </h1>
          <p className="text-xl text-near-black/60 leading-relaxed mb-8">
            Recurring revenue transforms agencies from feast-or-famine freelance shops into predictable, scalable businesses. This guide covers everything: choosing the right retainer model, pricing it correctly, drafting an ironclad agreement, and automating the entire billing process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/recurring-billing-software" className="px-7 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
              Automate Retainer Billing <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/client-contracts" className="px-7 py-4 bg-white border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2">
              Sign Retainer Contracts →
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Retainer Models */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-3xl font-black text-near-black mb-3">The 3 Core Retainer Billing Models</h2>
        <p className="text-near-black/60 mb-10 max-w-2xl">Choosing the wrong retainer structure is the single biggest mistake agencies make. Each model has a specific client profile and service context where it works best.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {RETAINER_MODELS.map((model) => (
            <div key={model.title} className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                model.color === 'blue' ? 'bg-noble-blue/10 text-noble-blue' :
                model.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' :
                'bg-amber-500/10 text-amber-600'
              }`}>
                <model.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">{model.best}</span>
              <h3 className="text-xl font-black text-near-black mb-3">{model.title}</h3>
              <p className="text-sm text-near-black/60 leading-relaxed mb-5">{model.description}</p>
              <div className="space-y-2">
                {model.pros.map((p) => (
                  <div key={p} className="flex items-start gap-2 text-xs text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    {p}
                  </div>
                ))}
                {model.cons.map((c) => (
                  <div key={c} className="flex items-start gap-2 text-xs text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rate Calculator */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-3xl font-black text-near-black mb-3">Calculate Your Minimum Retainer Price</h2>
        <p className="text-near-black/60 mb-10 max-w-2xl">Before you negotiate any retainer fee, you must know your mathematically minimum viable rate. Adjust the sliders to compute your exact target hourly rate and retainer tiers.</p>
        <FreelanceRateCalculator />
      </section>

      {/* Contract Clauses */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-3xl font-black text-near-black mb-3">8 Non-Negotiable Retainer Contract Clauses</h2>
        <p className="text-near-black/60 mb-10 max-w-2xl">Every retainer agreement must include these clauses to protect your revenue and client relationships. Missing any one of these is how agencies lose thousands to scope creep and non-payment.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {CONTRACT_CLAUSES.map((clause, i) => (
            <div key={clause.title} className="flex gap-5 p-5 bg-white rounded-2xl border border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-noble-blue/10 text-noble-blue font-black text-sm flex items-center justify-center shrink-0">{i + 1}</div>
              <div>
                <h3 className="font-black text-sm text-near-black mb-1">{clause.title}</h3>
                <p className="text-xs text-near-black/60 leading-relaxed">{clause.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/client-contracts" className="inline-flex items-center gap-2 px-7 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-blue-500/20">
            <FileText className="w-4 h-4" />
            Create & Sign Retainer Contracts Online
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-3xl font-black text-near-black mb-8">Retainer Billing FAQs</h2>
        <div className="space-y-4 max-w-3xl">
          {faqSchema.mainEntity.map((faq: any) => (
            <div key={faq.name} className="p-6 bg-white rounded-2xl border border-slate-100">
              <h3 className="text-base font-black text-near-black mb-3">{faq.name}</h3>
              <p className="text-sm text-near-black/70 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Guides */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h3 className="text-lg font-black text-near-black mb-6">Related Billing Guides & Tools</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: '/features/how-to-manage-business-cash-flow', label: 'Manage Business Cash Flow', badge: 'New Guide' },
            { href: '/recurring-billing-software', label: 'Recurring Billing Software', badge: 'Product' },
            { href: '/client-contracts', label: 'Client Contracts & E-Signatures', badge: 'Product' },
            { href: '/solutions/agency-billing-platform', label: 'Agency Billing Platform', badge: 'Solution' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-noble-blue hover:shadow-md transition-all group">
              <span className="text-[10px] font-black uppercase tracking-widest text-noble-blue block mb-1">{link.badge}</span>
              <h4 className="font-black text-sm text-near-black group-hover:text-noble-blue transition-colors">{link.label}</h4>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

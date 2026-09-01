import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import LatePaymentROICalculator from '@/components/tools/LatePaymentROICalculator';
import { CheckCircle2, ArrowRight, AlertTriangle, TrendingUp, Clock, DollarSign, Zap, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Manage Business Cash Flow — Complete SMB Guide 2025 | Nobevra',
  description: 'Master business cash flow management: reduce DSO, eliminate late payments, automate accounts receivable, and accelerate working capital. Includes interactive DSO calculator.',
  alternates: { canonical: 'https://nobevra.noblesworld.com.ng/features/how-to-manage-business-cash-flow' },
  keywords: [
    'how to manage business cash flow',
    'cash flow management for small business',
    'how to reduce DSO',
    'accounts receivable automation',
    'reduce late payments',
    'working capital management',
    'cash flow forecasting',
  ],
  openGraph: {
    title: 'How to Manage Business Cash Flow — Complete SMB Playbook | Nobevra',
    description: 'The complete small business cash flow playbook: DSO reduction, automated dunning, payment term optimization, and working capital acceleration.',
    url: 'https://nobevra.noblesworld.com.ng/features/how-to-manage-business-cash-flow',
    type: 'article',
    images: [
      {
        url: '/images/cashflow-dashboard.png',
        width: 1200,
        height: 630,
        alt: 'Nobevra Cash Flow Management Playbook for SMBs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Manage Business Cash Flow | Nobevra',
    description: 'Reduce DSO, eliminate late payments, automate accounts receivable, and accelerate working capital.',
    images: ['/images/cashflow-dashboard.png'],
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'How to Manage Business Cash Flow',
  'description': 'A practical playbook for small businesses to reduce DSO, eliminate late payments, and accelerate working capital.',
  'step': [
    { '@type': 'HowToStep', 'position': 1, 'name': 'Calculate Your Current DSO', 'text': 'Divide your total accounts receivable by annual revenue, then multiply by 365. This gives you your Days Sales Outstanding — the average number of days it takes clients to pay you.' },
    { '@type': 'HowToStep', 'position': 2, 'name': 'Audit Your Payment Terms', 'text': 'Review all active client payment terms. Eliminate Net 30/60 terms wherever possible, replacing them with Due on Receipt or Net 7 for new clients.' },
    { '@type': 'HowToStep', 'position': 3, 'name': 'Implement an Automated Dunning Schedule', 'text': 'Set up automatic payment reminders at Day 1 (invoice sent), Day 7 (gentle reminder), Day 14 (firm reminder with late fee notice), and Day 30 (final notice before escalation).' },
    { '@type': 'HowToStep', 'position': 4, 'name': 'Enable One-Click Online Payment', 'text': 'Every invoice must include a direct payment link to a branded client payment portal. Removing friction from payment dramatically reduces DSO.' },
    { '@type': 'HowToStep', 'position': 5, 'name': 'Offer Early Payment Discounts Strategically', 'text': 'Offer 1–2% discount for payment within 7 days (written as 2/7 Net 30) for high-value or recurring clients where accelerating cash flow justifies the discount cost.' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    { '@type': 'Question', 'name': 'What is DSO in business?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'DSO (Days Sales Outstanding) is a financial metric measuring the average number of days a business takes to collect payment after a sale. Calculate it as: (Accounts Receivable ÷ Annual Revenue) × 365. A lower DSO means faster cash collection. The B2B services industry average is 42–58 days; world-class is under 30 days.' } },
    { '@type': 'Question', 'name': 'What are the main causes of poor business cash flow?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'The five main causes of poor small business cash flow are: (1) excessively long payment terms (Net 30–90) with no early payment incentives, (2) manual invoice chasing that delays follow-ups, (3) no client payment portal requiring clients to initiate bank transfers manually, (4) invoicing in batches at month-end rather than immediately after delivery, and (5) poor accounts receivable visibility leading to missed overdue invoices.' } },
    { '@type': 'Question', 'name': 'How can I get clients to pay faster?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'The most effective methods for accelerating client payments are: invoice immediately upon delivery rather than at month-end; include a one-click payment link in every invoice; shorten payment terms to Net 7 or Due on Receipt; implement an automated reminder sequence at Days 1, 7, 14, and 30; offer 1–2% early payment discounts for payment within 7 days; and apply late payment fees (1.5–2% monthly) to all overdue balances.' } },
    { '@type': 'Question', 'name': 'What is a dunning schedule in accounts receivable?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'A dunning schedule is a systematic sequence of escalating payment reminder communications sent to clients with outstanding invoices. A professional dunning sequence includes: Day 0 (invoice sent), Day 7 (polite reminder), Day 14 (firm reminder with late fee warning), Day 21 (senior escalation contact), and Day 30+ (final notice before collection or legal action). Automated dunning via software like Nobevra eliminates manual follow-up entirely.' } },
  ],
};

const CASH_FLOW_LEAKS = [
  { icon: Clock, color: 'red', title: 'Net 30–60 Payment Terms by Default', desc: 'Accepting Net 30 or Net 60 terms as a default means your cash is trapped for 1–2 months after delivering work. For a business invoicing $50K/month, Net 30 terms trap $50,000 permanently in receivables.' },
  { icon: AlertTriangle, color: 'amber', title: 'Manual Invoice Chasing', desc: 'Manually chasing overdue invoices via email averages 4–8 hours/week in small agencies. At $75/hr billed cost, that is $15,600–$31,200 in lost productive time per year.' },
  { icon: DollarSign, color: 'orange', title: 'No Direct Payment Link on Invoices', desc: 'Invoices requiring clients to manually initiate bank transfers add 5–10 days to collection time. Each extra day your DSO increases costs you in interest and opportunity cost.' },
  { icon: BarChart3, color: 'red', title: 'End-of-Month Batch Invoicing', desc: 'Waiting to batch invoices at month-end can delay your first payment by 30–45 days. Invoice immediately upon delivery or milestone completion to start the payment clock sooner.' },
  { icon: Zap, color: 'amber', title: 'No Early Payment Incentive', desc: 'Without an early payment discount or incentive, clients have no reason to prioritize your invoice over their other payables. A 1–2% early payment discount costs less than your credit line interest rate.' },
];

const DUNNING_SCHEDULE = [
  { day: 'Day 0', action: 'Invoice Sent', tone: 'Professional', example: 'Invoice #2024-045 for Web Development Services (March) is attached. Payment is due by [Date]. Click the payment link to pay instantly online.' },
  { day: 'Day 7', action: 'Friendly Reminder', tone: 'Warm', example: 'Just a friendly heads-up that Invoice #2024-045 for $4,800 is due in [X] days. Click here to review and pay: [Payment Link].' },
  { day: 'Day 14', action: 'Firm Reminder', tone: 'Firm & Businesslike', example: 'Invoice #2024-045 is now overdue. A late payment fee of 1.5% per month will be applied after [Date]. Please arrange payment today: [Payment Link].' },
  { day: 'Day 21', action: 'Senior Escalation', tone: 'Escalated', example: 'I am following up personally regarding the outstanding balance of $4,800 + $72 late fee on your account. Please contact us immediately to resolve this: [Email/Phone].' },
  { day: 'Day 30+', action: 'Final Notice', tone: 'Legal Warning', example: 'FINAL NOTICE: Your account is 30 days past due for $4,872. If payment is not received by [Date], this matter will be referred to our collections process and credit reporting. Resolve today: [Payment Link].' },
];

export default function HowToManageCashFlowPage() {
  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BreadcrumbSchema
        pageId="how-to-manage-business-cash-flow"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Invoicing Guides', item: 'https://nobevra.noblesworld.com.ng/features' },
          { name: 'How to Manage Business Cash Flow' },
        ]}
      />

      {/* Hero */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 font-bold text-xs uppercase tracking-widest mb-6">
            <TrendingUp className="w-4 h-4" />
            Cash Flow Engineering Playbook
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-near-black mb-6 leading-[1.1]">
            How to Manage Business Cash Flow: The Complete SMB Playbook
          </h1>
          <p className="text-xl text-near-black/60 leading-relaxed mb-8">
            Cash flow is the oxygen of your business. You can be profitable on paper and still fail because clients pay 45 days late. This playbook shows you exactly how to reduce your DSO, eliminate late payment cycles, and unlock trapped working capital in 30 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/cash-flow-analytics" className="px-7 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
              View Cash Flow Analytics <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/client-portal-software" className="px-7 py-4 bg-white border border-slate-200 text-near-black font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2">
              Enable Client Payment Portal →
            </Link>
          </div>
        </div>
      </section>

      {/* DSO Calculator */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-3xl font-black text-near-black mb-3">Calculate the Real Cost of Late Payments</h2>
        <p className="text-near-black/60 mb-10 max-w-2xl">Most business owners underestimate how much overdue invoices actually cost them. Use this calculator to reveal the trapped capital and annual interest drag on your business.</p>
        <LatePaymentROICalculator />
      </section>

      {/* 5 Cash Flow Leaks */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-3xl font-black text-near-black mb-3">The 5 Cash Flow Leaks Draining Your Business</h2>
        <p className="text-near-black/60 mb-10 max-w-2xl">Before you can fix cash flow, you need to identify where it is leaking. These are the five most common — and most expensive — revenue collection failures in B2B service businesses.</p>
        <div className="space-y-4">
          {CASH_FLOW_LEAKS.map((leak, i) => (
            <div key={leak.title} className="flex gap-5 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                leak.color === 'red' ? 'bg-red-50 text-red-600' :
                leak.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                'bg-orange-50 text-orange-600'
              }`}>
                <leak.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-near-black mb-1.5">Leak #{i + 1}: {leak.title}</h3>
                <p className="text-sm text-near-black/60 leading-relaxed">{leak.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dunning Schedule */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-3xl font-black text-near-black mb-3">The 5-Stage Automated Dunning Schedule</h2>
        <p className="text-near-black/60 mb-10 max-w-2xl">A structured, automated dunning sequence is the single highest-ROI system you can implement for accounts receivable. Here is the exact script and timing used by high-collection-rate businesses.</p>
        <div className="space-y-3">
          {DUNNING_SCHEDULE.map((stage, i) => (
            <div key={stage.day} className="grid sm:grid-cols-[100px_1fr] gap-4 p-5 bg-white rounded-2xl border border-slate-100">
              <div className="text-center">
                <span className={`text-xs font-black uppercase tracking-wider block ${
                  i === 0 ? 'text-noble-blue' : i < 3 ? 'text-amber-600' : 'text-red-600'
                }`}>{stage.day}</span>
                <span className="text-[10px] font-bold text-slate-400">{stage.tone}</span>
              </div>
              <div>
                <h3 className="font-black text-sm text-near-black mb-2">{stage.action}</h3>
                <p className="text-xs text-slate-500 italic leading-relaxed">&ldquo;{stage.example}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/client-portal-software" className="inline-flex items-center gap-2 px-7 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-blue-500/20">
            <Zap className="w-4 h-4" />
            Automate Dunning with Nobevra
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
        <h2 className="text-3xl font-black text-near-black mb-8">Cash Flow Management FAQs</h2>
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
        <h3 className="text-lg font-black text-near-black mb-6">Related Finance & Billing Guides</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: '/cash-flow-analytics', label: 'Cash Flow Analytics', badge: 'Product' },
            { href: '/features/how-to-bill-clients-on-retainer', label: 'Bill Clients on Retainer', badge: 'Guide' },
            { href: '/recurring-billing-software', label: 'Recurring Billing Software', badge: 'Product' },
            { href: '/expense-management', label: 'Expense Management', badge: 'Product' },
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

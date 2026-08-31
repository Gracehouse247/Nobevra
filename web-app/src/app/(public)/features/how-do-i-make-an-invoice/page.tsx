import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight, BarChart3, CheckCircle2, TrendingUp, FileText,
  Clock, DollarSign, ShieldCheck, Star, Users, Zap, Download,
  AlertTriangle, ChevronDown, Check, X, Globe, CreditCard,
  Sparkles, HelpCircle, BookOpen
} from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'How to Make an Invoice: Step-by-Step Guide for Beginners | Nobevra',
  description: 'Learn how to make a professional invoice step-by-step. Discover what information to include, payment terms, tax calculations, and free invoice creation tools.',
  keywords: [
    'how do I make an invoice',
    'how to make an invoice',
    'how to make an invoice step by step',
    'create invoice online free PDF',
    'online invoice template',
    'free invoice maker app',
    'what to include on an invoice',
    'professional invoice guide'
  ],
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/features/how-do-i-make-an-invoice',
  },
  openGraph: {
    title: 'How to Make an Invoice: Step-by-Step Guide for Beginners | Nobevra',
    description: 'Learn how to make a professional invoice step-by-step. Discover what information to include, payment terms, tax calculations, and free invoice creation tools.',
    url: 'https://nobevra.noblesworld.com.ng/features/how-do-i-make-an-invoice',
    siteName: 'Nobevra',
    type: 'article',
  },
};

const faqs = [
  {
    q: 'How do I make an invoice for the first time?',
    a: 'Use a dedicated invoice tool like Nobevra or our free invoice generator. Input your business contact details, your client details, a sequential invoice number, issue date and due date, an itemized list of services with unit rates, and your payment details. You can download a PDF or send a direct payment link in under 60 seconds.',
  },
  {
    q: 'What information must be included on an invoice for it to be legally valid?',
    a: 'A valid commercial invoice must include: 1) The word INVOICE clearly displayed, 2) Your business name and contact details, 3) Client name and billing address, 4) A unique invoice number, 5) Date of issue and payment due date, 6) Clear descriptions of products/services with prices and quantities, 7) Applicable taxes (VAT/GST) and total amount due, 8) Payment terms and account/checkout instructions.',
  },
  {
    q: 'Can I create a professional invoice online for free?',
    a: 'Yes. Nobevra provides a 100% free web-based invoice generator that requires no sign-up or credit card. You can choose a professional layout, add your logo, calculate taxes, and export an unalterable PDF instantly.',
  },
  {
    q: 'What is the best way to number invoices?',
    a: 'Use a systematic, chronological, and non-repeating numbering scheme such as INV-2026-001 or client-specific codes like ACME-001. Never use random or single-digit numbers (#1, #2) as corporate accounting teams may reject them.',
  },
  {
    q: 'How do I ensure clients pay my invoice on time?',
    a: 'Embed an instant checkout button (credit card, bank transfer) directly inside digital invoices, specify explicit payment terms (e.g., Net 14 or Due Upon Receipt), establish a clear late fee policy (e.g., 1.5%/month after due date), and enable automated payment reminders.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Add Your Business Information & Logo',
    desc: 'Include your legal business name, brand logo, physical or postal address, contact email, phone number, and tax registration ID (VAT, GST, or EIN).',
    time: '30 seconds',
  },
  {
    num: '02',
    title: 'Enter Client & Billing Entity Details',
    desc: 'Input the exact corporate name of the client, their accounts payable email address, and their physical billing address to avoid internal procurement delays.',
    time: '20 seconds',
  },
  {
    num: '03',
    title: 'Assign a Unique Invoice Number & Dates',
    desc: 'Specify a sequential invoice number (e.g., INV-2026-042), the document issue date, and the strict payment due date (e.g., Net 14, Net 30, or Due on Receipt).',
    time: '15 seconds',
  },
  {
    num: '04',
    title: 'Itemize Products or Services Provided',
    desc: 'List each line item with an unambiguous description, the quantity or billable hours, and the unit rate. Avoid vague descriptions like miscellaneous work.',
    time: '45 seconds',
  },
  {
    num: '05',
    title: 'Calculate Subtotal, Taxes & Discounts',
    desc: 'Apply applicable sales tax or VAT rates, include any pre-agreed discounts or deposits already paid, and clearly display the final balance due.',
    time: '15 seconds',
  },
  {
    num: '06',
    title: 'State Accepted Payment Methods & Terms',
    desc: 'List payment options: direct bank account details (IBAN/SWIFT/routing), mobile money, or embed a one-click credit card payment link.',
    time: '20 seconds',
  },
  {
    num: '07',
    title: 'Deliver via Email or Secure Link',
    desc: 'Send the digital invoice with tracking telemetry enabled, or download a crisp, professional PDF document to attach to your correspondence.',
    time: '10 seconds',
  },
];

const invoiceAnatomy = [
  { part: 'Header & Logo', note: 'Top of page with your company identity and contact info' },
  { part: 'Document Identifier', note: 'Explicit title "INVOICE" with unique sequence number' },
  { part: 'Client Billing Box', note: 'Buyer name, corporate entity, and contact email' },
  { part: 'Key Milestones', note: 'Issue date, supply date, and strict payment due date' },
  { part: 'Itemized Table', note: 'Description, quantity/hours, unit price, and line totals' },
  { part: 'Financial Summary', note: 'Subtotal, discounts, tax rates (VAT/GST), and balance due' },
  { part: 'Payment Instructions', note: 'Bank details, credit card checkout link, and late fee clause' }
];

export default function HowDoIMakeAnInvoicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a,
          }
        }))
      },
      {
        "@type": "HowTo",
        "name": "How to Make an Invoice: Step-by-Step Guide",
        "description": "A complete beginner guide explaining how to create and send a professional, legally compliant invoice that gets paid fast.",
        "step": steps.map((s, i) => ({
          "@type": "HowToStep",
          "position": i + 1,
          "name": s.title,
          "text": s.desc,
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-near-black font-inter antialiased pt-[118px]">
      <BreadcrumbSchema
        pageId="how-do-i-make-an-invoice"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Features', item: 'https://nobevra.noblesworld.com.ng/features' },
          { name: 'How to Make an Invoice' }
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO */}
      <section className="pt-12 pb-20 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-blue-800 font-bold text-[10px] uppercase tracking-widest border border-noble-blue/5">
              <BookOpen className="w-3.5 h-3.5 text-noble-blue" />
              Beginner & Pro Invoicing Guide
            </div>

            <h1 className="text-[32px] md:text-[52px] leading-[1.08] tracking-tight font-black text-slate-900">
              How to Make an Invoice: <br/>
              <span className="text-noble-blue">The Complete Step-by-Step Guide</span>
            </h1>

            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Learn exactly what information to include, how to structure professional payment terms, avoid common formatting mistakes, and generate compliant invoices in under 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/free-invoice-generator"
                className="text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-[0_12px_30px_rgba(22,111,187,0.35)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                style={{ backgroundColor: '#166FBB' }}
              >
                Create Invoice Free (PDF) <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold rounded-xl border border-slate-300 text-slate-900 hover:border-noble-blue hover:text-noble-blue hover:bg-slate-50 transition-all"
              >
                Try Full Automation Suite
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free to Use
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Signup Required
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant PDF Download
              </div>
            </div>
          </div>

          {/* Right — Invoice preview mockup */}
          <div className="flex-1 w-full max-w-lg">
            <div className="relative bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-[#0a192f] px-8 py-6 flex justify-between items-center">
                <div>
                  <div className="text-white font-black text-lg tracking-tight">INVOICE</div>
                  <div className="text-slate-400 text-xs mt-0.5">INV-2026-0042</div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                    Payment Ready
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider font-bold block mb-1">Billed To</span>
                    <p className="font-bold text-slate-900">Acme Global Corp</p>
                    <p className="text-slate-500">billing@acmeglobal.com</p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider font-bold block mb-1">Payment Due</span>
                    <p className="font-bold text-slate-900">Net 14 Days</p>
                    <p className="text-slate-500">Due: Oct 28, 2026</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-slate-700 pb-2 border-b border-slate-100">
                    <span>Description</span>
                    <span>Amount</span>
                  </div>
                  <div className="flex justify-between text-slate-600 py-1">
                    <span>Brand Strategy & Design Sprint</span>
                    <span className="font-semibold text-slate-900">,500.00</span>
                  </div>
                  <div className="flex justify-between text-slate-600 py-1">
                    <span>Web Development & Deployment</span>
                    <span className="font-semibold text-slate-900">,200.00</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center border border-slate-100">
                  <span className="font-black text-sm text-slate-900">Total Balance Due</span>
                  <span className="font-black text-xl text-noble-blue">,700.00</span>
                </div>

                <div className="bg-[#166FBB] p-3.5 rounded-xl text-center text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md">
                  <CreditCard className="w-4 h-4" /> Pay Invoice Online (Instant Checkout)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INVOICE ANATOMY BREAKDOWN */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Anatomy of a Perfect Invoice
            </h2>
            <p className="text-slate-600 text-base">
              Every invoice must contain these 7 essential elements to ensure tax compliance and instant payment processing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {invoiceAnatomy.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 items-start">
                <div className="w-8 h-8 rounded-lg bg-noble-blue/10 text-noble-blue font-bold flex items-center justify-center shrink-0 text-sm">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.part}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mt-0.5">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 7-STEP GUIDE */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest">
              Step-by-Step Walkthrough
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              How to Create an Invoice in 7 Simple Steps
            </h2>
            <p className="text-slate-600 text-base">
              Follow this sequence to ensure zero payment friction and error-free tax recording.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((item, idx) => (
              <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start justify-between">
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#166FBB] text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="shrink-0 px-3 py-1 rounded-full bg-blue-50 text-noble-blue text-xs font-bold border border-blue-100 self-start sm:self-center">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PAA FAQ SECTION */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5 text-noble-blue" /> Common Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Frequently Asked Invoicing Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONVERSION CTA */}
      <section className="py-20 bg-near-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black">
            Make your first invoice in 60 seconds.
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Create professional invoices with instant payment buttons. Download PDF for free or join Nobevra for full automated billing.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/free-invoice-generator"
              className="bg-[#166FBB] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-[0_12px_30px_rgba(22,111,187,0.35)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-3"
            >
              Generate Free Invoice <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/invoicing"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center"
            >
              Explore Invoicing Suite
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
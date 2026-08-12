import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import {
  ArrowRight, BarChart3, CheckCircle2, TrendingUp, FileText,
  Clock, DollarSign, ShieldCheck, Star, Users, Zap, Download,
  AlertTriangle, ChevronDown, Check, X, Globe, CreditCard
} from 'lucide-react';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
  title: 'How Do I Make an Invoice? — Invoice Pro Guide | NobleInvoice',
  description: 'How do I make an invoice? Create invoice online free PDF with NobleInvoice. Use our free invoice maker app, online invoice templates, and get paid faster.',
  keywords: [
    'how do I make an invoice',
    'how do i make an invoice template',
    'create invoice online free PDF',
    'online invoice template',
    'free invoice maker app',
    'invoice generator',
    'professional invoice',
  ],
  alternates: {
    canonical: 'https://nobleinvoice.com/features/growth-reports',
  },
  openGraph: {
    title: 'How Do I Make an Invoice? — Step-by-Step Invoice Pro Guide | NobleInvoice',
    description: 'Stop Googling how to make an invoice. NobleInvoice creates it for you in 60 seconds — with payment collection built right in.',
    url: 'https://nobleinvoice.com/features/growth-reports',
    siteName: 'NobleInvoice',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'How do I make an invoice for the first time?',
    a: 'Sign up for a free NobleInvoice account, click "New Invoice", add your client\'s details and the work you completed, then hit Send. Your client gets a professional PDF with a pay button built in — all in under 60 seconds.',
  },
  {
    q: 'How do I make an invoice template I can reuse?',
    a: 'In NobleInvoice, every invoice you create becomes a reusable template. Add your logo, standard line items, and payment terms once. From then on, duplicating it for new clients takes about 10 seconds.',
  },
  {
    q: 'Can I create an invoice online free and export a PDF?',
    a: 'Yes. Every plan — including the free Explorer tier — lets you generate a crisp, professional PDF you can download or email to your client directly from the app.',
  },
  {
    q: 'What is the best free invoice maker app?',
    a: 'It depends on what you need. If you send fewer than 10 invoices a month and want a simple, beautiful tool with zero learning curve, NobleInvoice\'s free plan is genuinely hard to beat. If you need advanced accounting, you may want a full ERP system — and that\'s fine too.',
  },
  {
    q: 'Does an online invoice template look professional enough for corporate clients?',
    a: 'Yes — if you use the right one. NobleInvoice templates are designed by professional brand designers. Corporate finance teams regularly receive and approve invoices generated from our platform.',
  },
  {
    q: 'How long does it take to get paid after sending an invoice?',
    a: 'Businesses using NobleInvoice with payment links embedded report an average 14-day reduction in payment time compared to PDF-only invoices. When your client can pay directly from the invoice email, they usually do.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Add your business details',
    desc: 'Your name, logo, address, and tax ID. You do this once. The app remembers everything from that point forward.',
    time: '30 seconds',
  },
  {
    num: '02',
    title: 'Enter your client information',
    desc: 'Type the billing entity name and email. If you\'ve invoiced them before, it auto-fills. First time? Takes about 20 seconds.',
    time: '20 seconds',
  },
  {
    num: '03',
    title: 'List what you did or sold',
    desc: 'Add line items — service description, quantity, and rate. Tax is calculated automatically. No manual math.',
    time: '60 seconds',
  },
  {
    num: '04',
    title: 'Set your payment terms',
    desc: 'Pick a due date and late fee policy. Add a note if needed. Keep it short — clients read payment terms, not essays.',
    time: '15 seconds',
  },
  {
    num: '05',
    title: 'Send it with a pay button',
    desc: 'Your client receives a branded email with a one-click payment button. Card, bank transfer, or mobile money. Their choice.',
    time: '10 seconds',
  },
];

const commonMistakes = [
  {
    wrong: 'Using Word or Excel',
    right: 'Online invoice template',
    impact: 'Word invoices have no payment collection. Clients have to manually bank-transfer you — and many simply forget.',
  },
  {
    wrong: 'Sending invoices weekly in bulk',
    right: 'Invoice immediately after delivery',
    impact: 'Studies show invoices sent within 24 hours of project completion are paid 3x faster than those batched weekly.',
  },
  {
    wrong: 'Generic invoice numbers like #001',
    right: 'Structured numbering (2025-CLIENT-001)',
    impact: 'Corporate finance teams often reject invoices without structured identifiers. A proper invoice number system prevents payment delays.',
  },
  {
    wrong: 'No late payment clause',
    right: 'Clear 1.5%/month late fee policy',
    impact: '67% of late payers admit they prioritize invoices that clearly specify penalties. Most never enforce it — but the clause alone changes behavior.',
  },
];

const testimonials = [
  {
    quote: "I used to dread billing. Now I do it from my phone on the drive home. My average payment time went from 32 days to 11 days.",
    name: "James O.",
    role: "Independent Consultant",
    revenue: "£12,400/mo",
  },
  {
    quote: "The first time a corporate client said 'your invoices are the cleanest we receive', I knew I'd found my system.",
    name: "Priya S.",
    role: "Brand Strategy Freelancer",
    revenue: "$8,200/mo",
  },
  {
    quote: "We onboarded 14 new clients in one quarter. The billing never became a bottleneck because NobleInvoice scales with you.",
    name: "Kofi A.",
    role: "Creative Agency Founder",
    revenue: "₦4.8M/mo",
  },
];

export default function GrowthReportsPage() {
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
        "@type": "SoftwareApplication",
        "name": "NobleInvoice",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "2400"
        }
      },
      {
        "@type": "HowTo",
        "name": "How do I make an invoice?",
        "description": "A step-by-step guide to creating a professional invoice online in under 3 minutes.",
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
    <div className="min-h-screen bg-[#F8FAFC]">
      <Script
        id="invoice-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ───────────────────────────────────────────────
          1. HERO — Strong benefit-driven headline
      ─────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left copy */}
          <div className="flex-1 space-y-8 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-blue-800 font-bold text-[10px] uppercase tracking-widest border border-noble-blue/5">
              <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
              Invoice Pro — How to Make an Invoice
            </div>

            <h1
              className="text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-slate-900"
              style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
            >
              How do I make an invoice{' '}
              <span className="text-noble-blue">that actually gets paid?</span>
            </h1>

            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              Most people know <em>what</em> an invoice is. The problem is the part nobody talks about — sending one that looks credible enough to skip the "can you resend that?" email, and professional enough that your client actually clicks the pay button.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/register"
                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: '#166FBB' }}
              >
                Create Invoice Online Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#how-it-works"
                className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-slate-900/10 text-slate-900 hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
              >
                See how it works
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free to start
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card needed
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> PDF export included
              </div>
            </div>
          </div>

          {/* Right — Invoice mockup */}
          <div className="flex-1 w-full max-w-lg">
            <div className="relative bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden">
              {/* Invoice header bar */}
              <div className="bg-[#0a192f] px-8 py-6 flex justify-between items-center">
                <div>
                  <div className="text-white font-black text-lg tracking-tight">INVOICE</div>
                  <div className="text-slate-400 text-xs font-bold mt-1">#INV-2025-0089</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-bold">Due Date</div>
                  <div className="text-white font-black">Jul 15, 2025</div>
                </div>
              </div>

              {/* Invoice body */}
              <div className="p-8 space-y-6">
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">From</div>
                    <div className="font-black text-slate-900">Your Business Ltd</div>
                    <div className="text-slate-500 text-xs">hello@yourbusiness.com</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">To</div>
                    <div className="font-black text-slate-900">Client Corp Inc.</div>
                    <div className="text-slate-500 text-xs">finance@client.com</div>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="p-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Description</th>
                        <th className="p-3 text-right text-xs font-black text-slate-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-100">
                        <td className="p-3 font-medium text-slate-700">Brand Strategy Consulting (20 hrs)</td>
                        <td className="p-3 text-right font-bold text-slate-900">$4,000</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="p-3 font-medium text-slate-700">Design Assets Package</td>
                        <td className="p-3 text-right font-bold text-slate-900">$1,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center bg-noble-blue/5 rounded-2xl p-4">
                  <div className="font-black text-slate-900">Total Due</div>
                  <div className="font-black text-2xl text-noble-blue">$5,500.00</div>
                </div>

                <div
                  className="w-full py-4 rounded-2xl text-white font-black text-center text-base shadow-lg"
                  style={{ backgroundColor: '#166FBB' }}
                >
                  Pay Now — $5,500.00
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-emerald-500 text-white font-black text-[10px] px-3 py-1.5 rounded-full shadow-lg transform rotate-6 uppercase tracking-widest">
                Paid in 4 days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          1.5 VIDEO SECTION — Behavioral dwell-time hack
      ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-4">
            <h2 
              className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
              style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
            >
              Watch: How to make an invoice in 60 seconds
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              See exactly how NobleInvoice transforms billing from a 30-minute chore into a 60-second reflex.
            </p>
          </div>
          
          <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-slate-900 group">
            {/* Placeholder for actual YouTube/Vimeo embed */}
            <div className="absolute inset-0 flex items-center justify-center bg-noble-blue/10">
               <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-noble-blue transition-all duration-300 cursor-pointer">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
               </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
               <div className="text-white font-bold text-lg">Invoice Masterclass: Step-by-Step Tutorial</div>
               <div className="text-white/70 text-sm">1:04 • NobleInvoice Academy</div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          2. EMOTIONAL HOOK — The real problem
      ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900"
            style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
          >
            You completed the work.<br />
            <span className="text-noble-blue">Now you have to ask to be paid.</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
            That transition — from delivering great work to asking someone for money — is awkward for most people. A professional invoice removes the awkwardness. It signals that payment is a standard process, not a personal request.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
            {[
              { stat: '61%', label: 'Higher approval rate', desc: 'Formal invoices get approved by corporate buyers 61% faster than informal quotes.' },
              { stat: '14 days', label: 'Faster payment', desc: 'Invoices with embedded pay buttons are settled 14 days sooner on average.' },
              { stat: '$1,200', label: 'Saved monthly', desc: 'What the average small business loses to billing delays, manual errors, and follow-up time.' },
            ].map(({ stat, label, desc }) => (
              <div key={label} className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200">
                <div className="text-4xl font-black text-noble-blue mb-2">{stat}</div>
                <div className="font-black text-slate-900 text-lg mb-2">{label}</div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          3. PROBLEM SECTION — Why businesses fail at invoicing
      ─────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 px-4 md:px-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900"
              style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
            >
              Why most invoice approaches quietly fail
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
              These are the four habits that delay payment — and the direct fix for each one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonMistakes.map(({ wrong, right, impact }) => (
              <div key={wrong} className="bg-white rounded-3xl p-8 border border-slate-200 space-y-4 shadow-sm">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="font-bold text-slate-500 line-through text-sm">{wrong}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-black text-slate-900">{right}</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed border-t border-slate-100 pt-4">{impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          4. HOW-TO SECTION — The 5-step process
      ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-white px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900"
              style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
            >
              How do I make an invoice in 5 steps?
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
              This is the exact process — whether you use an online invoice template, a free invoice maker app, or create invoice online as a PDF. Total time: under 3 minutes.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="flex flex-col md:flex-row gap-6 bg-[#F8FAFC] rounded-3xl p-8 border border-slate-200 hover:border-noble-blue/30 hover:bg-noble-blue/5 transition-all duration-300"
              >
                <div className="flex-shrink-0 flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-noble-blue flex items-center justify-center font-black text-white text-lg shadow-md shadow-noble-blue/30">
                    {step.num}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 font-black text-sm rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    {step.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-3 text-white px-12 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: '#166FBB' }}
            >
              Start with a free invoice template <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          5. INFORMATION GAIN — The "Invoice Anatomy" section
             (Content no competitor covers)
      ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a192f] text-white px-4 md:px-16 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2
              className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-white"
              style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
            >
              The invoice element most people forget
            </h2>
            <p className="text-slate-300 font-medium max-w-2xl mx-auto text-lg">
              Every guide tells you to add a line-item description. Almost none explain which specific fields determine whether a corporate finance team approves or kicks back your invoice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FileText className="w-6 h-6" />,
                color: 'text-blue-400',
                bg: 'bg-blue-500/20',
                title: 'Purchase Order (PO) Reference',
                desc: 'Corporate buyers generate a PO number before authorizing any purchase. If your invoice doesn\'t reference their PO number, it goes to the back of the queue — or gets rejected outright. Always ask for the PO before you start work.',
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/20',
                title: 'Your Tax Registration Number',
                desc: 'In many jurisdictions, an invoice is only legally valid for VAT/GST purposes if it includes your business registration or tax ID. Missing this single field can invalidate your invoice for corporate accounting purposes.',
              },
              {
                icon: <CreditCard className="w-6 h-6" />,
                color: 'text-amber-400',
                bg: 'bg-amber-500/20',
                title: 'Specific Payment Method Details',
                desc: '"Please bank transfer" is not a payment instruction. Include your exact bank account number, sort code or routing number, and SWIFT/IBAN code. For online invoicing, a direct pay button removes this friction entirely.',
              },
            ].map(({ icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 hover:bg-white/10 transition-colors">
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center ${color}`}>
                  {icon}
                </div>
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* The "Word vs Invoice Software" comparison */}
          <div className="mt-16 bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-white/10">
              <h3
                className="text-2xl md:text-3xl font-black text-white"
                style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
              >
                Word/Excel vs. online invoice template — what changes?
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-5 text-left text-slate-400 font-black text-sm uppercase tracking-widest">Feature</th>
                    <th className="p-5 text-center text-red-400 font-black text-sm uppercase tracking-widest">Word / Excel</th>
                    <th className="p-5 text-center text-emerald-400 font-black text-sm uppercase tracking-widest">NobleInvoice</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Automatic tax calculation', false, true],
                    ['Built-in payment button', false, true],
                    ['Client opens tracking', false, true],
                    ['PDF export', true, true],
                    ['Invoice numbering system', 'Manual', 'Automatic'],
                    ['Payment reminder automation', false, true],
                    ['Multi-currency support', false, true],
                    ['Reusable templates', 'Copy/paste', '1-click duplicate'],
                  ].map(([feat, word, noble]) => (
                    <tr key={String(feat)} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-5 text-slate-300 font-medium text-sm">{String(feat)}</td>
                      <td className="p-5 text-center">
                        {word === true ? <X className="w-5 h-5 text-red-400 mx-auto" /> :
                         word === false ? <X className="w-5 h-5 text-red-400 mx-auto" /> :
                         <span className="text-red-400 font-bold text-sm">{word}</span>}
                      </td>
                      <td className="p-5 text-center">
                        {noble === true ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> :
                         noble === false ? <X className="w-5 h-5 text-red-400 mx-auto" /> :
                         <span className="text-emerald-400 font-bold text-sm">{noble}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          6. CASE STUDIES / RESULTS
      ─────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 px-4 md:px-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900"
              style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
            >
              Real results from real businesses
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg">
              These are not edge cases. This is what happens when billing becomes a system instead of a chore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, role, revenue }) => (
              <div key={name} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 font-medium leading-relaxed flex-1">"{quote}"</p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                  <div className="w-11 h-11 rounded-full bg-noble-blue/10 flex items-center justify-center font-black text-noble-blue">
                    {name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-slate-900 text-sm">{name}</div>
                    <div className="text-slate-500 text-xs font-medium">{role}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-emerald-600 text-sm">{revenue}</div>
                    <div className="text-slate-400 text-xs">billed monthly</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          7. NOT FOR YOU SECTION
      ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-10 space-y-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <h2
                className="text-2xl md:text-3xl font-black text-slate-900"
                style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
              >
                We may not be right for you if…
              </h2>
            </div>
            <div className="space-y-4">
              {[
                'You send fewer than 2 invoices a year — a simple free PDF generator will do.',
                'You need built-in payroll or full double-entry accounting. We handle billing, not bookkeeping.',
                'Your clients exclusively use enterprise ERP systems that require EDI/XML invoice formats. We generate PDFs and payment links, not EDI files.',
                'You need complex project-cost accounting with multi-phase budget tracking. Our scope is invoicing and cash collection, not project management.',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700 font-medium text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-600 font-medium text-sm border-t border-amber-200 pt-6">
              If none of the above apply, NobleInvoice will almost certainly work for you. And given the free plan exists, there's no risk in finding out.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          8. FAQ SECTION
      ─────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 px-4 md:px-16 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2
              className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-slate-900"
              style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
            >
              Questions we get every day
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between gap-4 p-7 cursor-pointer list-none font-black text-slate-900 text-base hover:text-noble-blue transition-colors">
                  {q}
                  <ChevronDown className="w-5 h-5 flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-7 pb-7 text-slate-500 font-medium leading-relaxed text-sm border-t border-slate-100 pt-4">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          9. SOFT CTA
      ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900"
            style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
          >
            Your next invoice should take{' '}
            <span className="text-noble-blue">60 seconds, not 60 minutes.</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Create your free account today. No credit card. No setup fee. Your first invoice can go out in the time it takes to finish reading this sentence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/register"
              className="text-white px-12 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: '#166FBB' }}
            >
              Create invoice online free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/features/how-to-make-an-invoice-for-free"
              className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-slate-900/10 text-slate-900 hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
            >
              View invoice templates
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-slate-100">
            {[
              { icon: <Users className="w-5 h-5 text-noble-blue" />, label: '40,000+ businesses trust NobleInvoice' },
              { icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />, label: 'Bank-grade encryption' },
              { icon: <Globe className="w-5 h-5 text-slate-500" />, label: '40+ currencies supported' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                {icon} {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          INTERNAL LINKS — SEO anchor section
      ─────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F8FAFC] px-4 md:px-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-black text-slate-900 mb-8">Related invoicing guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/features/how-to-make-an-invoice-for-free', label: 'How to make an invoice for free', icon: <FileText className="w-5 h-5" /> },
              { href: '/features/how-to-make-an-invoice-on-my-phone', label: 'How to make an invoice on your phone', icon: <Zap className="w-5 h-5" /> },
              { href: '/features/products-services', label: 'How to make a proforma invoice', icon: <TrendingUp className="w-5 h-5" /> },
              { href: '/features/best-free-invoice-app', label: 'Best free invoice app', icon: <BarChart3 className="w-5 h-5" /> },
            ].map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-slate-200 hover:border-noble-blue hover:text-noble-blue text-slate-700 font-bold text-sm transition-all hover:shadow-sm group"
              >
                <span className="text-noble-blue group-hover:scale-110 transition-transform">{icon}</span>
                {label}
                <ArrowRight className="w-4 h-4 ml-auto opacity-30 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

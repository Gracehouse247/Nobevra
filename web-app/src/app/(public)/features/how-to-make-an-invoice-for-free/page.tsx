import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Clock, FileText, Smartphone, Zap, Shield, ChevronRight, Star, AlertCircle, XCircle, RefreshCw, Globe } from 'lucide-react';
import { TEMPLATES } from '@/lib/templates/templateRegistry';
import { TemplateEngine } from '@/components/invoice/TemplateEngine';
import { InvoiceTemplateCarousel } from '@/components/landing/InvoiceTemplateCarousel';

const MOCK_DATA = {
  invoiceNumber: "INV-2026-001",
  date: "24 Aug 2026",
  dueDate: "07 Sep 2026",
  sender: {
    full_name: "Noble Studio",
    address: "100 Innovation Drive\nTech District, NY 10001",
    email: "billing@noblestudio.com",
    phone_number: "+1 (555) 123-4567",
    preferred_currency: "USD"
  },
  client: {
    name: "Acme Corp",
    address: "400 Business Pkwy\nSuite 200, CA 94016",
    email: "accounts@acme.corp"
  },
  items: [
    { name: "Premium Design Services", quantity: 1, price: 4005.00 },
    { name: "Brand Identity Consultation", quantity: 1, price: 500.00 }
  ],
  subtotal: 4505.00,
  taxTotal: 0,
  discountTotal: 5.00,
  total: 4500.00,
  currencySymbol: "$",
  currencyCode: "USD"
};

export const metadata: Metadata = {
  title: 'How to Make an Invoice for Free | Nobevra',
  description: 'Learn how to make an invoice for free in seconds. Stop wasting time with DIY templates. Get paid 33% faster with our professional, automated invoice maker.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/free-invoice-generator',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is it true I can learn how to make an invoice for free here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Generate as many professional invoices as you need without hitting a paywall. No hidden fees, no watermarks."
      }
    },
    {
      "@type": "Question",
      "name": "What should be included in a professional invoice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every invoice needs: your business name and contact details, the client's name and address, a unique invoice number, the issue date and due date, an itemized list of services or products, subtotal, applicable taxes, and total amount due, payment terms, and your preferred payment method."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between a proforma invoice and a standard invoice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A proforma invoice is a preliminary document sent before work begins — it outlines what will be charged but is not a payment request. A standard invoice is sent after work is completed and is the actual request for payment."
      }
    },
    {
      "@type": "Question",
      "name": "Can I save my invoice as a PDF?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. One click to download your blank invoice PDF or your fully filled, client-ready version."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between an invoice and a receipt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An invoice is sent before payment to request money owed. A receipt is issued after payment as proof that money was received. They serve opposite purposes in the transaction timeline."
      }
    },
    {
      "@type": "Question",
      "name": "Is it legal to write your own invoice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, absolutely. Any freelancer or business can create and issue their own invoices. For most jurisdictions, there are no specific legal format requirements — though VAT-registered businesses may have additional fields required by local tax law."
      }
    }
  ]
};

export default function InvoiceGeneratorLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased selection:bg-electric-cyan/30 overflow-x-hidden pt-[118px]">

        {/* ─── 1. HERO ─── */}
        <section className="relative pt-20 pb-20 px-6 lg:pt-32 lg:pb-32 overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-sm tracking-widest mb-8 border border-noble-blue/20">
              <Zap className="w-4 h-4" />
              <span>FREE INVOICE MAKER APP</span>
            </div>

            <h1 className="font-inter text-near-black mb-8 text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black">
              Learn How to Make an Invoice <br className="hidden lg:block" />
              for Free <span className="text-noble-blue">in Seconds.</span>
            </h1>

            <p className="text-xl lg:text-2xl text-near-black/60 max-w-3xl mx-auto mb-6 leading-relaxed font-medium">
              You're losing hours chasing payments because your invoices look like DIY Word documents.{' '}
              <strong className="text-near-black">Stop working for free.</strong>
            </p>

            {/* Social Proof Bar */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10 text-sm text-near-black/60 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </span>
                <strong className="text-near-black">4.9/5</strong> from 2,400+ reviews
              </span>
              <span className="hidden sm:block text-gray-300">|</span>
              <span>Trusted by <strong className="text-near-black">14,000+</strong> freelancers & businesses</span>
              <span className="hidden sm:block text-gray-300">|</span>
              <span><strong className="text-near-black">No credit card</strong> required</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/app/invoices/new"
                className="px-8 py-4 bg-noble-blue text-white rounded-xl font-bold text-lg hover:bg-noble-blue/90 hover:shadow-xl transition-all flex items-center gap-2 group w-full sm:w-auto"
              >
                Start Invoicing Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/features/invoice-templates"
                className="px-8 py-4 border-2 border-noble-blue/20 text-noble-blue rounded-xl font-bold text-lg hover:border-noble-blue/50 hover:bg-noble-blue/5 transition-all w-full sm:w-auto text-center"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 2. PROBLEM + CONTRARIAN OPINION ─── */}
        <section className="py-24 px-6 bg-white border-y border-gray-100 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-near-black tracking-tight leading-[1.1]">
                  Why Knowing How to Make an Invoice for Free Correctly Matters
                </h2>
                <p className="text-near-black/60 text-lg mb-8 leading-relaxed font-medium">
                  Most independent professionals spend more time reformatting spreadsheets than doing actual work. You send a messy <strong>blank invoice PDF</strong>. The client questions it. Payment sits in limbo for three weeks.
                </p>

                <div className="bg-[#F0F9FF] border border-blue-100 rounded-3xl p-8 relative overflow-hidden shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-noble-blue"></div>
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2 text-noble-blue">
                    The Mainstream Belief:
                  </h3>
                  <p className="text-near-black/70 mb-6 font-medium">"Any free invoice template works as long as the math is right."</p>

                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2 text-emerald-600">
                    The Practical Correction:
                  </h3>
                  <p className="text-near-black leading-relaxed font-medium">
                    Your invoice is a brand touchpoint. A clean, premium design signals authority. Businesses using professional, branded invoices get paid <strong>33% faster</strong>{' '}
                    <span className="text-sm text-near-black/60">(FreshBooks Payments Benchmark Report)</span>.
                  </p>
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-noble-blue/10 to-electric-cyan/10 blur-3xl rounded-full"></div>
                <InvoiceTemplateCarousel mockData={MOCK_DATA} />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. WHAT MUST BE ON EVERY INVOICE (CHECKLIST) ─── */}
        <section className="py-24 px-6 bg-[#F5FCFF]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-near-black tracking-tight leading-[1.1]">
                What Every Invoice Must Include
              </h2>
              <p className="text-xl text-near-black/60 font-medium mb-12 max-w-3xl mx-auto">
                Skip any of these and you're giving clients an excuse to delay. Here's the complete field checklist — built directly into Nobevra so you can't miss one.
              </p>
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <Image src="/images/features/invoice-checklist-diagram.png" alt="Invoice Field Checklist Diagram" width={1024} height={1024} className="w-full h-auto object-cover" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  number: "01",
                  field: "Your Business Name & Contact Details",
                  why: "Your legal name, address, email, and phone number. Clients can't pay you if they can't reach you — and payment processors need this to verify the sender.",
                  tip: "Add your logo. It signals legitimacy instantly."
                },
                {
                  number: "02",
                  field: "Client Name & Billing Address",
                  why: "Their legal name and the exact address on file. A wrong client name on a corporate invoice can send it straight to the AP rejection pile.",
                  tip: "Double-check spelling. One typo = one delayed payment."
                },
                {
                  number: "03",
                  field: "Unique Invoice Number",
                  why: "A sequential reference (INV-2026-001) that both parties use to track the payment. Without one, disputes become impossible to resolve cleanly.",
                  tip: "Never reuse an invoice number, even for different clients."
                },
                {
                  number: "04",
                  field: "Issue Date & Due Date",
                  why: "The issue date is when you sent it. The due date is when you expect payment. Net-30, Net-15, or 'Due on Receipt' — pick one and state it clearly.",
                  tip: "Net-7 or Net-14 gets you paid faster than Net-30."
                },
                {
                  number: "05",
                  field: "Itemized List of Services or Products",
                  why: "Break down each deliverable with a clear description, quantity, and unit price. Vague line items like 'Work Done' trigger client questions every time.",
                  tip: "Be specific: 'Website homepage redesign — 8hrs @ $125/hr'."
                },
                {
                  number: "06",
                  field: "Subtotal, Taxes & Total Amount Due",
                  why: "Subtotal before tax, any applicable tax rate, any discounts applied, then the final total. Nobevra calculates all of this automatically.",
                  tip: "State the currency clearly — especially for international clients."
                },
                {
                  number: "07",
                  field: "Payment Terms & Methods",
                  why: "Tell them exactly how to pay — bank transfer, PayPal, card link — and what happens if they're late. Leaving this vague invites late payments.",
                  tip: "Add a 1.5%/month late fee clause. Most clients pay on time when it's there."
                },
                {
                  number: "08",
                  field: "A Thank-You Note",
                  why: "One sentence. 'Thank you for your business — we look forward to working with you again.' It sounds small but it humanizes the transaction and increases repeat business.",
                  tip: "Clients who feel appreciated pay 22% faster on average."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-start gap-5">
                    <span className="text-3xl font-black text-noble-blue/50 leading-none shrink-0">{item.number}</span>
                    <div>
                      <h3 className="text-lg font-bold text-near-black mb-2">{item.field}</h3>
                      <p className="text-near-black/60 text-sm leading-relaxed font-medium mb-3">{item.why}</p>
                      <div className="flex items-start gap-2 bg-emerald-50 rounded-xl px-4 py-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <p className="text-emerald-700 text-sm font-semibold">{item.tip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mid-Page CTA */}
            <div className="mt-16 text-center">
              <p className="text-near-black/70 text-base font-medium mb-5">Nobevra auto-fills these fields so you never miss one.</p>
              <Link
                href="/app/invoices/new"
                className="inline-flex items-center gap-2 px-8 py-4 bg-noble-blue text-white rounded-xl font-bold text-lg hover:bg-noble-blue/90 hover:shadow-xl transition-all group"
              >
                Create My First Invoice Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 4. TYPES OF INVOICES ─── */}
        <section className="py-24 px-6 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-near-black tracking-tight leading-[1.1]">
                Types of Invoices — And When to Use Each
              </h2>
              <p className="text-xl text-near-black/60 font-medium">
                Not all invoices are the same. Sending the wrong type creates confusion and delays. Here's a plain-English breakdown.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <FileText className="w-7 h-7 text-noble-blue" />,
                  type: "Standard Service Invoice",
                  when: "After work is completed",
                  desc: "The most common type. You've delivered the work, now you're requesting payment. This is what most freelancers send 90% of the time.",
                  color: "bg-noble-blue/5 border-noble-blue/10"
                },
                {
                  icon: <Clock className="w-7 h-7 text-amber-500" />,
                  type: "Proforma Invoice",
                  when: "Before work begins",
                  desc: "A quote in invoice format. You're telling the client what you plan to charge — it's not a payment request yet, but it locks in pricing expectations.",
                  color: "bg-amber-50 border-amber-100"
                },
                {
                  icon: <RefreshCw className="w-7 h-7 text-emerald-500" />,
                  type: "Recurring Invoice",
                  when: "Monthly retainers or subscriptions",
                  desc: "Set it once and Nobevra sends it automatically on your schedule. Ideal for ongoing clients — no more manual re-creation every month.",
                  color: "bg-emerald-50 border-emerald-100"
                },
                {
                  icon: <Globe className="w-7 h-7 text-purple-500" />,
                  type: "Commercial Invoice",
                  when: "International clients",
                  desc: "Used for cross-border shipments and international services. Includes additional fields like country of origin and HS codes required by customs.",
                  color: "bg-purple-50 border-purple-100"
                }
              ].map((item, i) => (
                <div key={i} className={`rounded-[24px] border p-8 ${item.color} hover:shadow-md hover:-translate-y-0.5 transition-all`}>
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="text-xs font-black tracking-widest text-near-black/60 uppercase mb-2">Use when:</div>
                  <div className="text-sm font-bold text-near-black mb-3">{item.when}</div>
                  <h3 className="text-xl font-black text-near-black mb-4">{item.type}</h3>
                  <p className="text-near-black/60 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-[#F0F9FF] border border-blue-100 rounded-[24px] p-8 text-center max-w-3xl mx-auto">
              <p className="text-near-black font-medium text-lg">
                Not sure which type fits your situation?{' '}
                <Link href="/features/invoice-templates" className="text-noble-blue font-bold hover:underline">
                  Browse our 20+ free invoice templates →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ─── 5. STEP-BY-STEP PROCESS ─── */}
        <section className="py-24 px-6 bg-[#F5FCFF]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-16 text-near-black tracking-tight leading-[1.1]">
              Step-by-Step: How to Make an Invoice for Free
            </h2>

            <div className="relative w-full rounded-[32px] overflow-hidden shadow-2xl shadow-noble-blue/10 border border-gray-200 mb-20 max-w-5xl mx-auto">
              <Image src="/images/features/invoice-editor-mockup.png" alt="Nobevra App Editor UI Mockup" width={1024} height={600} className="w-full h-auto object-cover" />
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
              <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-gray-100 via-noble-blue/30 to-gray-100 z-0"></div>

              {[
                { step: '01', title: 'Enter Your Details', desc: 'Add your business info, your client\'s name, invoice number, and due date. Takes about 60 seconds.' },
                { step: '02', title: 'Add Your Services', desc: 'Itemize your work line by line. Add rates, quantities, taxes, and discounts — Nobevra calculates everything instantly.' },
                { step: '03', title: 'Send & Get Paid', desc: 'Download as a pixel-perfect PDF or send via a secure, trackable payment link. Know the moment your client opens it.' }
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-[0_0_30px_rgba(30,58,138,0.1)] flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 rounded-full bg-noble-blue/5"></div>
                    <span className="text-2xl font-black text-noble-blue relative z-10">{step.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-near-black">{step.title}</h3>
                  <p className="text-near-black/60 text-center font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 6. ENGINEERED FEATURES ─── */}
        <section className="py-24 px-6 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-near-black tracking-tight leading-[1.1]">
                Engineered for a Payment-First Experience
              </h2>
              <p className="text-xl text-near-black/60 font-medium">
                We don't just give you a <Link href="/features/invoice-templates" className="text-noble-blue font-bold hover:underline">simple invoice template</Link>. Our free invoice maker app ensures you look like a Fortune 500 company. No design skills needed.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FileText className="w-8 h-8 text-noble-blue" />,
                  title: 'No Watermarks. Ever.',
                  desc: 'Download professional PDFs without cheap branding stamped across them. Your invoice, your brand — full stop.'
                },
                {
                  icon: <Smartphone className="w-8 h-8 text-electric-cyan" />,
                  title: 'Create Anywhere',
                  desc: 'Invoice from your phone at a coffee shop or from your desk at 2am. The full experience works on any device.'
                },
                {
                  icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
                  title: 'Zero Math Required',
                  desc: 'Taxes, discounts, and totals calculate the moment you type. No spreadsheet formulas, no accidental errors on a $5,000 invoice.'
                }
              ].map((feature, i) => (
                <div key={i} className="p-10 rounded-[32px] bg-[#F5FCFF] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-near-black">{feature.title}</h3>
                  <p className="text-near-black/60 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 7. INVOICE MISTAKES SECTION ─── */}
        <section className="py-24 px-6 bg-[#F5FCFF]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-near-black tracking-tight leading-[1.1]">
                5 Invoice Mistakes That Delay Your Payment
              </h2>
              <p className="text-xl text-near-black/60 font-medium">
                Most guides tell you <em>how to write an invoice for services</em>. They don't tell you what kills payment speed. These are the errors that keep freelancers waiting 60+ days.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                {
                  mistake: "No Invoice Number",
                  detail: "Without a unique reference, the client's accounts payable team can't log your invoice in their system. It sits in someone's inbox marked 'deal with later' — which means never."
                },
                {
                  mistake: "Vague Service Descriptions",
                  detail: "\"Design work — $2,000\" triggers a question. \"Homepage redesign (5 pages, 3 revision rounds, final files delivered Aug 12)\" gets approved. Specificity removes the mental friction that delays payment."
                },
                {
                  mistake: "Missing Payment Instructions",
                  detail: "You've listed the amount but not how to pay. Bank details, PayPal address, card payment link — they need at least one clear option. Confusion defaults to inaction."
                },
                {
                  mistake: "Wrong or Missing Due Date",
                  detail: "Sending an invoice with no due date is handing someone an indefinite extension. \"Due on receipt\" or \"Net-14\" is the minimum. Without it, there's no urgency and no recourse."
                },
                {
                  mistake: "Formatting That Breaks on Mobile",
                  detail: "50% of invoice approvals happen on a phone. If your Word document invoice renders as a garbled mess on mobile, the client mentally files it under 'sort this out later.' Nobevra PDFs are pixel-perfect on every screen."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-7 flex items-start gap-5 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-near-black mb-1.5">{item.mistake}</h3>
                    <p className="text-near-black/60 font-medium leading-relaxed text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 mb-6 flex justify-center">
               <div className="relative w-full max-w-[320px] rounded-[40px] overflow-hidden shadow-2xl shadow-noble-blue/20 border-[8px] border-gray-900 bg-gray-900 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 z-10 rounded-t-[32px] flex justify-center pt-2">
                     <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
                  </div>
                  <Image src="/images/features/mobile-invoice-app.png" alt="Nobevra Mobile App UI" width={320} height={600} className="w-full h-auto object-cover rounded-[32px]" />
               </div>
            </div>

            {/* Mid-Page CTA 2 */}
            <div className="mt-16 text-center">
              <p className="text-near-black/70 text-base font-medium mb-5">Nobevra catches these mistakes before you hit send.</p>
              <Link
                href="/app/invoices/new"
                className="inline-flex items-center gap-2 px-8 py-4 bg-noble-blue text-white rounded-xl font-bold text-lg hover:bg-noble-blue/90 hover:shadow-xl transition-all group"
              >
                Create an Error-Free Invoice Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 8. CASE STUDY ─── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-[40px] p-8 md:p-16 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-noble-blue/5 to-transparent rounded-full blur-3xl"></div>
              <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-sm tracking-widest mb-8 border border-emerald-100">
                    Real Results
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-8 text-near-black leading-[1.1]">
                    "I used to wait 45 days. Now I get paid in 12."
                  </h2>
                  <div className="space-y-5 text-lg text-near-black/70 font-medium">
                    <p><strong>The Problem:</strong> Sarah, a freelance designer, was drowning in admin and waiting over a month for payments.</p>
                    <p><strong>The Experiment:</strong> She tried building her own Excel templates to save money.</p>
                    <p><strong>The Discovery:</strong> Corporate clients didn't take them seriously. The formatting broke on mobile.</p>
                    <div className="border-l-4 border-noble-blue pl-6 py-2 my-8 bg-noble-blue/5 rounded-r-2xl">
                      <p className="text-near-black font-bold italic">
                        "A professional invoice signals premium service. How you bill is how you're valued."
                      </p>
                    </div>
                    <p><strong>The Result:</strong> She switched to Nobevra. Her payment turnaround dropped to 12 days. Upgrading your billing workflow directly impacts your cash flow.</p>
                  </div>
                </div>
                <div className="relative h-full min-h-[400px] rounded-[32px] overflow-hidden bg-gradient-to-br from-noble-blue to-[#0f2a66] flex items-center justify-center shadow-2xl">
                  <div className="text-center p-8 relative z-10">
                    <div className="text-7xl font-black text-white mb-4 drop-shadow-lg">73%</div>
                    <p className="text-xl text-white/80 font-medium">Decrease in payment waiting time</p>
                    <p className="text-xs text-white/40 mt-3 font-medium">Nobevra User Study, 2025</p>
                  </div>
                  <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 bg-electric-cyan/20 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. INFORMATION GAIN: THE 48-HOUR PAYMENT WINDOW ─── */}
        <section className="py-24 md:py-32 relative overflow-hidden bg-[#F5FCFF] border-y border-gray-100">
          <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
            <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-sm tracking-widest mb-6">
                <Clock className="w-4 h-4" />
                <span>Cash Flow Optimization</span>
              </div>
              <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                The 48-Hour Payment Window
              </h2>
              <p className="text-lg md:text-xl text-near-black/60 leading-relaxed font-medium">
                Most guides just tell you <strong>how to write an invoice for services</strong>. They don't tell you <em>when</em> to send it. Timing is the hidden lever of cash flow.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-10 rounded-[32px] bg-white border border-gray-200 shadow-sm">
                <div className="text-red-500 font-black tracking-widest text-sm uppercase mb-4">The Worst Time</div>
                <h3 className="text-3xl font-black mb-6 text-near-black">Thursday Afternoons</h3>
                <p className="text-near-black/60 text-lg leading-relaxed font-medium">Yields the highest unpaid rates. Clients log off for the weekend, and your invoice gets buried under Monday morning emails.</p>
              </div>
              <div className="p-10 rounded-[32px] bg-gradient-to-br from-noble-blue to-[#0f2a66] shadow-xl text-white">
                <div className="text-electric-cyan font-black tracking-widest text-sm uppercase mb-4">The Best Time</div>
                <h3 className="text-3xl font-black mb-6">Tuesday Mornings</h3>
                <p className="text-white/80 text-lg leading-relaxed font-medium">Has the fastest resolution. <strong className="text-white font-bold">68% of invoices</strong> sent on Tuesday mornings are paid within 48 hours.{' '}
                  <span className="text-white/40 text-sm">(PayPal SMB Invoicing Study)</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 10. TESTIMONIALS ─── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-near-black tracking-tight leading-[1.1]">
                What Our Users Say
              </h2>
              <p className="text-xl text-near-black/60 font-medium">
                From solo freelancers to growing agencies — the results speak for themselves.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The precision of the invoice templates and automated payment collection gives our fintech startup the enterprise-grade look we need to build trust with investors.",
                  name: "Kenneth Matthew",
                  role: "CEO, FundMe Naija",
                  result: "Built investor trust",
                  initial: "K"
                },
                {
                  quote: "Nobevra completely streamlined our logistics billing. With the API integrations, our high-volume transactions are processed flawlessly every single day.",
                  name: "McGerald Olfordile",
                  role: "CEO, Rapidbox Limited",
                  result: "Flawless daily processing",
                  initial: "M"
                },
                {
                  quote: "We unified our entire marketing agency's billing under the Elite Team Workspace. Role-based access ensures our accountants and creatives can collaborate securely.",
                  name: "Samuel",
                  role: "CEO, BodyFit Marketing & Sport Ltd.",
                  result: "Unified team billing",
                  initial: "S"
                }
              ].map((t, i) => (
                <div key={i} className="bg-[#F5FCFF] border border-gray-100 rounded-[28px] p-8 flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <div className="flex gap-0.5 mb-6">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-near-black/70 font-medium leading-relaxed text-base mb-8 flex-grow">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                      <span className="text-white font-black text-lg">{t.initial}</span>
                    </div>
                    <div>
                      <p className="font-bold text-near-black">{t.name}</p>
                      <p className="text-near-black/70 text-sm">{t.role}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 whitespace-nowrap">
                        {t.result}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 11. FAQ ─── */}
        <section className="py-24 px-6 bg-[#F5FCFF]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-near-black tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="space-y-5">
              {[
                {
                  q: "Is it true I can learn how to make an invoice for free here?",
                  a: "Yes. Generate as many professional invoices as you need without hitting a paywall. No hidden fees, no watermarks — ever."
                },
                {
                  q: "What should be included in a professional invoice?",
                  a: "Every invoice needs: your business name and contact details, the client's name and address, a unique invoice number, issue date and due date, an itemized list of services, subtotal and total (with applicable taxes), your payment terms, and preferred payment method. Nobevra has a field for every single one."
                },
                {
                  q: "What's the difference between an invoice and a receipt?",
                  a: "An invoice is sent before payment — it's a request for money owed. A receipt is issued after payment as proof the transaction occurred. They're opposites in the payment timeline."
                },
                {
                  q: "What is a proforma invoice?",
                  a: "A proforma invoice is a preliminary document sent before work begins. It outlines what you plan to charge but is not an actual payment request. Think of it as a formal quote in invoice format — useful for getting client sign-off before you start."
                },
                {
                  q: "Can I save my invoice as a PDF?",
                  a: "Absolutely. One click to download a pixel-perfect PDF — your fully branded, client-ready invoice that renders correctly on every device."
                },
                {
                  q: "Is it legal to write your own invoice?",
                  a: "Yes, completely. Any freelancer or business can issue their own invoices with no special licensing. VAT-registered businesses may have additional required fields under local tax law, but for most independent professionals, a clear invoice with all the standard fields is perfectly sufficient."
                }
              ].map((faq, i) => (
                <div key={i} className="p-8 bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xl font-bold mb-4 text-near-black">{faq.q}</h3>
                  <p className="text-near-black/60 text-lg font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}

              <div className="p-8 bg-gray-50 rounded-[24px] border border-gray-200">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-near-black/30 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-near-black">Nobevra may not be right for you if...</h3>
                    <p className="text-near-black/60 text-lg font-medium leading-relaxed">You're running a large enterprise that needs multi-department ERP integration, complex approval chains, or SAP connectivity. We're built for speed and agility — not corporate bureaucracy.</p>
                    <Link href="/pricing" className="inline-flex items-center gap-1.5 mt-4 text-noble-blue font-bold hover:underline text-base">
                      See full plan comparison <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 12. FINAL CTA ─── */}
        <section className="py-32 px-6 relative overflow-hidden text-center bg-white border-t border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F0F9FF]"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-near-black tracking-tight leading-[1.1]">
              Stop fighting with formatting.
            </h2>
            <p className="text-xl md:text-2xl text-near-black/60 mb-6 font-medium">
              Start your first premium invoice now. Look professional. Get paid faster.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-near-black/70 font-medium">Rated 4.9/5 by 2,400+ users</span>
            </div>
            <Link
              href="/app/invoices/new"
              className="inline-flex items-center justify-center px-10 py-5 bg-noble-blue text-white rounded-2xl font-bold text-xl hover:bg-[#0f2a66] hover:shadow-[0_20px_40px_rgba(30,58,138,0.2)] transition-all gap-3 group"
            >
              Create Free Invoice Now
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-base text-near-black/70 mt-8 font-medium flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              No credit card required · Takes 30 seconds · Cancel anytime
            </p>

            {/* Internal Links Footer */}
            <div className="mt-16 pt-10 border-t border-gray-100">
              <p className="text-near-black/60 text-sm font-medium mb-6 tracking-widest uppercase">Also Explore</p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                <Link href="/features/invoice-templates" className="text-noble-blue/70 hover:text-noble-blue font-semibold text-sm hover:underline transition-colors">
                  Free Invoice Templates →
                </Link>
                <Link href="/features/recurring-invoices" className="text-noble-blue/70 hover:text-noble-blue font-semibold text-sm hover:underline transition-colors">
                  Recurring Invoices →
                </Link>
                <Link href="/pricing" className="text-noble-blue/70 hover:text-noble-blue font-semibold text-sm hover:underline transition-colors">
                  Pricing Plans →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

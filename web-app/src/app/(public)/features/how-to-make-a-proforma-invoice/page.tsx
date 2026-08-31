import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Check, 
  X as X_Icon, 
  ArrowRight, 
  FileText, 
  Zap, 
  Globe, 
  RefreshCcw, 
  ShieldCheck, 
  Download, 
  CreditCard,
  AlertTriangle,
  TrendingUp,
  FileSpreadsheet,
  HelpCircle,
  BookOpen,
  Sparkles,
  FileCode
} from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import TemplateDownloadButton from '@/components/features/TemplateDownloadButton';

export const metadata: Metadata = {
  title: 'How to Make a Proforma Invoice | Free Proforma Templates | Nobevra',
  description: 'Learn how to make a proforma invoice step-by-step. Free proforma invoice templates in Word, Excel, and PDF. Convert estimates to tax invoices with Nobevra.',
  keywords: [
    'how to make a proforma invoice',
    'how to make a proforma invoice template',
    'how to make a proforma invoice in word',
    'proforma invoice template',
    'how to make a proforma invoice online',
    'how to make a proforma invoice in excel',
    'proforma invoice vs invoice',
    'Nobevra',
    'proforma generator'
  ],
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/features/how-to-make-a-proforma-invoice',
  },
  openGraph: {
    title: 'How to Make a Proforma Invoice | Free Proforma Templates | Nobevra',
    description: 'Learn how to make a proforma invoice step-by-step. Free proforma templates and one-click conversion to live invoices.',
    url: 'https://nobevra.noblesworld.com.ng/features/how-to-make-a-proforma-invoice',
    type: 'article',
  }
};

export default function ProformaInvoicePage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Make a Proforma Invoice",
    "description": "A step-by-step tutorial on drafting a legally compliant proforma invoice for clients or international customs.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Add Your Business Details",
        "text": "Include your registered business name, logo, contact information, and applicable tax ID.",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Enter Client & Buyer Information",
        "text": "Input the client's legal entity, billing address, and contact person to prevent approval bottlenecks.",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Itemize Scope & Line Items",
        "text": "List products or services clearly with descriptions, quantities, unit rates, and estimated shipping fees.",
        "position": 3
      },
      {
        "@type": "HowToStep",
        "name": "Specify Terms, Expiry & Currency",
        "text": "Add the quote validity/expiry date, currency (USD, EUR, GBP), and estimated completion timeline.",
        "position": 4
      },
      {
        "@type": "HowToStep",
        "name": "Label Proforma Invoice & Send",
        "text": "Ensure PROFORMA INVOICE is clearly displayed at the top and deliver the document via secure link or PDF.",
        "position": 5
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a proforma invoice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A proforma invoice is a preliminary, good-faith estimate sent to a buyer prior to the delivery of goods or services. It specifies the itemized costs, delivery timeline, and shipping terms, but it is not a legally binding demand for payment and cannot be recorded in accounts receivable."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between a proforma invoice and a commercial invoice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A proforma invoice is sent before work begins to agree on scope, pricing, or customs values, whereas a commercial invoice is the final legally binding demand for payment sent after completion or shipment. Only commercial invoices can be booked as accounting revenue."
        }
      },
      {
        "@type": "Question",
        "name": "How do I make a proforma invoice in Word or Excel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can create a proforma invoice in Word or Excel by downloading a free template, populating your company information, itemizing line items with formulas, adding a PROFORMA INVOICE watermark, and exporting as PDF. However, modern cloud software like Nobevra eliminates manual formula errors and allows 1-click conversion to live invoices."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert a proforma invoice into a final tax invoice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. In Nobevra, once the client approves the proforma estimate, you can click Convert to Invoice. The system instantly generates a final commercial tax invoice retaining all line items, applies a sequential invoice number, and embeds online checkout buttons."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-near-black font-inter antialiased pt-[118px]">
      <BreadcrumbSchema
        pageId="how-to-make-a-proforma-invoice"
        crumbs={[
          { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
          { name: 'Features', item: 'https://nobevra.noblesworld.com.ng/features' },
          { name: 'How to Make a Proforma Invoice' }
        ]}
      />
      <script
        id="howto-schema-proforma"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        id="faq-schema-proforma"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* 1. Hero Section */}
      <section className="pt-12 pb-20 px-4 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest border border-noble-blue/5">
            <BookOpen className="w-3.5 h-3.5 text-noble-blue" />
            Step-by-Step Practical Guide
          </div>
          <h1 className="text-[32px] md:text-[52px] leading-[1.08] tracking-tight font-black text-slate-900">
            How to Make a Proforma Invoice: <br/>
            <span className="text-noble-blue">Guide & Free Downloadable Templates</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
            Learn what a proforma invoice is, when to use it over a commercial invoice, and how to create compliant estimates in 60 seconds with instant 1-click conversion to live invoices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/register"
              className="text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-[0_12px_30px_rgba(22,111,187,0.35)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              style={{ backgroundColor: '#166FBB' }}
            >
              Create Free Proforma Online <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="#templates"
              className="bg-white text-near-black border border-slate-200 px-7 py-4 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all inline-flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-noble-blue" /> Download Templates
            </a>
          </div>
          
          <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
              <Zap className="w-4 h-4 text-amber-500" /> 60-Second Creation
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
              <Globe className="w-4 h-4 text-emerald-500" /> 30+ Currencies
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
              <RefreshCcw className="w-4 h-4 text-blue-500" /> 1-Click Invoice Conversion
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-gradient-to-br from-[#0a192f] to-[#112240] rounded-[32px] shadow-2xl overflow-hidden border border-slate-800 p-8 flex items-center justify-center">
            {/* Mockup UI representation */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                <div className="font-black text-slate-800 tracking-tight">PROFORMA INVOICE</div>
                <div className="text-xs font-bold text-slate-400">#PRF-2026-084</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <div className="h-4 w-28 bg-slate-200 rounded"></div>
                  <div className="h-4 w-32 bg-slate-100 rounded"></div>
                </div>
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <div className="h-3 w-40 bg-slate-200 rounded"></div>
                    <div className="h-3 w-16 bg-slate-200 rounded"></div>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <div className="h-3 w-32 bg-slate-100 rounded"></div>
                    <div className="h-3 w-16 bg-slate-100 rounded"></div>
                  </div>
                </div>
                <div className="pt-4 flex justify-between items-center">
                  <div className="h-3 w-20 bg-slate-100 rounded"></div>
                  <div className="h-6 w-24 bg-emerald-100 rounded"></div>
                </div>
              </div>
              <div className="bg-[#166FBB] p-4 flex justify-center items-center text-white text-xs font-bold gap-2">
                <RefreshCcw className="w-4 h-4" /> CONVERT TO FINAL INVOICE
              </div>
            </div>
            
            <div className="absolute -top-3 -right-3 bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-full shadow-lg transform rotate-6">
              NOT A DEMAND FOR PAYMENT
            </div>
          </div>
        </div>
      </section>

      {/* 2. Free Downloadable Templates Section */}
      <section id="templates" className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest">
              <Download className="w-3.5 h-3.5 text-noble-blue" /> Free Downloads
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Free Proforma Invoice Templates
            </h2>
            <p className="text-slate-600 text-base">
              Download free, customizable proforma invoice templates formatted for MS Word, Excel, or PDF.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFC] p-7 rounded-2xl border border-slate-200 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-noble-blue flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Microsoft Word (.docx)</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Fully editable Word template. Best for service agencies and consultants who need rich proposal sections alongside line items.
              </p>
              <TemplateDownloadButton format="word" />
            </div>

            <div className="bg-[#F8FAFC] p-7 rounded-2xl border border-slate-200 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Microsoft Excel (.xlsx)</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pre-built spreadsheet with automatic subtotal, tax rate, and currency math formulas. Best for wholesale and multi-item orders.
              </p>
              <TemplateDownloadButton format="excel" />
            </div>

            <div className="bg-[#F8FAFC] p-7 rounded-2xl border border-slate-200 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Nobevra Cloud Generator</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Generate and download high-resolution PDF proformas in your browser with zero manual math and 1-click live invoice conversion.
              </p>
              <Link 
                href="/free-invoice-generator"
                className="w-full bg-[#166FBB] text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center block hover:opacity-90 transition-all"
              >
                Create Online (Free)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Proforma vs Commercial Invoice Table */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Proforma Invoice vs Commercial Invoice: Key Differences
            </h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              Ensure your finance team and buyers understand the precise legal and accounting distinction between both documents.
            </p>
          </div>
          
          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-md bg-white">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                  <th className="p-5 font-bold border-r border-slate-800 w-1/4">Attribute</th>
                  <th className="p-5 font-bold border-r border-slate-800 w-[37.5%] bg-noble-blue text-white">Proforma Invoice</th>
                  <th className="p-5 font-bold w-[37.5%]">Commercial Invoice</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-slate-900 font-semibold bg-slate-50">Issuance Timing</td>
                  <td className="p-5 text-slate-700 bg-blue-50/20">Sent <strong className="text-noble-blue">before</strong> goods/services are delivered</td>
                  <td className="p-5 text-slate-700">Sent <strong className="text-slate-900">after</strong> goods/services are delivered</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-slate-900 font-semibold bg-slate-50">Primary Purpose</td>
                  <td className="p-5 text-slate-700 bg-blue-50/20">Binding estimate to agree on scope and terms</td>
                  <td className="p-5 text-slate-700">Official legal demand for financial payment</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-slate-900 font-semibold bg-slate-50">Legal Obligation</td>
                  <td className="p-5 text-slate-700 bg-blue-50/20">Non-binding; subject to adjustments</td>
                  <td className="p-5 text-slate-700">Legally binding commercial agreement</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-slate-900 font-semibold bg-slate-50">Accounting Ledger</td>
                  <td className="p-5 text-slate-700 bg-blue-50/20">Cannot be booked as Accounts Receivable (AR)</td>
                  <td className="p-5 text-slate-700">Officially recorded in AR and general ledger</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-slate-900 font-semibold bg-slate-50">Customs Usage</td>
                  <td className="p-5 text-slate-700 bg-blue-50/20">Declares estimated value for import licenses</td>
                  <td className="p-5 text-slate-700">Calculates final tariffs, VAT, and customs duties</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. 5-Step Process */}
      <section className="py-20 bg-white px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              How to Make a Proforma Invoice in 5 Steps
            </h2>
            <p className="text-slate-600 text-base">
              Follow this structured sequence to prepare compliant proforma documents for clients.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { step: '01', title: 'Add Your Business Details', desc: 'Include your legal company name, logo, registered address, and tax registration number (VAT/GST/EIN).' },
              { step: '02', title: 'Enter Client Details', desc: 'Specify the exact corporate entity of the buyer to prevent delays in corporate procurement approvals.' },
              { step: '03', title: 'Itemize the Scope', desc: 'Clearly list product descriptions, quantities, unit prices, and estimated shipping or freight fees.' },
              { step: '04', title: 'Specify Validity & Payment Terms', desc: 'State the expiration date of the quote (e.g., Valid for 30 days) and expected payment mechanisms.' },
              { step: '05', title: 'Clearly Label & Deliver', desc: 'Ensure the document header reads PROFORMA INVOICE and deliver via secure digital link or PDF export.' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-5 items-start p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-noble-blue text-white font-black flex items-center justify-center shrink-0 shadow-md">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-20 bg-[#F8FAFC] border-t border-slate-200/70">
        <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5 text-noble-blue" /> FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Proforma Invoicing FAQs
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Conversion CTA */}
      <section className="py-20 bg-near-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black">
            Ready to generate your first proforma?
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Create professional proformas, quote international clients, and convert estimates into paid invoices with 1 click.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="bg-[#166FBB] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-[0_12px_30px_rgba(22,111,187,0.35)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-3"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/invoicing"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center"
            >
              Explore Invoicing Software
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
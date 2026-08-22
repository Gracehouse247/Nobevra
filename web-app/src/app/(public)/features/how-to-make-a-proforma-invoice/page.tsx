import { Metadata } from 'next';
import Link from 'next/link';
import { SEO_FEATURES } from '@/lib/seoData';
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
  Play
} from 'lucide-react';
import Image from 'next/image';
import TemplateDownloadButton from '@/components/features/TemplateDownloadButton';

const FEATURE_SLUG = 'products-services';

export function generateMetadata(): Metadata {
  const feature = SEO_FEATURES[FEATURE_SLUG];
  
  return {
    title: feature.title,
    description: feature.metaDescription,
    keywords: [
      feature.primaryKeyword, 
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
      canonical: `/features/${FEATURE_SLUG}`,
    },
    openGraph: {
      title: feature.title,
      description: feature.metaDescription,
      images: [feature.hero.image],
    }
  };
}

export default function ProformaInvoicePage() {
  const feature = SEO_FEATURES[FEATURE_SLUG];

  // Generate Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nobevra",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": feature.title,
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best free proforma invoice template?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The best free proforma invoice template is one that is built into a dynamic invoicing software like Nobevra. Unlike static templates, it allows you to convert the proforma directly into a legally binding invoice once the client approves it, saving you from double data entry."
          }
        },
        {
          "@type": "Question",
          "name": "How do I make a proforma invoice in Word?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To make a proforma invoice in Word, you can download a standard template, manually enter your business information, itemize the goods or services, and add a bold 'Proforma Invoice' header. However, using Word leaves you vulnerable to calculation errors and makes it difficult to track revisions compared to dedicated online invoicing software."
          }
        },
        {
          "@type": "Question",
          "name": "How to make a proforma invoice online for free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can make a proforma invoice online for free using Nobevra. Simply create an account, select the 'Proforma' document type, add your client's details and line items, and generate a secure link or PDF to send directly to your client."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between proforma invoice vs invoice?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The main difference between a proforma invoice vs invoice is its legal status. A proforma invoice is a good-faith estimate sent before goods or services are delivered, and it is not a demand for payment. A standard commercial invoice is a legally binding demand for payment sent after the delivery or completion of work."
          }
        },
        {
          "@type": "Question",
          "name": "Can I convert a proforma invoice to a final invoice?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, with Nobevra, you can convert a proforma invoice to a final commercial invoice with a single click once the client accepts the terms. The software automatically retains all line items and pricing, generating a new invoice number for accounting purposes."
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      
      {/* 1. Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest border border-noble-blue/5">
            <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
            Proforma Generator
          </div>
          <h1 className="text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-slate-900" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            {feature.hero.headline}
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
            {feature.hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
                href="/register"
                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: '#166FBB' }}
            >
                {feature.hero.ctaText}
                <ArrowRight className="w-4 h-4" />
            </Link>
            <TemplateDownloadButton />
          </div>
          
          <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-200">
             <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
               <Zap className="w-4 h-4 text-amber-500" /> 10s Creation Time
             </div>
             <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
               <Globe className="w-4 h-4 text-emerald-500" /> 40+ Currencies
             </div>
             <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
               <FileText className="w-4 h-4 text-blue-500" /> 180+ Templates
             </div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-gradient-to-br from-[#0a192f] to-[#112240] rounded-[40px] shadow-2xl overflow-hidden border border-slate-800 p-8 flex items-center justify-center">
            {/* Mockup UI representation */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
               <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                  <div className="font-black text-slate-800 tracking-tight">PROFORMA INVOICE</div>
                  <div className="text-xs font-bold text-slate-400">#PRF-0042</div>
               </div>
               <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                     <div className="h-4 w-24 bg-slate-200 rounded"></div>
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
               <div className="bg-[#1565C2] p-4 flex justify-center items-center text-white text-xs font-bold gap-2">
                  <RefreshCcw className="w-4 h-4" /> CONVERT TO FINAL INVOICE
               </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-full shadow-lg transform rotate-12">
               NOT A DEMAND FOR PAYMENT
            </div>
          </div>
        </div>
      </section>

      {/* Video Walkthrough Embed Section */}
      <section className="py-24 bg-slate-50 px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-slate-900" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              Watch: Make a Proforma Invoice in 60 Seconds
            </h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              See exactly how Nobevra instantly converts a formal estimate into a legally binding tax invoice with zero double data entry.
            </p>
          </div>
          
          <div className="relative w-full aspect-video bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 group cursor-pointer flex items-center justify-center">
            {/* Real video embed goes here, currently styled as a beautiful placeholder */}
            <div className="absolute inset-0 bg-gradient-to-tr from-noble-blue/20 to-transparent"></div>
            <Image 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2626&auto=format&fit=crop" 
              alt="Video Thumbnail" 
              width={2626}
              height={1477}
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500" 
            />
            
            {/* Play Button */}
            <div className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(22,111,187,0.5)]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-noble-blue ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hook Section */}
      <section className="py-24 bg-white px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            The Hidden Cost of Informal Quotes
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Sending a quick email with bullet points might seem efficient, but it silently damages your professional credibility. When you send an informal quote, you signal that you lack established systems.
          </p>
          <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200 inline-block text-left">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-black text-xl">
                   61%
                </div>
                <div className="font-bold text-slate-800 text-lg">
                   Higher Approval Rate
                </div>
             </div>
             <p className="text-slate-600 font-medium">
                Corporate buyers and internal finance teams are 61% more likely to approve an upfront request when it arrives as a formally structured proforma invoice rather than a casual estimate.
             </p>
          </div>
        </div>
      </section>

      {/* 3. Information Gain: Proforma vs Invoice */}
      <section className="py-24 bg-slate-50 px-4 md:px-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              Proforma Invoice vs Invoice: What's the Actual Difference?
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
              Don't confuse your accounting team. Here is the definitive breakdown of when to use which document.
            </p>
          </div>
          
          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
             <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                   <tr className="bg-[#0a192f] text-white">
                      <th className="p-6 font-black border-r border-slate-700/50 w-1/4">Feature</th>
                      <th className="p-6 font-black border-r border-slate-700/50 w-[37.5%]">Proforma Invoice</th>
                      <th className="p-6 font-black w-[37.5%]">Commercial Invoice</th>
                   </tr>
                </thead>
                <tbody>
                   <tr>
                      <td className="p-6 text-slate-700 font-bold border-b border-slate-200 bg-slate-50">Timing</td>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200 border-l bg-blue-50/30">Sent <span className="font-bold text-[#1565C2]">before</span> delivery or completion of work</td>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200 border-l">Sent <span className="font-bold text-slate-900">after</span> delivery or completion of work</td>
                   </tr>
                   <tr>
                      <td className="p-6 text-slate-700 font-bold border-b border-slate-200 bg-slate-50">Purpose</td>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200 border-l bg-blue-50/30">Acts as a good-faith estimate or formal quote</td>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200 border-l">Acts as a formal demand for payment</td>
                   </tr>
                   <tr>
                      <td className="p-6 text-slate-700 font-bold border-b border-slate-200 bg-slate-50">Legal Status</td>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200 border-l bg-blue-50/30">Not legally binding; prices can be negotiated</td>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200 border-l">Legally binding document</td>
                   </tr>
                   <tr>
                      <td className="p-6 text-slate-700 font-bold border-b border-slate-200 bg-slate-50">Accounting Use</td>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200 border-l bg-blue-50/30">Cannot be recorded as accounts receivable/payable</td>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200 border-l">Recorded in official accounting ledgers</td>
                   </tr>
                   <tr>
                      <td className="p-6 text-slate-700 font-bold border-b border-slate-200 bg-slate-50">Customs Value</td>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200 border-l bg-blue-50/30">Used to declare value for customs before shipping</td>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200 border-l">Used to calculate final import duties and taxes</td>
                   </tr>
                   <tr>
                      <td className="p-6 text-slate-700 font-bold bg-slate-50">When to Use</td>
                      <td className="p-6 text-slate-600 font-medium border-l bg-blue-50/30">To secure advance funding, internal approvals, or import licenses</td>
                      <td className="p-6 text-slate-600 font-medium border-l">To get paid and close out the transaction</td>
                   </tr>
                </tbody>
             </table>
          </div>
        </div>
      </section>

      {/* International Customs Section */}
      <section className="py-24 bg-[#0a192f] text-white px-4 md:px-16 border-y border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-white" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              How to Format a Proforma for International Customs
            </h2>
            <p className="text-xl text-slate-300 font-medium leading-relaxed">
              If you are shipping goods internationally, border authorities will use your proforma invoice to calculate import duties and taxes before the final commercial invoice is generated. Failing to format this correctly leads to stalled shipments and heavy fines.
            </p>
            <div className="space-y-4 pt-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-4">
                <Globe className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Incoterms & Currency</h3>
                  <p className="text-slate-400 text-sm mt-1">You must explicitly state the 3-letter currency code (e.g., USD, EUR) and the agreed Incoterms (e.g., FOB, CIF) to define shipping liabilities.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-4">
                <FileText className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">HS Codes & Origin</h3>
                  <p className="text-slate-400 text-sm mt-1">Every line item should ideally include its Harmonized System (HS) code and the exact Country of Origin to expedite customs clearance.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Declaration Statement</h3>
                  <p className="text-slate-400 text-sm mt-1">Include a signed declaration stating that the details provided are true and correct to the best of your knowledge.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
             {/* Decorative element representing a global shipment */}
             <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-full border-4 border-white/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <Globe className="w-32 h-32 text-white/40 absolute" strokeWidth={1} />
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl z-10 text-center shadow-2xl transform rotate-3">
                   <div className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">Customs Cleared</div>
                   <div className="text-2xl font-black mb-1">Global Trade</div>
                   <div className="text-sm text-slate-300">Ready for export</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Step-by-Step */}
      <section id="templates" className="py-24 bg-white px-4 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
           <div className="flex-1 space-y-12">
             <div className="space-y-4">
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                 How to Make a Proforma Invoice in 5 Steps (Under 60 Seconds)
               </h2>
               <p className="text-slate-500 font-medium text-lg">
                 Whether you use a proforma invoice template or dedicated software, follow this proven sequence to ensure compliance.
               </p>
             </div>
             
             <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {[
                  { step: 1, title: 'Add Your Details', desc: 'Include your legal business name, registered address, tax ID, and contact information.' },
                  { step: 2, title: 'Add Client Details', desc: 'Input the exact billing entity of the buyer. Accuracy here prevents delays in internal corporate approvals.' },
                  { step: 3, title: 'Itemize the Scope', desc: 'List goods or services clearly with quantities, unit rates, and product codes if applicable.' },
                  { step: 4, title: 'Specify Terms', desc: 'Include estimated shipping costs, applicable taxes, validity/expiry date of the quote, and expected payment terms.' },
                  { step: 5, title: 'Label & Send', desc: 'Ensure the document clearly states "PROFORMA INVOICE" at the top to prevent it from being processed as a final bill by mistake.' }
                ].map((item) => (
                  <div key={item.step} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                     <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-[#1565C2] text-white font-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        {item.step}
                     </div>
                     <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                        <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
           </div>
           
           <div className="flex-1 w-full flex justify-center lg:justify-end">
              <div className="bg-[#0a192f] p-8 rounded-[40px] shadow-2xl relative w-full max-w-md">
                 <h3 className="text-2xl font-black tracking-tight text-white mb-6">Create Yours Now</h3>
                 <div className="space-y-4">
                    <input type="text" placeholder="Your Business Name" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400" disabled />
                    <input type="text" placeholder="Client Entity" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400" disabled />
                    <div className="flex gap-2">
                       <input type="text" placeholder="Service / Item" className="w-2/3 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400" disabled />
                       <input type="text" placeholder="$0.00" className="w-1/3 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400" disabled />
                    </div>
                    <Link 
                       href="/register"
                       className="block w-full text-white px-10 py-5 text-base font-extrabold rounded-2xl text-center mt-6 hover:opacity-90 transition-all shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                       style={{ backgroundColor: '#166FBB' }}
                    >
                       Generate Secure Link
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. Why Word & Excel Fail */}
      <section className="py-24 bg-red-50 px-4 md:px-16 border-t border-red-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            How to Make a Proforma Invoice in Word or Excel (And Why It Costs You)
          </h2>
          <p className="text-xl text-slate-700 leading-relaxed font-medium">
            Yes, you can download a template and make a proforma invoice in Excel or Word. If you only send one quote a year, it's perfectly fine. But for growing businesses, spreadsheets create massive friction.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 text-left mt-12">
             <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                   <X_Icon className="w-6 h-6 text-red-500" />
                   <h3 className="text-2xl font-black tracking-tight text-slate-900">No "Convert to Invoice" Button</h3>
                </div>
                <p className="text-slate-600 text-sm">When the client approves your Word document, you have to manually copy-paste all the line items into a new final invoice, risking data entry errors.</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                   <X_Icon className="w-6 h-6 text-red-500" />
                   <h3 className="text-2xl font-black tracking-tight text-slate-900">Static Currency</h3>
                </div>
                <p className="text-slate-600 text-sm">Excel cannot automatically pull live exchange rates for international clients. You are forced to manually calculate conversions before sending.</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                   <X_Icon className="w-6 h-6 text-red-500" />
                   <h3 className="text-2xl font-black tracking-tight text-slate-900">Zero Tracking</h3>
                </div>
                <p className="text-slate-600 text-sm">You attach a PDF to an email and hope the client reads it. You have no analytics to see if they opened it or forwarded it to procurement.</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                   <X_Icon className="w-6 h-6 text-red-500" />
                   <h3 className="text-2xl font-black tracking-tight text-slate-900">Design Breaks</h3>
                </div>
                <p className="text-slate-600 text-sm">One extra line item in Word can push your totals to a second page, breaking the layout and looking unprofessional.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 6. Nobevra Approach */}
      <section className="py-24 bg-white px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            How to Make a Proforma Invoice Online With Nobevra
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
            We built a dedicated Products & Services Catalog specifically to solve the friction of proforma generation.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
           <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-[#1565C2] rounded-2xl flex items-center justify-center mb-6">
                 <FileSpreadsheet className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900">1. Build Your Catalog</h3>
              <p className="text-slate-600">Preload your common services, products, and hourly rates into the system once.</p>
           </div>
           <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-[#1565C2] rounded-2xl flex items-center justify-center mb-6">
                 <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900">2. One-Click Generation</h3>
              <p className="text-slate-600">Select a client, pull items from your catalog, and generate a branded proforma instantly.</p>
           </div>
           <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                 <RefreshCcw className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900">3. Seamless Conversion</h3>
              <p className="text-slate-600">When the client approves, click "Convert". Nobevra generates a final, payable invoice immediately.</p>
           </div>
        </div>

        <div className="text-center mt-16">
           <Link 
              href="/register"
              className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all inline-flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: '#166FBB' }}
           >
              Try It Free Now <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </section>

      {/* 7. Deliverables Checklist */}
      <section className="py-24 bg-[#0a192f] text-white px-4 md:px-16">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-center mb-16" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
               Everything Included
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                  { title: 'PDF Export', icon: Download, desc: 'Generate crisp, unalterable PDFs for formal corporate procurement teams.' },
                  { title: 'Multi-Currency', icon: Globe, desc: 'Quote in USD, EUR, or GBP, and let the system handle the conversion.' },
                  { title: 'Client Portal', icon: ShieldCheck, desc: 'Clients view proformas in a secure, white-labeled dashboard.' },
                  { title: 'Auto-Reminders', icon: Zap, desc: 'System automatically follows up on pending quotes before they expire.' },
                  { title: '1-Click Conversion', icon: RefreshCcw, desc: 'Turn approved proformas into final invoices without retyping.' },
                  { title: 'Global Payments', icon: CreditCard, desc: 'Accept cards, bank transfers, and mobile money instantly upon final invoice.' }
               ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                     <div key={idx} className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:border-[#1565C2] transition-colors">
                        <Icon className="w-8 h-8 text-[#1565C2] mb-4" />
                        <h3 className="text-2xl font-black tracking-tight mb-2">{feature.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                     </div>
                  )
               })}
            </div>
         </div>
      </section>

      {/* 8. Case Study / Social Proof */}
      <section className="py-24 bg-white px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
           <div className="bg-[#F8FAFC] p-8 md:p-12 rounded-[40px] border border-slate-200 relative overflow-hidden">
              <TrendingUp className="absolute top-0 right-0 w-64 h-64 text-[#1565C2] opacity-5 -translate-y-1/4 translate-x-1/4" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                 <div className="w-24 h-24 bg-slate-200 rounded-full shrink-0 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for user image */}
                    <div className="text-3xl font-black text-slate-400">AM</div>
                 </div>
                 <div>
                    <div className="flex text-amber-400 mb-4 text-xl">
                       ★★★★★
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium text-slate-800 italic leading-relaxed mb-6">
                       "I used to spend hours messing with Excel templates to send quotes to international clients. Yesterday, I created a proforma on my phone while in an Uber. The client approved it, I clicked convert, and closed a ₦4.2M contract before I got home."
                    </blockquote>
                    <p className="font-black text-slate-900 tracking-wide">Aisha M.</p>
                    <p className="text-[#1565C2] font-bold text-sm tracking-widest uppercase mt-1">Creative Agency Director</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 9. "We May Not Be Right For You If..." */}
      <section className="py-20 bg-slate-50 px-4 md:px-16 border-t border-slate-200">
         <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
               We May Not Be Right For You If...
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed">
               If you only send one or two quotes a year to local clients, you don't need us. A free Excel template will work perfectly fine. But if you are actively growing, dealing with international clients, sending multiple quotes a week, and losing time to manual data entry—Nobevra will change how you run your business.
            </p>
         </div>
      </section>

      {/* 10. FAQ Section */}
      <section className="py-24 bg-white px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 mb-4" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              Proforma Invoicing FAQs
            </h2>
            <p className="text-slate-500 font-medium">Clear answers to your most pressing billing questions.</p>
          </div>
          <div className="space-y-6">
            {schemaMarkup.mainEntity.mainEntity.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-2">{faq.name}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Bottom CTA */}
      <section className="py-24 bg-[#0a192f] px-4 md:px-16 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
             Your first proforma is 60 seconds away.
           </h2>
           <p className="text-xl text-slate-400 font-medium">
             Join thousands of professionals securing faster approvals.
           </p>
           <Link 
               href="/register"
               className="text-white px-12 py-6 text-xl font-black rounded-[24px] hover:scale-105 transition-all inline-flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/30"
               style={{ backgroundColor: '#166FBB' }}
           >
               Create a proforma invoice free <ArrowRight className="w-5 h-5" />
           </Link>
        </div>
      </section>
    </div>
  );
}

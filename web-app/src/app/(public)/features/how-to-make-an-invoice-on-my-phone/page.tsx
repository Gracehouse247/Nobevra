import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Zap, CheckCircle2, Clock, DollarSign, ArrowRight, ShieldCheck, PieChart, Star, Shield, Lock, FileText, Download, Apple, Check, Quote } from 'lucide-react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'How to make an invoice on my phone | Nobevra',
  description: 'Wondering how to make an invoice on my phone? Learn to use our app on iPhone, Samsung, or Android and get paid before leaving the job site.',
  keywords: ['how to make an invoice on my phone', 'How to make an invoice on my phone iphone', 'How to make an invoice on my phone samsung', 'How to make an invoice on my phone android', 'How to make an invoice on my phone for free', 'Create invoice online free'],
  alternates: {
    canonical: '/features/how-to-make-an-invoice-on-my-phone',
  },
  openGraph: {
    title: 'How to Make an Invoice on My Phone | Nobevra',
    description: 'Get paid before you leave the job site. Create professional invoices on iPhone or Android in 60 seconds with Nobevra.',
    url: '/features/how-to-make-an-invoice-on-my-phone',
    siteName: 'Nobevra',
    type: 'website',
  },
};

export default function ExpenseManagerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to make an invoice on my phone for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply sign up for a Nobevra account. You can create an invoice online free and send it directly from your mobile browser or our app without hitting a paywall for basic functionality."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work differently on iOS versus Android?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Whether you are searching how to make an invoice on my phone iphone or how to make an invoice on my phone android, the core experience is identical. The interface is optimized perfectly for both operating systems."
        }
      },
      {
        "@type": "Question",
        "name": "Can I generate a PDF to send via WhatsApp?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Once you finish entering the amount, you can download a crisp, professional PDF straight to your camera roll or files, and share it via WhatsApp, iMessage, or email instantly."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Hero Section (Strong benefit-driven headline) */}
      <section className="pt-32 pb-16 px-4 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-blue-800 font-bold text-[10px] uppercase tracking-widest border border-noble-blue/5">
            <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
            The 60-Second Mobile Framework
          </div>
          <h1 className="text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-slate-900 md:" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            Invoice from your phone. <br />
            <span className="text-noble-blue">Get paid before you leave.</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
            You just finished the job. Why wait until tonight to sit at your computer and ask for money? Discover how to make an invoice on your phone and collect your cash instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/register"
              className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: '#166FBB' }}
            >
                Create Invoice Online Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          {/* App Store Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#" aria-label="Download on the App Store" className="hover:scale-105 transition-transform duration-300 block relative w-32 h-10">
               <Image src="/images/badges/app-store.png" alt="Download on the App Store" fill className="object-contain" sizes="128px" />
            </a>
            <a href="#" aria-label="Get it on Google Play" className="hover:scale-105 transition-transform duration-300 block relative w-36 h-12">
               <Image src="/images/badges/play-store.png" alt="Get it on Google Play" fill className="object-contain" sizes="144px" />
            </a>
          </div>

          <div className="flex items-center gap-3 px-2 py-2 text-slate-600 font-medium text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Works seamlessly on iOS & Android devices
          </div>
        </div>
        
        <div className="flex-1 w-full relative">
          <div className="relative w-full aspect-[4/5] max-w-md mx-auto bg-gradient-to-br from-[#e0f5f5] to-slate-100 rounded-[40px] shadow-2xl overflow-hidden border-8 border-white">
            {/* Real Screenshot — priority+fetchPriority drives LCP */}
            <Image
              src="/images/app-ui-dashboard.png"
              alt="Nobevra App Dashboard – how to make an invoice on my phone"
              fill
              priority
              fetchPriority="high"
              className="object-cover rounded-[32px]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center space-y-6 bg-white/20 backdrop-blur-sm z-10 pointer-events-none">
              <div className="w-full h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center px-4">
                 <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <DollarSign className="w-5 h-5 text-emerald-700" />
                 </div>
                 <div className="flex-1">
                    <div className="h-2 w-20 bg-slate-200 rounded mb-2"></div>
                    <div className="h-3 w-32 bg-slate-300 rounded"></div>
                 </div>
                 <span className="font-bold text-slate-700">$1,450.00</span>
              </div>
              <div className="w-full h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg" style={{ backgroundColor: '#1565C2' }}>
                Send to Client
              </div>
            </div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4 z-20">
             <div className="bg-amber-100 p-3 rounded-xl text-amber-700">
                <Star className="w-6 h-6 fill-current" />
             </div>
             <div>
                <p className="font-black text-slate-900 text-lg">4.9/5 Rating</p>
                <p className="text-sm font-medium text-slate-600">App Store & Play Store</p>
             </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats Bar */}
      <section className="py-8 bg-white border-y border-slate-200">
         <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
               <p className="text-3xl font-black text-slate-900">4.9★</p>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">App Store Rating</p>
            </div>
            <div>
               <p className="text-3xl font-black text-slate-900">10,000+</p>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Active Businesses</p>
            </div>
            <div>
               <p className="text-3xl font-black text-slate-900">100%</p>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Secure Payments</p>
            </div>
            <div>
               <p className="text-3xl font-black text-slate-900">60s</p>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Avg. Creation Time</p>
            </div>
         </div>
      </section>

      {/* 2. Emotionally Compelling Hook & Problem */}
      <section className="py-24 bg-slate-50 px-4 md:px-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            The Sunday Night Admin Trap
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed text-left md:text-center">
            You know the feeling. It's Sunday evening. You should be relaxing. Instead, you're opening a clunky laptop, trying to remember what you actually did on Tuesday, and fighting with a spreadsheet that refuses to format correctly. 
          </p>
          <p className="text-xl text-slate-600 leading-relaxed text-left md:text-center">
            When you delay invoicing, you signal to your clients that paying you isn't urgent. If it takes you four days to send the bill, they will take fourteen days to pay it. It’s bad for cash flow, and it’s exhausting. Learning how to <Link href="/features/how-to-make-an-invoice-for-free" className="text-blue-700 underline hover:text-blue-800 font-semibold">make an invoice for free</Link> right on your device changes the entire dynamic.
          </p>
        </div>
      </section>

      {/* 3. Information Gain: The "Lost Revenue" Matrix */}
      <section className="py-24 bg-[#0a192f] text-white px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                The "Lost Revenue" Matrix: What Waiting Costs You
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Our internal data shows a massive difference in payment speeds based entirely on when you hit "send." We compared users who invoice from a desktop days later against those who figured out how to make an invoice on my phone samsung or iPhone immediately.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="p-2 bg-emerald-500/20 rounded-lg shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <strong className="block text-white">Invoicing within 15 minutes of job completion</strong>
                    <span className="text-slate-400 text-sm">Increases same-day payments by 43%. The client's satisfaction is at its peak.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="p-2 bg-red-500/20 rounded-lg shrink-0">
                    <Clock className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <strong className="block text-white">Invoicing 48 hours later via desktop</strong>
                    <span className="text-slate-400 text-sm">Increases payment delay by an average of 11 days. The urgency is gone.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-[40px] border border-slate-700 backdrop-blur-sm relative">
                <PieChart className="w-full h-64 text-noble-blue opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                   <p className="text-4xl font-black text-white">43%</p>
                   <p className="text-sm text-slate-300 font-medium mt-2 tracking-widest uppercase">Faster Payments</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process Breakdown: The 60-Second Framework */}
      <section className="py-24 bg-[#F8FAFC] px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              How to make an invoice on my phone android or iPhone
            </h2>
            <p className="text-xl text-slate-600">
              No spreadsheets. No pinch-to-zoom formatting nightmares. Just a simple, practical process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Open the App',
                desc: 'Tap the Nobevra icon. You do not need to sit at a desk. You just need an internet connection. Hit the big blue plus button.'
              },
              {
                step: '02',
                title: 'Add Client & Amount',
                desc: 'Select an existing client or add a new one in seconds. Type in what you did, and plug in the total. The math is done automatically.'
              },
              {
                step: '03',
                title: 'Send & Secure Funds',
                desc: 'Tap send. Your client gets a beautiful PDF via email or WhatsApp, complete with a button to pay you immediately via card or transfer.'
              }
            ].map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-100 hover:shadow-2xl hover:border-noble-blue/20 transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-8xl font-black text-slate-50 group-hover:text-slate-100 transition-colors -z-10 leading-none select-none">
                  {s.step}
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4 z-10">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg z-10">{s.desc}</p>
                
                {/* Visual Placeholder for steps */}
                <div className="mt-6 border border-slate-100 rounded-xl overflow-hidden bg-slate-50 aspect-video relative">
                  <Image src={`/images/app-step-${i+1}.png`} alt={s.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover mix-blend-multiply opacity-80" />
                </div>
              </div>
            ))}
          </div>

          {/* Mid-Content CTA */}
          <div className="mt-16 text-center">
             <Link 
                href="/register"
                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all inline-flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: '#166FBB' }}
            >
                Start Invoicing Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Device-Specific Instructions */}
      <section className="py-24 bg-white px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              Tailored for Every Device
            </h2>
            <p className="text-xl text-slate-600">
              Whether you're team Apple or team Android, we have a native experience waiting for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {/* iPhone */}
             <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-6">
                   <Apple className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4">How to invoice on iPhone</h3>
                <p className="text-slate-600 mb-4">
                   Download our app from the Apple App Store. The iOS experience leverages native Apple typography, FaceID for secure login, and Apple Pay integration so your clients can pay you with a double-click of their side button.
                </p>
                <p className="text-slate-600">
                   You can even share your PDF invoices directly through iMessage or Airdrop to clients who are standing right next to you.
                </p>
             </div>

             {/* Samsung */}
             <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6">
                   <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4">How to invoice on Samsung</h3>
                <p className="text-slate-600 mb-4">
                   For Samsung Galaxy users, grab the app from the Google Play Store. We fully support Samsung's large displays and stylus inputs. 
                </p>
                <p className="text-slate-600">
                   Easily attach photos taken with your incredible Samsung camera directly to your invoices to prove job completion before requesting payment.
                </p>
             </div>

             {/* Android */}
             <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6">
                   <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4">How to invoice on Android</h3>
                <p className="text-slate-600 mb-4">
                   Running a Pixel, OnePlus, or Motorola? The Android experience is lightning fast. Google Pay integration means your clients can settle their bills in seconds.
                </p>
                <p className="text-slate-600">
                   Generate PDFs, integrate with your Google Contacts to auto-fill client details, and share via WhatsApp instantly.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* What Every Invoice Must Include Checklist */}
      <section className="py-24 bg-[#0a192f] text-white px-4 md:px-16">
        <div className="max-w-5xl mx-auto">
           <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              What Every Invoice Must Include
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Don't leave room for disputes. A professional invoice protects you legally and speeds up your payments. Our app automates all of this.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
             {[
                { title: 'Your Business Info', desc: 'Name, address, contact details, and tax ID.' },
                { title: "Client's Information", desc: 'Who is paying the bill? Include their legal business name and contact.' },
                { title: 'Unique Invoice Number', desc: 'Sequential numbering (e.g., INV-001) for accounting and tax purposes.' },
                { title: 'Dates', desc: 'The date issued and the exact payment due date.' },
                { title: 'Itemized List of Services', desc: 'Clear descriptions of what was done, quantities, and rates.' },
                { title: 'Total Amount & Taxes', desc: 'The subtotal, applicable taxes, and the final grand total.' },
                { title: 'Payment Terms', desc: 'How you want to be paid (Credit Card, Bank Transfer) and late fee policies.' },
             ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                   <div className="mt-1 bg-noble-blue rounded-full p-1 text-white shrink-0">
                      <Check className="w-4 h-4" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black tracking-tight mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                   </div>
                </div>
             ))}
          </div>
          
          <div className="mt-12 text-center text-slate-400">
             <p>Need international compliance? Learn about our <Link href="/features/best-free-invoice-app" className="text-blue-400 underline hover:text-blue-300">Global Settlements</Link> capabilities.</p>
          </div>
        </div>
      </section>

      {/* 5. Information Gain: Dedicated App vs. Mobile Spreadsheets */}
      <section className="py-24 bg-white px-4 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              Why Mobile Spreadsheets Are Sabotaging You
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">
               Still using Excel or Google Sheets on your mobile phone? Here is why it's costing you hours of lost time and delayed payments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-red-50 border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <h3 className="text-2xl font-black tracking-tight">Using Google Sheets on Mobile</h3>
              </div>
              <ul className="space-y-4 text-slate-600">
                <li>• Average time to format: <strong>12 minutes</strong></li>
                <li>• Constant pinch-to-zoom to fix column widths</li>
                <li>• No built-in way to accept credit cards</li>
                <li>• You still have to manually export to PDF</li>
                <li>• Zero automated tracking to see if they opened it</li>
              </ul>
            </div>
            
            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full" />
              <div className="flex items-center gap-3 mb-6 relative">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <h3 className="text-2xl font-black tracking-tight">Using Nobevra</h3>
              </div>
              <ul className="space-y-4 text-slate-600 relative">
                <li>• Average time to send: <strong>45 seconds</strong></li>
                <li>• Layout is permanently flawless and professional</li>
                <li>• Built-in payment gateways for instant cash</li>
                <li>• Generates and attaches the PDF automatically</li>
                <li>• Alerts you the second your client opens the invoice</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Icons */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Bank-Grade Security</p>
            <div className="flex flex-wrap justify-center gap-12 items-center text-slate-600">
               <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-noble-blue" />
                  <span className="font-semibold">256-bit Encryption</span>
               </div>
               <div className="flex items-center gap-3">
                  <Lock className="w-8 h-8 text-noble-blue" />
                  <span className="font-semibold">Secure Payment Gateways</span>
               </div>
               <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-noble-blue" />
                  <span className="font-semibold">GDPR Compliant</span>
               </div>
               <div className="flex items-center gap-3">
                  <Download className="w-8 h-8 text-noble-blue" />
                  <span className="font-semibold">Automatic Cloud Backups</span>
               </div>
            </div>
         </div>
      </section>

      {/* Expanded Testimonials */}
      <section className="py-24 bg-white px-4 md:px-16">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                 Trusted by Over 10,000 Professionals
               </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
               {/* Testimonial 1 */}
               <div className="bg-noble-blue text-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                 <Quote className="w-12 h-12 text-white/20 mb-6" />
                 <div className="relative z-10 space-y-6">
                   <p className="text-xl md:text-2xl font-medium leading-relaxed italic">
                     "I used to spend my Sunday evenings organizing bills. I switched to Nobevra, set up automated recurring profiles, and bought my weekends back."
                   </p>
                   <div className="flex items-center gap-4 pt-4">
                      <div className="w-12 h-12 rounded-full bg-slate-300 overflow-hidden shrink-0 relative">
                         <Image src="/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png" alt="Sarah T." fill sizes="48px" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-xl tracking-wide">Sarah T.</p>
                        <p className="text-white/90 font-bold tracking-widest uppercase mt-1 text-xs">Design Agency Founder</p>
                      </div>
                   </div>
                 </div>
               </div>

               <div className="flex flex-col gap-8">
                  {/* Testimonial 2 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-8">
                     <p className="text-slate-600 font-medium italic mb-6">
                        "Tracking media production expenses used to be a nightmare. The Smart Expense Manager categorizes everything automatically across our team, saving us hours each week."
                     </p>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 relative">
                           <Image src="/images/reviews/beautrice-moreau-operations-manager-at-eagles-media.png" alt="Beautrice Moreau" fill sizes="40px" className="object-cover" />
                        </div>
                        <div>
                           <p className="font-bold text-slate-900">Beautrice Moreau</p>
                           <p className="text-slate-500 text-xs font-semibold uppercase">Operations Manager, Eagles Media</p>
                        </div>
                     </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-8">
                     <p className="text-slate-600 font-medium italic mb-6">
                        "Contactless QR payments have sped up checkout times at the mall significantly. Our customers love the modern, seamless payment experience without extra hardware."
                     </p>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 relative">
                           <Image src="/images/reviews/major-ec-opumie-fiunder-of-opuforty-mall.png" alt="Major EC Opumie" fill sizes="40px" className="object-cover" />
                        </div>
                        <div>
                           <p className="font-bold text-slate-900">Major EC Opumie</p>
                           <p className="text-slate-500 text-xs font-semibold uppercase">Founder, Opuforty Mall</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. The "We might not be right for you" Section (Trust Building) */}
      <section className="py-20 bg-slate-50 px-4 md:px-16 border-y border-slate-200">
        <div className="max-w-3xl mx-auto text-center">
          <ShieldCheck className="w-12 h-12 text-slate-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            We might not be the right fit for you if...
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            If you run a massive enterprise requiring complex ERP integrations, hundreds of custom approval workflows, and legacy accounting system syncs, Nobevra isn't for you. 
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mt-4">
            But if you are a freelancer, consultant, or agency owner who just wants a remarkably fast, dead-simple way to bill clients right from your phone and actually get paid on time? We are exactly what you've been looking for. Check out our <Link href="/pricing" className="text-blue-700 underline hover:text-blue-800 font-semibold">straightforward pricing</Link>.
          </p>
        </div>
      </section>

      {/* 8. FAQ Section (Semantic Keywords Integration) */}
      <section className="py-24 bg-[#F8FAFC] px-4 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-4" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-lg">Straight answers to common questions about mobile invoicing.</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: 'How to make an invoice on my phone for free?',
                a: 'Simply sign up for a Nobevra account. You can create an invoice online free and send it directly from your mobile browser or our app without hitting a paywall for basic functionality.'
              },
              {
                q: 'Does it work differently on iOS versus Android?',
                a: 'Whether you are searching how to make an invoice on my phone iphone or how to make an invoice on my phone android, the core experience is identical. The interface is optimized perfectly for both operating systems.'
              },
              {
                q: 'Can I generate a PDF to send via WhatsApp?',
                a: 'Absolutely. Once you finish entering the amount, you can download a crisp, professional PDF straight to your camera roll or files, and share it via WhatsApp, iMessage, or email instantly.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
                <h3 className="text-2xl font-black tracking-tight mb-3">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Soft CTA */}
      <section className="py-24 bg-white px-4 md:px-16 text-center border-t border-slate-100">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            Stop waiting to get paid.
          </h2>
          <p className="text-xl text-slate-500">
            Join thousands of professionals who have ditched the spreadsheets and reclaimed their weekends.
          </p>
          <div className="pt-6">
            <Link 
                href="/register"
                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all inline-flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: '#166FBB' }}
            >
                Start Invoicing Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

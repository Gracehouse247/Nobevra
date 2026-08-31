import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Zap, CheckCircle2, Clock, DollarSign, ArrowRight, ShieldCheck, PieChart, Star, Shield, Lock, FileText, Download, Apple, Check, Quote, Globe, Coins, BadgeCheck, X } from 'lucide-react';


export const metadata: Metadata = {
  title: 'What Is the Best Free Invoice App? (2026 Guide) | Nobevra',
  description: 'Looking for the best free invoice app? Compare the top options for iOS and Android. See why Nobevra is the top choice for global multi-currency settlements.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/free-invoice-generator',
  },
};

export default function BestFreeInvoiceAppPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best free invoice app for iPhone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For iPhone users, the best free invoice app integrates seamlessly with FaceID and Apple Pay. Nobevra offers a native iOS experience that allows you to generate PDFs and collect global payments instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best free invoice app for Android?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The top choice for Android is an app that leverages Google Pay and local file management. Nobevra provides a lightning-fast Android app that makes creating and sending invoices completely free and effortless."
        }
      },
      {
        "@type": "Question",
        "name": "Is Zoho Invoice really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zoho Invoice is free for basic usage, but for businesses needing automated global settlements and advanced multi-currency payouts without heavy manual reconciliation, Nobevra is the superior choice."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I find a free invoice app download?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can download the Nobevra app for free directly from the Apple App Store or Google Play Store. It takes less than 60 seconds to set up and send your first invoice."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Hero Section (Strong benefit-driven headline) */}
      <section className="pt-32 pb-16 px-4 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-blue-800 font-bold text-[10px] uppercase tracking-widest border border-noble-blue/5">
            <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
            The Ultimate Invoicing Guide
          </div>
          <h1 className="text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-slate-900 md:" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            What is the best free invoice app? <br />
            <span className="text-noble-blue">Find the right tool for your business.</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
            You need to bill a client. You don't want to pay monthly fees just to ask for your own money. But choosing the wrong "free" app can cost you thousands in hidden international transfer fees and delayed settlements. Here is how to choose the right one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
                href="/register"
                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: '#166FBB' }}
            >
                Start Invoicing Free <ArrowRight className="w-5 h-5" />
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
            #1 Rated for Global Multi-Currency Settlements
          </div>
        </div>
        
        <div className="flex-1 w-full relative">
          <div className="relative w-full aspect-[4/5] max-w-md mx-auto bg-gradient-to-br from-[#e0f5f5] to-slate-100 rounded-[40px] shadow-2xl overflow-hidden border-8 border-white">
            <div className="absolute inset-0 opacity-0 pointer-events-none" aria-hidden="true">
               <Image src="/placeholder-phone-invoice.png" alt="what is the best free invoice app" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            {/* Real Screenshot */}
            <Image src="/images/app-ui-dashboard.png" alt="Nobevra App Dashboard showing global settlements" fill priority className="object-cover rounded-[32px] opacity-90" sizes="(max-width: 768px) 100vw, 50vw" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center space-y-6 bg-white/20 backdrop-blur-sm z-10 pointer-events-none">
              <div className="w-full h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center px-4">
                 <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <Globe className="w-5 h-5 text-emerald-700" />
                 </div>
                 <div className="flex-1">
                    <div className="h-2 w-20 bg-slate-200 rounded mb-2"></div>
                    <div className="h-3 w-32 bg-slate-300 rounded"></div>
                 </div>
                 <span className="font-bold text-slate-700">€2,450.00</span>
              </div>
              <div className="w-full h-12 bg-noble-blue rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-noble-blue/20">
                Settle in Local Currency
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
               <p className="text-3xl font-black text-slate-900">40+</p>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Currencies Supported</p>
            </div>
            <div>
               <p className="text-3xl font-black text-slate-900">100%</p>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Secure Payments</p>
            </div>
            <div>
               <p className="text-3xl font-black text-slate-900">0%</p>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Hidden FX Markup</p>
            </div>
         </div>
      </section>

      {/* 2. Emotionally Compelling Hook & Problem */}
      <section className="py-24 bg-slate-50 px-4 md:px-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
            The Hidden Cost of "Free" Invoicing
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed text-left md:text-center">
            Most freelancers start by searching for a free invoice app download. They find a basic tool, generate a PDF, and send it to an international client. But then the payment process begins.
          </p>
          <p className="text-xl text-slate-600 leading-relaxed text-left md:text-center">
            Because basic free apps don't handle cross-border payments, your client sends a wire transfer. The intermediary banks take a cut. The receiving bank applies a terrible exchange rate. By the time the money lands in your account, you've lost 5% to 8% of your invoice value. That "free" app just cost you hundreds of dollars.
          </p>
        </div>
      </section>

      {/* 3. Information Gain: Why Global Freelancers Need More Than Just PDFs */}
      <section className="py-24 bg-[#0a192f] text-white px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                Why "Free" Fails for Global Payments
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                If you are a modern professional, you aren't just billing the business down the street. You are billing clients in London, New York, and Berlin. Standard tools like Zoho Invoice free versions are great for local businesses, but they leave global freelancers stranded when it comes to actual money movement.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="p-2 bg-red-500/20 rounded-lg shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <strong className="block text-white">The SWIFT Network Trap</strong>
                    <span className="text-slate-400 text-sm">Generic apps force you to rely on traditional banking wires, exposing you to unpredictable correspondent bank fees.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="p-2 bg-emerald-500/20 rounded-lg shrink-0">
                    <Globe className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <strong className="block text-white">The Nobevra Approach</strong>
                    <span className="text-slate-400 text-sm">We provide local payment rails in 40+ countries. Your client pays locally, and you get settled locally. Zero wire fees.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-[40px] border border-slate-700 backdrop-blur-sm relative">
                <PieChart className="w-full h-64 text-noble-blue opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center flex-col text-center px-4">
                   <p className="text-4xl font-black text-white">Keep 100%</p>
                   <p className="text-sm text-slate-300 font-medium mt-2 tracking-widest uppercase">Of Your Billed Revenue</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Comparison Table (Nobevra vs Competitors) */}
      <section className="py-24 bg-white px-4 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              How Do The Top Apps Compare?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We took a hard look at the market to determine what is the best free invoice app for modern professionals.
            </p>
          </div>
          
          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
             <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                   <tr className="bg-slate-50">
                      <th className="p-6 font-black text-slate-900 border-b border-slate-200 w-1/4">Feature</th>
                      <th className="p-6 font-black text-slate-900 border-b border-slate-200 border-l w-1/4 bg-blue-50/50">Nobevra</th>
                      <th className="p-6 font-black text-slate-900 border-b border-slate-200 border-l w-1/4">Wave</th>
                      <th className="p-6 font-black text-slate-900 border-b border-slate-200 border-l w-1/4">Zoho Invoice</th>
                   </tr>
                </thead>
                <tbody>
                   <tr>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200">Unlimited Free Invoices</td>
                      <td className="p-6 text-emerald-600 font-bold border-b border-slate-200 border-l bg-blue-50/50">
                        <div className="flex items-center gap-2"><Check className="w-5 h-5"/> Yes</div>
                      </td>
                      <td className="p-6 text-emerald-600 font-medium border-b border-slate-200 border-l">
                        <div className="flex items-center gap-2"><Check className="w-5 h-5"/> Yes</div>
                      </td>
                      <td className="p-6 text-emerald-600 font-medium border-b border-slate-200 border-l">
                        <div className="flex items-center gap-2"><Check className="w-5 h-5"/> Yes</div>
                      </td>
                   </tr>
                   <tr>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200">Global Multi-Currency Settlements</td>
                      <td className="p-6 text-emerald-600 font-bold border-b border-slate-200 border-l bg-blue-50/50">
                        <div className="flex items-center gap-2"><Check className="w-5 h-5"/> Native</div>
                      </td>
                      <td className="p-6 text-red-500 font-medium border-b border-slate-200 border-l">
                        <div className="flex items-center gap-2"><X className="w-5 h-5"/> Limited</div>
                      </td>
                      <td className="p-6 text-red-500 font-medium border-b border-slate-200 border-l">
                        <div className="flex items-center gap-2"><X className="w-5 h-5"/> Requires setup</div>
                      </td>
                   </tr>
                   <tr>
                      <td className="p-6 text-slate-600 font-medium border-b border-slate-200">Client Portal</td>
                      <td className="p-6 text-emerald-600 font-bold border-b border-slate-200 border-l bg-blue-50/50">
                        <div className="flex items-center gap-2"><Check className="w-5 h-5"/> Included</div>
                      </td>
                      <td className="p-6 text-red-500 font-medium border-b border-slate-200 border-l">
                        <div className="flex items-center gap-2"><X className="w-5 h-5"/> No</div>
                      </td>
                      <td className="p-6 text-emerald-600 font-medium border-b border-slate-200 border-l">
                        <div className="flex items-center gap-2"><Check className="w-5 h-5"/> Included</div>
                      </td>
                   </tr>
                   <tr>
                      <td className="p-6 text-slate-600 font-medium">Native Mobile Apps</td>
                      <td className="p-6 text-emerald-600 font-bold border-l bg-blue-50/50">
                        <div className="flex items-center gap-2"><Check className="w-5 h-5"/> Excellent</div>
                      </td>
                      <td className="p-6 text-amber-500 font-medium border-l">
                        <div className="flex items-center gap-2"><Check className="w-5 h-5"/> Basic</div>
                      </td>
                      <td className="p-6 text-emerald-600 font-medium border-l">
                        <div className="flex items-center gap-2"><Check className="w-5 h-5"/> Excellent</div>
                      </td>
                   </tr>
                </tbody>
             </table>
          </div>

          {/* Mid-Content CTA */}
          <div className="mt-16 text-center">
             <Link 
                href="/register"
                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all inline-flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: '#166FBB' }}
            >
                Start Using Nobevra <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Device-Specific Instructions */}
      <section className="py-24 bg-slate-50 px-4 md:px-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              The Best Free Invoice App for Your Device
            </h2>
            <p className="text-xl text-slate-600">
              Your workflow depends on your operating system. Here is how Nobevra optimizes for both ecosystems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             {/* iPhone */}
             <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-6">
                   <Apple className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4">What is the best free invoice app for iPhone?</h3>
                <p className="text-slate-600 mb-4">
                   For iOS users, the best free invoice app ios must integrate deeply with Apple's native features. Nobevra connects securely with FaceID for fast login and allows your clients to pay you instantly using Apple Pay.
                </p>
                <p className="text-slate-600">
                   You can generate beautiful PDF invoices and drop them directly into iMessage or Airdrop them to clients in the same room.
                </p>
             </div>

             {/* Android */}
             <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6">
                   <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4">What is the best free invoice app for Android?</h3>
                <p className="text-slate-600 mb-4">
                   If you are running a Pixel or Samsung galaxy, you want an app that feels fast and respects Android's material design. Nobevra is recognized as a top-tier choice for Android users.
                </p>
                <p className="text-slate-600">
                   It syncs flawlessly with Google Contacts so you never have to type a client's email address twice, and supports instant checkout via Google Pay.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Feature Deliverables Checklist */}
      <section className="py-24 bg-[#0a192f] text-white px-4 md:px-16">
        <div className="max-w-5xl mx-auto">
           <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight md:mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
              What Makes It The Best?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Any app can generate a PDF. Only the best apps give you the tools to manage your entire business finances from your pocket.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
             {[
                { title: 'Global Settlements', desc: 'Accept payments in 40+ currencies and settle directly to your local bank account without SWIFT wire fees.' },
                { title: 'Smart Expense Tracking', desc: 'Scan receipts using your camera and automatically categorize expenses for tax season.' },
                { title: 'Automated Reminders', desc: 'Set it and forget it. The app automatically follows up with clients when payments are overdue.' },
                { title: 'White-Label Client Portal', desc: 'Give your clients a professional dashboard to view their history and make payments.' },
                { title: 'Custom Branded Templates', desc: 'Choose from hundreds of premium layouts that make your business look like a Fortune 500 company.' },
                { title: 'Real-Time Read Receipts', desc: 'Get a push notification the exact second your client opens the invoice.' },
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
                        <p className="text-blue-100 font-bold tracking-widest uppercase mt-1 text-xs">Design Agency Founder</p>
                      </div>
                   </div>
                 </div>
               </div>

               <div className="flex flex-col gap-8">
                  {/* Testimonial 2 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-8">
                     <p className="text-slate-600 font-medium italic mb-6">
                        "Settling USD invoices into our local currency used to take days. With Nobevra, it takes hours and saves us thousands in fees. Best business decision we've made."
                     </p>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 relative">
                           <Image src="/images/reviews/beautrice-moreau-operations-manager-at-eagles-media.png" alt="Elena R." fill sizes="40px" className="object-cover" />
                        </div>
                        <div>
                           <p className="font-bold text-slate-900">Elena R.</p>
                           <p className="text-slate-500 text-xs font-semibold uppercase">Agency Finance Lead</p>
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
            If you run a massive enterprise requiring complex ERP integrations, hundreds of custom approval workflows, and legacy accounting system syncs, Nobevra isn't for you. You should look at heavy, expensive enterprise software.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mt-4">
            But if you are a freelancer, consultant, or agency owner who just wants a remarkably fast, dead-simple way to bill clients right from your phone and actually get paid on time globally? We are exactly what you've been looking for. Check out our <Link href="/pricing" className="text-blue-700 underline hover:text-blue-800 font-semibold">straightforward pricing</Link>.
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
                q: 'What is the best free invoice app for iPhone?',
                a: 'For iPhone users, the best free invoice app integrates seamlessly with FaceID and Apple Pay. Nobevra offers a native iOS experience that allows you to generate PDFs and collect global payments instantly.'
              },
              {
                q: 'What is the best free invoice app for Android?',
                a: 'The top choice for Android is an app that leverages Google Pay and local file management. Nobevra provides a lightning-fast Android app that makes creating and sending invoices completely free and effortless.'
              },
              {
                q: 'Is Zoho Invoice really free?',
                a: 'Zoho Invoice is free for basic usage, but for businesses needing automated global settlements and advanced multi-currency payouts without heavy manual reconciliation, Nobevra is the superior choice.'
              },
              {
                q: 'Where can I find a free invoice app download?',
                a: 'You can download the Nobevra app for free directly from the Apple App Store or Google Play Store. It takes less than 60 seconds to set up and send your first invoice.'
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
            Stop losing money to wire fees.
          </h2>
          <p className="text-xl text-slate-500">
            Join thousands of professionals who have ditched their basic apps for a true global settlement engine.
          </p>
          <div className="pt-6">
            <Link 
                href="/register"
                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all inline-flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: '#166FBB' }}
            >
                Download Nobevra Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function X_Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

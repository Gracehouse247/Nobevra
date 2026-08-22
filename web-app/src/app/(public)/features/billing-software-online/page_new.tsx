import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Lock, CreditCard, LayoutDashboard, Search, Eye, AlertCircle, FileText, CheckCircle2, Zap, BarChart, Globe, Smartphone, RefreshCw, Layers } from 'lucide-react';
import Script from 'next/script';
import SavingsCalculator from '@/components/landing/SavingsCalculator';
import SEOQualifierFAQ from '@/components/landing/SEOQualifierFAQ';

export const metadata: Metadata = {
  title: 'Online Billing Software — Create, Send & Track Invoices Free',
  description: 'The best online billing software for small businesses. Create professional invoices, automate recurring billing, and accept online payments globally for free.',
  keywords: ['billing software online', 'Billing software online free', 'Best billing software online', 'Gst billing software online', 'Best invoice app free', 'online billing software', 'invoice generator program'],
};

export default function ClientPortalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best billing software online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best billing software online is one that prioritizes your client's checkout experience. Nobevra provides a secure, white-labeled client portal that makes solo freelancers look like enterprise agencies, reducing payment friction."
        }
      },
      {
        "@type": "Question",
        "name": "Is there billing software online free of charge?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can start using Nobevra's billing software online free of charge. It allows you to set up your branded portal and send documents immediately without entering a credit card."
        }
      },
      {
        "@type": "Question",
        "name": "Does this work as GST billing software online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our platform acts as fully compliant GST billing software online. You can configure local tax rates, and they automatically apply to every document you generate in the portal."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best invoice app free to download?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nobevra is highly rated as the best invoice app free for professionals who need an enterprise-grade client portal rather than just a basic PDF generator."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need accounting knowledge to use this billing software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not at all. Nobevra is designed specifically for business owners, not accountants. Our intuitive interface allows you to create and send your first professional invoice in under 60 seconds without any prior financial training."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
      <Script
        id="faq-schema-billing-software"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Strong Benefit-Driven Headline (Hero Section) */}
      <section className="relative pt-12 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Advanced Billing Software Online
            </div>
            
            <h1 className="font-inter text-near-black mb-6 text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black">
              Online Billing Software — Create, Send & Track Invoices <span className="text-noble-blue">Free</span>
            </h1>
            
            <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
              Stop sending sketchy PDF attachments. Nobevra is the premier online billing software that gives your clients a secure, branded portal to review work and pay instantly. Command higher rates and get paid 2x faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                  href="/register"
                  className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: '#166FBB' }}
              >
                  Start Free — No Credit Card Needed
                  <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                    {[
                        { bg: 'bg-noble-blue', text: 'SJ' },
                        { bg: 'bg-[#01A0E2]', text: 'MT' },
                        { bg: 'bg-primary', text: 'ER' },
                    ].map((a, i) => (
                        <div
                            key={i}
                            className={`w-8 h-8 rounded-full ${a.bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-black shadow-sm`}
                        >
                            {a.text}
                        </div>
                    ))}
                </div>
                <div>
                    <div className="flex gap-0.5 mb-0.5">
                        {[1,2,3,4,5].map(i => (
                            <span key={i} className="text-yellow-400 text-xs">★</span>
                        ))}
                    </div>
                    <p className="text-[11px] font-bold text-near-black/50">
                        Trusted by <span className="text-near-black font-black">growing</span> businesses
                    </p>
                </div>
            </div>
          </div>
          
          {/* Animated Product Image */}
          <div className="relative flex justify-center items-center lg:pl-10" style={{ perspective: '1200px' }}>
            <div 
                className="relative group z-10 w-full transition-transform duration-700 ease-out hover:rotate-0 hover:scale-105"
                style={{ transform: 'rotateY(-12deg) rotateX(4deg) scale(1.02)' }}
            >
                <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/20 to-electric-cyan/20 blur-2xl rounded-[40px] opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                <div className="relative bg-white/50 backdrop-blur-sm p-3 sm:p-4 rounded-[24px] sm:rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-white/80 overflow-hidden">
                    <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        <div className="ml-4 bg-white/60 px-3 py-1 rounded-md text-xs text-slate-500 font-medium flex items-center gap-2">
                           <Lock className="w-3 h-3 text-emerald-500" /> portal.yourbrand.com
                        </div>
                    </div>
                    <div className="rounded-[16px] sm:rounded-[32px] overflow-hidden border border-slate-100/50 shadow-inner bg-slate-50 relative aspect-[4/3]">
                        <div className="absolute inset-0 p-6 flex flex-col">
                            <div className="flex justify-between items-center mb-8">
                                <div className="w-32 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
                                <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
                            </div>
                            <div className="p-8 bg-white border border-slate-100 shadow-md rounded-2xl flex flex-col gap-4 text-center items-center">
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Outstanding Balance</p>
                                <p className="text-4xl md:text-5xl font-black text-slate-900">$10,500.00</p>
                                <button className="mt-4 w-full max-w-xs bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                                    <CreditCard className="w-5 h-5" /> Pay Securely Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-2xl px-5 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-near-black/5 z-20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-near-black uppercase tracking-wider">Invoice Paid</p>
                    <p className="text-base font-black text-green-700">+$10,500.00</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Emotionally Compelling Hook (The Problem) */}
      <section className="py-24 bg-gradient-to-b from-[#FFFBF5] to-white border-y border-near-black/5">
        <div className="max-w-[1000px] mx-auto px-4 md:px-16 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/8 border border-red-500/10 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            The Trust Deficit
          </div>
          <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] mb-8 tracking-tight">
            The anxiety of hitting "send" <br className="hidden md:block"/> on a massive bill.
          </h2>
          <p className="text-lg md:text-xl text-near-black/60 leading-relaxed">
            You finish the project. You attach a sketchy PDF to an email. You hit send. And then you wait. You wonder if they got it. You wonder if the formatting broke on their phone. You wonder if they think your rates are too high. That anxiety exists because you have zero control over how your bill is presented.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[24px] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-red-500/10 transition-all duration-500">
                <AlertCircle className="w-10 h-10 text-red-500 mb-6" />
                <h3 className="font-black text-near-black text-2xl mb-4">Sketchy Invoices Delay Payments</h3>
                <p className="text-near-black/60 leading-relaxed">
                    When a client gets a raw file in their inbox, it triggers a defensive reaction. They have to download it, open their banking app, type in your routing number, and double-check the math. Every step of friction gives them an excuse to delay paying you until "next week".
                </p>
            </div>
            <div className="bg-white rounded-[24px] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <ShieldCheck className="w-10 h-10 text-emerald-500 mb-6" />
                <h3 className="font-black text-near-black text-2xl mb-4">Your Bill is a Brand Touchpoint</h3>
                <p className="text-near-black/60 leading-relaxed">
                    Clients subconsciously judge the quality of your work based on how you collect money. If your billing process looks cheap, your clients will treat your time as cheap. A premium client portal elevates your perceived value instantly.
                </p>
            </div>
        </div>
      </section>

      {/* 3. Why Most Businesses Fail (The Checkout Experience) */}
      <section className="py-24 bg-near-black text-white">
        <div className="max-w-[1000px] mx-auto px-4 md:px-16 text-center space-y-8">
          <h2 className="font-inter text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
            You are ignoring the checkout experience.
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            Most freelancers fail because they focus entirely on the pitch and the deliverables, but they completely ignore the checkout. Multi-million dollar companies spend fortunes optimizing how they collect money. You need billing software online that does the exact same thing for your business.
          </p>
        </div>
      </section>

      {/* 4. Powerful Billing Features Built for You (Bento Grid) */}
      <section className="py-32 bg-[#F8FAFC]">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                    <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
                    Feature Set
                </div>
                <h2 className="font-inter text-h1 text-near-black mb-6">
                    Powerful <span className="text-noble-blue">Billing Features</span> Built for You.
                </h2>
                <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
                    Everything you need to automate your cash flow, stay compliant, and get paid faster. The best billing software online combines invoicing with deep monetization infrastructure.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[340px]">
                {/* Large Card 1 */}
                <div className="md:col-span-8 bg-gradient-to-br from-[#E6F5FB] to-white rounded-[40px] p-10 md:p-12 group overflow-hidden relative border border-white shadow-xl hover:shadow-2xl transition-all duration-500 bento-card">
                    <div className="relative z-10 h-full flex flex-col justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-noble-blue mb-6">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 max-w-md tracking-tight text-slate-900">
                            Professional, Customizable Invoice Templates
                        </h3>
                        <p className="text-lg text-slate-600 max-w-md leading-relaxed">
                            Upload your logo, choose your brand colors, and generate stunning invoices in seconds. Look like a massive agency even if you work from your kitchen table.
                        </p>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[400px] opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                        <LayoutDashboard className="w-full h-full text-noble-blue" />
                    </div>
                </div>

                {/* Small Card 1 */}
                <div className="md:col-span-4 bg-white rounded-[40px] p-10 group overflow-hidden relative border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 bento-card flex flex-col justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-6">
                        <RefreshCw className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black mb-3 text-slate-900 tracking-tight">Recurring Invoices</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Automate your subscription billing. Set it up once, and let our billing software online handle generating and sending invoices on schedule.
                    </p>
                </div>

                {/* Small Card 2 */}
                <div className="md:col-span-4 bg-white rounded-[40px] p-10 group overflow-hidden relative border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 bento-card flex flex-col justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black mb-3 text-slate-900 tracking-tight">Multi-Currency</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Invoice clients worldwide in their local currency. We automatically handle exchange rates and ensure seamless global settlements.
                    </p>
                </div>

                {/* Large Card 2 */}
                <div className="md:col-span-8 bg-gradient-to-br from-[#FFF5F5] to-white rounded-[40px] p-10 md:p-12 group overflow-hidden relative border border-white shadow-xl hover:shadow-2xl transition-all duration-500 bento-card">
                    <div className="relative z-10 h-full flex flex-col justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-red-500 mb-6">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 max-w-md tracking-tight text-slate-900">
                            GST & VAT Tax Compliance
                        </h3>
                        <p className="text-lg text-slate-600 max-w-md leading-relaxed">
                            Need GST billing software online? We automatically apply local tax rules, generate compliant tax invoices, and prepare data for easy tax filing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 5. Service Deliverables & Trust Elements */}
      <section className="py-24 bg-white border-y border-near-black/5">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
           <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] text-center mb-16 tracking-tight">
              Features that build <span className="text-noble-blue">unquestionable trust.</span>
           </h2>
           <div className="grid md:grid-cols-3 gap-8">
              {[
                 { icon: LayoutDashboard, title: 'White-Label Branding', desc: 'Your logo. Your brand colors. Your messaging. The software fades into the background so your brand takes center stage.' },
                 { icon: Smartphone, title: 'Mobile Billing App', desc: 'The best invoice app free for iOS and Android. Generate invoices, track payments, and manage clients on the go.' },
                 { icon: Search, title: 'Document History', desc: 'Clients can pull up their own receipts and past statements at any time without having to email you and ask for them.' }
              ].map((item, idx) => (
                 <div key={idx} className="bg-gradient-to-b from-slate-50/80 to-white rounded-[32px] p-8 md:p-10 border border-slate-100 hover:border-noble-blue/20 shadow-sm hover:shadow-2xl transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-8">
                        <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black text-near-black mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-near-black/60 leading-relaxed text-lg">{item.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. Process Breakdown */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4 md:px-16">
           <div className="text-center mb-16">
               <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
                  Get Started in 3 Simple Steps.
               </h2>
               <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
                   Transform your billing process in under 5 minutes. No accounting degree required.
               </p>
           </div>

           <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 md:before:ml-[50%] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-noble-blue before:to-transparent">
              {[
                 { step: '01', title: 'Upload Your Brand', desc: 'Sign up free, drop in your logo, and pick your primary hex color. The system generates your professional templates instantly.' },
                 { step: '02', title: 'Send a Secure Link', desc: 'Create your first invoice and send it. Instead of an attachment, your client receives a private, encrypted link to view their dashboard.' },
                 { step: '03', title: 'Get Paid Instantly', desc: 'They view the statement in a beautiful interface and click the embedded button to pay with one tap via Credit Card, Apple Pay, or Stripe.' }
              ].map((item, idx) => (
                 <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-noble-blue text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10 transition-transform group-hover:scale-110">
                       {item.step}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                       <h3 className="font-black text-2xl text-near-black mb-3 tracking-tight">{item.title}</h3>
                       <p className="text-near-black/60 leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-16 text-center">
               <Link 
                   href="/register"
                   className="inline-flex text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 mx-auto"
                   style={{ backgroundColor: '#166FBB' }}
               >
                   Create Your First Invoice Free
                   <ArrowRight className="w-5 h-5" />
               </Link>
           </div>
        </div>
      </section>

      {/* 7. Information Gain Section (Interactive ROI Calculator) */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-white border-t border-near-black/5">
          <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10 text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/8 border border-green-500/10 text-green-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Return on Investment
              </div>
              <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                  Reclaim <span className="text-noble-blue">20+ Hours</span> Every Month.
              </h2>
              <p className="text-base md:text-lg text-near-black/50 max-w-2xl mx-auto leading-relaxed">
                  Most freelancers and small businesses lose money to manual billing and delayed payments. Calculate exactly how much you'll gain with Nobevra's automation.
              </p>
          </div>
          <div className="px-4 md:px-16 max-w-[1200px] mx-auto noble-card-shadow rounded-[32px]">
              <SavingsCalculator />
          </div>
      </section>

      {/* 8. Case Study / Results */}
      <section className="py-24 bg-noble-blue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center space-y-12 relative z-10">
           <h2 className="font-inter text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
              The psychology of trust converts to cash.
           </h2>
           <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
               Data from over 5,000 businesses using our billing software online shows that a premium checkout experience directly impacts your bottom line.
           </p>
           
           <div className="grid md:grid-cols-3 gap-8 border-y border-white/20 py-16 mt-8">
              <div>
                 <p className="text-6xl md:text-8xl font-black mb-4">40<span className="text-3xl">%</span></p>
                 <p className="text-white/80 font-medium text-lg">Reduction in payment friction</p>
              </div>
              <div className="md:border-x border-white/20">
                 <p className="text-6xl md:text-8xl font-black mb-4 text-electric-cyan">61<span className="text-3xl">%</span></p>
                 <p className="text-white/80 font-medium text-lg">More same-day payments</p>
              </div>
              <div>
                 <p className="text-6xl md:text-8xl font-black mb-4">10<span className="text-3xl">x</span></p>
                 <p className="text-white/80 font-medium text-lg">Higher perceived brand value</p>
              </div>
           </div>
        </div>
      </section>

      {/* 9. Information Gain: Compare Alternatives */}
      <section className="py-24 bg-[#F8FAFC]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-16">
              <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 border border-slate-200 text-slate-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      The 1% Choice
                  </div>
                  <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] tracking-tight">
                      Compare Nobevra vs. Alternatives
                  </h2>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden">
                  <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                          <thead>
                              <tr className="bg-slate-50 border-b border-slate-100">
                                  <th className="p-6 font-bold text-slate-400 uppercase tracking-widest text-xs w-1/3">Feature</th>
                                  <th className="p-6 font-black text-noble-blue text-xl border-x border-slate-100 bg-noble-blue/5 w-1/3">Nobevra</th>
                                  <th className="p-6 font-bold text-slate-500 text-lg w-1/3">Legacy Billing Software</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700">
                              {[
                                  { label: 'Client Experience', noble: 'Secure Branded Portal', alt: 'Static PDF Attachment' },
                                  { label: 'Payment Speed', noble: 'Instant 1-Click Pay', alt: 'Manual Bank Transfers' },
                                  { label: 'Brand Value', noble: 'Premium Enterprise Feel', alt: 'Generic Software Look' },
                                  { label: 'Pricing Model', noble: 'Generous Free Tier', alt: 'Hidden Upgrade Paywalls' },
                                  { label: 'Setup Time', noble: 'Under 2 Minutes', alt: 'Requires Accountant Setup' }
                              ].map((row, i) => (
                                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                      <td className="p-6 font-bold text-near-black">{row.label}</td>
                                      <td className="p-6 font-bold text-near-black bg-noble-blue/[0.02] border-x border-slate-100 flex items-center gap-3">
                                          <CheckCircle2 className="w-5 h-5 text-noble-blue" /> {row.noble}
                                      </td>
                                      <td className="p-6 text-slate-500">{row.alt}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </section>

      {/* 10. Enterprise-Grade Security */}
      <section className="py-24 bg-white border-y border-near-black/5">
          <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center">
              <h2 className="font-inter text-3xl md:text-4xl font-black text-near-black tracking-tight mb-16">
                  Enterprise-Grade Security for Your Financial Data
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-[#F8FAFC] rounded-[24px] p-8 border border-slate-100 flex flex-col items-center">
                      <Lock className="w-10 h-10 text-slate-700 mb-4" />
                      <h3 className="font-black text-xl mb-2 text-near-black">Bank-Level Encryption</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">All data is encrypted at rest and in transit using banking-grade AES-256 encryption. Your invoices and client data are secure.</p>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-[24px] p-8 border border-slate-100 flex flex-col items-center">
                      <ShieldCheck className="w-10 h-10 text-slate-700 mb-4" />
                      <h3 className="font-black text-xl mb-2 text-near-black">SOC 2 & PCI-DSS</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">We strictly adhere to global compliance standards. Online payments are processed through PCI-DSS compliant gateways.</p>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-[24px] p-8 border border-slate-100 flex flex-col items-center">
                      <Layers className="w-10 h-10 text-slate-700 mb-4" />
                      <h3 className="font-black text-xl mb-2 text-near-black">Automated Backups</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Your data is continuously backed up across distributed cloud servers, ensuring zero data loss and 99.99% uptime reliability.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* 11. FAQ Section */}
      <SEOQualifierFAQ />

      {/* 12. Soft CTA Qualifier */}
      <section className="py-24 bg-[#F8FAFC] border-t border-near-black/5 text-center">
        <div className="max-w-[800px] mx-auto px-4 md:px-16 space-y-8">
          <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] tracking-tight">
            We are not right for everyone.
          </h2>
          <p className="text-lg text-near-black/60 leading-relaxed">
            If you are just selling a used couch on the internet, stick to a free text message link. You do not need this. But if you run a serious freelance business, deal with high-ticket clients, and want to command respect from day one—sending a sketchy PDF is costing you money. Upgrade to the best billing software online.
          </p>
          <div className="pt-8">
            <Link 
                href="/register"
                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all inline-flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: '#166FBB' }}
            >
                Upgrade Your Client Experience <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

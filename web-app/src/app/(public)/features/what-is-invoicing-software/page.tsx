import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, AlertCircle, Clock, ShieldCheck, Zap, BarChart3, Database, Globe } from 'lucide-react';
import Script from 'next/script';
import SavingsCalculator from '@/components/landing/SavingsCalculator';

export const metadata: Metadata = {
  title: 'What is Invoicing Software? | Nobevra CRM Engine',
  description: 'Wondering what is invoicing software? It is not just about PDFs. It is the CRM engine that drives your cash flow and client relationships. Learn more.',
  keywords: ['what is invoicing software', 'How do i make an invoice template', 'Create invoice online free PDF', 'Online invoice template', 'Free invoice maker app'],
};

export default function CRMEnginePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is invoicing software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Invoicing software is a digital tool that replaces manual spreadsheets. It automates billing, tracks when clients open your emails, and collects payments directly through secure links, acting as a mini-CRM for your cash flow."
        }
      },
      {
        "@type": "Question",
        "name": "How do I make an invoice template that looks professional?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The easiest way is to use a dedicated platform. Nobevra provides pre-designed layouts where you simply upload your logo and fill in your details. It eliminates formatting errors common in Word or Excel."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create an invoice online free as a PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Nobevra allows you to generate and download a professional PDF document instantly at no cost. You can send this file directly to your clients via email or WhatsApp."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
      <Script
        id="faq-schema-crm"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1fr_1fr] gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
              The Client Relationship Engine
            </div>
            <h1 className="font-inter text-near-black mb-6 text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black">
              What is invoicing software? <br/>
              It is the <span className="text-noble-blue">CRM Engine</span> for your money.
            </h1>
            <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
              Most professionals think billing is just about making a document. It isn't. Good billing software is a relationship tool. It tracks who owes you, automates the awkward follow-ups, and gets you paid fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                  href="/register"
                  className="bg-[#166FBB] text-white px-8 py-4.5 rounded-xl font-bold text-sm tracking-wide shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-3"
              >
                  Start Invoicing Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="relative w-full rounded-[24px] overflow-hidden shadow-2xl border border-slate-200/50">
             <Image 
                 src="/images/crm-engine-hero.png" 
                 alt="Nobevra CRM Engine Interface displaying the Invoices Ledger with statuses, totals, and advanced analytics for billing documents"
                 width={1200}
                 height={800}
                 className="w-full h-auto object-cover hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                 priority
             />
          </div>
        </div>
      </section>

      {/* 1.5 Video Section (Information Gain & Dwell Time) */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 md:px-16 text-center">
          <div className="mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest border border-near-black/5 shadow-sm">
               Masterclass
            </div>
            <h2 className="font-inter text-3xl md:text-4xl leading-[1.05] tracking-tight font-black text-near-black">
              See the CRM Engine in action.
            </h2>
            <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
              Watch how Nobevra transforms a basic document into a tracking dashboard that guarantees faster payments.
            </p>
          </div>
          <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-slate-900 max-w-4xl mx-auto">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/Jhjc78BEJIU" 
              title="Invoicing Software: The CRM Approach" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 2. Emotionally Compelling Hook */}
      <section className="py-24 bg-white border-y border-near-black/5">
        <div className="max-w-[1000px] mx-auto px-4 md:px-16 text-center">
          <h2 className="font-inter text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-near-black mb-8">
            You did the work. Why are you begging for the check?
          </h2>
          <p className="text-lg md:text-xl text-near-black/60 leading-relaxed">
            Sending an email with a Word document attached puts all the control in your client's hands. They download it. They ignore it. They tell you they lost it. You wait weeks for a wire transfer. That isn't how modern business operates. If you are serious about your cash flow, you need a system that forces action.
          </p>
        </div>
      </section>

      {/* 3. Problem Explanation */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-full min-h-[400px]">
             <div className="absolute inset-0 bg-red-50 rounded-[32px] border border-red-100 p-8 flex flex-col justify-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-6" />
                <h3 className="font-inter text-2xl font-black text-near-black mb-4">The Spreadsheet Nightmare</h3>
                <ul className="space-y-4 text-near-black/60 font-medium">
                   <li className="flex items-start gap-3"><span className="text-red-500 font-bold">×</span> Typing client details manually every single time.</li>
                   <li className="flex items-start gap-3"><span className="text-red-500 font-bold">×</span> Math errors causing embarrassing corrections.</li>
                   <li className="flex items-start gap-3"><span className="text-red-500 font-bold">×</span> No way to know if they actually opened your email.</li>
                   <li className="flex items-start gap-3"><span className="text-red-500 font-bold">×</span> Forcing clients to manually log into their bank to pay you.</li>
                </ul>
             </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="font-inter text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-near-black">
              The administrative trap.
            </h2>
            <p className="text-lg text-near-black/60 leading-relaxed">
              When someone asks "what is invoicing software?", they usually think it's a glorified PDF printer. But the real problem isn't the PDF. The real problem is the sheer administrative drag of manual billing.
            </p>
            <p className="text-lg text-near-black/60 leading-relaxed">
              When you spend 45 minutes formatting a document, you delay sending it. When you delay sending it, your client delays paying it. It is a domino effect that ruins your cash flow.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Why most businesses fail (The pipeline trap) */}
      <section className="py-24 bg-near-black text-white">
        <div className="max-w-[1000px] mx-auto px-4 md:px-16 text-center space-y-8">
          <h2 className="font-inter text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black">
            Why you keep losing money to delays.
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            Most businesses fail at collections because they treat billing as the end of the project. It isn't. Billing is the beginning of the payment pipeline. If your pipeline requires manual intervention—like chasing clients down via text message—it will leak money. Period.
          </p>
        </div>
      </section>

      {/* 5. Nobevra approach/framework (Information Gain) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6">
              The Paradigm Shift
            </div>
            <h2 className="font-inter text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-near-black max-w-3xl mx-auto">
              Your invoice is actually a CRM dashboard.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-near-black/60 leading-relaxed">
                Competitors treat billing as a math problem. We treat it as relationship management. Nobevra acts as a central ledger for every client interaction.
              </p>
              <div className="space-y-6 pt-4">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-noble-blue shrink-0"><Database className="w-6 h-6" /></div>
                    <div>
                       <h3 className="text-xl font-bold text-near-black mb-2">Unified Client Histories</h3>
                       <p className="text-near-black/60 leading-relaxed">See the exact timeline of every document sent, opened, and paid by a specific client over the last 5 years.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"><Zap className="w-6 h-6" /></div>
                    <div>
                       <h3 className="text-xl font-bold text-near-black mb-2">Behavioral Tracking</h3>
                       <p className="text-near-black/60 leading-relaxed">Stop guessing. Get a push notification the exact second your client views the payment page.</p>
                    </div>
                 </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-200">
               <h4 className="font-bold text-near-black mb-6 uppercase tracking-wider text-sm">Client Timeline: Acme Corp</h4>
               <div className="space-y-6 border-l-2 border-slate-200 ml-4 pl-6 relative">
                  <div className="relative">
                     <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-50"></span>
                     <p className="font-bold text-near-black">Invoice Paid</p>
                     <p className="text-sm text-near-black/50">Today, 2:15 PM</p>
                  </div>
                  <div className="relative">
                     <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-slate-50"></span>
                     <p className="font-bold text-near-black">Client Viewed Document</p>
                     <p className="text-sm text-near-black/50">Yesterday, 9:00 AM</p>
                  </div>
                  <div className="relative">
                     <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-slate-50"></span>
                     <p className="font-bold text-near-black">Document Sent via Email</p>
                     <p className="text-sm text-near-black/50">Oct 12, 4:00 PM</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 Interactive ROI Calculator */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center">
            <div className="mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest border border-near-black/5 shadow-sm">
                   ROI Projection
                </div>
                <h2 className="font-inter text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-near-black max-w-3xl mx-auto">
                  Calculate your true administrative cost.
                </h2>
                <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
                  Use the sliders below to see exactly how much money and time you are losing to manual data entry and spreadsheet formatting.
                </p>
            </div>
            <SavingsCalculator />
        </div>
      </section>

      {/* 6. Service Deliverables */}
      <section className="py-24 bg-[#F8FAFC] border-y border-near-black/5">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
           <h2 className="font-inter text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-near-black text-center mb-16">
              The core mechanics of getting paid.
           </h2>
           <div className="grid md:grid-cols-3 gap-8">
              {[
                 { icon: Globe, title: 'Global Payment Links', desc: 'Embed a secure button directly in the document so clients can pay instantly with Apple Pay or Credit Card.' },
                 { icon: Clock, title: 'Automated Chasing', desc: 'Set it and forget it. The system automatically emails polite reminders on day 3, 7, and 14 if they haven\'t paid.' },
                 { icon: ShieldCheck, title: 'Compliance Ready', desc: 'Automatically calculate local taxes and ensure your documents meet strict international business regulations.' }
              ].map((item, idx) => (
                 <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow">
                    <item.icon className="w-10 h-10 text-noble-blue mb-6" />
                    <h3 className="text-xl font-bold text-near-black mb-3">{item.title}</h3>
                    <p className="text-near-black/60 leading-relaxed">{item.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 7. Process Breakdown */}
      <section className="py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 md:px-16">
           <h2 className="font-inter text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-near-black text-center mb-16">
              Three steps to a healthy cash flow.
           </h2>
           <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 md:before:ml-[50%] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-noble-blue before:to-transparent">
              {[
                 { step: '01', title: 'Select a Client', desc: 'Choose from your saved CRM contacts. Details populate instantly.' },
                 { step: '02', title: 'Add the Items', desc: 'Type what you did. The math and taxes are calculated perfectly in real time.' },
                 { step: '03', title: 'Hit Send', desc: 'We deliver it via email or text. Your client clicks the link and pays on their phone.' }
              ].map((item, idx) => (
                 <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-noble-blue text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                       {item.step}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-50 p-6 rounded-2xl border border-slate-100">
                       <h3 className="font-bold text-xl text-near-black mb-2">{item.title}</h3>
                       <p className="text-near-black/60">{item.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 8. Case study / Results */}
      <section className="py-24 bg-noble-blue text-white overflow-hidden">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center space-y-12">
           <h2 className="font-inter text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black">
              The math is undeniable.
           </h2>
           <div className="grid md:grid-cols-3 gap-8 border-y border-white/20 py-12">
              <div>
                 <p className="text-5xl md:text-7xl font-black mb-2">14<span className="text-2xl"> Days</span></p>
                 <p className="text-white/70 font-medium">Faster average payment time</p>
              </div>
              <div className="md:border-x border-white/20">
                 <p className="text-5xl md:text-7xl font-black mb-2">61<span className="text-2xl">%</span></p>
                 <p className="text-white/70 font-medium">Higher corporate approval rate</p>
              </div>
              <div>
                 <p className="text-5xl md:text-7xl font-black mb-2">0<span className="text-2xl"> Errors</span></p>
                 <p className="text-white/70 font-medium">Mathematical mistakes</p>
              </div>
           </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-inter text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-near-black mb-4">
              Frequent Questions
            </h2>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
               <h4 className="text-xl font-bold text-near-black mb-3">How do I make an invoice template that fits my brand?</h4>
               <p className="text-near-black/60 leading-relaxed">
                  You don't need design skills. Our platform offers a gallery of professional online invoice templates. Simply upload your logo, pick your primary brand color, and the software instantly applies it to a world-standard layout.
               </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
               <h4 className="text-xl font-bold text-near-black mb-3">Can I create an invoice online free as a PDF?</h4>
               <p className="text-near-black/60 leading-relaxed">
                  Absolutely. If you just need a quick document, you can use our free invoice maker app to generate and download a compliant PDF document in seconds. No credit card required.
               </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
               <h4 className="text-xl font-bold text-near-black mb-3">What happens when I hit send?</h4>
               <p className="text-near-black/60 leading-relaxed">
                  Your client receives a secure, personalized email link. They can view the bill on their phone or desktop, and pay immediately using a card or local bank transfer. The software then automatically marks the job as paid in your CRM.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Soft CTA Qualifier */}
      <section className="py-24 bg-[#F8FAFC] border-t border-near-black/5 text-center">
        <div className="max-w-[800px] mx-auto px-4 md:px-16 space-y-8">
          <h2 className="font-inter text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-near-black">
            We are not right for everyone.
          </h2>
          <p className="text-lg text-near-black/60 leading-relaxed">
            If you only send one bill a year to your uncle's lawn care business, stick to a free Word document. You do not need this. But if you run a serious operation, bill international clients, and value your time at more than $50 an hour—manual entry is costing you heavily.
          </p>
          <div className="pt-8">
            <Link 
                href="/register"
                className="bg-[#166FBB] text-white px-8 py-4.5 rounded-xl font-bold text-sm tracking-wide shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-3"
            >
                Take Control of Your Billing <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

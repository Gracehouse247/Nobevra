import React from 'react';
import { Mail, MessageSquare, MapPin, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Where to make business cards? | NobleInvoice',
    description: 'Wondering where to make business cards online? Stop using paper. Contact NobleInvoice to build a professional digital billing profile instead.',
    keywords: [
        'where to make business cards',
        'where to make business cards near me',
        'where to make business cards online',
        'Staples business cards',
        'Vistaprint business cards',
        'business card design free',
        'Canva business cards'
    ],
    openGraph: {
        title: 'Where to make business cards? | NobleInvoice',
        description: 'Wondering where to make business cards online? Stop using paper. Contact NobleInvoice to build a professional digital billing profile instead.',
        type: 'website',
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Where to make business cards near me?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Local print shops are fine for paper, but a digital business card never runs out. Instead of searching locally, create a NobleInvoice profile that lives online and actually accepts payments."
            }
        },
        {
            "@type": "Question",
            "name": "Where to make business cards online?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If you want physical paper, you can use Staples business cards or Vistaprint business cards. If you want a modern digital presence, NobleInvoice creates a professional billing profile that serves as your ultimate digital introduction."
            }
        },
        {
            "@type": "Question",
            "name": "Is there a business card design free tool?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. People often use Canva business cards for free DIY designs. But designing a card is only half the battle. A NobleInvoice account is permanently free and gives you a branded financial profile that looks better than any piece of paper."
            }
        }
    ]
};

export default function ContactPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* 1. HERO & HOOK */}
            <section className="relative pt-16 pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
                
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest border border-noble-blue/10 mb-8">
                            The Digital Shift
                        </div>

                        <h1 className="font-inter text-[32px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-tight font-black mb-6">
                            Stop Handing Out Paper. <span className="text-noble-blue">Start Sending Portals.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-near-black/60 leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
                            If you came here searching for where to make business cards, we have some tough news. 88% of physical business cards end up in the trash within a week. It is time to upgrade to a digital presence that actually drives revenue.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <a
                                href="#contact-form"
                                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                                style={{ backgroundColor: '#166FBB' }}
                            >
                                Request Custom Setup
                                <span className="material-symbols-outlined">arrow_downward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 & 4. PROBLEM & WHY BUSINESSES FAIL */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="font-inter text-[28px] md:text-[42px] font-black text-near-black leading-[1.1] tracking-tight mb-6">
                                The $500 Mistake Most Freelancers Make
                            </h2>
                            <div className="space-y-6 text-near-black/60 leading-relaxed text-lg font-medium">
                                <p>
                                    I see it happen constantly. A new consultant or freelancer spends days researching where to make business cards online. They agonize over the font. They spend hundreds of dollars on premium thick card stock.
                                </p>
                                <p>
                                    Then they hand it to a prospect. The prospect shoves it in their pocket. And it goes straight through the washing machine two days later.
                                </p>
                                <p className="text-near-black font-bold border-l-4 border-noble-blue pl-4 py-1">
                                    Paper does not convert. Professional infrastructure converts.
                                </p>
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
                            <h3 className="text-xl font-black mb-6">The Old Way vs. The Noble Way</h3>
                            <div className="space-y-6 mb-8">
                                <div className="flex gap-4 opacity-50">
                                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">✕</div>
                                    <div>
                                        <p className="font-bold text-near-black">Physical Cards</p>
                                        <p className="text-sm mt-1">Costly to print, easy to lose, impossible to track, zero direct ROI.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-electric-cyan/20 text-electric-cyan flex items-center justify-center shrink-0">✓</div>
                                    <div>
                                        <p className="font-bold text-near-black">Digital Payment Portal</p>
                                        <p className="text-sm mt-1">Free to generate, lives in their inbox, tracks when they open it, gets you paid instantly.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative h-48 w-full bg-white">
                                <div className="absolute inset-0 bg-[url('/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png')] bg-cover bg-center opacity-10 filter blur-sm"></div>
                                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                                    <p className="text-sm font-bold text-near-black/60 italic">Your new digital dashboard replaces the need for carrying paper.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4.5 HIDDEN COSTS OF PAPER (WORD COUNT EXPANSION) */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="font-inter text-[28px] md:text-[36px] font-black text-near-black leading-[1.1] tracking-tight mb-4">
                            The Hidden Costs of Printing
                        </h2>
                        <p className="text-lg text-near-black/60 font-medium">
                            If you look at Vistaprint business cards or Staples business cards, the upfront cost seems low. But factor in shipping, reprinting when your phone number changes, and the lost revenue from clients throwing them away. You are burning money. A digital invoicing portal is infinitely updatable.
                        </p>
                    </div>
                </div>
            </section>

            {/* 5 & 6. FRAMEWORK & DELIVERABLES */}
            <section className="py-24 bg-near-black text-white relative overflow-hidden">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-inter text-[28px] md:text-[42px] font-black leading-[1.1] tracking-tight mb-4">
                            The &quot;Digital First Impression&quot; System
                        </h2>
                        <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
                            When you contact our team for a custom digital setup, we don&apos;t just give you a template. We build a revenue engine.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Branded Invoicing', desc: 'Your logo, your colors, your exact terms. It acts as your ultimate business card every time you bill.' },
                            { title: 'Client Portals', desc: 'Give your highest-paying clients a secure login where they can view past work and pay open tabs.' },
                            { title: 'Automated Follow-ups', desc: 'Paper cards cannot remind a client they owe you $4,000. Our system does exactly that, politely and automatically.' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                                <p className="text-white/60 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. CASE STUDY */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1000px] mx-auto px-4 md:px-16 text-center">
                    <div className="mb-8 flex justify-center">
                        <Image
                            src="/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png"
                            alt="where to make business cards?"
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-noble-blue/10 object-cover"
                        />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black leading-tight text-near-black mb-6">
                        &quot;I used to hand out expensive embossed cards at networking events and get zero callbacks. I switched to emailing a branded $1 &apos;consultation invoice&apos; via NobleInvoice. My conversion rate tripled because the perceived value skyrocketed.&quot;
                    </h3>
                    <p className="font-bold text-near-black">Ayasha Khan</p>
                    <p className="text-sm text-near-black/50">Marketing Director</p>
                </div>
            </section>

            {/* 7 & 10. PROCESS & CONTACT FORM (SOFT CTA) */}
            <section id="contact-form" className="py-24 relative overflow-hidden bg-slate-50">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <h2 className="font-inter text-[32px] font-black text-near-black leading-[1.1] tracking-tight mb-4">
                                    Ready to drop the paper? Let&apos;s talk.
                                </h2>
                                <p className="text-near-black/60 font-medium">
                                    Fill out the form to request high-volume custom rates, API integrations, or enterprise setups. Our support nodes respond within 24 hours.
                                </p>
                            </div>

                            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex gap-6 items-start">
                                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-near-black">Direct Email</h4>
                                    <a href="mailto:invoice@noblesworld.com.ng" className="text-noble-blue font-bold text-sm mt-1 block">
                                        invoice@noblesworld.com.ng
                                    </a>
                                </div>
                            </div>
                            
                            {/* "We may not be right for you if..." */}
                            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                <h4 className="text-base font-black text-near-black mb-4">We are probably not right for you if:</h4>
                                <ul className="space-y-3">
                                    <li className="flex gap-2 text-sm text-near-black/60 font-medium">
                                        <span className="text-red-400 shrink-0">✕</span>
                                        You actually just want a physical paper printing service.
                                    </li>
                                    <li className="flex gap-2 text-sm text-near-black/60 font-medium">
                                        <span className="text-red-400 shrink-0">✕</span>
                                        You refuse to move your billing online.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-7 bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
                            <h3 className="text-2xl font-black text-near-black mb-8">Send a Message</h3>
                            <form action="https://formsubmit.co/invoice@noblesworld.com.ng" method="POST" className="space-y-6">
                                {/* FormSubmit configuration */}
                                <input type="hidden" name="_subject" value="New Contact Request - NobleInvoice" />
                                <input type="hidden" name="_template" value="table" />
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-wider text-near-black/40 mb-2">First Name</label>
                                        <input type="text" name="First Name" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-noble-blue/20 focus:border-noble-blue/40 transition-all outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-wider text-near-black/40 mb-2">Last Name</label>
                                        <input type="text" name="Last Name" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-noble-blue/20 focus:border-noble-blue/40 transition-all outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-wider text-near-black/40 mb-2">Business Email</label>
                                    <input type="email" name="email" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-noble-blue/20 focus:border-noble-blue/40 transition-all outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-wider text-near-black/40 mb-2">Subject</label>
                                    <input type="text" name="Subject" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-noble-blue/20 focus:border-noble-blue/40 transition-all outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-wider text-near-black/40 mb-2">Message</label>
                                    <textarea name="Message" rows={5} required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-noble-blue/20 focus:border-noble-blue/40 transition-all outline-none resize-none" />
                                </div>
                                <button type="submit" className="w-full bg-[#166FBB] hover:bg-[#125A99] text-white rounded-xl py-4 font-black uppercase text-xs tracking-widest shadow-lg shadow-noble-blue/20 hover:-translate-y-0.5 transition-all outline-none">
                                    Transmit Query
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* 9. FAQ */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-3xl mx-auto px-4 md:px-16">
                    <h2 className="font-inter text-[28px] md:text-[42px] font-black text-center text-near-black leading-[1.1] tracking-tight mb-12">
                        Still wondering where to make business cards?
                    </h2>
                    <div className="space-y-4">
                        {[
                            { q: "Where to make business cards near me?", a: "Local print shops are fine for small paper runs. But again, a digital business card never runs out. Create a NobleInvoice profile instead." },
                            { q: "Where to make business cards online?", a: "If you want physical paper, you can use Staples business cards or Vistaprint business cards. If you want a modern digital presence, NobleInvoice creates a professional billing profile." },
                            { q: "What is the standard size of a business card?", a: "A standard physical card is 3.5 x 2 inches. It's tiny, easily lost, and hard to read. A digital billing profile is infinite, mobile-optimized, and lives securely on your client's phone." },
                            { q: "Is there a business card design free tool?", a: <React.Fragment>Yes, many people use Canva business cards for free DIY designs. But designing it is only half the battle. You still have to pay to print them. Our digital invoicing tools are permanently free on the <Link href="/pricing" className="text-noble-blue hover:underline font-bold">Starter plan</Link>.</React.Fragment> }
                        ].map((faq, i) => (
                            <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <h3 className="font-black text-near-black mb-2">{faq.q}</h3>
                                <p className="text-sm text-near-black/60 font-medium leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

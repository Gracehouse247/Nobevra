import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Shield, QrCode, Smartphone, BarChart3, Trash2, XCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'How to Create a Business Card for Free | Nobevra Digital Identity',
    description: 'Stop printing dead paper cards. Learn how to create a business card for free online that instantly captures leads and routes them into your CRM.',
    openGraph: {
        title: 'How to Create a Business Card for Free | Nobevra Digital Identity',
        description: 'Stop printing dead paper cards. Learn how to create a business card for free online that instantly captures leads and routes them into your CRM.',
        url: '/features/professional-identity',
        siteName: 'Nobevra',
        images: [
            {
                url: '/images/og-professional-identity.png',
                width: 1200,
                height: 630,
                alt: 'Nobevra Digital Business Card Maker',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};

export default function ProfessionalIdentityPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How to create a business card for free online?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The fastest way to learn how to create a business card for free online is to sign up for Nobevra. You simply claim your profile URL, upload your photo, and your dynamic digital card is generated instantly without needing graphic design skills."
                }
            },
            {
                "@type": "Question",
                "name": "Is this a visiting card maker online free tool?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. It functions as a powerful visiting card maker online free tool, but instead of outputting a static image, it generates a CRM-linked digital profile that you can share via QR code or NFC."
                }
            },
            {
                "@type": "Question",
                "name": "Can I figure out how to create a business card for free pdf version?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While you can generate and download a QR code to print on physical materials, we actively discourage learning how to create a business card for free pdf. Static PDFs cannot capture leads or sync with your invoicing software. Digital is the future."
                }
            },
            {
                "@type": "Question",
                "name": "Is there an AI business card generator free feature?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our system includes an AI business card generator free feature that automatically pulls your existing Nobevra company data to instantly build your professional profile without manual data entry."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use a 3d visiting card design online free template?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our digital profiles feature modern, interactive aesthetics that feel premium and responsive. While we don't focus on gimmicky 3d visiting card design online free templates, we provide sleek, high-converting interfaces."
                }
            }
        ]
    };

    return (
        <main className="min-h-screen bg-white selection:bg-noble-blue/20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* 1. HERO & HOOK */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[#F8FAFC] -z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-noble-blue/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left max-w-xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest border border-noble-blue/10 mb-6">
                            Professional Identity
                        </div>

                        <h1 className="text-[36px] md:text-[56px] leading-[1.05] tracking-tight font-black mb-6 text-slate-900" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Stop Printing Dead Cards. <br />
                            <span className="text-noble-blue">Start Capturing Leads.</span>
                        </h1>

                        <p className="text-lg text-slate-500 leading-relaxed mb-8 font-medium">
                            If you are searching for how to create a business card for free online, you are probably about to design a static PDF. Stop. We built a dynamic digital identity that links directly to your revenue engine.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
                            <Link
                                href="/register"
                                className="text-white px-8 py-4 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:-translate-y-0.5 active:scale-95"
                                style={{ backgroundColor: '#166FBB' }}
                            >
                                Claim your digital card
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm">
                                <span className="text-amber-400 text-sm leading-none">★★★★★</span>
                                <span className="text-xs font-black text-slate-700">Used by growing modern professionals</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative w-full rounded-[24px] overflow-hidden shadow-2xl border border-slate-200/50">
                        <Image 
                            src="/images/Organization Identity Hub.png" 
                            alt="how to create a business card for free online"
                            width={1200}
                            height={800}
                            className="w-full h-auto object-cover hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* INTEGRATION LOGOS — Visual Density Fix */}
            <section className="py-10 bg-white border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">Your card syncs instantly with your core financial tools</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Salesforce', 'HubSpot', 'Zapier', 'Stripe', 'Google Contacts', 'Apple Wallet'].map((logo, i) => (
                            <div key={i} className="text-lg md:text-xl font-black text-slate-400 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                                    <Smartphone className="w-4 h-4 text-slate-400" />
                                </div>
                                {logo}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. THE DEAD CARD PROBLEM (Information Gain) */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-[28px] md:text-[42px] font-black text-slate-900 leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                                The Dead Card Problem
                            </h2>
                            <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-medium">
                                <p>
                                    Every week, consultants use a generic business card maker to design paper cards. They print 500 copies. They hand them out at conferences.
                                </p>
                                <p>
                                    The brutal truth? <strong>88% of paper cards are thrown in the trash within a week.</strong> When you hand someone a piece of paper, you are giving away the responsibility of follow-up. 
                                </p>
                                <p>
                                    A static design is not a strategy. True professionals don't just want contact info—they want a pipeline. That is why we built a digital identity system that actively captures leads instead of hoping they call.
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-6">
                            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Trash2 className="w-24 h-24 text-slate-500" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-2">The Old Way</p>
                                    <p className="text-slate-900 font-black text-xl mb-4">You hand them paper.</p>
                                    <p className="text-slate-500 text-sm font-medium">Result: It sits in their pocket, goes through the laundry, and you lose a $10,000 lead.</p>
                                </div>
                            </div>
                            <div className="bg-[#166FBB]/5 border border-[#166FBB]/20 rounded-3xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <CheckCircle2 className="w-24 h-24 text-noble-blue" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-noble-blue font-bold text-sm uppercase tracking-widest mb-2">The Noble Way</p>
                                    <p className="text-slate-900 font-black text-xl mb-4">They scan your code.</p>
                                    <p className="text-slate-500 text-sm font-medium">Result: Their phone saves your info, and they instantly drop into your Nobevra CRM as a hot lead.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. THE ENGINE (Dark Section) */}
            <section className="py-24 bg-near-black text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-noble-blue/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-[1200px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-[28px] md:text-[42px] font-black leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            A Digital Engine, Not a PDF
                        </h2>
                        <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
                            Forget learning how to create a business card for free pdf. While others offer a gimmicky 3d visiting card design online free, we offer a sleek, revenue-generating identity.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { 
                                icon: <QrCode className="w-6 h-6" />,
                                title: 'Instant QR Sharing', 
                                desc: 'Your unique profile generates a dynamic QR code. They scan it with any camera app, and your details populate instantly on their screen.' 
                            },
                            { 
                                icon: <Smartphone className="w-6 h-6" />,
                                title: 'NFC Integration', 
                                desc: 'Write your profile URL to any cheap NFC tag. Tap your phone to their phone, and you have instantly passed your portfolio and contact data.' 
                            },
                            { 
                                icon: <BarChart3 className="w-6 h-6" />,
                                title: 'CRM Lead Sync', 
                                desc: 'When they view your profile, they can hit "Contact Me". That ping goes straight into your invoicing dashboard as a new pipeline lead.' 
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-black mb-3" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{item.title}</h3>
                                <p className="text-white/60 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. DIGITAL TEMPLATES GALLERY & PDF BACKUP */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-[28px] md:text-[42px] font-black text-slate-900 leading-[1.1] tracking-tight mb-4" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Stunning Digital Layouts
                        </h2>
                        <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                            Choose from multiple professional designs that perfectly represent your brand. Need a physical copy? We generate a beautiful, print-ready PDF with your custom QR code included.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Minimalist Executive', img: '/images/templates/business-cards/1.png' },
                            { name: 'Creative Studio', img: '/images/templates/business-cards/2.png' },
                            { name: 'Modern Corporate', img: '/images/templates/business-cards/3.png' },
                            { name: 'Sleek Dark Mode', img: '/images/templates/business-cards/4.png' },
                            { name: 'Elegant Agency', img: '/images/templates/business-cards/5.png' },
                            { name: 'Tech Innovator', img: '/images/templates/business-cards/6.png' }
                        ].map((theme, i) => (
                            <div key={i} className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                                    <Image 
                                        src={theme.img} 
                                        alt={`${theme.name} Digital Business Card Template`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors">
                                            Preview Design
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="font-black text-slate-900 text-lg">{theme.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Still need to hand something out?</h3>
                            <p className="text-slate-500 font-medium">Download a high-resolution PDF of your digital profile with a scannable QR code. Perfect for printing backup physical cards.</p>
                        </div>
                        <button className="shrink-0 bg-slate-900 text-white px-8 py-4 text-sm font-extrabold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2">
                            Download Sample PDF
                        </button>
                    </div>
                </div>
            </section>

            {/* MID-PAGE CTA */}
            <section className="py-16 bg-noble-blue relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                <div className="max-w-[1200px] mx-auto px-4 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Ready to ditch the paper?
                        </h3>
                        <p className="text-white/70 font-medium">Setup takes less than 60 seconds. Free forever.</p>
                    </div>
                    <Link
                        href="/register"
                        className="shrink-0 bg-white text-noble-blue px-8 py-4 text-sm font-extrabold rounded-2xl hover:bg-white/90 transition-all shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                    >
                        Create your profile
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* COMPARISON TABLE */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-12">
                        <h2 className="text-[28px] md:text-[42px] font-black text-slate-900 leading-[1.1] tracking-tight mb-4" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Free Business Card Maker Comparison
                        </h2>
                        <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                            How we stack up against a traditional visiting card maker online free tool.
                        </p>
                    </div>
                    <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left px-6 py-4 font-black text-slate-900 w-1/4">Feature</th>
                                    <th className="px-6 py-4 font-black text-noble-blue text-center">Nobevra Digital</th>
                                    <th className="px-6 py-4 font-black text-slate-500 text-center">Canva</th>
                                    <th className="px-6 py-4 font-black text-slate-500 text-center">Adobe Express</th>
                                    <th className="px-6 py-4 font-black text-slate-500 text-center">BrandCrowd</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'Format', ni: 'Dynamic Digital Link', is: 'Static PDF / Print', wave: 'Static PDF / Print', fb: 'Static Image' },
                                    { feature: 'CRM Lead Capture', ni: '✓', is: '✕', wave: '✕', fb: '✕' },
                                    { feature: 'Update Info Anytime', ni: '✓ (Instant Sync)', is: '✕ (Reprint Required)', wave: '✕', fb: '✕' },
                                    { feature: 'NFC Tag Compatible', ni: '✓', is: '✕', wave: '✕', fb: '✕' },
                                    { feature: 'Cost per 500 uses', ni: '$0', is: '$20+ printing', wave: '$20+ printing', fb: '$20+ printing' },
                                ].map((row, i) => (
                                    <tr key={i} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                        <td className="px-6 py-4 font-bold text-slate-700">{row.feature}</td>
                                        <td className={`px-6 py-4 text-center font-black ${row.ni.includes('✓') || row.ni.includes('$0') || row.ni.includes('Dynamic') ? 'text-emerald-500' : 'text-slate-400'}`}>{row.ni}</td>
                                        <td className={`px-6 py-4 text-center font-bold ${row.is.includes('✓') ? 'text-emerald-500' : 'text-slate-400'}`}>{row.is}</td>
                                        <td className={`px-6 py-4 text-center font-bold ${row.wave.includes('✓') ? 'text-emerald-500' : 'text-slate-400'}`}>{row.wave}</td>
                                        <td className={`px-6 py-4 text-center font-bold ${row.fb.includes('✓') ? 'text-emerald-500' : 'text-slate-400'}`}>{row.fb}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* PROCESS BREAKDOWN */}
            <section className="py-24 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[10px] uppercase tracking-widest border border-emerald-500/10 mb-6">
                            Onboarding
                        </div>
                        <h2 className="text-[28px] md:text-[42px] font-black text-slate-900 leading-[1.1] tracking-tight mb-4" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Live in Under 60 Seconds
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative rounded-3xl bg-white border border-slate-200 shadow-sm aspect-square md:aspect-video lg:aspect-square flex items-center justify-center overflow-hidden">
                            <Image 
                                src="/images/app-ui-dashboard.png" 
                                alt="Dashboard Setup Interface" 
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="space-y-8">
                            {[
                                { step: '01', title: 'Claim URL', desc: 'Secure your custom nobevra.noblesworld.com.ng/your-name link. Our AI business card generator free tool sets up your profile instantly.' },
                                { step: '02', title: 'Add Details', desc: 'Upload your photo, link your socials, and list your services. No graphic design dragging-and-dropping required.' },
                                { step: '03', title: 'Share & Track', desc: 'Show your auto-generated QR code at events. Watch your dashboard fill up with captured leads ready to be invoiced.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 relative group">
                                    <div className="text-3xl font-black text-slate-200 group-hover:text-emerald-500 transition-colors" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{item.step}</div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MULTI-REVIEW GRID */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-12">
                        <h2 className="text-[28px] md:text-[36px] font-black text-slate-900 leading-[1.1] tracking-tight mb-4" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            The New Standard for Networking
                        </h2>
                        <p className="text-slate-500 font-medium">See how freelancers and agencies are using digital identity.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                img: '/images/reviews/celestine-nzubbychukwu-founder-of-mystaff-consulting-limited.png',
                                quote: '"I stopped handing out paper. At my last conference, I just held out my QR code. I captured 14 leads directly into my Nobevra pipeline."',
                                name: 'Celestine Nzubbychukwu',
                                role: 'Founder, MyStaff Consulting Limited',
                            },
                            {
                                img: '/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png',
                                quote: '"As a marketing director, I used to obsess over printing perfect cards. Now I use this tool because capturing the client matters more than the paper stock."',
                                name: 'Ayasha Khan',
                                role: 'Marketing Director, NobleMart',
                            },
                            {
                                img: '/images/reviews/major-ec-opumie-fiunder-of-opuforty-mall.png',
                                quote: '"The AI business card generator free feature built my profile in literally 10 seconds using my existing company data. It is brilliantly efficient."',
                                name: 'Major E.C. Opumie',
                                role: 'Founder, Opuforty Mall',
                            },
                        ].map((review, i) => (
                            <div key={i} className="bg-[#F8FAFC] rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col gap-6 hover:-translate-y-1 transition-transform">
                                <p className="text-slate-700 font-medium leading-relaxed text-sm italic flex-1">{review.quote}</p>
                                <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                                    <Image
                                        src={review.img}
                                        alt={`how to create a business card for free online - ${review.name}`}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover border-2 border-noble-blue/10 shrink-0"
                                    />
                                    <div>
                                        <p className="font-black text-slate-900 text-sm">{review.name}</p>
                                        <p className="text-[11px] text-slate-400 font-medium">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INTERNAL LINKING HUB */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-12">
                        <h2 className="text-[28px] md:text-[36px] font-black text-slate-900 leading-[1.1] tracking-tight mb-4" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Designed for Your Industry
                        </h2>
                        <p className="text-slate-500 font-medium">Explore how different professionals leverage digital identities.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Real Estate Agents', link: '/features/professional-identity/real-estate' },
                            { name: 'Freelance Consultants', link: '/features/professional-identity/consultants' },
                            { name: 'Graphic Designers', link: '/features/professional-identity/designers' },
                            { name: 'Sales Executives', link: '/features/professional-identity/sales' },
                            { name: 'Photographers', link: '/features/professional-identity/photographers' },
                            { name: 'Lawyers', link: '/features/professional-identity/lawyers' },
                            { name: 'Event Planners', link: '/features/professional-identity/event-planners' },
                            { name: 'Startup Founders', link: '/features/professional-identity/startup-founders' }
                        ].map((category, i) => (
                            <Link key={i} href={category.link} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-noble-blue/30 hover:bg-noble-blue/5 transition-colors text-center font-bold text-slate-700 hover:text-noble-blue text-sm">
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. FAQ / DISQUALIFICATION */}
            <section className="py-24 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-3xl mx-auto px-4 md:px-16">
                    <h2 className="text-[28px] md:text-[42px] font-black text-center text-slate-900 leading-[1.1] tracking-tight mb-12" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        Frequently Asked Questions
                    </h2>
                    
                    <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8 mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-red-500" />
                            <h3 className="text-lg font-black text-slate-900">We may not be right for you if...</h3>
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            If you run a traditional brick-and-mortar bakery and just want to leave a stack of paper cards on the counter, our system is overkill. You should probably just use a basic PDF designer. We built this for service professionals, agencies, and freelancers who actively network to capture high-ticket leads.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "How to create a business card for free online?", a: "The fastest way to learn how to create a business card for free online is to sign up for Nobevra. You simply claim your profile URL, upload your photo, and your dynamic digital card is generated instantly without needing graphic design skills." },
                            { q: "Is this a visiting card maker online free tool?", a: "Yes. It functions as a powerful visiting card maker online free tool, but instead of outputting a static image, it generates a CRM-linked digital profile that you can share via QR code or NFC." },
                            { q: "Can I figure out how to create a business card for free pdf version?", a: "While you can generate and download a QR code to print on physical materials, we actively discourage learning how to create a business card for free pdf. Static PDFs cannot capture leads or sync with your invoicing software. Digital is the future." },
                            { q: "Is there an AI business card generator free feature?", a: "Our system includes an AI business card generator free feature that automatically pulls your existing Nobevra company data to instantly build your professional profile without manual data entry." },
                            { q: "Can I use a 3d visiting card design online free template?", a: "Our digital profiles feature modern, interactive aesthetics that feel premium and responsive. While we don't focus on gimmicky 3d visiting card design online free templates, we provide sleek, high-converting interfaces." }
                        ].map((faq, i) => (
                            <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 hover:shadow-md transition-shadow">
                                <h3 className="font-black text-slate-900 mb-3">{faq.q}</h3>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. SOFT CTA */}
            <section className="py-24 bg-noble-blue relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                <div className="max-w-[800px] mx-auto px-4 md:px-16 relative z-10">
                    <h2 className="text-[32px] md:text-[48px] font-black text-white leading-[1.1] tracking-tight mb-8" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        Stop handing out paper.
                    </h2>
                    <p className="text-white/80 font-medium text-lg mb-12 max-w-2xl mx-auto">
                        Your professional identity should work for you long after the handshake. Set up your free digital profile today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="bg-white text-noble-blue px-10 py-5 text-base font-extrabold rounded-2xl hover:bg-white/90 transition-all shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3"
                        >
                            Claim your free card
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

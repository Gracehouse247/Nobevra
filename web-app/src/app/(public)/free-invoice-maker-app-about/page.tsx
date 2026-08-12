import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Free Invoice Maker App | About NobleInvoice',
    description: 'NobleInvoice is the best free invoice maker app for iPhone, Android & PC. Growing businesses trust our simple invoice app. Start free today.',
    keywords: [
        'invoice maker app free',
        'best invoice maker app free',
        'invoice maker app free for iphone',
        'invoice maker app free download',
        'invoice maker app free download for PC',
        'my invoice maker app',
        'simple invoice app free',
        'free invoice maker app for Android',
    ],
    openGraph: {
        title: 'Free Invoice Maker App | About NobleInvoice',
        description: 'NobleInvoice is the best free invoice maker app for iPhone, Android & PC. Growing businesses trust our simple invoice app.',
        type: 'website',
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Is NobleInvoice really a free invoice maker app?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Our Starter plan is permanently free. You can create up to 10 invoices per month, manage 5 active clients, and export professional PDFs at zero cost. No trial period. No credit card required."
            }
        },
        {
            "@type": "Question",
            "name": "Is there a free invoice maker app for iPhone?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. NobleInvoice is fully optimized as a progressive web app (PWA) for iPhone and Safari. Add it to your home screen and get the full invoice maker app free for iPhone experience without an App Store download."
            }
        },
        {
            "@type": "Question",
            "name": "Is there a free invoice maker app for Android?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Our free invoice maker app for Android works on any Android device via Chrome. It runs offline, sends invoices, and tracks payments — all from your phone."
            }
        },
        {
            "@type": "Question",
            "name": "Can I do an invoice maker app free download for PC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. You can install NobleInvoice as a Progressive Web App on Windows and Mac. From Chrome or Edge, click Install in the address bar and get the full invoice maker app free download for PC — no setup wizard, no bloat."
            }
        },
        {
            "@type": "Question",
            "name": "What makes NobleInvoice the best invoice maker app free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most free invoice tools give you a PDF and nothing else. NobleInvoice gives you a client-facing payment portal, automated reminders, branded templates, real-time payment tracking, and a CRM — all on the free plan. That is why growing businesses call it the best invoice maker app free."
            }
        },
        {
            "@type": "Question",
            "name": "How is Pay-As-You-Go different from a subscription?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "With PAYG, you pay $1 per invoice or feature you actually use — no monthly commitment. With a subscription (Noble Pulse at $9.99/mo), you get unlimited access. PAYG is perfect if you need a premium feature occasionally. The subscription pays off if you invoice 10+ times per month."
            }
        },
        {
            "@type": "Question",
            "name": "Do my clients need an account to pay me?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Never. They click the payment link in your invoice and pay through a secure web portal. No login. No account creation. No friction on their end."
            }
        },
        {
            "@type": "Question",
            "name": "Can I use NobleInvoice as my regular invoice maker app?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Thousands of freelancers, consultants, and small business owners use NobleInvoice as their primary invoice maker app every day. It handles clients, expenses, recurring invoices, and payment reminders — everything you need in one place."
            }
        },
        {
            "@type": "Question",
            "name": "Is my financial data safe?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use AES-256 encryption at rest and in transit, the same standard used by major banks. We are SOC 2 Type II certified and PCI-DSS compliant. Your data is never sold or shared."
            }
        },
        {
            "@type": "Question",
            "name": "How long does it take to send my first invoice?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Under 60 seconds. Sign up, add a client name and amount, pick a template, and hit send. Your client gets a branded invoice with a one-click payment link. That is it."
            }
        }
    ]
};

const reviews = [
    {
        quote: "I used to spend my Sunday evenings organizing bills. I switched to NobleInvoice, set up automated recurring profiles, and bought my weekends back.",
        name: "Sarah T.",
        role: "Design Agency Founder",
        image: "/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png",
    },
    {
        quote: "NobleInvoice's secure client portal has transformed how our law firm handles billings. The transparency it provides to our clients is invaluable.",
        name: "Barr Emma Duruigbo",
        role: "Founder, Ducex Solicitors Ltd.",
        image: "/images/reviews/barr-emma-duruigbo-founder-of-ducex-solicitors-ltd.png",
    },
    {
        quote: "The Inventory Hub is a game changer for our agricultural supplies. Real-time stock tracking connected directly to invoicing prevents stockouts entirely.",
        name: "Glory Ebasabor",
        role: "Founder, D-Amin Grow",
        image: "/images/reviews/glory-ebasabor-founder-of-d-amin-grow.jpeg",
    },
];

const stats = [
    { value: 'Global', label: 'Businesses Worldwide' },
    { value: '100%', label: 'Secure Payments' },
    { value: '180+', label: 'Invoice Templates' },
    { value: '60s', label: 'To Send First Invoice' },
];

const painPoints = [
    {
        icon: '📄',
        title: 'The Blank PDF Problem',
        desc: 'Most free tools give you a static PDF attachment. No payment link. No tracking. No reminders. You send it, then wait — and wonder.',
    },
    {
        icon: '⏳',
        title: 'Late Payments Kill Cash Flow',
        desc: 'Freelancers wait an average of 29 days for payment. Late invoices account for 82% of small business cash flow problems. That is a structural failure, not a client problem.',
    },
    {
        icon: '📊',
        title: 'Manual Tracking is a Full-Time Job',
        desc: 'Tracking payments across spreadsheets, email threads, and bank statements is not billing. That is chaos with extra steps.',
    },
    {
        icon: '💸',
        title: 'Hidden Per-User Fees',
        desc: 'Most "free" billing tools charge you per seat, per invoice, or per feature once you actually need to use them. The free plan is bait.',
    },
];

const features = [
    {
        icon: '📱',
        title: 'Free Invoice Maker App for Android & iPhone',
        desc: 'Install the best simple invoice app free on any device. Works offline. Full functionality — no download needed from an app store.',
        keyword: 'simple invoice app free',
    },
    {
        icon: '🎨',
        title: '180+ Professional Industry Templates',
        desc: 'Whether you need a construction invoice, photography billing, or freelance consulting templates. Every template is customizable with your colors, logo, and terms.',
        keyword: 'best invoice maker app free',
    },
    {
        icon: '🔗',
        title: 'One-Click Client Payment Portal',
        desc: 'No client logins required. They click, they pay. Credit card, bank transfer, Apple Pay — it all works.',
        keyword: 'my invoice maker app',
    },
    {
        icon: '⚡',
        title: 'Pay-As-You-Go Model',
        desc: 'Use premium features without a subscription. Pay $1 per invoice or feature, only when you need it. No monthly lock-in.',
        keyword: 'invoice maker app free',
    },
    {
        icon: '🔔',
        title: 'Automated Payment Reminders',
        desc: 'Polite, professional follow-ups go out automatically on overdue invoices. You stop chasing. They start paying.',
        keyword: 'invoice maker app free download',
    },
    {
        icon: '📥',
        title: 'Free Invoice Maker App Download for PC',
        desc: 'Download any invoice as a pixel-perfect PDF instantly, or install the app directly to your desktop. Works on every plan, including free.',
        keyword: 'invoice maker app free download for PC',
    },
];

const platforms = [
    {
        icon: '🍎',
        title: 'iPhone & iPad',
        subtitle: 'Invoice maker app free for iPhone',
        desc: 'Add NobleInvoice to your iOS home screen. Works on Safari. Full app experience — no App Store.',
        badge: 'iOS Ready',
        color: 'from-slate-900 to-slate-700',
    },
    {
        icon: '🤖',
        title: 'Android',
        subtitle: 'Free invoice maker app for Android',
        desc: 'Install via Chrome on any Android device. Works offline. Send invoices from anywhere.',
        badge: 'Android Ready',
        color: 'from-green-700 to-green-500',
    },
    {
        icon: '🖥️',
        title: 'Windows & Mac',
        subtitle: 'Invoice maker app free download for PC',
        desc: 'Install NobleInvoice as a PWA on your desktop. No setup wizard. No admin rights needed.',
        badge: 'PC & Mac Ready',
        color: 'from-noble-blue to-[#0599D5]',
    },
    {
        icon: '🌐',
        title: 'Any Browser',
        subtitle: 'My invoice maker app — everywhere',
        desc: 'Open your browser, go to app.nobleinvoice.com, and start billing. Zero installation required.',
        badge: 'Web Ready',
        color: 'from-violet-700 to-violet-500',
    },
];

const steps = [
    { number: '01', title: 'Create', desc: 'Pick from 180+ templates. Add your client name and the amount. Customize colors and logo in 30 seconds.' },
    { number: '02', title: 'Send', desc: 'Hit send. Your client gets a professional invoice with a one-click payment link — no account required on their end.' },
    { number: '03', title: 'Track & Get Paid', desc: 'Watch real-time opens. Payment lands in your account, NobleInvoice marks it paid, and sends a receipt automatically.' },
];

export default function AboutPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
            <section className="relative pt-16 pb-32 overflow-hidden">
                {/* Background glows */}
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-cyan/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest border border-noble-blue/10 mb-8">
                            <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
                            The Free Invoice Maker App Built for Modern Business
                        </div>

                        {/* H1 */}
                        <h1 className="font-inter text-near-black text-[32px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-tight font-black mb-6">
                            The Best Free Invoice Maker App.{' '}
                            <span className="text-noble-blue">No Spreadsheets.</span>{' '}
                            <span className="text-near-black/40">No Stress.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-near-black/60 leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
                            You got into business to do the work you love — not to spend Sundays chasing unpaid invoices. NobleInvoice is the simple invoice app free that handles your billing, so you can get back to building.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="/register"
                                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                                style={{ backgroundColor: '#166FBB' }}
                            >
                                Start free today
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                            <Link
                                href="/pricing"
                                className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
                            >
                                See pricing
                            </Link>
                        </div>

                        <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest mb-14">
                            No credit card required · Free plan available · Works on iPhone, Android & PC
                        </p>

                        {/* Trust bar */}
                        <div className="flex flex-wrap items-center justify-center gap-6 border-t border-near-black/5 pt-10">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-500 text-lg">verified_user</span>
                                <div>
                                    <p className="text-[10px] font-black text-near-black uppercase tracking-tight">SOC 2 Type II</p>
                                    <p className="text-[9px] text-near-black/40 font-bold uppercase">Certified</p>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-near-black/8" />
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#FF492C] flex items-center justify-center text-white font-black text-[10px]">G2</div>
                                <div>
                                    <div className="flex gap-0.5"><span className="text-yellow-400 text-xs">★★★★★</span></div>
                                    <p className="text-[9px] text-near-black/40 font-bold uppercase tracking-wide">4.9 · G2 Reviews</p>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-near-black/8" />
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-near-black flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-sm">phone_iphone</span>
                                </div>
                                <div>
                                    <div className="flex gap-0.5"><span className="text-yellow-400 text-xs">★★★★★</span></div>
                                    <p className="text-[9px] text-near-black/40 font-bold uppercase tracking-wide">4.8 · App Store</p>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-near-black/8" />
                            <div>
                                <p className="text-lg font-black text-near-black">Global</p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-near-black/40">Businesses Trust Us</p>
                            </div>
                            <div className="w-px h-8 bg-near-black/8" />
                            <div>
                                <p className="text-lg font-black text-near-black">100%</p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-near-black/40">Secure Payments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. WHO WE ARE / ORIGIN STORY ────────────────────────────────── */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest border border-noble-blue/10 mb-6">
                                Our Story
                            </div>
                            <h2 className="font-inter text-[28px] md:text-[42px] font-black text-near-black leading-[1.1] tracking-tight mb-6">
                                We Built This Because We Lived the Problem
                            </h2>
                            <div className="space-y-5 text-near-black/60 leading-relaxed text-base md:text-lg font-medium">
                                <p>
                                    Five years ago, our founder was running a consulting practice and billing clients the same way most people do — Word documents, email attachments, and a nervous wait for bank transfers.
                                </p>
                                <p>
                                    One client sat on a $4,200 invoice for 47 days. Not because they didn&apos;t want to pay. Because the process was clunky. They forgot. The follow-up felt awkward. The payment link didn&apos;t work on mobile.
                                </p>
                                <p>
                                    That was the moment we started building NobleInvoice — not as another accounting tool, but as a <strong className="text-near-black font-black">revenue engine</strong> that makes getting paid feel as easy as sending a text message.
                                </p>
                                <p className="text-near-black font-bold">
                                    The best invoice maker app free should do more than generate a PDF. It should run your entire billing operation.
                                </p>
                            </div>
                        </div>

                        {/* Philosophy card */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-noble-blue/20 to-electric-cyan/20 rounded-3xl blur-3xl opacity-40" />
                            <div className="relative bg-near-black rounded-3xl p-10 text-white border border-white/10 shadow-2xl">
                                <h3 className="text-2xl font-black mb-8" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                                    Our Three Rules
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { n: '01', h: 'Design builds trust.', d: 'A professional invoice tells your client you run a serious operation. First impressions happen before the work begins.' },
                                        { n: '02', h: 'Friction kills cash flow.', d: 'Every extra click between "invoice sent" and "payment received" costs you real money. We obsess over removing every one.' },
                                        { n: '03', h: 'Data should clarify, not confuse.', d: 'You should know who owes you, what is overdue, and how your revenue is trending — without a finance degree.' },
                                    ].map((item) => (
                                        <div key={item.n} className="flex items-start gap-4">
                                            <span className="w-9 h-9 shrink-0 rounded-xl bg-noble-blue/20 text-noble-blue flex items-center justify-center font-black text-sm">{item.n}</span>
                                            <div>
                                                <p className="font-black text-white mb-1">{item.h}</p>
                                                <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. THE PROBLEM ──────────────────────────────────────────────── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/50 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-500 font-bold text-[10px] uppercase tracking-widest border border-red-100 mb-6">
                            The Real Problem
                        </div>
                        <h2 className="font-inter text-[28px] md:text-[42px] font-black text-near-black leading-[1.1] tracking-tight mb-4">
                            Why Most Businesses Lose Money at Billing Time
                        </h2>
                        <p className="text-near-black/50 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                            Freelancers wait an average of <strong className="text-near-black">29 days</strong> for payment. Late invoices cause <strong className="text-near-black">82%</strong> of small business cash flow problems. This is not a client problem — it is a billing infrastructure problem.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {painPoints.map((point, i) => (
                            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="text-3xl mb-4">{point.icon}</div>
                                <h3 className="text-base font-black text-near-black mb-3">{point.title}</h3>
                                <p className="text-sm text-near-black/50 leading-relaxed font-medium">{point.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Information Gain: The 14-day gap */}
                    <div className="mt-12 bg-gradient-to-r from-noble-blue to-[#0599D5] rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-8">
                        <div className="text-center md:text-left md:flex-1">
                            <div className="text-[56px] md:text-[72px] font-black leading-none mb-2" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>14</div>
                            <div className="text-lg font-black uppercase tracking-widest text-white/70 mb-1">Days</div>
                            <p className="text-sm text-white/60 font-medium">The average &quot;invoice gap&quot; — the time between work delivered and payment cleared.</p>
                        </div>
                        <div className="hidden md:block w-px h-20 bg-white/20" />
                        <div className="md:flex-[2] space-y-3">
                            <p className="text-lg font-black leading-snug">Most businesses accept this as normal. It is not.</p>
                            <p className="text-white/70 leading-relaxed font-medium">
                                With automated reminders, one-click payment links, and real-time tracking, NobleInvoice users report average payment in <strong className="text-white">under 48 hours</strong>. That is not a small improvement. That is a different business.
                            </p>
                            <Link href="/register" className="inline-flex items-center gap-2 mt-2 text-white font-black text-sm border-b border-white/40 hover:border-white transition-colors pb-0.5">
                                Start getting paid faster
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. HOW IT WORKS (FRAMEWORK) ─────────────────────────────────── */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest border border-noble-blue/10 mb-6">
                            How to Make a Free Invoice
                        </div>
                        <h2 className="font-inter text-[28px] md:text-[42px] font-black text-near-black leading-[1.1] tracking-tight mb-4">
                            How to Make a Free Invoice in 3 Steps
                        </h2>
                        <p className="text-near-black/50 text-lg font-medium max-w-2xl mx-auto">
                            From first invoice to payment cleared — here is the exact flow. No accounting knowledge required.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-20">
                        {steps.map((step, i) => (
                            <div key={i} className="relative">
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-10 left-[calc(100%_+_12px)] w-[calc(100%_-_24px)] h-px bg-gradient-to-r from-noble-blue/30 to-transparent z-10" />
                                )}
                                <div className="bg-gradient-to-b from-[#F0F9FF] to-white rounded-3xl p-8 border border-noble-blue/10 h-full hover:shadow-lg hover:border-noble-blue/20 transition-all duration-300">
                                    <div className="text-[11px] font-black text-noble-blue/40 uppercase tracking-[0.3em] mb-4">{step.number}</div>
                                    <h3 className="text-xl font-black text-near-black mb-3">{step.title}</h3>
                                    <p className="text-sm text-near-black/50 leading-relaxed font-medium">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dashboard visual */}
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/10 to-electric-cyan/10 blur-2xl rounded-[40px] opacity-60" />
                        <div className="relative bg-white/60 backdrop-blur-sm p-4 rounded-[32px] shadow-[0_40px_100px_rgba(22,111,187,0.12)] border border-white/80">
                            <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            </div>
                            <div className="rounded-[20px] overflow-hidden border border-slate-100/50">
                                <Image
                                    alt="invoice maker app free — NobleInvoice dashboard"
                                    src="/images/hero-dashboard-actual.png"
                                    width={1366}
                                    height={768}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. FEATURES ─────────────────────────────────────────────────── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-noble-blue/3 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest border border-noble-blue/10 mb-6">
                            Features
                        </div>
                        <h2 className="font-inter text-[28px] md:text-[42px] font-black text-near-black leading-[1.1] tracking-tight mb-4">
                            Everything You Need. Nothing You Don&apos;t.
                        </h2>
                        <p className="text-near-black/50 text-lg font-medium max-w-2xl mx-auto">
                            Built for freelancers, consultants, and small business owners — not enterprise accounting departments.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feat, i) => (
                            <div key={i} className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-noble-blue/20 hover:-translate-y-1 transition-all duration-300">
                                <div className="text-3xl mb-5">{feat.icon}</div>
                                <h3 className="text-base font-black text-near-black mb-3 leading-snug">{feat.title}</h3>
                                <p className="text-sm text-near-black/50 leading-relaxed font-medium mb-4">{feat.desc}</p>
                                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-noble-blue/5 text-noble-blue text-[10px] font-black uppercase tracking-widest border border-noble-blue/10">
                                    {feat.keyword}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. PLATFORM DOWNLOAD SECTION (Information Gain) ─────────────── */}
            <section className="py-24 bg-near-black relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-noble-blue/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-electric-cyan/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/70 font-bold text-[10px] uppercase tracking-widest border border-white/10 mb-6">
                            Available Everywhere
                        </div>
                        <h2 className="font-inter text-[28px] md:text-[42px] font-black text-white leading-[1.1] tracking-tight mb-4">
                            Invoice Maker App Free Download — Any Device
                        </h2>
                        <p className="text-white/50 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                            One account. Every device. Whether you&apos;re invoicing from your phone between meetings or from your desktop at the end of the day — NobleInvoice moves with you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {platforms.map((p, i) => (
                            <div key={i} className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                                <div className="text-4xl mb-5">{p.icon}</div>
                                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white/60 text-[9px] font-black uppercase tracking-widest mb-4 border border-white/10">
                                    {p.badge}
                                </div>
                                <h3 className="text-lg font-black text-white mb-1">{p.title}</h3>
                                <p className="text-[11px] font-black text-noble-blue/80 uppercase tracking-wide mb-3">{p.subtitle}</p>
                                <p className="text-sm text-white/50 leading-relaxed font-medium">{p.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-3 text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all shadow-[0_20px_50px_rgba(22,111,187,0.4)] hover:scale-[1.02]"
                            style={{ backgroundColor: '#166FBB' }}
                        >
                            Get the free invoice maker app
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                        <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest mt-4">No App Store · No Installation · Works Instantly</p>
                    </div>
                </div>
            </section>

            {/* ── 7. STATS ────────────────────────────────────────────────────── */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-[48px] md:text-[64px] font-black text-near-black leading-none mb-2 tracking-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                                    {stat.value}
                                </div>
                                <div className="text-[11px] font-black uppercase tracking-widest text-near-black/40">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Testimonials */}
                    <div className="text-center mb-12">
                        <h2 className="font-inter text-[28px] md:text-[42px] font-black text-near-black leading-[1.1] tracking-tight">
                            Real Businesses. Real Results.
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {reviews.map((r, i) => (
                            <div key={i} className="bg-gradient-to-b from-[#F8FAFC] to-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="flex gap-0.5 mb-5">
                                    {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-sm">★</span>)}
                                </div>
                                <p className="text-near-black/70 leading-relaxed font-medium text-sm mb-6 italic">&quot;{r.quote}&quot;</p>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={r.image}
                                        alt={`invoice maker app free review by ${r.name}`}
                                        width={44}
                                        height={44}
                                        className="rounded-full object-cover border-2 border-noble-blue/20"
                                    />
                                    <div>
                                        <p className="font-black text-near-black text-sm">{r.name}</p>
                                        <p className="text-[11px] text-near-black/40 font-medium">{r.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 8. CASE STUDY ───────────────────────────────────────────────── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-noble-blue/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-noble-blue to-[#0599D5] p-8 md:p-12 text-white">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest border border-white/20 mb-6">
                                Case Study
                            </div>
                            <h2 className="font-inter text-[24px] md:text-[36px] font-black leading-tight tracking-tight mb-4">
                                From Chasing Invoices to Getting Paid in 48 Hours
                            </h2>
                            <p className="text-white/70 font-medium text-lg">Sarah T. — Design Agency Founder</p>
                        </div>
                        <div className="p-8 md:p-12">
                            <div className="grid md:grid-cols-3 gap-8 mb-10">
                                {[
                                    { label: 'Before: Avg Payment Time', value: '29 days', sub: 'Manual PDF invoices via email' },
                                    { label: 'After: Avg Payment Time', value: '48 hrs', sub: 'One-click payment portal' },
                                    { label: 'Time Saved Per Month', value: '12 hrs', sub: 'No more Sunday billing sessions' },
                                ].map((item, i) => (
                                    <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-b from-[#F0F9FF] to-white border border-noble-blue/10">
                                        <div className="text-[11px] font-black uppercase tracking-widest text-near-black/40 mb-2">{item.label}</div>
                                        <div className="text-4xl font-black text-near-black mb-2 tracking-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{item.value}</div>
                                        <div className="text-xs text-near-black/40 font-medium">{item.sub}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4 text-near-black/60 leading-relaxed font-medium">
                                <p>
                                    Sarah was spending roughly three hours every Sunday organizing client invoices, chasing late payments, and manually recording what had been paid versus what was still outstanding.
                                </p>
                                <p>
                                    After switching to NobleInvoice, she set up automated recurring invoices for her three retainer clients, enabled one-click payment links, and configured three-day reminder emails. Her average payment time dropped from 29 days to under 48 hours within the first billing cycle.
                                </p>
                                <p className="text-near-black font-bold">
                                    &quot;I got my weekends back. And I&apos;m getting paid three weeks faster. That is two wins from one decision.&quot;
                                </p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-3">
                                <Image
                                    src="/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png"
                                    alt="invoice maker app free case study review"
                                    width={48}
                                    height={48}
                                    className="rounded-full border-2 border-noble-blue/20 object-cover"
                                />
                                <div>
                                    <p className="font-black text-near-black">Sarah T.</p>
                                    <p className="text-xs text-near-black/40 font-medium">Design Agency Founder · NobleInvoice user since 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── NEW. FREE VS PAID TRANSPARENCY ────────────────────────────── */}
            <section className="py-24 bg-near-black text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-noble-blue/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest border border-white/10 mb-6">
                                Complete Transparency
                            </div>
                            <h2 className="font-inter text-[28px] md:text-[42px] font-black leading-[1.1] tracking-tight mb-6">
                                Why is our invoice maker app free?
                            </h2>
                            <div className="space-y-5 text-white/70 leading-relaxed text-base md:text-lg font-medium">
                                <p>
                                    Many companies offer a &quot;free&quot; tool that is actually a 14-day trial, or they watermark your invoices until you upgrade. We don&apos;t do that.
                                </p>
                                <p>
                                    Our <strong className="text-white font-black">Starter Plan is permanently free</strong>. You can invoice up to 10 clients a month without ever entering a credit card.
                                </p>
                                <p>
                                    <strong>Why?</strong> Because we know that if we help your business grow today, you&apos;ll upgrade to our Pay-As-You-Go features or our unlimited Pulse plan when your volume increases tomorrow. It&apos;s a win-win. No hidden fees. No bait-and-switch.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                                <h3 className="text-xl font-black mb-6">The Free Plan Includes:</h3>
                                <ul className="space-y-4">
                                    {[
                                        'Up to 10 invoices per month',
                                        '5 active client profiles',
                                        'All 180+ professional industry templates',
                                        'Credit card & bank transfer payments',
                                        'PDF exports & email delivery',
                                        'Progressive Web App access'
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-electric-cyan/20 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-electric-cyan text-[14px]">check</span>
                                            </div>
                                            <span className="font-medium text-white/90">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 9. NOT RIGHT FOR YOU ────────────────────────────────────────── */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-widest border border-slate-200 mb-6">
                            Honest Transparency
                        </div>
                        <h2 className="font-inter text-[28px] md:text-[42px] font-black text-near-black leading-[1.1] tracking-tight mb-6">
                            We might not be{' '}
                            <span className="text-near-black/30">the right fit for you.</span>
                        </h2>
                        <p className="text-near-black/60 text-lg font-medium leading-relaxed mb-8">
                            We built the most practical free invoice maker app on the market, but we are not for everyone. Here is who should probably look elsewhere:
                        </p>
                        <div className="space-y-4 mb-10">
                            {[
                                'You need complex double-entry bookkeeping and full ERP integration',
                                'You are a 500+ person enterprise requiring multi-layered corporate approval chains',
                                'You want a tool that replaces your accountant entirely — we are billing software, not a tax advisor',
                                'You need legacy software integrations with 20-year-old systems',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <span className="text-slate-300 font-black text-lg mt-0.5">✕</span>
                                    <p className="text-near-black/60 font-medium text-sm leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gradient-to-r from-noble-blue/8 to-transparent rounded-2xl p-6 border-l-4 border-noble-blue/30">
                            <p className="text-near-black/70 font-bold mb-3">But if you are a freelancer, a growing agency, or a modern small business?</p>
                            <p className="text-near-black/60 font-medium text-sm mb-4">You are exactly who we built this for. The <strong className="text-near-black">simple invoice app free</strong> that handles your billing from day one.</p>
                            <Link href="/register" className="inline-flex items-center gap-2 text-noble-blue font-black text-sm hover:gap-3 transition-all">
                                Start billing for free
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 10. FAQ ─────────────────────────────────────────────────────── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-noble-blue/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest border border-noble-blue/10 mb-6">
                            FAQ
                        </div>
                        <h2 className="font-inter text-[28px] md:text-[42px] font-black text-near-black leading-[1.1] tracking-tight mb-4">
                            Invoice Maker App Free — Questions Answered
                        </h2>
                        <p className="text-near-black/50 text-lg font-medium max-w-xl mx-auto">
                            Everything you need to know before you start — no jargon, no sales pitch.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqSchema.mainEntity.map((faq, i) => (
                            <details key={i} className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <summary className="flex items-center justify-between gap-4 px-7 py-5 cursor-pointer list-none hover:bg-slate-50/50 transition-colors">
                                    <h3 className="text-sm font-black text-near-black leading-snug">{faq.name}</h3>
                                    <span className="text-noble-blue shrink-0 font-black text-lg leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                                </summary>
                                <div className="px-7 pb-6 border-t border-slate-50">
                                    <p className="text-sm text-near-black/60 leading-relaxed font-medium pt-4">{faq.acceptedAnswer.text}</p>
                                </div>
                            </details>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-near-black/40 font-medium text-sm mb-4">Still have questions?</p>
                        <Link href="/contact" className="inline-flex items-center gap-2 text-noble-blue font-black text-sm hover:gap-3 transition-all">
                            Talk to our team
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── 11. SOFT CTA ────────────────────────────────────────────────── */}
            <section className="relative py-[140px] overflow-hidden bg-white border-t border-slate-100">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-noble-blue/5 blur-[180px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-50/30 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center relative z-10">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-noble-blue/5 border border-noble-blue/10 text-blue-800 font-black text-[10px] uppercase tracking-[0.3em] mb-12">
                        Start For Free Today
                    </div>
                    <h2 className="font-inter text-[32px] md:text-[52px] lg:text-[64px] font-black text-near-black mb-8 tracking-tight leading-[1.1]">
                        Try the Free Invoice Maker App.{' '}
                        <span className="text-noble-blue">No risks.</span>{' '}
                        <br className="hidden md:block" />
                        <span className="text-near-black/30">No limits on what you can build.</span>
                    </h2>
                    <p className="text-xl text-near-black/50 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
                        Create your first professional invoice in under 60 seconds. Works on iPhone, Android, PC, and any browser — completely free.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                        <Link
                            href="/register"
                            className="bg-noble-blue text-white px-12 py-6 text-xl font-black rounded-[24px] hover:bg-noble-blue/90 hover:scale-105 transition-all shadow-2xl shadow-noble-blue/30 flex items-center justify-center gap-3"
                        >
                            Get started now
                        </Link>
                        <Link
                            href="/login"
                            className="text-near-black/60 hover:text-near-black transition-colors text-lg font-black underline underline-offset-8 decoration-noble-blue/30"
                        >
                            Member login
                        </Link>
                    </div>
                    <p className="text-[11px] text-near-black/30 font-bold uppercase tracking-widest mt-8">
                        No credit card required · Free plan always available · Cancel anytime
                    </p>
                </div>
            </section>
        </div>
    );
}

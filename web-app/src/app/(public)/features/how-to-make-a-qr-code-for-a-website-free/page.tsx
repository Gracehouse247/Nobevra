import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  QrCode,
  BarChart3,
  Globe,
  ShieldCheck,
  TrendingUp,
  Eye,
  RefreshCw,
  AlertCircle,
  Star,
  CreditCard,
} from 'lucide-react';
import LeadIntelligenceHeroVisual from '@/components/landing/LeadIntelligenceHeroVisual';


export const metadata: Metadata = {
  title: 'How To Make A QR Code For A Website Free | NobleInvoice',
  description:
    'Learn how to make a QR code for a website in seconds — free, branded, and scannable. NobleInvoice generates QR codes that drive payments, leads, and business growth.',
  keywords: [
    'how to make a qr code for a website',
    'how to make a qr code for a website for free',
    'free qr code generator',
    'qr code scanner',
    'google qr code generator',
    'how to make a qr code for a website without',
    'qr code for business',
    'digital business card qr code',
  ],
};

export default function LeadIntelligencePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I make a QR code for my website for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'You can make a QR code for your website for free in seconds using NobleInvoice. Enter your website URL, customize the design with your brand colors and logo, then download your code as a PNG or SVG. No account required for basic static codes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a static and dynamic QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'A static QR code permanently embeds your URL. You cannot change it after printing. A dynamic QR code uses a redirect — so you can update the destination URL anytime without reprinting. For businesses, dynamic codes also give you scan analytics, location data, and A/B testing capability.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use a Google QR Code Generator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Google Chrome has a built-in static QR code generator — right-click any page or use the share icon and select "Create QR Code." It is quick but offers no customization, no analytics, and no dynamic redirect. For professional use, NobleInvoice offers branded, dynamic QR codes with full scan tracking.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do QR codes expire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Static QR codes never expire — the URL is baked in permanently. Dynamic QR codes depend on the platform. NobleInvoice dynamic codes stay live as long as your account is active, and you can update the destination URL any time.',
        },
      },
      {
        '@type': 'Question',
        name: 'What size should a QR code be for printing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'For physical print, your QR code should be at least 2cm x 2cm for reliable scanning at standard distances. For posters and signage, 10cm x 10cm or larger is recommended. Always download in SVG or high-resolution PNG format for print to maintain sharp edges.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I put a logo in the center of my QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. QR codes have built-in error correction that allows up to 30% of the pattern to be obscured. NobleInvoice lets you add your logo to the center of any QR code without breaking scannability — as long as the logo stays within the safe zone.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I make a QR code for a website without using an app?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            "You don't need an app. NobleInvoice is entirely browser-based. Open your account on any device, paste your URL, generate the code, and download. No app installs required.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does NobleInvoice track how many times a QR code is scanned?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. Every dynamic QR code created in NobleInvoice comes with built-in scan analytics. You can see total scans, unique scans, device types, scan locations by city/country, and peak scan times — all in your Lead Intelligence dashboard.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free QR code generator with no watermark?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. NobleInvoice generates clean, watermark-free QR codes for free. Your downloaded code contains only your brand — no third-party logos, no watermarks, no hidden attribution.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use QR codes to accept payments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Absolutely. NobleInvoice QR codes link directly to your secure payment portal. A client scans the code and lands on your branded checkout page where they can pay by card, Apple Pay, or Google Pay instantly. This is the fastest way to get paid in person or at events.',
        },
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Make a QR Code for a Website',
    description:
      'A step-by-step guide to creating a free, branded QR code for your website using NobleInvoice.',
    totalTime: 'PT2M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Open your NobleInvoice dashboard',
        text: 'Log in to your NobleInvoice account and navigate to Lead Intelligence → QR Generator.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Enter your website URL',
        text: 'Paste the full website URL you want the QR code to open. This can be your homepage, a payment page, a product page, or any custom landing page.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Customise your QR design',
        text: 'Choose your brand colors, upload your logo for the center, and select a frame style. Preview the result in real time.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Test the QR code',
        text: 'Scan the preview with your phone camera to confirm it loads the correct page before downloading.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Download and deploy',
        text: 'Download in PNG for digital use or SVG for print-ready materials. Place it on invoices, business cards, packaging, or signage.',
      },
    ],
  };

  const stats = [
    { value: '94%', label: 'Of marketers increased QR code use in 2025' },
    { value: '59%', label: 'Of consumers scan QR codes daily' },
    { value: '80%', label: 'Scan rate increase for branded vs. generic codes' },
    { value: '$33B', label: 'QR code market size projected by 2030' },
  ];

  const features = [
    {
      icon: QrCode,
      color: 'text-noble-blue',
      bg: 'bg-noble-blue/10',
      title: 'Free QR Code Generator',
      desc: 'Create unlimited static QR codes for any website URL at no cost. Download in PNG or SVG — no watermarks, no expiry, no account required for basic use.',
    },
    {
      icon: BarChart3,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      title: 'Live Scan Analytics',
      desc: 'Track every scan in real time. See total scans, unique visitors, device types, and geographic data — so you know exactly which QR codes are working.',
    },
    {
      icon: RefreshCw,
      color: 'text-[#0599D5]',
      bg: 'bg-[#0599D5]/10',
      title: 'Dynamic QR — Change URLs Anytime',
      desc: "Redirect links. Printed 500 business cards and then changed your website? Update the destination URL in your dashboard. Your physical codes stay working.",
    },
    {
      icon: CreditCard,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      title: 'QR Payments',
      desc: 'Link your QR code directly to your NobleInvoice payment page. Clients scan and pay by card, Apple Pay, or Google Pay instantly — no invoice required.',
    },
    {
      icon: Globe,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      title: 'Multi-Destination Routing',
      desc: 'Route different devices to different URLs. Phone users go to your mobile site. Desktop scanners go to a different page. One code, multiple outcomes.',
    },
    {
      icon: ShieldCheck,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      title: 'Brand-Safe Design',
      desc: 'Add your logo, match your exact hex colors, choose eye shapes and frame styles. Every QR code you generate looks like it belongs to your brand.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Enter your website URL',
      desc: 'Paste any web address — your homepage, a specific product page, your payment portal, or a custom landing page. Any URL works.',
    },
    {
      step: '02',
      title: 'Design it to match your brand',
      desc: 'Pick your colors. Add your logo. Choose a frame style. Watch the live preview update in real time so you know exactly what you are printing.',
    },
    {
      step: '03',
      title: 'Test it — then download',
      desc: 'Scan the preview with your phone before downloading. Then grab your PNG for digital use or SVG for sharp, scalable print-ready files.',
    },
    {
      step: '04',
      title: 'Deploy and track performance',
      desc: 'Place it everywhere — invoices, packaging, signage, emails, business cards. Watch your Lead Intelligence dashboard fill with real scan data.',
    },
  ];

  const comparison = [
    { feature: 'Custom brand colors', noble: true, generic: false },
    { feature: 'Logo in center', noble: true, generic: false },
    { feature: 'Dynamic redirect (change URL)', noble: true, generic: false },
    { feature: 'Scan analytics & location data', noble: true, generic: false },
    { feature: 'QR-to-payment link', noble: true, generic: false },
    { feature: 'No watermark', noble: true, generic: 'Paid only' },
    { feature: 'SVG / print-ready export', noble: true, generic: 'Paid only' },
    { feature: 'Never expires', noble: true, generic: true },
  ];

  const useCases = [
    {
      icon: '🧾',
      title: 'Invoice QR Codes',
      desc: 'Add a QR code to every PDF invoice. Clients scan it and land directly on your secure payment page. Payments that used to take 14 days now arrive the same afternoon.',
    },
    {
      icon: '💳',
      title: 'Digital Business Cards',
      desc: 'Replace your paper card with an NFC chip + branded QR code combo. Contacts scan it and get your full profile, portfolio, and a one-tap way to pay or book you.',
    },
    {
      icon: '📦',
      title: 'Product Packaging',
      desc: 'Put a QR code on your packaging that links to warranty registration, a review page, or a loyalty program. Turn every sale into a returning customer.',
    },
    {
      icon: '🏪',
      title: 'In-Store & Point-of-Sale',
      desc: 'Let walk-in customers pay by scanning a QR code on your counter. No card machine required. Works with Stripe, Apple Pay, and Google Pay out of the box.',
    },
    {
      icon: '📅',
      title: 'Events & Networking',
      desc: 'Display your QR code at your booth, on your badge, or on a slide. Every attendee who scans it becomes a tracked lead in your dashboard — not a lost business card.',
    },
    {
      icon: '📧',
      title: 'Email Signatures & Campaigns',
      desc: 'Embed a QR code in your email footer that links to your booking page. Track click-through rates by campaign and know exactly which emails are converting.',
    },
  ];

  const testimonials = [
    {
      quote: "Our marketplace generates hundreds of global leads daily. NobleInvoice's Lead Intelligence tools let us track intent perfectly, connecting marketing right to our revenue pipeline.",
      name: 'Ayasha Khan',
      role: 'Marketing Director, NobleMart',
      image: '/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png',
      stars: 5,
    },
    {
      quote: 'The CRM engine keeps all our consulting engagements perfectly tracked. Knowing exactly when a client views an invoice saves us countless follow-up emails.',
      name: 'Celestine Nzubbychukwu',
      role: 'Founder, MyStaff Consulting',
      image: '/images/reviews/celestine-nzubbychukwu-founder-of-mystaff-consulting-limited.png',
      stars: 5,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
      <Script
        id="faq-schema-lead-intelligence"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="howto-schema-lead-intelligence"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ── 1. HERO — Benefit-Driven Headline ── */}
      <section className="relative pt-12 pb-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center relative z-10">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Lead Intelligence &amp; Free QR Code Generator
            </div>

            <h1 className="font-inter text-near-black mb-6 text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black">
              How To Make A QR Code For A Website —{' '}
              <span className="text-noble-blue">Free, Branded &amp; Trackable</span>
            </h1>

            <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
              Most free QR code generators give you a generic black-and-white square. NobleInvoice
              gives you a branded, dynamic, analytics-backed QR code that turns every scan into a
              tracked business interaction — and links directly to your payment page.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                id="hero-cta-qr-primary"
                href="/register"
                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: '#166FBB' }}
              >
                Generate My Free QR Code
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                id="hero-cta-qr-secondary"
                href="/pricing"
                className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
              >
                See Pricing
              </Link>
            </div>

            <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest mb-10">
              No credit card required · Free plan available · Cancel anytime
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 border-t border-near-black/5 pt-8">
              <div className="flex -space-x-3">
                {[
                  { bg: 'bg-noble-blue', text: 'TA' },
                  { bg: 'bg-[#0599D5]', text: 'PM' },
                  { bg: 'bg-primary', text: 'EK' },
                  { bg: 'bg-[#166FBB]', text: 'JR' },
                  { bg: 'bg-near-black', text: 'SO' },
                ].map((a, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full ${a.bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-black shadow-sm`}
                  >
                    {a.text}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="text-[11px] font-bold text-near-black/50">
                  Trusted by <span className="text-near-black font-black">Global</span> businesses worldwide
                </p>
              </div>
              <div className="w-px h-8 bg-near-black/8" />
              <div>
                <p className="text-lg font-black text-near-black">100%</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-near-black/40">
                  Secure Payments
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive QR Preview Visual */}
          <LeadIntelligenceHeroVisual />
        </div>
      </section>

      {/* ── 2. STATS — Market Reality ── */}
      <section className="py-16 bg-near-black text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-noble-blue/10 to-transparent pointer-events-none" />
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-12">
            The QR Code Economy — By The Numbers
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center border-r border-white/10 last:border-r-0 px-4"
              >
                <p className="text-5xl md:text-6xl font-black text-electric-cyan mb-3">
                  {stat.value}
                </p>
                <p className="text-white/60 font-medium text-sm leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PROBLEM — Emotionally Compelling Hook ── */}
      <section className="py-24 bg-gradient-to-b from-[#FFFBF5] to-white border-y border-near-black/5">
        <div className="max-w-[1000px] mx-auto px-4 md:px-16 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/8 border border-red-500/10 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            The Visibility Gap
          </div>
          <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] mb-8 tracking-tight">
            You hand out business cards. <br className="hidden md:block" />
            Nobody scans them.
          </h2>
          <p className="text-lg md:text-xl text-near-black/60 leading-relaxed">
            Here is the uncomfortable truth: generic black-and-white QR codes get ignored. Consumers
            scan branded codes 80% more often. And when they do scan, where does the link go? For
            most businesses — nowhere trackable. You have no idea who scanned it, when, or whether
            they took action. That is revenue you cannot measure.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-red-500/10 transition-all duration-500">
            <AlertCircle className="w-10 h-10 text-red-500 mb-6" />
            <h3 className="font-black text-near-black text-2xl mb-4">
              Generic Codes Kill Conversions
            </h3>
            <p className="text-near-black/60 leading-relaxed">
              When someone sees an unbranded QR code they have never seen before, their first instinct is
              hesitation. Is it safe? Where does it go? A plain square with no context creates doubt at the
              exact moment you need confidence. That split-second of distrust costs you the scan.
            </p>
          </div>
          <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <TrendingUp className="w-10 h-10 text-noble-blue mb-6" />
            <h3 className="font-black text-near-black text-2xl mb-4">
              Every Scan Is A Lead Signal
            </h3>
            <p className="text-near-black/60 leading-relaxed">
              Each QR code scan tells you something — what device the person used, what city they are in,
              what time they scanned. That is first-party data. In a world where third-party tracking is dead,
              your QR code is one of the cleanest signals of real buyer intent you have left.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS — Step-By-Step Process ── */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
              Step-By-Step Guide
            </div>
            <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
              How to make a QR code for a website{' '}
              <span className="text-noble-blue">in under 2 minutes</span>
            </h2>
            <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
              No design skills needed. No technical setup. Just four steps between you and a
              professional, trackable QR code.
            </p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 md:before:ml-[50%] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-noble-blue before:to-transparent">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-noble-blue text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10 transition-transform group-hover:scale-110 text-sm">
                  {item.step}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                  <h3 className="font-black text-2xl text-near-black mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-near-black/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              id="steps-cta"
              href="/register"
              className="inline-flex text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 mx-auto"
              style={{ backgroundColor: '#166FBB' }}
            >
              Generate My Free QR Code Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. FEATURES — The NobleInvoice Approach ── */}
      <section className="py-32 bg-white border-t border-near-black/5">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
              The NobleInvoice Difference
            </div>
            <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
              A free QR code generator that actually{' '}
              <span className="text-noble-blue">builds your business.</span>
            </h2>
            <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
              Every QR code you make in NobleInvoice is connected to your Lead Intelligence
              dashboard — so it does not just link somewhere, it tracks, converts, and reports.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-slate-50/80 to-white rounded-[32px] p-8 md:p-10 border border-slate-100 hover:border-noble-blue/20 shadow-sm hover:shadow-2xl transition-all duration-500 bento-card"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${feat.bg} flex items-center justify-center ${feat.color} mb-8`}
                >
                  <feat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-near-black mb-4 tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-near-black/60 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. INFORMATION GAIN — Static vs. Dynamic Deep Dive ── */}
      <section className="py-24 bg-[#F8FAFC] border-y border-near-black/5">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/8 border border-amber-500/10 text-amber-700 font-bold text-[10px] uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Information Gain
            </div>
            <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
              Static vs. dynamic QR codes,{' '}
              <span className="text-noble-blue">which one do you actually need?</span>
            </h2>
            <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
              Most guides skip this. Here is the honest breakdown — with a practical framework to
              decide which type fits your situation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h3 className="font-black text-near-black text-xl">Static QR Code</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Free — Always
                  </span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'URL is permanently embedded in the code',
                  'Cannot change destination after printing',
                  'Never expires on its own',
                  'No scan tracking or analytics',
                  'Best for: your main website, social links, menus',
                  'Use if: you never need to update the URL',
                ].map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-near-black/70">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-near-black/60">
                <strong className="text-near-black">Practical Rule:</strong> If the URL you are
                linking to will never change and you do not need data, go static. It is free and
                permanent.
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border-2 border-noble-blue/20 shadow-xl relative">
              <div className="absolute top-4 right-4 px-3 py-1 bg-noble-blue text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                Recommended
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-noble-blue/10 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-noble-blue" />
                </div>
                <div>
                  <h3 className="font-black text-near-black text-xl">Dynamic QR Code</h3>
                  <span className="text-xs font-bold text-noble-blue bg-noble-blue/10 px-2 py-0.5 rounded-full">
                    Included in Pro
                  </span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Short redirect URL — real destination updates anytime',
                  'Change website link without reprinting',
                  'Full scan analytics: device, location, time',
                  'A/B test two URLs with one printed code',
                  'Best for: business cards, packaging, invoices',
                  'Use if: you print physical materials or need data',
                ].map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-noble-blue shrink-0 mt-0.5" />
                    <span className="text-near-black/70">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-noble-blue/5 rounded-xl p-4 text-sm text-near-black/60">
                <strong className="text-near-black">Practical Rule:</strong> If you print on
                anything physical — business cards, invoices, packaging — go dynamic. Changing a URL
                later without reprinting pays for Pro by itself.
              </div>
            </div>
          </div>

          {/* Google QR Code Generator comparison */}
          <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-xl">
            <h3 className="font-black text-near-black text-2xl md:text-3xl mb-4 tracking-tight">
              How does the Google QR code generator compare?
            </h3>
            <p className="text-near-black/60 leading-relaxed mb-8">
              Google Chrome has a built-in QR code generator — right-click any page and select
              &ldquo;Create QR Code.&rdquo; It is quick. But it is also static, unbranded, untracked, and
              cannot link to a payment page. Here is the honest comparison:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="p-4 font-bold text-slate-400 uppercase tracking-widest text-xs w-1/3">
                      Capability
                    </th>
                    <th className="p-4 font-black text-noble-blue text-base border-x border-slate-100 bg-noble-blue/5 w-1/3">
                      NobleInvoice
                    </th>
                    <th className="p-4 font-bold text-slate-500 text-base w-1/3">
                      Google Chrome QR
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {comparison.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-medium text-sm">{row.feature}</td>
                      <td className="p-4 border-x border-slate-100 bg-noble-blue/5">
                        {row.noble === true ? (
                          <span className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                            <CheckCircle2 className="w-4 h-4" /> Yes
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm">{row.noble}</span>
                        )}
                      </td>
                      <td className="p-4">
                        {row.generic === true ? (
                          <span className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                            <CheckCircle2 className="w-4 h-4" /> Yes
                          </span>
                        ) : row.generic === false ? (
                          <span className="text-red-400 font-bold text-sm">✕ No</span>
                        ) : (
                          <span className="text-slate-400 text-sm">{row.generic}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. USE CASES — Where QR Codes Work ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0599D5]/8 border border-[#0599D5]/10 text-[#0599D5] font-bold text-[10px] uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0599D5] animate-pulse" />
              QR Code Use Cases
            </div>
            <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
              Where smart businesses deploy <span className="text-noble-blue">QR codes that convert.</span>
            </h2>
            <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
              A QR code is not just a link shortcut. In the right context, it is a lead capture
              tool, a payment trigger, and a data collection machine all at once.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-slate-50/80 to-white rounded-[28px] p-8 border border-slate-100 hover:border-noble-blue/20 hover:shadow-2xl transition-all duration-500"
              >
                <div className="text-4xl mb-6">{uc.icon}</div>
                <h3 className="font-black text-near-black text-xl mb-4">{uc.title}</h3>
                <p className="text-near-black/60 leading-relaxed text-sm">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 7B. INDUSTRY SPECIFIC STRATEGIES ── */}
      <section className="py-24 bg-[#F0F9FF] border-t border-near-black/5">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
              How specific industries use <span className="text-noble-blue">Dynamic QR Codes.</span>
            </h2>
            <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
              Different businesses require different strategies. Here is how our users deploy QR codes to maximize their specific workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="font-black text-near-black text-xl mb-3">Agencies & Consultants</h3>
              <p className="text-near-black/60 text-sm leading-relaxed mb-4">
                Embed a dynamic QR code in your pitch decks and PDF proposals. Link it to an interactive pricing calendar or a direct Stripe payment link to secure retainers instantly.
              </p>
              <ul className="space-y-2 text-sm text-near-black/80 font-medium">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-noble-blue" /> High-ticket invoicing</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-noble-blue" /> Calendar bookings</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="font-black text-near-black text-xl mb-3">Retail & E-commerce</h3>
              <p className="text-near-black/60 text-sm leading-relaxed mb-4">
                Place codes on product packaging or shipping inserts. Drive customers back to your site for reorders, review requests, or warranty registrations.
              </p>
              <ul className="space-y-2 text-sm text-near-black/80 font-medium">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-noble-blue" /> Product packaging</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-noble-blue" /> In-store displays</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="font-black text-near-black text-xl mb-3">Freelancers</h3>
              <p className="text-near-black/60 text-sm leading-relaxed mb-4">
                Add a payment QR code directly onto your digital or printed invoices. Clients can scan it with their phone and pay via Apple Pay in 10 seconds.
              </p>
              <ul className="space-y-2 text-sm text-near-black/80 font-medium">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-noble-blue" /> Invoice payments</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-noble-blue" /> Digital portfolios</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="font-black text-near-black text-xl mb-3">SaaS & Tech</h3>
              <p className="text-near-black/60 text-sm leading-relaxed mb-4">
                Use QR codes at events and conferences to quickly capture leads into your CRM, or bypass the app store by linking directly to a web-app onboarding flow.
              </p>
              <ul className="space-y-2 text-sm text-near-black/80 font-medium">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-noble-blue" /> Event lead capture</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-noble-blue" /> App downloads</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. INFORMATION GAIN — QR Code Size & Print Guide ── */}
      <section className="py-24 bg-[#F8FAFC] border-y border-near-black/5">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/10 text-emerald-700 font-bold text-[10px] uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Print & Size Guide
              </div>
              <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
                QR code sizes most guides get wrong.
              </h2>
              <p className="text-near-black/60 leading-relaxed mb-8">
                Print a QR code too small and it will not scan. Print it too large and it looks
                desperate. Here is the practical size framework no one talks about — tested across
                real print runs.
              </p>
              <div className="space-y-4">
                {[
                  {
                    size: '2 × 2 cm',
                    context: 'Business cards',
                    note: 'Minimum scannable size at 15cm distance',
                    color: 'bg-emerald-50 text-emerald-700',
                  },
                  {
                    size: '5 × 5 cm',
                    context: 'Invoices & packaging',
                    note: 'Comfortable scan from 30cm — the sweet spot',
                    color: 'bg-noble-blue/8 text-noble-blue',
                  },
                  {
                    size: '10 × 10 cm',
                    context: 'Leaflets & brochures',
                    note: 'Works from 60cm — good for table displays',
                    color: 'bg-amber-50 text-amber-700',
                  },
                  {
                    size: '20 × 20 cm+',
                    context: 'Posters & signage',
                    note: 'Use SVG export for sharp edges at large scale',
                    color: 'bg-purple-50 text-purple-700',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className={`px-3 py-1.5 rounded-xl font-black text-sm shrink-0 ${item.color}`}>
                      {item.size}
                    </div>
                    <div>
                      <p className="font-bold text-near-black text-sm">{item.context}</p>
                      <p className="text-near-black/50 text-xs">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl">
                <h3 className="font-black text-near-black text-xl mb-6">
                  The QR code error correction guide
                </h3>
                <p className="text-near-black/60 text-sm leading-relaxed mb-6">
                  QR codes use error correction to remain scannable even when partially obscured —
                  like when you place a logo in the center. Choose the right level for your use case:
                </p>
                <div className="space-y-4">
                  {[
                    { level: 'L — 7%', name: 'Low', use: 'Clean digital environments only. No logo overlay.', dot: 'bg-green-400' },
                    { level: 'M — 15%', name: 'Medium', use: 'General use. Tolerates minor dirt or damage.', dot: 'bg-blue-400' },
                    { level: 'Q — 25%', name: 'Quartile', use: 'Recommended for small logo overlays.', dot: 'bg-amber-400' },
                    { level: 'H — 30%', name: 'High', use: 'Use when placing a large logo (30% of area) in center.', dot: 'bg-purple-400' },
                  ].map((ec, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={`w-3 h-3 rounded-full ${ec.dot} shrink-0 mt-1.5`} />
                      <div>
                        <p className="font-black text-sm text-near-black">
                          {ec.level} — {ec.name}
                        </p>
                        <p className="text-xs text-near-black/50">{ec.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-noble-blue/5 rounded-xl p-4 text-sm text-near-black/60">
                  <strong className="text-noble-blue">NobleInvoice default:</strong> We use Level H
                  automatically so your logo always fits without breaking scannability.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── 8B. 5-POINT PRE-PRINT CHECKLIST ── */}
      <section className="py-24 bg-white border-y border-near-black/5">
        <div className="max-w-[1000px] mx-auto px-4 md:px-16">
          <div className="bg-gradient-to-br from-near-black to-slate-800 rounded-[40px] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-noble-blue/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest mb-8">
              Exclusive Resource
            </div>
            
            <h2 className="font-inter text-3xl md:text-4xl font-black leading-[1.1] tracking-tight mb-4">
              The 5-Point Pre-Print QR Code Checklist
            </h2>
            <p className="text-white/60 mb-10 max-w-xl">
              Do not send anything to the printer until you have checked these five critical points. A broken QR code on 5,000 printed flyers is an expensive mistake.
            </p>

            <div className="space-y-4">
              {[
                { title: '1. The Contrast Rule', desc: 'Always keep the foreground darker than the background. Light QR codes on dark backgrounds often fail to scan on older devices.' },
                { title: '2. The Quiet Zone', desc: 'Maintain a clear margin (the "quiet zone") around the code. It should be at least 4 modules (blocks) wide. No text or graphics can enter this space.' },
                { title: '3. Error Correction Level', desc: 'If adding a logo to the center, ensure your error correction is set to Level H (30%) so the missing data blocks are mathematically recovered.' },
                { title: '4. The Sizing Formula', desc: 'Scan distance divided by 10. If users scan from 50cm away, the code must be at least 5x5cm. Never go below 2x2cm for print.' },
                { title: '5. The Multi-Device Test', desc: 'Scan the proof on an iPhone 12 or newer, AND a 4-year-old Android device. If both scan it in under 2 seconds, you are ready to print.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-electric-cyan text-near-black flex items-center justify-center font-black shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. CASE STUDY / SOCIAL PROOF ── */}
      <section className="py-24 bg-noble-blue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-inter text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
              QR codes that turn scans into revenue.
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
              Real results from businesses using NobleInvoice QR codes to collect payments, capture
              leads, and grow their client base.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-[32px] p-8 border border-white/20">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-medium leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-sm shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <p className="font-black text-lg">{t.name}</p>
                    <p className="text-white/60 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 border-y border-white/20 py-16">
            <div className="text-center">
              <p className="text-6xl md:text-8xl font-black mb-4">
                80<span className="text-3xl">%</span>
              </p>
              <p className="text-white/80 font-medium text-lg">
                Higher scan rate — branded vs. generic codes
              </p>
            </div>
            <div className="md:border-x border-white/20 text-center">
              <p className="text-6xl md:text-8xl font-black mb-4 text-electric-cyan">
                2×
              </p>
              <p className="text-white/80 font-medium text-lg">
                Faster payment collection with QR-linked invoices
              </p>
            </div>
            <div className="text-center">
              <p className="text-6xl md:text-8xl font-black mb-4">
                95<span className="text-3xl">%</span>
              </p>
              <p className="text-white/80 font-medium text-lg">
                Of businesses now use QR codes for first-party data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. NOT FOR YOU — Qualifier ── */}
      <section className="py-24 bg-gradient-to-b from-[#FFFBF5] to-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-16">
          <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest mb-8">
              Honest Assessment
            </div>
            <h2 className="font-inter text-3xl md:text-4xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
              We may not be right for you if…
            </h2>
            <div className="space-y-4">
              {[
                'You only need one static QR code and will never need to change the URL — use Google Chrome&rsquo;s built-in generator. It is free and takes 10 seconds.',
                'You do not collect payments, track leads, or use physical marketing materials. A plain QR code from any free generator does the job.',
                'You are a large enterprise with a dedicated IT team that already has QR infrastructure built into your stack.',
                'You are just curious about QR codes but have no actual use case yet.',
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-slate-300 mt-2.5 shrink-0" />
                  <p
                    className="text-near-black/60 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-near-black/60 leading-relaxed">
                NobleInvoice QR codes are built for businesses that move money — freelancers,
                agencies, consultants, and service providers who want every scan to either pay them
                or inform their next decision. If that is you, let&apos;s go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ Section ── */}
      <section className="py-24 bg-[#F8FAFC] border-t border-near-black/5">
        <div className="max-w-[800px] mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
              Frequently Asked Questions
            </div>
            <h2 className="font-inter text-4xl lg:text-5xl font-black text-near-black leading-[1.1] tracking-tight">
              How to make a QR code for a website,{' '}
              <span className="text-noble-blue">your real questions answered.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How do I make a QR code for my website for free?',
                a: "Open NobleInvoice, go to Lead Intelligence → QR Generator, paste your URL, and download. Free static QR codes require no account. Dynamic codes with analytics are included in Pro.",
              },
              {
                q: 'Can I use a free QR code generator without it expiring?',
                a: "Static QR codes from NobleInvoice never expire — the URL is baked in permanently. Dynamic QR codes stay live as long as your account is active. We never delete or break your codes without notice.",
              },
              {
                q: 'How do I make a QR code for a website without an app?',
                a: "NobleInvoice is fully browser-based. Open it on any phone, tablet, or computer, generate your QR code, and download. No app install needed.",
              },
              {
                q: 'What is a Google QR code generator and can it track scans?',
                a: "Google Chrome can generate a basic static QR code for any webpage via the share icon. It cannot track scans, customize the design, or link to a payment page. For business use, NobleInvoice gives you all of that.",
              },
              {
                q: 'Can I add a logo to my QR code without breaking it?',
                a: "Yes. NobleInvoice uses Level H error correction by default, which allows up to 30% of the QR pattern to be covered by a logo. Your code remains fully scannable with a logo up to that size.",
              },
              {
                q: 'Do I need a QR code scanner app?',
                a: "No. Modern Android and iPhone cameras scan QR codes natively — just open the camera app and point it at the code. No separate QR code scanner app is needed.",
              },
              {
                q: 'Can a QR code link directly to my payment page?',
                a: "Yes. Every QR code you generate in NobleInvoice can link to any URL — including your secure payment portal. Clients scan and pay by card, Apple Pay, or Google Pay without needing an account.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-[20px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <h3 className="font-black text-near-black text-base leading-snug">{faq.q}</h3>
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-open:bg-noble-blue/10 transition-colors">
                    <span className="text-slate-400 group-open:text-noble-blue font-black text-lg leading-none transition-all group-open:rotate-45">+</span>
                  </div>
                </summary>
                <div className="px-6 pb-6 text-near-black/60 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FINAL CTA ── */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-noble-blue/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-50/30 blur-[150px] rounded-full" />
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-noble-blue/5 border border-noble-blue/10 text-blue-800 font-black text-[10px] uppercase tracking-[0.3em] mb-12">
            Start Generating Free QR Codes
          </div>
          <h2 className="font-inter text-near-black mb-12 tracking-tight leading-[1.1] font-black"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 80px)' }}>
            Make your first QR code. <br />
            <span className="text-noble-blue">Make it work for your business.</span>
          </h2>
          <p className="text-xl text-slate-500 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
            Free to start. No credit card. No design skills. Your branded, trackable QR code is
            two minutes away.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <Link
              id="final-cta-qr"
              href="/register"
              className="text-white px-12 py-6 text-xl font-black rounded-[24px] hover:opacity-90 hover:scale-105 transition-all shadow-2xl shadow-noble-blue/30 flex items-center justify-center gap-3"
              style={{ backgroundColor: '#166FBB' }}
            >
              Generate My Free QR Code
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              id="final-cta-login"
              href="/login"
              className="text-near-black/60 hover:text-near-black transition-colors text-xl font-black underline underline-offset-8 decoration-noble-blue/30"
            >
              Already a member? Log in
            </Link>
          </div>
          <p className="mt-8 text-xs text-near-black/30 font-bold uppercase tracking-widest">
            Free plan · No credit card · Pro from $9/month
          </p>
        </div>
      </section>
    </div>
  );
}

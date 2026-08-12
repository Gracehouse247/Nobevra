import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Share2,
  BarChart3,
  Globe,
  TrendingUp,
  CreditCard,
  QrCode,
  Smartphone,
  Star,
  Users,
  Eye,
  Layout,
  Palette,
  Link as LinkIcon,
  Printer
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Business Card Creation Free | NobleInvoice',
  description:
    'Enjoy business card creation free of charge. Design stunning digital cards, track scans, and generate leads effortlessly today.',
  keywords: [
    'business card creation free',
    'business card creation free template',
    'business card creation free printable',
    'visiting card maker online free',
    'small business card creation free',
    'business card creation free online',
    'AI business card generator free',
    'digital business cards',
    'NFC business card'
  ],
};

export default function DigitalBusinessCardsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this business card creation free online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. NobleInvoice provides a free online business card creation tool. You can choose a professional template, customize your colors, add your logo, and generate your digital card without paying a dime.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I create a business card for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Creating a business card for free is simple: 1. Sign up for NobleInvoice. 2. Choose a free business card template. 3. Customize it with your logo and colors. 4. Connect your payment and calendar links. 5. Share via QR code, Apple Wallet, or Google Pay.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use this as a visiting card maker online free for my team?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Absolutely. You can generate free visiting cards for your entire team. For advanced features like team CRM syncing and role-based tracking, our Pro plan is available, but basic creation is entirely free.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer a business card creation free printable format?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. While we specialize in digital business cards with QR codes and NFC, you can download your free business card design as a high-resolution PDF with bleed lines, ready for any local print shop.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the AI business card generator free work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Our AI business card generator pulls your NobleInvoice profile data and automatically formats it into a highly converting design. It suggests colors and layout options to maximize readability and professionalism instantly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the CRM integration cost money?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Basic lead capture and CRM integration is included for free. Whenever someone scans your digital business card and submits their information, it is automatically synced to your dashboard.',
        },
      },
    ],
  };

  const testimonials = [
    {
      quote: "Our marketplace generates hundreds of global leads daily. NobleInvoice's Lead Intelligence and Digital Cards let us track intent perfectly, connecting marketing right to our revenue pipeline.",
      name: 'Ayasha Khan',
      role: 'Marketing Director, NobleMart',
      image: '/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png',
      stars: 5,
    },
    {
      quote: "Tracking networking expenses and contacts used to be a nightmare. The digital cards categorize everything automatically across our team, saving us hours each week.",
      name: 'Beautrice Moreau',
      role: 'Operations Manager, Eagles Media',
      image: '/images/reviews/beautrice-moreau-operations-manager-at-eagles-media.png',
      stars: 5,
    },
  ];

  const steps = [
    {
      icon: <Smartphone className="w-6 h-6 text-noble-blue" />,
      title: 'Design In Minutes',
      desc: 'Leverage our AI business card generator free of charge, or pick a custom template. No graphic design degree required.',
    },
    {
      icon: <Share2 className="w-6 h-6 text-noble-blue" />,
      title: 'Share Instantly',
      desc: 'Hand it over via Apple Wallet, Google Pay, QR code, or NFC tap. Zero friction.',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-noble-blue" />,
      title: 'Track Engagement',
      desc: 'See exactly when a prospect views your card, what links they click, and where they are located.',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-noble-blue" />,
      title: 'Close The Deal',
      desc: 'Turn a card scan directly into an active lead profile, send an invoice, and get paid.',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
      <Script
        id="faq-schema-digital-cards"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-12 pb-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Free Digital Business Card Maker
            </div>

            <h1 className="font-inter text-near-black mb-6 text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black">
              Business Card Creation, Free. <span className="text-noble-blue">Lead Capture, Automatic.</span>
            </h1>

            <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
              Stop handing out paper that gets thrown away. Design a professional digital business card that connects instantly to your CRM, tracks views, and lets clients pay you directly. Our platform offers seamless business card creation free online, so you can focus on building relationships rather than wrestling with design software.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/register"
                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: '#166FBB' }}
              >
                Create Free Card Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest mb-10">
              No credit card required · Free plan available · Cancel anytime
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 border-t border-near-black/5 pt-8">
               <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <span key={i} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-[11px] font-bold text-near-black/50">
                    Trusted by <span className="text-near-black font-black">global</span> businesses worldwide
                  </p>
               </div>
            </div>
          </div>

          {/* Stunning Cards Hero Collage Visual */}
          <div className="relative flex justify-center items-center lg:pl-10 h-full min-h-[400px]">
            {/* Card 1 (Back/Left) */}
            <div className="absolute left-0 top-1/4 w-[280px] aspect-[1.75] rounded-2xl shadow-2xl -rotate-12 hover:rotate-0 hover:z-30 hover:scale-110 transition-all duration-500 z-10 border border-slate-200 overflow-hidden">
               <Image src="/images/templates/business-cards/best/1.jpg" alt="business card creation free" fill className="object-cover" />
            </div>
            
            {/* Card 2 (Center/Front) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[340px] aspect-[1.75] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] hover:scale-110 hover:z-30 transition-all duration-500 z-20 border-2 border-white overflow-hidden">
               <Image src="/images/templates/business-cards/best/2.jpg" alt="business card creation free" fill className="object-cover" />
               {/* Floating Success Badge */}
               <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-slate-100 flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5 text-green-500" />
                 <span className="text-xs font-black text-near-black uppercase">Lead Captured</span>
               </div>
            </div>

            {/* Card 3 (Back/Right) */}
            <div className="absolute right-0 bottom-1/4 w-[280px] aspect-[1.75] rounded-2xl shadow-2xl rotate-12 hover:rotate-0 hover:z-30 hover:scale-110 transition-all duration-500 z-10 border border-slate-200 overflow-hidden">
               <Image src="/images/templates/business-cards/best/3.jpg" alt="business card creation free" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INFORMATION GAIN: THE POST-HANDSHAKE REVENUE TRAP ── */}
      <section className="py-24 bg-[#0A1128] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-noble-blue/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-4 md:px-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest mb-8">
            The Industry Reality
          </div>
          <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-8">
            The Post-Handshake <span className="text-red-400">Revenue Trap.</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                <p className="text-lg text-white/70 leading-relaxed mb-6 font-medium">
                   Most visiting card maker online free tools are just graphic design software. They help you make a pretty rectangle, and then leave you to figure out the hard part: getting paid.
                </p>
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                   <strong className="text-white">The hard truth:</strong> 88% of traditional paper business cards are thrown away within a week. You are handing out your contact info into a black hole. We designed a system that turns a handshake into an active CRM lead.
                </p>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                   <h3 className="font-black text-xl mb-4 text-electric-cyan">Graphic Design Cards vs. Revenue Cards</h3>
                   <ul className="space-y-4">
                      <li className="flex gap-3 text-sm text-white/60">
                         <span className="text-red-400 font-bold">✕</span> 
                         Ends up in a desk drawer.
                      </li>
                      <li className="flex gap-3 text-sm font-bold text-white">
                         <span className="text-green-400">✓</span> 
                         Saves directly to prospect's phone via Apple/Google Wallet.
                      </li>
                      <li className="flex gap-3 text-sm text-white/60">
                         <span className="text-red-400 font-bold">✕</span> 
                         No data on who looks at it.
                      </li>
                      <li className="flex gap-3 text-sm font-bold text-white">
                         <span className="text-green-400">✓</span> 
                         Real-time tracking of when they view your profile.
                      </li>
                   </ul>
                </div>
             </div>
             
             <div className="relative">
                <div className="bg-gradient-to-b from-white/10 to-transparent rounded-[40px] p-1 border border-white/10">
                   <div className="bg-[#121B36] rounded-[38px] p-8">
                      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                         <div>
                            <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Scan Tracking</p>
                            <p className="text-3xl font-black text-white">2,419</p>
                         </div>
                         <TrendingUp className="w-8 h-8 text-emerald-400" />
                      </div>
                      
                      <div className="space-y-4">
                         {[
                            { name: 'David Smith', action: 'Saved Contact', time: '2 mins ago', icon: <Smartphone className="w-4 h-4 text-white" /> },
                            { name: 'Amanda Chen', action: 'Viewed Portfolio', time: '1 hour ago', icon: <Eye className="w-4 h-4 text-white" /> },
                            { name: 'Marcus Johnson', action: 'Paid Retainer Invoice', time: 'Yesterday', icon: <CreditCard className="w-4 h-4 text-white" /> },
                         ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/5">
                               <div className="w-10 h-10 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                                  {item.icon}
                               </div>
                               <div>
                                  <p className="font-bold text-sm text-white">{item.name}</p>
                                  <p className="text-xs text-white/50">{item.action} • {item.time}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* ── 2.5 THE DESIGN STUDIO & TEMPLATES ── */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest mb-4">
              Top Features of Our Free Business Card Creator
            </div>
            <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
              Your complete <span className="text-noble-blue">business card creation free</span> guide.
            </h2>
            <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
              We provide the tools. You provide the brand. Generate stunning digital cards that command respect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                <Layout className="w-6 h-6 text-noble-blue" />
              </div>
              <h3 className="font-black text-2xl text-near-black mb-4">1. Choose your layout</h3>
              <p className="text-near-black/60 leading-relaxed">
                Start with a blank canvas or select from our high-converting layouts. Whether you need a minimal vCard or a detailed portfolio view, our flexible grid system adapts instantly to your content.
              </p>
            </div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                <Palette className="w-6 h-6 text-noble-blue" />
              </div>
              <h3 className="font-black text-2xl text-near-black mb-4">2. Inject your brand identity</h3>
              <p className="text-near-black/60 leading-relaxed">
                Upload your high-resolution logo, set your exact hex color codes, and pick from premium typography. Your free business card will look like you hired a $10k/month agency to design it.
              </p>
            </div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                <LinkIcon className="w-6 h-6 text-noble-blue" />
              </div>
              <h3 className="font-black text-2xl text-near-black mb-4">3. Connect your revenue links</h3>
              <p className="text-near-black/60 leading-relaxed">
                This is where graphic design meets business. Add your direct payment links, CRM intake forms, calendar scheduling, and social profiles directly into the card structure.
              </p>
            </div>
          </div>

          {/* Interactive Template Showcase */}
          <div className="bg-slate-50 rounded-[40px] p-8 md:p-16 border border-slate-100">
            <h3 className="text-center font-black text-3xl mb-4 text-near-black">Free Business Card Templates for Every Industry</h3>
            <p className="text-center text-near-black/60 max-w-2xl mx-auto mb-12">Whether you need a sleek layout for consulting or a vibrant design for an agency, every business card creation free template we offer is professionally crafted to match your brand.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Real Estate Authority', file: 'grid1.png', desc: 'Perfect for realtors and brokers.' },
                { name: 'Tech Startup', file: 'grid2.png', desc: 'Sleek dark mode for founders.' },
                { name: 'Contractor Pro', file: 'grid3.png', desc: 'Bold and clear for field services.' },
                { name: 'Consulting Executive', file: 'grid4.jpg', desc: 'Minimalist trust-building design.' },
                { name: 'Freelancer Vibrant', file: 'grid5.jpg', desc: 'Creative and colorful layout.' },
                { name: 'Agency Bold', file: 'grid6.jpg', desc: 'Modern typography and spacing.' },
                { name: 'Health & Wellness', file: 'grid7.png', desc: 'Calming and approachable.' },
                { name: 'Legal Services', file: 'grid8.png', desc: 'Traditional and highly professional.' },
                { name: 'Finance & Wealth', file: 'grid9.jpg', desc: 'Premium style for advisors.' },
              ].map((template, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                  <div className="relative aspect-[1.75] rounded-2xl mb-6 overflow-hidden bg-slate-100">
                     <Image 
                       src={`/images/templates/${template.file}`} 
                       alt="business card creation free"
                       fill 
                       className="object-cover group-hover:scale-105 transition-transform duration-500" 
                     />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-near-black">{template.name}</p>
                      <p className="text-sm text-near-black/60">{template.desc}</p>
                    </div>
                    <p className="text-xs font-bold text-noble-blue uppercase tracking-wider shrink-0 mt-1">Free</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FRAMEWORK PROCESS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
              How to Use Our <span className="text-noble-blue">Free Digital Business Card Maker</span>.
            </h2>
            <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
              Our small business card creation free framework is built to get you networking in minutes, not hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-noble-blue/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
                   {step.icon}
                </div>
                <h3 className="font-black text-near-black text-xl mb-4">{step.title}</h3>
                <p className="text-near-black/60 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3.5 PRINT VS DIGITAL ROI ── */}
      <section className="py-24 bg-[#0A1128] text-white">
        <div className="max-w-[1000px] mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-inter text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-6">
              Print vs. Digital: The true cost of a <span className="text-electric-cyan">free business card</span>.
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Think printing is cheap? If you need a business card creation free printable option, we support that too with high-res PDF exports, but let's look at the numbers of true digital ROI.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-sm">
            <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/5">
              <div className="font-bold text-white/50 uppercase tracking-widest text-sm">Feature</div>
              <div className="font-black text-white text-lg flex items-center gap-2"><Printer className="w-5 h-5 text-slate-400" /> Paper Cards</div>
              <div className="font-black text-electric-cyan text-lg flex items-center gap-2"><Smartphone className="w-5 h-5" /> NobleInvoice Digital</div>
            </div>
            
            {[
              { label: 'Initial Design Cost', print: 'Free (if you DIY)', digital: 'Free (AI Generated)' },
              { label: 'Printing & Shipping', print: '$30 - $100+ per batch', digital: '$0 forever' },
              { label: 'Updating Information', print: 'Throw away & reprint ($$)', digital: 'Instant update (Free)' },
              { label: 'Analytics & Tracking', print: 'None (Black hole)', digital: 'Real-time scan data' },
              { label: 'CRM Integration', print: 'Manual data entry', digital: 'Automatic sync' },
              { label: 'Conversion Rate', print: '< 2% (most thrown away)', digital: 'Up to 45% (Saved to phone)' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                <div className="font-medium text-white/80">{row.label}</div>
                <div className="text-white/50">{row.print}</div>
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  {row.digital}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SOCIAL PROOF WITH IMAGES ── */}
      <section className="py-24 bg-[#F8FAFC] border-y border-near-black/5 relative overflow-hidden">
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
              Networking success stories.
            </h2>
            <p className="text-xl text-near-black/60 max-w-2xl mx-auto font-medium">
              Real results from businesses using NobleInvoice digital business cards to capture leads and grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-medium leading-relaxed mb-8 text-near-black/80">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      width={56}
                      height={56}
                    />
                  </div>
                  <div>
                    <p className="font-black text-lg text-near-black">{t.name}</p>
                    <p className="text-near-black/50 text-sm font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. NOT FOR YOU - QUALIFIER ── */}
      <section className="py-24 bg-gradient-to-b from-[#FFFBF5] to-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-16">
          <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest mb-8">
              Honest Assessment
            </div>
            <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
              We may not be right for you if…
            </h2>
            <div className="space-y-4">
              {[
                'You just want a graphic design tool to make a PDF. There are plenty of basic vector tools for that. We build business systems.',
                'You do not care about tracking who scans your card or generating leads.',
                'You already have an expensive enterprise CRM and just want basic printed cards without the digital intelligence.',
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-slate-300 mt-2.5 shrink-0" />
                  <p className="text-near-black/60 leading-relaxed text-lg">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-near-black/80 font-medium leading-relaxed text-lg">
                NobleInvoice digital cards are built for consultants, freelancers, and service businesses who want every networking event to directly feed their revenue pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ SECTION ── */}
      <section className="py-24 bg-[#F8FAFC] border-t border-near-black/5">
        <div className="max-w-[800px] mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] tracking-tight">
              Business card creation free,{' '}
              <span className="text-noble-blue">your real questions answered.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {jsonLd.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-[20px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <h3 className="font-black text-near-black text-base leading-snug">{faq.name}</h3>
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-open:bg-noble-blue/10 transition-colors">
                    <span className="text-slate-400 group-open:text-noble-blue font-black text-lg leading-none transition-all group-open:rotate-45">+</span>
                  </div>
                </summary>
                <div className="px-6 pb-6 text-near-black/60 leading-relaxed">{faq.acceptedAnswer.text}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ── */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-noble-blue/5 blur-[180px] rounded-full" />
        <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center relative z-10">
          <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl text-near-black mb-8 tracking-tight leading-[1.1] font-black">
            Generate your free card. <br />
            <span className="text-noble-blue">Capture your next lead.</span>
          </h2>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Free to start. No credit card. Your branded, trackable digital business card is two minutes away.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <Link
              href="/register"
              className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: '#166FBB' }}
            >
              Start Free Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

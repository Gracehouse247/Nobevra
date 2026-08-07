const fs = require('fs');

const file = 'c:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\app\\(public)\\features\\lead-intelligence\\page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add import
if (!content.includes('LeadIntelligenceHeroVisual')) {
  content = content.replace(
    "} from 'lucide-react';",
    "} from 'lucide-react';\nimport LeadIntelligenceHeroVisual from '@/components/landing/LeadIntelligenceHeroVisual';"
  );
}

// 2. Replace Hero visual
const heroStart = '          {/* Right: Interactive QR Preview Visual */}';
const heroEnd = '          </div>\n        </div>\n      </section>';

const startIdx = content.indexOf(heroStart);
const endIdx = content.indexOf(heroEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + 
            '          {/* Right: Interactive QR Preview Visual */}\n' +
            '          <LeadIntelligenceHeroVisual />\n' +
            '        </div>\n      </section>' +
            content.substring(endIdx + heroEnd.length);
} else {
    console.log("Hero section not found");
}

// 3. Add Industry Specific Strategies before Section 8
const sec8Start = '      {/* ── 8. INFORMATION GAIN — QR Code Size & Print Guide ── */}';

const industrySection = `
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

`;

if (!content.includes('7B. INDUSTRY SPECIFIC STRATEGIES')) {
  content = content.replace(sec8Start, industrySection + sec8Start);
}

// 4. Add 5-Point Checklist after Section 8 but before Section 9
const sec9Start = '      {/* ── 9. CASE STUDY / SOCIAL PROOF ── */}';

const checklistSection = `
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

`;

if (!content.includes('8B. 5-POINT PRE-PRINT CHECKLIST')) {
  content = content.replace(sec9Start, checklistSection + sec9Start);
}

fs.writeFileSync(file, content, 'utf8');
console.log("Successfully updated page.tsx with 3 new sections.");

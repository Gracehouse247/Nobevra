import React from 'react';
import { Globe2, Code2, Users2, Shield, CheckCircle2, TrendingUp, Lock } from 'lucide-react';

const features = [
    {
        icon: Users2,
        title: 'Enterprise invoice management workspace',
        desc: 'Onboard your entire finance, sales, and operations departments into a single, cohesive environment. Our enterprise invoice management suite provides multi-user access with granular role-based permissions (RBAC). Every invoice generated, modified, or canceled is tracked in a secure, immutable audit trail, ensuring complete accountability across your corporate billing solutions.',
        bullets: ['Unlimited team members', 'Role-based access control', 'Immutable audit logging'],
        tag: 'Corporate Billing',
        color: 'bg-noble-blue/10 text-noble-blue group-hover:bg-noble-blue group-hover:text-white',
    },
    {
        icon: Globe2,
        title: 'Multi currency invoicing software',
        desc: 'Expand globally without the FX headache. Bill clients natively in any of 160+ supported currencies. Our multi currency invoicing software uses real-time interbank exchange rates to calculate the exact settlement amount. This eliminates the usual 2-3% hidden conversion fees charged by legacy processors, protecting your margins on international enterprise deals.',
        bullets: ['160+ currencies supported', 'Real-time interbank FX rates', 'Automated cross-border reports'],
        tag: 'Global Settlements',
        color: 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white',
    },
    {
        icon: Code2,
        title: 'API invoicing integration',
        desc: 'Build NobleInvoice directly into your proprietary ecosystem. Our robust RESTful API invoicing integration allows your developers to trigger invoice creation, track live payment statuses, and execute complex billing schedules directly from your CRM or custom SaaS backend. Stream events in real-time using secure webhooks to keep your databases perfectly synced.',
        bullets: ['RESTful developer API', 'Real-time webhook event streams', 'Custom ERP integrations'],
        tag: 'API Integration',
        color: 'bg-violet-500/10 text-violet-600 group-hover:bg-violet-500 group-hover:text-white',
    },
    {
        icon: Shield,
        title: 'Automated global compliance suite',
        desc: 'Navigating international tax law shouldn\'t stall your revenue. Our platform features automated tax calculations, instant VAT/GST reporting, and region-specific invoice formatting. Built to the stringent standards your legal team demands, it includes customizable white-label portals for your enterprise contracts to maintain brand consistency.',
        bullets: ['Automated tax & VAT reporting', 'GDPR & CCPA compliant', 'Custom white-label portals'],
        tag: 'Compliance',
        color: 'bg-slate-900/10 text-slate-700 group-hover:bg-slate-900 group-hover:text-white',
    },
    {
        icon: TrendingUp,
        title: 'High-volume accounts receivable',
        desc: 'Processing thousands of recurring charges a month requires heavy lifting. Our bulk generation engine and dynamic accounts receivable tools automate the entire collection lifecycle. From intelligent payment routing that maximizes success rates to automated dunning sequences that chase failed payments, your receivables keep flowing without manual intervention.',
        bullets: ['Bulk invoice processing', 'Automated dunning sequences', 'AR aging & cohort dashboards'],
        tag: 'Accounts Receivable',
        color: 'bg-amber-400/10 text-amber-600 group-hover:bg-amber-400 group-hover:text-white',
    },
    {
        icon: Lock,
        title: 'Enterprise security & data sovereignty',
        desc: 'Your financial data is protected by bank-grade security protocols. We operate on a SOC 2 Type II certified infrastructure. For highly regulated industries, we offer dedicated private data residency options, ensuring your information never crosses restricted borders. Connect seamlessly with your corporate identity provider using SAML/SSO.',
        bullets: ['SOC 2 Type II certified', 'Private regional data residency', 'SAML/Single sign-on (SSO)'],
        tag: 'Enterprise Security',
        color: 'bg-red-500/10 text-red-600 group-hover:bg-red-500 group-hover:text-white',
    },
];

export default function EnterpriseDeliverables() {
    return (
        <section className="py-24 md:py-32 bg-noble-surface border-t border-slate-100" aria-labelledby="features-heading">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 id="features-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                        Enterprise-grade. <span className="text-noble-blue">Startup-simple.</span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed font-medium">
                        Every feature your finance director, CTO, and legal team will ask for — delivered through corporate billing solutions that don't require a 6-month implementation timeline.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f) => (
                        <div key={f.title} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:border-noble-blue/20 hover:shadow-xl transition-all group flex flex-col h-full">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all ${f.color}`}>
                                <f.icon className="w-6 h-6" />
                            </div>
                            <span className="inline-flex px-2.5 py-0.5 self-start bg-noble-surface rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 border border-slate-100">{f.tag}</span>
                            <h3 className="font-black text-noble-text text-xl mb-3">{f.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm mb-6 font-medium">{f.desc}</p>
                            <ul className="space-y-3 mt-auto pt-6 border-t border-noble-border/60">
                                {f.bullets.map(b => (
                                    <li key={b} className="flex items-start gap-2 text-sm text-slate-700 font-bold leading-snug">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import React from 'react';
import { Repeat, Users, Palette, BarChart3, Clock, Bell, CheckCircle2 } from 'lucide-react';

const features = [
    {
        icon: Repeat,
        title: 'Retainer billing software',
        tag: 'Retainer Automation',
        desc: 'Set your monthly retainer once and let the system handle the rest. NobleInvoice automatically generates and sends the invoice on your chosen billing date. It handles pro-rated first months and recurring overages flawlessly.',
        bullets: ['Auto-generate monthly invoices', 'Prorated billing support', 'Recurring expense tracking'],
        color: 'bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white',
    },
    {
        icon: Users,
        title: 'Agency CRM and invoicing',
        tag: 'Client Management',
        desc: 'Manage every client account from a single, clean dashboard. Know exactly which clients have active retainers, which are on fixed-bid projects, and who is overdue on their payments. Centralized billing intelligence for your whole team.',
        bullets: ['Unlimited client profiles', 'Contact role management', 'Client-specific billing rules'],
        color: 'bg-blue-500/10 text-blue-600 group-hover:bg-blue-500 group-hover:text-white',
    },
    {
        icon: Palette,
        title: 'Invoice software for digital agencies',
        tag: 'Creative Invoicing',
        desc: 'Your invoices should look as good as the work you deliver. Our platform allows for deep customization of your invoice templates. Add your branding, set exact color hex codes, and structure the line items to match your project proposals.',
        bullets: ['Custom brand styling', 'Proposal-matching line items', 'Multi-currency support'],
        color: 'bg-violet-500/10 text-violet-600 group-hover:bg-violet-500 group-hover:text-white',
    },
    {
        icon: Clock,
        title: 'Time & scope tracking',
        tag: 'Billable Hours',
        desc: 'When a client asks for work outside the retainer, log the time directly against their profile. When the monthly retainer invoice generates, the system automatically appends these out-of-scope billable hours as separate line items.',
        bullets: ['Overage hourly tracking', 'Auto-append to retainers', 'Custom hourly rates per staff'],
        color: 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white',
    },
    {
        icon: Bell,
        title: 'Automated dunning & reminders',
        tag: 'Payment Collection',
        desc: 'Chasing payments damages client relationships. Our marketing agency invoicing tool sends polite, automated follow-ups based on your exact schedule (e.g., 3 days before due, on due date, 5 days late). Let the software be the bad guy.',
        bullets: ['Custom reminder schedules', 'Late fee automation', 'Read receipts for invoices'],
        color: 'bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white',
    },
    {
        icon: BarChart3,
        title: 'Project profitability tracking',
        tag: 'Agency Analytics',
        desc: 'See exactly which clients are highly profitable and which are draining your resources. Track your overall Monthly Recurring Revenue (MRR) from retainers and forecast cash flow based on outstanding accounts receivable.',
        bullets: ['Real-time MRR dashboards', 'Client profitability metrics', 'AR aging reports'],
        color: 'bg-slate-700/10 text-slate-700 group-hover:bg-slate-800 group-hover:text-white',
    },
];

export default function AgencyDeliverables() {
    return (
        <section className="py-24 md:py-32 bg-noble-surface border-t border-slate-100" aria-labelledby="features-heading">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 id="features-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                        Everything your agency needs. <span className="text-noble-blue">Nothing it doesn't.</span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed font-medium">
                        The complete <strong>agency billing platform</strong> built to manage retainers, track overages, and look premium doing it.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f) => (
                        <div key={f.title} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:border-indigo-500/20 hover:shadow-xl transition-all group flex flex-col h-full">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all ${f.color}`}>
                                <f.icon className="w-6 h-6" />
                            </div>
                            <span className="inline-flex self-start px-2.5 py-0.5 bg-noble-surface rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 border border-slate-100">{f.tag}</span>
                            <h3 className="font-black text-noble-text text-xl mb-3">{f.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm mb-6 font-medium">{f.desc}</p>
                            <ul className="space-y-2.5 mt-auto pt-6 border-t border-noble-border/70">
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

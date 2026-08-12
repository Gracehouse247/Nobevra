import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const reviews = [
    {
        quote: "We unified our entire marketing agency's billing under the Elite Team Workspace. Role-based access ensures our accountants and creatives can collaborate securely.",
        name: "Samuel",
        role: "CEO, BodyFit Marketing & Sport Ltd.",
        image: "/images/reviews/samuel-ceo-of-bodyfit-marketing-sport-ltd.png",
    },
    {
        quote: "The CRM engine keeps all our consulting engagements perfectly tracked. Knowing exactly when a client views an invoice saves us countless follow-up emails.",
        name: "Celestine Nzubbychukwu",
        role: "Founder, MyStaff Consulting Limited",
        image: "/images/reviews/celestine-nzubbychukwu-founder-of-mystaff-consulting-limited.png",
    },
    {
        quote: "The Growth Reports dashboard provides our UK operations with incredible insights. The lifetime value mapping is top-tier for our B2B strategy.",
        name: "Micheal C.",
        role: "Business Strategist, Pure Insight UK",
        image: "/images/reviews/micheal-c-business-strategist-of-pure-insight-uk.png",
    },
];

export default function AgencyCaseStudy() {
    return (
        <section className="py-24 md:py-32 bg-noble-surface border-t border-slate-100" aria-labelledby="reviews-heading">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 id="reviews-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                        Agencies that made the switch.
                    </h2>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        Join thousands of marketing agencies and creative studios who have stopped leaking billable hours.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((r, i) => (
                        <div key={i} className="bg-slate-50 rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex gap-0.5 mb-6">
                                {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                            </div>
                            <blockquote className="text-slate-700 font-medium leading-relaxed mb-8 text-base">"{r.quote}"</blockquote>
                            <div className="flex items-center gap-4 mt-auto">
                                <Image src={r.image} alt={r.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-noble-border" />
                                <div>
                                    <p className="font-black text-noble-text text-sm uppercase">{r.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{r.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

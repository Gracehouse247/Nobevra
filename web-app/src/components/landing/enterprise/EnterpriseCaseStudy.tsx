import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const reviews = [
    {
        quote: "NobleInvoice completely streamlined our logistics billing. With the API integrations, our high-volume transactions are processed flawlessly every single day. We re-allocated 4 developers back to our core product.",
        name: "McGerald Olfordile",
        role: "CEO, Rapidbox Limited",
        image: "/images/reviews/mcgerald-olfordile-ceo-of-rapidbox-limited.png",
    },
    {
        quote: "Scaling our manufacturing operations required a robust enterprise invoice management system. NobleInvoice connects our client pipelines directly to our massive inventory ledgers effortlessly.",
        name: "Timileyin Oluwafemi",
        role: "CEO, Ceejee Foam",
        image: "/images/reviews/timileyin-oluwafemi-ceo-of-ceejee-foam.jpeg",
    },
    {
        quote: "Managing international distribution requires flawless global settlements. The interbank conversion rates have saved our Asian supply chains thousands in hidden fees.",
        name: "Kenji Tanaka",
        role: "China Sales Manager, Bodyfit Ventures",
        image: "/images/reviews/kenji-tanaka-china-sales-manager-of-bodyfit-ventures.png",
    },
];

export default function EnterpriseCaseStudy() {
    return (
        <section className="py-24 md:py-32 bg-[#F8FAFC] border-t border-slate-100" aria-labelledby="reviews-heading">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                <div className="text-center mb-16">
                    <h2 id="reviews-heading" className="font-inter text-[32px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight max-w-3xl mx-auto">
                        Trusted by operations at scale.
                    </h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((r) => (
                        <div key={r.name} className="bg-noble-surface rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:border-noble-blue/20 transition-all">
                            <div className="flex gap-0.5 mb-6">
                                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                            </div>
                            <blockquote className="text-slate-700 font-medium leading-relaxed mb-8 text-base">"{r.quote}"</blockquote>
                            <div className="flex items-center gap-4 mt-auto border-t border-slate-50 pt-6">
                                <Image src={r.image} alt={r.name} width={44} height={44} className="w-11 h-11 rounded-full object-cover border-2 border-slate-100" />
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

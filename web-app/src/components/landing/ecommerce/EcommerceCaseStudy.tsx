import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const reviews = [
    {
        quote: "The Professional Identity features allowed us to completely white-label our billing portal. Our ecommerce customers have a beautiful, cohesive brand experience.",
        name: "Rejoice Ahmed",
        role: "Director, JoiceCollections",
        image: "/images/reviews/rejoice-ahmed-director-of-joicecollections.jpeg",
    },
    {
        quote: "Contactless QR payments have sped up checkout times at the mall significantly. Our customers love the modern payment experience without extra hardware.",
        name: "Major EC Opumie",
        role: "Founder, Opuforty Mall",
        image: "/images/reviews/major-ec-opumie-fiunder-of-opuforty-mall.png",
    },
    {
        quote: "Managing international distribution requires flawless global settlements. The interbank conversion rates have saved our Asian supply chains thousands in hidden fees.",
        name: "Kenji Tanaka",
        role: "China Sales Manager, Bodyfit Ventures",
        image: "/images/reviews/kenji-tanaka-china-sales-manager-of-bodyfit-ventures.png",
    },
];

export default function EcommerceCaseStudy() {
    return (
        <section className="py-24 md:py-32 bg-[#F8FAFC] border-t border-slate-100" aria-labelledby="reviews-heading">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 id="reviews-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                        Trusted by stores that bill smarter.
                    </h2>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        Join thousands of ecommerce operators and wholesale distributors who have automated their invoicing pipeline.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((r, i) => (
                        <div key={i} className="bg-noble-surface rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex gap-0.5 mb-6">
                                {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                            </div>
                            <blockquote className="text-slate-700 font-medium leading-relaxed mb-8 text-base">"{r.quote}"</blockquote>
                            <div className="flex items-center gap-4 mt-auto">
                                <Image src={r.image} alt={r.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />
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

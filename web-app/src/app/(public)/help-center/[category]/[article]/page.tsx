import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { helpCategories } from '@/lib/helpData';
import { ChevronRight, Clock, ArrowRight, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import HelpSearchBar from '@/components/help/HelpSearchBar';
import HelpRatingWidget from '@/components/help/HelpRatingWidget';
import Script from 'next/script';

interface Props {
    params: Promise<{ category: string; article: string }>;
}

export async function generateStaticParams() {
    return helpCategories.flatMap(cat =>
        cat.articles.map(article => ({
            category: cat.slug,
            article: article.slug,
        }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const cat = helpCategories.find(c => c.slug === resolvedParams.category);
    if (!cat) return {};
    const article = cat.articles.find(a => a.slug === resolvedParams.article);
    if (!article) return {};
    return {
        title: `${article.title} | Nobevra Help Center`,
        description: article.summary,
        keywords: article.keywords,
        alternates: {
            canonical: `https://nobevra.noblesworld.com.ng/help-center/${resolvedParams.category}/${resolvedParams.article}`,
        },
        openGraph: {
            title: article.title,
            description: article.summary,
            type: 'article',
            url: `https://nobevra.noblesworld.com.ng/help-center/${resolvedParams.category}/${resolvedParams.article}`,
        }
    };
}

export default async function HelpArticlePage({ params }: Props) {
    const resolvedParams = await params;
    const cat = helpCategories.find(c => c.slug === resolvedParams.category);
    if (!cat) notFound();
    const article = cat.articles.find(a => a.slug === resolvedParams.article);
    if (!article) notFound();

    // Get related articles from same category (exclude current)
    const relatedArticles = cat.articles.filter(a => a.slug !== resolvedParams.article).slice(0, 4);

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.summary,
        "author": { "@type": "Organization", "name": "Nobevra Support" },
        "publisher": { "@type": "Organization", "name": "Nobevra" },
        "url": `https://nobevra.noblesworld.com.ng/help-center/${resolvedParams.category}/${resolvedParams.article}`
    };

    const faqSchema = article.content.filter(s => s.heading).map(section => ({
        "@type": "Question",
        "name": section.heading,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": section.body
        }
    }));

    const completeFaqSchema = faqSchema.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqSchema
    } : null;

    return (
        <div className="bg-white text-near-black font-inter antialiased min-h-screen pt-[118px]">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            {completeFaqSchema && (
                <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(completeFaqSchema) }} />
            )}
            <HelpSearchBar />
            {/* Breadcrumb */}
            <div className="bg-[#F8FAFC] border-b border-slate-200 py-5">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 flex-wrap">
                        <Link href="/help-center" className="hover:text-noble-blue transition-colors">Help Center</Link>
                        <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                        <Link href={`/help-center/${cat.slug}`} className="hover:text-noble-blue transition-colors">{cat.title}</Link>
                        <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                        <span className="text-near-black truncate max-w-[200px] md:max-w-none">{article.title}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-start">

                    {/* Main article content */}
                    <article>
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${cat.bg} ${cat.color}`}>
                                {cat.title}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                {article.readTime}
                            </div>
                        </div>

                        <h1 className="font-inter text-[30px] md:text-[40px] font-black text-near-black leading-[1.1] tracking-tight mb-4">
                            {article.title}
                        </h1>
                        <p className="text-lg text-slate-500 font-medium mb-12 border-b border-slate-100 pb-12">{article.summary}</p>

                        {/* Article body */}
                        <div className="space-y-12">
                            {article.content.map((section, i) => (
                                <div key={i}>
                                    {section.heading && (
                                        <h2 className="font-inter text-xl md:text-2xl font-black text-near-black mb-4">{section.heading}</h2>
                                    )}
                                    <p className="text-slate-600 leading-relaxed font-medium mb-5">{section.body}</p>

                                    {section.steps && (
                                        <ol className="space-y-3 mb-5">
                                            {section.steps.map((step, si) => (
                                                <li key={si} className="flex gap-4 items-start">
                                                    <span className="w-7 h-7 rounded-full bg-noble-blue/10 text-noble-blue font-black text-sm flex items-center justify-center shrink-0 mt-0.5">{si + 1}</span>
                                                    <span className="text-slate-700 font-medium leading-relaxed">{step}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    )}

                                    {section.tip && (
                                        <div className="flex gap-4 p-5 bg-blue-50 border border-blue-100 rounded-2xl mt-5">
                                            <Info className="w-5 h-5 text-noble-blue shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-black text-noble-blue text-sm mb-1 uppercase tracking-wide">Pro Tip</p>
                                                <p className="text-slate-700 font-medium text-sm leading-relaxed">{section.tip}</p>
                                            </div>
                                        </div>
                                    )}

                                    {section.warning && (
                                        <div className="flex gap-4 p-5 bg-amber-50 border border-amber-100 rounded-2xl mt-5">
                                            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-black text-amber-600 text-sm mb-1 uppercase tracking-wide">Important</p>
                                                <p className="text-slate-700 font-medium text-sm leading-relaxed">{section.warning}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {/* Feedback Widget */}
                            <HelpRatingWidget articleSlug={article.slug} categorySlug={cat.slug} />
                        </div>

                        {/* Still need help */}
                        <div className="mt-10 p-8 bg-slate-50 rounded-2xl border border-slate-200">
                            <p className="font-black text-near-black mb-2">Still need help?</p>
                            <p className="text-slate-500 font-medium mb-5 text-sm">Our support team responds within 2 hours during business hours.</p>
                            <Link href="/contact#contact-form" className="inline-flex items-center gap-2 text-white bg-noble-blue px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#01A0E2] transition-colors">
                                Contact Support <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar: Related articles */}
                    <aside className="sticky top-36">
                        <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6">
                            <h3 className="font-black text-near-black mb-5 text-sm uppercase tracking-widest">Related Articles</h3>
                            <div className="space-y-3">
                                {relatedArticles.map((r, i) => (
                                    <Link
                                        key={i}
                                        href={`/help-center/${cat.slug}/${r.slug}`}
                                        className="flex items-start gap-3 group"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-slate-300 group-hover:text-noble-blue transition-colors shrink-0 mt-0.5" />
                                        <span className="text-sm font-medium text-slate-600 group-hover:text-noble-blue transition-colors leading-snug">{r.title}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <Link href={`/help-center/${cat.slug}`} className="flex items-center gap-2 text-noble-blue font-bold text-sm hover:text-near-black transition-colors group">
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    All {cat.title} articles
                                </Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}

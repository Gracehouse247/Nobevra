import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { helpCategories } from '@/lib/helpData';
import { ChevronRight, Clock, ArrowRight, AlertTriangle, Info, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import HelpSearchBar from '@/components/help/HelpSearchBar';
import HelpRatingWidget from '@/components/help/HelpRatingWidget';

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
    if (!cat) return { title: 'Article Not Found | Nobevra Help Center' };
    const article = cat.articles.find(a => a.slug === resolvedParams.article);
    if (!article) return { title: 'Article Not Found | Nobevra Help Center' };
    const canonicalUrl = `https://nobevra.noblesworld.com.ng/help-center/${resolvedParams.category}/${resolvedParams.article}`;
    return {
        title: `${article.title} | Nobevra Help Center`,
        description: article.summary,
        keywords: article.keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${article.title} | Nobevra Help Center`,
            description: article.summary,
            type: 'article',
            url: canonicalUrl,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${article.title} | Nobevra Support`,
            description: article.summary,
        }
    };
}

export default async function HelpArticlePage({ params }: Props) {
    const resolvedParams = await params;
    const cat = helpCategories.find(c => c.slug === resolvedParams.category);
    if (!cat) notFound();
    const article = cat.articles.find(a => a.slug === resolvedParams.article);
    if (!article) notFound();

    const canonicalUrl = `https://nobevra.noblesworld.com.ng/help-center/${resolvedParams.category}/${resolvedParams.article}`;
    const categoryUrl = `https://nobevra.noblesworld.com.ng/help-center/${cat.slug}`;

    // Related articles from same category
    const relatedArticles = cat.articles.filter(a => a.slug !== resolvedParams.article).slice(0, 4);

    // Schemas
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://nobevra.noblesworld.com.ng"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Help Center",
                "item": "https://nobevra.noblesworld.com.ng/help-center"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": cat.title,
                "item": categoryUrl
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": article.title
            }
        ]
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": article.title,
        "description": article.summary,
        "author": {
            "@type": "Organization",
            "name": "Nobevra Support Team",
            "url": "https://nobevra.noblesworld.com.ng"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Nobevra",
            "url": "https://nobevra.noblesworld.com.ng",
            "logo": {
                "@type": "ImageObject",
                "url": "https://nobevra.noblesworld.com.ng/images/brand%20identies/icon.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
        },
        "url": canonicalUrl
    };

    // Check if any section has steps for HowTo schema
    const stepSections = article.content.filter(s => s.steps && s.steps.length > 0);
    const howToSchema = stepSections.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": article.title,
        "description": article.summary,
        "step": stepSections.flatMap(s =>
            (s.steps || []).map((stepText, idx) => ({
                "@type": "HowToStep",
                "position": idx + 1,
                "text": stepText
            }))
        )
    } : null;

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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            {howToSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            )}
            {completeFaqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(completeFaqSchema) }} />
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
                        <span className="text-near-black font-bold truncate max-w-[200px] md:max-w-none">{article.title}</span>
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="grid lg:grid-cols-[1fr_360px] gap-16 items-start">
                    {/* Article body */}
                    <article className="max-w-2xl">
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-4">
                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold">{cat.title}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
                        </div>

                        <h1 className="font-inter text-[32px] md:text-[42px] font-black text-near-black tracking-tight mb-6 leading-tight">
                            {article.title}
                        </h1>

                        <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10 pb-8 border-b border-slate-200">
                            {article.summary}
                        </p>

                        {/* Content sections */}
                        <div className="space-y-10">
                            {article.content.map((section, idx) => (
                                <div key={idx} className="space-y-4">
                                    {section.heading && (
                                        <h2 className="font-inter text-xl md:text-2xl font-black text-near-black tracking-tight">
                                            {section.heading}
                                        </h2>
                                    )}

                                    {section.body && (
                                        <p className="text-slate-600 leading-relaxed text-base font-normal">
                                            {section.body}
                                        </p>
                                    )}

                                    {/* Steps list */}
                                    {section.steps && section.steps.length > 0 && (
                                        <ol className="space-y-3 pl-0 list-none my-6">
                                            {section.steps.map((step, sIdx) => (
                                                <li key={sIdx} className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                                                    <span className="w-6 h-6 rounded-full bg-noble-blue text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                                                        {sIdx + 1}
                                                    </span>
                                                    <span className="text-slate-700 text-sm leading-relaxed font-medium">{step}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    )}

                                    {/* Pro Tip Callout */}
                                    {section.tip && (
                                        <div className="flex items-start gap-3 p-5 rounded-2xl bg-noble-blue/5 border border-noble-blue/20 my-6">
                                            <Info className="w-5 h-5 text-noble-blue shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-wider text-noble-blue mb-1">Pro Tip</p>
                                                <p className="text-slate-700 text-sm leading-relaxed font-medium">{section.tip}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Warning Callout */}
                                    {section.warning && (
                                        <div className="flex items-start gap-3 p-5 rounded-2xl bg-amber-50 border border-amber-200 my-6">
                                            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-wider text-amber-600 mb-1">Important</p>
                                                <p className="text-slate-700 text-sm leading-relaxed font-medium">{section.warning}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Rating widget */}
                        <div className="mt-14 pt-8 border-t border-slate-200">
                            <HelpRatingWidget articleSlug={article.slug} categorySlug={cat.slug} />
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Related articles card */}
                        {relatedArticles.length > 0 && (
                            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                                    In this category
                                </p>
                                <div className="space-y-2">
                                    {relatedArticles.map((rel, i) => (
                                        <Link
                                            key={i}
                                            href={`/help-center/${cat.slug}/${rel.slug}`}
                                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white hover:shadow-xs transition-all group border border-transparent hover:border-slate-200"
                                        >
                                            <FileText className="w-4 h-4 text-slate-400 group-hover:text-noble-blue shrink-0 mt-0.5 transition-colors" />
                                            <div>
                                                <p className="text-sm font-bold text-near-black group-hover:text-noble-blue transition-colors leading-snug">{rel.title}</p>
                                                <span className="text-[11px] text-slate-400">{rel.readTime}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="pt-2 border-t border-slate-200">
                                    <Link
                                        href={`/help-center/${cat.slug}`}
                                        className="text-xs font-bold text-noble-blue hover:underline flex items-center gap-1"
                                    >
                                        View all {cat.articles.length} articles <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Commercial Conversion Card */}
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#060D1A] to-[#0D1F38] text-white space-y-4">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest text-sky-300">
                                <Sparkles className="w-3 h-3" />
                                Quick Tool
                            </div>
                            <h3 className="font-black text-lg text-white">Create an Invoice Now</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                No sign up needed. Generate and download a branded PDF invoice in 30 seconds.
                            </p>
                            <Link
                                href="/free-invoice-generator"
                                className="w-full py-3 bg-[#01A0E2] hover:bg-[#166FBB] text-white text-xs font-extrabold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-500/25"
                            >
                                Free Invoice Generator <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

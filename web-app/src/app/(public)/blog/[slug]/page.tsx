import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock, ArrowRight, CheckCircle2, FileText, Download, Calculator, FileSpreadsheet, PlayCircle, TrendingUp, Zap, Shield } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import ReactMarkdown, { Components } from 'react-markdown';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import ReadingProgressBar from './ReadingProgressBar';
import TableOfContents from './TableOfContents';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600; // Revalidate every hour

function getSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cugomxoyeyeytyedgclj.supabase.co';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key-for-build';
    return createClient(url, key);
}

const getPostBySlug = unstable_cache(
    async (slug: string) => {
        const supabase = getSupabaseClient();
        const { data } = await supabase.from('seo_articles').select('*').eq('slug', slug).single();
        return data;
    },
    ['blog-post-slug'],
    { revalidate: 3600, tags: ['blog'] }
);

const getRelatedPosts = unstable_cache(
    async (slug: string) => {
        const supabase = getSupabaseClient();
        const { data } = await supabase.from('seo_articles').select('id, title, slug, meta_description, published_at, featured_image_url').eq('status', 'published').neq('slug', slug).order('published_at', { ascending: false }).limit(3);
        return data;
    },
    ['blog-related-posts'],
    { revalidate: 3600, tags: ['blog'] }
);


function extractHeadings(markdown: string) {
    const headings: { level: number; text: string; id: string }[] = [];
    for (const line of markdown.split('\n')) {
        const match = line.match(/^(#{2,3})\s+(.+)$/);
        if (match) {
            const text = match[2].trim().replace(/\*\*/g, '');
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
            headings.push({ level: match[1].length, text, id });
        }
    }
    return headings;
}

function countWords(str: string) {
    return str.split(/\s+/).filter(w => w.length > 0).length;
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getImageUrl(url?: string | null) {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    if (url.startsWith('photo-')) return `https://images.unsplash.com/${url}?q=80&w=1200&auto=format&fit=crop`;
    return url;
}

// ─── CUSTOM MARKDOWN COMPONENTS ───────────────────────────────────────────────
const markdownComponents: Components = {
    h2: ({ node, children, ...props }) => {
        const text = String(children).replace(/\*\*/g, '');
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
        return (
            <h2 id={id} className="group relative scroll-mt-28 text-[1.6rem] font-bold text-[#0F172A] leading-tight tracking-tight mt-16 mb-4 font-montserrat" {...props}>
                <span className="absolute -left-5 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#166FBB] to-[#01A0E2] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                {children}
            </h2>
        );
    },
    h3: ({ node, children, ...props }) => {
        const text = String(children).replace(/\*\*/g, '');
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
        return (
            <h3 id={id} className="scroll-mt-28 text-[1.25rem] font-bold text-[#0F172A] leading-snug tracking-tight mt-10 mb-3 font-montserrat" {...props}>
                {children}
            </h3>
        );
    },
    p: ({ node, children, ...props }) => (
        <p className="text-[1.125rem] leading-[1.9] text-[#374151] mb-8 font-roboto" {...props}>
            {children}
        </p>
    ),
    ul: ({ node, children, ...props }) => (
        <ul className="space-y-3 mb-8 pl-0 list-none" {...props}>{children}</ul>
    ),
    ol: ({ node, children, ...props }) => (
        <ol className="space-y-3 mb-8 pl-0 list-none counter-reset-item" style={{ counterReset: 'item' }} {...props}>{children}</ol>
    ),
    li: ({ node, ordered, children, ...props }: any) => (
        <li className="flex gap-3 text-[1.0625rem] leading-relaxed text-[#374151] font-roboto" {...props}>
            <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#166FBB]/20 to-[#01A0E2]/20 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-[#166FBB]" />
            </span>
            <span>{children}</span>
        </li>
    ),
    blockquote: ({ node, children, ...props }) => (
        <div className="relative my-10 overflow-hidden rounded-2xl border border-[#166FBB]/20 bg-gradient-to-br from-[#EFF6FF] to-[#F0F9FF] #1E3A5F]/20 #0F172A] p-8">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#166FBB] to-[#01A0E2] rounded-l-2xl" />
            <div className="absolute top-4 right-4 text-6xl text-[#166FBB]/10 font-serif leading-none select-none">"</div>
            <div className="relative text-[1.2rem] italic font-medium leading-relaxed text-[#1E40AF] font-roboto pl-2">
                {children}
            </div>
        </div>
    ),
    strong: ({ node, children, ...props }) => (
        <strong className="font-bold text-[#0F172A] " {...props}>{children}</strong>
    ),
    a: ({ node, children, href, ...props }) => (
        <a href={href} className="text-[#166FBB] font-semibold underline underline-offset-4 decoration-[#166FBB]/30 hover:decoration-[#166FBB] transition-all" {...props}>
            {children}
        </a>
    ),
    code: ({ node, children, ...props }: any) => {
        if (props.inline) {
            return (
                <code className="px-1.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#166FBB] text-[0.875em] font-mono font-medium" {...props}>
                    {children}
                </code>
            );
        }
        return (
            <div className="my-8 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-lg">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#1E293B] border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <pre className="p-6 bg-[#0F172A] overflow-x-auto">
                    <code className="text-sm text-[#94A3B8] font-mono leading-relaxed" {...props}>{children}</code>
                </pre>
            </div>
        );
    },
    img: ({ node, src, alt, ...props }) => (
        <figure className="my-12 -mx-4 md:-mx-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#E2E8F0] ">
                <Image src={(src as string) || ""} alt={alt || ""} width={1200} height={600} className="w-full object-cover" loading="lazy" />
            </div>
            {alt && (
                <figcaption className="text-center text-sm text-[#94A3B8] mt-3 italic">{alt}</figcaption>
            )}
        </figure>
    ),
    hr: () => null,
    table: ({ node, children, ...props }) => (
        <div className="my-10 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">
            <table className="w-full border-collapse" {...props}>{children}</table>
        </div>
    ),
    thead: ({ node, children, ...props }) => (
        <thead className="bg-[#F8FAFC] text-xs font-black uppercase tracking-widest text-[#64748B]" {...props}>{children}</thead>
    ),
    th: ({ node, children, ...props }) => (
        <th className="px-6 py-4 text-left border-b border-[#E2E8F0] " {...props}>{children}</th>
    ),
    td: ({ node, children, ...props }) => (
        <td className="px-6 py-4 text-sm text-[#374151] border-b border-[#E2E8F0] last:border-b-0" {...props}>{children}</td>
    ),
};

// ─── METADATA & STATIC PARAMS ───────────────────────────────────────────────────
export async function generateStaticParams() {
    const supabase = getSupabaseClient();
    const { data: posts } = await supabase
        .from('seo_articles')
        .select('slug')
        .eq('status', 'published');
        
    if (!posts) return [];
    
    return posts.map((post) => ({
        slug: post.slug,
    }));
}
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found | Nobevra Blog' };
    return {
        title: `${post.meta_title || post.title} | Nobevra Blog`,
        description: post.meta_description,
        openGraph: {
            title: post.meta_title || post.title,
            description: post.meta_description,
            type: 'article',
            publishedTime: post.published_at || new Date().toISOString(),
            authors: ['Nobevra Team'],
            url: `https://nobevra.noblesworld.com.ng/blog/${slug}`,
            images: [{ url: getImageUrl(post.featured_image_url) || `https://nobevra.noblesworld.com.ng/images/og-blog.jpg`, width: 1200, height: 630, alt: post.title }]
        },
        twitter: { card: 'summary_large_image', title: post.meta_title || post.title, description: post.meta_description },
    };
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;

    const post = await getPostBySlug(slug);
    if (!post) notFound();

    const relatedPosts = await getRelatedPosts(slug);

    const readTime = Math.max(1, Math.ceil(countWords(post.content_markdown || '') / 200));
    const toc = extractHeadings(post.content_markdown || '');
    const schemaMarkup = post.schema_markup?.article || { "@context": "https://schema.org", "@type": "Article", "headline": post.title, "datePublished": post.published_at, "author": { "@type": "Organization", "name": "Nobevra Team" },
    };

    return (
        <>
            <ReadingProgressBar />

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
            {post.schema_markup?.faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schema_markup.faq) }} />}


            {/* ── CONTENT AREA ──────────────────────────────────────────── */}
            <section className="bg-white #070D1A] min-h-screen pt-32">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 py-12">
                    <div className="flex justify-between gap-12">

                        {/* ── MAIN ARTICLE (760px reading width) ───────── */}
                        <main className="min-w-0 flex-1 max-w-[760px]">

                            {/* Category pill */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFF6FF] #166FBB]/10 border border-[#BFDBFE] #166FBB]/30 text-[#166FBB] text-xs font-bold uppercase tracking-widest mb-6">
                                <Zap className="w-3 h-3" />
                                {post.category || 'Business Strategy'}
                            </div>

                            {/* Headline */}
                            <h1 className="text-[2.0rem] md:text-[2.2rem] lg:text-[2.5rem] font-bold text-[#0F172A] leading-[1.2] tracking-tight mb-6 font-montserrat">
                                {post.title}
                            </h1>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-5 text-sm text-[#64748B] mb-8 border-b border-[#E2E8F0] pb-6">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#166FBB] to-[#01A0E2] flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-semibold text-[#374151] ">Nobevra Team</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.published_at ? formatDate(post.published_at) : 'Recently published'}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{readTime} min read</span>
                                </div>
                            </div>

                            {/* Hero image — integrated into reading column */}
                            {post.featured_image_url && (
                                <div className="relative w-full overflow-hidden rounded-2xl border border-[#E2E8F0] mb-10" style={{ aspectRatio: '16/9' }}>
                                    <Image src={getImageUrl(post.featured_image_url) as string} alt={post.title} width={1200} height={675} className="w-full h-full object-cover" />
                                </div>
                            )}

                            {/* Intro excerpt card */}
                            {post.meta_description && (
                                <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#F0F9FF] #166FBB]/10 #01A0E2]/5 border border-[#BFDBFE] #166FBB]/20">
                                    <p className="text-[1.2rem] leading-relaxed font-medium text-[#1E40AF] font-roboto m-0">
                                        {post.meta_description}
                                    </p>
                                </div>
                            )}

                            {/* Article content */}
                            <div className="bg-transparent">
                                <div className="py-4">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                        {post.content_markdown || ''}
                                    </ReactMarkdown>
                                </div>

                                {/* Inline product CTA mid-article */}
                                <div className="mx-8 md:mx-14 mb-14 rounded-2xl overflow-hidden relative bg-gradient-to-r from-[#0F172A] to-[#1E293B] #166FBB]/20 #01A0E2]/10 border border-white/10 p-8 flex flex-col md:flex-row items-center gap-6">
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(22,111,187,0.3)_0%,_transparent_60%)]" />
                                    <div className="relative z-10 flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Zap className="w-4 h-4 text-[#38BDF8]" />
                                            <span className="text-xs font-black uppercase tracking-widest text-[#38BDF8]">Nobevra</span>
                                        </div>
                                        <h3 className="text-xl font-black text-white mb-2 font-montserrat">Stop chasing payments. Start automating them.</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">Send professional invoices, track payments in real time, and get paid 2x faster — completely free to start.</p>
                                    </div>
                                    <div className="relative z-10 flex-shrink-0">
                                        <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#166FBB] to-[#01A0E2] hover:from-[#1259A0] hover:to-[#0489BD] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#166FBB]/30 transition-all whitespace-nowrap">
                                            Start Free Trial
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <p className="text-xs text-slate-500 text-center mt-2">No credit card required</p>
                                    </div>
                                </div>
                            </div>

                            {/* ── AUTHOR BOX ──────────────────────────── */}
                            <div className="mt-12 p-8 rounded-3xl bg-white #0F172A] border border-[#E2E8F0] .06] shadow-sm flex gap-6 items-start">
                                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#166FBB] to-[#01A0E2] flex items-center justify-center shadow-lg shadow-[#166FBB]/20">
                                    <span className="text-2xl font-black text-white font-montserrat">N</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-black text-[#0F172A] font-montserrat">Nobevra Team</h4>
                                        <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-[#EFF6FF] #166FBB]/20 text-[#166FBB] border border-[#BFDBFE] #166FBB]/30">Staff</span>
                                    </div>
                                    <p className="text-sm text-[#64748B] leading-relaxed font-roboto">
                                        The Nobevra editorial team shares practical guides on business finance, invoicing best practices, and growth strategies for agencies and freelancers worldwide.
                                    </p>
                                </div>
                            </div>

                            {/* ── SHARE + NEWSLETTER ──────────────────── */}
                            <div className="mt-8 rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#006970] via-[#01A0E2] to-[#166FBB] p-10 text-center">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-6">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-3 font-montserrat">Get More Guides Like This</h3>
                                    <p className="text-white/70 text-base mb-8 max-w-sm mx-auto font-roboto">
                                        Join 10,000+ founders and freelancers who get weekly cash flow tips, invoice templates, and SaaS growth insights.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                                        <input
                                            type="email" placeholder="Enter your email" className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 text-sm font-medium outline-none focus:border-white/60 transition-colors font-roboto" />
                                        <button className="px-6 py-3.5 bg-white text-[#0F172A] font-black text-sm rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap font-montserrat">
                                            Subscribe Free
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* ── RELATED POSTS ───────────────────────── */}
                            {relatedPosts && relatedPosts.length > 0 && (
                                <div className="mt-16">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-2xl font-black text-[#0F172A] font-montserrat">Keep Reading</h3>
                                        <Link href="/blog" className="flex items-center gap-1 text-sm font-bold text-[#166FBB] hover:gap-2 transition-all">
                                            All articles <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                        {relatedPosts.map((related) => (
                                            <Link href={`/blog/${related.slug}`} key={related.id} className="group block bg-white #0F172A] border border-[#E2E8F0] .06] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                                {related.featured_image_url && (
                                                    <div className="aspect-[4/3] overflow-hidden">
                                                        <Image src={getImageUrl(related.featured_image_url) as string} alt={related.title} width={400} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    </div>
                                                )}
                                                <div className="p-5">
                                                    <h4 className="text-[0.9rem] font-bold text-[#0F172A] mb-2 leading-snug group-hover:text-[#166FBB] transition-colors line-clamp-2 font-montserrat">
                                                        {related.title}
                                                    </h4>
                                                    <p className="text-xs text-[#94A3B8] font-medium font-roboto">
                                                        {related.published_at ? formatDate(related.published_at) : ''}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </main>

                        {/* ── STICKY SIDEBAR (320px) ────────────────── */}
                        <aside className="hidden lg:block w-[320px] flex-shrink-0">
                            <div className="sticky top-28 space-y-6">

                                {/* Table of Contents */}
                                <div className="rounded-2xl bg-white #0F172A] border border-[#E2E8F0] .06] shadow-sm p-6">
                                    <TableOfContents headings={toc} />
                                </div>

                                {/* Primary CTA Banner */}
                                <div className="rounded-2xl overflow-hidden relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-white/[0.06] shadow-xl p-7 text-center">
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(22,111,187,0.4)_0%,_transparent_60%)]" />
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#166FBB] to-[#01A0E2] flex items-center justify-center shadow-lg shadow-[#166FBB]/30 mb-5">
                                            <PlayCircle className="w-7 h-7 text-white" />
                                        </div>
                                        <h4 className="font-black text-white text-lg mb-2 font-montserrat">Get Paid 2× Faster</h4>
                                        <p className="text-sm text-slate-400 mb-6 leading-relaxed font-roboto">
                                            Automate invoices, reminders, and payments. Join 10,000+ businesses already growing with Nobevra.
                                        </p>
                                        <Link href="/register" className="block w-full py-3.5 bg-gradient-to-r from-[#166FBB] to-[#01A0E2] text-white font-black text-sm rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#166FBB]/30 font-montserrat">
                                            Start Free — No Card Needed
                                        </Link>
                                        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
                                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Free forever plan</span>
                                            <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-500" /> SSL secure</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Lead Magnet */}
                                <div className="rounded-2xl bg-white #0F172A] border border-[#E2E8F0] .06] shadow-sm p-5 group cursor-pointer hover:border-[#166FBB]/40 hover:shadow-lg transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] #166FBB]/20 #01A0E2]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#DBEAFE] transition-colors">
                                            <Download className="w-5 h-5 text-[#166FBB]" />
                                        </div>
                                        <div>
                                            <h5 className="font-black text-[#0F172A] text-sm mb-1 font-montserrat">Free: Cash Flow Playbook</h5>
                                            <p className="text-xs text-[#64748B] leading-relaxed mb-2 font-roboto">5 fill-in templates to collect overdue invoices without damaging client relationships.</p>
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#166FBB]">
                                                Download PDF <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats trust badge */}
                                <div className="rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] border border-emerald-200/50 p-5">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        {[
                                            { stat: '10,000+', label: 'Active Users' },
                                            { stat: '2×', label: 'Faster Payments' },
                                            { stat: '98%', label: 'Satisfaction' },
                                            { stat: '₦0', label: 'To Start' },
                                        ].map(({ stat, label }) => (
                                            <div key={label} className="text-center">
                                                <div className="text-xl font-black text-emerald-700 font-montserrat">{stat}</div>
                                                <div className="text-[11px] text-emerald-600/70 font-medium font-roboto">{label}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/register" className="block w-full py-2.5 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors font-montserrat">
                                        Join Them Today
                                    </Link>
                                </div>

                                {/* Free Tools */}
                                <div className="rounded-2xl bg-white #0F172A] border border-[#E2E8F0] .06] shadow-sm p-5">
                                    <h5 className="text-xs font-black uppercase tracking-widest text-[#94A3B8] mb-4">Free Business Tools</h5>
                                    <div className="space-y-1">
                                        {[
                                            { href: '/tools/invoice-generator', Icon: FileText, label: 'Invoice Generator', color: 'text-blue-500' },
                                            { href: '/tools/receipt-maker', Icon: FileSpreadsheet, label: 'Receipt Maker', color: 'text-violet-500' },
                                            { href: '/tools/pay-stub-generator', Icon: Calculator, label: 'Pay Stub Generator', color: 'text-emerald-500' },
                                        ].map(({ href, Icon, label, color }) => (
                                            <Link key={href} href={href} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center group-hover:shadow-sm transition-shadow">
                                                        <Icon className={`w-4 h-4 ${color}`} />
                                                    </div>
                                                    <span className="text-[13px] font-semibold text-[#374151] font-roboto">{label}</span>
                                                </div>
                                                <ArrowRight className="w-3 h-3 text-[#CBD5E1] group-hover:text-[#166FBB] group-hover:translate-x-0.5 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ── FOOTER CTA ────────────────────────────────────────────── */}
            <section className="bg-[#0A0F1E] relative overflow-hidden py-24 px-6">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#166FBB]/20 to-[#01A0E2]/20 rounded-full blur-3xl" />
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#166FBB]/10 border border-[#166FBB]/30 text-[#38BDF8] text-xs font-bold uppercase tracking-widest mb-8">
                        <Zap className="w-3 h-3" />
                        Ready to grow?
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight font-montserrat">
                        The smartest invoicing decision you will make this year
                    </h2>
                    <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto font-roboto">
                        Nobevra handles invoicing, payment reminders, and client management. You handle growth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#166FBB] to-[#01A0E2] text-white font-black text-base rounded-2xl shadow-xl shadow-[#166FBB]/30 hover:shadow-[#166FBB]/50 hover:scale-105 transition-all font-montserrat">
                            Start Free Trial
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-base rounded-2xl hover:bg-white/10 transition-colors font-montserrat">
                            View Pricing
                        </Link>
                    </div>
                    <p className="mt-6 text-sm text-slate-500 font-roboto">
                        No credit card required · Free forever plan available · Cancel anytime
                    </p>
                </div>
            </section>
        </>
    );
}

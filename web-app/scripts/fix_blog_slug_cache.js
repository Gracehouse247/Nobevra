const fs = require('fs');

let blogSlug = 'C:/Projects/NobleInvoice/web-app/src/app/(public)/blog/[slug]/page.tsx';
let c = fs.readFileSync(blogSlug, 'utf8');

if (!c.includes('unstable_cache')) {
    c = c.replace("import { createClient } from '@supabase/supabase-js';", "import { createClient } from '@supabase/supabase-js';\nimport { unstable_cache } from 'next/cache';");

    const cacheFuncs = `
const getPostBySlug = unstable_cache(
    async (slug: string) => {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
        const { data } = await supabase.from('seo_articles').select('*').eq('slug', slug).single();
        return data;
    },
    ['blog-post-slug'],
    { revalidate: 3600, tags: ['blog'] }
);

const getRelatedPosts = unstable_cache(
    async (slug: string) => {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
        const { data } = await supabase.from('seo_articles').select('id, title, slug, meta_description, published_at, featured_image_url').eq('status', 'published').neq('slug', slug).order('published_at', { ascending: false }).limit(3);
        return data;
    },
    ['blog-related-posts'],
    { revalidate: 3600, tags: ['blog'] }
);
`;

    c = c.replace(/const supabase = createClient\([\s\S]*?\);/, "const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);\n" + cacheFuncs);

    c = c.replace(/const \{ data: post \} = await supabase\.from\('seo_articles'\)\.select\('\*'\)\.eq\('slug', slug\)\.single\(\);/g, "const post = await getPostBySlug(slug);");
    
    // In BlogPostPage
    c = c.replace(/const \{ data: post, error \} = await supabase\.from\('seo_articles'\)\.select\('\*'\)\.eq\('slug', slug\)\.single\(\);[\s\S]*?if \(error \|\| !post\) notFound\(\);/, "const post = await getPostBySlug(slug);\n    if (!post) notFound();");

    c = c.replace(/const \{ data: relatedPosts \} = await supabase[\s\S]*?\.limit\(3\);/, "const relatedPosts = await getRelatedPosts(slug);");

    fs.writeFileSync(blogSlug, c);
}

console.log('Blog slug cached');

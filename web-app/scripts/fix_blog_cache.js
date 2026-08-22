const fs = require('fs');

let blog = 'C:/Projects/Nobevra/web-app/src/app/(public)/blog/page.tsx';
let c = fs.readFileSync(blog, 'utf8');

c = c.replace("import { createClient } from '@supabase/supabase-js';", "import { createClient } from '@supabase/supabase-js';\nimport { unstable_cache } from 'next/cache';");

const cacheFunc = `
const getArticles = unstable_cache(
    async () => {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        const { data, error } = await supabase
            .from('seo_articles')
            .select('*')
            .eq('status', 'published')
            .order('published_at', { ascending: false });
        return { articles: data, error };
    },
    ['published-articles'],
    { revalidate: 3600, tags: ['blog'] }
);
`;

c = c.replace(/\/\/ Initialize Supabase client[\s\S]*?const supabase = createClient\(supabaseUrl, supabaseAnonKey\);/, cacheFunc);

c = c.replace(/const \{ data: articles, error \} = await supabase[\s\S]*?\.order\('published_at', \{ ascending: false \}\);/, 'const { articles, error } = await getArticles();');

fs.writeFileSync(blog, c);
console.log('Blog index cached');

import axios from 'axios';
import { supabase } from '@/lib/supabase';
import { convertToWebP } from '@/lib/imageUtils';

// We keep the old API_BASE_URL for legacy endpoints like ops, support, etc.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nobevra.noblesworld.com.ng/api';
const ADMIN_EMAIL_KEY = 'ni_admin_email';

export function getAdminEmail(): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(ADMIN_EMAIL_KEY);
}

export function setAdminEmail(email: string) {
    sessionStorage.setItem(ADMIN_EMAIL_KEY, email);
}

export function clearAdminSession() {
    sessionStorage.removeItem(ADMIN_EMAIL_KEY);
}

function adminClient() {
    const email = getAdminEmail();
    return axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            ...(email ? { 'X-Admin-Email': email } : {}),
        },
    });
}

export const cmsApi = {
    // Blog posts
    getAllPosts: async (status?: string) => {
        let query = supabase.from('seo_articles').select('*').order('created_at', { ascending: false });
        if (status && status !== 'all') {
            query = query.eq('status', status);
        }
        const { data, error } = await query;
        if (error) throw error;
        return { data };
    },
    
    getPostById: async (id: string) => {
        const { data, error } = await supabase.from('seo_articles').select('*').eq('id', id).single();
        if (error) throw error;
        return { data };
    },

    createPost: async (data: Record<string, any>) => {
        // Map CMS specific fields if necessary
        const payload = {
            title: data.title,
            slug: data.slug,
            content_markdown: data.content,
            excerpt: data.excerpt || '',
            meta_title: data.meta_title || data.title,
            meta_description: data.meta_description || data.excerpt || '',
            featured_image_url: data.cover_image || null,
            status: data.status || 'draft',
            tags: data.tags || [],
            schema_markup: data.schema_markup || {},
        };
        const { data: result, error } = await supabase.from('seo_articles').insert(payload).select().single();
        if (error) throw error;
        return { data: result };
    },

    updatePost: async (id: string, data: Record<string, any>) => {
        const payload = {
            title: data.title,
            slug: data.slug,
            content_markdown: data.content,
            excerpt: data.excerpt,
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            featured_image_url: data.cover_image,
            status: data.status,
            tags: data.tags,
            schema_markup: data.schema_markup,
            updated_at: new Date().toISOString()
        };
        
        // Remove undefined fields
        Object.keys(payload).forEach(key => payload[key as keyof typeof payload] === undefined && delete payload[key as keyof typeof payload]);

        const { data: result, error } = await supabase.from('seo_articles').update(payload).eq('id', id).select().single();
        if (error) throw error;
        return { data: result };
    },

    deletePost: async (id: string) => {
        const { error } = await supabase.from('seo_articles').delete().eq('id', id);
        if (error) throw error;
        return { success: true };
    },

    // Media
    listMedia: async () => {
        const { data, error } = await supabase.storage.from('cms_media').list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' }
        });
        if (error) throw error;
        
        // Return structured data for the UI
        return { 
            data: data.filter(file => file.name !== '.emptyFolderPlaceholder').map(file => {
                const { data: publicUrlData } = supabase.storage.from('cms_media').getPublicUrl(file.name);
                return {
                    id: file.id,
                    name: file.name,
                    url: publicUrlData.publicUrl,
                    size: file.metadata?.size || 0,
                    created_at: file.created_at,
                    mimetype: file.metadata?.mimetype || 'application/octet-stream'
                };
            }) 
        };
    },

    uploadImage: async (file: File) => {
        // Convert to WebP site-wide before upload
        const optimizedFile = await convertToWebP(file, 0.85);

        const fileExt = optimizedFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage.from('cms_media').upload(fileName, optimizedFile, {
            cacheControl: '3600',
            upsert: false
        });
        
        if (error) throw error;
        const { data: publicUrlData } = supabase.storage.from('cms_media').getPublicUrl(data.path);
        
        return { 
            data: { 
                url: publicUrlData.publicUrl,
                path: data.path
            } 
        };
    },

    deleteMedia: async (name: string) => {
        const { error } = await supabase.storage.from('cms_media').remove([name]);
        if (error) throw error;
        return { success: true };
    },

    // Support Operations (Legacy API)
    getInquiries: () => adminClient().get('/cms/admin/ops/support/inquiries'),
    sendSupportReply: (data: { inquiryId: number, message: string, userEmail: string }) =>
        adminClient().post('/cms/admin/ops/support/reply', data),

    // Marketing Operations (Legacy API)
    sendBroadcast: (data: { subject: string, htmlBody: string, plainText?: string }) =>
        adminClient().post('/cms/admin/ops/marketing/broadcast', data),

    // Dashboard Analytics (Legacy API)
    getDashboardStats: () => adminClient().get('/cms/admin/ops/dashboard/stats'),

    // Public blog (no auth)
    getPublishedPosts: async (limit = 10, offset = 0) => {
        const { data, error } = await supabase
            .from('seo_articles')
            .select('*')
            .eq('status', 'published')
            .order('published_at', { ascending: false })
            .range(offset, offset + limit - 1);
        if (error) throw error;
        return { data };
    },
    
    getPostBySlug: async (slug: string) => {
        const { data, error } = await supabase
            .from('seo_articles')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'published')
            .single();
        if (error) throw error;
        return { data };
    },
};

export default adminClient;


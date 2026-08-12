import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase credentials missing. Please check your .env variables.');
}

// Single shared Supabase client instance — all components must import from here.
// Using createBrowserClient from @supabase/ssr ensures proper cookie-based session handling.
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // @ts-ignore - TS types for experimental passkey may not be present in all versions
        experimental: { passkey: true }
    }
});

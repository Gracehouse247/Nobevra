/**
 * Read-only Supabase client for analytical/heavy read queries.
 * 
 * Usage: Import this client instead of the standard one for dashboard stats,
 * reports, and any read-heavy operations that don't need write access.
 * 
 * When you enable Supabase Read Replicas on your dashboard plan, simply
 * update NEXT_PUBLIC_SUPABASE_READ_REPLICA_URL to point to the replica URL.
 * The rest of the app will automatically benefit without any other changes.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseReadUrl =
  process.env.NEXT_PUBLIC_SUPABASE_READ_REPLICA_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://cugomxoyeyeytyedgclj.supabase.co';

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key-for-build';

export const supabaseReadOnly = createClient(supabaseReadUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    headers: {
      'x-client-info': 'nobevra-readonly',
    },
  },
});

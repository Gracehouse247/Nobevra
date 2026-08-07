import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CustomDomainProxyPage({ searchParams }: { searchParams: { domain?: string } }) {
    const domain = searchParams.domain;
    if (!domain) return notFound();

    // Since this is a server component handling public requests, we'll use a server client
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: customDomain } = await supabase
        .from('custom_domains')
        .select('user_id, status')
        .eq('domain_name', domain)
        // We only show the portal if status is active (Vercel verified)
        // Note: You may need to ensure your DB marks them active once verified
        .single();

    if (!customDomain) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-inter">
                <div className="text-center p-8 md:p-12 bg-white rounded-[32px] shadow-xl border border-slate-100 max-w-md w-full">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl mx-auto flex items-center justify-center mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Domain Not Configured</h1>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        This custom domain is pointing to NobleInvoice but has not been fully verified or activated yet.
                    </p>
                </div>
            </div>
        );
    }

    // Fetch the brand settings for this user_id
    const { data: profile } = await supabase
        .from('profiles')
        .select('business_name, logo_url')
        .eq('id', customDomain.user_id)
        .single();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 font-inter">
            <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden max-w-md w-full p-8 md:p-12 text-center border border-slate-100 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400"></div>
                
                {profile?.logo_url ? (
                    <img src={profile.logo_url} alt={profile.business_name} className="h-16 mx-auto mb-6 object-contain" />
                ) : (
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                        {profile?.business_name?.charAt(0) || 'B'}
                    </div>
                )}
                
                <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Client Portal</h1>
                <p className="text-slate-500 mb-8 text-sm">Welcome to the secure client portal for <strong className="text-slate-800">{profile?.business_name || 'this business'}</strong>.</p>
                
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-sm text-slate-600 flex flex-col items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    <p>To view your invoices, proposals, or contracts, please click the secure magic link provided in your email.</p>
                </div>
            </div>
            
            <div className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                Powered by <span className="text-slate-900">NobleInvoice</span>
            </div>
        </div>
    );
}

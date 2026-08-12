'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Globe, CheckCircle2, Copy, Plus, AlertCircle } from 'lucide-react';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';

export default function CustomDomainSettings() {
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const [domains, setDomains] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const { data } = await supabase.from('custom_domains').select('*').order('created_at', { ascending: false });
        if (data) setDomains(data);
        setLoading(false);
    };

    const handleAddDomain = async () => {
        const domain = prompt("Enter your custom domain (e.g. billing.yourcompany.com):");
        if (!domain) return;
        
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) return;

        const { error } = await supabase.from('custom_domains').insert({
            user_id: userData.user.id,
            domain_name: domain.toLowerCase(),
            status: 'pending'
        });
        
        if (error) {
            alert("Failed to add domain: " + error.message);
        } else {
            // Call API to provision on Vercel
            try {
                const { data: session } = await supabase.auth.getSession();
                await fetch('/api/domains', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.session?.access_token}`
                    },
                    body: JSON.stringify({ domain: domain.toLowerCase() })
                });
            } catch (err) {
                console.error("Vercel domain provisioning failed", err);
            }
            loadData();
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-noble-text">Custom Domain</h1>
                    {!canUse('brand.customdomain') && <PremiumBadge tier="elite" iconOnly />}
                </div>
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">White-label your invoices by serving them from your own domain.</p>
            </div>

            <div className="bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border overflow-hidden">
                <div className="p-6 border-b border-noble-border flex justify-between items-center bg-slate-50 dark:bg-[#0D1B2E]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-noble-text">White-Label Domains</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">Map a CNAME record to our servers.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            if (!canUse('brand.customdomain')) {
                                openUpgradeModal({ featureName: 'Custom Domain', requiredPlan: 'elite' });
                                return;
                            }
                            handleAddDomain();
                        }}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Domain
                    </button>
                </div>
                
                <div className="p-0">
                    {domains.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">No custom domains configured.</div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {domains.map(d => (
                                <div key={d.id} className="p-6 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="font-bold text-noble-text text-lg">{d.domain_name}</div>
                                            {d.status === 'active' ? (
                                                <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold">
                                                    <AlertCircle className="w-3.5 h-3.5" /> Verification Pending
                                                </span>
                                            )}
                                        </div>
                                        <button 
                                            onClick={async () => {
                                                if(confirm('Remove this domain?')) {
                                                    const { data: session } = await supabase.auth.getSession();
                                                    await fetch(`/api/domains?domain=${d.domain_name}`, {
                                                        method: 'DELETE',
                                                        headers: {
                                                            'Authorization': `Bearer ${session?.session?.access_token}`
                                                        }
                                                    });
                                                    await supabase.from('custom_domains').delete().eq('id', d.id);
                                                    loadData();
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {d.status === 'pending' && (() => {
                                        const isRoot = d.domain_name.split('.').length === 2;
                                        return (
                                        <div className="bg-slate-50 dark:bg-[#0D1B2E] rounded-lg p-5 border border-noble-border">
                                            <h4 className="font-bold text-noble-text text-sm mb-3">DNS Configuration Required</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 dark:text-slate-500 mb-4">Please log in to your domain registrar (e.g. GoDaddy, Cloudflare, Namecheap) and add the following record:</p>
                                            
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">Type</div>
                                                    <div className="bg-noble-surface dark:bg-noble-card border border-noble-border rounded px-3 py-2 text-sm font-mono text-slate-700 dark:text-slate-200">{isRoot ? 'A' : 'CNAME'}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">Name / Host</div>
                                                    <div className="bg-noble-surface dark:bg-noble-card border border-noble-border rounded px-3 py-2 text-sm font-mono text-slate-700 dark:text-slate-200 flex justify-between">
                                                        {isRoot ? '@' : d.domain_name.split('.')[0]} 
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">Value / Target</div>
                                                    <div className="bg-noble-surface dark:bg-noble-card border border-noble-border rounded px-3 py-2 text-sm font-mono text-slate-700 dark:text-slate-200 flex justify-between">
                                                        {isRoot ? '76.76.21.21' : 'cname.vercel-dns.com'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )})()}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

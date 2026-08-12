'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Key, Webhook, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';

export default function DeveloperSettings() {
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const [apiKeys, setApiKeys] = useState<any[]>([]);
    const [webhooks, setWebhooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const [keysRes, webhooksRes] = await Promise.all([
            supabase.from('api_keys').select('*').order('created_at', { ascending: false }),
            supabase.from('webhooks').select('*').order('created_at', { ascending: false })
        ]);
        if (keysRes.data) setApiKeys(keysRes.data);
        if (webhooksRes.data) setWebhooks(webhooksRes.data);
        setLoading(false);
    };

    const handleCreateKey = async () => {
        const name = prompt("Enter a name for this API key:");
        if (!name) return;
        
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) return;

        // Generate a cryptographically secure random string for the API key
        const array = new Uint8Array(24);
        window.crypto.getRandomValues(array);
        const secureKey = `sk_live_${Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('')}`;
        
        // Hash the key using SHA-256 before storing it in the database
        const msgBuffer = new TextEncoder().encode(secureKey);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const keyHash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        
        const { error } = await supabase.from('api_keys').insert({
            user_id: userData.user.id,
            name,
            key_hash: keyHash
        });
        
        if (error) alert("Failed to create key: " + error.message);
        else {
            alert(`API Key created! Copy it now, you won't be able to see it again:\n\n${secureKey}`);
            loadData();
        }
    };

    const handleCreateWebhook = async () => {
        const url = prompt("Enter Webhook Endpoint URL:");
        if (!url) return;
        
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) return;

        const secret = `whsec_${Math.random().toString(36).substring(2, 15)}`;

        const { error } = await supabase.from('webhooks').insert({
            user_id: userData.user.id,
            endpoint_url: url,
            secret,
            events: ['invoice.paid', 'invoice.created']
        });
        
        if (error) alert("Failed to create webhook: " + error.message);
        else loadData();
    };

    if (loading) return <div className="p-8">Loading developer settings...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-noble-text">Developer Settings</h1>
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Manage your API keys and webhook endpoints for integrations.</p>
            </div>

            {/* API Keys */}
            <div className="bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border overflow-hidden">
                <div className="p-6 border-b border-noble-border flex justify-between items-center bg-slate-50 dark:bg-[#0D1B2E]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <Key className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="font-semibold text-noble-text">API Keys</h2>
                                {!canUse('developer.api') && <PremiumBadge tier="elite" iconOnly />}
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">Authenticate requests to the NobleInvoice API.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            if (!canUse('developer.api')) {
                                openUpgradeModal({ featureName: 'API Access & Webhooks', requiredPlan: 'elite' });
                                return;
                            }
                            handleCreateKey();
                        }}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Create Key
                    </button>
                </div>
                <div className="p-0">
                    {apiKeys.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">No API keys generated yet.</div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {apiKeys.map(key => (
                                <div key={key.id} className="p-4 flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-noble-text">{key.name}</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 font-mono mt-1 flex items-center gap-2">
                                            {key.key_hash.substring(0, 12)}••••••••
                                            {key.is_active && <span className="flex items-center gap-1 text-emerald-600 text-xs bg-emerald-50 px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3"/> Active</span>}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={async () => {
                                            if(confirm('Revoke this key?')) {
                                                await supabase.from('api_keys').delete().eq('id', key.id);
                                                loadData();
                                            }
                                        }}
                                        className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Webhooks */}
            <div className="bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border overflow-hidden">
                <div className="p-6 border-b border-noble-border flex justify-between items-center bg-slate-50 dark:bg-[#0D1B2E]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                            <Webhook className="w-5 h-5 text-pink-600" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="font-semibold text-noble-text">Webhooks</h2>
                                {!canUse('developer.api') && <PremiumBadge tier="elite" iconOnly />}
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">Receive real-time events on your server.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            if (!canUse('developer.api')) {
                                openUpgradeModal({ featureName: 'API Access & Webhooks', requiredPlan: 'elite' });
                                return;
                            }
                            handleCreateWebhook();
                        }}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Endpoint
                    </button>
                </div>
                <div className="p-0">
                    {webhooks.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">No webhooks configured.</div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {webhooks.map(wh => (
                                <div key={wh.id} className="p-4 flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-noble-text">{wh.endpoint_url}</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1 flex gap-2">
                                            {wh.events.map((ev: string) => (
                                                <span key={ev} className="bg-slate-100 dark:bg-[#112030] text-slate-600 dark:text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded text-xs">{ev}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={async () => {
                                            if(confirm('Delete webhook?')) {
                                                await supabase.from('webhooks').delete().eq('id', wh.id);
                                                loadData();
                                            }
                                        }}
                                        className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

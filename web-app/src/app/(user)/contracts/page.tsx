'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FileSignature, Plus, ExternalLink, PenTool, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';

export default function ContractsDashboard() {
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const [contracts, setContracts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const { data } = await supabase.from('contracts').select('*').order('created_at', { ascending: false });
        if (data) setContracts(data);
        setLoading(false);
    };

    const handleCreateDraft = async () => {
        const title = prompt("Enter contract title (e.g. Website Redesign NDA):");
        if (!title) return;
        
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) return;

        const { error } = await supabase.from('contracts').insert({
            user_id: userData.user.id,
            title,
            terms_html: "<h2>Standard Agreement</h2><p>This is a placeholder for your contract terms.</p>",
            status: 'sent' // Auto setting to sent for demo so it can be signed
        });
        
        if (error) alert("Failed to create contract: " + error.message);
        else loadData();
    };

    if (loading) return <div className="p-8">Loading contracts...</div>;

    return (
        <div className="min-h-full bg-slate-50/50 p-6 lg:p-8 pb-24">
            <div className="max-w-[1400px] mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-[64px] h-[64px] rounded-[18px] bg-blue-100 flex items-center justify-center text-blue-600">
                            <FileSignature className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-[28px] font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                                    Client <span className="text-blue-600 italic font-medium">Contracts</span>
                                </h1>
                                {!canUse('team.contracts') && <PremiumBadge tier="elite" iconOnly />}
                            </div>
                            <p className="text-[14px] font-medium text-slate-500 mt-1">Manage e-signatures, NDAs, and service agreements.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            if (!canUse('team.contracts')) {
                                openUpgradeModal({ featureName: 'Contracts & E-Signature', requiredPlan: 'elite' });
                                return;
                            }
                            handleCreateDraft();
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[14px] font-bold hover:bg-blue-700 transition-all shadow-sm"
                    >
                        <Plus className="w-4 h-4" /> Create Contract
                        {!canUse('team.contracts') && <PremiumBadge tier="elite" iconOnly />}
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    {contracts.length === 0 ? (
                        <div className="p-16 text-center text-slate-500 flex flex-col items-center">
                            <PenTool className="w-12 h-12 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-900">No contracts yet</h3>
                            <p className="text-sm mt-1">Create your first client agreement to get a legally binding e-signature.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {contracts.map(contract => (
                                <div key={contract.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div>
                                        <div className="font-bold text-slate-900 text-[15px]">{contract.title}</div>
                                        <div className="text-[13px] text-slate-500 mt-1 flex items-center gap-2">
                                            {new Date(contract.created_at).toLocaleDateString()}
                                            <span className="text-slate-300">•</span>
                                            {contract.status === 'signed' ? (
                                                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                                                    <CheckCircle className="w-3 h-3" /> Signed
                                                </span>
                                            ) : (
                                                <span className="text-amber-600 font-medium capitalize">{contract.status}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link 
                                            href={`/embed/contract/${contract.id}`} 
                                            target="_blank"
                                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-[13px] font-bold hover:bg-slate-200 flex items-center gap-2"
                                        >
                                            View Public <ExternalLink className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

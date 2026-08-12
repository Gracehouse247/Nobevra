'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    Contact, Plus, Smartphone, Share2, 
    MoreHorizontal, ArrowRight, ScanLine, User, Edit3, Trash2,
    MessageCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { identityService } from '@/lib/services/supabaseService';
import { useCanvasStore } from '@/store/useCanvasStore';
import { toast } from 'react-hot-toast';

export default function DigitalCardsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { loadTemplate } = useCanvasStore();
    const [identities, setIdentities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCards = async () => {
            if (!user) return;
            try {
                const data = await identityService.getIdentities(user.id);
                setIdentities(data);
            } catch (err) {
                console.error('Failed to fetch cards:', err);
                toast.error('Could not load digital cards');
            } finally {
                setLoading(false);
            }
        };
        fetchCards();
    }, [user]);

    const primaryCard = identities.find(id => id.is_primary) || identities[0];
    const otherCards = identities.filter(id => id.id !== primaryCard?.id);

    const handleEditInStudio = (card: any) => {
        if (card.design_schema) {
            loadTemplate(card.design_schema);
            router.push('/studio');
        } else {
            toast.error('This card cannot be edited in Studio.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this card?')) return;
        try {
            await identityService.deleteIdentity(id);
            setIdentities(prev => prev.filter(card => card.id !== id));
            toast.success('Card deleted');
        } catch (err) {
            toast.error('Failed to delete card');
        }
    };

    const handleSetPrimary = async (id: string) => {
        if (!user) return;
        try {
            await identityService.setPrimaryIdentity(user.id, id);
            setIdentities(prev => prev.map(card => ({ ...card, is_primary: card.id === id })));
            toast.success('Primary card updated');
        } catch (err) {
            toast.error('Failed to set primary card');
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent dark:bg-[#060D1A] pb-24">
            {/* Header Area */}
            <div className="bg-noble-surface dark:bg-noble-card border-b border-[#E2E8F0] px-8 py-8 mb-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mb-2">Digital Business Cards</h1>
                        <p className="text-[#64748B] text-sm font-medium">Create and share your professional contact profile via NFC, QR code, or link.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/studio" className="flex items-center gap-2 px-6 py-3 bg-[#166FBB] text-white font-bold text-sm rounded-xl hover:bg-[#125A96] transition-all shadow-lg shadow-[#166FBB]/20 whitespace-nowrap">
                            <Plus className="w-4 h-4" />
                            Create New Card
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8">
                {/* Active Card Preview */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-8 h-8 border-4 border-[#166FBB] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : !primaryCard ? (
                    <div className="bg-noble-surface dark:bg-noble-card rounded-3xl border border-[#E2E8F0] shadow-sm p-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-[#F8FAFC] dark:bg-[#060D1A] rounded-full flex items-center justify-center mb-4">
                            <Contact className="w-8 h-8 text-[#94A3B8]" />
                        </div>
                        <h2 className="text-xl font-black text-[#0F172A] mb-2">No Cards Yet</h2>
                        <p className="text-[#64748B] text-sm font-medium mb-6 max-w-sm">Create your first digital business card using our professional Studio tools.</p>
                        <Link href="/studio" className="flex items-center gap-2 px-6 py-3 bg-[#166FBB] text-white font-bold text-sm rounded-xl hover:bg-[#125A96] transition-all shadow-lg shadow-[#166FBB]/20">
                            <Plus className="w-4 h-4" />
                            Go to Studio
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Visual Card */}
                            <div 
                                className="bg-gradient-to-br from-[#166FBB] to-[#1E3A8A] rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden h-[300px] flex flex-col justify-between group cursor-pointer"
                                style={primaryCard.card_image_url ? { backgroundImage: `url(${primaryCard.card_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                                onClick={() => handleEditInStudio(primaryCard)}
                            >
                                {!primaryCard.card_image_url && (
                                    <>
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-noble-surface dark:bg-noble-card/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                        
                                        <div className="relative z-10 flex justify-between items-start">
                                            <div className="w-16 h-16 rounded-full bg-noble-surface dark:bg-noble-card/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                                <User className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="p-3 bg-noble-surface dark:bg-noble-card/10 backdrop-blur-md rounded-2xl">
                                                <ScanLine className="w-6 h-6 text-white" />
                                            </div>
                                        </div>

                                        <div className="relative z-10">
                                            <h2 className="text-2xl font-black mb-1">{primaryCard.full_name}</h2>
                                            <p className="text-white/80 font-medium text-sm mb-4">{primaryCard.job_title}</p>
                                            <div className="flex items-center gap-2 text-xs font-bold text-white/60">
                                                <span>{primaryCard.email}</span>
                                                {primaryCard.phone && <span>•</span>}
                                                {primaryCard.phone && <span>{primaryCard.phone}</span>}
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex items-center gap-2 text-white font-bold bg-noble-surface dark:bg-noble-card/20 backdrop-blur-md px-4 py-2 rounded-xl">
                                        <Edit3 size={16} /> Edit in Studio
                                    </div>
                                </div>
                            </div>

                            {/* Card Actions & Stats */}
                            <div className="bg-noble-surface dark:bg-noble-card rounded-3xl p-8 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-black text-[#0F172A]">{primaryCard.is_primary ? 'Primary Card Stats' : 'Card Stats'}</h3>
                                        {primaryCard.is_primary && <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-[10px] font-black uppercase tracking-widest rounded-full">Active</span>}
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="p-4 bg-[#F8FAFC] dark:bg-[#060D1A] rounded-2xl border border-[#E2E8F0]">
                                            <p className="text-[10px] text-[#64748B] font-black uppercase tracking-widest mb-1">Total Views</p>
                                            <p className="text-2xl font-black text-[#0F172A]">0</p>
                                        </div>
                                        <div className="p-4 bg-[#F8FAFC] dark:bg-[#060D1A] rounded-2xl border border-[#E2E8F0]">
                                            <p className="text-[10px] text-[#64748B] font-black uppercase tracking-widest mb-1">Contacts Saved</p>
                                            <p className="text-2xl font-black text-[#0F172A]">0</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3">
                                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] text-[#0F172A] font-bold text-sm rounded-xl hover:bg-noble-surface dark:bg-noble-card hover:border-[#166FBB] transition-all">
                                        <Share2 className="w-4 h-4" /> Share Link
                                    </button>
                                    <button 
                                        onClick={() => {
                                            const publicUrl = `${window.location.origin}/identity/${primaryCard.id}`;
                                            const text = `Hi, here is my digital business card: ${publicUrl}`;
                                            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] text-[#10B981] font-bold text-sm rounded-xl hover:bg-emerald-50 hover:border-emerald-500 transition-all"
                                    >
                                        <MessageCircle className="w-4 h-4" /> WhatsApp
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] text-[#0F172A] font-bold text-sm rounded-xl hover:bg-noble-surface dark:bg-noble-card hover:border-[#166FBB] transition-all">
                                        <Smartphone className="w-4 h-4" /> Wallet
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Other Cards List */}
                        {otherCards.length > 0 && (
                            <div className="bg-noble-surface dark:bg-noble-card rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col min-h-[300px]">
                                <div className="px-8 py-6 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC] dark:bg-[#060D1A]/50">
                                    <div className="flex items-center gap-3">
                                        <Contact className="w-5 h-5 text-[#94A3B8]" />
                                        <h2 className="text-lg font-black text-[#0F172A]">All Cards</h2>
                                    </div>
                                </div>
                                
                                <div className="p-8 flex flex-col gap-4">
                                    {otherCards.map(card => (
                                        <div key={card.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-noble-surface dark:bg-noble-card border border-[#E2E8F0] rounded-2xl hover:border-[#CBD5E1] hover:shadow-sm transition-all group">
                                            <div className="flex items-center gap-4 mb-4 sm:mb-0 cursor-pointer" onClick={() => handleEditInStudio(card)}>
                                                {card.card_image_url ? (
                                                    <div className="w-16 h-12 rounded-lg bg-cover bg-center border border-noble-border" style={{ backgroundImage: `url(${card.card_image_url})` }} />
                                                ) : (
                                                    <div className="w-16 h-12 bg-gradient-to-br from-[#166FBB] to-[#1E3A8A] rounded-lg shadow-sm" />
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-[#0F172A]">{card.full_name || 'Untitled Card'}</h4>
                                                    <p className="text-xs text-[#64748B]">{card.job_title} • 0 views</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                                <button onClick={() => handleSetPrimary(card.id)} className="px-3 py-1.5 text-xs font-bold text-[#64748B] hover:text-[#166FBB] hover:bg-[#F8FAFC] dark:bg-[#060D1A] rounded-lg transition-colors border border-transparent hover:border-[#166FBB]/20">
                                                    Set Primary
                                                </button>
                                                <button onClick={() => handleEditInStudio(card)} className="p-2 text-[#94A3B8] hover:text-[#166FBB] hover:bg-[#F8FAFC] dark:bg-[#060D1A] rounded-lg transition-colors" title="Edit in Studio">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(card.id)} className="p-2 text-[#94A3B8] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

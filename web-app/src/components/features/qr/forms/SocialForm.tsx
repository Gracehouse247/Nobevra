import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';
import { Camera, Briefcase, X as XIcon, Users, MessageCircle, Video, Music, Calendar, Globe } from 'lucide-react';

const PLATFORMS = [
    { name: 'Instagram', icon: Camera },
    { name: 'LinkedIn', icon: Briefcase },
    { name: 'X', icon: XIcon },
    { name: 'Facebook', icon: Users },
    { name: 'WhatsApp', icon: MessageCircle },
    { name: 'YouTube', icon: Video },
    { name: 'TikTok', icon: Music },
    { name: 'Calendly', icon: Calendar },
    { name: 'Portfolio', icon: Globe },
];

export default function SocialForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [displayName, setDisplayName] = useState(initialData?.displayName || '');
    const [platform, setPlatform] = useState(initialData?.platform || 'Instagram');
    const [handle, setHandle] = useState(initialData?.handle || '');

    useEffect(() => {
        onChange({ displayName, platform, handle });
        onPreviewValueChange(handle ? `https://${platform.toLowerCase()}.com/${handle}` : 'https://nobleinvoice.com');
    }, [displayName, platform, handle]);

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Display Name *</label>
                <input 
                    type="text" 
                    placeholder="e.g. John Doe / NobleInvoice" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>

            <div className="space-y-3">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Select Platform *</label>
                <div className="grid grid-cols-3 gap-3">
                    {PLATFORMS.map((p) => {
                        const Icon = p.icon;
                        const isSelected = platform === p.name;
                        return (
                            <button
                                key={p.name}
                                type="button"
                                onClick={() => setPlatform(p.name)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                                    isSelected 
                                        ? 'border-[#166FBB] bg-[#166FBB]/5 text-[#166FBB]' 
                                        : 'border-[#E2E8F0] bg-noble-surface text-[#94A3B8] hover:border-[#CBD5E1]'
                                }`}
                            >
                                <Icon className="w-6 h-6 mb-2" />
                                <span className={`text-[10px] font-bold ${isSelected ? 'text-[#166FBB]' : 'text-[#64748B]'}`}>
                                    {p.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Handle / Username *</label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <span className="text-lg font-bold text-[#94A3B8]">@</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="your_username" 
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                    />
                </div>
            </div>
        </div>
    );
}

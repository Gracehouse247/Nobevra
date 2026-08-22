import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';
import { Zap } from 'lucide-react';

export default function WebsiteForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [url, setUrl] = useState(initialData?.url || '');
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');

    useEffect(() => {
        onChange({ url, title, description });
        onPreviewValueChange(url || 'https://nobevra.noblesworld.com.ng');
    }, [url, title, description]);

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Website URL *</label>
                <input 
                    type="url" 
                    placeholder="https://yourwebsite.com" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-5 py-4 text-lg font-bold focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            
            <div className="space-y-4 border-t border-[#E2E8F0] pt-6">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#CBD5E1]" />
                    <span className="text-[10px] font-black text-[#CBD5E1] tracking-widest">ANALYTICS & TRACKING</span>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B]">Page Title (Optional)</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Summer Campaign" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B]">Short Description (Optional)</label>
                    <textarea 
                        placeholder="Add a note to help identify this link in your dashboard reports later." 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors resize-none" 
                    />
                </div>
                
                <p className="text-[11px] italic text-[#94A3B8]">
                    Note: Title and description are only visible within your Nobevra analytics dashboard.
                </p>
            </div>
        </div>
    );
}

'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Palette, Upload, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

interface BrandingStepProps {
    data: {
        logoUrl: string | null;
        brandColor: string;
        brandVoice: string;
    };
    updateData: (fields: Partial<{ logoUrl: string | null; brandColor: string; brandVoice: string }>) => void;
    activeColor: string;
}

const VOICES = ['Professional', 'Friendly', 'Corporate', 'Creative', 'Direct'];
const PRESET_COLORS = ['#166FBB', '#1E293B', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];

export const BrandingStep = ({ data, updateData, activeColor }: BrandingStepProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            toast.loading('Uploading logo...', { id: 'logo-upload' });
            
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `logos/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('brand_assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from('brand_assets')
                .getPublicUrl(filePath);

            updateData({ logoUrl: publicUrlData.publicUrl });
            toast.success('Logo uploaded successfully!', { id: 'logo-upload' });
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload logo', { id: 'logo-upload' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg mx-auto p-6"
        >
            <h2 className="text-2xl font-black text-noble-text mb-2">Visual Branding</h2>
            <p className="text-slate-500 mb-8 font-medium">Make your invoices look unmistakably yours.</p>

            <div className="space-y-8">
                {/* Logo Upload */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Company Logo</label>
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-32 border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors overflow-hidden relative group"
                    >
                        {data.logoUrl ? (
                            <>
                                <img src={data.logoUrl} alt="Logo" className="h-full object-contain p-4" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-bold text-sm">Change Logo</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                                    <Upload className="w-5 h-5 text-slate-500" />
                                </div>
                                <span className="text-sm font-semibold text-slate-600">Click to upload logo</span>
                                <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                            </>
                        )}
                        <input 
                            ref={fileInputRef} 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileUpload} 
                        />
                    </div>
                </div>

                {/* Primary Color */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <Palette className="w-4 h-4" /> Brand Color
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {PRESET_COLORS.map(color => (
                            <button
                                key={color}
                                onClick={() => updateData({ brandColor: color })}
                                className={`w-10 h-10 rounded-full transition-transform ${data.brandColor === color ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Brand Voice */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Brand Voice</label>
                    <select
                        value={data.brandVoice}
                        onChange={(e) => updateData({ brandVoice: e.target.value })}
                        className="w-full px-4 py-4 bg-noble-surface border border-noble-border rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        style={{ '--tw-ring-color': activeColor } as any}
                    >
                        {VOICES.map(v => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            </div>
        </motion.div>
    );
};

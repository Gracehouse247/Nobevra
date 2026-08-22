import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';

export default function AppStoreForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [appName, setAppName] = useState(initialData?.appName || '');
    const [iosUrl, setIosUrl] = useState(initialData?.iosUrl || '');
    const [androidUrl, setAndroidUrl] = useState(initialData?.androidUrl || '');
    const [fallbackUrl, setFallbackUrl] = useState(initialData?.fallbackUrl || '');

    useEffect(() => {
        onChange({ appName, iosUrl, androidUrl, fallbackUrl });
        
        // This usually requires dynamic routing to work perfectly, 
        // fallback URL used for preview
        onPreviewValueChange(fallbackUrl || iosUrl || androidUrl || 'https://nobevra.noblesworld.com.ng');
    }, [appName, iosUrl, androidUrl, fallbackUrl]);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">App Name *</label>
                <input 
                    type="text" 
                    placeholder="e.g. Nobevra" 
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">App Store URL (iOS)</label>
                <input 
                    type="url" 
                    placeholder="https://apps.apple.com/..." 
                    value={iosUrl}
                    onChange={(e) => setIosUrl(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Google Play URL (Android)</label>
                <input 
                    type="url" 
                    placeholder="https://play.google.com/..." 
                    value={androidUrl}
                    onChange={(e) => setAndroidUrl(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Fallback URL</label>
                <input 
                    type="url" 
                    placeholder="https://yourwebsite.com" 
                    value={fallbackUrl}
                    onChange={(e) => setFallbackUrl(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <p className="text-xs text-[#64748B] font-medium mt-2">
                Note: This requires Dynamic Routing to be enabled to automatically detect the user's OS and redirect them to the correct store.
            </p>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { UploadCloud, Link as LinkIcon } from 'lucide-react';
import { QrFormProps } from './QrFormTypes';

const DEFAULT_CATEGORIES = ['Appetizers', 'Mains', 'Drinks', 'Desserts', 'Specials', 'Vegan'];

export default function MenuForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [restaurantName, setRestaurantName] = useState(initialData?.restaurantName || '');
    const [menuLink, setMenuLink] = useState(initialData?.menuLink || '');
    const [categories, setCategories] = useState<string[]>(initialData?.categories || ['Appetizers', 'Mains', 'Drinks', 'Desserts']);
    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        onChange({ 
            restaurantName,
            menuLink,
            categories,
            _file: fileUpload 
        });
        
        const previewUrl = menuLink || (fileUpload ? `https://nobevra.noblesworld.com.ng/hosted/menu/${fileUpload.name}` : 'https://nobevra.noblesworld.com.ng');
        onPreviewValueChange(previewUrl);
    }, [restaurantName, menuLink, categories, fileUpload]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Strict 4.5MB limit
        if (file.size > 4.5 * 1024 * 1024) {
            setUploadError('Menu file exceeds the 4.5MB limit. Please compress your PDF or image.');
            setFileUpload(null);
            return;
        }

        setUploadError('');
        setFileUpload(file);
    };

    const toggleCategory = (cat: string) => {
        setCategories(prev => 
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Restaurant Name *</label>
                <input 
                    type="text" 
                    placeholder="e.g. Blue Lagoon Café" 
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Menu Content (PDF/Image)</label>
                <div className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors ${uploadError ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#166FBB]'}`}>
                    <UploadCloud className={`w-8 h-8 mb-3 ${uploadError ? 'text-[#EF4444]' : 'text-[#166FBB]'}`} />
                    <p className="text-sm font-bold text-[#0F172A] mb-1">Upload Menu PDF</p>
                    <p className="text-xs text-[#64748B] mb-4">Max file size 4.5MB</p>
                    <input 
                        type="file" 
                        accept=".pdf,image/*"
                        onChange={handleFileChange}
                        className="hidden" 
                        id="menu-upload"
                    />
                    <label htmlFor="menu-upload" className="px-5 py-2 bg-noble-surface border border-[#E2E8F0] text-[#0F172A] text-xs font-bold rounded-lg cursor-pointer shadow-sm hover:border-[#CBD5E1]">
                        {fileUpload ? 'Change Menu' : 'Select File'}
                    </label>
                </div>
                {uploadError && <p className="text-xs font-bold text-[#EF4444]">{uploadError}</p>}
                {fileUpload && <p className="text-xs font-bold text-[#10B981] flex items-center gap-1">✓ {fileUpload.name} ready for upload</p>}
            </div>

            <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-[#E2E8F0]"></div>
                <span className="text-[10px] font-black text-[#94A3B8] tracking-widest">OR LINK TO WEBSITE</span>
                <div className="flex-1 h-px bg-[#E2E8F0]"></div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">External Menu Link</label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <LinkIcon className="w-5 h-5 text-[#94A3B8]" />
                    </div>
                    <input 
                        type="url" 
                        placeholder="https://restaurant.com/menu" 
                        value={menuLink}
                        onChange={(e) => setMenuLink(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Menu Categories</label>
                <div className="flex flex-wrap gap-2">
                    {DEFAULT_CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                                categories.includes(cat)
                                    ? 'bg-[#166FBB] text-white border-[#166FBB]'
                                    : 'bg-noble-surface text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

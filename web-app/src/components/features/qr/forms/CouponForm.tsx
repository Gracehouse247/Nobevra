import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';

export default function CouponForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [code, setCode] = useState(initialData?.code || '');
    const [discount, setDiscount] = useState(initialData?.discount || '');
    const [validUntil, setValidUntil] = useState(initialData?.validUntil || '');
    const [website, setWebsite] = useState(initialData?.website || '');

    useEffect(() => {
        onChange({ code, discount, validUntil, website });
        onPreviewValueChange(website || 'https://nobevra.noblesworld.com.ng');
    }, [code, discount, validUntil, website]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Discount Code *</label>
                    <input 
                        type="text" 
                        placeholder="SUMMER50" 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors font-mono uppercase" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Discount Detail</label>
                    <input 
                        type="text" 
                        placeholder="50% OFF" 
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Valid Until</label>
                <input 
                    type="date" 
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Redeem URL</label>
                <input 
                    type="url" 
                    placeholder="https://yourstore.com/redeem" 
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
        </div>
    );
}

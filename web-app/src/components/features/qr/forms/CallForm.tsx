import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';

export default function CallForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [phone, setPhone] = useState(initialData?.phone || '');

    useEffect(() => {
        onChange({ phone });
        
        // Format for Call: tel:phone
        const formattedStr = `tel:${phone}`;
        
        onPreviewValueChange(phone ? formattedStr : 'https://nobevra.noblesworld.com.ng');
    }, [phone]);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Phone Number to Dial *</label>
                <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
        </div>
    );
}

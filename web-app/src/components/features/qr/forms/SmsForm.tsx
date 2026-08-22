import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';

export default function SmsForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [message, setMessage] = useState(initialData?.message || '');

    useEffect(() => {
        onChange({ phone, message });
        
        // Format for QR generator: smsto:phone:message
        const formattedStr = `smsto:${phone}:${message}`;
        
        onPreviewValueChange(phone ? formattedStr : 'https://nobevra.noblesworld.com.ng');
    }, [phone, message]);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Phone Number *</label>
                <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Pre-filled Message</label>
                <textarea 
                    placeholder="Enter the text message to pre-fill..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors resize-none" 
                />
            </div>
        </div>
    );
}

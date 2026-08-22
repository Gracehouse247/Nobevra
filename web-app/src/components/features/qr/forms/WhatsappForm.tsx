import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';

export default function WhatsappForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [message, setMessage] = useState(initialData?.message || '');

    useEffect(() => {
        onChange({ phone, message });
        
        // Format for WhatsApp: https://wa.me/phone?text=urlencodedmessage
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const formattedStr = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
        
        onPreviewValueChange(cleanPhone ? formattedStr : 'https://nobevra.noblesworld.com.ng');
    }, [phone, message]);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">WhatsApp Number (with Country Code) *</label>
                <input 
                    type="tel" 
                    placeholder="+15550000000" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Pre-filled Message</label>
                <textarea 
                    placeholder="Hello, I would like to chat about..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors resize-none" 
                />
            </div>
        </div>
    );
}

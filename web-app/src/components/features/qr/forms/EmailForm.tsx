import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';

export default function EmailForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [email, setEmail] = useState(initialData?.email || '');
    const [subject, setSubject] = useState(initialData?.subject || '');
    const [body, setBody] = useState(initialData?.body || '');

    useEffect(() => {
        onChange({ email, subject, body });
        
        // Format for QR generator: MATMSG:TO:email;SUB:subject;BODY:body;;
        const formattedStr = `MATMSG:TO:${email};SUB:${subject};BODY:${body};;`;
        
        onPreviewValueChange(email ? formattedStr : 'https://nobevra.noblesworld.com.ng');
    }, [email, subject, body]);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Email Address *</label>
                <input 
                    type="email" 
                    placeholder="contact@nobevra.noblesworld.com.ng" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Subject Line</label>
                <input 
                    type="text" 
                    placeholder="Inquiry about services" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Message Body</label>
                <textarea 
                    placeholder="Hello, I would like to know more about..." 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={4}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors resize-none" 
                />
            </div>
        </div>
    );
}

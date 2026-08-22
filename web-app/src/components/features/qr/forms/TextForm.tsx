import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';

export default function TextForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [text, setText] = useState(initialData?.text || '');

    useEffect(() => {
        onChange({ text });
        onPreviewValueChange(text || 'Nobevra');
    }, [text]);

    return (
        <div className="space-y-4">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Plain Text Content</label>
            <textarea 
                placeholder="Enter any text you want to encode in the QR..." 
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors resize-none" 
            />
        </div>
    );
}

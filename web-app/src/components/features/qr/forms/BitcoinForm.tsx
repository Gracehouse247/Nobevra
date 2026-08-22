import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';

export default function BitcoinForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [address, setAddress] = useState(initialData?.address || '');
    const [amount, setAmount] = useState(initialData?.amount || '');
    const [message, setMessage] = useState(initialData?.message || '');

    useEffect(() => {
        onChange({ address, amount, message });
        
        // Format for BTC URI: bitcoin:address?amount=amount&message=message
        let uri = `bitcoin:${address}`;
        const params = [];
        if (amount) params.push(`amount=${amount}`);
        if (message) params.push(`message=${encodeURIComponent(message)}`);
        
        if (params.length > 0) uri += `?${params.join('&')}`;
        
        onPreviewValueChange(address ? uri : 'https://nobevra.noblesworld.com.ng');
    }, [address, amount, message]);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Wallet Address *</label>
                <input 
                    type="text" 
                    placeholder="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors font-mono" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Request Amount (BTC)</label>
                <input 
                    type="number" 
                    step="0.00000001"
                    placeholder="0.05" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Message / Label</label>
                <input 
                    type="text" 
                    placeholder="Payment for Invoice #1024" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
        </div>
    );
}

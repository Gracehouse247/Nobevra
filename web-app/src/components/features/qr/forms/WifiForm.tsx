import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';
import { Eye, EyeOff } from 'lucide-react';

export default function WifiForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [ssid, setSsid] = useState(initialData?.ssid || '');
    const [encryption, setEncryption] = useState(initialData?.encryption || 'WPA/WPA2');
    const [password, setPassword] = useState(initialData?.password || '');
    const [isHidden, setIsHidden] = useState(initialData?.isHidden || false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        onChange({ ssid, encryption, password, isHidden });
        
        // Format for QR generator: WIFI:S:MyNetwork;T:WPA;P:MyPassword;H:true;;
        let encCode = 'WPA';
        if (encryption === 'WEP') encCode = 'WEP';
        if (encryption === 'None') encCode = 'nopass';
        
        const hiddenFlag = isHidden ? 'true' : 'false';
        const formattedStr = `WIFI:S:${ssid};T:${encCode};P:${password};H:${hiddenFlag};;`;
        
        onPreviewValueChange(ssid ? formattedStr : 'https://nobevra.noblesworld.com.ng');
    }, [ssid, encryption, password, isHidden]);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Network Name (SSID)</label>
                <input 
                    type="text" 
                    placeholder="e.g. Home_Network" 
                    value={ssid}
                    onChange={(e) => setSsid(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Encryption Type</label>
                <select 
                    value={encryption}
                    onChange={(e) => setEncryption(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors appearance-none"
                >
                    <option value="WPA/WPA2">WPA / WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="None">None</option>
                </select>
            </div>

            {encryption !== 'None' && (
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Network Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-4 pr-12 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#64748B] hover:text-[#166FBB] transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer group mt-4">
                <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" className="peer sr-only" checked={isHidden} onChange={(e) => setIsHidden(e.target.checked)} />
                    <div className="w-5 h-5 border-2 border-[#CBD5E1] rounded group-hover:border-[#166FBB] peer-checked:bg-[#166FBB] peer-checked:border-[#166FBB] transition-colors" />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div>
                    <span className="text-sm font-bold text-[#0F172A] block leading-none mb-1">Hidden Network</span>
                    <span className="text-xs font-medium text-[#64748B]">Enable if your WiFi is not broadcasting its SSID</span>
                </div>
            </label>
        </div>
    );
}

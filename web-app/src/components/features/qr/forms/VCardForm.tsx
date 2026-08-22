import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';

export default function VCardForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [firstName, setFirstName] = useState(initialData?.firstName || '');
    const [lastName, setLastName] = useState(initialData?.lastName || '');
    const [jobTitle, setJobTitle] = useState(initialData?.jobTitle || '');
    const [organization, setOrganization] = useState(initialData?.organization || '');
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [website, setWebsite] = useState(initialData?.website || '');
    const [address, setAddress] = useState(initialData?.address || '');

    useEffect(() => {
        onChange({ firstName, lastName, jobTitle, organization, phone, email, website, address });
        
        // Format vCard string
        const vcardStr = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName};;;\nFN:${firstName} ${lastName}\nORG:${organization}\nTITLE:${jobTitle}\nTEL;TYPE=CELL:${phone}\nEMAIL;TYPE=WORK:${email}\nURL:${website}\nADR;TYPE=WORK:;;${address};;;;\nEND:VCARD`;
        
        onPreviewValueChange((firstName || lastName) ? vcardStr : 'https://nobevra.noblesworld.com.ng');
    }, [firstName, lastName, jobTitle, organization, phone, email, website, address]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">First Name *</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Alexander" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Noble" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Job Title</label>
                    <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="CEO" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Organization</label>
                    <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Nobevra" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alexander@nobevra.noblesworld.com.ng" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Website</label>
                <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://nobevra.noblesworld.com.ng" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Office Address</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} placeholder="123 Innovation Drive..." className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none resize-none" />
            </div>
        </div>
    );
}

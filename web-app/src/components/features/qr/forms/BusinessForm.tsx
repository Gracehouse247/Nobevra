import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';
import { UploadCloud, Clock, Lock } from 'lucide-react';

export default function BusinessForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    // 2. Business Info
    const [companyName, setCompanyName] = useState(initialData?.name || '');
    const [headline, setHeadline] = useState(initialData?.headline || '');
    const [website, setWebsite] = useState(initialData?.website || '');

    // 3. Opening Hours
    const [openingHours, setOpeningHours] = useState(initialData?.openingHours || [
        { day: 'Monday', isOpen: true, from: '09:00', to: '17:00' },
        { day: 'Tuesday', isOpen: true, from: '09:00', to: '17:00' },
        { day: 'Wednesday', isOpen: true, from: '09:00', to: '17:00' },
        { day: 'Thursday', isOpen: true, from: '09:00', to: '17:00' },
        { day: 'Friday', isOpen: true, from: '09:00', to: '17:00' },
        { day: 'Saturday', isOpen: false, from: '10:00', to: '14:00' },
        { day: 'Sunday', isOpen: false, from: '10:00', to: '14:00' },
    ]);

    // 4. Location
    const [street, setStreet] = useState(initialData?.street || '');
    const [city, setCity] = useState(initialData?.city || '');
    const [postalCode, setPostalCode] = useState(initialData?.postalCode || '');
    const [country, setCountry] = useState(initialData?.country || '');

    // 5. Contact Info
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [fax, setFax] = useState(initialData?.fax || '');

    // 6. Social Networks
    const [social, setSocial] = useState(initialData?.social || {
        facebook: '', instagram: '', twitter: '', linkedin: ''
    });

    // 7. About Company
    const [about, setAbout] = useState(initialData?.about || '');

    // 8. Facilities
    const [facilities, setFacilities] = useState<string[]>(initialData?.facilities || []);
    const availableFacilities = ['WiFi', 'Parking', 'Wheelchair Accessible', 'Restrooms', 'Cafe', 'Air Conditioning'];

    // 9. Welcome Screen
    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [welcomeText, setWelcomeText] = useState(initialData?.welcome || '');
    const [uploadError, setUploadError] = useState('');

    // 10. QR Name & Password
    const [qrName, setQrName] = useState(initialData?.qrName || '');
    const [isPasswordEnabled, setIsPasswordEnabled] = useState(initialData?.isPasswordEnabled || false);
    const [password, setPassword] = useState(initialData?.password || '');

    useEffect(() => {
        const address = `${street}, ${city}, ${postalCode}, ${country}`.replace(/(^[,\s]+)|([,\s]+$)/g, '');
        onChange({ 
            name: companyName,
            headline,
            website,
            openingHours,
            address,
            street, city, postalCode, country,
            phone, email, fax,
            social,
            about,
            facilities,
            welcome: welcomeText,
            qrName,
            isPasswordEnabled,
            password,
            _file: fileUpload
        });
        
        onPreviewValueChange(website || 'https://nobleinvoice.com/business');
    }, [
        companyName, headline, website, openingHours, 
        street, city, postalCode, country, phone, email, fax, social, 
        about, facilities, welcomeText, qrName, isPasswordEnabled, password, fileUpload
    ]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 4.5 * 1024 * 1024) {
            setUploadError('Image exceeds the 4.5MB direct upload limit.');
            setFileUpload(null);
            return;
        }

        setUploadError('');
        setFileUpload(file);
    };

    const toggleFacility = (f: string) => {
        if (facilities.includes(f)) {
            setFacilities(facilities.filter(item => item !== f));
        } else {
            setFacilities([...facilities, f]);
        }
    };

    const updateOpeningHour = (index: number, field: string, value: any) => {
        const updated = [...openingHours];
        updated[index] = { ...updated[index], [field]: value };
        setOpeningHours(updated);
    };

    return (
        <div className="space-y-10">
            {/* 2. Business Info */}
            <div className="space-y-4">
                <h3 className="text-lg font-black text-[#0F172A]">Business Information</h3>
                <div className="space-y-4">
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name *" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                    <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Headline" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                    <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website URL" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                </div>
            </div>

            {/* 3. Opening Hours */}
            <div className="space-y-4">
                <h3 className="text-lg font-black text-[#0F172A] flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#64748B]" /> Opening Hours
                </h3>
                <div className="space-y-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                    {openingHours.map((day: any, idx: number) => (
                        <div key={day.day} className="flex items-center gap-4 justify-between bg-noble-surface p-3 rounded-lg border border-[#E2E8F0] shadow-sm">
                            <div className="flex items-center gap-3 w-32">
                                <input type="checkbox" checked={day.isOpen} onChange={(e) => updateOpeningHour(idx, 'isOpen', e.target.checked)} className="w-4 h-4 text-[#166FBB] rounded focus:ring-[#166FBB]" />
                                <span className={`text-sm font-bold ${day.isOpen ? 'text-[#0F172A]' : 'text-[#94A3B8]'}`}>{day.day}</span>
                            </div>
                            {day.isOpen ? (
                                <div className="flex items-center gap-2">
                                    <input type="time" value={day.from} onChange={(e) => updateOpeningHour(idx, 'from', e.target.value)} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-sm font-medium focus:border-[#166FBB] outline-none" />
                                    <span className="text-[#64748B] text-xs">to</span>
                                    <input type="time" value={day.to} onChange={(e) => updateOpeningHour(idx, 'to', e.target.value)} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-sm font-medium focus:border-[#166FBB] outline-none" />
                                </div>
                            ) : (
                                <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest px-8">Closed</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Location */}
            <div className="space-y-4">
                <h3 className="text-lg font-black text-[#0F172A]">Location</h3>
                <div className="space-y-4">
                    <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street Address" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                    </div>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                </div>
            </div>

            {/* 5. Contact Info */}
            <div className="space-y-4">
                <h3 className="text-lg font-black text-[#0F172A]">Contact Information</h3>
                <div className="space-y-4">
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                    <input type="tel" value={fax} onChange={(e) => setFax(e.target.value)} placeholder="Fax (Optional)" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                </div>
            </div>

            {/* 6. Social Networks */}
            <div className="space-y-4">
                <h3 className="text-lg font-black text-[#0F172A]">Social Networks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(social).map(platform => (
                        <input 
                            key={platform}
                            type="url" 
                            value={(social as any)[platform]} 
                            onChange={(e) => setSocial({...social, [platform]: e.target.value})} 
                            placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`} 
                            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" 
                        />
                    ))}
                </div>
            </div>

            {/* 7. About Company */}
            <div className="space-y-4">
                <h3 className="text-lg font-black text-[#0F172A]">About the Company</h3>
                <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={4} placeholder="Describe your business, services, and mission..." className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none resize-none" />
            </div>

            {/* 8. Facilities */}
            <div className="space-y-4">
                <h3 className="text-lg font-black text-[#0F172A]">Facilities & Amenities</h3>
                <div className="flex flex-wrap gap-3">
                    {availableFacilities.map(f => (
                        <button 
                            key={f} 
                            onClick={() => toggleFacility(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors border ${facilities.includes(f) ? 'bg-[#166FBB] text-white border-[#166FBB]' : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#166FBB]'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* 9. Welcome Screen */}
            <div className="space-y-4">
                <h3 className="text-lg font-black text-[#0F172A]">Welcome Screen</h3>
                <div className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors relative ${uploadError ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#166FBB]'}`}>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <UploadCloud className={`w-8 h-8 mb-3 ${uploadError ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`} />
                    <p className="text-sm font-bold text-[#0F172A]">Upload Cover Image</p>
                    <p className="text-xs text-[#64748B]">Max 4.5MB</p>
                    {uploadError && <p className="text-xs font-bold text-[#EF4444] mt-2">{uploadError}</p>}
                    {fileUpload && <p className="mt-2 text-xs font-bold text-[#10B981]">{fileUpload.name}</p>}
                </div>
                <input type="text" value={welcomeText} onChange={(e) => setWelcomeText(e.target.value)} placeholder="Welcome Text (e.g. Welcome to our store!)" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
            </div>

            {/* 10. QR Name & Password */}
            <div className="space-y-4 border-t border-[#E2E8F0] pt-8">
                <h3 className="text-lg font-black text-[#0F172A]">QR Code Details</h3>
                <div className="space-y-4">
                    <input type="text" value={qrName} onChange={(e) => setQrName(e.target.value)} placeholder="Internal QR Name (e.g. Front Desk Display)" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" />
                    
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-[#64748B]" />
                                <div>
                                    <p className="text-sm font-bold text-[#0F172A]">Password Protection</p>
                                    <p className="text-xs text-[#64748B]">Require a password to view this Business Page</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={isPasswordEnabled} onChange={(e) => setIsPasswordEnabled(e.target.checked)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-noble-surface after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#166FBB]"></div>
                            </label>
                        </div>
                        
                        {isPasswordEnabled && (
                            <input 
                                type="text" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Enter Access Password" 
                                className="w-full bg-noble-surface border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none" 
                            />
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { QrFormProps } from './QrFormTypes';

export default function Mp3Form({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [trackName, setTrackName] = useState(initialData?.trackName || '');
    const [artist, setArtist] = useState(initialData?.artist || '');
    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        onChange({ 
            trackName, 
            artist,
            _file: fileUpload 
        });
        
        onPreviewValueChange(fileUpload ? `https://nobevra.noblesworld.com.ng/hosted/${fileUpload.name}` : 'https://nobevra.noblesworld.com.ng');
    }, [trackName, artist, fileUpload]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Strict 4.5MB Client-Side Size Limit
        if (file.size > 4.5 * 1024 * 1024) {
            setUploadError('Audio file exceeds the 4.5MB direct upload limit. Please compress to a lower bitrate.');
            setFileUpload(null);
            return;
        }

        setUploadError('');
        setFileUpload(file);
        
        if (!trackName) setTrackName(file.name.split('.')[0]);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Upload Asset (MP3 / Audio) *</label>
                <div className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors ${uploadError ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#166FBB]'}`}>
                    <UploadCloud className={`w-8 h-8 mb-3 ${uploadError ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`} />
                    <p className="text-sm font-bold text-[#0F172A] mb-1">Click to browse or drag and drop</p>
                    <p className="text-xs text-[#64748B] mb-4">Max file size: 4.5MB (MP3, WAV, OGG)</p>
                    <input 
                        type="file" 
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="hidden" 
                        id="audio-upload"
                    />
                    <label htmlFor="audio-upload" className="px-5 py-2 bg-noble-surface border border-[#E2E8F0] text-[#0F172A] text-xs font-bold rounded-lg cursor-pointer shadow-sm hover:border-[#CBD5E1]">
                        {fileUpload ? 'Change Audio' : 'Select Audio'}
                    </label>
                </div>
                {uploadError && <p className="text-xs font-bold text-[#EF4444]">{uploadError}</p>}
                {fileUpload && <p className="text-xs font-bold text-[#10B981] flex items-center gap-1">✓ {fileUpload.name} ready for upload</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Track Name</label>
                    <input 
                        type="text" 
                        placeholder="Song Title / Podcast Episode" 
                        value={trackName}
                        onChange={(e) => setTrackName(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Artist / Host</label>
                    <input 
                        type="text" 
                        placeholder="Creator Name" 
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                    />
                </div>
            </div>
        </div>
    );
}

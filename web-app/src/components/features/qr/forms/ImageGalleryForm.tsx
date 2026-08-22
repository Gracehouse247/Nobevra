import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';

export default function ImageGalleryForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [galleryName, setGalleryName] = useState(initialData?.galleryName || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [allowDownloads, setAllowDownloads] = useState(initialData?.allowDownloads ?? true);
    const [files, setFiles] = useState<File[]>(initialData?._files || []);
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        onChange({ galleryName, description, allowDownloads, _files: files });
        onPreviewValueChange(galleryName ? `Gallery: ${galleryName} (${files.length} images)` : 'https://nobevra.noblesworld.com.ng');
    }, [galleryName, description, allowDownloads, files]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        
        // Check size limits
        const oversized = selectedFiles.some(file => file.size > 4.5 * 1024 * 1024);
        if (oversized) {
            setUploadError('One or more images exceed the 4.5MB limit.');
            return;
        }

        setUploadError('');
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Gallery Title *</label>
                    <input 
                        type="text" 
                        placeholder="Summer Collection 2024" 
                        value={galleryName}
                        onChange={(e) => setGalleryName(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Description</label>
                    <textarea 
                        placeholder="Tell the story behind these photos..." 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors resize-none" 
                    />
                </div>
                <div className="flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                    <div>
                        <p className="text-sm font-bold text-[#0F172A]">Allow Downloads</p>
                        <p className="text-xs text-[#64748B]">Let guests save photos to their device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={allowDownloads} onChange={(e) => setAllowDownloads(e.target.checked)} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-noble-surface after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#166FBB]"></div>
                    </label>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Upload Images</label>
                <div className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors relative ${uploadError ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#166FBB]'}`}>
                    <UploadCloud className={`w-8 h-8 mb-3 ${uploadError ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`} />
                    <p className="text-sm font-bold text-[#0F172A] mb-1">Select multiple images</p>
                    <p className="text-xs text-[#64748B] mb-4">Max 4.5MB per image (JPG, PNG)</p>
                    <input 
                        type="file" 
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden" 
                        id="gallery-upload"
                    />
                    <label htmlFor="gallery-upload" className="px-5 py-2 bg-noble-surface border border-[#E2E8F0] text-[#0F172A] text-xs font-bold rounded-lg cursor-pointer shadow-sm hover:border-[#CBD5E1]">
                        Browse Files
                    </label>
                </div>
                {uploadError && <p className="text-xs font-bold text-[#EF4444]">{uploadError}</p>}
                
                {files.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {files.map((file, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-noble-surface border border-[#E2E8F0] rounded-lg">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <ImageIcon className="w-4 h-4 text-[#94A3B8] shrink-0" />
                                    <span className="text-xs font-medium text-[#64748B] truncate">{file.name}</span>
                                </div>
                                <button onClick={() => removeFile(i)} className="text-[#94A3B8] hover:text-[#EF4444]">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>


        </div>
    );
}

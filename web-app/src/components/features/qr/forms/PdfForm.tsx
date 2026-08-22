import React, { useEffect, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { QrFormProps } from './QrFormTypes';

export default function PdfForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [pdfName, setPdfName] = useState(initialData?.pdfName || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        onChange({ 
            pdfName, 
            description,
            _file: fileUpload // Used by the master engine to upload to Supabase
        });
        
        onPreviewValueChange(fileUpload ? `https://nobevra.noblesworld.com.ng/hosted/${fileUpload.name}` : 'https://nobevra.noblesworld.com.ng');
    }, [pdfName, description, fileUpload]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Strict 4.5MB Client-Side Size Limit (Approved by User)
        if (file.size > 4.5 * 1024 * 1024) {
            setUploadError('File exceeds the 4.5MB direct upload limit. Please compress your PDF.');
            setFileUpload(null);
            return;
        }

        setUploadError('');
        setFileUpload(file);
        
        // Auto-fill name if empty
        if (!pdfName) setPdfName(file.name.replace('.pdf', ''));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Upload Asset (PDF) *</label>
                <div className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors ${uploadError ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#166FBB]'}`}>
                    <UploadCloud className={`w-8 h-8 mb-3 ${uploadError ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`} />
                    <p className="text-sm font-bold text-[#0F172A] mb-1">Click to browse or drag and drop</p>
                    <p className="text-xs text-[#64748B] mb-4">Max file size: 4.5MB</p>
                    <input 
                        type="file" 
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden" 
                        id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload" className="px-5 py-2 bg-noble-surface border border-[#E2E8F0] text-[#0F172A] text-xs font-bold rounded-lg cursor-pointer shadow-sm hover:border-[#CBD5E1]">
                        {fileUpload ? 'Change File' : 'Select File'}
                    </label>
                </div>
                {uploadError && <p className="text-xs font-bold text-[#EF4444]">{uploadError}</p>}
                {fileUpload && <p className="text-xs font-bold text-[#10B981] flex items-center gap-1">✓ {fileUpload.name} ready for upload</p>}
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Document Name *</label>
                <input 
                    type="text" 
                    placeholder="e.g. Summer Collection 2024" 
                    value={pdfName}
                    onChange={(e) => setPdfName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Description (Optional)</label>
                <textarea 
                    placeholder="Briefly describe what's inside this document..." 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors resize-none" 
                />
            </div>
            
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3 mt-2">
                <span className="text-amber-500 font-bold text-lg leading-none">!</span>
                <p className="text-xs font-medium text-amber-900 leading-relaxed">
                    We strictly enforce a 4.5MB limit on PDF uploads to ensure ultra-fast load times for your customers and save storage space.
                </p>
            </div>
        </div>
    );
}

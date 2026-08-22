import React, { useEffect, useState } from 'react';
import { UploadCloud, Link as LinkIcon, Video as VideoIcon } from 'lucide-react';
import { QrFormProps } from './QrFormTypes';

export default function VideoForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [videoTitle, setVideoTitle] = useState(initialData?.videoTitle || initialData?.videoName || '');
    const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '');
    const [isUrlSource, setIsUrlSource] = useState(initialData?.isUrlSource ?? true);
    
    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        onChange({ 
            videoTitle, 
            videoUrl,
            isUrlSource,
            _file: !isUrlSource ? fileUpload : null 
        });
        
        const previewLink = isUrlSource 
            ? (videoUrl || 'https://nobevra.noblesworld.com.ng')
            : (fileUpload ? `https://nobevra.noblesworld.com.ng/hosted/${fileUpload.name}` : 'https://nobevra.noblesworld.com.ng');
            
        onPreviewValueChange(previewLink);
    }, [videoTitle, videoUrl, isUrlSource, fileUpload]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Strict 4.5MB Client-Side Size Limit
        if (file.size > 4.5 * 1024 * 1024) {
            setUploadError('Video exceeds the 4.5MB direct upload limit. Please compress your file or use a link to YouTube/Vimeo instead.');
            setFileUpload(null);
            return;
        }

        setUploadError('');
        setFileUpload(file);
        
        if (!videoTitle) setVideoTitle(file.name.split('.')[0]);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Video Title *</label>
                <input 
                    type="text" 
                    placeholder="e.g. Product Demo 2024" 
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            
            <div className="flex bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-1">
                <button
                    type="button"
                    onClick={() => setIsUrlSource(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${isUrlSource ? 'bg-noble-surface shadow-sm text-[#166FBB]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
                >
                    <LinkIcon className="w-4 h-4" /> Link URL
                </button>
                <button
                    type="button"
                    onClick={() => setIsUrlSource(false)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${!isUrlSource ? 'bg-noble-surface shadow-sm text-[#166FBB]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
                >
                    <VideoIcon className="w-4 h-4" /> Upload File
                </button>
            </div>

            {isUrlSource ? (
                <div className="space-y-2 animate-fade-in">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Video URL (YouTube, Vimeo, etc.) *</label>
                    <div className="relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <input 
                            type="url" 
                            placeholder="https://youtube.com/watch?v=..." 
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-2 animate-fade-in">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Upload Asset (Video) *</label>
                    <div className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors ${uploadError ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#166FBB]'}`}>
                        <UploadCloud className={`w-8 h-8 mb-3 ${uploadError ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`} />
                        <p className="text-sm font-bold text-[#0F172A] mb-1">Click to browse or drag and drop</p>
                        <p className="text-xs text-[#64748B] mb-4">Max file size: 4.5MB (MP4, WebM)</p>
                        <input 
                            type="file" 
                            accept="video/mp4,video/webm"
                            onChange={handleFileChange}
                            className="hidden" 
                            id="video-upload"
                        />
                        <label htmlFor="video-upload" className="px-5 py-2 bg-noble-surface border border-[#E2E8F0] text-[#0F172A] text-xs font-bold rounded-lg cursor-pointer shadow-sm hover:border-[#CBD5E1]">
                            {fileUpload ? 'Change Video' : 'Select Video'}
                        </label>
                    </div>
                    {uploadError && <p className="text-xs font-bold text-[#EF4444]">{uploadError}</p>}
                    {fileUpload && <p className="text-xs font-bold text-[#10B981] flex items-center gap-1">✓ {fileUpload.name} ready for upload</p>}
                </div>
            )}
            
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3 mt-2">
                <span className="text-amber-500 font-bold text-lg leading-none">!</span>
                <p className="text-xs font-medium text-amber-900 leading-relaxed">
                    Nobevra optimizes videos for mobile playback. For the best experience, we recommend using YouTube or Vimeo links instead of uploading directly.
                </p>
            </div>
        </div>
    );
}

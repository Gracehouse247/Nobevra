'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Trash2, Search, X, Loader2, Link as LinkIcon, Check, Crop, CheckCircle } from 'lucide-react';
import { cmsApi } from '@/lib/cmsApi';
import ReactCrop, { type Crop as CropType, centerCrop, makeAspectCrop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import imageCompression from 'browser-image-compression';

interface MediaItem {
    id: string;
    name: string;
    url: string;
    mimetype: string;
    size: number;
    created_at: string;
}

interface MediaManagerProps {
    onSelect?: (url: string) => void;
    allowSelection?: boolean;
}

export default function MediaManager({ onSelect, allowSelection = false }: MediaManagerProps) {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [uploading, setUploading] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Cropping State
    const [cropFile, setCropFile] = useState<File | null>(null);
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState<CropType>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const imgRef = React.useRef<HTMLImageElement>(null);

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        const _crop = centerCrop(
            makeAspectCrop({ unit: '%', width: 90 }, 16 / 9, width, height),
            width, height
        );
        setCrop(_crop);
    }

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const { data } = await cmsApi.listMedia();
            // API shape matches MediaItem interface
            setMedia(data as MediaItem[]);
        } catch (err) {
            console.error('Failed to fetch media:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMedia(); }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setCropFile(file);
            setCrop(undefined); // Reset crop
            
            const reader = new FileReader();
            reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
            reader.readAsDataURL(file);
            
            e.target.value = ''; // Reset input
        }
    };

    const handleUploadCrop = async () => {
        if (!completedCrop || !imgRef.current || !cropFile) return;

        setUploading(true);
        try {
            // 1. Draw cropped image to canvas
            const canvas = document.createElement('canvas');
            const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
            const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
            canvas.width = completedCrop.width;
            canvas.height = completedCrop.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('No 2d context');

            ctx.drawImage(
                imgRef.current,
                completedCrop.x * scaleX,
                completedCrop.y * scaleY,
                completedCrop.width * scaleX,
                completedCrop.height * scaleY,
                0, 0,
                completedCrop.width,
                completedCrop.height
            );

            // 2. Convert canvas to Blob
            const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob((b) => {
                    if (b) resolve(b); else reject(new Error('Canvas empty'));
                }, cropFile.type);
            });

            const croppedFile = new File([blob], cropFile.name, { type: cropFile.type });

            // 3. Compress using browser-image-compression
            const compressedFile = await imageCompression(croppedFile, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            });

            // 4. Upload
            await cmsApi.uploadImage(compressedFile);
            setImgSrc('');
            setCropFile(null);
            fetchMedia();
        } catch (err) {
            console.error('Crop & Upload failed:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm('Delete this image permanently?')) return;
        try {
            // deleteMedia uses the file name (path) in Supabase Storage
            await cmsApi.deleteMedia(name);
            setMedia(media.filter(m => m.id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const copyToClipboard = (url: string, id: string) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredMedia = media.filter(m => 
        m.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                        placeholder="Search media..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-black/5  border border-black/5  rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700  focus:outline-none focus:border-[#006970]/50 transition-all font-medium"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <label className={`cursor-pointer bg-[#006970] hover:bg-[#006970] text-foreground  px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-indigo-600/20 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                        Upload Image
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} disabled={uploading} />
                    </label>
                </div>
            </header>

            {/* Cropper Modal */}
            <AnimatePresence>
                {imgSrc && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <div className="bg-noble-surface rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-noble-text">Crop Image</h3>
                                    <p className="text-sm text-slate-500">Adjust the image before uploading</p>
                                </div>
                                <button onClick={() => { setImgSrc(''); setCropFile(null); }} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-auto bg-slate-50 rounded-xl flex items-center justify-center border border-noble-border">
                                <ReactCrop
                                    crop={crop}
                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                    onComplete={(c) => setCompletedCrop(c)}
                                    className="max-h-[60vh]"
                                >
                                    <img
                                        ref={imgRef}
                                        src={imgSrc}
                                        alt="Crop me"
                                        className="max-h-[60vh] object-contain"
                                        onLoad={onImageLoad}
                                    />
                                </ReactCrop>
                            </div>

                            <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button 
                                    onClick={() => { setImgSrc(''); setCropFile(null); }}
                                    className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUploadCrop}
                                    disabled={uploading}
                                    className="px-6 py-2.5 rounded-xl font-bold bg-[#006970] text-white hover:bg-[#005a60] transition-colors flex items-center gap-2 shadow-lg shadow-[#006970]/20 disabled:opacity-50"
                                >
                                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crop className="w-4 h-4" />}
                                    Crop & Upload
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-3">
                        <Loader2 className="w-8 h-8 text-[#006970] animate-spin" />
                        <p className="text-sm font-bold">Scanning media library...</p>
                    </div>
                ) : filteredMedia.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-600 gap-4 border-2 border-dashed border-black/5  rounded-3xl">
                        <ImageIcon className="w-12 h-12 opacity-20" />
                        <p className="text-sm font-semibold">No media found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-8">
                        {filteredMedia.map((item) => (
                            <motion.div 
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="group relative aspect-square glass-card rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#006970]/30 transition-all"
                            >
                                <img 
                                    src={item.url} 
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                    <p className="text-[10px] font-bold text-foreground  text-center truncate w-full px-2 mb-1">{item.name}</p>
                                    <div className="flex gap-2">
                                        {allowSelection ? (
                                            <button 
                                                onClick={() => onSelect?.(item.url)}
                                                className="p-2 bg-[#006970] text-foreground  rounded-lg hover:bg-[#006970] transition-all font-bold text-[10px]"
                                            >
                                                Select
                                            </button>
                                        ) : (
                                            <>
                                                <button 
                                                    onClick={() => copyToClipboard(item.url, item.id)}
                                                    className="p-2 bg-black/10  text-foreground  rounded-lg hover:bg-noble-surface/20 transition-all"
                                                    title="Copy URL"
                                                >
                                                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <LinkIcon className="w-3.5 h-3.5" />}
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(item.id, item.name)}
                                                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


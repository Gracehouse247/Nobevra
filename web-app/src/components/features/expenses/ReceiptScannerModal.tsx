'use client';

import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Camera, Upload, X, Sparkles, Loader2,
    CheckCircle2, AlertCircle, ReceiptText,
    ZoomIn, RotateCcw, ScanLine
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

interface ScannedExpenseData {
    vendor?: string;
    amount?: number;
    currency_code?: string;
    expense_date?: string;
    category?: string;
    notes?: string;
    tax_amount?: number | null;
    line_items?: Array<{
        description: string;
        quantity: number;
        unit_price: number;
        total: number;
    }>;
}

interface ReceiptScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDataExtracted: (data: ScannedExpenseData) => void;
}

type ScanStage = 'idle' | 'previewing' | 'scanning' | 'success' | 'error';

export default function ReceiptScannerModal({
    isOpen,
    onClose,
    onDataExtracted,
}: ReceiptScannerModalProps) {
    const { user } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const [stage, setStage] = useState<ScanStage>('idle');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [scannedData, setScannedData] = useState<ScannedExpenseData | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const resetState = () => {
        setStage('idle');
        setPreviewUrl(null);
        setSelectedFile(null);
        setScannedData(null);
        setErrorMessage('');
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleFileSelect = (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file (JPEG, PNG, WEBP).');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.error('Image must be smaller than 10MB.');
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setSelectedFile(file);
        setStage('previewing');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileSelect(file);
    }, []);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                // Strip the data URL prefix: "data:image/jpeg;base64,"
                resolve(result.split(',')[1]);
            };
            reader.onerror = reject;
        });
    };

    const handleScan = async () => {
        if (!selectedFile || !user) return;

        setStage('scanning');
        setErrorMessage('');

        try {
            // Get Supabase session token for auth
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) {
                throw new Error('Session expired. Please refresh and try again.');
            }

            // Convert image to base64
            const imageBase64 = await fileToBase64(selectedFile);
            const mimeType = selectedFile.type;

            // Call the Supabase Edge Function
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/scan-receipt`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    },
                    body: JSON.stringify({ imageBase64, mimeType }),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || result.error || 'Failed to scan receipt.');
            }

            setScannedData(result.data);
            setStage('success');
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Scan failed. Try a clearer image.';
            setErrorMessage(msg);
            setStage('error');
        }
    };

    const handleConfirm = () => {
        if (scannedData) {
            onDataExtracted(scannedData);
            toast.success('Expense pre-filled from receipt!');
            handleClose();
        }
    };

    const formatCurrency = (amount?: number, code?: string) => {
        if (!amount) return '—';
        try {
            return new Intl.NumberFormat('en', {
                style: 'currency',
                currency: code || 'NGN',
                minimumFractionDigits: 2,
            }).format(amount);
        } catch {
            return `${code || ''} ${amount.toFixed(2)}`;
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={(e) => e.target === e.currentTarget && handleClose()}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="relative w-full max-w-lg bg-noble-surface/90 backdrop-blur-3xl border border-white/60 rounded-[32px] shadow-[0_40px_80px_rgba(0,0,0,0.15)] overflow-hidden"
                >
                    {/* Ambient gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-noble-blue/5 via-transparent to-electric-cyan/5 pointer-events-none" />

                    {/* Header */}
                    <div className="relative flex items-center justify-between px-8 pt-8 pb-6 border-b border-slate-100/60">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-noble-blue/10 flex items-center justify-center">
                                <ScanLine className="w-5 h-5 text-noble-blue" />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-noble-text tracking-tight">AI Receipt Scanner</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by Gemini Vision</p>
                            </div>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleClose}
                            className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </motion.button>
                    </div>

                    {/* Body */}
                    <div className="relative p-8">
                        {/* STAGE: idle — Drop zone */}
                        {stage === 'idle' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer ${
                                        isDragging
                                            ? 'border-noble-blue bg-noble-blue/5 scale-[1.02]'
                                            : 'border-noble-border hover:border-noble-blue/50 hover:bg-slate-50/50'
                                    }`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-noble-blue/20 to-electric-cyan/20 flex items-center justify-center">
                                            <ReceiptText className="w-7 h-7 text-noble-blue" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-800">
                                                {isDragging ? 'Drop your receipt here' : 'Upload or drag a receipt'}
                                            </p>
                                            <p className="text-xs text-slate-400 font-semibold mt-1">
                                                JPEG, PNG, WEBP · Max 10MB
                                            </p>
                                        </div>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="flex items-center gap-3 my-5">
                                    <div className="flex-1 h-px bg-slate-200" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">or</span>
                                    <div className="flex-1 h-px bg-slate-200" />
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => cameraInputRef.current?.click()}
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-noble-blue text-white font-black text-[11px] uppercase tracking-[0.15em] rounded-2xl shadow-[0_10px_25px_rgba(22,111,187,0.2)] hover:bg-blue-600 transition-all"
                                >
                                    <Camera className="w-4 h-4" />
                                    Take a Photo
                                </motion.button>
                                <input
                                    ref={cameraInputRef}
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    className="hidden"
                                    onChange={handleInputChange}
                                />
                            </motion.div>
                        )}

                        {/* STAGE: previewing — Show image preview */}
                        {stage === 'previewing' && previewUrl && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                                <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-md aspect-[4/3]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={previewUrl}
                                        alt="Receipt preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                    <div className="absolute bottom-3 left-3">
                                        <span className="text-white text-[9px] font-black uppercase tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                            {selectedFile?.name}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={resetState}
                                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        Re-upload
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleScan}
                                        className="flex-[2] flex items-center justify-center gap-2 py-3.5 bg-noble-blue text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-[0_8px_20px_rgba(22,111,187,0.2)] hover:bg-blue-600 transition-all"
                                    >
                                        <Sparkles className="w-3.5 h-3.5" />
                                        Scan with AI
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* STAGE: scanning — Loading animation */}
                        {stage === 'scanning' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center gap-5 py-10"
                            >
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-full bg-noble-blue/10 flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 text-noble-blue animate-spin" />
                                    </div>
                                    <motion.div
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full border-2 border-noble-blue/30"
                                    />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-sm font-black text-slate-800">Scanning receipt...</p>
                                    <p className="text-xs text-slate-400 font-semibold">Gemini Vision is extracting your expense data</p>
                                </div>
                            </motion.div>
                        )}

                        {/* STAGE: success — Show extracted data */}
                        {stage === 'success' && scannedData && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-5"
                            >
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    <p className="text-sm font-black text-slate-800">Receipt scanned successfully!</p>
                                </div>

                                <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-5 space-y-3">
                                    {[
                                        { label: 'Merchant', value: scannedData.vendor || '—' },
                                        { label: 'Amount', value: formatCurrency(scannedData.amount, scannedData.currency_code) },
                                        { label: 'Date', value: scannedData.expense_date || '—' },
                                        { label: 'Category', value: scannedData.category || '—' },
                                        { label: 'Notes', value: scannedData.notes || '—' },
                                        ...(scannedData.tax_amount ? [{ label: 'Tax', value: formatCurrency(scannedData.tax_amount, scannedData.currency_code) }] : []),
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex items-start justify-between gap-4">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{label}</span>
                                            <span className="text-xs font-bold text-slate-700 text-right">{value}</span>
                                        </div>
                                    ))}

                                    {scannedData.line_items && scannedData.line_items.length > 0 && (
                                        <div className="pt-3 border-t border-noble-border">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Line Items</p>
                                            {scannedData.line_items.slice(0, 3).map((item, i) => (
                                                <div key={i} className="flex justify-between items-center text-xs text-slate-600 py-1">
                                                    <span className="truncate max-w-[180px] font-semibold">{item.description}</span>
                                                    <span className="font-bold ml-2">{formatCurrency(item.total, scannedData.currency_code)}</span>
                                                </div>
                                            ))}
                                            {scannedData.line_items.length > 3 && (
                                                <p className="text-[10px] text-slate-400 font-semibold mt-1">
                                                    +{scannedData.line_items.length - 3} more items
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={resetState}
                                        className="flex-1 py-3.5 bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all"
                                    >
                                        Retry
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleConfirm}
                                        className="flex-[2] flex items-center justify-center gap-2 py-3.5 bg-noble-blue text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-[0_8px_20px_rgba(22,111,187,0.2)] hover:bg-blue-600 transition-all"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Use This Data
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* STAGE: error */}
                        {stage === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center gap-5 py-6"
                            >
                                <div className="w-16 h-16 rounded-3xl bg-rose-50 flex items-center justify-center">
                                    <AlertCircle className="w-7 h-7 text-rose-500" />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-sm font-black text-slate-800">Scan failed</p>
                                    <p className="text-xs text-slate-500 font-semibold max-w-xs">{errorMessage}</p>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={resetState}
                                    className="px-8 py-3.5 bg-noble-blue text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-[0_8px_20px_rgba(22,111,187,0.2)] hover:bg-blue-600 transition-all"
                                >
                                    Try Again
                                </motion.button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

'use client';
import React, { useState, useRef } from 'react';
import { Sparkles, Trash2, Sliders, Check, Upload, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface BackgroundRemoverProps {
  onProcessed: (transparentPngUrl: string) => void;
}

export const BackgroundRemover: React.FC<BackgroundRemoverProps> = ({ onProcessed }) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState(30);
  const [keyColor, setKeyColor] = useState({ r: 255, g: 255, b: 255 }); // Default white background removal
  const [isProcessing, setIsProcessing] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImage(reader.result as string);
      setProcessedImage(null);
      toast.success('Image loaded! Adjust options to remove background.');
    };
    reader.readAsDataURL(file);
  };

  const processBackgroundRemoval = () => {
    if (!originalImage || !canvasRef.current || !imageRef.current) return;
    
    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    if (!ctx) return;

    // Set canvas dimensions to match the image dimensions
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Draw the original image onto the canvas
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Auto-detect key color from the top-left pixel if it's white/light
    const autoR = data[0];
    const autoG = data[1];
    const autoB = data[2];

    // Simple pixel-by-pixel chroma key removal
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Calculate distance between pixel color and target removal color
      const distance = Math.sqrt(
        Math.pow(r - keyColor.r, 2) +
        Math.pow(g - keyColor.g, 2) +
        Math.pow(b - keyColor.b, 2)
      );

      // If within tolerance threshold, set alpha to 0 (fully transparent)
      if (distance < tolerance * 2.5) {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const resultUrl = canvas.toDataURL('image/png');
    setProcessedImage(resultUrl);
    setIsProcessing(false);
    toast.success('Background stripped successfully! ✨');
  };

  const handleApply = () => {
    if (processedImage) {
      onProcessed(processedImage);
      toast.success('Asset added to active design canvas!');
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-50 border border-noble-border rounded-2xl">
      <div className="flex items-center gap-1.5 text-blue-600">
        <Sparkles size={16} />
        <span className="font-bold text-xs uppercase tracking-wider">Noble AI Backdrop Remover</span>
      </div>

      <input
        type="file"
        id="bg-remover-upload"
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
      />

      {!originalImage ? (
        <button
          onClick={() => document.getElementById('bg-remover-upload')?.click()}
          className="h-32 border-2 border-dashed border-noble-border hover:border-blue-600 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50/20 transition-all cursor-pointer"
        >
          <Upload size={24} />
          <span className="text-xs font-bold uppercase tracking-wider">Upload Portrait or Logo</span>
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Preview Container */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center">
            {/* Checkerboard transparency background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 20%, transparent 20%), radial-gradient(#000 20%, transparent 20%)', backgroundSize: '16px 16px', backgroundPosition: '0 0, 8px 8px' }} />
            
            <img
              ref={imageRef}
              src={originalImage}
              alt="Source"
              className="max-h-full max-w-full object-contain z-10"
              style={{ display: processedImage ? 'none' : 'block' }}
              crossOrigin="anonymous"
            />
            {processedImage && (
              <img src={processedImage} alt="Processed" className="max-h-full max-w-full object-contain z-10" />
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {/* Tolerance controls */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1"><Sliders size={12} /> Color Key Tolerance</span>
              <span className="text-blue-600">{tolerance}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={tolerance}
              onChange={(e) => setTolerance(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            {/* Quick Presets */}
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => { setKeyColor({ r: 255, g: 255, b: 255 }); toast.success('Targeted white background'); }}
                className="flex-1 py-1 text-[9px] font-bold uppercase border border-noble-border rounded-lg bg-noble-surface text-slate-600 hover:bg-slate-50"
              >
                Target White
              </button>
              <button
                onClick={() => { setKeyColor({ r: 0, g: 0, b: 0 }); toast.success('Targeted black background'); }}
                className="flex-1 py-1 text-[9px] font-bold uppercase border border-noble-border rounded-lg bg-noble-surface text-slate-600 hover:bg-slate-50"
              >
                Target Black
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setOriginalImage(null)}
              className="px-3 py-2 border border-noble-border rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all"
            >
              <Trash2 size={16} />
            </button>
            {!processedImage ? (
              <button
                onClick={processBackgroundRemoval}
                disabled={isProcessing}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} />}
                {isProcessing ? 'Removing...' : 'Strip Backdrop'}
              </button>
            ) : (
              <button
                onClick={handleApply}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Check size={14} />
                Apply Asset
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, RefreshCw, Download, QrCode } from 'lucide-react';

export default function LiveQrPreview() {
  const [url, setUrl] = useState('https://nobevra.noblesworld.com.ng/pay/demo');
  const [color, setColor] = useState('#0B1021'); // near-black

  return (
    <section className="py-24 bg-noble-blue/5 border-y border-noble-blue/10 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-16 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
            Interactive Demo
          </div>
          <h2 className="font-inter text-3xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-4">
            Try the Live <span className="text-noble-blue">QR Code Generator.</span>
          </h2>
          <p className="text-lg text-near-black/60 max-w-2xl mx-auto">
            Type a URL or message below and watch your QR code generate instantly. This is the exact technology powering Nobevra payments.
          </p>
        </div>

        <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-xl max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Input Side */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-near-black mb-2 flex items-center gap-2">
                <GlobeIcon className="w-4 h-4 text-noble-blue" />
                Destination URL or Text
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-noble-blue/20 transition-all font-medium text-near-black"
                placeholder="https://yourwebsite.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-near-black mb-3">
                QR Code Colour
              </label>
              <div className="flex gap-3">
                {['#0B1021', '#166FBB', '#01A0E2', '#10B981', '#F43F5E'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      color === c ? 'border-near-black scale-110' : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: c }}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#F8FAFC] text-near-black font-bold text-sm rounded-xl border border-slate-200 hover:bg-slate-100 transition-all">
                <RefreshCw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>

          {/* Preview Side */}
          <div className="flex flex-col items-center justify-center bg-[#F8FAFC] rounded-2xl p-10 border border-slate-100 relative">
            <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-2 text-xs font-bold text-near-black shadow-sm">
              <QrCode className="w-3 h-3 text-noble-blue" />
              Live Preview
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 transition-all">
              <QRCodeSVG
                value={url || 'https://nobevra.noblesworld.com.ng'}
                size={200}
                fgColor={color}
                bgColor="#FFFFFF"
                level="Q"
                includeMargin={false}
              />
            </div>
            
            <p className="text-xs text-near-black/50 text-center font-medium max-w-[250px]">
              Point your phone camera at this QR code to test the live destination.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}

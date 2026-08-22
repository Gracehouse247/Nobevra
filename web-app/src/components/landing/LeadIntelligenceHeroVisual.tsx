'use client';

import React, { useState } from 'react';
import { QrCode, CheckCircle2, Eye, Link as LinkIcon } from 'lucide-react';

export default function LeadIntelligenceHeroVisual() {
  const [url, setUrl] = useState('nobevra.noblesworld.com.ng/pay/inv-2024');

  return (
    <div
      className="relative flex justify-center items-center lg:pl-10"
      style={{ perspective: '1200px' }}
    >
      {/* Interactive URL Input */}
      <div className="absolute top-0 right-0 md:-right-4 z-30 bg-noble-surface shadow-2xl rounded-2xl p-4 w-64 md:w-72 border border-noble-blue/10 transform translate-y-[-20%]">
        <label className="text-xs font-black text-near-black mb-2 block uppercase tracking-widest text-noble-blue">
          Test the Generator
        </label>
        <div className="flex bg-slate-50 border border-noble-border hover:border-noble-blue/50 focus-within:border-noble-blue transition-colors rounded-lg p-2.5 items-center gap-2">
          <LinkIcon className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-near-black placeholder:text-slate-400 font-medium"
            placeholder="Enter your website URL..."
          />
        </div>
      </div>

      <div
        className="relative group z-10 w-full transition-transform duration-700 ease-out hover:rotate-0 hover:scale-105"
        style={{ transform: 'rotateY(-10deg) rotateX(4deg) scale(1.02)' }}
      >
        <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/20 to-electric-cyan/20 blur-2xl rounded-[40px] opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
        <div className="relative bg-noble-surface/50 backdrop-blur-sm p-4 rounded-[32px] shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-white/80 overflow-hidden">
          {/* Browser Chrome */}
          <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <div className="ml-4 bg-noble-surface/60 px-3 py-1 rounded-md text-xs text-slate-500 font-medium flex-1 truncate">
              {url || 'app.nobevra.noblesworld.com.ng/qr'}
            </div>
          </div>
          {/* QR Code Preview Visual */}
          <div className="rounded-[24px] bg-gradient-to-br from-slate-50 to-[#EEF7FE] p-8 border border-slate-100/50">
            <div className="flex flex-col items-center gap-6">
              {/* Simulated QR Code */}
              <div className="relative w-48 h-48 bg-noble-surface rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center p-4">
                <div className="w-full h-full grid grid-cols-7 gap-1">
                  {Array.from({ length: 49 }).map((_, i) => {
                    const corners = [0, 1, 5, 6, 7, 13, 35, 41, 42, 43, 47, 48];
                    const isCorner = corners.includes(i);
                    // Make the pattern shift slightly based on URL length to simulate live generation
                    const randomOffset = url.length % 5;
                    const random = ((i * 37 + 13 + randomOffset) % 5) > 2;
                    return (
                      <div
                        key={i}
                        className={`rounded-sm transition-colors duration-300 ${
                          isCorner || random ? 'bg-noble-blue' : 'bg-slate-100'
                        }`}
                      />
                    );
                  })}
                </div>
                {/* Center Logo placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-noble-surface rounded-lg shadow-md flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-noble-blue" />
                  </div>
                </div>
              </div>
              <div className="text-center w-full max-w-[200px]">
                <p className="text-xs font-black text-near-black uppercase tracking-widest mb-1">
                  Scan to Pay Instantly
                </p>
                <p className="text-[10px] text-near-black/50 font-medium truncate w-full">
                  {url || 'your-website.com'}
                </p>
              </div>
              <div className="flex gap-3 w-full">
                <div className="flex-1 bg-noble-blue/10 rounded-xl px-3 py-2 text-center">
                  <p className="text-[10px] font-black text-noble-blue uppercase tracking-widest">
                    247
                  </p>
                  <p className="text-[9px] text-near-black/50 font-bold">Scans</p>
                </div>
                <div className="flex-1 bg-emerald-50 rounded-xl px-3 py-2 text-center">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    89%
                  </p>
                  <p className="text-[9px] text-near-black/50 font-bold">Paid</p>
                </div>
                <div className="flex-1 bg-amber-50 rounded-xl px-3 py-2 text-center">
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">
                    14
                  </p>
                  <p className="text-[9px] text-near-black/50 font-bold">Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-noble-surface rounded-2xl px-5 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-near-black/5 z-20 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <p className="text-[10px] font-black text-near-black uppercase tracking-wider">
            QR Payment Received
          </p>
          <p className="text-base font-black text-green-700">+$3,200.00</p>
        </div>
      </div>

      <div className="absolute -top-4 -left-4 md:-left-6 lg:left-auto lg:-right-6 bg-noble-surface rounded-2xl px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.10)] border border-near-black/5 z-20 flex items-center gap-2.5">
        <Eye className="w-4 h-4 text-noble-blue" />
        <div>
          <p className="text-[9px] font-black text-near-black/60 uppercase tracking-widest">
            Live Scan
          </p>
          <p className="text-[11px] font-black text-near-black">Lagos, NG</p>
        </div>
      </div>
    </div>
  );
}

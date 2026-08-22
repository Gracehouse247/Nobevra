"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, ChevronRight } from "lucide-react";
import { LegalCategory, LegalSidebar, LegalMobileTOC } from "./LegalSidebar";

export function LegalLayout({
  title,
  description,
  categories,
  children,
  lastUpdated,
  icon,
  iconBg,
}: {
  title: string;
  description: string;
  categories: LegalCategory[];
  children: React.ReactNode;
  lastUpdated?: string;
  icon?: React.ReactNode;
  iconBg?: string;
}) {
  const [activeSection, setActiveSection] = useState(categories[0]?.sections[0]?.id || "");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileTOCOpen, setMobileTOCOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const sections = categories.flatMap(c => c.sections);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const progress = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Active section detection
      const sectionEls = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));
      const scrollPos = window.scrollY + 120;
      let current = sections[0]?.id || "";
      for (const { id, el } of sectionEls) {
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50" style={{ background: "#e2e8f0" }}>
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, #006970, #01A0E2, #00F0FF)",
          }}
        />
      </div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b"
        style={{ background: "rgba(255, 255, 255, 0.9)", borderColor: "#e2e8f0" }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#006970,#01A0E2)" }}>
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight" style={{ color: "#050B1A" }}>
              Nobevra
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden sm:flex items-center gap-2 text-sm font-semibold transition-colors hover:text-blue-600"
              style={{ color: "#475569" }}>
              <ArrowLeft className="w-4 h-4" /> Back to Website
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg"
              style={{ background: "#F1F5F9" }}
              onClick={() => setMobileTOCOpen(true)}
            >
              <ChevronRight className="w-5 h-5" style={{ color: "#050B1A" }} />
            </button>
          </div>
        </div>
      </nav>

      <LegalMobileTOC
        categories={categories}
        activeSection={activeSection}
        open={mobileTOCOpen}
        onClose={() => setMobileTOCOpen(false)}
      />

      <div className="max-w-[1400px] mx-auto pt-16 flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 shrink-0 sticky top-16 border-r"
          style={{ height: "calc(100vh - 64px)", borderColor: "#e2e8f0" }}>
          <LegalSidebar
            categories={categories}
            activeSection={activeSection}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 pb-32">
          {/* Hero Banner */}
          <div className="px-6 sm:px-10 py-16 sm:py-24 border-b"
            style={{ background: "white", borderColor: "#e2e8f0" }}>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6"
                style={{ background: "#EFF6FF", color: "#1D4ED8" }}>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Legal & Compliance
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-noble-text mb-4">{title}</h1>
              <p className="text-slate-600 dark:text-slate-400 dark:text-slate-500 text-lg leading-relaxed max-w-xl mb-6">
                {description}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-10 py-10 max-w-none">
            {children}
            
            {/* Footer note */}
            <div className="mt-8 pt-8 border-t text-center" style={{ borderColor: "#e2e8f0" }}>
              <div className="inline-flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5" style={{ color: "#01A0E2" }} />
                <span className="font-bold text-sm" style={{ color: "#050B1A" }}>The Noble's Technology Services</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                &copy; {new Date().getFullYear()} Nobevra. A product of The Noble's Technology Services. All rights reserved.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

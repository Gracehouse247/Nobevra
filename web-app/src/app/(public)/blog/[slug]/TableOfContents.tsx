'use client';

import { useEffect, useState } from 'react';

type Heading = { level: number; text: string; id: string };

export default function TableOfContents({ headings }: { headings: Heading[] }) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-80px 0% -60% 0%', threshold: 0 }
        );

        headings.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav aria-label="Table of contents">
            <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#166FBB] to-[#01A0E2] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>
                </div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0F172A] ">Contents</span>
            </div>

            <div className="space-y-0.5 relative max-h-[320px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 &::-webkit-scrollbar-thumb]:bg-slate-700">
                {/* Left rail */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#E2E8F0] rounded-full" />

                {headings.map((heading) => {
                    const isActive = activeId === heading.id;
                    return (
                        <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById(heading.id);
                                if (el) {
                                    const y = el.getBoundingClientRect().top + window.scrollY - 100;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                            }}
                            className={`relative flex items-start transition-all duration-200 py-1 ${
                                heading.level === 2 ? 'pl-4' : 'pl-8' }`}
                        >
                            {/* Active indicator on the rail */}
                            {isActive && (
                                <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#166FBB] to-[#01A0E2] rounded-full" />
                            )}
                            <span className={`text-[12px] leading-tight transition-colors duration-200 ${
                                isActive
                                    ? 'text-[#166FBB] font-bold' : heading.level === 2
                                    ? 'text-[#334155] font-medium hover:text-[#166FBB]' : 'text-[#64748B] hover:text-[#166FBB]' }`}>
                                {heading.text}
                            </span>
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}

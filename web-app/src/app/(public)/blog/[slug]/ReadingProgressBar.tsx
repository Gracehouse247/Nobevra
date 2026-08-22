'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(100, pct));
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent">
            <div
                className="h-full transition-all duration-75 ease-linear"
                style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #166FBB 0%, #01A0E2 50%, #00D4AA 100%)',
                    boxShadow: '0 0 10px rgba(22, 111, 187, 0.6)',
                }}
            />
        </div>
    );
}

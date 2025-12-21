'use client';

// ═══════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useScrollStore } from '@/store/scrollStore';
import { PHOTOS } from '@/lib/constants';

export default function SmoothScroll() {
    useLenis();
    const setProgress = useScrollStore(state => state.setProgress);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            setProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setProgress]);

    // Create scroll sections for each photo
    return (
        <div className="fixed top-0 left-0 w-full pointer-events-none z-0">
            {PHOTOS.map((_, i) => (
                <section key={i} className="h-screen" aria-hidden="true" />
            ))}
        </div>
    );
}

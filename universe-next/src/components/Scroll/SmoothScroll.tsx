'use client';

// ═══════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL - With proper cleanup to prevent memory leaks
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useRef } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useScrollStore } from '@/store/scrollStore';
import { PHOTOS } from '@/lib/constants';

export default function SmoothScroll() {
    useLenis();
    const setProgress = useScrollStore(state => state.setProgress);
    const setIsScrolling = useScrollStore(state => state.setIsScrolling);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;

            setProgress(progress);
            setIsScrolling(true);

            // Clear previous timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set scrolling to false after idle
            timeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // ✅ CRITICAL: Cleanup on unmount - prevents memory leaks
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [setProgress, setIsScrolling]);

    // Create scroll sections for each photo
    return (
        <div className="fixed top-0 left-0 w-full pointer-events-none z-0">
            {PHOTOS.map((_, i) => (
                <section key={i} className="h-screen" aria-hidden="true" />
            ))}
        </div>
    );
}

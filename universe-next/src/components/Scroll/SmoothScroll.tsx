'use client';

// ═══════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL - Creates scrollable sections for the journey
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

        // Initial call to set progress on load
        handleScroll();

        // ✅ CRITICAL: Cleanup on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [setProgress, setIsScrolling]);

    // ✅ FIX: Use RELATIVE positioning to create actual scroll height
    // Each section is 100vh, creating 11 * 100vh = 1100vh of scrollable content
    return (
        <div className="relative w-full" style={{ pointerEvents: 'auto' }}>
            {PHOTOS.map((photo, i) => (
                <section
                    key={i}
                    className="h-screen w-full"
                    data-scene={i}
                >
                    {/* Invisible section - Canvas renders the visuals */}
                </section>
            ))}
        </div>
    );
}

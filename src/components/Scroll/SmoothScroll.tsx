'use client';

// ═══════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL - Native scroll with velocity tracking
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useRef } from 'react';
import { useScrollStore } from '@/store/scrollStore';

export default function SmoothScroll() {
    const setProgress = useScrollStore(state => state.setProgress);
    const setIsScrolling = useScrollStore(state => state.setIsScrolling);
    const updateSmoothVelocity = useScrollStore(state => state.updateSmoothVelocity);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Update smooth velocity via requestAnimationFrame
        let frameId: number;
        const updateVelocity = () => {
            updateSmoothVelocity();
            frameId = requestAnimationFrame(updateVelocity);
        };
        frameId = requestAnimationFrame(updateVelocity);

        // Native scroll handler
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
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(frameId);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [setProgress, setIsScrolling, updateSmoothVelocity]);

    return (
        <div className="relative w-full z-10">
            {/* Long scrollable area - Optimized for fast pacing */}
            <div className="h-[1800vh] w-full" />
        </div>
    );
}

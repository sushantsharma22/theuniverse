'use client';

// ═══════════════════════════════════════════════════════════════════════════
// LENIS SMOOTH SCROLL HOOK - With proper cleanup
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);
    const rafIdRef = useRef<number | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Use GSAP ticker for RAF
        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        // ✅ CRITICAL: Cleanup on unmount - prevents memory leaks
        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
            lenisRef.current = null;

            // Cancel any pending RAF
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
        };
    }, []);

    return lenisRef;
}

'use client';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE ENDING - Flash FIRST, then message (matches StartScreen style)
// ═══════════════════════════════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';
import { UNIVERSE_END_POSITION } from '@/lib/constants';

export default function UniverseEnding() {
    const { cameraZ } = useScrollStore();

    // WORMHOLE is at -6950, UNIVERSE_END is at -7200
    // Flash starts at -7000 and peaks at -7100
    const flashStart = -7000;
    const flashPeak = -7100;
    const flashEnd = -7150;
    const messageStart = -7150;

    // Calculate flash opacity - rises then falls
    let flashOpacity = 0;
    if (cameraZ < flashStart && cameraZ > flashEnd) {
        if (cameraZ > flashPeak) {
            // Rising phase
            flashOpacity = (flashStart - cameraZ) / (flashStart - flashPeak);
        } else {
            // Falling phase
            flashOpacity = (cameraZ - flashEnd) / (flashPeak - flashEnd);
        }
    }

    // Ending message appears AFTER flash fades
    const showEnding = cameraZ < messageStart;
    const endingOpacity = showEnding ? Math.min(1, (messageStart - cameraZ) / 100) : 0;

    return (
        <>
            {/* BRIGHT FLASH - Peaks then fades */}
            {flashOpacity > 0.05 && (
                <div
                    className="fixed inset-0 z-[100] pointer-events-none bg-white"
                    style={{ opacity: flashOpacity }}
                />
            )}

            {/* ENDING MESSAGE - Appears AFTER flash */}
            <AnimatePresence>
                {showEnding && endingOpacity > 0.1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: endingOpacity }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[101] flex flex-col items-center justify-center bg-black"
                        style={{ pointerEvents: endingOpacity > 0.5 ? 'auto' : 'none' }}
                    >
                        {/* Main message - same style as "THE UNIVERSE" */}
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-xl md:text-2xl font-extralight tracking-[0.3em] text-white/80 mb-6 text-center italic"
                            style={{ textShadow: '0 0 40px rgba(100, 150, 255, 0.2)' }}
                        >
                            From the ashes of dying stars
                        </motion.p>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-xl md:text-2xl font-extralight tracking-[0.3em] text-white/70 mb-12 text-center italic"
                            style={{ textShadow: '0 0 40px rgba(100, 150, 255, 0.2)' }}
                        >
                            new life awaits its moment
                        </motion.p>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-sm md:text-base tracking-[0.25em] text-white/50 mb-4 text-center"
                        >
                            New planets. New stars. New everything.
                        </motion.p>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="text-xs md:text-sm tracking-[0.35em] text-white/40 mb-20 uppercase text-center"
                        >
                            Waiting for the next big bang
                        </motion.p>

                        {/* Final tagline */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.8 }}
                            className="absolute bottom-16 flex flex-col items-center"
                        >
                            <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
                                This is the beginning of the end
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

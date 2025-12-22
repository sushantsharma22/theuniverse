'use client';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE ENDING - Flash + Message RIGHT after wormhole crossing
// ═══════════════════════════════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';

// Wormhole is at -6950, trigger ending immediately after
const WORMHOLE_Z = -6950;

export default function UniverseEnding() {
    const { cameraZ } = useScrollStore();

    // Flash appears RIGHT after crossing wormhole
    const flashStart = WORMHOLE_Z - 50;  // -7000
    const flashPeak = WORMHOLE_Z - 100;  // -7050

    // Calculate flash opacity
    let flashOpacity = 0;
    if (cameraZ < flashStart && cameraZ > flashPeak - 50) {
        if (cameraZ > flashPeak) {
            // Rising
            flashOpacity = (flashStart - cameraZ) / (flashStart - flashPeak);
        } else {
            // Falling
            flashOpacity = Math.max(0, 1 - (flashPeak - cameraZ) / 50);
        }
    }

    // Ending appears as flash fades
    const showEnding = cameraZ < flashPeak;
    const endingOpacity = showEnding ? Math.min(1, (flashPeak - cameraZ) / 80) : 0;

    return (
        <>
            {/* BRIGHT FLASH */}
            {flashOpacity > 0.05 && (
                <div
                    className="fixed inset-0 z-[100] pointer-events-none bg-white"
                    style={{ opacity: flashOpacity }}
                />
            )}

            {/* ENDING MESSAGE - Brighter, more visible */}
            <AnimatePresence>
                {showEnding && endingOpacity > 0.05 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: endingOpacity }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[101] flex flex-col items-center justify-center bg-black"
                        style={{ pointerEvents: endingOpacity > 0.5 ? 'auto' : 'none' }}
                    >
                        {/* Main message - BRIGHTER text */}
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-2xl md:text-3xl font-extralight tracking-[0.25em] text-white mb-6 text-center italic px-4"
                            style={{ textShadow: '0 0 40px rgba(150, 180, 255, 0.4)' }}
                        >
                            From the ashes of dying stars
                        </motion.p>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-2xl md:text-3xl font-extralight tracking-[0.25em] text-white/90 mb-16 text-center italic px-4"
                            style={{ textShadow: '0 0 40px rgba(150, 180, 255, 0.4)' }}
                        >
                            new life awaits its moment
                        </motion.p>

                        {/* Subtitle - Brighter */}
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-base md:text-lg tracking-[0.2em] text-white/70 mb-4 text-center px-4"
                        >
                            New planets. New stars. New everything.
                        </motion.p>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-sm md:text-base tracking-[0.3em] text-white/60 mb-24 uppercase text-center px-4"
                        >
                            Waiting for the next big bang
                        </motion.p>

                        {/* Final tagline - More visible */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.0, duration: 0.8 }}
                            className="absolute bottom-12 md:bottom-16 flex flex-col items-center px-4"
                        >
                            <p className="text-xs tracking-[0.25em] text-white/50 uppercase text-center">
                                This is the beginning of the end
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

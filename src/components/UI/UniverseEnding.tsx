'use client';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE ENDING - Styled like StartScreen with main title centered
// ═══════════════════════════════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';

// Wormhole is at -6950, trigger ending immediately after
// Wormhole is at -7550, trigger ending immediately after
const WORMHOLE_Z = -7550;

export default function UniverseEnding() {
    const { cameraZ } = useScrollStore();

    // Flash appears RIGHT after crossing wormhole
    const flashStart = WORMHOLE_Z - 50;  // -7000
    const flashPeak = WORMHOLE_Z - 100;  // -7050

    // Calculate flash opacity
    let flashOpacity = 0;
    if (cameraZ < flashStart && cameraZ > flashPeak - 50) {
        if (cameraZ > flashPeak) {
            flashOpacity = (flashStart - cameraZ) / (flashStart - flashPeak);
        } else {
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

            {/* ENDING - Same layout as StartScreen */}
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
                        {/* Main title - Same position/style as "THE UNIVERSE" */}
                        {/* Main title - Same position/style as "THE UNIVERSE" */}
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.3em] text-white/95 mb-4 text-center px-4"
                            style={{ textShadow: '0 0 60px rgba(100, 150, 255, 0.3)' }}
                        >
                            THE BEGINNING OF THE END
                        </motion.h1>

                        {/* Subtitle - Same style as "A Journey Through..." */}
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-xs md:text-sm tracking-[0.35em] text-white/50 mb-16 uppercase"
                        >
                            A cycle that never ends
                        </motion.p>

                        {/* Additional message below */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-center"
                        >
                            <p className="text-lg md:text-xl font-extralight tracking-[0.2em] text-white/70 mb-3 italic">
                                From the ashes of dying stars
                            </p>
                            <p className="text-lg md:text-xl font-extralight tracking-[0.2em] text-white/60 mb-8 italic">
                                new life awaits its moment
                            </p>
                            <p className="text-sm md:text-base tracking-[0.15em] text-white/40">
                                New planets. New stars. New everything.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

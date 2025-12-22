'use client';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE ENDING - Styled like StartScreen with main title centered
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
                        {/* Text Content REMOVED - Just visual ending */}\n
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

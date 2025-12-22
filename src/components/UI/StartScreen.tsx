'use client';

// ═══════════════════════════════════════════════════════════════════════════
// START SCREEN - Landing overlay with animated title
// ═══════════════════════════════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';

export default function StartScreen() {
    const progress = useScrollStore(state => state.progress);
    const isVisible = progress < 0.02;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
                >
                    {/* Title */}
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-extralight tracking-[0.5em] text-white/95 mb-4 text-center"
                        style={{ textShadow: '0 0 60px rgba(100, 150, 255, 0.3)' }}
                    >
                        THE UNIVERSE
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xs md:text-sm tracking-[0.35em] text-white/50 mb-16 uppercase"
                    >
                        A Journey Through 13.8 Billion Years
                    </motion.p>

                    {/* Scroll hint REMOVED */}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

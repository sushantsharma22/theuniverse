'use client';

// ═══════════════════════════════════════════════════════════════════════════
// END SCREEN
// ═══════════════════════════════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';

export default function EndScreen() {
    const progress = useScrollStore(state => state.progress);
    const isVisible = progress > 0.95;

    const handleRestart = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80"
                >
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-5xl font-extralight tracking-[0.3em] text-white/25 mb-2"
                    >
                        The End
                    </motion.p>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm font-light text-white/15 mb-8"
                    >
                        ...or a new beginning?
                    </motion.p>

                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        onClick={handleRestart}
                        className="px-6 py-3 text-sm tracking-wider text-white/60 border border-white/15 rounded hover:bg-white/5 hover:border-white/30 hover:text-white transition-all"
                    >
                        Experience Again
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

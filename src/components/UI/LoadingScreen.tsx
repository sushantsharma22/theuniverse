'use client';

// ═══════════════════════════════════════════════════════════════════════════
// LOADING SCREEN
// ═══════════════════════════════════════════════════════════════════════════

import { motion } from 'framer-motion';

interface LoadingScreenProps {
    progress?: number;
}

export default function LoadingScreen({ progress = 0 }: LoadingScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-[#000005] flex items-center justify-center"
        >
            <div className="text-center max-w-md px-8">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-extralight tracking-[0.4em] text-white mb-2">
                    UNIVERSE
                </h1>

                <p className="text-sm font-light tracking-wider text-white/50 mb-8">
                    Loading Journey
                </p>

                {/* Progress bar */}
                <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden mb-4">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <p className="text-xs text-white/30">
                    {progress < 100 ? 'Preparing cosmos...' : 'Ready'}
                </p>
            </div>
        </motion.div>
    );
}

'use client';

// ═══════════════════════════════════════════════════════════════════════════
// INFO PANEL - Glassmorphed story display for discoveries
// ═══════════════════════════════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';

export default function InfoPanel() {
    const activeLandmark = useScrollStore(state => state.activeLandmark);
    const landmarkOpacity = useScrollStore(state => state.landmarkOpacity);

    // Don't render if opacity is too low or no landmark
    if (!activeLandmark || landmarkOpacity < 0.05) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeLandmark.id}
                className="fixed right-8 top-1/2 -translate-y-1/2 w-80 md:w-96 z-50 pointer-events-none"
                style={{ opacity: landmarkOpacity }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: landmarkOpacity }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Glass Container */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl shadow-2xl">
                    {/* Decorative colored glow based on "space" theme */}
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col gap-3 text-left">
                        {/* Year/Era Tag */}
                        <div className="inline-flex self-start rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium tracking-widest text-blue-200 backdrop-blur-md">
                            {activeLandmark.year}
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white/70">
                            {activeLandmark.title}
                        </h2>

                        {/* Divider */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-1" />

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-gray-300 font-light">
                            {activeLandmark.description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

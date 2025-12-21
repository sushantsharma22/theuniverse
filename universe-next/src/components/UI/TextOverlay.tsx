'use client';

// ═══════════════════════════════════════════════════════════════════════════
// TEXT OVERLAY - Scene descriptions
// ═══════════════════════════════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';
import { PHOTOS } from '@/lib/constants';

export default function TextOverlay() {
    const progress = useScrollStore(state => state.progress);
    const currentIndex = useScrollStore(state => state.currentPhotoIndex);

    // Don't show on start screen
    if (progress < 0.02) return null;

    const photo = PHOTOS[currentIndex];
    if (!photo) return null;

    // Calculate visibility based on position within scene
    const sceneProgress = progress * (PHOTOS.length - 1);
    const localProgress = sceneProgress - Math.floor(sceneProgress);
    const isEntering = localProgress < 0.3;
    const isLeaving = localProgress > 0.7;
    const showText = !isLeaving || currentIndex === PHOTOS.length - 1;

    return (
        <AnimatePresence mode="wait">
            {showText && (
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="fixed left-6 md:left-12 bottom-1/4 z-30 max-w-md pointer-events-none"
                >
                    {/* Epoch marker */}
                    <span className="inline-block text-[10px] md:text-xs font-medium tracking-[0.15em] text-white/45 mb-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm">
                        {photo.time}
                    </span>

                    {/* Title */}
                    <h2 className="text-2xl md:text-4xl font-light text-white mb-3 leading-tight">
                        {photo.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm md:text-base font-light text-white/60 leading-relaxed">
                        {photo.desc}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

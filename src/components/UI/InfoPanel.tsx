'use client';

// ═══════════════════════════════════════════════════════════════════════════
// INFO PANEL - Scientific Sidebar (Left Aligned)
// ═══════════════════════════════════════════════════════════════════════════

import { motion, AnimatePresence } from 'framer-motion';
import { useScrollStore } from '@/store/scrollStore';

export default function InfoPanel() {
    const activeLandmark = useScrollStore(state => state.activeLandmark);
    const landmarkOpacity = useScrollStore(state => state.landmarkOpacity);

    // Don't render if opacity is too low or no landmark
    // Also hide for 'wormhole' and 'ashes_of_first_stars' as per user request
    if (!activeLandmark || landmarkOpacity < 0.05 || activeLandmark.id === 'wormhole' || activeLandmark.id === 'ashes_of_first_stars') return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeLandmark.id}
                // Fixed LEFT side, covering a significant portion of height/width
                className="fixed left-0 top-0 h-full w-full md:w-[45%] z-50 pointer-events-none flex items-center p-8 md:p-16 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
                style={{ opacity: landmarkOpacity }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: landmarkOpacity }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth easeOutExpo
            >
                {/* Content Container */}
                <div className="relative w-full max-w-2xl border-l-[1px] border-white/20 pl-8">

                    {/* Scientific Header */}
                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-[1px] w-12 bg-blue-400/60" />
                        <span className="text-xs font-mono tracking-[0.2em] text-blue-300 uppercase opacity-90">
                            {activeLandmark.type} _ {activeLandmark.constellation}
                        </span>
                    </div>

                    {/* Massive Title */}
                    <h1 className="text-5xl md:text-7xl font-thin tracking-tighter text-white mb-8">
                        {activeLandmark.title.toUpperCase()}
                    </h1>

                    {/* Data Grid */}
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-10 opacity-80">
                        <div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Distance</div>
                            <div className="text-lg font-mono text-blue-100">{activeLandmark.distance}</div>
                        </div>
                        <div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Discovery</div>
                            <div className="text-lg font-mono text-blue-100">1995</div>
                        </div>
                    </div>


                    {/* Narrative Text - REMOVED as per user request */}


                    {/* Scanner Aesthetic */}
                    <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-blue-500/50" />
                    <div className="absolute bottom-0 left-8 h-4 w-4 border-b border-l border-blue-500/50" />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

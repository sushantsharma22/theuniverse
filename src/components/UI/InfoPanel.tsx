'use client';

// ═══════════════════════════════════════════════════════════════════════════
// INFO PANEL - Scientific Data Display
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
                className="fixed right-8 lg:right-16 top-1/2 -translate-y-1/2 w-[400px] lg:w-[450px] z-50 pointer-events-none"
                style={{ opacity: landmarkOpacity }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: landmarkOpacity }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Glass Container */}
                <div className="relative overflow-hidden rounded-sm border-l-2 border-blue-400/50 bg-black/60 p-8 backdrop-blur-xl shadow-2xl">

                    {/* Header: Type and Title */}
                    <div className="mb-6">
                        <div className="text-xs font-mono tracking-[0.2em] text-blue-300 uppercase opacity-80 mb-2">
                            {activeLandmark.type} • {activeLandmark.constellation}
                        </div>
                        <h2 className="text-4xl font-light tracking-wide text-white">
                            {activeLandmark.title}
                        </h2>
                    </div>

                    {/* Scientific Data Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 border-y border-white/10 py-4">
                        <div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Distance</div>
                            <div className="text-sm font-mono text-blue-100">{activeLandmark.distance}</div>
                        </div>
                        <div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">System</div>
                            <div className="text-sm font-mono text-blue-100">{activeLandmark.constellation} Sector</div>
                        </div>
                    </div>

                    {/* Detailed Description */}
                    <p className="text-sm leading-7 text-gray-300 font-light text-justify">
                        {activeLandmark.description}
                    </p>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-4 opacity-30">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" className="text-blue-400">
                            <path d="M0 0 H20 V20" />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

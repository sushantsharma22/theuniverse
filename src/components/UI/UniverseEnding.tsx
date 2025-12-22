'use client';

import { useScrollStore } from '@/store/scrollStore';
import { UNIVERSE_END_POSITION } from '@/lib/constants';
import { useEffect, useState } from 'react';

export default function UniverseEnding() {
    const { cameraZ } = useScrollStore();
    const [showEnding, setShowEnding] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        // Check if camera has passed the universe end position
        if (cameraZ < UNIVERSE_END_POSITION + 100) {
            setShowEnding(true);
            // Fade in the ending
            const fadeProgress = Math.min(1, (UNIVERSE_END_POSITION + 100 - cameraZ) / 100);
            setOpacity(fadeProgress);
        } else {
            setShowEnding(false);
            setOpacity(0);
        }
    }, [cameraZ]);

    if (!showEnding) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
            style={{
                backgroundColor: `rgba(0, 0, 0, ${opacity})`,
                transition: 'background-color 0.5s ease'
            }}
        >
            <div
                className="text-center"
                style={{ opacity }}
            >
                {/* THE END */}
                <h1
                    className="text-6xl md:text-8xl font-thin tracking-[0.3em] text-white mb-8"
                    style={{
                        fontFamily: 'serif',
                        textShadow: '0 0 30px rgba(255,255,255,0.3)'
                    }}
                >
                    THE END
                </h1>

                {/* Waiting message */}
                <p
                    className="text-lg md:text-xl text-gray-400 tracking-widest mb-4 italic"
                    style={{ fontFamily: 'serif' }}
                >
                    Waiting for new big bang
                </p>
                <p
                    className="text-base md:text-lg text-gray-500 tracking-wide mb-12"
                    style={{ fontFamily: 'serif' }}
                >
                    and creation of another universe
                </p>

                {/* Separator line */}
                <div className="w-24 h-px bg-gray-600 mx-auto mb-8" />

                {/* Beginning of the end */}
                <p
                    className="text-sm text-gray-600 tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'sans-serif' }}
                >
                    This is the beginning of the end
                </p>
            </div>
        </div>
    );
}

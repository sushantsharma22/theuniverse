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
        if (cameraZ < UNIVERSE_END_POSITION + 200) {
            setShowEnding(true);
            // Fade in the ending smoothly
            const fadeProgress = Math.min(1, (UNIVERSE_END_POSITION + 200 - cameraZ) / 200);
            setOpacity(fadeProgress);
        } else {
            setShowEnding(false);
            setOpacity(0);
        }
    }, [cameraZ]);

    if (!showEnding) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{
                backgroundColor: `rgba(0, 0, 0, ${opacity})`,
                pointerEvents: opacity > 0.8 ? 'auto' : 'none'
            }}
        >
            <div
                className="text-center px-8 max-w-3xl"
                style={{
                    opacity,
                    transform: `translateY(${(1 - opacity) * 40}px)`,
                    transition: 'transform 0.5s ease-out'
                }}
            >
                {/* THE END - Large and dramatic */}
                <h1
                    className="text-7xl md:text-9xl font-thin text-white mb-20"
                    style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        textShadow: '0 0 80px rgba(255,255,255,0.12)',
                        letterSpacing: '0.3em',
                        fontWeight: 100
                    }}
                >
                    The End
                </h1>

                {/* Philosophical message - sad yet hopeful */}
                <div className="space-y-6 mb-20">
                    <p
                        className="text-xl md:text-2xl text-gray-300"
                        style={{
                            fontFamily: 'Georgia, serif',
                            fontStyle: 'italic',
                            lineHeight: 1.8,
                            letterSpacing: '0.05em'
                        }}
                    >
                        From the ashes of dying stars,
                    </p>
                    <p
                        className="text-xl md:text-2xl text-gray-300"
                        style={{
                            fontFamily: 'Georgia, serif',
                            fontStyle: 'italic',
                            lineHeight: 1.8,
                            letterSpacing: '0.05em'
                        }}
                    >
                        new life awaits its moment.
                    </p>
                </div>

                {/* Separator */}
                <div
                    className="w-32 h-[1px] mx-auto mb-16"
                    style={{
                        background: 'linear-gradient(to right, transparent, rgba(120,120,120,0.4), transparent)'
                    }}
                />

                {/* The cycle continues */}
                <p
                    className="text-lg md:text-xl text-gray-400 mb-4"
                    style={{
                        fontFamily: 'Georgia, serif',
                        letterSpacing: '0.1em'
                    }}
                >
                    New planets. New stars. New everything.
                </p>
                <p
                    className="text-base md:text-lg text-gray-500 mb-20"
                    style={{
                        fontFamily: 'Georgia, serif',
                        letterSpacing: '0.08em'
                    }}
                >
                    Waiting for the next big bang...
                </p>

                {/* Final line */}
                <div
                    className="w-16 h-[1px] mx-auto mb-10"
                    style={{
                        background: 'rgba(80,80,80,0.3)'
                    }}
                />
                <p
                    className="text-sm text-gray-600"
                    style={{
                        fontFamily: 'system-ui, sans-serif',
                        letterSpacing: '0.35em',
                        textTransform: 'uppercase'
                    }}
                >
                    This is the beginning of the end
                </p>
            </div>
        </div>
    );
}

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
                className="text-center px-8 max-w-2xl"
                style={{
                    opacity,
                    transform: `translateY(${(1 - opacity) * 30}px)`,
                    transition: 'transform 0.3s ease-out'
                }}
            >
                {/* THE END - Large and dramatic */}
                <h1
                    className="text-8xl md:text-[10rem] font-thin text-white mb-16"
                    style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        textShadow: '0 0 80px rgba(255,255,255,0.15), 0 0 160px rgba(255,255,255,0.08)',
                        letterSpacing: '0.25em',
                        fontWeight: 100
                    }}
                >
                    The End
                </h1>

                {/* Subtle separator */}
                <div
                    className="w-40 h-[1px] mx-auto mb-14"
                    style={{
                        background: 'linear-gradient(to right, transparent, rgba(150,150,150,0.5), transparent)'
                    }}
                />

                {/* Waiting message */}
                <p
                    className="text-2xl md:text-3xl text-gray-300 mb-4"
                    style={{
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                        letterSpacing: '0.1em',
                        fontWeight: 300
                    }}
                >
                    Waiting for new big bang
                </p>
                <p
                    className="text-xl md:text-2xl text-gray-400 mb-24"
                    style={{
                        fontFamily: 'Georgia, serif',
                        letterSpacing: '0.08em',
                        fontWeight: 300
                    }}
                >
                    and creation of another universe
                </p>

                {/* Small separator */}
                <div
                    className="w-20 h-[1px] mx-auto mb-10"
                    style={{
                        background: 'rgba(100,100,100,0.4)'
                    }}
                />

                {/* Beginning of the end */}
                <p
                    className="text-sm md:text-base text-gray-500"
                    style={{
                        fontFamily: 'system-ui, sans-serif',
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        fontWeight: 400
                    }}
                >
                    This is the beginning of the end
                </p>
            </div>
        </div>
    );
}

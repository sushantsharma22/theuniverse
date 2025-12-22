'use client';

import { useScrollStore } from '@/store/scrollStore';
import { UNIVERSE_END_POSITION } from '@/lib/constants';
import { useEffect, useState } from 'react';

export default function UniverseEnding() {
    const { cameraZ } = useScrollStore();
    const [phase, setPhase] = useState<'hidden' | 'flash' | 'fade' | 'ending'>('hidden');
    const [flashOpacity, setFlashOpacity] = useState(0);
    const [endingOpacity, setEndingOpacity] = useState(0);

    useEffect(() => {
        const distanceToEnd = UNIVERSE_END_POSITION - cameraZ;

        if (cameraZ < UNIVERSE_END_POSITION + 300) {
            // Phase 1: Bright flash (300 to 200 before end)
            if (distanceToEnd > -100 && distanceToEnd < 100) {
                setPhase('flash');
                const flashProgress = 1 - Math.abs(distanceToEnd) / 100;
                setFlashOpacity(flashProgress);
                setEndingOpacity(0);
            }
            // Phase 2: Fade from white to black (100 before end to 50 after)
            else if (distanceToEnd >= -150 && distanceToEnd <= -100) {
                setPhase('fade');
                const fadeProgress = (Math.abs(distanceToEnd) - 100) / 50;
                setFlashOpacity(1 - fadeProgress);
                setEndingOpacity(fadeProgress * 0.3);
            }
            // Phase 3: Ending text appears
            else if (distanceToEnd < -150) {
                setPhase('ending');
                setFlashOpacity(0);
                const endProgress = Math.min(1, (Math.abs(distanceToEnd) - 150) / 100);
                setEndingOpacity(endProgress);
            }
        } else {
            setPhase('hidden');
            setFlashOpacity(0);
            setEndingOpacity(0);
        }
    }, [cameraZ]);

    if (phase === 'hidden') return null;

    return (
        <>
            {/* BRIGHT FLASH */}
            {(phase === 'flash' || phase === 'fade') && (
                <div
                    className="fixed inset-0 z-[100] pointer-events-none"
                    style={{
                        backgroundColor: `rgba(255, 255, 255, ${flashOpacity})`,
                    }}
                />
            )}

            {/* ENDING SCREEN */}
            {(phase === 'fade' || phase === 'ending') && (
                <div
                    className="fixed inset-0 z-[101] flex flex-col items-center justify-center"
                    style={{
                        backgroundColor: `rgba(0, 0, 0, ${endingOpacity})`,
                        pointerEvents: endingOpacity > 0.8 ? 'auto' : 'none'
                    }}
                >
                    <div
                        className="text-center px-6 max-w-4xl"
                        style={{
                            opacity: endingOpacity,
                            transform: `translateY(${(1 - endingOpacity) * 60}px)`
                        }}
                    >
                        {/* THE END */}
                        <h1
                            className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] text-white mb-12 sm:mb-20"
                            style={{
                                fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
                                fontWeight: 300,
                                letterSpacing: '0.15em',
                                textShadow: '0 0 100px rgba(255,255,255,0.15)',
                                lineHeight: 1
                            }}
                        >
                            The End
                        </h1>

                        {/* Poetic message */}
                        <div className="space-y-4 mb-12 sm:mb-20">
                            <p
                                className="text-lg sm:text-xl md:text-2xl text-gray-300"
                                style={{
                                    fontFamily: 'Georgia, serif',
                                    fontStyle: 'italic',
                                    lineHeight: 1.8
                                }}
                            >
                                From the ashes of dying stars
                            </p>
                            <p
                                className="text-lg sm:text-xl md:text-2xl text-gray-400"
                                style={{
                                    fontFamily: 'Georgia, serif',
                                    fontStyle: 'italic',
                                    lineHeight: 1.8
                                }}
                            >
                                new life awaits its moment
                            </p>
                        </div>

                        {/* Separator */}
                        <div
                            className="w-24 sm:w-32 h-[1px] mx-auto mb-10 sm:mb-16"
                            style={{ background: 'rgba(100,100,100,0.4)' }}
                        />

                        {/* New beginning */}
                        <p
                            className="text-base sm:text-lg md:text-xl text-gray-400 mb-3"
                            style={{
                                fontFamily: 'Georgia, serif',
                                letterSpacing: '0.08em'
                            }}
                        >
                            New planets. New stars. New everything.
                        </p>
                        <p
                            className="text-sm sm:text-base md:text-lg text-gray-500 mb-16 sm:mb-24"
                            style={{
                                fontFamily: 'Georgia, serif',
                                letterSpacing: '0.05em'
                            }}
                        >
                            Waiting for the next big bang...
                        </p>

                        {/* Final tagline */}
                        <p
                            className="text-xs sm:text-sm text-gray-600"
                            style={{
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                letterSpacing: '0.25em',
                                textTransform: 'uppercase',
                                fontWeight: 500
                            }}
                        >
                            This is the beginning of the end
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

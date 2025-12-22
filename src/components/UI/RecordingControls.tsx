'use client';

// ═══════════════════════════════════════════════════════════════════════════
// RECORDING CONTROLS - Customizable preview with manual time input
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useScrollStore } from '@/store/scrollStore';

const AutoGlide = dynamic(() => import('@/components/AutoGlide'), { ssr: false });

type RecordingMode = {
    duration: number;
    direction: 'forward' | 'reverse';
    enableRecording: boolean;
    label: string;
} | null;

export default function RecordingControls() {
    const [activeMode, setActiveMode] = useState<RecordingMode>(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(45);
    const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');
    const isAutoPlaying = useScrollStore(state => state.isAutoPlaying);

    const handleComplete = useCallback(() => {
        setActiveMode(null);
        setProgress(0);
    }, []);

    const handleProgress = useCallback((p: number) => {
        setProgress(p);
    }, []);

    const startPreview = useCallback(() => {
        if (activeMode) return;
        setActiveMode({
            duration,
            direction,
            enableRecording: false,
            label: `${direction === 'forward' ? '→' : '←'} ${duration}s`
        });
        setProgress(0);
    }, [activeMode, duration, direction]);

    const stopPreview = useCallback(() => {
        setActiveMode(null);
        setProgress(0);
        window.location.reload();
    }, []);

    return (
        <>
            {activeMode && (
                <AutoGlide
                    duration={activeMode.duration}
                    direction={activeMode.direction}
                    enableRecording={activeMode.enableRecording}
                    onComplete={handleComplete}
                    onProgress={handleProgress}
                />
            )}

            {/* Control Panel - Bottom Center Horizontal */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                {/* Playing indicator */}
                {isAutoPlaying && (
                    <>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/50">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-blue-400 text-xs font-medium whitespace-nowrap">
                                {activeMode?.label}
                            </span>
                        </div>
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>
                    </>
                )}

                {/* Direction Toggle */}
                <div className="flex rounded-lg overflow-hidden border border-white/10">
                    <button
                        onClick={() => setDirection('forward')}
                        disabled={isAutoPlaying}
                        className={`px-3 py-2 text-xs font-medium transition-all ${direction === 'forward'
                                ? 'bg-blue-500/40 text-blue-300'
                                : 'bg-white/5 text-white/60 hover:bg-white/10'
                            } ${isAutoPlaying ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        → Forward
                    </button>
                    <button
                        onClick={() => setDirection('reverse')}
                        disabled={isAutoPlaying}
                        className={`px-3 py-2 text-xs font-medium transition-all ${direction === 'reverse'
                                ? 'bg-purple-500/40 text-purple-300'
                                : 'bg-white/5 text-white/60 hover:bg-white/10'
                            } ${isAutoPlaying ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        ← Reverse
                    </button>
                </div>

                {/* Time Input */}
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Math.max(10, Math.min(300, parseInt(e.target.value) || 45)))}
                        disabled={isAutoPlaying}
                        className="w-16 px-2 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-xs text-center focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                        min={10}
                        max={300}
                    />
                    <span className="text-white/50 text-xs">sec</span>
                </div>

                {/* Play/Stop Button */}
                {!isAutoPlaying ? (
                    <button
                        onClick={startPreview}
                        className="px-4 py-2 rounded-lg bg-green-500/30 text-green-300 hover:bg-green-500/50 hover:text-green-200 font-medium transition-all flex items-center gap-1 text-xs"
                    >
                        <span>▶</span>
                        <span>PLAY</span>
                    </button>
                ) : (
                    <button
                        onClick={stopPreview}
                        className="px-4 py-2 rounded-lg bg-red-500/30 text-red-300 hover:bg-red-500/50 hover:text-red-200 font-medium transition-all flex items-center gap-1 text-xs"
                    >
                        <span>⏹</span>
                        <span>STOP</span>
                    </button>
                )}
            </div>
        </>
    );
}

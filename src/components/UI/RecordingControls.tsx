'use client';

// ═══════════════════════════════════════════════════════════════════════════
// RECORDING CONTROLS - UI for auto-glide recording
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useScrollStore } from '@/store/scrollStore';

// Dynamic import to avoid SSR issues with GSAP
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
    const isAutoPlaying = useScrollStore(state => state.isAutoPlaying);

    const handleComplete = useCallback(() => {
        setActiveMode(null);
        setProgress(0);
    }, []);

    const handleProgress = useCallback((p: number) => {
        setProgress(p);
    }, []);

    const startRecording = useCallback((mode: RecordingMode) => {
        if (activeMode) return; // Already recording
        setActiveMode(mode);
        setProgress(0);
    }, [activeMode]);

    const stopRecording = useCallback(() => {
        setActiveMode(null);
        setProgress(0);
        // Force page reload to reset scroll and stop any ongoing recording
        window.location.reload();
    }, []);

    const buttons: { mode: RecordingMode; icon: string }[] = [
        { mode: { duration: 120, direction: 'forward', enableRecording: true, label: 'Record Forward' }, icon: '🎥' },
        { mode: { duration: 120, direction: 'reverse', enableRecording: true, label: 'Record Reverse' }, icon: '🔄' },
        { mode: { duration: 120, direction: 'forward', enableRecording: false, label: 'Preview Forward' }, icon: '👁️' },
        { mode: { duration: 120, direction: 'reverse', enableRecording: false, label: 'Preview Reverse' }, icon: '👁️' },
    ];

    return (
        <>
            {/* Render AutoGlide when active */}
            {activeMode && (
                <AutoGlide
                    duration={activeMode.duration}
                    direction={activeMode.direction}
                    enableRecording={activeMode.enableRecording}
                    onComplete={handleComplete}
                    onProgress={handleProgress}
                />
            )}

            {/* Control Panel */}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
                {/* Recording indicator */}
                {isAutoPlaying && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 backdrop-blur-md border border-red-500/50">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-400 text-sm font-medium">
                            {activeMode?.enableRecording ? 'Recording' : 'Playing'}: {activeMode?.label}
                        </span>
                    </div>
                )}

                {/* Progress bar */}
                {isAutoPlaying && (
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>
                )}

                {/* Button grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                    {buttons.map((btn, i) => (
                        <button
                            key={i}
                            onClick={() => startRecording(btn.mode)}
                            disabled={isAutoPlaying}
                            className={`
                                px-3 py-2 rounded-lg text-xs font-medium transition-all
                                flex items-center gap-2 justify-center
                                ${isAutoPlaying
                                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                                }
                            `}
                        >
                            <span>{btn.icon}</span>
                            <span>{btn.mode?.label}</span>
                        </button>
                    ))}

                    {/* Stop button - only show when recording */}
                    {isAutoPlaying && (
                        <button
                            onClick={stopRecording}
                            className="col-span-2 px-4 py-3 rounded-lg bg-red-500/30 text-red-300 hover:bg-red-500/50 hover:text-red-200 font-medium transition-all flex items-center gap-2 justify-center"
                        >
                            <span>⏹️</span>
                            <span>STOP</span>
                        </button>
                    )}
                </div>

                {/* Instructions */}
                {!isAutoPlaying && (
                    <div className="text-[10px] text-white/40 text-center max-w-[200px]">
                        Click a button to start auto-scroll recording. Video will auto-download on completion.
                    </div>
                )}
            </div>
        </>
    );
}

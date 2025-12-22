'use client';

// ═══════════════════════════════════════════════════════════════════════════
// AUTO GLIDE - Automatic scroll animation with recording capability
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useScrollStore } from '@/store/scrollStore';

// Register GSAP plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin);
}

interface AutoGlideProps {
    duration: number;
    direction: 'forward' | 'reverse';
    enableRecording: boolean;
    onComplete?: () => void;
    onProgress?: (progress: number) => void;
}

export default function AutoGlide({
    duration,
    direction,
    enableRecording,
    onComplete,
    onProgress
}: AutoGlideProps) {
    const timelineRef = useRef<gsap.core.Tween | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const setIsAutoPlaying = useScrollStore(state => state.setIsAutoPlaying);

    const startRecording = useCallback(() => {
        if (!enableRecording) return;

        try {
            const canvas = document.querySelector('canvas') as HTMLCanvasElement;
            if (!canvas) {
                console.error('AutoGlide: Canvas not found');
                return;
            }

            const stream = canvas.captureStream(60);
            const recorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp9',
                videoBitsPerSecond: 10000000
            });

            chunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `universe-${direction}-${duration}s.webm`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            };

            recorder.start();
            recorderRef.current = recorder;
        } catch (error) {
            console.error('AutoGlide: Recording failed', error);
        }
    }, [enableRecording, direction, duration]);

    const stopRecording = useCallback(() => {
        if (recorderRef.current && recorderRef.current.state === 'recording') {
            recorderRef.current.stop();
            recorderRef.current = null;
        }
    }, []);

    const startAnimation = useCallback(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const startPos = direction === 'forward' ? 0 : docHeight;
        const endPos = direction === 'forward' ? docHeight : 0;

        // Set initial position
        window.scrollTo(0, startPos);
        setIsAutoPlaying(true);

        // Start recording after a brief delay
        setTimeout(() => {
            startRecording();

            // Create GSAP animation with constant velocity (ease: "none")
            timelineRef.current = gsap.to(window, {
                scrollTo: { y: endPos, autoKill: false },
                duration: duration,
                ease: 'none', // Constant velocity - no easing
                onUpdate: () => {
                    if (onProgress) {
                        const currentScroll = window.scrollY;
                        const progress = direction === 'forward'
                            ? currentScroll / docHeight
                            : 1 - (currentScroll / docHeight);
                        onProgress(progress);
                    }
                },
                onComplete: () => {
                    stopRecording();
                    setIsAutoPlaying(false);
                    if (onComplete) onComplete();
                }
            });
        }, 500);
    }, [direction, duration, startRecording, stopRecording, setIsAutoPlaying, onComplete, onProgress]);

    // Start animation on mount
    useEffect(() => {
        startAnimation();

        // Cleanup on unmount
        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
                timelineRef.current = null;
            }
            stopRecording();
            setIsAutoPlaying(false);
        };
    }, [startAnimation, stopRecording, setIsAutoPlaying]);

    // This component doesn't render anything
    return null;
}

'use client';

// ═══════════════════════════════════════════════════════════════════════════
// AUTO GLIDE - Automatic scroll animation with recording capability
// Uses requestAnimationFrame for smooth scrolling that triggers native events
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useCallback } from 'react';
import { useScrollStore } from '@/store/scrollStore';

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
    const animationRef = useRef<number | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const startTimeRef = useRef<number>(0);
    const isRunningRef = useRef<boolean>(false);
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

            // Check for supported mime types
            let mimeType = 'video/webm;codecs=vp9';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/webm;codecs=vp8';
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    mimeType = 'video/webm';
                }
            }

            const recorder = new MediaRecorder(stream, {
                mimeType,
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
            console.log('AutoGlide: Recording started');
        } catch (error) {
            console.error('AutoGlide: Recording failed', error);
        }
    }, [enableRecording, direction, duration]);

    const stopRecording = useCallback(() => {
        if (recorderRef.current && recorderRef.current.state === 'recording') {
            recorderRef.current.stop();
            recorderRef.current = null;
            console.log('AutoGlide: Recording stopped');
        }
    }, []);

    const stopAnimation = useCallback(() => {
        isRunningRef.current = false;
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
        stopRecording();
        setIsAutoPlaying(false);
    }, [stopRecording, setIsAutoPlaying]);

    const startAnimation = useCallback(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const startPos = direction === 'forward' ? 0 : docHeight;
        const endPos = direction === 'forward' ? docHeight : 0;
        const durationMs = duration * 1000;

        console.log('AutoGlide: Starting animation', {
            direction,
            duration,
            startPos,
            endPos,
            docHeight
        });

        // Set initial position
        window.scrollTo({ top: startPos, behavior: 'instant' });
        setIsAutoPlaying(true);

        // Start after brief delay
        setTimeout(() => {
            startRecording();
            startTimeRef.current = performance.now();
            isRunningRef.current = true;

            const animate = (currentTime: number) => {
                if (!isRunningRef.current) return;

                const elapsed = currentTime - startTimeRef.current;
                const progress = Math.min(elapsed / durationMs, 1);

                // Calculate current scroll position with linear interpolation
                const currentScroll = startPos + (endPos - startPos) * progress;

                // Use instant scroll to avoid browser smooth scroll interference
                window.scrollTo({ top: currentScroll, behavior: 'instant' });

                // Report progress
                if (onProgress) {
                    onProgress(progress);
                }

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    // Animation complete
                    console.log('AutoGlide: Animation complete');
                    stopRecording();
                    setIsAutoPlaying(false);
                    if (onComplete) onComplete();
                }
            };

            animationRef.current = requestAnimationFrame(animate);
        }, 500);
    }, [direction, duration, startRecording, stopRecording, setIsAutoPlaying, onComplete, onProgress]);

    // Start animation on mount
    useEffect(() => {
        startAnimation();

        // Cleanup on unmount
        return () => {
            stopAnimation();
        };
    }, [startAnimation, stopAnimation]);

    // This component doesn't render anything
    return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL STORE - With velocity tracking for motion effects
// ═══════════════════════════════════════════════════════════════════════════

import { create } from 'zustand';

import { LandmarkData } from '@/lib/constants';

interface ScrollState {
    progress: number;
    isScrolling: boolean;
    velocity: number;
    smoothVelocity: number;
    activeLandmark: LandmarkData | null; // Currently visible landmark story
    landmarkOpacity: number; // Opacity for the UI panel (0-1)
    cameraZ: number; // Current camera Z position for ending detection
    isAutoPlaying: boolean; // Auto-glide recording mode

    setProgress: (progress: number) => void;
    setIsScrolling: (isScrolling: boolean) => void;
    setVelocity: (velocity: number) => void;
    setLandmark: (landmark: LandmarkData | null, opacity: number) => void;
    setCameraZ: (z: number) => void;
    updateSmoothVelocity: () => void;
    setIsAutoPlaying: (playing: boolean) => void;
}

let lastProgress = 0;
let lastTime = performance.now();

export const useScrollStore = create<ScrollState>((set, get) => ({
    progress: 0,
    isScrolling: false,
    velocity: 0,
    smoothVelocity: 0,
    activeLandmark: null,
    landmarkOpacity: 0,
    cameraZ: 0,
    isAutoPlaying: false,

    setProgress: (progress: number) => {
        const now = performance.now();
        const deltaTime = Math.max(now - lastTime, 1);
        const deltaProgress = progress - lastProgress;

        // Calculate velocity (progress units per second)
        const instantVelocity = Math.abs(deltaProgress) / (deltaTime / 1000);

        lastProgress = progress;
        lastTime = now;

        set({
            progress,
            velocity: instantVelocity
        });
    },
    setIsScrolling: (isScrolling: boolean) => set({ isScrolling }),
    setVelocity: (velocity: number) => set({ velocity }),
    setLandmark: (landmark, opacity) => set({ activeLandmark: landmark, landmarkOpacity: opacity }),
    setCameraZ: (z: number) => set({ cameraZ: z }),
    updateSmoothVelocity: () => {
        const { velocity, smoothVelocity } = get();
        // Smooth velocity with exponential decay
        const newSmoothVelocity = smoothVelocity + (velocity - smoothVelocity) * 0.1;
        set({ smoothVelocity: newSmoothVelocity < 0.001 ? 0 : newSmoothVelocity });
    },
    setIsAutoPlaying: (playing: boolean) => set({ isAutoPlaying: playing })
}));

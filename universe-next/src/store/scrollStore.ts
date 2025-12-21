// ═══════════════════════════════════════════════════════════════════════════
// SCROLL STORE - With velocity tracking for motion effects
// ═══════════════════════════════════════════════════════════════════════════

import { create } from 'zustand';

interface ScrollState {
    progress: number;
    isScrolling: boolean;
    velocity: number;           // Scroll velocity for motion effects
    smoothVelocity: number;     // Smoothed velocity for gradual transitions
    setProgress: (progress: number) => void;
    setIsScrolling: (isScrolling: boolean) => void;
    setVelocity: (velocity: number) => void;
    updateSmoothVelocity: () => void;
}

let lastProgress = 0;
let lastTime = performance.now();

export const useScrollStore = create<ScrollState>((set, get) => ({
    progress: 0,
    isScrolling: false,
    velocity: 0,
    smoothVelocity: 0,
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
    updateSmoothVelocity: () => {
        const { velocity, smoothVelocity } = get();
        // Smooth velocity with exponential decay
        const newSmoothVelocity = smoothVelocity + (velocity - smoothVelocity) * 0.1;
        set({ smoothVelocity: newSmoothVelocity < 0.001 ? 0 : newSmoothVelocity });
    }
}));

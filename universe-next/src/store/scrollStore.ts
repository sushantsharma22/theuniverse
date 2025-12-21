// ═══════════════════════════════════════════════════════════════════════════
// SCROLL STORE - With isScrolling state for demand rendering
// ═══════════════════════════════════════════════════════════════════════════

import { create } from 'zustand';

interface ScrollState {
    progress: number;
    currentPhotoIndex: number;
    isScrolling: boolean;
    setProgress: (progress: number) => void;
    setIsScrolling: (isScrolling: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
    progress: 0,
    currentPhotoIndex: 0,
    isScrolling: false,
    setProgress: (progress: number) => set({
        progress,
        currentPhotoIndex: Math.min(Math.floor(progress * 11), 10)
    }),
    setIsScrolling: (isScrolling: boolean) => set({ isScrolling }),
}));

// ═══════════════════════════════════════════════════════════════════════════
// ZUSTAND STORE - Scroll Progress State Management
// ═══════════════════════════════════════════════════════════════════════════

import { create } from 'zustand';
import { ScrollState } from '@/lib/types';

export const useScrollStore = create<ScrollState>((set) => ({
    progress: 0,
    currentPhotoIndex: 0,
    setProgress: (progress: number) => set({
        progress,
        currentPhotoIndex: Math.min(Math.floor(progress * 11), 10)
    }),
}));

'use client';

// ═══════════════════════════════════════════════════════════════════════════
// TEMPERATURE DISPLAY
// ═══════════════════════════════════════════════════════════════════════════

import { useScrollStore } from '@/store/scrollStore';
import { PHOTOS } from '@/lib/constants';

export default function TemperatureDisplay() {
    const currentIndex = useScrollStore(state => state.currentPhotoIndex);
    const photo = PHOTOS[currentIndex];

    if (!photo) return null;

    return (
        <div className="fixed bottom-6 left-6 z-30 font-light tracking-wide">
            <span className="text-base md:text-lg text-white/60">{photo.temp}</span>
            <span className="text-xs md:text-sm text-white/35 ml-1">K</span>
        </div>
    );
}

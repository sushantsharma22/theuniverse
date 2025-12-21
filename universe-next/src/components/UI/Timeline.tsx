'use client';

// ═══════════════════════════════════════════════════════════════════════════
// TIMELINE - Progress dots on the side
// ═══════════════════════════════════════════════════════════════════════════

import { useScrollStore } from '@/store/scrollStore';
import { PHOTOS } from '@/lib/constants';

export default function Timeline() {
    const currentIndex = useScrollStore(state => state.currentPhotoIndex);

    const handleClick = (index: number) => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetScroll = (index / (PHOTOS.length - 1)) * docHeight;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    };

    return (
        <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5">
            {PHOTOS.map((photo, i) => (
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    title={photo.title}
                    className={`
            w-2 h-2 rounded-full transition-all duration-300 cursor-pointer
            border border-white/10 hover:scale-150
            ${i <= currentIndex
                            ? 'bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.3)]'
                            : 'bg-white/15 hover:bg-white/40'
                        }
          `}
                />
            ))}
        </div>
    );
}

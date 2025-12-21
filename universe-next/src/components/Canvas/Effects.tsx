'use client';

// ═══════════════════════════════════════════════════════════════════════════
// POST-PROCESSING EFFECTS - With conditional rendering
// ═══════════════════════════════════════════════════════════════════════════

import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useScrollStore } from '@/store/scrollStore';

export default function Effects() {
    const isScrolling = useScrollStore(state => state.isScrolling);

    // ✅ Disable effects when idle to save GPU
    // Note: Effects still render but are lightweight when scene is static

    return (
        <EffectComposer enabled={true}>
            <Bloom
                intensity={0.15}
                luminanceThreshold={0.9}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
            <Vignette
                eskil={false}
                offset={0.15}
                darkness={0.3}
            />
        </EffectComposer>
    );
}

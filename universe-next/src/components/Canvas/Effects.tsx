'use client';

// ═══════════════════════════════════════════════════════════════════════════
// POST-PROCESSING EFFECTS
// ═══════════════════════════════════════════════════════════════════════════

import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export default function Effects() {
    return (
        <EffectComposer>
            <Bloom
                intensity={0.2}
                luminanceThreshold={0.85}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
            <Vignette
                eskil={false}
                offset={0.15}
                darkness={0.35}
            />
        </EffectComposer>
    );
}

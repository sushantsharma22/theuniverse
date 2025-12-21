'use client';

// ═══════════════════════════════════════════════════════════════════════════
// POST-PROCESSING EFFECTS - Minimal for performance
// ═══════════════════════════════════════════════════════════════════════════

import { EffectComposer, Vignette } from '@react-three/postprocessing';

export default function Effects() {
    // Minimal effects for better performance
    return (
        <EffectComposer>
            <Vignette
                eskil={false}
                offset={0.2}
                darkness={0.4}
            />
        </EffectComposer>
    );
}

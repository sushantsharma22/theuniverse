'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA RIG - Straight flight through space
// ═══════════════════════════════════════════════════════════════════════════

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useScrollStore } from '@/store/scrollStore';

export default function CameraRig() {
    const { camera } = useThree();
    const progress = useScrollStore(state => state.progress);

    // Initial look target (straight ahead)
    const lookTarget = useRef(new Vector3(0, 0, -6000));

    useFrame(() => {
        // LINEAR FLIGHT:
        // Move forward on Z axis based on scroll progress
        // 0 -> -5000
        const zPos = 0 - (progress * 5000);

        // Strict centering
        camera.position.set(0, 0, zPos);

        // Always look straight ahead
        camera.lookAt(lookTarget.current);
    });

    return null;
}

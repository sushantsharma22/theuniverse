'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA RIG - Straight movement through images with roll effect
// ═══════════════════════════════════════════════════════════════════════════

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { UNIVERSE_END_POSITION } from '@/lib/constants';

// Journey start and end positions
const JOURNEY_START = 100;
const JOURNEY_END = UNIVERSE_END_POSITION; // -7200

export default function CameraRig() {
    const { camera } = useThree();
    const progress = useScrollStore(state => state.progress);
    const setCameraZ = useScrollStore(state => state.setCameraZ);

    // Smooth position tracking
    const currentZ = useRef(JOURNEY_START);
    const currentRoll = useRef(0);

    useFrame(() => {
        // Calculate target Z position (simple linear interpolation from start to end)
        const targetZ = JOURNEY_START + (JOURNEY_END - JOURNEY_START) * progress;

        // Smooth interpolation for Z position
        currentZ.current = THREE.MathUtils.lerp(currentZ.current, targetZ, 0.015);

        // Set camera position - ALWAYS at (0, 0, z) - perfectly straight
        camera.position.set(0, 0, currentZ.current);

        // Track camera Z for ending detection
        setCameraZ(currentZ.current);

        // Look ahead - slightly ahead on Z axis
        const lookAheadZ = currentZ.current - 200;
        camera.lookAt(0, 0, lookAheadZ);

        // CINEMATIC ROLL - subtle banking effect based on scroll velocity
        // This gives the feeling of turning without actually moving sideways
        const scrollVelocity = (targetZ - currentZ.current) / 10;

        // Create a wave pattern for roll based on position (gives feeling of gentle turns)
        const rollWave = Math.sin(currentZ.current * 0.005) * 0.08;
        const targetRoll = rollWave + scrollVelocity * 0.002;

        // Smooth roll interpolation
        currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, targetRoll, 0.03);
        camera.rotation.z = currentRoll.current;
    });

    return null;
}

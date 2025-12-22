'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA RIG - Smooth cinematic movement through stars
// ═══════════════════════════════════════════════════════════════════════════

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CatmullRomCurve3 } from 'three';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';

import { WAYPOINTS } from '@/lib/constants';

// Camera path - weaving through stars
const CAMERA_PATH = WAYPOINTS;

export default function CameraRig() {
    const { camera } = useThree();
    const progress = useScrollStore(state => state.progress);
    const setCameraZ = useScrollStore(state => state.setCameraZ);

    // Create smooth camera path with higher tension for smoother curves
    const curve = useRef(new CatmullRomCurve3(CAMERA_PATH, false, 'catmullrom', 0.3));

    // Smooth position tracking
    const currentPos = useRef(new THREE.Vector3(0, 0, 100));
    const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
    const currentRoll = useRef(0);

    useFrame(() => {
        // Get target position on curve
        const t = Math.min(Math.max(progress, 0), 1);
        const targetPos = curve.current.getPointAt(t);

        // MUCH smoother interpolation (lower = smoother but slower response)
        currentPos.current.lerp(targetPos, 0.015);
        camera.position.copy(currentPos.current);

        // Track camera Z for ending detection
        setCameraZ(currentPos.current.z);

        // Look ahead on the path - smooth the look target too
        const lookT = Math.min(t + 0.03, 1);
        const targetLookAt = curve.current.getPointAt(lookT);
        currentLookAt.current.lerp(targetLookAt, 0.02);
        camera.lookAt(currentLookAt.current);

        // CINEMATIC BANKING (Roll) - smoother
        const tangent = curve.current.getTangentAt(t);
        const bankingIntensity = -0.3; // Reduced for less aggressive banking
        const targetRoll = tangent.x * bankingIntensity;

        // Very smooth roll interpolation
        currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, targetRoll, 0.02);
        camera.rotation.z = currentRoll.current;
    });

    return null;
}

'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA RIG - Move through stars with scroll (left, right, center)
// ═══════════════════════════════════════════════════════════════════════════

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CatmullRomCurve3, Vector3 } from 'three';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';

import { WAYPOINTS, CONFIG } from '@/lib/constants';

// Camera path - weaving through stars
const CAMERA_PATH = WAYPOINTS;

export default function CameraRig() {
    const { camera } = useThree();
    const progress = useScrollStore(state => state.progress);

    // Create smooth camera path
    const curve = useRef(new CatmullRomCurve3(CAMERA_PATH, false, 'catmullrom', 0.5));

    // Smooth position tracking
    const currentPos = useRef(new THREE.Vector3(0, 0, 100));

    useFrame(() => {
        // Get target position on curve
        const t = Math.min(Math.max(progress, 0), 1);
        const targetPos = curve.current.getPointAt(t);

        // Smooth interpolation
        currentPos.current.lerp(targetPos, 0.04);
        camera.position.copy(currentPos.current);

        // Look ahead on the path
        const lookT = Math.min(t + 0.05, 1);
        const lookTarget = curve.current.getPointAt(lookT);
        camera.lookAt(lookTarget);

        // CINEMATIC BANKING (Roll)
        // Calculate tangent/horizontal movement to tilt camera
        // If moving LEFT (negative x), bank RIGHT (positive z rotation)
        // If moving RIGHT (positive x), bank LEFT (negative z rotation)
        const tangent = curve.current.getTangentAt(t);
        const bankingIntensity = -0.5; // Negative to invert standard bank for "plane" feel
        const targetRoll = tangent.x * bankingIntensity;

        // Smoothly interpolate roll
        camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRoll, 0.05);
    });

    return null;
}

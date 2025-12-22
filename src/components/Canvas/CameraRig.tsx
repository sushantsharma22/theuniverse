'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA RIG - Move through stars with scroll (left, right, center)
// ═══════════════════════════════════════════════════════════════════════════

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CatmullRomCurve3, Vector3 } from 'three';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';

// Camera path - weaving through stars
const CAMERA_PATH = [
    new Vector3(0, 0, 100),       // Start
    new Vector3(-15, 8, 60),      // Curve left
    new Vector3(0, -5, 30),       // Center down
    new Vector3(20, 10, 0),       // Curve right up
    new Vector3(-10, -8, -30),    // Left down
    new Vector3(15, 5, -60),      // Right up
    new Vector3(-20, 0, -90),     // Far left
    new Vector3(0, 10, -120),     // Center up
    new Vector3(25, -5, -150),    // Far right
    new Vector3(-15, 8, -180),    // Left up
    new Vector3(10, -10, -210),   // Right down
    new Vector3(0, 0, -250),      // End center
];

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
    });

    return null;
}

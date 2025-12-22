'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA RIG - Move through stars with scroll (left, right, center)
// ═══════════════════════════════════════════════════════════════════════════

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CatmullRomCurve3, Vector3 } from 'three';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { WAYPOINTS } from '@/lib/constants';

export default function CameraRig() {
    const { camera } = useThree();
    const progress = useScrollStore(state => state.progress);

    // Create smooth camera path from shared constants
    const curve = useRef(new CatmullRomCurve3(WAYPOINTS, false, 'catmullrom', 0.5));

    // Smooth position tracking
    // Start at the first waypoint position
    const currentPos = useRef(new THREE.Vector3(0, 0, 0));

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

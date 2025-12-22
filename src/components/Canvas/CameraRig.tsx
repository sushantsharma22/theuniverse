'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA RIG - Smooth cinematic movement through stars
// ═══════════════════════════════════════════════════════════════════════════

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CatmullRomCurve3 } from 'three';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';


import { LANDMARKS, WAYPOINTS } from '@/lib/constants';

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

        // Smooth position interpolation
        currentPos.current.lerp(targetPos, 0.04);
        camera.position.copy(currentPos.current);

        // Track camera Z
        setCameraZ(currentPos.current.z);

        // ═════════════════════════════════════════════════════════════════════
        // "LOCK ZONE" LOGIC - Force absolute stability near landmarks
        // Check if we are passing through an image (within 300 units)
        // ═════════════════════════════════════════════════════════════════════
        let isNearLandmark = false;

        for (const landmark of LANDMARKS) {
            const dist = Math.abs(currentPos.current.z - landmark.position.z);
            if (dist < 300) { // 300 unit "Straight Bubble"
                isNearLandmark = true;
                break;
            }
        }

        let targetLookAt: THREE.Vector3;
        let targetRoll = 0;
        const lookAheadDist = 0.02;

        if (isNearLandmark) {
            // FORCE STRAIGHT MODE
            // When within 300u of an image, LOCK EYES FORWARD
            // This prevents "swimming" or "sliding" of the image
            targetLookAt = new THREE.Vector3(0, 0, currentPos.current.z - 200);
            targetRoll = 0; // Force level horizon
        } else {
            // CURVE MODE
            // In the void, follow the curve naturally
            const lookT = Math.min(t + lookAheadDist, 1);
            targetLookAt = curve.current.getPointAt(lookT);

            // Banking based on curve tangent
            const tangent = curve.current.getTangentAt(t);
            targetRoll = tangent.x * -0.5; // Cinematic banking
        }

        // Smoothly interpolate LookAt
        currentLookAt.current.lerp(targetLookAt, 0.05);
        camera.lookAt(currentLookAt.current);

        // Smoothly interpolate Roll
        currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, targetRoll, 0.04);
        camera.rotation.z = currentRoll.current;
    });

    return null;
}

'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA RIG - Cinematic Weaving Flight with Focus Control
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

    // Create smooth cinematic path from shared constants
    // This allows the camera to "search" (move Left/Right/Up/Down) while flying
    const curve = useRef(new CatmullRomCurve3(WAYPOINTS, false, 'catmullrom', 0.5));

    // Smooth position tracking
    const currentPos = useRef(new THREE.Vector3(0, 0, 0));
    const lookAtPos = useRef(new THREE.Vector3(0, 0, -5000));

    useFrame(() => {
        // Get target position on curve based on scroll
        const t = Math.min(Math.max(progress, 0), 1);

        // 1. POSITION: Follow the weaving path
        // We need to map progress (0-1) to the curve range loosely
        // Since curve is defined by WAYPOINTS which end at -600 or so, 
        // but our journey goes to -5000, we need to scale the Z movement.

        // Actually, WAYPOINTS in constants are:
        // (0,0,0) -> ... -> (0,0,-600)
        // If we want a long journey to -5000, we should PROBABLY scale the Z of the curve 
        // OR rely on the fact the curve is just a guide.

        // Let's use the curve for X/Y deviation, but override Z for the long journey.
        const curvePoint = curve.current.getPointAt(t);

        // Custom Journey Mapping:
        // Z: 0 -> -2000 (New physical distance)
        const targetZ = 0 - (progress * 2000);

        // X/Y: Subtle sway
        const targetX = curvePoint.x * 1.5;
        const targetY = curvePoint.y * 1.5;

        const targetPos = new Vector3(targetX, targetY, targetZ);

        // Smooth interpolation
        currentPos.current.lerp(targetPos, 0.05);
        camera.position.copy(currentPos.current);

        // 2. ROTATION (LookAt):
        // Look at the Pillars at z=-1000 until we pass them, then forward
        // Actually, just looking forward works best for parallax
        lookAtPos.current.set(0, 0, targetZ - 1000);
        camera.lookAt(lookAtPos.current);
    });

    return null;
}

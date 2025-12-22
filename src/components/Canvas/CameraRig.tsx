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
        // Z: 0 -> -5000 (Linear flight depth)
        const targetZ = 0 - (progress * 5000);

        // X/Y: Use the curve's X/Y for the "finding" feel, scaled up for drama
        // The curve points are roughly within +/- 40 units.
        const targetX = curvePoint.x * 2.0; // Amplify sway
        const targetY = curvePoint.y * 2.0; // Amplify sway

        const targetPos = new Vector3(targetX, targetY, targetZ);

        // Smooth interpolation for heavy ship feel
        currentPos.current.lerp(targetPos, 0.05);
        camera.position.copy(currentPos.current);

        // 2. ROTATION (LookAt):
        // CRITICAL: Always look towards the Pillars' location (0, 0, targetZ - lead)
        // This keeps the Pillars visible/centered even while we sway left/right.
        // It creates a Parallax effect.

        // Look slightly ahead of current position
        const lookLead = 1000;
        // We look at (0, 0, forward) to keep Pillars centered in view
        // If we looked at curve.getPointAt(t+delta), we would look away from pillars.
        // User wants Pillars CENTERED.

        lookAtPos.current.set(0, 0, targetZ - lookLead);
        camera.lookAt(lookAtPos.current);
    });

    return null;
}

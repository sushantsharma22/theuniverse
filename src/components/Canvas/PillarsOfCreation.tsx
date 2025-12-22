'use client';

// ═══════════════════════════════════════════════════════════════════════════
// PILLARS OF CREATION - Multi-layer volumetric nebula
// ═══════════════════════════════════════════════════════════════════════════

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';

export default function PillarsOfCreation() {
    const { camera } = useThree();
    const progress = useScrollStore(state => state.progress);

    // Load texture
    const texture = useTexture('/textures/pillars_of_creation.png');

    // Configure texture
    useMemo(() => {
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;
    }, [texture]);

    // Refs
    const groupRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const mainRef = useRef<THREE.Mesh>(null);
    const foregroundRef = useRef<THREE.Mesh>(null);

    // Fade logic and billboard effect based on SCROLL
    useFrame(() => {
        if (!groupRef.current) return;

        // 1. BILLBOARD: Always face camera
        groupRef.current.lookAt(camera.position);

        // 2. SCROLL-BASED VISIBILITY Logic
        let currentOpacity = 0;
        let currentZ = -2000;

        // Scroll Sections:
        // 0-15%: Invisible
        // 15-25%: Fade In & Zoom In
        // 25-50%: Fully Visible (at z -350)
        // 50-65%: Fade Out & Zoom Away
        // 65%+: Invisible

        if (progress < 0.15) {
            // Invisible before scene
            currentOpacity = 0;
            currentZ = -2000;

        } else if (progress >= 0.15 && progress < 0.25) {
            // FADE IN (10% range)
            const fadeIn = (progress - 0.15) / 0.10;
            // Opacity goes 0 -> 0.85
            currentOpacity = fadeIn * 0.85;
            // Position goes -2000 -> -350
            currentZ = -2000 + (fadeIn * 1650);

        } else if (progress >= 0.25 && progress < 0.50) {
            // FULLY VISIBLE
            currentOpacity = 0.85;
            currentZ = -350;

        } else if (progress >= 0.50 && progress < 0.65) {
            // FADE OUT (15% range)
            const fadeOut = (progress - 0.50) / 0.15;
            // Opacity goes 0.85 -> 0
            currentOpacity = 0.85 * (1 - fadeOut);
            // Position goes -350 -> -2000 (moves away)
            currentZ = -350 - (fadeOut * 1650);

        } else {
            // Invisible after scene
            currentOpacity = 0;
            currentZ = -2000;
        }

        // Apply Position
        groupRef.current.position.set(0, 30, currentZ);

        // Apply Opacity to all layers
        if (glowRef.current) {
            // Glow layer (Base opacity 0.15 relative to main 0.85 => factor ~0.18)
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = currentOpacity * 0.2;
        }
        if (mainRef.current) {
            // Main layer
            (mainRef.current.material as THREE.MeshBasicMaterial).opacity = currentOpacity;
        }
        if (foregroundRef.current) {
            // Wisp layer (Base opacity 0.4 relative to main 0.85 => factor ~0.47)
            (foregroundRef.current.material as THREE.MeshBasicMaterial).opacity = currentOpacity * 0.5;
        }
    });

    // Common material props
    const materialProps = {
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false, // Critical: don't block stars
        blending: THREE.AdditiveBlending,
    };

    return (
        <group ref={groupRef} position={[0, 30, -2000]}>
            {/* Layer 1: Background Glow */}
            <mesh ref={glowRef} position={[0, 0, -50]}>
                <planeGeometry args={[180, 240]} />
                <meshBasicMaterial {...materialProps} color="#aa4444" opacity={0} />
            </mesh>

            {/* Layer 2: Main Pillars */}
            <mesh ref={mainRef} position={[0, 0, 0]}>
                <planeGeometry args={[150, 200]} />
                <meshBasicMaterial {...materialProps} color="#ffffff" opacity={0} />
            </mesh>

            {/* Layer 3: Foreground Wisps */}
            <mesh ref={foregroundRef} position={[0, 0, 50]}>
                <planeGeometry args={[100, 120]} />
                <meshBasicMaterial {...materialProps} color="#aaaaff" opacity={0} />
            </mesh>
        </group>
    );
}

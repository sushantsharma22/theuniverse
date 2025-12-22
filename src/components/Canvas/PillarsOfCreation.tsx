'use client';

// ═══════════════════════════════════════════════════════════════════════════
// PILLARS OF CREATION - Cinematic Zoom & Volumetric Effect
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

    useMemo(() => {
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;
    }, [texture]);

    // Refs for layers
    const groupRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const mainRef = useRef<THREE.Mesh>(null);
    const wispRef = useRef<THREE.Mesh>(null);
    const starsRef = useRef<THREE.Points>(null);

    // Generate nebula stars
    const starGeo = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(500 * 3);
        const sizes = new Float32Array(500); // Varying sizes for sparkles

        for (let i = 0; i < 500 * 3; i += 3) {
            // Spread within the nebula volume (roughly 150x200x100)
            positions[i] = (Math.random() - 0.5) * 160;   // X: -80 to 80
            positions[i + 1] = (Math.random() - 0.5) * 220; // Y: -110 to 110
            positions[i + 2] = (Math.random() - 0.5) * 60;  // Z: -30 to 30 (thickness)

            sizes[i / 3] = Math.random() * 2.0;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        return geometry;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;

        // 1. BILLBOARD LOGIC (Always face camera)
        groupRef.current.lookAt(camera.position);

        // 2. SCROLL LOGIC
        // Ranges:
        // 0.00 - 0.15: Far away / Invisible
        // 0.15 - 0.40: Zoom In (Approach)
        // 0.40 - 0.50: At Pillars (Stable)
        // 0.50 - 0.65: Zoom Out (Leaving)
        // 0.65 - 1.00: Invisible

        let targetZ = -5000;
        let targetScale = 0.1;
        let baseOpacity = 0;

        if (progress < 0.15) {
            // Invisible state
            targetZ = -5000;
            targetScale = 0.1;
            baseOpacity = 0;

        } else if (progress >= 0.15 && progress < 0.40) {
            // APPROACHING (Zoom In)
            const p = (progress - 0.15) / 0.25; // 0 -> 1
            // Smooth easing for cinematic feel
            const easeP = p * p * (3 - 2 * p);

            targetZ = -5000 + (easeP * 4800);       // -5000 -> -200
            targetScale = 0.1 + (easeP * 2.9);      // 0.1 -> 3.0
            baseOpacity = easeP * 0.9;              // Increased opacity for vividness

        } else if (progress >= 0.40 && progress < 0.50) {
            // AT PILLARS (Stable)
            targetZ = -200;
            targetScale = 3.0;
            baseOpacity = 0.9;

        } else if (progress >= 0.50 && progress < 0.65) {
            // LEAVING (Zoom Out/Away)
            const p = (progress - 0.50) / 0.15; // 0 -> 1
            const easeP = p * p; // Accelerate out

            targetZ = -200 - (easeP * 4800);        // -200 -> -5000
            targetScale = 3.0 - (easeP * 2.9);      // 3.0 -> 0.1
            baseOpacity = 0.9 * (1 - easeP);

        } else {
            // Done
            targetZ = -5000;
            targetScale = 0.1;
            baseOpacity = 0;
        }

        // Apply Position & Scale to Group
        groupRef.current.position.set(0, 0, targetZ);
        groupRef.current.scale.set(targetScale, targetScale, targetScale);

        // Volumetric Layer Animation (Subtle breathing/rotation)
        const time = state.clock.getElapsedTime();

        if (wispRef.current) {
            wispRef.current.rotation.z = Math.sin(time * 0.1) * 0.05; // Gentle sway
            wispRef.current.scale.setScalar(1.0 + Math.sin(time * 0.2) * 0.02); // Breathing
        }

        // Update Opacities & Colors for "Glassmorphism" feel
        // Layer 1: Glow (Deep Red/Orange)
        if (glowRef.current) {
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = baseOpacity * 0.3; // Increased
        }
        // Layer 2: Main (Crisp)
        if (mainRef.current) {
            (mainRef.current.material as THREE.MeshBasicMaterial).opacity = baseOpacity * 0.8;
        }
        // Layer 3: Wisps (Blue/Ethereal)
        if (wispRef.current) {
            (wispRef.current.material as THREE.MeshBasicMaterial).opacity = baseOpacity * 0.5;
        }
        // Layer 4: Stars (Sparkle)
        if (starsRef.current) {
            (starsRef.current.material as THREE.PointsMaterial).opacity = baseOpacity;
            // Twinkle effect could go here if shader used, but basic points are fine
        }
    });

    const matProps = {
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    };

    return (
        <group ref={groupRef}>
            {/* Layer 1: Volumetric Glow (Back) - Larger, softer */}
            <mesh ref={glowRef} position={[0, 0, -50]}>
                <planeGeometry args={[200, 260]} />
                <meshBasicMaterial {...matProps} opacity={0} color="#ff4422" />
            </mesh>

            {/* Layer 2: Main Structure (Center) - Sharp */}
            <mesh ref={mainRef} position={[0, 0, 0]}>
                <planeGeometry args={[150, 200]} />
                <meshBasicMaterial {...matProps} opacity={0} color="#ffffff" />
            </mesh>

            {/* Layer 2.5: Duplicate Main for Intensity (Glassy core) */}
            <mesh position={[0, 0, 5]}>
                <planeGeometry args={[145, 195]} />
                <meshBasicMaterial {...matProps} opacity={0} color="#aaaaff" blending={THREE.AdditiveBlending} />
            </mesh>


            {/* Layer 3: Ethereal Wisps (Front) - Blue/Cyan tint */}
            <mesh ref={wispRef} position={[0, 0, 40]}>
                <planeGeometry args={[110, 130]} />
                <meshBasicMaterial {...matProps} opacity={0} color="#88ccff" />
            </mesh>

            {/* Layer 4: Nebula Stars */}
            <points ref={starsRef} geometry={starGeo}>
                <pointsMaterial
                    color="#ffddee"
                    size={2}
                    transparent
                    opacity={0}
                    blending={THREE.AdditiveBlending}
                    sizeAttenuation={false}
                />
            </points>
        </group>
    );
}

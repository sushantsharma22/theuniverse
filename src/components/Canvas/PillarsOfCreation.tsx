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

    // Generate nebula stars - Improved distribution to avoid "box" look
    const starGeo = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(800 * 3); // More stars
        const sizes = new Float32Array(800);

        for (let i = 0; i < 800 * 3; i += 3) {
            // SPHERICAL/ELLIPSOID distribution instead of Box
            // Create a cloud around the pillars
            const r = Math.random();
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            // Varied radii for cloud effect
            const radius = 60 + Math.random() * 120;

            // X/Y stretch (Pillars are tall)
            const x = radius * Math.sin(phi) * Math.cos(theta) * 0.8;
            const y = radius * Math.sin(phi) * Math.sin(theta) * 1.5; // Taller
            const z = (radius * Math.cos(phi) * 0.5); // Flatter z-depth

            positions[i] = x;
            positions[i + 1] = y;
            positions[i + 2] = z;

            sizes[i / 3] = Math.random() * 2.5;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        return geometry;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;

        // 1. BILLBOARD LOGIC
        groupRef.current.lookAt(camera.position);

        // 2. PHYSICAL PLACEMENT (No more weird scaling/zoom tricks)
        // Fixed position in space
        const fixedZ = -1000;
        groupRef.current.position.set(0, 0, fixedZ);

        // Fixed Scale (Massive)
        groupRef.current.scale.set(4, 4, 4);

        // 3. FOG FADE LOGIC (Simple distance check)
        // Reveal when getting closer
        const dist = camera.position.distanceTo(groupRef.current.position);

        let opacity = 0;
        if (dist > 1500) {
            opacity = 0; // Hidden in deep space
        } else if (dist > 500) {
            // Fade in range (1500 -> 500)
            opacity = 1 - ((dist - 500) / 1000);
            // Non-linear for better feel
            opacity = opacity * opacity;
        } else {
            opacity = 1; // Fully visible
        }

        // Fade out if we fly PAST it (optional)
        if (camera.position.z < fixedZ) {
            const distPast = Math.abs(camera.position.z - fixedZ);
            opacity = Math.max(0, 1 - (distPast / 500));
        }

        // Apply to layers
        let baseOpacity = opacity;

        // Volumetric Layer Animation
        const time = state.clock.getElapsedTime();
        if (wispRef.current) {
            wispRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
        }

        // Update Material Opacities
        if (glowRef.current) (glowRef.current.material as THREE.MeshBasicMaterial).opacity = baseOpacity * 0.5;
        if (mainRef.current) (mainRef.current.material as THREE.MeshBasicMaterial).opacity = baseOpacity;
        if (wispRef.current) (wispRef.current.material as THREE.MeshBasicMaterial).opacity = baseOpacity * 0.6;
        if (starsRef.current) (starsRef.current.material as THREE.PointsMaterial).opacity = baseOpacity;
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
                <planeGeometry args={[220, 280]} />
                <meshBasicMaterial {...matProps} opacity={0} color="#ff3311" />
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
                <planeGeometry args={[120, 140]} />
                <meshBasicMaterial {...matProps} opacity={0} color="#77bbff" />
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

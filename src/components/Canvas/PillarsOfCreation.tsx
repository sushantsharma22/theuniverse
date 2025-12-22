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
        for (let i = 0; i < 500 * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 200; // Spread within nebula
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }, []);

    useFrame(() => {
        if (!groupRef.current) return;

        // 1. BILLBOARD LOGIC (Always face camera)
        groupRef.current.lookAt(camera.position);
        // Lock X and Z rotation to prevent flipping, only rotate Y if needed? 
        // Actually for billboard on straight path, simple lookAt is best.
        // User requested: "Lock rotation on X and Y" implies pure billboard might be enough if camera is stable.

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
            targetZ = -5000 + (p * 4800);       // -5000 -> -200
            targetScale = 0.1 + (p * 2.9);      // 0.1 -> 3.0
            baseOpacity = p * 0.85;

        } else if (progress >= 0.40 && progress < 0.50) {
            // AT PILLARS (Stable)
            targetZ = -200;
            targetScale = 3.0;
            baseOpacity = 0.85;

        } else if (progress >= 0.50 && progress < 0.65) {
            // LEAVING (Zoom Out/Away)
            const p = (progress - 0.50) / 0.15; // 0 -> 1
            targetZ = -200 - (p * 4800);        // -200 -> -5000 (Forward? moving past?) 
            // User script says: -200 - (p * 4800) -> -5000. This moves it FURTHER away (behind?) or restarts?
            // "Leaving... Zoom out". 
            // In linear space, usually objects pass BEHIND camera (z > 0). 
            // But this effect moves it deep into negative Z again? 
            // Ah, maybe the user wants it to recede?
            // I will follow the specific logic: z goes from -200 to -5000.
            targetScale = 3.0 - (p * 2.9);      // 3.0 -> 0.1
            baseOpacity = 0.85 * (1 - p);

        } else {
            // Done
            targetZ = -5000;
            targetScale = 0.1;
            baseOpacity = 0;
        }

        // Apply Position & Scale to Group (keeps everything centered)
        groupRef.current.position.set(0, 0, targetZ);
        groupRef.current.scale.set(targetScale, targetScale, targetScale);

        // Update Opacities
        if (glowRef.current) (glowRef.current.material as THREE.MeshBasicMaterial).opacity = baseOpacity * 0.15;
        if (mainRef.current) (mainRef.current.material as THREE.MeshBasicMaterial).opacity = baseOpacity * 0.7;
        if (wispRef.current) (wispRef.current.material as THREE.MeshBasicMaterial).opacity = baseOpacity * 0.4;
        if (starsRef.current) (starsRef.current.material as THREE.PointsMaterial).opacity = baseOpacity * 0.8;
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
            {/* Layer 1: Glow (Back) */}
            <mesh ref={glowRef} position={[0, 0, -50]}>
                <planeGeometry args={[180, 240]} />
                <meshBasicMaterial {...matProps} opacity={0} color="#aa4444" />
            </mesh>

            {/* Layer 2: Main Pillars (Center) */}
            <mesh ref={mainRef} position={[0, 0, 0]}>
                <planeGeometry args={[150, 200]} />
                <meshBasicMaterial {...matProps} opacity={0} color="#ffffff" />
            </mesh>

            {/* Layer 3: Wisps (Front) */}
            <mesh ref={wispRef} position={[0, 0, 50]}>
                <planeGeometry args={[100, 120]} />
                <meshBasicMaterial {...matProps} opacity={0} color="#aaaaff" />
            </mesh>

            {/* Layer 4: Nebula Stars (Twinkling particles inside) */}
            <points ref={starsRef} geometry={starGeo}>
                <pointsMaterial
                    color="#ffaa66"
                    size={3}
                    transparent
                    opacity={0}
                    blending={THREE.AdditiveBlending}
                    sizeAttenuation={false}
                />
            </points>
        </group>
    );
}

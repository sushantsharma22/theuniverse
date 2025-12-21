'use client';

// ═══════════════════════════════════════════════════════════════════════════
// PHOTO PLANE - Simple, performant photo display
// ═══════════════════════════════════════════════════════════════════════════

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { PhotoData } from '@/lib/types';
import { PHOTO_POSITIONS, CONFIG } from '@/lib/constants';

interface PhotoPlaneProps {
    data: PhotoData;
    index: number;
}

export default function PhotoPlane({ data, index }: PhotoPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    const { camera } = useThree();

    // Load texture
    const texture = useTexture(data.src);

    // Get position
    const position = PHOTO_POSITIONS[index] || new THREE.Vector3(0, 0, -index * 30);

    // Calculate aspect ratio
    const aspect = useMemo(() => {
        const img = texture.image as HTMLImageElement | undefined;
        if (img && img.width && img.height) {
            return img.width / img.height;
        }
        return 1.6;
    }, [texture]);

    useFrame(() => {
        if (!meshRef.current || !materialRef.current) return;

        const dist = camera.position.distanceTo(meshRef.current.position);

        // Simple visibility based on distance
        let targetOpacity: number;
        if (dist > 50) {
            targetOpacity = 0;
        } else if (dist > 30) {
            targetOpacity = (50 - dist) / 20;
        } else if (dist > 10) {
            targetOpacity = 1.0;
        } else if (dist > 3) {
            targetOpacity = (dist - 3) / 7;
        } else {
            targetOpacity = 0;
        }

        // Fast opacity transition
        materialRef.current.opacity = THREE.MathUtils.lerp(
            materialRef.current.opacity,
            targetOpacity,
            0.15
        );

        // Scale effect
        const scale = THREE.MathUtils.clamp(1.0 + (40 - dist) / 30, 0.9, 1.5);
        meshRef.current.scale.setScalar(scale);

        // Billboard - face camera
        meshRef.current.lookAt(camera.position);
    });

    return (
        <mesh ref={meshRef} position={[position.x, position.y, position.z]}>
            <planeGeometry args={[CONFIG.PHOTO_SCALE * aspect, CONFIG.PHOTO_SCALE]} />
            <meshBasicMaterial
                ref={materialRef}
                map={texture}
                transparent
                opacity={0}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
}

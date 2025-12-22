'use client';

// ═══════════════════════════════════════════════════════════════════════════
// STARFIELD - Dense star field to fly through
// ═══════════════════════════════════════════════════════════════════════════

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CONFIG } from '@/lib/constants';

export default function StarField() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);

    // Generate stars in a TUBE along the Z axis - you fly THROUGH them
    const starData = useMemo(() => {
        const matrices: THREE.Matrix4[] = [];
        const colors: THREE.Color[] = [];
        const matrix = new THREE.Matrix4();
        const color = new THREE.Color();

        for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
            // Tube/cylinder around the camera path
            const radius = 5 + Math.random() * 150; // Close to far
            const theta = Math.random() * Math.PI * 2;

            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);
            // Z spans the entire journey (extended for deep universe)
            const z = 200 - Math.random() * 3000;

            const scale = 0.2 + Math.random() * 0.8;
            matrix.makeScale(scale, scale, scale);
            matrix.setPosition(x, y, z);
            matrices.push(matrix.clone());

            // Star colors
            const colorType = Math.random();
            if (colorType < 0.6) {
                // White-blue
                const brightness = 0.7 + Math.random() * 0.3;
                color.setRGB(brightness * 0.9, brightness * 0.95, brightness);
            } else if (colorType < 0.85) {
                // Yellow-white
                const brightness = 0.6 + Math.random() * 0.4;
                color.setRGB(brightness, brightness * 0.95, brightness * 0.7);
            } else {
                // Orange-red
                const brightness = 0.5 + Math.random() * 0.5;
                color.setRGB(brightness, brightness * 0.6, brightness * 0.3);
            }
            colors.push(color.clone());
        }

        return { matrices, colors };
    }, []);

    // Initialize mesh
    useEffect(() => {
        if (!meshRef.current) return;

        starData.matrices.forEach((matrix, i) => {
            meshRef.current!.setMatrixAt(i, matrix);
            meshRef.current!.setColorAt(i, starData.colors[i]);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }
    }, [starData]);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, CONFIG.STAR_COUNT]} frustumCulled={false}>
            <sphereGeometry args={[0.08, 4, 4]} />
            <meshBasicMaterial ref={materialRef} color="#ffffff" transparent opacity={0.9} />
        </instancedMesh>
    );
}

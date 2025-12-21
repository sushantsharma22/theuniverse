'use client';

// ═══════════════════════════════════════════════════════════════════════════
// STARFIELD - Optimized instanced stars
// ═══════════════════════════════════════════════════════════════════════════

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { PHOTOS, CONFIG } from '@/lib/constants';

export default function StarField() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    const currentPhotoIndex = useScrollStore(state => state.currentPhotoIndex);

    // Generate star data once
    const starData = useMemo(() => {
        const matrices: THREE.Matrix4[] = [];
        const colors: THREE.Color[] = [];
        const matrix = new THREE.Matrix4();
        const color = new THREE.Color();

        for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
            const radius = 50 + Math.random() * 150;
            const theta = Math.random() * Math.PI * 2;

            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);
            const z = 120 - Math.random() * 400;

            const scale = 0.2 + Math.random() * 0.8;
            matrix.makeScale(scale, scale, scale);
            matrix.setPosition(x, y, z);
            matrices.push(matrix.clone());

            const brightness = 0.5 + Math.random() * 0.5;
            color.setRGB(brightness, brightness, brightness);
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

    // Tint stars based on scene
    useFrame(() => {
        if (!materialRef.current) return;

        const photo = PHOTOS[currentPhotoIndex];
        if (photo) {
            const targetTint = new THREE.Color(photo.starTint);
            materialRef.current.color.lerp(targetTint, 0.05);
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, CONFIG.STAR_COUNT]} frustumCulled={false}>
            <sphereGeometry args={[0.06, 3, 3]} />
            <meshBasicMaterial ref={materialRef} color="#ffffff" transparent opacity={0.85} />
        </instancedMesh>
    );
}

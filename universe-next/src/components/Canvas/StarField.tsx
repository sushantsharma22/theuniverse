'use client';

// ═══════════════════════════════════════════════════════════════════════════
// STARFIELD - 15K Instanced Stars with Color Tinting
// ═══════════════════════════════════════════════════════════════════════════

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { PHOTOS, CONFIG } from '@/lib/constants';

export default function StarField() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    const currentPhotoIndex = useScrollStore(state => state.currentPhotoIndex);
    const progress = useScrollStore(state => state.progress);
    const { invalidate } = useThree();

    // Generate star positions once
    const { matrices, colors } = useMemo(() => {
        const matrices: THREE.Matrix4[] = [];
        const colors: THREE.Color[] = [];
        const matrix = new THREE.Matrix4();
        const color = new THREE.Color();

        for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
            // Cylindrical distribution around camera path
            const radius = 60 + Math.random() * 180;
            const theta = Math.random() * Math.PI * 2;

            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);
            const z = 150 - Math.random() * 450;

            const scale = 0.3 + Math.random() * 1.0;
            matrix.makeScale(scale, scale, scale);
            matrix.setPosition(x, y, z);
            matrices.push(matrix.clone());

            // Varied star colors
            const brightness = 0.6 + Math.random() * 0.4;
            color.setRGB(brightness, brightness, brightness * 1.05);
            colors.push(color.clone());
        }

        return { matrices, colors };
    }, []);

    // Initialize instanced mesh
    useEffect(() => {
        if (!meshRef.current) return;

        matrices.forEach((matrix, i) => {
            meshRef.current!.setMatrixAt(i, matrix);
            meshRef.current!.setColorAt(i, colors[i]);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }

        // Trigger initial render
        invalidate();
    }, [matrices, colors, invalidate]);

    // Trigger render when scene changes
    useEffect(() => {
        invalidate();
    }, [currentPhotoIndex, invalidate]);

    // Update star tint based on current scene
    useFrame(() => {
        if (!materialRef.current) return;

        const photo = PHOTOS[currentPhotoIndex];
        if (photo) {
            const targetTint = new THREE.Color(photo.starTint);
            materialRef.current.color.lerp(targetTint, 0.02);
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, CONFIG.STAR_COUNT]} frustumCulled={false}>
            <sphereGeometry args={[0.08, 4, 4]} />
            <meshBasicMaterial ref={materialRef} color="#ffffff" transparent opacity={0.9} />
        </instancedMesh>
    );
}

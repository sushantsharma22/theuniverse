'use client';

// ═══════════════════════════════════════════════════════════════════════════
// STARFIELD - With conditional rendering and proper disposal
// ═══════════════════════════════════════════════════════════════════════════

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { PHOTOS, CONFIG } from '@/lib/constants';

export default function StarField() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    const geometryRef = useRef<THREE.SphereGeometry | null>(null);
    const currentPhotoIndex = useScrollStore(state => state.currentPhotoIndex);
    const isScrolling = useScrollStore(state => state.isScrolling);
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
    }, [matrices, colors]);

    // ✅ CRITICAL: Dispose geometry on unmount
    useEffect(() => {
        geometryRef.current = new THREE.SphereGeometry(0.08, 4, 4);

        return () => {
            if (geometryRef.current) {
                geometryRef.current.dispose();
                geometryRef.current = null;
            }
            if (materialRef.current) {
                materialRef.current.dispose();
            }
        };
    }, []);

    // Update star tint based on current scene
    useFrame(() => {
        // ✅ Skip if not scrolling
        if (!isScrolling) return;
        if (!materialRef.current) return;

        const photo = PHOTOS[currentPhotoIndex];
        if (photo) {
            const targetTint = new THREE.Color(photo.starTint);
            materialRef.current.color.lerp(targetTint, 0.02);
        }

        invalidate();
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, CONFIG.STAR_COUNT]} frustumCulled={false}>
            <sphereGeometry args={[0.08, 4, 4]} />
            <meshBasicMaterial ref={materialRef} color="#ffffff" transparent opacity={0.9} />
        </instancedMesh>
    );
}

'use client';

// ═══════════════════════════════════════════════════════════════════════════
// STARFIELD - Dense 3D star field with parallax depth effect
// ═══════════════════════════════════════════════════════════════════════════

import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { CONFIG } from '@/lib/constants';

export default function StarField() {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    // Generate stars with varying sizes for 3D depth parallax effect
    const starData = useMemo(() => {
        const matrices: THREE.Matrix4[] = [];
        const colors: THREE.Color[] = [];
        const matrix = new THREE.Matrix4();
        const color = new THREE.Color();

        for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
            // Tube/cylinder around the camera path - varied radius for depth
            const radius = 3 + Math.random() * 200; // Wider range for more 3D feel
            const theta = Math.random() * Math.PI * 2;

            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);
            // Z spans the entire cosmic journey
            const z = 200 - Math.random() * 8500;

            // VARIABLE STAR SIZES for parallax 3D effect
            // Nearby stars: bigger, far stars: smaller
            const distanceFromPath = Math.sqrt(x * x + y * y);

            // Stars closer to the path (center) are BIGGER for more 3D pop
            let baseScale;
            if (distanceFromPath < 20) {
                // Very close - big and bright (fly past these)
                baseScale = 0.8 + Math.random() * 1.5;
            } else if (distanceFromPath < 60) {
                // Medium distance
                baseScale = 0.4 + Math.random() * 0.8;
            } else if (distanceFromPath < 120) {
                // Far
                baseScale = 0.2 + Math.random() * 0.4;
            } else {
                // Very far - tiny background stars
                baseScale = 0.08 + Math.random() * 0.2;
            }

            matrix.makeScale(baseScale, baseScale, baseScale);
            matrix.setPosition(x, y, z);
            matrices.push(matrix.clone());

            // Star colors - brighter for closer stars
            const colorType = Math.random();
            const brightnessMultiplier = distanceFromPath < 30 ? 1.2 : 1.0;

            if (colorType < 0.55) {
                // White-blue (most common)
                const brightness = (0.7 + Math.random() * 0.3) * brightnessMultiplier;
                color.setRGB(brightness * 0.9, brightness * 0.95, brightness);
            } else if (colorType < 0.8) {
                // Yellow-white
                const brightness = (0.6 + Math.random() * 0.4) * brightnessMultiplier;
                color.setRGB(brightness, brightness * 0.95, brightness * 0.7);
            } else if (colorType < 0.95) {
                // Orange-red
                const brightness = (0.5 + Math.random() * 0.5) * brightnessMultiplier;
                color.setRGB(brightness, brightness * 0.6, brightness * 0.3);
            } else {
                // Blue giants (rare, bright)
                const brightness = 0.8 + Math.random() * 0.2;
                color.setRGB(brightness * 0.7, brightness * 0.8, brightness);
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
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
        </instancedMesh>
    );
}

'use client';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN 3D SCENE - Optimized for smooth scrolling
// ═══════════════════════════════════════════════════════════════════════════

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import StarField from './StarField';
import PhotoPlane from './PhotoPlane';
import CameraRig from './CameraRig';
import Effects from './Effects';
import { PHOTOS, CONFIG } from '@/lib/constants';

export default function Scene() {
    return (
        <Canvas
            // ✅ Use "always" for smooth response, but components skip work when idle
            frameloop="always"
            gl={{
                antialias: false,
                powerPreference: 'high-performance', // Changed for better response
                alpha: false,
                stencil: false,
                depth: true,
            }}
            dpr={[1, CONFIG.PIXEL_RATIO]}
            camera={{ fov: 60, near: 0.1, far: 500 }}
            onCreated={({ gl, scene }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.2;
                gl.outputColorSpace = THREE.SRGBColorSpace;
                scene.background = new THREE.Color('#000208');
            }}
            className="fixed inset-0 z-0"
            style={{ touchAction: 'pan-y' }}
        >
            {/* Ambient light */}
            <ambientLight intensity={0.5} />

            {/* Core components */}
            <StarField />
            <CameraRig />
            <Effects />

            {/* Photo planes - lazy load each */}
            {PHOTOS.map((photo, i) => (
                <Suspense key={i} fallback={null}>
                    <PhotoPlane data={photo} index={i} />
                </Suspense>
            ))}

            {/* Preload textures in background */}
            <Suspense fallback={null}>
                <Preload all />
            </Suspense>
        </Canvas>
    );
}

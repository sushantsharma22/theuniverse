'use client';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN 3D SCENE - React Three Fiber Canvas
// ═══════════════════════════════════════════════════════════════════════════

import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import StarField from './StarField';
import PhotoPlane from './PhotoPlane';
import CameraRig from './CameraRig';
import Effects from './Effects';
import { PHOTOS } from '@/lib/constants';

export default function Scene() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <Canvas
            ref={canvasRef}
            gl={{
                antialias: false,
                powerPreference: 'low-power',
                alpha: false,
                stencil: false,
                depth: true,
            }}
            dpr={[1, 1.5]}
            camera={{ fov: 60, near: 0.1, far: 500 }}
            onCreated={({ gl, scene }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.2;
                gl.outputColorSpace = THREE.SRGBColorSpace;
                scene.background = new THREE.Color('#000208');

                // Store renderer reference for dynamic exposure
                scene.userData.renderer = gl;
            }}
            className="fixed inset-0 z-0"
            style={{ touchAction: 'pan-y' }}
        >
            {/* Ambient light for base visibility */}
            <ambientLight intensity={0.4} />

            {/* Content */}
            <StarField />
            <CameraRig />
            <Effects />

            {/* Photo planes - Individual suspense for granular loading */}
            {PHOTOS.map((photo, i) => (
                <Suspense key={i} fallback={null}>
                    <PhotoPlane data={photo} index={i} />
                </Suspense>
            ))}

            {/* Texture preloading */}
            <Suspense fallback={null}>
                <Preload all />
            </Suspense>
        </Canvas>
    );
}

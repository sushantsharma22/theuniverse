'use client';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN 3D SCENE - Just stars for now
// ═══════════════════════════════════════════════════════════════════════════

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import StarField from '@/components/Canvas/StarField';
import CameraRig from '@/components/Canvas/CameraRig';
import Landmark from '@/components/Canvas/Landmark';
import { CONFIG, LANDMARKS } from '@/lib/constants';

export default function Scene() {
    return (
        <Canvas
            frameloop="always"
            gl={{
                antialias: false,
                powerPreference: 'high-performance',
                alpha: false,
                stencil: false,
                depth: true,
            }}
            dpr={[1, CONFIG.PIXEL_RATIO]}
            camera={{ fov: 60, near: 0.1, far: 1000 }}
            onCreated={({ gl, scene }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.2;
                gl.outputColorSpace = THREE.SRGBColorSpace;
                scene.background = new THREE.Color('#000005');
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                touchAction: 'pan-y',
                pointerEvents: 'none'
            }}
        >
            <StarField />
            <CameraRig />

            {LANDMARKS.map((landmark) => (
                <Suspense key={landmark.id} fallback={null}>
                    <Landmark data={landmark} />
                </Suspense>
            ))}
        </Canvas>
    );
}

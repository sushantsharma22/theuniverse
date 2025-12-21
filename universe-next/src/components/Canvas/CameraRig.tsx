'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA RIG - Smooth camera movement along CatmullRom path
// ═══════════════════════════════════════════════════════════════════════════

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { WAYPOINTS, PHOTOS, CONFIG } from '@/lib/constants';

export default function CameraRig() {
    const { camera, scene } = useThree();
    const scrollProgress = useScrollStore(state => state.progress);
    const currentColorRef = useRef(new THREE.Color('#000208'));
    const targetColorRef = useRef(new THREE.Color('#000208'));

    // Create smooth camera path from waypoints
    const cameraPath = useMemo(() => {
        return new THREE.CatmullRomCurve3(WAYPOINTS, false, 'catmullrom', 0.5);
    }, []);

    useFrame(() => {
        // Clamp progress
        const t = Math.max(0, Math.min(1, scrollProgress));

        // Get target position on path
        const targetPos = cameraPath.getPointAt(t);

        // Smooth camera movement
        camera.position.lerp(targetPos, CONFIG.LERP_SPEED);

        // Look ahead on path for natural forward motion
        const lookT = Math.min(t + 0.04, 1);
        const lookTarget = cameraPath.getPointAt(lookT);
        camera.lookAt(lookTarget);

        // Update scene theme based on progress
        updateSceneTheme(t, scene, currentColorRef.current, targetColorRef.current);
    });

    return null;
}

function updateSceneTheme(
    progress: number,
    scene: THREE.Scene,
    currentColor: THREE.Color,
    targetColor: THREE.Color
) {
    // Calculate which scene we're in
    const totalScenes = PHOTOS.length;
    const sceneProgress = progress * (totalScenes - 1);
    const currentIndex = Math.floor(sceneProgress);
    const nextIndex = Math.min(currentIndex + 1, totalScenes - 1);
    const blend = sceneProgress - currentIndex;

    // Get colors from scene data
    const currentScene = PHOTOS[currentIndex];
    const nextScene = PHOTOS[nextIndex];

    if (currentScene && nextScene) {
        // Blend between theme colors
        const color1 = new THREE.Color(currentScene.themeColor);
        const color2 = new THREE.Color(nextScene.themeColor);
        targetColor.lerpColors(color1, color2, blend);

        // Smooth transition
        currentColor.lerp(targetColor, CONFIG.COLOR_LERP_SPEED);

        // Apply to scene background (no fog!)
        scene.background = currentColor.clone();

        // Dynamic exposure
        const renderer = scene.userData.renderer;
        if (renderer) {
            const targetExposure = THREE.MathUtils.lerp(
                currentScene.exposure,
                nextScene.exposure,
                blend
            );
            renderer.toneMappingExposure = THREE.MathUtils.lerp(
                renderer.toneMappingExposure,
                targetExposure,
                0.03
            );
        }
    }
}

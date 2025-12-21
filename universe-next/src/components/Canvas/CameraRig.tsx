'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA RIG - Smooth, responsive camera movement
// ═══════════════════════════════════════════════════════════════════════════

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { WAYPOINTS, PHOTOS, CONFIG } from '@/lib/constants';

// Pre-create colors to avoid GC
const currentColor = new THREE.Color('#000208');
const targetColor = new THREE.Color('#000208');
const tempColor1 = new THREE.Color();
const tempColor2 = new THREE.Color();

export default function CameraRig() {
    const { camera, scene } = useThree();
    const progress = useScrollStore(state => state.progress);
    const smoothProgress = useRef(0);

    // Create camera path once
    const cameraPath = useMemo(() => {
        return new THREE.CatmullRomCurve3(WAYPOINTS, false, 'catmullrom', 0.5);
    }, []);

    useFrame(() => {
        // Smooth the progress value
        smoothProgress.current += (progress - smoothProgress.current) * CONFIG.LERP_SPEED;

        // Clamp
        const t = Math.max(0, Math.min(1, smoothProgress.current));

        // Get target position on path
        const targetPos = cameraPath.getPointAt(t);

        // Move camera (fast lerp for responsiveness)
        camera.position.lerp(targetPos, CONFIG.LERP_SPEED);

        // Look ahead on path
        const lookT = Math.min(t + 0.04, 1);
        const lookTarget = cameraPath.getPointAt(lookT);
        camera.lookAt(lookTarget);

        // Update scene colors
        updateSceneTheme(t, scene);
    });

    return null;
}

function updateSceneTheme(progress: number, scene: THREE.Scene) {
    const totalScenes = PHOTOS.length;
    const sceneProgress = progress * (totalScenes - 1);
    const currentIndex = Math.floor(sceneProgress);
    const nextIndex = Math.min(currentIndex + 1, totalScenes - 1);
    const blend = sceneProgress - currentIndex;

    const currentScene = PHOTOS[currentIndex];
    const nextScene = PHOTOS[nextIndex];

    if (currentScene && nextScene) {
        tempColor1.set(currentScene.themeColor);
        tempColor2.set(nextScene.themeColor);
        targetColor.lerpColors(tempColor1, tempColor2, blend);
        currentColor.lerp(targetColor, CONFIG.COLOR_LERP_SPEED);
        scene.background = currentColor;
    }
}

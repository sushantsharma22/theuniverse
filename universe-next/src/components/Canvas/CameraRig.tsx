'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA RIG - Smooth camera movement along the journey path
// ═══════════════════════════════════════════════════════════════════════════

import { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { WAYPOINTS, PHOTOS, CONFIG } from '@/lib/constants';

// Pre-create colors to avoid GC churn
const currentColor = new THREE.Color('#000208');
const targetColor = new THREE.Color('#000208');

export default function CameraRig() {
    const { camera, scene, invalidate } = useThree();
    const progress = useScrollStore(state => state.progress);
    const isScrolling = useScrollStore(state => state.isScrolling);
    const lastProgress = useRef(0);
    const needsAnimation = useRef(true);

    // Create smooth camera path from waypoints (ONCE)
    const cameraPath = useMemo(() => {
        return new THREE.CatmullRomCurve3(WAYPOINTS, false, 'catmullrom', 0.5);
    }, []);

    // Trigger initial render and when scrolling starts
    useEffect(() => {
        needsAnimation.current = true;
        invalidate();
    }, [progress, invalidate]);

    useFrame(() => {
        // Calculate if we need to animate (position changed or still lerping)
        const progressDelta = Math.abs(progress - lastProgress.current);
        const isLerping = progressDelta > 0.0001 || needsAnimation.current;

        if (!isLerping && !isScrolling) {
            return; // GPU idles
        }

        // Clamp progress
        const t = Math.max(0, Math.min(1, progress));
        lastProgress.current = progress;

        // Get target position on path
        const targetPos = cameraPath.getPointAt(t);

        // Smooth camera movement
        camera.position.lerp(targetPos, CONFIG.LERP_SPEED);

        // Look ahead on path for natural forward motion
        const lookT = Math.min(t + 0.04, 1);
        const lookTarget = cameraPath.getPointAt(lookT);
        camera.lookAt(lookTarget);

        // Update scene theme based on progress
        updateSceneTheme(t, scene);

        // Check if camera is close enough to target
        const distanceToTarget = camera.position.distanceTo(targetPos);
        if (distanceToTarget < 0.01 && !isScrolling) {
            needsAnimation.current = false;
            return; // Stop animating
        }

        // Request next frame
        invalidate();
    });

    return null;
}

function updateSceneTheme(progress: number, scene: THREE.Scene) {
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

        // Apply to scene background
        scene.background = currentColor.clone();
    }
}

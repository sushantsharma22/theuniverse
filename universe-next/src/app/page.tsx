'use client';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE JOURNEY - Main Page
// ═══════════════════════════════════════════════════════════════════════════

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';
import SmoothScroll from '@/components/Scroll/SmoothScroll';
import StartScreen from '@/components/UI/StartScreen';
import Timeline from '@/components/UI/Timeline';
import TextOverlay from '@/components/UI/TextOverlay';
import TemperatureDisplay from '@/components/UI/TemperatureDisplay';
import EndScreen from '@/components/UI/EndScreen';
import LoadingScreen from '@/components/UI/LoadingScreen';
import { PHOTOS } from '@/lib/constants';

// Dynamic import Canvas to prevent SSR hydration issues
const Scene = dynamic(() => import('@/components/Canvas/Scene'), {
  ssr: false,
  loading: () => <LoadingScreen progress={30} />,
});

export default function UniversePage() {
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // ✅ PRELOAD first 3 textures BEFORE mounting Three.js
  useEffect(() => {
    const preloadTextures = async () => {
      const loader = new THREE.TextureLoader();
      const texturesToLoad = PHOTOS.slice(0, 3);

      for (let i = 0; i < texturesToLoad.length; i++) {
        await new Promise<void>((resolve) => {
          loader.load(
            texturesToLoad[i].src,
            () => {
              setLoadProgress(Math.round(((i + 1) / texturesToLoad.length) * 100));
              resolve();
            },
            undefined,
            () => resolve() // Continue even on error
          );
        });
      }

      setLoaded(true);
    };

    preloadTextures();
  }, []);

  // Show loading screen until textures preloaded
  if (!loaded) {
    return <LoadingScreen progress={loadProgress} />;
  }

  return (
    <>
      {/* 3D Canvas - Fixed background */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<LoadingScreen progress={90} />}>
          <Scene />
        </Suspense>
      </div>

      {/* Scrollable content - Creates document height */}
      <SmoothScroll />

      {/* UI Overlays - Fixed on top */}
      <StartScreen />
      <Timeline />
      <TextOverlay />
      <TemperatureDisplay />
      <EndScreen />
    </>
  );
}

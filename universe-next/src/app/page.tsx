'use client';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE JOURNEY - Main Page
// ═══════════════════════════════════════════════════════════════════════════

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SmoothScroll from '@/components/Scroll/SmoothScroll';
import StartScreen from '@/components/UI/StartScreen';
import Timeline from '@/components/UI/Timeline';
import TextOverlay from '@/components/UI/TextOverlay';
import TemperatureDisplay from '@/components/UI/TemperatureDisplay';
import EndScreen from '@/components/UI/EndScreen';
import LoadingScreen from '@/components/UI/LoadingScreen';

// Dynamic import Canvas to prevent SSR hydration issues
const Scene = dynamic(() => import('@/components/Canvas/Scene'), {
  ssr: false,
  loading: () => <LoadingScreen progress={50} />,
});

export default function UniversePage() {
  return (
    <main className="relative w-screen min-h-screen">
      {/* 3D Canvas */}
      <Suspense fallback={<LoadingScreen progress={75} />}>
        <Scene />
      </Suspense>

      {/* Smooth scroll container */}
      <SmoothScroll />

      {/* UI Overlays */}
      <StartScreen />
      <Timeline />
      <TextOverlay />
      <TemperatureDisplay />
      <EndScreen />
    </main>
  );
}

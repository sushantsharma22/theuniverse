'use client';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE JOURNEY - Star Field Experience
// ═══════════════════════════════════════════════════════════════════════════

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SmoothScroll from '@/components/Scroll/SmoothScroll';
import StartScreen from '@/components/UI/StartScreen';
import LoadingScreen from '@/components/UI/LoadingScreen';

// Dynamic import Canvas
const Scene = dynamic(() => import('@/components/Canvas/Scene'), {
  ssr: false,
  loading: () => <LoadingScreen progress={50} />,
});

export default function UniversePage() {
  return (
    <>
      <Suspense fallback={<LoadingScreen progress={50} />}>
        <Scene />
      </Suspense>

      <SmoothScroll />

      <StartScreen />
    </>
  );
}

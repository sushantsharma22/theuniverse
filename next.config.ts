import type { NextConfig } from "next";

// ═══════════════════════════════════════════════════════════════════════════
// GOD-TIER NEXT.JS CONFIGURATION
// Optimized for Core Web Vitals, SEO, and Static Export
// ═══════════════════════════════════════════════════════════════════════════

const nextConfig: NextConfig = {
  // GitHub Pages static export settings
  output: 'export',
  
  // Image optimization (GitHub Pages doesn't support Next.js image optimization)
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Routing
  trailingSlash: true, // Consistent URL structure for SEO
  
  // ═══════════════════════════════════════════════════════════════════════════
  // TURBOPACK CONFIGURATION (Next.js 16+)
  // ═══════════════════════════════════════════════════════════════════════════
  turbopack: {
    resolveAlias: {
      'three': 'three/build/three.module.js',
    },
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PERFORMANCE OPTIMIZATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei'],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages static export settings
  output: 'export',
  basePath: '/theuniverse',
  assetPrefix: '/theuniverse/',
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js image optimization
  },
  trailingSlash: true, // Helps with GitHub Pages routing
};

export default nextConfig;

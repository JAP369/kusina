// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // Bypass TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Bypass ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Bypass TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Bypass ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
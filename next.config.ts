import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.omnia-ai.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // serverActions is true by default in Next.js 14+; adding other possible experimental tags if needed
  },
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/discussion',
        destination: '/chat',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [{ type: 'query', key: 'discussion' }],
        destination: '/chat',
        permanent: false,
      }
    ];
  },
};

export default nextConfig;

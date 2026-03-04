import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://res.cloudinary.com/dyendeiwv/image/upload/**'),
      new URL('https://crests.football-data.org/**'),
    ],
  },
};

export default nextConfig;

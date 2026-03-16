import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 100, 120, 256, 280, 300, 400],
    remotePatterns: [
      new URL('https://res.cloudinary.com/dyendeiwv/image/upload/**'),
      new URL('https://crests.football-data.org/**'),
      // апи возвращает 1 изображение с wikipedia
      new URL('https://upload.wikimedia.org/wikipedia/en/0/05/G_D_Chaves.png'),
    ],
  },
};

export default nextConfig;

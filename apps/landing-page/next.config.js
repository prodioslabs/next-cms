/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['next-cms', 'ui'],
}

module.exports = nextConfig

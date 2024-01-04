/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pocket.haydenhayden.com',
        port: '',
        pathname: '/blog/**',
      },
    ],
  },
}

module.exports = nextConfig

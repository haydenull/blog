import Icons from 'unplugin-icons/webpack'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: 'jsx',
        jsx: 'react'
      })
    )

    return config
  }
}

export default nextConfig

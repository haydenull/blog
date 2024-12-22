import Icons from 'unplugin-icons/webpack'
// import withPlaiceholder from "@plaiceholder/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  transpilePackages: ["@plaiceholder/ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photo.chuanfang.org',
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

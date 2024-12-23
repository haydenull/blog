---
title: Demo
date: 2024-06-05
cover: https://photo.chuanfang.org/api/v1/t/cc8c7372c7fc65a27e455babdac4c6a31b22ee4f/2aqbem44/fit_2560
draft: false
---

## demo

> [!WARNING]
> GitLab CI/CD Components 是 GitLab 16.0 版本新增的功能。`code` 123
>
> new line

最后的记录是多少呢 

是吧

哈哈哈



> [!IMPORTANT]
>
> 嘿嘿

> [!TIP]
>
> 嘿嘿

> [!WARNING]
>
> 这是警告信息

返回接口是正常的好吧

以下为配置

```typescript
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
        pathname: '/api/**',
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

```

但是配置错误就麻烦了

> [!TIP]
>
> 有时候报错 需要重启macos


---
title: 如何在 Next.js 中生成包含中文的 Open Graph 图片
description: 使用 next/og 生成 Open Graph 图片，同时解决中文字体体积过大的问题
date: 2024-01-07
cover: https://pocket.haydenhayden.com/blog/202401071739981.JPG
---

最近在升级我的博客，想要在 Twitter 等平台上分享文章时，能够显示文章的封面图，于是就想到了 Open Graph 图片。

## 什么是 Open Graph 图片

Open Graph 图片是一种特殊的图片，它可以在 Twitter 等平台上显示，可以让你的文章在分享时更加美观。

## 如何在 Next.js 中生成 Open Graph 图片

Vercel 官方提供了一个 [@vercel/og](https://vercel.com/docs/functions/edge-functions/og-image-generation) 的库，可以用来生成 Open Graph 图片。

下面是一个简单的用于 Next.js 14 App Router 的示例：

1. 安装依赖

```bash
pnpm add @vercel/og
```

2. 新增一个接口用于生成 Open Graph 图片

```tsx
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export function GET() {
  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full p-[50px] justify-between bg-zinc-50">
        👋 Hello
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
```

启动服务后，访问 `http://localhost:3000/api/og`，可以看到返回的图片：

![](https://pocket.haydenhayden.com/blog/202401071754538.png)

## 如何动态生成图片

上面的示例中，我们只是简单的返回了一个静态的图片，但是在实际的项目中，我们需要根据文章的标题来生成图片。

我们可以从接口的参数中获取到文章的标题，然后将标题渲染到图片中。

```tsx
export function GET() {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title')

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full p-[50px] justify-between bg-zinc-50">
        <h1 className="text-[80px] font-bold">{title}</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
```

访问 `http://localhost:3000/api/og?title=Hello, Hayden`，可以看到返回的图片：

![](https://pocket.haydenhayden.com/blog/202401071758217.png)

## 如何兼容中文

> By default, @vercel/og only has the Noto Sans font included. If you need to use other fonts, you can pass them in the fonts option.

默认情况下，@vercel/og 只包含了 Noto Sans 字体，这是一个英文字体，**不支持中文**。所以我们需要自己传入支持中文的字体。

我们以 Mi Sans 字体为例：

1. 将字体文件放到 `public/fonts` 目录下

```txt
|- public
  |- fonts
    |- MiSans-Regular.ttf
```

2. 在接口中引入字体

```tsx{3-5,12-18}
// ...
// 这里的路径是相对于当前文件的
const miSansFont = await fetch(new URL('../../../../public/fonts/MiSans-Regular.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
)

return new ImageResponse(
  // ...
  {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'mi-sans',
        data: miSansFont,
        style: 'normal',
      },
    ],
    emoji: 'twemoji',
  },
)
```

然后我们访问 `http://localhost:3000/api/og?title=Hello, 启封Hayden`，可以看到返回的图片：

![](https://pocket.haydenhayden.com/blog/202401071820738.png)

## 如何解决中文字体体积过大的问题

上面的代码在本地运行是没有问题的，但是在部署到 Vercel 时，会报错：

![](https://pocket.haydenhayden.com/blog/202401071823121.png)

这是因为部署时，Vercel 会将字体文件复制到 Edge Function 的运行环境中，免费版的 Edge Function 的运行环境只有 1MB，而 Mi Sans 字体压缩后也会超过 5M，所以会报错。

中文字体文件普遍都在 5M 以上，要解决这个问题一个方案是将文件上传到 CDN，然后在 Edge Function 中引入 CDN 上的文件。如此一来，Edge Function 的运行环境中就不会包含字体文件。

我试过一版，因为全量的字体文件比较大，放到 CDN 上，有一定概率 next.js 请求不到字体文件，导致部署失败。

## 解决中文字体包过大的问题

这时候我想起了 [中文网字计划](https://chinese-font.netlify.app/)，他们有一个特色就是字体文件按需加载，也就是说，我们只需要加载我们需要的字体文件，而不是全量的。似乎可以解决我们的问题。

这里有两篇文章可以参考:
- https://voderl.cn/js/对中文字体进行压缩/
- https://voderl.cn/js/对中文字体进行切片/

针对使用中文字体的网站优化方案有两个：

1. 对全量的中文字体按一个规则进行切片，每个切片一版控制在 50k 以内，然后在网页加载时，浏览器依据当前用到的字符按需请求切片，这样就可以实现字体按需加载，减少字体文件的体积。
2. 打包应用时，分析所有用到的文案，精准生成字体文件，这样就不会出现字体文件过大的问题。

方案 2 字体的体积更小，但是需要在打包时进行分析，也就是说对于动态生成的内容，无法应用这个方案。所以在大多数网站中，方案 1 更加实用。Google Fonts 就是使用的这个方案。

但是我们只想生成博客里标题需要的字体，而标题在博客部署时肯定是确定的。所以方案 1 更适合我们的场景。并且生成的字体文件体积也非常小，可以直接放到 Edge 中。

### 生成动态字体文件

我们在项目根目录下创建一个 js 文件:

```js
// scripts/compressFont.js
import Fontmin from 'fontmin';
import * as glob from 'glob';
import matter from 'gray-matter'

// 读取 content 下的所有 markdown 文件（包含子目录）
// 使用 'gray-matter' 解析 markdown 文件，提取出 front matter
// 将 front matter 中的 title 和 description 字段提取出来
const markdownFiles = glob.sync('content/**/*.md');
const frontMatters = markdownFiles.map(file => matter.read(file).data);
const textSubset = frontMatters.map(({ title, description }) => `${title}${description}`).join('');

const fontmin = new Fontmin()
  .src('public/fonts/MiSans-Regular.ttf')
  .use(Fontmin.glyph({
    text: textSubset,
    hinting: false,
  }))
  .dest('public/fonts/dynamic');

fontmin.run((err, files) => {
  if (err) throw err;
  console.log('compress font success\n');
})
```

我们在 `package.json` 中添加一个脚本，用于生成动态字体文件：

```json
{
  "scripts": {
    "compress-font": "node scripts/compressFont.js"
  }
}
```

最终生成的字体文件在 `public/fonts/dynamic` 目录下，我们将接口中的字体文件路径替换为动态字体文件路径即可。

```tsx
const miSansFont = await fetch(new URL('../../../../public/fonts/dynamic/MiSans-Regular.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
)
```

最后可以看到动态生成的字体文件只有 34k。

![](https://pocket.haydenhayden.com/blog/202401071854257.png)

代码地址：
- [接口代码](https://github.com/haydenull/blog/blob/main/src/app/api/og/route.tsx)
- [压缩字体代码](https://github.com/haydenull/blog/blob/main/scripts/compressFont.mjs)

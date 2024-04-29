---
title: 优化网站在 Google 的搜索结果
description: 为网站增加 Google 搜索，让 Google 快速收录你的网站并优化搜索结果。
date: 2024-04-28
cover: https://pocket.haydenhayden.com/blog/202404281732453.png
---

为自己的站点添加搜索功能，我们可能会考虑 [Algolia](https://www.algolia.com/) 或者 [pagefind](https://pagefind.app/) 这样的搜索服务。他们都需要一定的开发成本，而且可能需要付费。

如果你的站点是一个静态站点，可以考虑使用 Google 搜索。Google 搜索不需要付费，只需要在站点中添加一个搜索框，然后将搜索结果展示在 Google 的搜索结果中。

## 为网站增加 Google 搜索

1. 在站点中添加搜索框
2. 点击搜索跳转到 Google 的搜索结果页面

```tsx
// 将 site 改为你的站点名
export const navigateToGoogleSearch = (text: string) => {
  const encodedText = encodeURIComponent(`site:haydenhayden.com ${text}`)
  window.open(`https://www.google.com/search?q=${encodedText}`, '_blank')
}
```

![](https://pocket.haydenhayden.com/blog/202404281506512.png?x-oss-process=image/resize,w_1500,m_lfit)

> [!tip] 如何实现回车键搜索与中文输入法兼容
> 我们可以监听 input 的 `keydown` 事件，当按下回车键时，触发回调函数。
> 但是中文输入法回车可能误触发搜索，我们可以通过 `isComposing` 属性来判断是否需要触发搜索。
> ```tsx
> <Input
>  onKeyDown={(e) => {
>    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
>      onClickSearch()
>    }
>  }}
> />
> ```


## 让 Google 收录你的网站

可以在 Google 搜索 `site:your-site.com` 查看你的站点是否被 Google 收录。如果搜索结果为空，就说明你的站点还没有被 Google 收录。

可以通过 [Google Search Console](https://search.google.com/search-console/about) 来提交你的站点，让 Google 收录你的站点。

![](https://pocket.haydenhayden.com/blog/202404281756671.png?x-oss-process=image/resize,w_1500,m_lfit)

我这里采用的认证方式是添加 TXT 记录到域名的 DNS 中。你也可以选择其他的认证方式。

认证完成后，我们的网站只是被**收录**了，但是我们还需要让网站的页面被**索引**。只有被索引，才代表这个页面的内容被爬虫收录到了 Google 的数据库中。

为了让爬虫更快地爬取页面，我们需要一个文件来告诉爬虫哪些页面需要被爬取。

## 添加 sitemap

sitemap 是一个 XML 文件，用来告诉搜索引擎哪些页面需要被爬取。如果你的页面是静态的，可以使用 [XML-Sitemaps.com](https://www.xml-sitemaps.com/) 之类的生成工具来生成 sitemap 文件。

我的站点是使用 Next.js 构建的，所以我需要一个动态的 sitemap 文件。

1. 在 `public` 中添加 `robots.txt` 文件

```txt
Sitemap: https://haydenhayden.com/sitemap.xml
```

告诉搜索引擎 sitemap 文件的地址。

2. 添加 `sitemap.xml` 文件

新建文件，路径为 `src/app/sitemap.xml/route.ts`。

获取所有文章，生成 sitemap 内容

```ts
const blogs = await getBlogs()
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://haydenhayden.com</loc></url>
  ${blogs
    .map(({ date, slug, type, sitemapPriority }) => {
      const url = getUrl(`/${type}/${slug}`).href
      return getXml({ date: updatedDate ?? date, url, priority: sitemapPriority })
    })
    .join('\n')}
  </urlset>`

function getUrl(path = '') {
  return new URL(path, 'https://haydenhayden.com')
}
function getXml({
  date,
  url,
  changefreq = 'monthly',
  priority = 0.5,
}: {
  date: Date
  url: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  /** 0.0 ~ 1.0 */
  priority?: number
}) {
  return `<url>
  <loc>${url}</loc>
  <lastmod>${date.toISOString()}</lastmod>
  <priority>${priority}</priority>
  <changefreq>${changefreq}</changefreq>
</url>`
}
```

详细的 xml 格式可以参考 [Sitemap Protocol Format](https://www.sitemaps.org/protocol.html)。

| 属性       | 描述                                                                 |
| :---------- | :-------------------------------------------------------------------- |
| loc        | 页面的 URL                                                           |
| lastmod    | 页面最后修改时间                                                     |
| priority   | 页面的优先级，0.0 ~ 1.0，1.0 为最高优先级                            |
| changefreq | 页面内容的更新频率，always, hourly, daily, weekly, monthly, yearly, never|

一个简单的 sitemap 文件示例：

```xml{3-8}
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://haydenhayden.com/blog/google-search</loc>
    <lastmod>2024-04-28T00:00:00.000Z</lastmod>
    <priority>0.5</priority>
    <changefreq>weekly</changefreq>
  </url>
</urlset>
```

1. 返回 sitemap 文件

```ts
export async function GET() {
  // 获取 sitemap
  return new Response(sitemap, {
    headers: {
      'content-type': 'text/xml',
    },
  })
}
```

完整代码参考 [haydenhayden.com sitemap.xml](https://github.com/haydenull/blog/blob/main/src/app/sitemap.xml/route.ts)

4. 提交 sitemap 到 Google Search Console

![](https://pocket.haydenhayden.com/blog/202404281948412.png?x-oss-process=image/resize,w_1000,m_lfit)

## 请求索引指定页面

当我们的站点有新的页面发布时，Google 往往需要一周到一个月的时间才能爬取到新的页面。如果我们希望 Google 尽快爬取新的页面，可以通过 Google Search Console 请求索引指定页面。

比如我这里的一篇周刊 https://www.haydenhayden.com/weekly/weekly-110 发布于 24 天前，但是 Google 还没有爬取到这个页面。

![](https://pocket.haydenhayden.com/blog/202404281958180.png?x-oss-process=image/resize,w_1000,m_lfit)

我们搜索关键词 `贴纸`，结果为空。

![](https://pocket.haydenhayden.com/blog/202404282000153.png?x-oss-process=image/resize,w_1000,m_lfit)

点击页面中的 `请求索引`，Google 会将爬取这个页面的任务放到优先队列里。

![](https://pocket.haydenhayden.com/blog/202404282024729.png?x-oss-process=image/resize,w_1000,m_lfit)

等待一段时间 **(可能几个小时也可能一天)**，出现如下提示，说明 Google 已经爬取到这个页面。再次搜索关键词 `贴纸`，就可以看到这个页面的搜索结果了。

![](https://pocket.haydenhayden.com/blog/202404290951628.png?x-oss-process=image/resize,w_1000,m_lfit)

## 参考资料

- [How to add a Dynamic Sitemap to your NextJs Blog](https://www.sandromaglione.com/articles/how-to-add-dynamic-sitemap-nextjs-blog)
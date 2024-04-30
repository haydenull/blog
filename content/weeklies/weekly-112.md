---
date: 2024-04-27
updatedDate: 2024-04-28
year: 2024
week: 17
episode: 112
---

## iOS safari 自动放大页面

当字号小于 16px，输入框聚焦时，safari 会自动放大页面。这是 safari 为了让用户更容易看清楚输入框内容而做的优化。

解决方法：将字号设置为 16px 及以上。

## 如何防止中文输入法的回车误触发 input 的回车事件

使用 `isComposing` 属性来判断当前是组合输入状态，还是输入完成状态。

```tsx
<Input
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      onClickSearch()
    }
  }}
/>
```

## 优化 Vercel 部署的页面在国内的访问

[](https://twitter.com/ccbikai/status/1783821908737446100)

## 开源轻量录屏工具 QuickRecorder

https://github.com/lihaoyun6/QuickRecorder

![](https://pocket.haydenhayden.com/blog/202404272113507.png)

## 录屏+分享工具 Cap

https://github.com/CapSoftware/Cap

![](https://pocket.haydenhayden.com/blog/202404272120505.png?x-oss-process=image/resize,w_1000,m_lfit)

Loom 的开源替代品，支持录屏、分享。

## 资源监视器 btop

https://github.com/aristocratos/btop

![](https://pocket.haydenhayden.com/blog/202404272134745.png)

可以显示系统资源使用情况，例如 CPU、内存、磁盘、网络、执行进程等。

## VSCode 支持给 Tab 页设置标签

[](https://twitter.com/nextjs/status/1783508313113800930)

## 菜单栏日历 Calendr

https://github.com/pakerwreah/Calendr

![](https://pocket.haydenhayden.com/blog/202404272139335.png?x-oss-process=image/resize,w_300,m_lfit)

之前我们在 [Mac 配置指南](/blog/setup-mac#软件列表) 中推荐过一个日历软件 [Itsycal](https://www.mowglii.com/itsycal/)，Calendr 是一个类似的菜单栏日历软件。但是其半透明的设计更加符合 macOS 的设计风格。

## 我做了什么

### 博客优化

1. 增加搜索功能

利用 Google 搜索为博客增加搜索功能，不过一般情况下新增加的页面需要等待一周到一个月才能被 Google 收录。接下来需要优化博客在 Google 的搜索结果。

![](https://pocket.haydenhayden.com/blog/202404281506512.png?x-oss-process=image/resize,w_1000,m_lfit)

2. 使用 [Artitalk](https://artalk.js.org/) 为博客增加评论功能

![](https://pocket.haydenhayden.com/blog/202404281507576.png?x-oss-process=image/resize,w_1000,m_lfit)

3. 图片模糊加载

<video src="https://pocket.haydenhayden.com/blog/202404281512636.mp4" controls="controls" width="100%" height="auto"></video>

使用 Nextjs 的 [Image](https://nextjs.org/docs/app/api-reference/components/image) 组件，配合 [plaiceholder](https://github.com/joe-bell/plaiceholder) 实现图片模糊加载效果。

不过对于文章正文的图片，如果使用 plaiceholder 生成模糊图片，会导致页面加载速度变慢(这是因为需要 nodejs 在服务端处理，所以需要所有图片处理完成页面才能加载)。最终正文图片使用阿里云 OSS 的图片处理功能，生成模糊图片。
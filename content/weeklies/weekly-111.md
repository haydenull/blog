---
date: 2024-04-21
year: 2024
week: 16
episode: 111
---

## 优化 Vercel 部署的页面在国内的访问

[推荐一下 Vercel 加速节点](https://www.yt-blog.top/9952/)

> 将域名解析从 `cname.vercel.com` 改为 `vercel.cdn.yt-blog.top`
>
> 原理类似优选 IP

## Trancy 发布 iOS App

![](https://pocket.haydenhayden.com/blog/202404212008203.png?x-oss-process=image/resize,w_1000,m_lfit)

Trancy 在浏览器插件之外，还发布了 iOS App，在手机和平板上可以关注 YouTube 频道，搜索视频。

以前在手机端需要使用 safari 打开 YouTube 网页，然后使用 Trancy 浏览器插件，现在可以直接使用 App。而且 App 提供了口语练习、听力练习等功能。

## Web Document

https://github.com/wvit/web-document

可以将网页离线保存到本地的 Chrome 插件，同时提供搜索功能。

![](https://pocket.haydenhayden.com/blog/202404211837449.png?x-oss-process=image/resize,w_1000,m_lfit)

## Raycast Unblock

https://wibus-wee.github.io/raycast-unblock/

Raycast Unblock 是一个可以解锁 Raycast Pro 功能的插件，可以提供 AI Chat、翻译、云同步等功能。但他并不是破解 Raycast Pro，而是通过代理 Raycast 的请求，模拟 Pro 版本的功能。

## next-view-transitions

https://github.com/shuding/next-view-transitions

在 Next.js app router 中使用 CSS View Transitions API。

## CF Workers Status Page

https://github.com/eidam/cf-workers-status-page

使用 Cloudflare Workers 和 KV 实现的网站状态监控工具，支持多种通知方式如 Slack、Telegram。

![](https://pocket.haydenhayden.com/blog/202404212007683.png?x-oss-process=image/resize,w_1000,m_lfit)

## iOS 入门 Roadmap

[](https://twitter.com/imwsl90/status/1780454961517560239)

## 我做了什么

### 博客优化

1. 手机端菜单优化

菜单在手机端默认折叠，点击菜单后展开。

![](https://pocket.haydenhayden.com/blog/202404212018008.png?x-oss-process=image/resize,w_400,m_lfit)

2. 博客加速

将域名解析从 `cname.vercel.com` 改为 `vercel.cdn.yt-blog.top`，加速国内访问。目前测速结果显示国内访问速度从黄色变绿了。

![](https://pocket.haydenhayden.com/blog/202404212022669.png?x-oss-process=image/resize,w_1000,m_lfit)

测速工具：https://zhale.me/http/

3. 博客适配 Zeabur 部署

由于我这个项目在编译前需要打包字体文件，所以 Zeabur 默认的 Next.js 部署方式不适用。所以增加了一个 Dockerfile，用于在 Zeabur 上部署。

不过最终测试发现，Zeabur 部署的网站访问速度比 Vercel 慢，所以还是选择了 Vercel 部署。

https://github.com/haydenull/blog/blob/main/Dockerfile


### 完成一篇博客

完成 [Mac 配置指南](/blog/setup-mac)，介绍了 Mac 的一些配置和我常用的一些软件。

### 给业务代码加单测

这周尝试给业务代码加了一些单测，了解了如何 mock 模块，日期等。积累了一些单测的经验。后续可以总结一下。
---
date: 2024-06-01
year: 2024
week: 22
episode: 114
---

## 各种标点符号的英文表达

https://x.com/Egrammertipss/status/1795379534109536339

在 YouTube 上看英文技术视频时经常会遇到各种标点符号，这张图记录了各种标点符号的英文表达。

![](https://pocket.haydenhayden.com/blog/202406011501498.png?x-oss-process=image/resize,w_500,m_lfit)

## 如何在工作中做好技术积累

https://tech.meituan.com/2018/04/16/study-vs-work.html

这篇文章介绍了如何在普通的工作中做好技术积累，包括如何做规划、如何在项目中成长、如何积累架构师需要的能力等。

以下是一些笔记：
![](https://pocket.haydenhayden.com/blog/202406011516539.png?x-oss-process=image/resize,w_1000,m_lfit)

第一次从课本以外的地方看到 **「学而不思则罔，思而不学则殆」**，心境跟上学的时候完全不一样。工作这么些年，确实经常查资料 -> 修 bug -> 上线。总想着回头再深入了解，但是人总有惰性，往往就这样过去了。现在想想，这些都是很好的成长机会。

## Amber 可编译为脚本的高级语言

https://github.com/Ph0enixKM/Amber

Amber 是一个可编译为脚本的高级语言，拥有现代化的语法和特性，类型安全。

![](https://pocket.haydenhayden.com/blog/202406011540313.png)

## Magic UI

https://magicui.design/

一个 Landing Page 常用的动画组件库，基于 Tailwind CSS 和 Framer Motion。跟 [103 期周刊](./weekly-103#%E7%B1%BB%E4%BC%BC-shadcn-%E7%9A%84%E5%8A%A8%E7%94%BB%E5%BA%93-aceternity-ui) 提到的 Aceternity UI 类似。

完全开源，可以非常方便地自定义。

<video src="https://pocket.haydenhayden.com/blog/202406011600670.mp4" controls="controls" width="100%"></video>

## Remix 将与 React Router 合并

https://remix.run/blog/merging-remix-and-react-router

Remix v3 将会发布为 React Router v7。

Remix 一直以来是 React Router 之上的一层，从去年底开始 Remix 支持 Vite，同时提供了 SPA 模式。Remix 这一层变得越来越薄，所以团队决定将 Remix 和 React Router 合并。

![](https://pocket.haydenhayden.com/blog/202406011628887.png?x-oss-process=image/resize,w_1000,m_lfit)

## 自建音乐库方案

### 自建音乐库服务

[Navidrome](https://github.com/navidrome/navidrome) 是一个开源的音乐库服务端，支持多种音乐格式，支持多用户，支持多种播放器。

- 支持 Docker 部署
- 自己有多平台客户端
- 市面上支持 Navidrome 的客户端也很多
- 缺点需要占用机器空间，如果部署在 VPS 上需要考虑空间问题，推荐部署在 NAS 上

### 利用网盘

使用阿里云盘等网盘存储音乐，然后使用支持网盘的音乐播放器。

- 优点是不需要自己搭建服务端，门槛低
- 缺点是支持的客户端不太多，找到全平台支持且同时支持目标网盘的客户端比较困难
- 客户端推荐 [Ever Play](https://apps.apple.com/us/app/ever-play-hifi-music-player/id1202642773)
- 客户端推荐 [Listenify](https://apps.apple.com/hk/app/listenify/id6475892753)

### 利用现有的音乐软件

一些音乐软件支持自己上传，如网易云音乐、Apple Music。

使用这些平台有一定的数据风险，毕竟是第三方平台，服务可能随时停止，上传的音乐也可能有审查风险。但是这些平台的客户端体验相对较好，使用门槛低。

最终我还是选择了 YouTube Music，因为我已经有了 YouTube Premium，可以免费使用 YouTube Music，而且这种大平台相对风险小，至少停止服务前可以导出数据，另外 Youtube Music 据说支持上传 10 万首歌曲，量也足够大。

所以我日常使用 Spotify，spotify 缺少的音乐我会在 YouTube Music 上找，都没有的就自己上传。

## 我做了什么

### Agenda 日常迭代

停滞一个半月后，终于开始了 Agenda 的日常迭代，这次迭代主要是清理了积攒的一些 bug，同时增加了 [Deadline 功能支持](https://github.com/haydenull/logseq-plugin-agenda/releases/tag/v3.13.0)。

![](https://pocket.haydenhayden.com/blog/202406011656748.png?x-oss-process=image/resize,w_1000,m_lfit)
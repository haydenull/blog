---
title: 十五周刊 - 96
description: 2023 第 45 周周报
date: 2023-11-12T16:48:00+08:00
slug: weekly-96
year: 2023
week: 45
episode: 96
tags:
  - Weekly
---



## Devv Search：面向开发者的 AI 搜索引擎

https://devv.ai/

![](https://pocket.haydenhayden.com/blog/202311121952915.png)

Devv Search 旨在为中文开发者提供更精确、更快速的代码搜索体验。针对「编程 + 中文」的场景做了很多优化。

AI 会依据开发者常用的文档作为数据库回答开发者的问题，并给出相关文档链接。

## LobeChat：一个 UI 非常棒的开源 ChatGPT 应用

https://github.com/lobehub/lobe-chat

![](https://pocket.haydenhayden.com/blog/202311122004736.png)

这个项目的 UI 和交互真的很棒，第一眼感觉都不像是开源项目，并且有插件 SDK，支持插件系统，更新也很活跃，使用 Vercel 一键部署也很快，值得一试。

另外建议可以尝试下 cloudflare 的 [ai gateway](https://developers.cloudflare.com/ai-gateway/) 服务，方便管理 ai 接口请求，他支持：

- Cache, 在调试接口的时候这个很好用，相同的问题不会多次消耗 token
- 访问频率限制
- 数据分析
- 实时日志

不过 ai gateway 不支持自定义域名，可以使用 cloudflare worker 代理一下。

## vite define 与 env 的区别

- vite define 用于定义全局变量，env 用于定义环境变量
- env 定义的变量会追加到 nodejs `process.env` 上， 如果变量以 `VITE_` 开头，则前端代码可以通过 `import.meta.env.VITE_` 获取
- define 定义的变量在编译时会作静态替换，**并不是挂载到 `window` 对象上**

## 系统代理、 Tun 代理与 Vpn 代理的区别

[](https://www.youtube.com/watch?v=qItL005LUik)

[](https://www.youtube.com/watch?v=wAxOjL_gDzk)

![](https://pocket.haydenhayden.com/blog/202311121925796.png)

### 1. 系统代理

常见的有 http 代理，socks5 代理。位于应用层。

缺点是需要软件主动支持，而且无法代理 UDP 请求。

`ping` 命令位于网络层，所以也无法代理。

### 2. Tun 代理

位于**网络层**，原理是创建一张虚拟网卡，改写系统路由表，将所有请求转发到虚拟网卡上。这样就能接管绝大多数系统流量，不需要软件支持。

### 3. Vpn 代理

主流 vpn 在**网络层或数据链路层**，所以几乎可以接管系统所有流量。

## S13 享受比赛

![](https://pocket.haydenhayden.com/blog/202311121943701.png)

周末看比赛的时候想到非中韩地区的观众其实挺幸福的，他们更少地在意输赢，只要比赛精彩就好。周六看了 WBG 和 BLG 的比赛，很精彩看得也开心，看 LPL 和其他赛区的比赛我也应该丢掉 LPL 必须赢的观点，享受比赛、享受生活。

## 我做了什么

### Agenda 发布 plugin 版本

在原有 plugin 版本的基础上新增一个工具栏 icon，点击新 icon 进入 Agenda3。

umami 要求日志上传必须有合法的 hostname, 而插件模式 location 是 `file://xxx`, 所以 hostname 是空字符串。

目前的解法是使用自定义事件，然后手动设置 hostname。

禁用 umami 的自动统计。

```html
<script
  async
  src="https://umami.com/script.js"
  data-website-id="UMAMI_WEBSITE_ID"
  data-auto-track="false"
></script>
```

增加自定义 hostname

```ts
export const track = (name: string, data?: Record<string, number | string>) => {
  if (!umami) return console.error("umami is not defined");
  if (import.meta.env.VITE_MODE === "plugin") {
    // @ts-expect-error type correct
    return umami.track(params => ({
      ...params,
      hostname: "plugin",
      name,
      data,
    }));
  }
  return umami.track(name, data);
};
```

### Agenda 支持 Plan 页面

[Changelog](https://github.com/haydenull/logseq-plugin-agenda/releases/tag/v3.3.0)

![](https://pocket.haydenhayden.com/blog/202311121731907.png?x-oss-process=image/resize,w_1000,m_lfit)

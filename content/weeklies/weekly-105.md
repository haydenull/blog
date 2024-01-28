---
title: 十五周刊 - 105
description: 2024 第 4 周周报
date: 2024-01-28
slug: weekly-105
cover: https://pocket.haydenhayden.com/blog/202401281556821.JPG
---

## 支持类 IDE 语法提示的文档工具 vdoc

[](https://x.com/novoreorx/status/1748537647746687146?s=20)

它背后使用了 [TypeScript Twoslash](https://www.typescriptlang.org/dev/twoslash/)，可以对文档中的代码片段进行预处理，提供类似 IDE 的语法提示，错误提示等功能。

![](https://pocket.haydenhayden.com/blog/202401281133503.png)

## Heptabase 101 官方引导教程

[](https://www.youtube.com/watch?v=HgvR2QkfwG0)

目前教程已经出到 102 了。Heptabase 是一个主打可视化白板的笔记工具，白板在一些特定的场景下确实很有用。比如我目前的目标管理以及 Review 系统就是依托白板实现的。

白板可以从更宏观的视角总览大量信息，并且可以方便地在这些信息间建立联系。

这个视频让我明确了 Heptabase 不适合我，它更适合有明确的主题，然后围绕一个个主题去记笔记，建立联系的人。我更喜欢 Logseq 这种随意无压记录的工具。如果后期需要针对某个主题做总结，我更倾向输出成系列的文章。

## 可视化定制浏览器滚动条
https://github.com/henripar/scrollbar

![](https://pocket.haydenhayden.com/blog/202401281148533.png)

通过可视化编辑器调整滚动条样式，实时生成 css 代码，非常方便。

## Cron 更名 Notion Calendar

![](https://pocket.haydenhayden.com/blog/202401281150600.png)

本周 Notion Calendar 发布，其实这并不是新产品。很早之前 Notion 已经收购了 Cron 日历工具。Notion Calendar 的发布只不是是正式改了品牌名以及 Logo，而且这个 Logo 还变丑了。

这个工具还挺神奇的，它自己的服务非常轻量。日历数据来源只有两个：

- Google Calendar
- Notion Database

Notion Calendar 的功能是将这两个来源的数据聚合放到一张日历上。然后给 Google Calendar 日历事件增加一个属性，可以让用户指定这个事件关联的 Notion 链接。

而对于 Notion Database 来源的日历，其实就是 Notion Database Calendar View 的一个更好看更专业的版本而已。

感觉它跟 Notion 的整合应该再深入一点，比如 Notion 里任意一个 block 指定日期就可以显示到 Notion Calendar 上。

Logseq Agenda 插件其实一直做的就是这件事，不过受限于 Logseq 没有云端版本，只能在一台设备上实现这种效果。

鉴于 Notion Calendar 操作体验非常好，我用它替代了 Google Calendar 客户端。日程相关的事情我都用这个工具，具体的工作任务继续用 Logseq 管理。

## AiHubMix
https://orisound.cn/

![](https://pocket.haydenhayden.com/blog/202401281205721.png)

更方便更便宜的 OpenAI API 第三方平台。

OpenAI 对付费银行卡以及网络环境有较高的要求，我之前使用的是 [NobePay](https://nobepay.com/) 虚拟信用卡，这种卡有开卡费和手续费。我当时开的卡是一年有效期，用了半年多，平台通知部分号段作废，我的卡也在这个范围内，按通知我需要删卡再建一个其他号段的卡，但是平台对于开卡超过 180 天的没有任何补偿，我重新开一张卡，需要重新扣开卡费。

AiHubMix 可以按需充值，支持多个平台的 API。不过由于由于这个并不是大公司的产品，是否安全还是有待考证的。

## 使用 React Query 管理异步状态

[](https://www.youtube.com/watch?v=vxkbf5QMA2g)

https://tkdodo.eu/blog/react-query-as-a-state-manager

> [!important]
> React Query 并不是一个数据请求库，它是一个异步状态管理库。

之前我一直对 React Query 的理解有问题，我以为它是更强大的 ahooks useRequest，就是集成了缓存，重试，轮询等功能的数据请求库。其实它的定位是一个异步状态管理库，它可以管理任何异步状态，不仅仅是数据请求。

```js{2}
const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetchTodos(page),
})
```

React Query 要求每个异步状态都有一个唯一的 key，然后将数据以 key 为索引存储在内部的缓存中。当 key 不变时，React Query 会直接从缓存中读取数据，而不会重新发起请求。

这个行为是全局的，也就是说当我们在 A 组件中发起了一个请求，然后在 B 组件中也发起了同样的 key 的请求，B 组件会直接从缓存中读取数据，而不会重新发起请求。

想想这个情景是不是跟我们在 A 组件发起请求，然后使用 jotai 等状态管理库全局保存数据，然后在 B 组件中直接读取数据的行为很像。

**所以 React Query 其实是一个全局状态管理库，但它管理的是异步状态。**

我们的程序有两部分状态组成：
- 异步状态：例如从服务端获取数据
- 同步状态：例如当前是否是暗色模式，侧边栏是是否是展开状态

React Query 可以在异步状态方面替代 jotai redux 等状态管理库，并且可以跟这些状态管理库共存。也就是说我们可以在 React Query 中管理异步状态，然后使用 jotai 等状态管理库管理同步状态。

## 我做了什么

### 完成 Daily Review 工具

![](https://pocket.haydenhayden.com/blog/202401281623802.png)

周六花了半天时间完成了 [Daily Review 工具](https://toolkit.haydenhayden.com/review)，这个工具可以帮我快速分析每天的日志，生成分类统计图表。

以前每天统计日志都需要花四五分钟，还可能会算错，现在只需要 10 秒不到就可以搞定。

### 评审需求前结合代码看文档

吸取上次需求延期的教训，这次我在评审需求前先结合代码看了文档，提前将问题暴露出来，提高了评审效率。也对排期有了更准确的预估。

以后要保持这个习惯，顺便也在组内推广。

### 跑通 logseq 开发环境

周一的时候花了一个多小时跑通了 logseq 的开发环境，这次意想不到的顺利，只遇到一个 `node-abi` 无法找到最新的 electron abi 版本的问题，通过升级 `node-abi` 解决。

```bash
yarn upgrade node-abi@latest
```

升级后还需要去 static 目录重新 install 一下。

```bash
cd static && yarn install
```

![](https://pocket.haydenhayden.com/blog/202401281632687.png)
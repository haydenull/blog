---
title: 十五周刊 - 107
description: 2024 第 9 周周报
date: 2024-03-02
slug: weekly-107
---

## WXT: 开发浏览器插件的框架

https://github.com/wxt-dev/wxt

WXT 是一个开发浏览器插件的框架，用于开发 Chrome、Firefox、Edge、Safari 等浏览器的插件。

特点：
- **支持热更新**
- **基于 Vite，支持多种前端框架：React、Vue、Svelte 等**
- **自动发布**：提供 `submit` 命令，发布插件到应用商店
- 支持 TypeScript
- 支持 Manifest V2 和 V3

## Clean Architecture in React: React 的 Clean 架构

原文：https://alexkondov.com/full-stack-tao-clean-architecture-react/
译文：https://sorrycc.com/react-clean-architecture/

作者从一个基础的 React 页面开始，逐步根据不断变化的需求扩展代码，向我们展示了如何写出 Clean 的 React 代码，同时能够满足不断变化的需求。

我的一些摘录：
- 保持 UI 的纯粹性，纯函数
- React 组件的工作是渲染 UI，不应该关心如何获取数据，如何格式化数据，这些工作应该放到 hook 中
- 数据请求放到专门的文件中
- 使用 zod 做接口数据校验
- 每个嵌套的条件语句都应该考虑拆组件
- 硬编码值应该取一个有含义的名字

## Netflix 推出测试框架 SafeTest

https://github.com/kolodny/safetest

[Introducing SafeTest: A Novel Approach to Front End Testing](https://netflixtechblog.com/introducing-safetest-a-novel-approach-to-front-end-testing-37f9f88c152d)

[](https://www.youtube.com/watch?v=Ae1Gk03S0Mg)

SafeTest 是一个包含单元测试与端到端测试的测试框架，集成了 Jest/Vitest、Playwright。支持 React、Vue、Svelte 等前端框架。

## Github Copilot Enterprise 推出

[](https://www.youtube.com/watch?v=vUX5u_4B2AM)

整体看下来像是将 VSCode Copilot Chat 的功能带到了 Github 网页端，可以直接在网页询问关于仓库代码的问题。

![](https://pocket.haydenhayden.com/blog/202403022109986.png)

## Vercel AI SDK 3.0 版本支持渐进式 UI

[Introducing AI SDK 3.0 with Generative UI support](https://vercel.com/blog/ai-sdk-3-generative-ui)

目前大模型应用的产品有一个很大的限制都是返回纯文本，最常见的是返回 markdown。这个限制导致了很多产品的交互体验都是非常差的。

Vercel AI SDK 3.0 版本支持渐进式 UI，即可以返回 RSC（React Server Components）。

![](https://pocket.haydenhayden.com/blog/202403022120705.png)

上图截字 Vercel 的文档，可以看到对于天气的提问，SDK 直接返回了一个天气的组件。并且这个组件也是有 loading 状态的。并且这个组件是可以直接在网页上交互的。感觉这倒是一个非常好的 RSC 应用场景。

可以去这里测试一下效果：https://sdk.vercel.ai/demo。

也可以看这个 twitter：

[](https://twitter.com/nicoalbanese10/status/1763645666159411599)

## Node.js 即将迎来新官网

看起来是部署在 Vercel 上的，样式比较现代。

https://nodejs-org-git-meta-remove-legacy-website-code-openjs.vercel.app/en

![](https://pocket.haydenhayden.com/blog/202403022131772.png)

## JSR (类似 npm) 进入 public beta 阶段

https://jsr.io/

![](https://pocket.haydenhayden.com/blog/202403022136269.png)

- 只支持 ESM
- 原生支持 TypeScript：**自动生成 API 文档，自动生成 `.d.ts` 文件**
- npm 超集，可配合任何包管理器使用，例如 npm、pnpm、yarn
- 支持多种运行时：Node.js、Deno、Bun、Cloudflare Worker

## Pingora: 一个 Rust 实现的 Nginx

[将 Cloudflare 连接到互联网的代理——Pingora 的构建方式](https://blog.cloudflare.com/zh-cn/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet-zh-cn/)

## VSCode 1.87 发布，支持中文语音

[Release Note](https://code.visualstudio.com/updates/v1_87)

1. 编辑器支持语言输入（以后可以用语音输入写文档再修订）
2. VS Code Speech 插件支持多语言，包括中文。这意味着可以用中文输入 Copilot Chat 的 Prompt，大大减轻了输入的成本。

## fubukicss-tool 复制导出 figma css

https://chromewebstore.google.com/detail/fubukicss-tool/behnfolmiinfhphfdolomedncdnogcim

比较特别的是支持直接导出 Tailwind 和 Uno 代码。

[](https://twitter.com/CoooolXyh/status/1763089098901012660)

## 同时查看网页在不同尺寸屏幕上的效果

https://responsively.app/download

![](https://pocket.haydenhayden.com/blog/202403022208534.png)

## 我做了什么

### 坚持每天看小猪佩奇

![](https://pocket.haydenhayden.com/blog/202403022211538.png)

单词和看 Peppa Pig 打卡，这两个是本周唯二坚持下来的习惯。过年后的状态还没有完全调整过来，这周的工作上的事情又比较多，所以其他的事情都没有做。

我是直接从第 11 集开始看的，感觉猜台词的效果比较好，确实学到了不少。坚持到 52 集的话应该能达到 up 说的效果吧。

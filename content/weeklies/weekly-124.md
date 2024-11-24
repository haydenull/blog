---
date: 2024-11-24
year: 2024
week: 47
episode: 124
---

## Windsurf IDE 发布

https://codeium.com/windsurf

![](https://pocket.haydenhayden.com/blog/202411241639735.png)

Codeium 出品的 IDE，与 Cursor 一样是一款基于 VSCode 的 AI 编辑器，不过它更偏向于流式工作模式。根据对话一步一步推算如何修改项目，并且遇到问题时自动修正。在这一点上体验比 Cursor 更好。另外它的月费只需要 10美元，只有 Cursor 的一半。

但目前还不支持输入图片，另外现阶段 AI 对项目下多个文件的修改，让我没有安全感，所以我更习惯 Cursor 的辅助模式，尤其是 [tabtab](https://docs.cursor.com/tab/overview) 预测下一个修改位置，非常爽。总体来说我更喜欢 Cursor，但是也会保持对 Windsurf 的关注，期待它尽快支持图片输入，支持修改位置的预测。

一个在线工具，提供常见前端框架的语法对比。

## CSS 终于有了 Logo

https://nerdy.dev/a-community-css-logo

![](https://pocket.haydenhayden.com/blog/202411241646788.png?x-oss-process=image/resize,w_300,m_lfit)

## Tanstack Start beta 发布

https://tanstack.com/start/latest

![](https://pocket.haydenhayden.com/blog/202411241659321.png)

Tanstack Start 是 Tanstack 发布的基于 Tanstack Router、Vinix 以及 Vite 的全栈框架。支持 SSR、Server Functions。目前处于 beta 阶段。没想到在 Next.js 和 Remix 之后还会有这么一款全栈框架，真是太卷了。

## drizzle-seed 发布

https://orm.drizzle.team/docs/seed-overview

Drizzle 是一个 ORM，可以用来操作数据库，它的目标是让开发者更轻松地操作数据库，而不必关心底层的实现细节。但与 Prisma 相比一直缺少 seed 功能，drizzle-seed 就是为了解决这个问题，它可以让开发者更轻松地初始化数据库。

## Component Party

https://component-party.dev

![](https://pocket.haydenhayden.com/blog/202411241642484.png)

## How to Pick a JS Package

https://podwise.ai/dashboard/episodes/2318049

- 使用 [Socket.dev](https://socket.dev/) 而不是 npm 来进行包搜索以及查看各项指标
- 利用 Perplexity.ai 作为现代 AI 搜索引擎，以查找相关且最新的包
- 检查 GitHub Issues，以了解社区反馈、识别潜在问题和评估维护活跃度
- 检查包的 `package.json` 以了解其依赖和潜在复杂性
- 使用 Bundlephobia 调查包的大小，以评估其对应用程序性能的影响
- 仔细审查文档并在将其集成到项目之前单独测试该包
- 探索 GitHub 上使用该包的现有项目，以查看实际应用和用法
- 将是否有 TypeScript 类型作为可维护性的指标之一
- 如果可能的话，尽可能使用自己编写的小方法替代第三方依赖

> [!tip]
> 除了 Socket.dev, [npm package info](https://npmpackage.info) 也可以用来查看包的各种信息。

## Essential tsconfig.json options you should use

https://tduyng.com/blog/tsconfig-options-you-should-use/

这篇文章详细介绍了 TypeScript 中的 tsconfig.json 文件，包括其作用、推荐的最佳实践设置及各个设置的具体含义和用途。

## Stop Passing Setters Down the Components Tree

https://matanbobi.dev/posts/stop-passing-setter-functions-to-components

这篇文章主要讨论了在 React 项目中传递 useState 的 setter 函数作为 props 的问题，以及如何解决这种可能导致抽象泄漏的情况。

> An abstraction leak occurs when a component knows too much about the internal implementation of another component.

作者提到组件不应该了解其他组件的内部实现细节，例如将 setter 函数作为 props 传递给子组件，这样子组件就假定了父组件一定使用了 useState，且 state 的数据结构也被固定了，这样就造成了两个组件的高度耦合，子组件复用性降低，父组件的迭代也很容易影响子组件。

## Essential Typescript for React

https://www.jacobparis.com/content/react-ts

这篇文章介绍了使用 TypeScript 在应用开发场景下的 React 项目时一些常用的类型编写的最佳实践。

## Tana 笔记软件测评

文字版：https://mp.weixin.qq.com/s/t-kvwIBbtVSihRAKCQCx_w

[](https://www.youtube.com/watch?v=Jn89MAdg-RY)

---
title: 十五周刊 - 95
description: 2023 第 44 周周报
date: 2023-11-05T19:00:00+08:00
slug: weekly-95
tags:
  - Weekly
---



## Remix 发布 vite 插件

[Remix ❤️ Vite](https://remix.run/blog/remix-heart-vite)

Remix 新的插件支持使用 vite 作为构建工具，大大增加了 HMR 的体验。

而 Next.js 目前仍然是用 webpack 构建，很多用户也有类似的呼声，希望 Next.js 也能支持 vite。

## MoonBit 发布《现代编程思想》公开课

https://www.moonbitlang.cn/course/

这门课程将同时涉及函数式编程及面向对象编程两种思想，对于前端同学尤其是使用 React 的同学来说，函数式的思想有必要了解一下，推荐看一下。

## 微信更新

iOS 端支持设置将输入法的回车键设置为换行符。

![](https://pocket.haydenhayden.com/blog/202311051758355.jpeg?x-oss-process=image/resize,w_300,m_lfit)

Mac 端支持使用默认浏览器替代微信内置浏览器。

![](https://pocket.haydenhayden.com/blog/202311051803755.png?x-oss-process=image/resize,w_500,m_lfit)

## 由 name 引发的 Astro View Transition 失败

最近博客替换到了 Astro 的一个 blog 模板 [Astro Paper](https://github.com/satnaing/astro-paper)。

发现当文章标题包含中文时会出现 Astro View Transition 失败的问题。翻了下代码，原作者使用 `slugifyStr(title)` 作为 transition:name:

```jsx
<h1 transition:name={slugifyStr(title)} class="post-title">
  {title}
</h1>
```

而 `slugifyStr` 函数是来自 [github-slugger](https://github.com/Flet/github-slugger), 这个包的总体目标是尽可能地模拟 GitHub 处理生成 Markdown 标题锚点的方式。

```js
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

slugger.slug("foo");
// returns 'foo'

slugger.slug("foo");
// returns 'foo-1'

slugger.slug("bar");
// returns 'bar'

slugger.slug("foo");
// returns 'foo-2'

slugger.slug("Привет non-latin 你好");
// returns 'привет-non-latin-你好'

slugger.slug("😄 emoji");
// returns '-emoji'

slugger.reset();

slugger.slug("foo");
// returns 'foo'
```

可以看到中文会被保留下来，所以当标题包含中文时，transition:name 就会包含中文，最终生成 html 时中文被 encode 变成一堆含有 % 的字符，而这会导致 Astro View Transition 失败。

最终的解决方案是使用 [pinyin](https://github.com/zh-lx/pinyin-pro) 将汉字转为对应的拼音。

```ts
export const convertToPinyin = (str: string) => {
  return pinyin(str, { toneType: "none", nonZh: "consecutive" });
};
```

另外需要注意标题也不能由数字开头，最好符合 html 规范:

> 以字母开头，其后跟随数字、字母、下划线或中划线

## Clash 生态大量仓库删库

包括 Clash Core 以及 Clash For Windows 等 UI 库都删除了仓库，目前并不影响使用，但是这意味着以后无法获得更新，所以从长远看，有必要更换软件。

## React 中使用三元运算符与 `&&` 的区别

在 v2ex 看到一篇帖子 [最近在读 React 官方文档，读到「在渲染树中保留状态」这块了。文档提到，有两个示例程序是不同的，但没讲为什么。果然网上有一波人跟我有一模一样的困惑](https://www.v2ex.com/t/988602)

里边讨论的是官方文档 [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state#option-1-rendering-a-component-in-different-positions) 关于在渲染树中保留组件状态的部分，其中有两个示例：

示例 1：

```jsx
return (
  <div>
    {isPlayerA ? <Counter person="Taylor" /> : <Counter person="Sarah" />}
    <button
      onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}
    >
      Next player!
    </button>
  </div>
);
```

示例 2：

```jsx
return (
  <div>
    {isPlayerA && <Counter person="Taylor" />}
    {!isPlayerA && <Counter person="Sarah" />}
    <button
      onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}
    >
      Next player!
    </button>
  </div>
);
```

示例 1 会保留 Counter 组件的状态，而示例 2 则不会。

原因是示例 1 使用 三元运算符，`Counter` 组件无论如何在渲染书树中只有一个，而示例 2 使用 && 运算符，这意味着在渲染树中有一个 `false` 以及一个 `Counter` 组件。

当 `isPlayerA` 为 `true` 时：

```jsx
return (
  <div>
    <Counter person="Taylor" />
    {false}
    <button
      onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}
    >
      Next player!
    </button>
  </div>
);
```

当 `isPlayerA` 为 `false` 时：

```jsx
return (
  <div>
    {false}
    <Counter person="Sarah" />
    <button
      onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}
    >
      Next player!
    </button>
  </div>
);
```

可以看到两次渲染 `Counter` 组件位置不同，所以导致了组件状态无法保留。

文档里的总结写得很好:

> - React keeps state for as long as the same component is rendered at the same position.
> - **State is not kept in JSX tags. It’s associated with the tree position in which you put that JSX.**
> - You can force a subtree to reset its state by giving it a different key.
> - Don’t nest component definitions, or you’ll reset state by accident.

第二点尤其重要：组件的状态与其在 JSX 的位置有关，而非保存在标签内。

## 我做了什么

### 开通了爱发电赞助渠道

[爱发电](https://afdian.net/a/haydenull)支持支付宝和微信的付款方式，对国内用户更加友好。与 buymeacoffee 不同的是它的赞助方案都是订阅制。不过可以再赞助后取消订阅达到一次性付费的效果。

<iframe src="https://afdian.net/leaflet?slug=haydenull" width="100%" scrolling="no" height="200" frameborder="0"></iframe>

### Agenda3 从爱发电获得补能

爱发电的第一笔赞助来自 Agenda3 的内测用户。

Agenda3 本周主要更新如下：

- 页面聚焦时自动刷新数据
- 支持只显示循环任务周期的第一个任务
- 支持在日历中隐藏已完成任务
- 优化任务标题的显示

收到几个用户的评价挺开心的，当初直接 3.0 大版本就是因为 2 过于臃肿，目前的工作到达了一部分目的。
![](https://pocket.haydenhayden.com/blog/202311051736750.jpeg)

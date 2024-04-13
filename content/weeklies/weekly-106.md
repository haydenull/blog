---
title: 十五周刊 - 106
description: 2024 第 5 周周报
date: 2024-02-03
slug: weekly-106
year: 2024
week: 5
episode: 106
---

## Tailwind 配色工具

https://www.tints.dev/

这个配色工具的独特之处是，可以选定一个颜色，然后自动生成 50 到 950 的 tailwind 配色。并且提供了 Tailwind 配置代码以及 API。

而且贴心地提供了预览功能。

![](https://pocket.haydenhayden.com/blog/202402031753606.png)

## `useTailwindBreakpoint` Hook，用于在 React 中使用 Tailwind 断点

[](https://x.com/buildWithKris/status/1753441393446449178?s=20)

Tailwind 使用 media query 来定义断点，但是这是纯 CSS 的，如果想在不同的断点下执行不同的逻辑，就需要在 JS 中监听断点变化。

这个 Hook 会读取 Tailwind 的断点配置，并且在窗口 resize 时触发回调。

```jsx
useTailwindBreakpoint({
  onBreakpointChange: (breakpoint) => {
    console.log('Breakpoint changed:', breakpoint)
  }
})
```

## 如何一个半月从不怎么会日语，到可以流利地用日语描述生活

[](https://x.com/taiyou_zai/status/1661872753312690176?s=20)

1. 不学单词语法不做题
2. 每天嘴巴说的时间占 2/3 以上
3. 重点纠正发音和语音语调
4. 严格记录每天从吃饭到睡觉的日程，记录各类日语学习的时间长度
5. 每周复盘并制定下一周的学习时间
6. **只学和自己生活相关的日语**

重点培养几个习惯：
1. 每天用聊天软件找日本人聊一个小时
2. 影子跟读+静听
3. 每天录5分钟自言自语视频

## SEO 测试工具

[](https://x.com/s1ntone/status/1753227232263258427?s=20)

## `git rebase --onto` 的使用

[](https://x.com/alswl/status/1753269221872771463?s=20)

![](https://pocket.haydenhayden.com/blog/202402031822623.png)

`git rebase --onto` 也是我经常用的一个命令，但是跟这个 twitter 却不太一样。

我们是每天提交一个 MR，也就是每天都需要一次 Code Review，所以可能发生 `feat/a` 分支的 MR 还没有 review 完毕，我这边需要接着开发 `feat/b`, 等到 `feat/a` 完成 review 并 merge 后，因为 MR 会 squash commit，所以此时 `feat/b` 就会与 `master` 冲突，这时就需要 `git rebase --onto master feat/a feat/b` 来将 `feat/b` 的 commit 里基于 `feat/a` 的 commit 移除，最后再 `git rebase master` 这样 `feat/b` 就会基于 `master` 且没有冲突。

## AI 编程的一些感受

[](https://x.com/llennchan2003/status/1752808872895799440?s=20)

比较同意这条推的观点，也跟我在 [2023 年度回顾](/blog/review-yearly-2023) 的感受类似。

> **把它当作结对编程的伙伴，不断的和它交流，让它帮你写代码，然后你再去 review**，这样的效率是真的高。
>
> 当然这里的效率提高并不是节省时间，因为我们有写 Prompt 的成本，Review 代码的成本，所以实际下来可能并没有节省很多时间，**但是这个过程中，释放了我们的大脑，节省了精力，让工作的幸福感提升了很多。**

在这再立个 flag，2024 第一季度在组内做一个使用 Github Copilot 的经验分享。

## WEB 实现 scroll restoration

Web 移动端应用有一个常见的场景：

一个上推加载的列表，用户翻页几次后，点击某个列表项进入详情页，然后返回列表页时，预期列表页的滚动位置应该是之前的位置。

要做到这个效果，需要达到两个目标：

1. 记录滚动位置（如果不是自定义容器，那么浏览器应该自带了这个功能，这里我们只讨论自定义滚动容器的情况）
2. 记录列表数据

使用 `React Query` 管理异步数据，可以天然记录列表数据，在回到页面时 `React Query` 可以一次性**同步吐出多页**数据，那么唯一需要解决的问题是记录容器滚动位置。

使用 [use-scroll-restoration](https://github.com/wildcatco/use-scroll-restoration) 可以解决这个滚动位置恢复的问题。

## Cubox 推出 AI 助手

![](https://pocket.haydenhayden.com/blog/202402031850332.png)

国行价格 198 年费比国际服便宜很多，可以针对文章进行问答，但每个月有 600 条数量限制。另外国际服的自定义 OpenAI Key 的 AI 助手功能似乎下线了，比较遗憾。


## 我做了什么

### 创建 Notion 项目管理模板

最近在考虑将项目管理从 Logseq 迁移到 Notion，起因是 Logseq 虽然可以用各种属性和查询来做项目管理，但是操作起来还是不太方便，而且没有不是云端软件，所以在站会等场景查询不太方便。

最终基于官方的任务管理模板，增加了一个项目排期表，实现了项目排期管理。唯一美中不足的是，在 Notion Calendar 中显示的条目，只有一个名称，没有属性，所以无法直接在日历中看到排期对应的项目。

![](https://pocket.haydenhayden.com/blog/202402051447745.png)

![](https://pocket.haydenhayden.com/blog/202402051450495.png)

### 重构物理机管理系统及 CLI 工具

原先的管理系统有三个端：
- cli
- 网页端（umi）
- 服务端（Nest.js）

这次重构后，使用 Next.js 实现网页端与服务端，cli 直接使用 Next.js 提供的接口。整个项目的代码量减少了很多，而且 Next.js 的开发体验非常好，开发速度也快了很多。

### 改变英语学习方法，开始影子跟读

之前一年多的学习精力主要放在背单词上，看视频看书这样的输入比较随缘，所以对于听力和口语的提升并不明显。

感觉也要到一个平台期了，所以决定改变学习方法，开始做影子跟读，每天跟读 30 分钟。今年的目标是能够脱离字幕听懂技术视频，且能用英语描述日常生活和技术问题。
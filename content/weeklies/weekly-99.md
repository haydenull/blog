---
title: 十五周刊 - 99
description: 2023 第 48 周周报
date: 2023-12-03T17:54:00+08:00
slug: weekly-99
tags:
  - Weekly
  - Plugin
  - Tools
---



## Chrome 及 VSCode 插件推荐

本周看 anthony 的视频，发现了一些好用的插件。他本人有一个仓库记录了自己的一些常用工具 [antfu/use](https://github.com/antfu/use)。这里我挑选了一些我觉得好用的插件。

### Chrome

- [Span Tree](https://chromewebstore.google.com/detail/gcjikeldobhnaglcoaejmdlmbienoocg) 给 Gitlab 网页版增加目录树及暗色模式（我自己的推荐）。
- [Refined GitHub](https://chromewebstore.google.com/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf) 针对 GitHub 网页做了很多优化。
- [File Icon for GitHub and GitLab](https://chromewebstore.google.com/detail/file-icons-for-github-and/ficfmibkjjnpogdcfhfokmihanoldbfe) 为 GitHub 和 GitLab 网页添加文件图标。

![](https://pocket.haydenhayden.com/blog/202312031802796.png?x-oss-process=image/resize,w_1000,m_lfit)

图片中的文件图标是 File Icon for GitHub and GitLab 插件添加的，文件更新日期的颜色是 Refined GitHub 插件添加的。

### VSCode

- [vscode-icons-carbon](https://github.com/antfu/vscode-icons-carbon)

VSCode 有两类图标插件，一类是 `File Icon Theme`，这个用来控制文件的图标，另一类是 `Product Icon Theme`，这个用来控制 VSCode 的图标。这个插件是 `Product Icon Theme`，可以将 VSCode 的图标变成 Carbon 风格。

![](https://pocket.haydenhayden.com/blog/202312031808774.png?x-oss-process=image/resize,w_1000,m_lfit)

上图中的 icon 就是经过这个插件处理后的。

## 录屏工具 Focusee

https://gemoo.com/focusee/

可以理解为 [screen studio](https://www.screen.studio/) 的竞品，根据鼠标点击自动添加缩放动画的录屏工具。

相比 screen studio，Focusee 的优点是：

- 同时支持 Windows 和 Mac
- 价格更低
- 有免费版
- 支持云空间，可以将录制的视频自上传到云空间，方便分享

我的这个[视频](https://www.bilibili.com/video/BV1yG411i7d9)就是用 Focusee 录制的。

最近他们正在做活动，原套餐都是大版本买断，但是 12 月 31 日前购买任意套餐，可获得终身免费升级权益。相当于买一次就可以永久使用。

![](https://pocket.haydenhayden.com/blog/202312031925268.png?x-oss-process=image/resize,w_1000,m_lfit)

## VSCode 使用多个 github 账号

公司提供了支持 copilot 的 github 账号，但是我平时使用的是自己的 github 账号，所以需要在 VSCode 中同时使用两个 github 账号。这个 [issue](https://github.com/microsoft/vscode/issues/127967) 里有记录一些 hack 的方法。大致流程是：

1. 退出当前登录的账号
2. 重新打开 VSCode，copilot 会提示登录，此时登录公司 github 账号
3. 点击设置中的登录以启动同步，登录另一个 github 账号（注意先在浏览器里切换到自己的 github 账号）

经过测试确实能让两个账号同时使用，但是有一个问题，就是重新启动 VSCode 后，copilot 会自动使用同步用的账号登录，需要再次操作一遍上述流程，比较麻烦。

最终我选择使用微软账号同步 VSCode 设置，等 VSCode 支持多账号登录后再切换回来。

## 我做了什么

### 录制 Agenda3 基础介绍视频

- YouTube：https://www.youtube.com/watch?v=thR9nI6d6p4
- Bilibili：https://www.bilibili.com/video/BV1yG411i7d9

录制使用 Focusee，体验很不错，自动添加的缩放动效给后期剪辑省了很多工作量，配合自带的鼠标特效以及 spotlight 特别适合演示教程。

Focusee 导出视频后，导入到剪映，用自动字幕功能生成中文字幕 srt 文件。

上传到 YouTube 时，导入中文字幕 srt 后，可以再选择添加其他语言的字幕，自带 Google 翻译，可以直接翻译成英文，然后再手动校对一下。

![](https://pocket.haydenhayden.com/blog/202312031949577.png?x-oss-process=image/resize,w_1000,m_lfit)

> 录下自己的声音才发现原来自己说话的时候带了那么多语气词，以后需要有意识地慢慢纠正。

### Excalidraw 插件新增 slides 模式

![](https://pocket.haydenhayden.com/blog/202312031953019.gif)

录制 Agenda 视频的时候感觉专门写一个 PPT 太麻烦了，就想到了 Excalidraw+ 的 Presentation 模式，感觉很适合做这种简单的演示。

花了点时间研究了下给 Excalidraw 插件新增了 slides 模式，可以直接在画布上写 slides（frame），然后通过自定义插件实现预览以及切换。

配合 Excalidraw 的 [Presentation bundle](https://libraries.excalidraw.com/?theme=light&sort=default) 模板，可以快速写出漂亮的 slides。

![](https://pocket.haydenhayden.com/blog/202312032001693.png?x-oss-process=image/resize,w_1000,m_lfit)

### Agenda3 重构

不知不觉 Agenda3 代码也开始复杂起来，当初为了快速开发，代码没有和 Agenda2 做好隔离，导致现在找个文件需要很久。

周末花了两小时，将 Agenda3 和 Agenda2 的代码隔离了出来。又用了三个小时将 KanBan 部分代码重新划分了组件，现在代码看起来清晰多了。

这个重构的过程 Copilot 帮了不少忙，有些拿不定主意的东西跟它聊聊，它会给出一些不错的建议。

花了些时间看 YouTube 视频以及 Twitter，看别人是怎么用 Copilot 的，计划接下来实验半个月，有效果的话就写一篇文章分享一下。

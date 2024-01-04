---
title: 十五周刊 - 100
description: 2023 第 49 周周报
date: 2023-12-10T16:25:00+08:00
slug: weekly-100
tags:
  - Weekly
---

[](https://x.com/haydenull/status/1248980662184361984?s=20)

## 稍后读工具 [Cubox](https://cubox.cc/)

Cubox 是一个稍后读工具，可以将文章保存到 Cubox 中，然后在 Cubox 中阅读。吸引我的点是国际版有 AI 阅读助理，可以对文章做总结，生成大纲。

![](https://pocket.haydenhayden.com/blog/202312101639856.png?x-oss-process=image/resize,w_240,m_lfit)

这个功能免费版就能使用，只是需要填写自己的 OpenAI API Key。这对我来说就更合适了，没有中间商赚差价。

另外免费版两百个收藏卡片的限制对我来说反倒没什么，因为我打算把 Cubox 单纯当做稍后读工具，看完一篇就记到 Logseq 里, 不需要在 Cubox 里收藏。

## VSCode 1.85 更新

这里是更新[日志](https://code.visualstudio.com/updates/v1_85)

总结几个我觉得比较有用的功能：

### 1. 目录树与命令行支持 sticky

`workbench.tree.enableStickyScroll: true` 可以打开目录树的 sticky 功能。

![](https://pocket.haydenhayden.com/blog/202312101653030.gif?x-oss-process=image/resize,w_300,m_lfit)

`"terminal.integrated.stickyScroll.enabled": true` 可以打开终端的 sticky 功能。

### 2. Incoming/Outgoing changes

VSCode 现在支持查看仓库本地与远程的差异了。当本地代码落后于远程时，会在源代码管理的侧边栏显示一个 Incoming Changes 的按钮，点击后会显示本地与远程的差异。本地代码超前于远程时可以看到 Outgoing Changes。

![](https://pocket.haydenhayden.com/blog/202312101658296.png?x-oss-process=image/resize,w_1000,m_lfit)

### 3. git add 命令触发 Copilot 插件自动生成 commit message

之前 Copilot Chat 插件会在源代码管理，commit 输入框处放置一个 sparkle 按钮，点击即可[自动生成 commit message](https://code.visualstudio.com/updates/v1_84#_commit-message-generation)。现在 Copilot Chat 插件会在 git add 时自动触发，对习惯使用命令行的人来说更方便了。

自动生成 commit message 确实是个好功能，我最近的 commit 数量明显比以前更多了。之前因为觉得写 commit message 很麻烦，所以会尽量合并多个 commit。

不过我自己没能成功使用这个功能，可能跟我的命令行配置有关，之前 copilot 给命令行加的 quick fix 我这里也显示不出来。

### 4. 增加悬浮窗口

拖动 tab 到 VSCode 外，松手，即可在一个悬浮窗口中打开此 tab。

### 5. Copilot 相关更新

1. 使用 `command + enter` 自动调用 `@workspace` 命令
2. 将 `@terminal` 命令从 `@workspace /terminal` 里抽离
3. 添加对生成代码的安全性检测（目前没有全量上线）
   ![](https://pocket.haydenhayden.com/blog/202312101716838.png?x-oss-process=image/resize,w_1000,m_lfit)

## Copilot 1.84 更新视频

[](https://www.youtube.com/watch?v=i63DjsjdR3s)

这个视频里有很多 copilot 的使用细节，比如：

- `@workspace` 命令会搜索当前工作区的文件作为上下文，你可以问他某某功能的代码在哪个文件
- 选中代码，然后跟 copilot 聊天，会将选中的代码作为上下文
- 使用 `cmd + shift + i` 打开 inline chat 窗口
- 使用`@terminal` 命令可以读取终端中的上下文，比如读取终端报错信息，生成解决方案
- 使用 [VSCode Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) 通过语音跟 Copilot 交互（纯本地语音转文字，遗憾的是目前只支持英文，不过官方有多语言支持计划）

最近我也在积极实验 Copilot 与工作流的结合，等我有了一些成果再写一篇文章。

## 人类通常只有一个鼻孔通气

以前一直觉得是我的鼻子有问题，只有一个鼻孔通气，现在才知道这是正常现象。

https://twitter.com/HotmailfromSH/status/1732140620037403028

## 我做了什么

### 重拾间歇日记

最近翻看之前的笔记，感觉写得越来越少，大部分都是任务记录，没有什么思考。于是我决定重拾间歇日记，每天写一点，不管是什么，只要是自己想到的，就写下来。

试了几天确实有些效果，之前一些小的知识点，总是不想单独去记录，总想着等写文章的时候再总结。结果要么是一直不会写文章，要么是写文章的时候还要再话很大的精力回想起当时的知识。现在有了间歇日记，因为不考虑形式，不考虑正确性，所以可以随便写，等以后需要总结再去整理。

### Agenda 目标管理功能（开发中）

非常希望在 2024 来临之前能完成这个功能，这样我就可以在 Agenda 中管理我的目标了。

目前的进度是创建于编辑弹窗结构已经搭好，本来可以完成弹窗的逻辑的，但是因为之前的代码写得太烂了，所以我决定重构一下，周末大半的时间都在重构代码。希望下周能完成 MVP。

### 组内分享：公共 gitlab ci yml 设计方案

这周组内分享了一下公共 gitlab ci yml 的设计方案，再次使用自己写的 [Excalidraw 插件](https://github.com/haydenull/logseq-plugin-excalidraw)，感觉非常适合这种有大量图片示意的分享。以后可以将这个插件的部分功能部署成一个 web 版，这样就可以给不用 Logseq 的人使用了。

跟白板工具比，它的优势在于：

- 可以像 ppt 一样分页，快速在不同的页面间切换

跟 PPT 比，它的优势在于：

- 排版灵活自由
- 画示意图非常方便，而且画出来的东西可以随时编辑

![](https://pocket.haydenhayden.com/blog/202312101749341.gif)

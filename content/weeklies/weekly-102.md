---
title: 十五周刊 - 102
description: 2023 第 51 周周报
date: 2023-12-25T07:45:00+08:00
slug: weekly-102
tags:
  - Weekly
  - Logseq
  - Tools
  - 截图
  - 时间记录
---



## Tailwind 技巧

这个 [YouTube](https://www.youtube.com/watch?v=aSlK3GhRuXA) 视频介绍了很多 Tailwind 的实用技巧。

## mac 截图工具推荐

### iShot

https://apps.apple.com/us/app/ishot-screenshot-recording-ocr/id1485844094

优点：

- 价格便宜，支持买断，甚至可以白嫖（下载他们家的另外几款软件就能解锁）
- 支持截图套壳
- 支持长截图（有水印）
- 支持 Pin
- 支持滚动截图
- 支持录屏
- 常用功能无水印
- 可以自动识别窗口截图与区域截图

缺点：

- 样式不太好看，不支持设置截图背景

日常使用足够，但是博客插图等场景需要好看的背景图时就不太好用了。

### Xnapper

https://xnapper.com/

优点：

- 可设置背景色，支持的样式多，较美观
- 自动裁剪居中（这个很好用）
- 自动打码邮箱等隐私信息

缺点：

- 打码工具只有一种样式：纯黑色块
- 编辑功能弱，只有文字、箭头、线框、打码四个工具，且可调整程度低，操作不便捷
- 免费版都有水印
- 区域截图后无法调整框选区域

样式好看，但是功能较为基础，没有复杂需求的话可以考虑。

### Shottr

https://shottr.cc/

优点：

- 支持滚动截图
- 免费功能无水印
- 标注功能丰富
- 支持 Pin

缺点：

- 区域截图无背景色功能，窗口截图背景色设置项不够丰富

功能丰富，唯一的缺点是不够美观。

## raycast 变量取名插件 [Code Var](https://github.com/ifyour/code-var)

快速调用词典生成变量名，支持多种命名风格。

![](https://pocket.haydenhayden.com/blog/202312250843655.png?x-oss-process=image/resize,w_700,m_lfit)

## React 撒花动效组件

https://github.com/herrethan/react-confetti-explosion

![](https://pocket.haydenhayden.com/blog/202312251255731.gif)

## twc 快速生成 Tailwind React 组件

https://react-twc.vercel.app/

原 React 组件

```tsx
import * as React from "react";
import clsx from "clsx";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "bg-slate-100 text-white rounded-lg border shadow-sm",
      className
    )}
    {...props}
  />
));
```

使用 TWC 简化后

```tsx
import { twc } from "react-twc";

const Card = twc.div`rounded-lg border bg-slate-100 text-white shadow-sm`;
```

## 我做了什么

### 使用 logseq query 组织项目笔记

关于项目笔记，有两类：

1. 项目相关的文档，会议记录等笔记
2. 项目相关的待办任务

logseq 基于双链的特性，可以让我们在任意页面记录笔记，然后通过 query 语法，将笔记组织起来。

我会在任意页面记录项目相关的笔记或待办，然后通过 tag 或 page reference 将笔记关联。

每个项目都是一个 page，page 有两个属性：

1. tags：项目标签，目前有两种: work 和 self
2. phase: 项目当前的阶段，比如: Planning, Development, Testing, Deployment, Archive

当我需要查看当前需要关注的项目时，使用以下 query 聚合信息:

```clojure
#+BEGIN_QUERY
{
 :title [:h3 "开发中"]
 :query [
         :find (pull ?p [*])
         :where
         [?p :block/name]
         [?p :block/tags ?tag]
         [?tag :block/name "work"]
         (page-property ?p :phase "development")
        ]
 :breadcrumb-show? true
}
#+END_QUERY
```

这个 query 会查找所有 work 相关的且在开发中的项目，然后将结果展示在一个表格中。

![](https://pocket.haydenhayden.com/blog/202312251308413.png)

关于任务，我会在 Agenda 中创建一个 work 的 Filter，query 如下:

```clojure
[
  :find (pull ?b [*])
  :where
    [?b :block/marker ?marker]
    [(contains? #{"TODO" "DOING" "DONE"} ?marker)]
    [?b :block/path-refs ?p]
    [?p :block/tags ?tag]
    [?tag :block/name "work"]
]
```

这个 query 会查找所有 work 相关的任务。

### agenda 增加语言设置

### daily review

这周开始实践新的时间记录方法，将任务管理交给 Agenda，将时间记录单独拆分出来，手动记录：

- 记录时机：任务切换时
- 记录内容：上一段时间做了什么，耗时多久，做的过程中有什么想法收获

在一天结束时，抽出 10 分钟回顾一下，给记录的事件打上分类 tag，然后对数据做分析，写下收获。

所以我的 Journal 会有两个部分:

1. Daily Log
   ![](https://pocket.haydenhayden.com/blog/202312251318508.png)

2. Daily Review
   ![](https://pocket.haydenhayden.com/blog/202312251318583.png)

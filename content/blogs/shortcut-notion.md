---
title: 使用快捷指令及 Notion 实现个人打卡 App
description: 使用苹果快捷指令实现快速打卡，使用 Notion 存储数据，实现个人打卡 App
date: 2024-01-16
cover: https://pocket.haydenhayden.com/blog/202401180843813.png
draft: false
---

新的一年，又开始折腾年度计划了。日常工作任务我使用 Logseq 管理，不过 Logseq 毕竟不是专业的任务 App，在对便捷性有强需求的打卡任务上，还是需要专业的打卡 App。

但是目前大部分 UI 漂亮，使用方便的任务管理 App，要么功能强大，但数据封闭，要么数据开放，但功能简单，而且也不好定制。

之前看到 yihong 大佬使用 [issue](https://github.com/yihong0618/2024/issues?q=is:issue+is:open+sort:updated-desc) 记录年度信息，让我想到了使用 Notion 记录打卡信息，使用 快捷指令 实现快速打卡的方案。

其实去年我就已经使用 Notion 记录打卡信息了，但是每次打卡都需要打开 Notion，然后找到对应的页面，然后在表格里新建行，记录数据，这个过程非常繁琐，所以坚持了 9 个月还是放弃了。

![](https://pocket.haydenhayden.com/blog/202401160814072.png)

如果使用 快捷指令 实现快速打卡，那么就可以在锁屏界面或者控制中心直接打卡，非常方便。结合 Notion 的 Api 也可以随时扩展新的功能。

## 增加 Notion Integration

首先需要在 Notion 中增加 Integration，这样才能使用 Api 操作 Notion。

点击 https://www.notion.so/my-integrations ，然后点击 New integration，输入名字，然后点击 Submit。同时记下生成的 Internal Integration Secret，后面会用到。

## 创建 Notion Database

1. 创建页面，选择 Table

![](https://pocket.haydenhayden.com/blog/202401160829965.png)

2. 选择 New database

![](https://pocket.haydenhayden.com/blog/202401160828422.png)

3. 指定 database 每条数据的属性

以我这里的深蹲为例，我需要记录的数据有：日期、总数。那么就需要创建两个属性，一个是 `Date`，一个是 `Count`。他们的类型分别是 Date 和 Number。

![](https://pocket.haydenhayden.com/blog/202401160832040.png)

## 制作快捷指令

为了方便说明，我这里使用 Mac 上的快捷指令 App，实际上 iOS 上的快捷指令 App 也是一样的。

### 用到的组件

我们会用到以下几个组件

1. Text: 用户保存一些文本信息，比如 Notion 的 Integration Secret，Database Id 等
2. Ask for Input: 用于获取用户输入的信息，比如深蹲次数
3. Set Variable: 保存变量，用户输入或者文本信息保存到一个变量里，方便后面其他组件使用
4. Current Date: 获取当前日期。
5. Format Date: 格式化日期，因为 Notion 要求日期格式为 ISO 8601 格式，所以需要格式化一下。
6. Dictionary: 用于保存 Notion Api 的请求参数
7. Get Contents of URL: 用于发送请求到 Notion Api

### 详细说明

![](https://pocket.haydenhayden.com/blog/202401160844287.png)

我们使用两个 Text 保存 Notion 的 Integration Secret 和 Database Id，这样后面拷贝 快捷指令 制作其他的打卡任务时，只需要修改这两个 Text 的值就可以了。

databaseId 是 Notion Database 的 Id，可以在 Notion 页面的地址栏找到。

![](https://pocket.haydenhayden.com/blog/202401160847668.png)

> [!note]
> Notion Database 的每行数据是一个 Page，每列的值是 Page 的属性，所以我们需要使用的是创建 Page 的 Notion API，文档在这里：https://developers.notion.com/reference/post-page。
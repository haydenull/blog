---
title: 2023 年 5 月及 6 月总结
description: 拿到驾照啦
author: Haydenull
pubDatetime: 2023-07-03
useHeaderImage: true
headerImage: https://pocket.haydenhayden.com/blog/202302030851669.png
headerMask: rgba(14, 21, 5, .2)
permalinkPattern: /post/:year/:month/:day/:slug/
tags:
  - Personal Review
---

由于这两个月比较忙，5 月份的总结一直拖延到现在，索性就把 5 月和 6 月的总结放一起。

翻了下之前的总结，越来越有堆数据充数的趋势，咨询 ChatGPT 以后，打算按它给的建议来写。

## 1. Goals and Objectives

- 单词 ✅
  - 5月打卡 30 天
  - 6月打卡 29 天
- 看书 ✅ (总时长达标)
  - 5 月打卡 24 天，总时长 749 分钟
  - 6 月打卡 12 天，总时长 360 分钟
- 英语阅读 ❌ `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░ 83%`
  - 5 月打卡 22 天
  - 6 月打卡 22 天
- 健身 ❌ `▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░ 66%`
  - 5 月打卡 22 天
  - 6 月打卡 13 天

## 2. Accomplishments

### 顺利拿到驾照

练车 + 考试几乎占用了我这两个月所有的周末时间。身体上的疲惫只是一方面，考试前的焦虑感才是最折磨的。这种感觉甚至比上学期期末考试和找工作面试还要可怕。

这么多年来我的习惯一直是靠大量练习和积累应对考试，驾照完全打破了这个模式。练习的次数是在驾校安排下严格限制的，所以没有充分练习导致的不安一直在放大焦虑。

不过结果是好的，三次科二以后，科三科四都一次通过，如今已经是驾龄快 10 天的师傅了。

### 养成使用英语记笔记的习惯

为了增加英语的使用场景，这两个月开始使用英语记笔记，如今除了工作内容外，基本都切换导英语了。

现在记笔记的第一反应是 `command + space` 唤醒 Raycast, 再使用翻译插件把中文翻译成英语，接着抄到笔记软件里。

一段时间下来，敲英文单词的手感明显提升了，查资料的时候也会下意识使用英语关键字。

### 完成 excalidraw-plugin dashboard 功能开发

excalidraw-plugin 开发的初衷就是把 excalidraw+ 的部分体验融入到 Logseq 中，第一版完成了基础的画板编辑和预览。工作台作为 excalidraw+ 的核心功能之一，plugin 也是必须要加入的。

目前包含 dashboard 功能的 [1.3.0](https://github.com/haydenull/logseq-plugin-excalidraw/releases/tag/v1.3.0) 版本已经顺利上线。

![](https://pocket.haydenhayden.com/blog/202307061313963.png)

### 利用 API Server 实现 Logseq Plugin 近似热更新效果

开发 excalidraw-plugin 的时候，修改代码必须全量打包再重新加载再测试，效率非常低。

实验后使用 API Server 代理全局的 logseq 对象可以实现近似热更新效果。原理是代理原 logseq SDK 的方法转发到 API Server。

实现方法在 [proxyLogseq](https://github.com/haydenull/logseq-plugin-excalidraw/blob/0c90e8654a8d549aa22fe9e7d9f0209eb12686d2/src/lib/logseqProxy.ts#L52) 文件。目前还不太完善，部分 API 可能不支持，以后会提取一个 npm 组件开放给大家用。

### 完成组内 minimalist 项目重构

minimalist 是物理机测试服管理的前后端项目，之前是完全分离的两个仓库，前端用 antd-pro，后端用 NestJS。已经运行将近一年了，没什么大问题，但是对于后端开发工作较简单的前端组来说，用 NestJS 有点重，其他同学上手的门槛也比较高。

这次使用 NextJS 重构，前后端集成到一个项目里。有以下好处：

1. 前后端逻辑在一个仓库，关于接口的类型定义完全可以复用；
2. 简化了后端的开发工作，新人熟悉一下文件结构，基本就能快速上手修改；

同时，借着这次重构的机会修改了 minimalist 的文件结构，物理机的测试服管理作为只是这个项目的一小块功能，minimalist 的定位是为组内工具开发提供一站式解决方案。域名、数据库、测试及上线流程这些都不需要关心，可以直接在 minimalist 中快速验证想法。

### 开发了半年的系统成功上线

持续六个月的开发，新系统终于在 6 月底成功上线，从目前的反馈来看，前端的线上 bug 量较少，交付质量达到预期。

## 3. Challenges and Obstacles

### 工作流变形

::: warning Challenge
这段时间比较忙，原定计划总是被一个个突发事件打断，持续几天后，就不再做计划了。
:::

::: tip Resolution
每天早上到公司后，第一件事是确定当日计划 ==（定时）==。

遇到打断计划的事，经过评估后确确定是否放到计划中。

坚持使用番茄钟。
:::

### review 以及 log 质量低

::: warning Challenge
review 以及 log 不能及时记录，大部分都是补记。
:::

::: tip Resolution
工作日 19:30 进行当日 review，每周每月最后一天进行周月 review。
:::

::: warning Challenge
review 以及 log 质量低，大部分是数据堆砌。
:::

::: tip Resolution
log 改为随时记录，顺手记下当时的想法。

review 使用新的模板。
:::

::: warning Challenge
review 时间成本很高，一个小时起步，其中有很多关于数据的重复工作。
:::

::: tip Resolution
暂时没有很好的办法，需要写一些自动化的工具配合 Logseq Template 使用。
:::

### code review 质量不高

::: warning Challenge
这次修改其他同事的代码时发现，即使 review 过的代码，也还有挺多当时没能及时发现的问题，一般这些问题需要结合业务才能发现。
:::

::: tip Resolution
code review 的时候尽可能 down 下代码，实际跑一下。
:::

## 4. Learning and Growth

### 让速不让道

科三教练告诉我的开车原则，行车时时刻保持在自己的车道中行驶，有紧急情况第一反应是减速，不能随意转向避让，因为转向可能入侵其他车道，极易引发事故，并且在这种情况下出事故主要责任就是我们的。

### Warp 支持 [workflow](https://docs.warp.dev/features/warp-drive/workflows)

用户可以将自己的常用命令制作为 workflow，并且支持接受参数，方便快速执行一些比较复杂的命令。

![](https://pocket.haydenhayden.com/blog/202307061510670.png)

### Warp 修改 prompt

[warp 不支持多行 prompt](https://docs.warp.dev/features/prompt#multi-line-and-right-sided-prompts)，可以在 prompt 上鼠标右键菜单里切换。

![](https://pocket.haydenhayden.com/blog/202307061513825.png)

## 5. Goals for next month

- 坚持阅读英文小说一个月
- 拿到两个完美周成就
- 上线小组前端飞行手册的第一个版本

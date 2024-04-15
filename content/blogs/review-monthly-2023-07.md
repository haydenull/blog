---
title: "总结: 2023 年 7 月"
description: 7 月的总结
author: Haydenull
date: 2023-08-20
useCover: true
# cover: https://pocket.haydenhayden.com/blog/202302030851669.png
headerMask: rgba(14, 21, 5, .2)
slug: monthly-review-2023-07
featured: false
draft: false
tags:
  - Personal Review
---

## 1. Goals and Objectives

- 单词 ✅
  - 打卡 29 天
- 英语阅读 ✅
  - 打卡 26 天, 阅读时长 33 小时 51 分钟
- 健身 ❌ `▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░ 67%`
  - 打卡 18 天
- 前段端飞行手册的第一个版本 ❌
  - 计划有变

## 2. Accomplishments

### 坚持英语阅读

用微信读书阅读诡秘之主第一卷英文版 《Lord of Mysteries Volume 1: Clown》，刚开始的时候需要查很多魔法相关的术语，后来熟练了可以做到不查词也能看懂剧情。前两个星期坚持下来后，找到了一点读网络小说的快感。

用这种方式就不发愁找英语学习素材，而且也是自己感兴趣的，坚持到年底看看有什么效果。

### 拿到两个完美周

第 27 和 28 周拿到了完美周成就。日常任务 100% 达成率。

### 完成 [@haydenull/fabric](https://github.com/haydenull/fabric) 第一个版本

现在个人项目多了起来，为了统一代码风格，参考一些开源项目做了 fabric，包含 eslint 、prettier、commit message 校验等配置。

### 确定组内脚手架 velo-x 的技术方案

调研了几个方案：

1. [oclif](https://github.com/oclif/oclif) 功能很全，但我不喜欢 class 和继承的设计，放弃。
2. [pastel](https://github.com/vadimdemedes/pastel) 对自己的定位是做 cli 界的 Next.js。而且比较有意思的事它使用 [ink](https://github.com/vadimdemedes/ink) 渲染命令行输出，直接用 react 写命令行界面。

最终方案是使用 commander 自己搭，借鉴 pastel 做了约定式配置简化命令注册的流程，使用 [valibot](https://valibot.dev/) 做参数校验。

之所以选用 valibot 而不是 zod，主要是考虑到 zod 尺寸有点大，虽然这对于一个 CLI 工具来说不是问题，但我想在组内推广这种运行时数据校验的工具，那么 zod 对一些 C 端的项目来说尺寸不能接受，让组内同时使用 zod 和 valibot 又不现实。

## 3. Challenges and Obstacles

### 有一个小需求忘记上线

> [!warning] Challenge
> 比较久以前的小需求，一直没安排测试，我这边也一直拖延没去 push，最终这个需求没能让业务及时用上。

> [!tip] Resolution
> 不能拖延，该 push 的就得 push。

## 4. Learning and Growth

### 使用 tailwind css JIT 实现背景色

```html
<div class="bg-[linear-gradient(180deg,_#eab308_49.9%,_#a855f7_50%)]"></div>
```

参考[这篇文章](https://www.hyperui.dev/blog/custom-gradients-with-tailwindcss-jit)，原则就是使用下划线替代 css 语句里的空格。

基本上使用 tailwind css 就能实现绝大多数 css 的功能，项目里不再需要 less sass，也不用再写 css 了。

而且最近做 code review 发现以前单独写 css 文件再用类名引入的方案，review 起来很痛苦，需要在两个文件里来回跳，需要自己去记 html 结构。如果全用 tailwind css 应该可以改善。

### Chrome 自定义设备模拟器无法滚动问题

当一个元素具有单个圆角 `border-top-left-radius` + `overflow auto` 时，如果它的子元素有滚动条，那么该子元素无法滚动。

当时查了很久，最后发现是 Chrome 自定义设备模拟器的问题。用 iOS 或者 android 真机，以及 Chrome 自带的模拟器都正常。

以下是示例代码，在 tailwind playground 中可以测试:

```html
<div class="bg-blue-200 h-[600px] overflow-auto rounded-tl-[24px] pb-4">
  container
  <div class="bg-red-200 h-[400px] w-1/2 overflow-auto pb-4">
    <div class="bg-orange-200 h-[500px] w-3/4"></div>
  </div>
</div>
```

## 5. Goals for next month

- 继续坚持阅读英文小说一个月
- 拿到两个完美周成就
- velo-x 第一版
- velo-fetch 第一版

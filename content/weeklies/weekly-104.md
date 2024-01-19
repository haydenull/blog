---
title: 十五周刊 - 104
description: 2024 第 2 周周报
date: 2024-01-18
slug: weekly-104
cover: https://pocket.haydenhayden.com/blog/202401182145227.JPG
draft: true
---

## JS location.href 跳转不阻断代码执行

```js
const fetchUserInfo = async () => {
  try {
    return await getCurrentUser()
  } catch (error) {
    navToLogin()
  }
}

const init = async () => {
  const userInfo = await fetchUserInfo()
  // 存储用户信息到本地
  // ...
}
```

上述代码在 `getCurrentUser` 抛出异常时，会跳转到登录页，但是 `init` 函数会继续执行，导致存储到本地的用户信息是 `undefined`。

如果在取信息时没有做异常处理，那么可能导致整个页面崩溃。

解决方案是让 `fetchUserInfo` 抛出异常，这样就可以阻断 init 内的代码执行。

```js{7}
const fetchUserInfo = async () => {
  try {
    return await getCurrentUser()
  } catch (error) {
    navToLogin()
    // 抛出错误，阻止后续流程
    return Promise.reject(error)
  }
}
```

## 使用快捷指令与 Notion 打造习惯打卡 app

[使用快捷指令及 Notion 实现个人打卡 App](/blog/shortcut-notion)


## Chrome 118版本不再限制汉字最小字号

https://developer.chrome.com/blog/chrome-118-beta#consistent_minimum_font_size_across_languages

Chrome 团队认为中文等语言小于 12px 的字号不可读，所以针对这几个语言做了最小字号限制。

在 2023 年 9 月的 Chrome 118 版本中，这个限制被移除了。现在中文与英文保持一致，可以设置小于 12px 的字号。

> Changes the default setting for the **Minimum font size** to be off by default for seven languages (Arabic, Farsi, Japanese, Korean, Thai, Simplified and Traditional Chinese) to improve interoperability and accessibility.

## 推荐两个找电子书的网站

- [无名图书](https://www.book123.info/)
- [zLibrary](https://z-lib.io/)

![](https://pocket.haydenhayden.com/blog/202401190742360.png)

## 一个有点像 Arc 的颜色选择器

[](https://twitter.com/coooolxyh/status/1746335370458042776)

这个颜色选择器让我想起了 Arc，它会出现两到四个颜色点，根据一定的规则，在你改变其中一个点时，自动修改其他的颜色点，生成一个好看的渐变色，这里是 [demo](https://harmony.sh/)。

## 命令行年度总结工具 cmd-wrapped

https://github.com/YiNNx/cmd-wrapped

对你的命令行操作进行统计，生成年度总结。

![](https://pocket.haydenhayden.com/blog/202401190801603.png)


## 生成 Unicode 进度条工具

https://github.com/Changaco/unicode-progress-bars

生成各种 Unicode 进度条，方便使用纯文本的形式展示进度。

![](https://pocket.haydenhayden.com/blog/202401190804792.png)

## 电子化说明书

## 我做了什么
agenda i18n 发版
新键盘
快捷指令
周计划进度开始对齐与回顾了
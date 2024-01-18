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


## Chrome 不再限制 12px

Chrome 不在限制 12px
找电子书zlib
arc 颜色选择器
命令行年度总结
生成unicode 进度条
电子化说明书

## 我做了什么
agenda i18n 发版
新键盘
快捷指令
周计划进度开始对齐与回顾了
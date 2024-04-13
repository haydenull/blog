---
title: 十五周刊 - 92
description: 2022 第 26 周周报
year: 2022
week: 26
episode: 92
author: Haydenull
date: 2022-07-03
useCover: true
cover: https://pocket.haydenhayden.com/blog/202302021319846.png
headerMask: rgb(14, 21, 5, .2)
slug: weekly-92
tags:
  - Weekly
  - JavaScript
---

使用 JavaScript 实现倒计时、JS 定时器注意事项

<!-- more -->

## 1. JS 倒计时

[agenda 插件](https://github.com/haydenull/logseq-plugin-agenda)需要增加番茄钟功能，在 github 上找到 [usePomodoro](https://github.com/kacgrzes/use-pomodoro) ，看起来功能挺全的，而且使用 hook使用起来很方便，虽然 star 数量并不多，但是这个功能也不复杂，如果有问题我自己能 hold 住，所以最终就选了它。

但是在功能开发完上线后才发现，总是计时不准确，明明设置的 25min 番茄钟，结果一个小时过去了，倒计时也没跑完。

后来拿着手机对比研究一下，确定了当软件处于后台时就会出现误差。突然想起来以前也遇见过类似的情况，当浏览器 tab 处于非激活的状态时，定时器就可能不准确。

去仓库看了下代码，果然问题出在这里：

```jsx
// 原代码使用 setInterval，来计算倒计时剩余时长
setInterval(tick, 1000);
```

当tab不处于激活状态（tab被隐藏，浏览器处于后台）时，setInterval 的触发间隔就并不是设定的 1000ms。这可能是浏览器出于性能与耗电等考虑设计的机制。

那么如何处理呢？

既然js不能保证代码每隔1s执行一次，就只能从外部下手。比较普遍的方法是使用系统时间作为参照物：

```jsx
function countDown(length) {
  const start = new Date().valueOf();
  const timer = setInterval(() => {
    const now = new Date().valueOf();
    const past = now - start;
    if (past <= 0) {
      console.log("count down end");
      clearInterval(timer);
    }
  }, 1000);
}
```

知道开始时间及倒计时的时长后，就能算出结束时间，也能在每次定时器回调中知道已经过去的时间。将计时的任务交给系统，js 只是轮询查流逝的时间，这样就可以避免误差。

这个是我提的 [pr](https://github.com/kacgrzes/use-pomodoro/pull/2/files)。

这个方法也有一个问题，如果用户一直让页面处于非激活状态，在倒计时应该结束的那一刻，setInterval 可能也无法执行，需要到用户激活tab，才能再次触发。

如果需要解决这个问题，感觉一个方案是包装成 app 来进行后台保活，一个方案是把状态信息存到服务器，当计时结束时服务器给 js 发消息。

## 2. js 定时器注意事项

基础使用很简单，我们这里只说需要注意的几个点。

### 2.1 定时器嵌套

> `setInterval` 回调可以嵌入对另一个定时器的调用，为了减轻对性能的影响，一旦定时器嵌套超过5层，则浏览器将强制设置定时器最小时间间隔为 4ms。

### 2.2 确保代码执行时间短于定时器间隔

定时器回调属于异步任务，只有调用定时器的主线程其他代码执行完毕才会执行回调函数。如果前面的代码执行时间超过定时器间隔，那么定时器就不会在正确的时间触发。所以浏览器无法保证一定在正确的时间触发回调。

### 2.3 未被激活的tabs的定时最小延迟 ≥ 1000ms

> 为优化后台 tab 的加载损耗（以及降低耗电量），在未被激活的 tab 中定时器最小延迟时间为 1000ms。

### 2.4 最大延迟值

> 浏览器以32位带符号整数存储延时，当延时大于2147483647 毫秒 (大约 24.8 天) 时就会溢出, 此时定时器会立即执行。

## 参考文章

[window.setTimeout - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#%E5%A4%87%E6%B3%A8)

[setInterval() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval#%E4%BD%BF%E7%94%A8%E5%A4%87%E6%B3%A8)

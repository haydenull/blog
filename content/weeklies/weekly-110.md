---
date: 2024-04-04
slug: weekly-110
year: 2024
week: 15
episode: 110
---

## .git 文件夹里有哪些内容

[](https://twitter.com/HiTw93/status/1776760549260546131)

## React With TypeScript 教程s

https://www.totaltypescript.com/tutorials/react-with-typescript

一个 React With TypeScript 的教程网站，主要是讲解 React 和 TypeScript 的结合使用。

## React Toast 组件

https://react-hot-toast.com/

一个 React 的 Toast 组件，支持多种类型的提示，可以非常方便地自定义样式。

## AI 贴纸生成器 Sticker.Show

https://sticker.show/

[](https://twitter.com/gefei55/status/1770090496335229315)

## Homebrew bundle

https://github.com/Homebrew/homebrew-bundle/

Homebrew bundle 是 Homebrew 的一个插件，可以通过一个 Brewfile 文件来管理你的 Homebrew 安装的软件。便于重装系统或者同步多台电脑的软件。

## Lang UI

https://www.langui.dev

一个为 AI GPT 项目定制的 Tailwind CSS 组件库，在类似 ChatGPT 这样的项目中使用非常方便。

![](https://pocket.haydenhayden.com/blog/202404142151488.png)

## OAuth 2.0 使用 session 存储随机 code 防止 CSRF 攻击

https://stackoverflow.com/questions/35985551/how-does-csrf-work-without-state-parameter-in-oauth2-0

![](https://pocket.haydenhayden.com/blog/202404142206905.png)

微信网页授权登录时，有一个 state 参数，文档没有详细说明。但是这个与 OAuth 2.0 的 code 比较相似，可以用来防止 CSRF 攻击。

在跳转到微信授权页面前，生成一个随机的 state，存储在 session storage 中。在回调时，比较 session 中的 state 和回调参数中的 state 是否一致，来判断是否是合法的回调。

```js
// 生成随机 state
const state = Math.random().toString(36).substring(2);
// 存储在 session storage 中
sessionStorage.setItem('state', state);
// 跳转到微信授权页面
window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
```

```js
// 回调时比较 state
const state = sessionStorage.getItem('state');
if (state !== callbackState) {
  // 不合法
}
```


## 我做了什么

### 博客迭代

重构博客周刊页面，将大卡片布局改为列表布局，去除了封面，方便查看。同时补充了项目页面以及分享页面。

![](https://pocket.haydenhayden.com/blog/202404142108608.png)

![](https://pocket.haydenhayden.com/blog/202404142117575.png)

![](https://pocket.haydenhayden.com/blog/202404142118703.png)
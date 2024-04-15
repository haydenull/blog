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

### 如何防止 CSRF 攻击

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

### CSRF 攻击的流程

https://stackoverflow.com/questions/35985551/how-does-csrf-work-without-state-parameter-in-oauth2-0

假设我们有一个笔记软件，用户登录后可以绑定微信账号，以后可以使用微信登录。

攻击流程：
1. 攻击者访问笔记的微信授权页面，得到授权链接 `https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
2. 将授权链接发送给受害者，引导受害者点击（比如伪造成图片）
3. 受害者点击链接后，会跳转到微信授权页面，授权后即可将受害者的笔记软件账号绑定到攻击者的微信账号上
4. 攻击者可以通过自己的微信登录受害者的账号

正是由于第一步 state 不是随机的，所以攻击者可以自己构造授权链接，引导受害者点击。而如果 state 是随机的，并且使用 session storage 存储，那么攻击者即使构造了授权链接，由于 session storage 是浏览器隔离的，受害者在访问授权链接时，其 session storage 中的 state 与攻击者构造的 state 不一致，从而防止了 CSRF 攻击。


## 我做了什么

### 博客迭代

重构博客周刊页面，将大卡片布局改为列表布局，去除了封面，方便查看。同时补充了项目页面以及分享页面。

![](https://pocket.haydenhayden.com/blog/202404142108608.png)

![](https://pocket.haydenhayden.com/blog/202404142117575.png)

![](https://pocket.haydenhayden.com/blog/202404142118703.png)

### 回收积攒多年的电子设备

周六用转转上门卖了 5 台设备，包括一台 Mac，两部手机以及一台 iPad。整个过程比较轻松，在手机上操作得到评估价后，11 点下单，下午三点就有人上门检测设备，全程有录音，最后的的价格跟评估价也没有差很多，大部分差价是因为设备屏幕老化。当场验完直接支付宝就到账。

虽然价格肯定比自己找买家便宜，但是比较省心，毕竟如果和买家发生纠纷处理起来费时费力。

最后感慨一句淘汰下来的设备尽早出掉比较好，保养得再好时间长了屏幕就会老化，越往后越不值钱。

![](https://pocket.haydenhayden.com/blog/202404151033343.png?x-oss-process=image/resize,w_420,m_lfit)
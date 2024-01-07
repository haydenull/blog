---
title: 十五周刊 - 103
description: 2024 第 1 周周报
date: 2024-01-07
slug: weekly-103
cover: https://pocket.haydenhayden.com/blog/202401071723257.JPG
---

## 动态裁剪字体

使用 [font-min](https://github.com/ecomfe/fontmin#glyph) 可以按照指定的文字，对字体文件进行裁剪。

```js
import Fontmin from 'fontmin';

const fontmin = new Fontmin()
    .use(Fontmin.glyph({
        text: '天地玄黄 宇宙洪荒',
        hinting: false         // keep ttf hint info (fpgm, prep, cvt). default = true
    }));
```

利用这个特性可以解决生成 og 时，中文字体过大的问题，具体方案可以参考 [这篇文章](/blog/next-og)。

## 使用 View Transitions 实现带动画的主题切换

[](https://twitter.com/gluekol/status/1742942677795270908)

Demo 以及代码[在这里](https://www.aang.dev/playground/view-transition-theme-switcher)。

使用上面的示例代码注意加上 css:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}
```

这个代码也被我借鉴到了我的个人网站上，你可以点击右上角的切换主题试试效果。

![](https://pocket.haydenhayden.com/blog/202401071912387.gif)

## Next.js 官方教程

https://nextjs.org/learn

这是 Vercel 官方出品的 Next.js 入门教程，比较全面。

除了前端相关，还有一些后端知识，比如数据库、登录、接口分页等。

## 代码生成图片分享工具 Chalk

https://chalk.ist/

支持高亮行，支持多文件。这个多文件还挺有意思的，可以用来做代码片段分享。

![](https://pocket.haydenhayden.com/blog/202401071925509.png)

## 类似 shadcn 的动画库 Aceternity UI

https://ui.aceternity.com/components/floating-navbar

类似 shadcn 的理念，主打一个复制粘贴即可使用的动画库。基于 Tailwind 以及 Framer Motion。

复制粘贴的好处是我们可以按心意随意调整，我这个个人网站大量使用了这个库，非常赞。

## 精益副业：程序员如何优雅地做副业

https://github.com/easychen/lean-side-bussiness

## 我做了什么

### 个人网站升级

元旦假期，我重构了我的个人网站，技术栈从原先的 Astro 换成了 Next.js。

这次没有再使用第三方模板，而是自己从零开始搭建，样式上使用了 Tailwind + Shadcn + Aceternity。

首页使用了 Bento 设计，然后将几个常用的内容做成了卡片。这样以后也能随时扩展。

仓库地址在这里：https://github.com/haydenull/blog

![](https://pocket.haydenhayden.com/blog/202401072101657.png)

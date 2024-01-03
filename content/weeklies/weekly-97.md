---
title: 十五周刊 - 97
description: 2023 第 46 周周报
date: 2023-11-19T17:35:00+08:00
slug: weekly-97
tags:
  - Weekly
  - Local First
  - QRCode
  - Vite
  - SVG
---



## Tailwind 图标库 heroicons

https://heroicons.com/

## Vite 发布 5.0 版本

https://vitejs.dev/blog/announcing-vite5

## 二维码生成的 JS 库

https://github.com/ushelp/EasyQRCodeJS

功能丰富且更新活跃。

> EasyQRCodeJS 是使用 JavaScript 的一个强大的、跨浏览器的二维码生成库。运行在基于 DOM 的客户端浏览器，并能够在浏览器中进行下载。它支持Canvas、SVG和Table绘图方法。提供灵活的配置，包括点样式、Logo、背景图片、彩色，标题和二进制（十六进制）数据模式支持。它还能与Angular、Vue.js、React、Next.js和Svelte框架兼容。

## Loro 发布

https://github.com/loro-dev/loro

支持 local first 和协同编辑。其实我挺好奇这两者是如何组合起来的，找个时间研究一下。

## 在线编辑 SVG

http://www.zuohaotu.com/svg/

想用一个 logseq 的图标，但 logseq 是用字体的形式引入的，最后搜到一个相似的图标，然后使用上面的功能稍微编辑一下，导出为 svg。

加上 `fill="currentColor"` 后可以让图标继承字体的颜色。

```jsx
const LogseqLogo = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        stroke="currentColor"
        d="M19.3 9.838c-2.677-1.366-5.467-1.56-8.316-.607c-1.738.58-3.197 1.58-4.267 3.088c-1.031 1.452-1.45 3.071-1.184 4.837c.268 1.781 1.164 3.228 2.505 4.4C9.96 23.231 12.24 23.942 15.092 24c.41-.053 1.157-.103 1.883-.255c2.004-.418 3.754-1.325 5.08-2.915c1.621-1.942 2.108-4.148 1.272-6.562c-.704-2.034-2.138-3.467-4.027-4.43ZM7.515 6.295c.507-2.162-.88-4.664-2.988-5.37c-1.106-.37-2.156-.267-3.075.492C.61 2.114.294 3.064.271 4.146c.009.135.016.285.029.435c.01.102.021.205.042.305c.351 1.703 1.262 2.98 2.9 3.636c1.912.766 3.808-.244 4.273-2.227Zm4.064-1.146c1.075.377 2.152.31 3.22-.033c.94-.3 1.755-.793 2.341-1.609c.803-1.117.5-2.387-.717-3.027c-.6-.317-1.246-.438-1.927-.48c-.47.076-.95.117-1.41.234c-1.068.27-2.002.781-2.653 1.7c-.495.697-.64 1.45-.174 2.227c.303.504.779.799 1.32.988Z"
      ></path>
    </svg>
  );
};

export default LogseqLogo;
```

## Quantumult X 配置及同步

[链接](/posts/quantumult-x)

## 我做了什么

### Agenda 移除日志

![](https://pocket.haydenhayden.com/blog/202311191743749.png)

收到一份使用者的邮件，表示对 Agenda 引入外部 Script，以及上报日志有隐私上的担忧。

Agenda 是完全开源的，引入的 Script 其实是自部署的 [umami](https://umami.is/)。但确实这个脚本的代码在 Agenda 的仓库中看不到，翻了一下 Google Analytics 的用户协议也是要求收集信息前需要做用户告知，虽然我见到的大部分项目都没有这么做。

暂时只能注释日志统计的代码，等后续参考其他开源项目的做法。

### Agenda 移除 project 概念，增加 Filter

![](https://pocket.haydenhayden.com/blog/202311191806272.png)

原先的 project 概念是 Agenda 自己创造的，会增加用户的理解成本。已经改为 logseq 的 Page。从此它只代表任务所处的 Page 文件。

这个改动是为了尽可能减少 Agenda 与 logseq 的差异。降低用户认知成本的同时解放 Agenda 的自由度，还能降低开发成本。

因为 Agenda 引入了 Filter 的功能，它支持 logseq 的 query。也就是说 Agenda 将 logseq 作为数据存储方，用户可以根据自己的选择自由定制 Filter，满足自己的定制化需求。

对于 Agenda 来说，project 的功能被 Filter 覆盖了，一个 Filter 就可以是一个 project，从而将任务与 page 解绑。这样做的好处是什么呢：

比如有的用户并不习惯将任务分门别类地放入一个个 page 中，而是随意地创建在 logseq 的任意页面，然后使用双链表示关系。

使用 Filter 以后，用户可以使用 query 将这层关系告知给 Agenda，Agenda 就是 logseq 任务的一个单纯的显示层 UI。任务如何组合取决于 query 怎么写。我想这个方案会与 logseq 双链笔记的特性更契合。

但是这么一来确实为增加普通用户的使用门槛，所以 Agenda 仍然保留了 page 的概念，默认使用 page 给任务分组。

以后可以出一些 Filter 模板，或者再 UI 上做一些简化让用户更好地上手。

### Agenda 体验优化

- 支持标签输入补全
- 支持折叠侧边栏
- Plan 页面支持显示明日计划

[Changelog](https://github.com/haydenull/logseq-plugin-agenda/releases/tag/v3.6.0)

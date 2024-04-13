---
title: 十五周刊 - 93
description: 2023 第 5 周周报
date: 2023-01-30
year: 2023
week: 5
episode: 93
useCover: true
cover: https://pocket.haydenhayden.com/blog/202302021321338.png
headerMask: rgb(14, 21, 5, .2)
slug: weekly-93
tags:
  - Weekly
  - TypeScript
---

2023 第一篇周报, 本周主要是 TypeScript 5.0 Beta 发布, 以及一些其他的技术新闻。

<!-- more -->

# 01月23日-01月29日

## 本周技术新闻

### [TypeScript 5.0 Beta 发布](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/)

TypeScript 发布了 5.0 beat 版，可以使用以下命令安装：

```bash
$ npm install typescript@beta
```

简述几个比较重要的更新：

#### 1. [Decorators](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#decorators) 装饰器

[EcmaScript 的装饰器标准已经进入 Stage3](https://github.com/tc39/proposal-decorators)，这意味着装饰器将会成为 JavaScript 的标准特性。

在过去的版本中 TypeScript 已经支持了装饰器，但需要手动开启 `experimentalDecorators` 编译选项。在 5.0 版本中，装饰器已经成为了正式特性，不需要再开启编译选项。

下面是一个简单的装饰器的例子：

```ts
function loggedMethod(
  originalMethod: (...args: any[]) => any,
  context: ClassMethodDecoratorContext
) {
  const methodName = String(context.name);

  return function (this: any, ...args: any[]) {
    console.log(`LOG: Entering method '${methodName}'.`);
    const result = originalMethod.call(this, ...args);
    console.log(`LOG: Exiting method '${methodName}'.`);
    return result;
  };
}

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @loggedMethod
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const p = new Person("Jack");
p.greet();

// Output:
//
//   LOG: Entering method.
//   Hello, my name is Jack.
//   LOG: Exiting method.
```

#### 2. [`const` 类型参数](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#const-type-parameters)

TypeScript 5.0 支持了 `const` 类型参数，这意味着你可以使用 `const` 修饰符来限制类型参数的值为常量。

```ts
const routes = <T>(routes: T[]) => {
  const addRedirect = (from: T, to: T) => {
    // ...
  };
  return {
    addRedirect,
  };
};

const router = routes(["/home", "/about", "/contact"]);
router.addRedirect("/home", "/about"); // 类型正确
router.addRedirect("/home", "/blog"); // 类型正确
```

在上面的例子中 `router.addRedirect("/home", "/blog")` 不会报错，因为 `from` 和 `to` 的类型参数都是 `string`，但是这样的代码是不正确的，因为 `/blog` 并不是 `routes` 的参数。

使用 `const` 修饰符可以限制类型参数的值为常量，这样就可以避免上面的错误。

```ts
const routes = <const T extends string>(routes: T[]) => {
  const addRedirect = (from: T, to: T) => {
    // ...
  };
  return {
    addRedirect,
  };
};

const router = routes(["/home", "/about", "/contact"]);
router.addRedirect("/home", "/about"); // 类型正确
router.addRedirect("/home", "/blog"); // 类型错误: TS 推断出 from 和 to 的类型为 "/home" | "/about" | "/contact"
```

#### 3. 所有的 `Enum` 都改为 `Union enums`

在 4.9 中：

```ts
enum LogLevel {
  DEBUG,
  WARN,
  ERROR,
}

const log = (level: LogLevel) => {
  // ...
};

log(LogLevel.DEBUG); // 类型正确
log(0); // 类型正确
log(123456); // 类型正确
```

旧版的 TypeScript 中使用 enum 作为类型时是不安全的，在上面的例子中 `log(123456)` 是不会报错的，只要是数字就可以通过检查。

在 5.0 中，所有的 enum 都是 `Union enums`，这意味着 enum 的值只能是 enum 的成员。

```ts
enum LogLevel {
  DEBUG,
  WARN,
  ERROR,
}

const log = (level: LogLevel) => {
  // ...
};

log(LogLevel.DEBUG); // 类型正确
log(0); // 类型正确
log(123456); // 类型错误
```

另外需要注意：

```ts
enum LogLevel {
  DEBUG = "debug",
  WARN = "warn",
  ERROR = "error",
}

const log = (level: LogLevel) => {
  // ...
};

log(LogLevel.DEBUG); // 类型正确
log("debug"); // 类型错误: 注意数字枚举与字符串枚举表现不一致
```

> 编者按: TS 中的 enum 为了迎合 js 有一些奇怪的行为，比如反向映射，这里不做过多介绍，关于是否使用 enum 网上有很多讨论，大家可以自行搜寻，我个人对 enum 的态度是能不用就不用（大多数情况 enum 都可以被 object as const 以及 union type 取代），如果需要使用请一定明确使用目的，了解可能存在的问题。

#### 4. 自动填充 `switch` 语句的 `case`

case 语句可以穷尽所有的可能性，并自动填充。

![](https://pocket.haydenhayden.com/blog/202302021323819.gif)

#### 5. 速度及尺寸优化

TypeScript 5.0 有一些性能优化，与 4.9 的对比见下图：

![](https://pocket.haydenhayden.com/blog/202302021323534.png)

### [Vite 4.1.0 beta](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md#410-beta1-2023-01-26) 发布

Vite 4.1.0 beta 发布，主要是一些 bug 修复。

我们顺便回顾一下 vite 的发展历程：

#### 1. Vite 1

Vite 1 的主要目标是为 Vue 组件提供快速的开发体验，它的核心是基于浏览器原生的 ES Module 实现的。

#### 2. Vite 2

- Vite2 完全重构了代码，使其可以支持任何框架，所有特定于框架的支持都委托给了插件。
- Vite2 提供了 SSR 支持
- 支持旧版本浏览器

#### 3. Vite 3

- 使用 Vuepress 构建全新文档
- 支持模板
- 减小构建体积
- 单测与 E2E 测试迁移到 Vitest

**同时， Vite 团队决定每年至少一个大版本，以配合 Node.js 的 EOL。**

#### 4. Vite 4

- 升级到 Rollup 3
- 开发过程中使用 SWC 的新 React 插件
  - `@vitejs/plugin-react` 是一个使用 esbuild 和 Babel 的插件
  - `@vitejs/plugin-react-swc` 是一个新插件，在构建过程中使用 esbuild，但在开发过程中使用 SWC 取代 Babel，冷启动以及 HMR 速度更快

### [美团2022技术年货](https://mp.weixin.qq.com/s/_LsTAqTNMKHI2LT3EJUvDg)

[点击查看前端年货pdf](https://pocket.haydenhayden.com/blog/202302021325861.pdf)

个人比较喜欢函数式编程的部分，但是这个年货里讲的比较偏理论，尤其是关于 Monad 的部分，特别数学，我更加喜欢这篇[知乎的文章](https://zhuanlan.zhihu.com/p/575642401)，讲的通俗易懂。

自从 React 在前端火了以后，它所推崇的函数式编程思想也在前端火了起来，但是函数式编程的理论知识却很少有人去深入了解，函数式编程其实在前端也是非常有用处的，尤其是我们时时刻刻在与副作用打交道。

理解函数式编程，可以让我们有意识地控制副作用，减少代码 bug，同时也能加深对 React 的理解，写出更好的 React 代码。

### [The Pens of 2022 on CodePen](https://codepen.io/2022/popular/pens)

codepen 2022 年的流行代码。有许多有意思的动画效果，可以添加到自己的项目中。

## 其他新闻

### GitHub 用户数到达 1 亿

Github 在网页上专门加了一个动画，来庆祝用户数到达 1 亿。

可以[点击](https://github.com/haydenull)这里去查看。

![](https://pocket.haydenhayden.com/blog/202302021324612.gif)

### [ChatGpt 即将开放 API](https://twitter.com/OpenAI/status/1615160228366147585)

ChatGpt 是 OpenAI 的一个聊天机器人，可以充当私人助理。

目前已经可以申请 wait list，等待开放。

根据目前 Twitter 放出的信息，可以知道其价格：

![](https://pocket.haydenhayden.com/blog/202302021324212.jpg)

另：传言 Microsoft 考虑将 ChatGpt 集成到 Bing 搜索中。或许这是一个弯道超车 Google 的机会。

### 几个使用 OpenAI 的项目

1. [readpilot](https://readpilot.vercel.app/)

输入链接, AI 帮你阅读文章并以 Q&A 的形式总结

该项目完全开源: https://github.com/forrestchang/readpilot

2. [email-helper](https://email-helper.vercel.app/)

让 AI 帮你写邮件

开源: https://github.com/shengxinjing/email-helper

#### 一些想法

最近越来越多的使用 GPT-3 的项目出现真有点新时代的意思了。看到一个很有意思的说法:

计算机使用二进制语言,人类使用自然语言, 程序员的工作是使用编程语言将人类的想法翻译给计算机。

而 GPT-3 让这两种语言可以互相转换。这样的话, 未来的计算机就可以和人类一样, 用自然语言来交流了。

最近看的一本书《银河之心》里人类有一个分支是铁人, 他们的身体细胞都是纳米机器人, 从某种意义上讲这样的人类已经接近神了, 在计算机的辅助下可以言出法随, 可以接近全知全能, 而 AI 是这种进化的第一步。

## 文章推荐

#### [开源软件指南](https://opensource.guide/zh-hans/)

Github 官方出品的开源软件指南，包含了如何创建开源项目、如何维护开源项目、如何参与开源项目等等。

## 工具推荐

### [OSS Insight](https://ossinsight.io/analyze/haydenull)

OSS Insight 是一个开源项目的分析工具，可以分析开源项目的贡献者、代码量、代码质量、代码重复率、代码覆盖率、代码安全性等等。

它自带了一些 [Collection](https://ossinsight.io/collections)，比如比较受欢迎的 js 打包工具排行，受欢迎的 UI 库排行等，你也可以自己创建 Collection。

### [YouGlish](https://youglish.com/)

youglish 是一个英语学习网站，可以通过视频来学习英语。

在 youglish 中，你可以输入一段英文，然后它会在 YouTube 中搜索相关的视频，然后将视频中的英文和你输入的英文进行对比，高亮显示你输入的英文在视频中的位置。

你可以通过这个网站来学习英语的发音，或者学习英语的语法。

### [QuickReference](https://wangchujiang.com/reference/index.html)

各种技术栈文档速查

### [vhs](https://github.com/charmbracelet/vhs)

用脚本的方式录制终端命令行的操作，生成 gif 图片。

具体效果可以看这个 [mht-cli 录制的 demo](https://gitlab.corp.youdao.com/kef2e/lab/supermanhattan-cli#%E4%B8%80%E4%BA%9B%E7%A4%BA%E4%BE%8B)

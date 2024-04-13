---
title: 十五周刊 - 94
description: 2023 第 43 周周报
date: 2023-10-23
slug: weekly-94
year: 2023
week: 43
episode: 94
tags:
  - Weekly
---



## 技术相关

### nodejs 20.6 原生支持 env 文件

https://nodejs.org/en/blog/release/v20.6.0

目前大部分项目使用 [dotenv](https://github.com/motdotla/dotenv) 实现 env 文件配置，node 原生支持以后就能少引入一个库了。

### This technique makes Valibot’s bundle size 10x smaller than Zod’s!

https://www.builder.io/blog/valibot-bundle-size

[Valibot](https://github.com/valibot) 的作者介绍了为什么 valibot 的包体积能比 zod 小十倍：**tree shaking**。

作者对比了 zod 的面向对象的写法和 valibot 的函数式的写法。

zod 面向对象的写法:

```ts
// Step1: 声明一个基础类，这里有一些公共方法，例如 parse safeParse 等
export abstract class ZodType<
  Output = any,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output,
> {
  parse(data: unknown, params?: Partial<ParseParams>): Output {
    const result = this.safeParse(data, params);
    if (result.success) return result.data;
    throw result.error;
  }
  // ...
}

// Step2: 继承基础类，然后添加自己的独有方法。示例为 zodString，添加了 email 等 zodString 的独有方法
export class ZodString extends ZodType<string, ZodStringDef> {
  email(message?: errorUtil.ErrMessage) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  // ...
}
```

当用户只只是调用 zodString 的方法时，会将所有代码都打包，因为打包器无法 tree shaking。

例如：

```js
const obj = {
  name: "hello",
  say: () => console.log("hello"),
};
obj.say();
```

即使我们只调用了 obj 的一部分方法，打包器仍然会将整个 obj 打包进来。

而 valibot 使用的是函数式的写法，将所有功能拆分为独立的互不依赖的函数，这样打包器就可以 tree shaking 了。

```ts
// 所有方法都是独立的
export function string(pipe: PipeFn<string>[]) {
  return {
    schema: "string",
    // ...
  };
}
export function email(): PipeFn<string> {
  return (value: string) => {
    // ...
  };
}
```

在 UI 领域，业界已经逐渐统一了认识：组合优于集成。valibot 与 zod 写法上的区别，又是一次函数式与面向对象的碰撞。

后端程序不太考虑应用体积的问题，但是前端应用需要，特别是可能被很多应用使用的组件库，这也是为什么 UI 组件库都必须支持按需加载。

用函数组合的方式可以天然利用语言特性实现 tree shaking，进而优化代码体积。大家在写组件或者 sdk 时可以尝试一下。

### tsconfig cheat sheet

https://www.totaltypescript.com/tsconfig-cheat-sheet

tsconfg 配置非常多，这里是一个简要的说明手册，有兴趣的话可以看看。

另外我们自己也有一个[公共的 tsconfig 配置](https://gitlab.corp.youdao.com/hikari/f2e/common-components/velo/-/blob/velo-x/packages/fabric/tsconfig/tsconfig.json)，可以试用共建。

### Draggable Objects

https://www.redblobgames.com/making-of/draggable/

非常详细的实现兼容手机和 pc 拖拽的文章。

### 新一代前端发展的困境与破局

https://tw93.fun/images/pdf/new-fe.pdf

前端近些年已经趋于稳定，好造的轮子都被造了，行业越来越卷的情况下我们应该怎么做：

1. 快乐地写代码（热爱）
2. 工程师应该很明白地做事情（做解决问题的专业人员而不是脑力工作者）
3. 做产品工程师（不局限于岗位技术，运用技术和产品思路去解决问题。同理心、好奇心、逻辑思维等等）
4. 做给业务帮忙的前端
5. 提升自己的工程师能力

## 工具推荐

### Arc Max

https://arc.net/max

arc 浏览器已经开始集成 AI 能力，目前有以下几个：

1. Ask on Page: 将传统的网页内搜索转为问答
2. 5 Second Preview：shift + hover 5 秒钟一个链接，Arc 就会使用 AI 总结该链接的内容生成预览
3. Ask ChatGPT: 在 Arc 的命令菜单里快捷调起 ChatGPT
4. Tidy Tab Titles：用 AI 自动重命名 Tab 标题
5. Tidy Downloads：用 AI 自动重命名下载的文件

### VSCode Port Forward

https://code.visualstudio.com/docs/editor/port-forwarding

VSCode 自带了内网穿透功能，可以将本地的开发服务映射到微软的域名上，这样即使测试手机没有与开发服务在同一局域网也访问本地的开发服务。

### documate 文档 ai 问答

https://documate.site/

开源的文档 ai 问答工具，看了下实现大概是分为三个部分：

1. cli 工具：项目文档变更时将文档转为向量数据存储
2. 后端服务：接收到对话请求时提取向量数据作为上下文传给 openai，再将 openai 的回复传给前端
3. UI 组件：问答组件的前端部分，目前有提供 Vue 的，后续会有 React 组件

总体上看项目并不复杂，把服务相关部分改为我们自己的东西其实就能直接用了。我们自己组内的文档慢慢转为 markdown 以后这种项目就能用上了。

有自己文档站或者博客的同学可以直接试试这个项目，因为不涉及自部署服务，使用比较方便。

### Hackreels

https://www.hackreels.com/

将 code 转为动画导出，有兴趣的同学可以试试。

也可以用 Keynote 的神奇移动实现。

### 生成一个好看的渐变

https://twitter.com/argyleink/status/1712872862460297553

- 4 radial gradients, 1 in each corner
- each with a relative size to the container
- after layering, they create a swirly effect

### Typeframes

https://www.typeframes.com/

创造卡点产品介绍视频

### 工程师软技能书单

https://addyosmani.com/blog/soft-skills-books/

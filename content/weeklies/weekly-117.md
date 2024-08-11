---
date: 2024-08-11
year: 2024
week: 32
episode: 117
---

## VSCode GitLab Workflow 插件适配旧版 GitLab

商店最新版本的 GitLab Workflow 插件要求 GitLab 版本为 16.1 及以上，而部分用户可能仍在使用旧版 Gitlab，可以安装旧版本插件（如 v3.80.0）实现兼容。

![](https://pocket.haydenhayden.com/blog/202408111452178.png)

## 推荐轻量办公鼠标 VXE R1 Pro Max

用了四年多的炼狱蝰蛇，最近滚轮滑动有点不跟手，开始以为是 Mac 系统的问题，突然想到可能是鼠标滚轮的问题，网上一查，发现原来是「回滚」问题。

正好换了 VXE R1 Pro Max，53g 的重量，用了就回不去。最重要的是 VXE 鼠标支持[网页驱动](https://hub.atk.pro/)，对 Mac 用户非常友好。199 的价格，性价比非常高。

## 流程图画板工具 Whimsical

画板工具现在越来越多了，比如 [Excalidraw](https://excalidraw.com/)、[Miro](https://miro.com/)、[Tldraw](https://tldraw.com/)、[FigJam](https://www.figma.com/figjam/)、[Draw.io](https://www.draw.io/) 等等。

Whimsical 是最近发现的一款工具，支持流程图、线框图、UI 原型、思维导图等，界面简洁，上手简单，非常适合快速绘制流程图。

相比单纯的白板工具，Whimsical 提供了非常便捷的流程图功能，比如可以非常方便地调整流程图的节点位置，以及添加注释等。同时还提供了很多额外的功能，比如在画板里嵌入表格、代码等等。

另外，Whimsical 还提供文档功能，能够在文档里嵌入画板。

目前我有个流程图的绘制，项目文档管理都迁移到 Whimsical 了，体验非常好。另外 Whimsical 个人版是免费的，有无限的画板数量，有兴趣的可以试试。

![](https://pocket.haydenhayden.com/blog/202408111508894.png)

## AI 代码编辑器 Cursor

最近 Cursor 挺火的，试用了四天，感觉非常强大，比 GitHub Copilot 好用很多。

之前用的各种 AI 代码工具，很多都能做到写一个 Todo List 应用，但这对我来说意义并不大，因为大部分程序员的日常工作不是从 0 到 1 写一个小型应用。

作为搬砖工，我们经常会在现有的项目基础上，修改一些功能，或者添加一些功能。而且我们的项目使用的技术栈并不一定非常通用。我们需要 AI 能够阅读现有项目代码，在学习现有代码的基础上，帮助我们完成功能迭代。

这就要求 AI 能够获取更多的上下文信息，而 Cursor 在这方面做得比 GitHub Copilot 好很多。它不只能够获取选中的代码，打开的文件，甚至可以对整个项目进行分析，从而给出更加准确的建议。Cursor 的上下文很多，可以参考 [Cursor 官方文档](https://docs.cursor.com/context/codebase-indexing)。

下图是我的一个个人项目，采用了 Next.js，当我让他为我的项目增加暗色模式时，Cursor 能够根据我项目现有的代码结构，告诉我哪个文件应该怎么修改。这个小功能我自己也能实现,但需要查阅文档并根据项目进行修改,会花费一些时间。而 Cursor 可以非常快速地完成这个任务。

![](https://pocket.haydenhayden.com/blog/202408111534593.png)

另外对于工作中的代码，我们有一个迭代了快两年的项目，代码量非常大，使用的是 [Pro Components](https://procomponents.ant.design/)，我可以让 Cursor 学习这个库的文档，在一些场景下可以指定 Cursor 根据这个库的文档给出代码提示。

![](https://pocket.haydenhayden.com/blog/202408111532329.png)

## JS 使用 decimal.js 进行高精度计算

这周出了一个线上问题，涉及到金额计算，一个课次价格是 3.3 元，购买 3 个课次，价格应该是 9.9 元，但实际计算结果是 9.899999999999999 元。

这个问题的原因是 JS 的 Number 类型在进行浮点数计算时会出现精度问题，使用 [decimal.js](https://github.com/MikeMcl/decimal.js/) 可以解决这个问题。

```js
import Decimal from 'decimal.js';

const price = new Decimal(3.3);
const quantity = new Decimal(3);
const total = price.times(quantity);
console.log(total.toNumber()); // 9.9
```
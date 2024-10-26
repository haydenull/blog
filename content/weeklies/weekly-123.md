---
date: 2024-10-26
year: 2024
week: 43
episode: 123
---

> [!note] 吐槽一下
> 公司搞了很形式主义的开发能力认证，刷了两周题，再加上国庆放假，所以周刊停了近一个月。

## Next.js 15 发布

https://nextjs.org/blog/next-15

nextjs 15 正式版发布，带来了很多变化：

- 启用 turbopak 替代 webpack
- 缓存行为改变：默认不再缓存 fetch 与 GET 请求
- 部分 API 改为异步，例如获取 `searchParams` `cookies`
- 新增 `Form` 组件
- Server Actions 安全性提升

## Writing system software: code comments. 笔记

http://antirez.com/news/124

文章介绍了代码中的注释类别：
- Function comments
	- 解释函数的作用，类比为 api，用户看到注释就能明白函数的作用，不需要再阅读实现细节
- Design comments
	- 位置通常在一行代码之上，解释代码为什么这么设计，用了什么算法或技巧，代码如何实现的。
- Why comments
	- 解释代码执行某些操作的原因。比如一些业务上的逻辑导致的特殊写法，为了规避特定bug采用的针对性方案等。
- Teacher comments
	- 无关代码运行的一些领域之外的知识。比如代码中用到的数学 计算机图形学 复杂的数据结构等。
- Checklist comments
	- 比如当你增加一个 type，必须相应地再去去某个文件的某个地方做对应的操作，就可以使用注释说明。（当前我们在代码设计上应当尽量避免这种情况，但是总有不得以的时候）
- Guide comment
	- 简略地告诉阅读者一块代码的作用
- Debt comment
	- 技术债 `TODO FIX`
- Backup Comment
	- 用注释保留旧版本代码，通常在开发中调试新代码但不确定新代码是否有效时使用。注意不要将 backup comment 推送到 git。

## iPhone 使用体验优化

1. 搭配一个支持快充的充电宝，解决续航和充电速度的问题。
2. 实现边听小说边玩游戏，戴上耳机，听小说，切到游戏，双击耳机继续播放。
3. 加快长按动作的识别速度，从设置-辅助功能-触控-辅助触控，将辅助触控的响应速度设置为最快。
4. 加快 airpods 长按的识别速度，操作与3类似，但是设置的位置是 airpods 的设置里。

## DualSubs 双语字幕

https://dualsubs.github.io/

一个开源的双语字幕工具，利用 QuantumultX 等软件代理网络请求，实现 YouTube 等 App 双语字幕显示。

<img src="https://pocket.haydenhayden.com/blog/202410261801442.jpeg" alt="dualsubs" width="340" />

## Excalidraw CJK 字体支持手写样式

这么多年了，Excalidraw 终于支持 CJK 字体的手写样式了。

<img src="https://pocket.haydenhayden.com/blog/202410261805658.png" alt="excalidraw" width="340" />

## WebStorm 非商业用户免费

[](https://x.com/WebStormIDE/status/1849447048828842234)

## napkin AI 绘图工具

https://www.napkin.ai/

一个 AI 绘图工具，但是主要用于 ppt 或者文章中的配图，可以根据一段文字，生成解释性的配图，提供免费方案，目前处于 Beta 阶段，Pro 功能也免费。

![](https://pocket.haydenhayden.com/blog/202410261812141.png)

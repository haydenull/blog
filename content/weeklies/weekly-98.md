---
title: 十五周刊 - 98
description: 2023 第 47 周周报
date: 2023-11-26T17:14:00+08:00
slug: weekly-98
year: 2023
week: 47
episode: 98
tags:
  - Weekly
  - Local First
---



## PAC 人格结构理论

PAC 人格结构理论认为人有三种不同的自我状态,分别是:

1. Parent 父母
   - 养育型父母 （包容、支持）
   - 控制型父母 （权威，坚定）
2. Adult 成人 （理性）
3. Child 儿童
   - 自由型儿童 （创造、自我）
   - 适应性儿童 （服从）

像我自己成人以及适应性儿童占比比较高，对应平时的表现也是更在乎他人的感受，不会拒绝。

学会释放不同的自我，来应对不同的情况。

比如如何拒绝他人可以分以下几个步骤：

1. 成人自我（理性认识拒绝不等于别人会否定我，不等于关系破裂）
2. 养育型父母自我（表示对对方的理解）
3. 自由型儿童自我（表达自己的难处）
4. 控制型父母自我（坚持拒绝）

## Local First 软件如何在多用户多设备间同步数据

Chatgpt 套壳软件 [Prompta](https://github.com/iansinnott/prompta)，支持多设备同步聊天记录，从代码上看使用的是 [cr-sqlite](https://github.com/vlcn-io/cr-sqlite)。

> SQLite compiled to WASM running in the browser using CRDTs for conflict-free replication.

这是一个支持 CRDTs 的 SQLite，所以可以天然地支持多设备多用户协作。

这里是一个线上演示：https://vite-starter2.fly.dev

[](https://www.youtube.com/watch?v=QJBQLYmXReI)

用户的操作都会序列化并存储在本地，联网时这些操作会同步到另一台机器上，同时利用 CRDTs 自动解决冲突保证数据的一致性。

但这要求两台机器同时在线，也就是说一台机器发送消息的时候，另一台必须在线，然后接收到消息再存到自己的本地上。

那么如果另一台恰好离线，或者用户新增了一台设备呢？这就要求软件需要提供一个中心化的服务器，它会存储全量的数据，这样任意一台机器都可以在任意时间同步到完整的数据。

这样的方案与传统软件的区别是什么呢？

1. 用户的数据存储在本地上，及时网络故障，甚至软件服务商倒闭，都不影响现有应用的使用，唯一的问题是无法使用中心服务器在多设备上同步，但基于 P2P 网络，还是可以通过 WiFi 或者蓝牙等协议实现多设备同步。
2. 所有用户数据都可以加密后存储在中心服务器上，只有用户自己的机器可以解密，及时中心服务器被攻击，也不会泄露用户隐私。

## 爱发电获得第二笔赞助

![](https://pocket.haydenhayden.com/blog/202311261915636.png?x-oss-process=image/resize,w_400,m_lfit)

目前为止爱发电赞助上线 27 天，都到了两笔赞助，第一笔 150，第二笔 300。

还蛮开心的。

## 推荐大家看大佬们直播写代码

Anthony 直播写代码：https://www.youtube.com/watch?v=49WXr6kVBVI

日常看文章，看视频都是针对某个或某些知识点的，看直播写代码，可以近距离看到很多其他的东西，比如大佬们的 IDE 配置、快捷键设置还有一些其他的开发习惯，遇到问题的解决思路等等，是一种挺新的感受。

## 我做了什么

### Agenda Filter 自定义颜色并显示在卡片上

![](https://pocket.haydenhayden.com/blog/202311261926128.png?x-oss-process=image/resize,w_400,m_lfit)

上周增加了 Filter 可以筛选全局的任务数据，这次迭代完善了 Filter 功能，增加了自定义颜色，并且在卡片上显示 Filter 信息。

Agenda 的默认行为是按任务所属页面作为任务分组的依据，这次更新后可以完全使用 Filter 替代默认的分组方式。

用户可以充分发挥 logseq 双链笔记的特性，随意记录任务，然后通过 Filter 按自己的规则将他们组合起来。

### 解决积压的 issue

Agenda 上线到现在已经快两年了，积压的 issue 也有上百个，趁着 Agenda3 上线，统一梳理了一下这些 issue，关闭了一些已经解决的。并且加上了 action 管理。

[使用 Stale Action 管理 Github Issue](/posts/stale-action)

### 解决 emoji ics 问题

有个 [issue](https://github.com/haydenull/logseq-plugin-agenda/issues/254) 用户在上传的时候一直报 500，查下来是发现编码文件内容时失败了。最后定位到是在生成 ics 文件时出现了问题。

问题的原因是 [ics](https://github.com/adamgibbons/ics) 这个包在处理日历事件的名称时，会在第 75 个字符处强制换行。如果 emoji 恰好在这个位置就会出现问题，因为在 js 中一个 emoji 的长度是 2。

```js
// 原字符
'some text some text some text some text some text some text some text abc 🍅🍅🍅🍅'

// 处理后
some text some text some text some text some text some text some text abc �
�🍅🍅🍅
```

```js
"🍅".length; // => 2
"🍅a".slice(1); // => �a
```

可以引入 [runes2](https://www.npmjs.com/package/runes2) 解决。

```js
import runes from "runes2";

runes("🍅").length; // => 1
runes.substring("🍅a", 1); // => 'a'
```

详情可以查看这个 [PR](https://github.com/adamgibbons/ics/pull/258)

---
title: Quantumult X 配置及同步
description: Quantumult X 配置解析及利用 iCloud 实现多设备同步
date: 2023-11-19
slug: quantumult-x
tags:
  - GFW
  - Quantumult X
---

## Table of Contents

## 配置

### 服务 Server

Server 就是代理服务器，假如我们使用机场的订阅链接，那么 server_remote 里就可以填上该链接。通常订阅链接解析后会有很多个小的节点，比如香港、新加坡、美国等等。

![](https://pocket.haydenhayden.com/blog/202311191920830.png?x-oss-process=image/resize,w_400,m_lfit)

### 策略 Policy

策略是由多个节点组成的集合，另外也可以包含 `direct` `proxy` `reject` 这几个默认策略，同时还能包含其他的自定义策略。

:::tip
注意这里的 proxy 指的是在服务 Server 里选中的节点。
:::

比如我们自定义两个策略，一个叫节点选择，一个叫自动选择。顾名思义，节点选择策略是自己手动选择节点，自动选择策略依据延迟自动选择最快的节点。

![](https://pocket.haydenhayden.com/blog/202311191908637.png?x-oss-process=image/resize,w_1000,m_lfit)

节点选择的配置如下：

```
static=节点选择, 自动选择, direct, proxy, server-tag-regex=^(.(?!(网易|墨鱼|Traffic|Expire)))*$, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Star.png
```

- `static=节点选择` 表示策略的名字
- `自动选择, direct, proxy` 表示的是该策略内包含的其他策略
- `server-tag-regex=^(.(?!(Traffic|Expire)))*$` 表示的是用正则筛选出所有符合条件的节点，这里过滤了 Traffic 和 Expire 两个节点，因为这两个是机场用来表示流量使用及过期时间的。
- `img-url` 表示该策略使用的图标

图标可以参考以下仓库：

- https://github.com/Koolson/Qure
- https://github.com/Orz-3/mini

我自将常用的策略如下：
![](https://pocket.haydenhayden.com/blog/202311191938550.png?x-oss-process=image/resize,w_400,m_lfit)

- 节点选择：手动选择节点
- 自动选择：测速自动选择延迟最低的节点，但是这个策略会导致 ip 经常变动，一般不用
- 哔哩哔哩：内部会包含节点选择策略，同时也包含全量节点，方便换区
- 国外媒体：这个一般会导入到节点选择策略
- OpenAI：这里是几个相对纯净的美国节点
- 全球直连：直连
- 全球加速：一般会导流到节点选择
- 全球拦截：一般就用 reject，拦截广告用
- 兜底分流：一般也会导流到节点选择，针对分流规则未捕捉到的请求走这个策略

这么一套下来，平时只需要关注节点选择这个策略，就能控制大部分的网络请求，针对 OpenAI 等需要特定节点的再走各自的策略。

### 分流规则 Filter

分流规则分为 local 和 remote 两种。

我这边是从[墨鱼](https://github.com/ddgksf2013)的配置里复制出来的 remote 部分加上自己定制的一些 local 规则。

分流的主要作用就是判断一个请求应该使用什么策略发送。

假如我们有一个策略名为 OpenAI，最近 ChatGPT 新增了一个域名 `oaistatic.com`，那么我们需要让这个域名的请求都走 OpenAI 策略。

```
host-suffix, oaistatic.com, OpenAI
```

- `host-suffix` 表示规则类型为 host-suffix, 请求的域名以 `oaistatic.com` 结尾即可命中
- `OpenAI` 表示策略名

上面演示的仅仅是 `filter_local` 的一个示例。

当我们使用远程规则时，一个链接往往是一组规则的集合:

```
https://raw.githubusercontent.com/ddgksf2013/Filter/master/OpenAi.list, tag=OpenAI, force-policy=OpenAI, update-interval=172800, opt-parser=true, enabled=true
```

- `https://raw.githubusercontent.com/ddgksf2013/Filter/master/OpenAi.list` 表示远程规则的链接
- `tag=OpenAI` 表示远程规则的名字
- `force-policy=OpenAI` 表示强制将这个远程规则的策略转为 OpenAI
- `update-interval=172800` 表示远程规则的更新时间

## iCloud 同步

我的日常设备是两台 Mac，一台 iPad，一台 iPhone。使用 iCloud 同步可以达到任意一台修改配置，所有设备都共享。

### 打开 iCloud

在其他设置里打开 iCloud 云盘。

![](https://pocket.haydenhayden.com/blog/202311191950660.png?x-oss-process=image/resize,w_400,m_lfit)
![](https://pocket.haydenhayden.com/blog/202311191951766.png?x-oss-process=image/resize,w_400,m_lfit)

### 选择 iCloud 文件

在设置中选择 iCloud 文件。

![](https://pocket.haydenhayden.com/blog/202311191953937.png)

然后所有的配置更改都会同步到 iCloud。所有设备都共享这个配置文件。

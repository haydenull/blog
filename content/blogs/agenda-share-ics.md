---
title: Agenda 分享 ics 订阅
description: 使用私有 github 仓库及 Cloudflare Worker 实现私人 ics 订阅
date: 2023-11-01
cover: https://pocket.haydenhayden.com/blog/202404151320279.jpg
tags:
  - ics
  - Agenda
---

![](https://pocket.haydenhayden.com/blog/202311011926953.png)

## 现状

我使用本地软件 logseq 做笔记以及任务管理，一直有一个比较大的痛点：没办法随时随地查看任务。

之前的解决方案是把任务同步到 todoist 上，但是这个方案不太完美，因为我会在家以及公司两台设备上使用 logseq，而他们都同步到一个 todoist 中，不可避免有时候会冲突。使用 todoist 还有一个问题是目前 todoist 并没有日历视图，无法满足需求。

## 解决

### 方案1：搭建服务器

搭建一个服务器，允许用户将任务数据存储到这里。服务器提供一个订阅链接，收到请求时从读取数据生成 ics 文件返回。

这个方案能解决问题，但是比较复杂。Agenda 目前是一个纯前端方案的插件，单独为了这一个小功能上一整套的后端服务投入有点大。

况且想做到这个，势必得配套上用户注册登录系统等等，且数据保存在 Agenda 的服务器中，logseq 用户有很多是看中隐私安全，对自我掌控数据是有要求的，这种方案目前并不适合。

### 方案2：使用云盘等现有公共存储

想要用户自己掌握数据，又能支持公共访问，那最合适的就是各种云盘了。

最开始也考虑过 webdav 这种方案，但是一来有很多国内的云盘不支持，二来技术实现比较复杂，也可能存在需要处理冲突的情况。

从 Github 上那些中国节假日 ics 订阅的仓库看，用 Github 仓库保存用户的 ics 文件是个不错的选择，可以用 raw 路径读取仓库的文件。但是需要解决用户隐私的问题，毕竟个人的任务数据肯定不能放到公开仓库里。

逛 V 站的时候无意中看到有人使用 Cloudflare Worker 配合 Github 私有仓库做图床，原来 Github 是有完整的 Restful API 的，只需要借助用户 Token 就能访问私有仓库。

## 实现

Github 方案既能保证用户隐私，又能让用户自己掌控数据，同时也免费，无疑是目前最好的选择。

为什么需要 Cloudflare Worker 呢，因为我们要实现在任意支持 ics 订阅的第三方软件访问订阅链接，

完整的功能应该包括：

1. 用户点击按钮，在前端生成ics文件，然后通过 Github API 上传到指定仓库
2. 访问订阅链接，通过 API 配合 token 读取文件，返回给第三方日历软件

### 数据上传

这部分比较好做，在 Agenda 前端生成 ics 文件，再通过 Github API 上传即可。

我使用 [ics](https://github.com/adamgibbons/ics) 这个库生成 ics 文件。处理时将事件分为三类：

1. 多天事件：注意 iCalendar 规范，结束日期是不包含在内的，也就是说一个多天事件的日期是 `11月1日-到11月3日`，那么传递给日历的必须是 `11月1日-11月4日`。
2. 单天事件：传递给 ics 的 start 和 end 都是只有日期信息的数组，例如 2023年11月1日：`[2023, 11, 1]`
3. 时间点事件：ics 需要的是 start 和 duration，注意 duration 和 end 是冲突的，不要同时传，例如 `{start: [2023, 11, 1, 10, 0], duration: {minutes: 30}}`，代表 2023年11月1日上午10点开始，持续时间30分钟

<!-- https://icalendar.org/validator.html#results -->

生成 ics 文件以后，就可以通过 Github API 上传文件到仓库了，但是考虑国内的网络情况，我这里使用 Cloudflare Worker 中转了一下。

这里代码比较简单，需要注意的是 Github API 要求请求必须有 UserAgent Header，手动造一个就行。另外 Github API 要求用 base64 格式传递文件，用户的输入可能存在特殊字符，需要编码一下： `btoa(unescape(encodeURIComponent(fileContent)))`

### 订阅链接

接下来就是通过订阅链接获取 ics 文件内容了。

链接里携带了仓库及 token 信息。

在 Cloudflare Worker 里接受到请求后，通过 Github API 获取到链接内容，再解码返回即可。因为必须在云端通过 token 获取私有仓库文件内容，所以必须有这么一个 Cloudflare Worker。

解码的过程就是上一步编码步骤反过来：`atob(decodeURIComponent(escape(fileContent)))`

生成链接后建议使用 [iCalendar validator](https://icalendar.org/validator.html) 校验一下有没有错误。

另外提示下 Google Calendar 订阅会缓存同一个链接的结果，也就是说当你的订阅链接返回的结果有部分小错误时，接下来几个小时同一个链接会一直有这个错误，即使你修复了也没用。我就是因为有两个任务的循环信息部分格式错误，导致在 Google Calendar 一直上不显示循环任务，其实我很早就已经修复了。

### Cloudflare Worker 完整代码

至此整个过程就结束了，以下是完整的 Cloudflare Worker 代码，用户可以使用此代码自部署，而无需依赖 Agenda 的服务。

```js
const USER_AGENT = "Agenda ICS Cloudflare Worker";
const allowedOrigins = ["https://agenda.haydenhayden.com"];

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const rawOrigin = request.headers.get("Origin");
  if (rawOrigin && !allowedOrigins.includes(rawOrigin)) {
    return new Response(`Forbidden Origin ${request.headers.get("Origin")}`, {
      status: 403,
    });
  }
  const url = new URL(request.url);

  if (request.method === "GET") {
    const queryParams = url.searchParams;
    const repoName = queryParams.get("repo");
    const token = queryParams.get("token");

    if (!repoName || !token) {
      return new Response("Missing required parameters", { status: 400 });
    }

    const apiUrl = `https://api.github.com/repos/${repoName}/contents/agenda.ics`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "User-Agent": USER_AGENT,
    };

    const response = await fetch(apiUrl, {
      headers,
    });

    if (response.ok) {
      const fileData = await response.json();
      const fileContent = atob(fileData.content);
      return new Response(decodeURIComponent(escape(fileContent)));
    } else {
      return new Response("Failed to retrieve file content", {
        status: response.status,
      });
    }
  } else if (request.method === "POST") {
    const body = await request.json();

    const repoName = body.repo;
    const token = body.token;
    const fileContent = body.file;

    if (!repoName || !token || !fileContent) {
      return new Response("Missing required parameters", { status: 400 });
    }

    const apiUrl = `https://api.github.com/repos/${repoName}/contents/agenda.ics`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
    };

    const existingFileResponse = await fetch(apiUrl, {
      headers,
    });

    const existingFileData = await existingFileResponse.json();

    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    });

    const payload = {
      message: `[Agenda]: update agenda.ics ${timestamp}`,
      content: btoa(unescape(encodeURIComponent(fileContent))),
      encoding: "utf-8",
    };

    if (existingFileData.sha) {
      payload.sha = existingFileData.sha;
    }

    const fileResponse = await fetch(apiUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    });

    console.log("fileResponse", JSON.stringify(fileResponse));

    const response = fileResponse.ok
      ? new Response("File upload successful")
      : new Response("File upload failed", { status: fileResponse.status });
    response.headers.set("Access-Control-Allow-Origin", rawOrigin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.append("Access-Control-Allow-Headers", "Content-Type");
    return response;
  } else {
    return new Response("Unsupported request method", { status: 405 });
  }
}
```

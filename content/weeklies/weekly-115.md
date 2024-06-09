---
date: 2024-06-09
year: 2024
week: 23
episode: 115
---

## wakatime 服务开源替代

[WakaTime](https://wakatime.com/) 是一个开发者时间追踪服务，可以记录你在各种编辑器中的代码时间，以及你在各种项目中的时间分布。

WakaTime 的前端部分是开源的，但是后端部分是私有的。如果你想自己搭建后端服务，可以使用 [wakapi](https://github.com/muety/wakapi) 或者 [hakatime](https://github.com/mujx/hakatime)。

我目前使用 docker-compose 部署了 wakapi。配置文件如下：

```yaml
version: '3.7'

services:
  wakapi:
    container_name: wakapi
    image: ghcr.io/muety/wakapi:latest
    restart: always
    ports:
      - 5340:3000
    environment:
      WAKAPI_PASSWORD_SALT: 'your_salt'
    volumes:
      - ~/.wakapi/data:/data
```

部署可能遇到无法连接 sqlite 数据库的问题，可以参考 [这个 issue](https://github.com/muety/wakapi/issues/471)。

![](https://pocket.haydenhayden.com/blog/202406091837088.png)

## GitLab CI/CD 缓存 npm

在 GitLab CI/CD 中，可以使用 `cache` 关键字缓存 npm 依赖，加快构建速度。对于 yarn 和 pnpm 可以使用以下配置。

### pnpm

```yaml
build:
  before_script:
    - pnpm config set store-dir .pnpm-store
  script:
    - pnpm install --frozen-lockfile
  cache:
    key:
      files:
        - pnpm-lock.yaml
    paths:
      - .pnpm-store
```

### yarn

```yaml
build:
  before_script:
    - yarn config set yarn-offline-mirror $PWD/.yarn-cache #这里需要加 $PWD
    - yarn config set yarn-offline-mirror-pruning true
  script:
    - yarn install --frozen-lockfile
  cache:
    key:
      files:
        - yarn.lock
    paths:
      - .yarn-cache
```

## Chrome 内置大模型

## mac 阻止 wps 打开 pdf

安装 WPS 后，pdf 文件时会默认使用 WPS 打开，鼠标右键修改打开方式只会修改当前文件。

如果需要修改所有 pdf 文件的打开方式，可以在文件详情里设置。

<img src="https://pocket.haydenhayden.com/blog/202406091857213.png" width="300" />

## react-rough-fiber

将 SVG 转为手绘风格的 React 组件。

https://github.com/Bowen7/react-rough-fiber

![](https://pocket.haydenhayden.com/blog/202406092050895.png)

## 豆包

https://www.doubao.com/download/desktop

![](https://pocket.haydenhayden.com/blog/202406092055943.png)

抖音出品的 AI 助手，有网页版，浏览器插件，桌面版。目前是免费的，自带了网页总结，网页沉浸式翻译，RAG 搜索，全局快捷唤醒等功能。

交互体验做得很好，但是回答的效果不是很好，RAG 搜索似乎内容源基本都是国内的，所以结果质量不够好。

但是毕竟免费，而且沉浸式翻译，pdf 阅读，网页总结等功能还是很不错的。在 OpenAI 的客户端出来之前，可以试试豆包。

## TotalPause 休息提醒工具

https://apps.apple.com/us/app/totalpause/id6482185943

从 [V2EX](https://www.v2ex.com/t/1047816) 上看到的一个休息提醒工具。以前类似的的工具都是类似番茄钟的思路，定时一段时间后提醒你休息。这个工具是自动检测键盘鼠标的活动情况，自行判定是否处于工作状态，自动计时提醒。

无需手动计时，无需设置时间，自动检测，自动提醒，非常方便。

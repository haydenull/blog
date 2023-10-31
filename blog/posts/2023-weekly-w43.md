---
layout: Post
title: 2023 第 43 周周报
subtitle: 第 43 周周报
author: Haydenull
date: 2023-10-31
useHeaderImage: true
headerImage: https://pocket.haydenhayden.com/blog/202302030851669.png
headerMask: rgba(14, 21, 5, .2)
permalinkPattern: /post/:year/:month/:day/:slug/
tags:
  - 周报
---

## 使用 [vercel](https://vercel.com/) + [supabase](https://supabase.com) 自部署 [umami](https://umami.is/) 统计工具

umami 是一个 Google Analytics 的一个开源替代，支持自部署。

本次使用 vercel 部署前端及服务端，使用 supabase 作为数据库。顺便提一局，supabase 也是支持自部署的。

### 1. 准备 supabase 数据库

:::warning
创建数据库时需要记住数据库密码，这个在后面会用到
:::

![](https://pocket.haydenhayden.com/blog/202310310834336.png)

复制数据库的 URI 地址备用，注意将密码替换到到 URI 中。

### 2. Fork [umami](https://github.com/umami-software/umami) 仓库

打开 https://github.com/umami-software/umami 创建一个 fork 仓库。

### 3. 创建 Vercel 项目

创建时选择导入刚刚 fork 的项目。

并添加环境变量，变量名为 `DATABASE_URL`，值为 supabase 的 URI 地址拼接上 `?pgbouncer=true`

![](https://pocket.haydenhayden.com/blog/202310310839864.png)

### 4. 部署

点击 Deploy 按钮即可部署。

接下来访问 Vercel 分配的域名即可访问。

初始账户为 `admin`，密码为 `umami`。具体可见文档 [Login](https://umami.is/docs/login)。

## 使用 docker-compose 自部署思源笔记

本周经历了语雀长达 7 小时宕机，还是想把自己的笔记数据掌握在自己手里，综合看了下线上笔记工具支持自部署的并不多，目前看来思源还不错，我大部分笔记在本地的 logseq 上，线上笔记不需要复杂的功能，思源可以满足我的需求。

我自己的 vps 上已经搭建了 portainer 以及 nginx proxy manager, 所以部署一个 docker 服务很方便，而思源官方提供了 docker 镜像，我就直接使用了。

### 部署 Docker
docker-compose 文件如下：

```yml
version: '3'

services:
  siyuan:
    image: b3log/siyuan:latest
    container_name: siyuan
    restart: always
    volumes:
      - /siyuan/workspace:/siyuan/workspace
    command: --workspace=/siyuan/workspace/ --accessAuthCode=你自己密码
    ports:
      - 5310:6806
    user: '1000:1000'
```

按照这个配置，思源会将数据存储到 /siyuan/workspace/ 目录下。[官方文档](https://hub.docker.com/r/b3log/siyuan)有提到用户权限的问题。

> 镜像中是使用默认创建的普通用户 siyuan（uid 1000/gid 1000）来启动内核进程的，所以在宿主机创建工作空间文件夹时请注意设置该文件夹所属用户组：chown -R 1000:1000 /siyuan/workspace，在启动容器时需要带参数 -u 1000:1000。

真正启动 docker 可能有权限错误：

`siyuan | E 2023/10/24 08:48:18 working.go:247: create os tmp dir [/siyuan/workspace/temp/os] failed: mkdir /siyuan/workspace/temp: permission denied`

ChatGPT 给出了以下三种方案：

:::tip
出现权限被拒绝的错误信息是因为容器内的用户（ID为1000）没有足够的权限在`/siyuan/workspace`目录下创建临时文件夹。

有几种解决办法可以尝试：

1. 确保主机上的`/siyuan/workspace`目录具有足够的权限，以便容器内的用户可以在其中进行读写操作。可以使用以下命令更改主机上目录的权限：

   ```shell
   chmod -R 777 /siyuan/workspace
   ```

   这将赋予目录及其内容所有人读写执行权限。请注意，这是一种快速但不太安全的解决方法，可能会导致潜在的安全风险。

2. 将docker-compose配置文件中的用户ID和组ID更改为匹配主机上具有正确权限的用户和组的ID。首先，通过运行以下命令获取主机上希望分配给容器的用户和组的ID：

   ```shell
   id -u
   id -g
   ```

   然后，将docker-compose配置文件中的`user`字段更改为相应的值。例如，如果上述命令分别返回`1001`和`1002`，则docker-compose配置文件应将`user`字段更改为`1001:1002`。

   ```yaml
   user: '1001:1002'
   ```

   保存并重新启动容器。

3. 作为临时解决方法，可以为容器配置更宽松的权限。将docker-compose配置文件中的`volumes`字段更改为以下格式：

   ```yaml
   volumes:
     - /siyuan/workspace:/siyuan/workspace:rw
   ```

   这将为容器中的用户提供读取和写入`/siyuan/workspace`目录的权限。请注意，这也会增加安全风险，因为容器内的进程可以更改主机上的文件。

尝试上述解决办法之一，并确保容器内的用户具有适当的权限以在`/siyuan/workspace`目录下进行操作。
:::

### 自定义域名

使用 Nginx 代理需要注意思源有一个 websocket 服务需要反代 `/ws` 路由。否则密码认证会失败。

```
location /ws {
    proxy_pass http://172.17.0.1:5310; 
    proxy_read_timeout 60s;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'Upgrade';
 }  
```

这里的 ip 以及端口号需要根据自己的实际情况修改。

<!-- ## Agenda 3 实现分享订阅日历 -->

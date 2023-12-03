---
title: 自建 syncthing 服务
description: 使用 docker 自建 syncthing 发现服务与中继服务
author: Haydenull
pubDatetime: 2023-12-03T20:08:00+08:00
postSlug: syncthing-self-host
tags:
  - syncthing
  - sync
  - p2p
---

## 背景

目前使用 Git 同步两台电脑的 Logseq 笔记，偶尔会忘记点 push。研究了一下 syncthing，采用 P2P 的方式同步文件，开源安全，所以想试试。

根据之前的调研，P2P 同步方案需要两个设备在同一局域网下且同时在线，这样才能直接通过局域网同步，否则需要通过中继服务器同步。

幸运的是 syncthing 提供了公共的中继服务器，而且也支持自建。

## 使用 docker-compose 部署 syncthing 服务

syncthing 需要两个服务：

- 发现服务
- 中继服务

docker-compose.yml 如下：

```yaml
version: "3"
services:
  # 自建syncthing的发现服务器 discovery-server
  syncthing_discovery_server:
    image: syncthing/discosrv
    container_name: syncthing-discovery-server
    command: -debug -listen=":8443"
    environment:
      - PUID=1000
      - PGID=1000
    volumes:
      - ./syncthing/discosrv:/var/stdiscosrv
    ports:
      - 8443:8443 # Listen address (default “:8443”)
    restart: always

  # 自建syncthing的中继服务器 syncthing-relay-server
  syncthing_relay_server:
    image: syncthing/relaysrv:latest
    container_name: syncthing-relay-server
    command: -debug -pools="" -listen=":22067"
    environment:
      - PUID=1000
      - PGID=1000
    volumes:
      - ./syncthing/strelaysrv:/var/strelaysrv
    ports:
      - 22067:22067 # 中继服务器的数据连接端口（必须开启）
      #- 22070:22070  # 用于公用的中继服务器池，显示数据传输、客户端数量等状态，可不开启
    restart: always
```

启动后，查看日志记录下发现服务的 ID 和 中继服务的 ID。

发现服务 ID
![](https://pocket.haydenhayden.com/blog/202312032020052.png?x-oss-process=image/resize,w_1000,m_lfit)

中继服务 ID
![](https://pocket.haydenhayden.com/blog/202312032021728.png?x-oss-process=image/resize,w_1000,m_lfit)

## 配置 syncthing 客户端

以 mac 客户端为例，启动后打开 UI 界面，点击右上角操作 -> 设置按钮，进入设置界面。

选择连接 Tab。

![](https://pocket.haydenhayden.com/blog/202312032026041.png?x-oss-process=image/resize,w_1000,m_lfit)

- 协议监听地址：
  即为中继服务地址，推荐为

```
default,relay://<服务器 IP>:22067/?id=<中继服务 ID>
```

- 全局发现服务器：
  即为发现服务地址，推荐为

```
default,https://<服务器 IP>:8443/?id=<发现服务 ID>
```

这里的 default 是可选的，意思是使用默认的中继服务器池和发现服务器池，如果不加 default，就是只使用自建的中继服务器和发现服务器。

保存配置后，点击侦听程序的数字，看到自己的中继服务就代表配置成功了。

![](https://pocket.haydenhayden.com/blog/202312032035222.png)

![](https://pocket.haydenhayden.com/blog/202312032032414.png)

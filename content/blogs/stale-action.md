---
title: 使用 Stale Action 管理 Github Issue
description: 使用 Stale Action 自动关闭不活跃的 Github Issue
date: 2023-11-26
slug: stale-action
tags:
  - Github
---

## Table of Contents

## 背景

Agenda 上线快两年了，Open 和 Close 的 issue 都超过了 100。大部分 issue 是功能请求，有些已经在 Agenda3 实现了，有些干脆不打算做了。

找了个时间一一回复了 issue，但是由于一些 issue 时间比较久远了，可能短时间内无法得到回复，所以打算引入 [Stale Action](https://github.com/actions/stale)，自动关闭不活跃的 issue。

## 引入 Stale Action

创建 `.github/workflows/stale-issues.yml` 文件，并配置如下：

```yaml
name: Stale Issues Policy
on:
  schedule:
    - cron: "0 0 * * *" # Run at 00:00 UTC every day
  workflow_dispatch:

permissions:
  contents: read
  issues: write # for actions/stale to close stale issues

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
```

## 标记并关闭不活跃的 issue

```yaml
jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - name: "🧹 Mark & close stale issues"
        uses: actions/stale@v8.0.0
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          stale-issue-label: "automatic-stale"
          close-issue-label: "automatic-closing"
          exempt-issue-labels: "enhancement, feature-request, upstream, hold"
          stale-issue-message: |
            Hi There! 👋

            This issue has been marked as stale due to inactivity for 60 days.

            We would like to inquire if you still have the same problem or if it has been resolved.

            If you need further assistance, please feel free to respond to this comment within the next 7 days. Otherwise, the issue will be automatically closed.

            We appreciate your understanding and would like to express our gratitude for your contribution to Agenda. Thank you for your support. 🙏
```

| 参数                  | 描述                            |
| --------------------- | ------------------------------- |
| `stale-issue-label`   | 标记不活跃的 issue 使用的标签名 |
| `close-issue-label`   | 关闭不活跃的 issue 使用的标签名 |
| `exempt-issue-labels` | 排除使用此标签的 issue          |
| `stale-issue-message` | 标记时使用的消息                |

stale action 默认的超时时间是 60 天，也就是 60 天内没有回复的 issue 就会被标记为不活跃。标记后如果在 7 天内没有回复，issue 就会被关闭。

![](https://pocket.haydenhayden.com/blog/202311262048283.png)

这里我们设置了 `exempt-issue-labels`，是因为像一些需求类的 issue 以及某些 bug 暂时没有头绪没回复，这些 issue 不应该自动关闭。

## 让部分 issue 加速过期

```yaml
- name: "🧹 Close stale awaiting response issues"
  uses: actions/stale@v8.0.0
  with:
    repo-token: ${{ secrets.GITHUB_TOKEN }}
    days-before-issue-stale: 40
    stale-issue-label: "automatic-stale"
    close-issue-label: "automatic-closing"
    only-labels: "awaiting response"
    stale-issue-message: |
      Hi There! 👋

      This issue has been marked as stale due to inactivity for 40 days.

      We would like to inquire if you still have the same problem or if it has been resolved.

      If you need further assistance, please feel free to respond to this comment within the next 7 days. Otherwise, the issue will be automatically closed.

      We appreciate your understanding and would like to express our gratitude for your contribution to Agenda. Thank you for your support. 🙏
```

| 参数                      | 描述                                |
| ------------------------- | ----------------------------------- |
| `days-before-issue-stale` | 设置过期时间                        |
| `only-labels`             | 只对含有此处指定的标签的 issue 生效 |

对于部分 issue，我们不想等待 60 天那么久，可以打上特定标签，然后设置一个更短的过期时间。

## 完整代码

```yaml
name: Stale Issues Policy
on:
  schedule:
    - cron: "0 0 * * *" # Run at 00:00 UTC every day
  workflow_dispatch:

permissions:
  contents: read
  issues: write # for actions/stale to close stale issues

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - name: "🧹 Mark & close stale issues"
        uses: actions/stale@v8.0.0
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          stale-issue-label: "automatic-stale"
          close-issue-label: "automatic-closing"
          exempt-issue-labels: "enhancement, feature-request, upstream, hold"
          stale-issue-message: |
            Hi There! 👋

            This issue has been marked as stale due to inactivity for 60 days.

            We would like to inquire if you still have the same problem or if it has been resolved.

            If you need further assistance, please feel free to respond to this comment within the next 7 days. Otherwise, the issue will be automatically closed.

            We appreciate your understanding and would like to express our gratitude for your contribution to Agenda. Thank you for your support. 🙏

      - name: "🧹 Close stale awaiting response issues"
        uses: actions/stale@v8.0.0
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          days-before-issue-stale: 40
          stale-issue-label: "automatic-stale"
          close-issue-label: "automatic-closing"
          only-labels: "awaiting response"
          stale-issue-message: |
            Hi There! 👋

            This issue has been marked as stale due to inactivity for 40 days.

            We would like to inquire if you still have the same problem or if it has been resolved.

            If you need further assistance, please feel free to respond to this comment within the next 7 days. Otherwise, the issue will be automatically closed.

            We appreciate your understanding and would like to express our gratitude for your contribution to Agenda. Thank you for your support. 🙏
```

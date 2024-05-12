---
date: 2024-05-12
year: 2024
week: 19
episode: 113
---

## 帮小忙-在线工具箱

https://tool.browser.qq.com/

腾讯 QQ 浏览器在线工具箱, 里面有很多实用的工具，比如图片压缩、视频转码、PDF 转换等。

![](https://pocket.haydenhayden.com/blog/202405121918657.png)

## VSCode 4 月更新

### AI 重命名推荐

VSCode 在 4 月更新中全面支持了 AI 重命名推荐，这个功能可以帮助我们更快地重命名变量、函数等。之前这个功能只对小部分用户开放。

<video src="https://pocket.haydenhayden.com/blog/202405121938670.mp4" controls="controls" width="100%" height="auto"></video>

### 自定义标签

https://code.visualstudio.com/updates/v1_88#_custom-labels-for-open-editors

VSCode 支持根据路径自定义标签，在遇到多个相同文件名的文件时，可以更容易区分。

![](https://pocket.haydenhayden.com/blog/202405121952432.png)

## HackerNews 每日摘要

https://www.supertechfans.com/cn/

对 HackerNews 每日文章进行汇总，方便快速浏览。同时支持 RSS 订阅。

![](https://pocket.haydenhayden.com/blog/202405122001171.png?x-oss-process=image/resize,w_1000,m_lfit)

## SketchyBar 自定义 macOS 状态栏

https://github.com/FelixKratz/SketchyBar

![](https://pocket.haydenhayden.com/blog/202405122004748.png)

## V2EX 增加邀请码系统

https://www.v2ex.com/t/1037849

![](https://pocket.haydenhayden.com/blog/202405122012020.png)

V2EX 邀请码系统已经上线，每生成一个邀请码，需要消耗 1 个金币。

## FlexSearch

https://github.com/nextapps-de/flexsearch/

适用于浏览器和 Node.js 的全文搜索库，支持模糊搜索、多字段搜索等。


## unplugin-icons 在 nextjs 本地开发偶现无法找到文件

```
./_virtual_~icons%2Fstreamline%2Frss-symbol-solid.jsx
Error: ENOENT: no such file or directory, open '/Users/hayden/Code/DigitalWorld/blog/_virtual_~icons%2Fstreamline%2Frss-symbol-solid.jsx'
```

是一个好几年的 bug ，见此 [issue](https://github.com/unplugin/unplugin-icons/issues/206), 删除 `.next` 文件夹重新编译即可
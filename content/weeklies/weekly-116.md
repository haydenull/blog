---
date: 2024-06-23
year: 2024
week: 25
episode: 116
---

## Raycast Confetti Plugin

https://www.raycast.com/peduarte/1-click-confetti

快速生成撒花动画的插件，可以设置快捷键触发，也可以使用脚本触发。

```shell
# ~/.zshrc
alias confetti="open raycast://extensions/raycast/raycast/confetti"
```

<video controls src="https://pocket.haydenhayden.com/blog/202406231626775.mp4"></video>


## SEO Slug Generator

https://chatgpt.com/g/g-K51fVqxoo-seo-slug-generator

根据文章标题生成利于 SEO 的英文 slug。每次写博客都要花一些时间想 slug，有了这个插件就不用担心了。

## 开源手绘插画库 CocoMaterial

https://cocomaterial.com

![](https://pocket.haydenhayden.com/blog/202406231632736.png)

开源免费，提供 PNG SVG 格式下载。

## Scriptable

https://scriptable.app

<img src="https://pocket.haydenhayden.com/blog/202406231642192.png" width="500">

使用 js 定制 iOS Widget。对于会使用 JS 的开发者来说，这是一个很好的工具。我打算做一个 Widget 展示 Notion 里记账的数据，弥补 Notion 记账没有客户端的不足。

[Scriptable 脚本合集](https://github.com/Nicolasking007/Scriptable)


## swiftymenu

https://github.com/lexrus/SwiftyMenu

开源的 Finder 菜单增强工具。

![](https://pocket.haydenhayden.com/blog/202406231651266.png)

## 我做了什么

### slidev-addon-excalidraw

https://github.com/haydenull/slidev-addon-excalidraw

![](https://pocket.haydenhayden.com/blog/202406231653738.png)

今年开始使用 [Slidev](https://sli.dev/) 写 PPT，需要示意图时就用 Excalidraw 然后导出为图片嵌入。每次修改示意图后还需要重新导出再改文件名，非常麻烦。

本周花了大半天时间写了一个 [slidev addon](https://sli.dev/addons/use)，可以直接将 Excalidraw 的 json 文件转为 svg 插入到 slidev 中，同时支持定义暗色模式以及去除背景。

```md
---
layout: center
---
<div class="flex flex-col items-center">

# slidev-addon-excalidraw

<Excalidraw
  drawFilePath="./example.excalidraw.json"
  class="w-[600px]"
  :darkMode="false"
  :background="false"
/>

</div>
```
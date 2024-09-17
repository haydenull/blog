---
date: 2024-09-15
year: 2024
week: 37
episode: 121
---

## 制作 mac 应用图标文件 icns

https://cloud.tencent.com/developer/article/2154591

使用 mac 自带的命令行工具 `iconutil` 来制作 icns 文件。

![](https://pocket.haydenhayden.com/blog/202409171739613.png)

1. 准备 png logo 图，1024*1024 尺寸，命名为 `icon.png`
2. 新建 `icons.iconset` 文件夹
3. 生成不同尺寸要求的文件(sips 为 mac 自带工具)

<section>

```shell
sips -z 16 16 icon.png -o icons.iconset/icon_16x16.png 
sips -z 32 32 icon.png -o icons.iconset/icon_16x16@2x.png 
sips -z 32 32 icon.png -o icons.iconset/icon_32x32.png 
sips -z 64 64 icon.png -o icons.iconset/icon_32x32@2x.png 
sips -z 128 128 icon.png -o icons.iconset/icon_128x128.png 
sips -z 256 256 icon.png -o icons.iconset/icon_128x128@2x.png 
sips -z 256 256 icon.png -o icons.iconset/icon_256x256.png 
sips -z 512 512 icon.png -o icons.iconset/icon_256x256@2x.png 
sips -z 512 512 icon.png -o icons.iconset/icon_512x512.png 
sips -z 1024 1024 icon.png -o icons.iconset/icon_512x512@2x.png 
```

</section>

4. 生成 `icns` 文件

<section>

```shell
iconutil -c icns icons.iconset -o icon.icns 
```

</section>

## 用三体人脱水比喻 Next.js RSC

播客 [Next.js 是否成为独立开发者的首选框架](https://www.xiaoyuzhoufm.com/episode/66cc711056bfd3907a37f4e0)里面提到用三体人脱水比喻 Next.js RSC，觉得很有意思，很形象。

> 三体人可以脱水，用来适应恶劣的生存环境，在需要的时候注入水分，恢复活力。有点像 Next.js RSC，在服务端只有一个空壳，无法交互，传递到客户端后，在浏览器环境里浸泡，成为完整的客户端组件，可交互。

## neko Docker 中的浏览器

[](https://x.com/eastwoodnet/status/1821362392036692404)

## 11种时间管理法

[](https://x.com/huangyun_122/status/1810690408995065985)

![](https://pocket.haydenhayden.com/blog/202409171753916.png)

这张图介绍了常见的时间管理方法，比如番茄钟、GTD、看板等等。

## 《黑客与画家》读书笔记

<img src="https://pocket.haydenhayden.com/blog/202409171811248.png" alt="黑客与画家" width="300" />

7. **关注贫富分化**

<section>

孩子没有能力创造财富，他的一切来自别人给予，既然财富不要求对应的付出，当然应该平均分配。

技术在加大收入差距的同时，缩小了大部分的其他差距。

</section>

8. **设计者的品味**

<section>

如果品味只是一种偏好，那么每个人都是完美无缺的：你喜欢自己看上的东西。那就足够了。

好设计是简单的设计。

好设计是永不过时的设计。

好设计是解决主要问题的设计。

好设计是有点幽默性的设计。

好设计是模仿大自然的设计。

好设计是一种再设计。

</section>

9. **设计与研究**

<section>

「顾客永远是对的」，这是指评价优秀设计的标准是看它能够多大程度上满足用户的需求，而不是满足用户的一切要求。

</section>

## 《如何找到想做的事》读书笔记

<img src="https://pocket.haydenhayden.com/blog/202409171809243.png" alt="如何找到想做的事" width="300" />

1. **阻碍找到「想做的事」的5种误区**

<section>

找到想做的事并不意味着把它作为一生的事业，而是当作「现在最想做的事」

找到想做的事并不会有命中注定的感觉，刚开始也只是处于感兴趣的阶段

想做的事不一定是了不起的对大部分人有帮助的事，总会有与自己兴趣一致的人，那么做自己感兴趣的事最终也会帮助到这些人

我们已经有足够多的选项了，需要做的是了解自己，明确选择标准

寻找想做的事不用考虑能否成为工作，因为你想做的事一定有人已经在做了，可以向他们取经

</section>

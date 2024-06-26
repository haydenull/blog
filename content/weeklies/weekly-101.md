---
title: 十五周刊 - 101
description: 2023 第 50 周周报
date: 2023-12-17T18:44:00+08:00
slug: weekly-101
year: 2023
week: 50
episode: 101
tags:
  - Weekly
  - PARA
---



## VSCode Tips

1. shift + drag 可将图片文件拖到 markdown 文件内
2. `code --diff path/a path/b` 使用 VSCode 对比文件差异

## 间歇日记与柳比歇夫时间统计法

### 间歇日记 (Interstitial Journaling)

在每次任务切换时记录：

内容：

- 无论事情大小，想到就记
- 上一段时间做了什么
- 有什么想法收获
- 接下来计划做什么

好处：

- 清空大脑
- 无压力记笔记
- 产生天然的时间轴

缺点：

- 任务没有分类，记录轻松但不方便后续统计分析

### 柳比歇夫时间统计法

内容：

- 只记录重要的事情
- 记录任务耗时
- 记录任务分类（类别不宜多）
- 记录事件而不是场景
  - 在一个不重要会议上，摸鱼学习，应该记录的是学习而不是开会。开会是场景，其实并不重要，真正重要的是学习，这才是有意义的记录。
  - 记录的目的服务于加深分析自己的状态，以便修正，完成目标。千万不是为了事无巨细的记录而记录，不要追求完美

好处：

- 清空大脑
- 事件有更多的信息，可以作为统计分析依据。可以基于此自查自己的时间分配是否合理

缺点：

- 记录的压力大一些，需要回想花费的时间及分类
- 没有时间轴，不方便回顾

### 总结

两种方法各有优劣，我打算试试将他们结合起来。

在间歇日记的基础上，加上时间耗时。即保留间歇日记的无压力记录的优点，随意记录，但不加分类标签。

在每日 review 的时候，将间歇日记中的事件进行分类，然后记录耗时。这样就可以得到一个有时间轴的记录，也可以得到分类后的统计数据。

![](https://pocket.haydenhayden.com/blog/202312172029319.png?x-oss-process=image/resize,w_700,m_lfit)

## VSCode [Atom Material Icons](https://github.com/mallowigi/a-file-icon-vscode) 图标主题

这个主题的图标异常丰富，喜欢的可以试试。

## CSS `:has` `:not` 伪类

`:has()` 选择器可以选择包含特定子元素的父元素

`:not()` 选择器可以排除部分元素

> Q: 如果我希望选中 a 元素且 a 的子元素有 classB 没有 classC, 应该如何处理

```css
a:has(> .classB):not(:has(> .classC)) {
  /* 样式设置 */
}
```

## 我做了什么

### 使用 PARA 管理浏览器书签

每次需要收藏书签时，都会纠结放在哪里，而且过一段时间后文件夹总会变得杂乱无章。

最近看到有用 PARA 管理笔记和任务的，感觉也可以用 PARA 管理书签。

PARA 将信息分为四类：

- Project：具有完成标准的短期目标，是一件具体可量化的事情，来源于 Area。例如完成一篇博客
- Area：模糊的长期目标，例如健身，个人品牌。来源于 Resource
- Resource：感兴趣的主题或任何其他事物
- Archive：归档后的上述三类东西

对应的，我将工作分为两个领域，一个是前端组内的工作，一个是业务线的工作。然后接到一个需求后，根据对应的 Area，将书签分配到领域的文件夹中，当需求成熟后，就将相关书签独立为文件夹放入 Project 文件夹中。等需求完成再将这个项目放到 Archive 中归档。
![](https://pocket.haydenhayden.com/blog/202312171923738.png?x-oss-process=image/resize,w_200,m_lfit)

至于 Resource 文件夹，存放的是临时收到的无法分类的书签，或者是一些感兴趣的主题。等日后慢慢处理。

最后配合 Arc 浏览器的命令行工具 (`command + L`)，可以快速定位到文件夹或标签。

![](https://pocket.haydenhayden.com/blog/202312171943175.png?x-oss-process=image/resize,w_500,m_lfit)

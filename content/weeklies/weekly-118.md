---
date: 2024-08-18
year: 2024
week: 33
episode: 118
---

## 《掌控习惯(Atomic Habits)》部分笔记

本周读了 《掌控习惯(Atomic Habits)》 的部分章节，感觉还不错，打算继续读下去。这里记录一些笔记。

1. **对下意识的行为保持警惕。**

<section>

生活在环境中的我们，会不自觉地被环境影响，做出一些下意识的行为。这些行为包含了好习惯和坏习惯。我们需要分析自己的行为，找出那些不好的习惯，然后制定计划，逐步改变它们。

</section>

1. **习惯由「提示」触发，掌控环境，让好习惯自动发生。**

<section>
如果在家里工作学习时，总是忍不住刷手机，那么可以尝试改变环境，比如指定一张桌子专门用来工作学习，然后在那张桌子上只放工作学习相关的物品。把手机放在另一个房间。
</section>

3. **查找资料，制定计划这些行为这些准备工作，会让我们误以为自己在取得进展，同时不必承担失败的风险。**

<section>
所以我们经常在准备工作上花费大量时间，而没有真正开始行动。
</section>

4. **培养好习惯，关键是从重复开始，无需力求完美。**

<section>
所谓资料里的效率最高的方式，如果执行起来对当前的自己来说太难了，那么这个高效的方式就是不高效的。
</section>

5. **就习惯的形成而言，重要的是频率而不是时长。**

<section>
比如我背单词最开始的目标是每天 10 个，但是后来发现根据单词的难易程度，可能需要 10 分钟，也可能需要 1 小时。后来我把目标改为每天背 15 分钟，就轻松多了。
</section>

6. **环境造就习惯。**

<section>
如果经常被手机打扰，那么可以尝试改变环境，比如把手机锁在抽屉里，把干扰自己的 App 卸载，需要用的时候再重新安装，每次拿起手机前必须大声说出来我要打开哪个 App 做什么事情。
</section>

## 用专业的工具做专业的事情

使用 Whimsical 画甘特图流程图，使用 Trello 做看板。这些事情 Notion 都能做，但是用久了发现还是专业工具更顺手。

比如看板，Notion 虽然也能做，但是卡片就是没有 Trello 直观。还需要针对 Notion 的数据结构定制看板，比如要考虑用 Page 的一个属性做看板的 Column，那么设计 Column 就要受到限制。用起来总感觉不顺手。

切换到 Trello 后，感觉工作效率提升了不少。

![](https://pocket.haydenhayden.com/blog/202408181734378.png)

![](https://pocket.haydenhayden.com/blog/202408181736855.png)

## 使用 RSS 控制信息流

感觉没事做的时候，拿起手机，刷刷推，时间就过去了。看了《掌控习惯》后，我意识到，拿起手机的理由是我觉得刷推偶尔能获取到技术方面的信息，但实际上刷完推后，我会下意识地再切到 Telegram 看看，看完 Telegram 后，再看看 V2ex bilibili，最后时间就过去了。

自部署了 RSS Hub 后，我尝试使用 RSS 控制信息流，将 Twitter 和其他平台有价值的信息聚合到 RSS Hub 中，然后把 RSS 阅读器当作所有信息流的入口。下次打开手机，我只需要刷 RSS 阅读器，如果没有信息更新就没有再玩手机的理由了。

另外我把收藏的稍后读文章也做成了 RSS 源，这样玩手机的流程就变成了：

1. 查看 RSS 阅读器，看看信息流是否有更新
2. 有感兴趣的新信息，能立即看完的，立即看完，否则加入稍后读
3. 没有新信息后，从稍后读 RSS 源中选一篇阅读

这套流程最大的好处是只有一个入口，没有其他干扰。但是市面上的 RSS 阅读器对 Twitter 等网站的信息显示做的不好，不过也能理解，毕竟是为文章做的阅读界面。所以我很期待 [Follow](https://github.com/RSSNext/Follow) 这个项目，从放出的信息看它有这方面的优化。

![](https://pocket.haydenhayden.com/blog/202408181807279.png)

## 好看的 Clash 客户端 FIClash

[](https://x.com/MateCafe/status/1824096046190137390)

原推中的地址有些问题，正确项目地址：https://github.com/chen08209/FlClash 。

## 简化 X 网页样式

Twitter 网页的无用元素越来越多了，有点影响阅读。想起来 Arc 浏览器自带了 Boost，可以很方便地修改样式。

![](https://pocket.haydenhayden.com/blog/202408181825064.png)

代码在这里：

```css
/* 首页作侧边栏无用项 */
header[role="banner"] a[aria-label="Jobs"],a[aria-label="Grok"],a[aria-label="Premium"],a[aria-label="Verified Orgs"],a[aria-label="Communities"] {
  display: none !important;
}
/* 首页右侧边栏 */
main[role="main"] div[data-testid="sidebarColumn"] {
  display: none !important;
}
/* 个人中心 */
div[aria-label="Home timeline"] a[href="/i/premium_sign_up"] {
  display: none !important;
}
```

## Excalidraw 优化流程图操作

[](https://x.com/excalidraw/status/1823079626156961937)

使用 `cmd + ->` 快速创建连接线和新节点。

但是流程图制作还是建议看看 [Whimsical](https://whimsical.com/) ，它有专门的流程图模板，针对流程图有很多优化。

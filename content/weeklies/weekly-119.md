---
date: 2024-08-25
year: 2024
week: 34
episode: 119
---

## Raycast 开源工具箱 ray.so

https://ray.so/

支持代码生成图片以及快速制作 logo。代码已经在 Github 开源。

![](https://pocket.haydenhayden.com/blog/202408250952730.png)

## 使用 RSS 订阅 Newsletter

在 [上期周报](./weekly-118) 中，我提到了使用 RSS 管理信息输入。对于大部分网站使用 RSSHub 可以很方便的生成 RSS 订阅源。但是 Newsletter 可能连网站都没有，解决办法是使用 [kill the newsletter](https://kill-the-newsletter.com/) 这个工具。

![](https://pocket.haydenhayden.com/blog/202408250959122.png)

kill the newsletter 可以生成一个 RSS 订阅源，以及一个专属邮箱。使用这个邮箱订阅 Newsletter 后，kill the newsletter 会自动将 Newsletter 内容转换成 RSS 格式。

这个工具本身也是开源的，代码在 [kill-the-newsletter](https://github.com/leafac/kill-the-newsletter)。

## React Scheduler

https://github.com/Bitnoise/react-scheduler

一个开源的 React 甘特图组件。这是我目前发现的样式最好看的一个了。目前功能还不算多，但是作者表示会持续更新。

![](https://pocket.haydenhayden.com/blog/202408251005977.png)

## 《掌控习惯(Atomic Habits)》部分笔记

<img src="https://pocket.haydenhayden.com/blog/202409171816052.png" alt="掌控习惯" width="300" />

本周把剩下的部分读完了。记录一些笔记。

7. **不要指望一开始就培养完美的习惯，要连续不断地做简单的事情。先标准化然后才能优化。**

<section>

开始一个新习惯时，它所用时间不应该超过两分钟。当然两分钟不是一个绝对的数字，而是指一个你可以很轻易完成的时间。简单易行的动作能够让我们更容易重复多次，而重复能够强化我们的心理认同。

每天背单词，我就认为我是爱学习的人，我身边的人也会这么认为。哪天我不想背的时候，心理认知就会阻止我。

养成习惯后，可以逐步增加难度。可以考虑用上各种工具和方法论优化动作。

</section>

8. **行为转变基本准则：重复有即时奖励的行为，避免即时受罚的动作。**

<section>

现代人类社会是延迟回报，动物世界是即时回报环境。我们的大脑与两百万年前的祖先一样，所以仍然偏好即时回报。

我们知道每天锻炼，可以让身体更健康。但这需要很长一段时间才能看到效果。而刷手机，可以让我们立即获得快乐，它带来的坏处也需要很久才能显现。那我们自然会倾向于刷手机。

所以，如果一个动作有即时奖励，那么它就很容易被重复。而大多数好习惯都是延迟回报的。我们需要为好习惯创造即时奖励，为坏习惯设置即时惩罚。

</section>

9. **追踪习惯有难度。**

<section>
习惯追踪。本身就是培养一个记录的习惯，所以要尽量自动化，不必要求每天都记录，可以每周每月补充一次。只手动记录最重要的习惯。习惯结束后立即记录。
</section>

10. **不连续错过两次。错过一次是失误，错过两次是新习惯的开始。**

11. **找到你的优势领域。**

<section>

是否适合某项任务的标志不在于你是否喜欢它，而在于你是否比大多数人更容易承受这项任务带来的痛苦。伤害别人多于伤害你的事情就是你生来就适合做的事。

从事你擅长的事情，你会很容易进入心流状态。

顺应你的天性，努力做好擅长的事情。

</section>

6. **做力所能及，难易适中的事情。**

<section>

人会厌倦完全没有挑战性的任务，也会放弃难度过高的任务。

当你对一个习惯动作驾轻就熟时，需要适当增加难度。一定的挑战性可以让你保持动力。

</section>

7. **审视习惯，做出调整。**

<section>

习惯带来许多好处，但缺点是让我们陷入以前的思维和行为模式。

我们需要时常反思与回顾，做出调整。

</section>

8. **成功不是要达到的目标，也不是要跨越的终点线。它是一个让人进步的体系、精益求精的过程。**

## 发布了一个 nextjs 项目模板

https://github.com/haydenull/nextjs-cloudflare-pages-d1-drizzle

最近的项目将数据库迁移到了 Cloudflare D1。之后会尽量使用 Cloudflare 的技术栈。所以搭建了这样一个项目模板。

有以下特点：

- 使用 Cloudflare Pages 部署
- 使用 Cloudflare D1 作为数据库
- 使用 Drizzle 作为 ORM
- 使用 shadcn/ui 作为 UI 库



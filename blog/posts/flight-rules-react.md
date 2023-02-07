---
layout: Post
title: React Flight Rules
subtitle: React 项目的个人实践
author: Haydenull
date: 2023-02-07
useHeaderImage: true
headerImage: https://pocket.haydenhayden.com/blog/202302070801422.png
headerMask: rgb(14, 21, 5, .2)
permalinkPattern: /post/:year/:month/:day/:slug/
tags:
  - Flight Rules
  - React
---

> 如果没有特别说明，文中的组件都是指函数组件。

## 应该如何看待函数式组件，他与类组件有什么区别？

函数式组件与类组件是完全不用的心智模型(mental model)。

函数式组件是**纯函数**，它们只是接受 props 并返回一个 React 元素。

类组件是一个类，它们有自己的状态，生命周期，以及实例方法。

在实践中，我们应该将函数式组件视作纯函数，而类组件视作类。**忘记声明周期那一套思维，千万不要用各种操作在函数组件里模拟生命周期。**

一个纯函数是没有副作用的，而我们的应用必须要有副作用才有意义。因此 React 提供了 `useEffect` 来处理副作用。

## 为什么组件会重复渲染？

这是 React 的一个特性，它会在每次 props 或 state 变化时重新渲染组件。以此来保证组件的状态与视图保持一致。

我们举一个[官网的例子](https://beta.reactjs.org/learn/render-and-commit)：

组件是厨师， react 是服务员。

![](https://pocket.haydenhayden.com/blog/202302070822626.png)

> 1. **Triggering** a render (delivering the guest’s order to the kitchen)
> 2. **Rendering** the component (preparing the order in the kitchen)
> 3. **Committing** to the DOM (placing the order on the table)

当 props 或 state 变化时，React 会触发重新渲染，也就是重新执行函数。

在最终的 Commit 阶段，React 会依据函数的执行结果尽可能的复用 DOM 节点，以此来提高性能。

所以在 React 中，rerender 并不是一个 bug，而是一个特性。**也不需要担心性能问题，React 会自动优化。**

建议配合[官网文档]((https://beta.reactjs.org/learn/render-and-commit))以及这篇文章一起看: [Why React Re-Renders](https://www.joshwcomeau.com/react/why-react-re-renders/)

如果还有疑问，建议再看几遍参考资料：

- [Render and Commit](https://beta.reactjs.org/learn/render-and-commit)
- [Why React Re-Renders](https://www.joshwcomeau.com/react/why-react-re-renders/)
  - 每隔一段时间再读总有收获

## State 是什么，为什么需要它，为什么有时候它的值与预期总是不一致？

更新中...

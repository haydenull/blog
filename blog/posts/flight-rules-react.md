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

组件需要响应用户的操作，而用户的操作会导致组件的状态发生变化。因此我们需要一个地方来存储组件的状态，这就是 state。

**当 state 发生变化时，React 会重新渲染组件。** 这就是 State 的运行机制。

同时这也是为什么 state 的值与预期不一致的原因，因为每一次的重新渲染都是一次函数执行，在每次函数执行中，state 都有不同的值。所有这些渲染中，state 都是独立的，互不影响。

下面是一个例子：

```jsx
const Counter = () => {
  const [count, setCount] = useState(0)

  const onClick = () => {
    setInterval(() => {
      setCount(count + 1)
    }, 1000)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  )
}
```

点击按钮后，每隔一秒，计数器的值会增加 1。但是我们会发现，计数器的值会一直停留在 1。

![](https://pocket.haydenhayden.com/blog/202302100840588.png)

我们可以看到，定时器只在第一次渲染函数的运行时里，而这里的 state 是 0，所以每一次定时器执行取到的 state 都是 0，那么页面上的值就会一直是 0 + 1 = 1。

我们可以将 state 理解为函数状态快照，每次渲染都会有一份新快照，而这些快照是互不影响的。

## useMemo 是什么，我需要使用它吗？


更新中...

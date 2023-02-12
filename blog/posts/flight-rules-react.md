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

`useMemo` 是一个 Hook，它可以用来缓存函数的返回值。

所以它唯一的用途就是提高性能，因为它可以避免重复计算。

因此，我们必须确保**即使当去掉 `useMemo` 后，组件的行为也不会发生变化。**

但是我们应该明确过早的优化是万恶之源，所以在没有性能问题的情况下，我们不应该使用 `useMemo`。

这句话说的比较模糊，究竟什么时候才是合适的时机呢？

答案是在绝大多数情况下，我们都不需要使用 `useMemo`。

依据官方文档的说法， 我们可以使用如下代码测试一个计算的耗时：

```jsx
console.time('filter array');
const visibleTodos = filterTodos(todos, tab);
console.timeEnd('filter array');

// filter array: 0.15ms
```
当我们的计算耗时大于 1ms 时，我们就可以考虑使用 `useMemo` 来缓存计算结果了。

另外：`useMemo` 并不能优化第一次渲染的性能，它只能帮助我们在组件更新时避免重复计算。

既然 `useMemo` 可以优化性能，那么为什么不在每个地方都使用呢？

有三个原因：

1. `useMemo` 本身是有开销的，它会在每次渲染时都执行，去比对依赖项是否发生变化，这个计算开销有可能比我们要缓存的计算开销还要大。（尤其还需要考虑数组、对象这种引用类型的依赖）
2. `useMemo` 会使组件的行为变得不可预测，这会导致 bug 的产生。
3. `useMemo` 会使组件的代码变得难以理解，这会导致维护成本的增加。

我们之前说过，React 通过重复执行函数来实现组件的更新，而 `useMemo` 会跳过某些函数的执行，这就会导致组件的行为变得不可预测。维护者需要去理解这些跳过的函数，这会增加维护成本。

## useCallback 是什么，我需要使用它吗？

useCallback 和 useMemo 的作用是一样的，都是用来缓存一些计算结果，但是它们的使用场景不同。

useCallback 用来缓存函数，而 useMemo 用来缓存值。

当一个函数或一个值作为组件的 props 传递给子组件时，如果这个函数或值没有发生变化，那么子组件就不会重新渲染。

所以很多人会使用 useCallback 来缓存函数，用 useMemo 来缓存值。

```jsx
const TodoList = ({ todos, onClick }) => {
  return (
    <ul>
      {/** ... */}
    </ul>
  )
}

const App = () => {
  const todos = useMemo(() => filterTodos(todos, tab), [todos, tab])
  
  const onClick = useCallback(() => {
    // ...
  }, [])
  
  return (
    <TodoList todos={todos} onClick={onClick} />
  )
}
```

如上边的例子，我们可以看到，我们使用了 useMemo 来缓存 todos，使用了 useCallback 来缓存 onClick。有些人会认为这优化了性能，因为我们避免了子组件的重新渲染。

**但实际上这并没有优化性能，因为只有当子组件是 memo 组件时，才会避免子组件的重新渲染。**

```jsx
const TodoList = React.memo(({ todos, onClick }) => {
  return (
    <ul>
      {/** ... */}
    </ul>
  )
})
```

## useEffect 是什么，它有什么用？

useEffect 是一个 Hook，它可以用来处理副作用。

默认情况下它在每次组件渲染后执行，但可以接收一个依赖项数组，只有当依赖项发生变化时，才去执行。

**`useEffect`的设计目标并不是在函数组件中提供类似于生命周期的功能，而是用来处理副作用，也就是让组件的状态与外部世界同步。**

我们看一个官网的例子：

```jsx
const ChatRoom = ({ roomId }) => {
  useEffect(() => {
    const connection = createConnection(roomId) // 创建连接
    connection.connect()

    return () => {
      connection.disconnect() // 断开连接
    }
  }, [roomId])
}

// roomId 默认值 'general'
// 第一次操作 'general' 变为 'travel'
// 第二次操作 'travel' 变为 'music'
```

如果我们从组件的角度出发，它的行为是这样的：

1. 组件第一次渲染时，触发 useEffect，连接到 'general' 房间
2. roomId 变为 'travel'，组件重新渲染，触发 useEffect，断开 'general' 房间的连接，连接到 'travel' 房间
3. roomId 变为 'music'，组件重新渲染，触发 useEffect，断开 'travel' 房间的连接，连接到 'music' 房间
4. 组件卸载时，触发 useEffect，断开 'music' 房间的连接

![](https://pocket.haydenhayden.com/blog/202302121545747.png)

看起来很完美，但是如果我们从 useEffect 的角度出发，它的行为是这样的：

1. Effect 连接到 'general' 房间，直到断开连接
2. Effect 连接到 'travel' 房间，直到断开连接
3. Effect 连接到 'music' 房间，直到断开连接

![](https://pocket.haydenhayden.com/blog/202302121551549.png)

当我们从组件的角度来看待 useEffect 时，useEffect 就变成了一种在组件渲染完成后或者卸载前执行的一种**回调函数、生命周期**。

而从 useEffect 的角度出发，我们**只关心应用如何开始或终止与外部世界的同步**。就像写组件的 rendering 代码一样，接收 state，返回 JSX。我们不会考虑 rendering 代码在 mount、update、unmount 时会发生什么。我们只关注单次的渲染它应该是什么样的。

最后，我们来看有这样一种说法：

> The question is not "when does this effect run" the question is "with which state does this effect synchronize with"
>
> useEffect(fn) // all state
> 
> useEffect(fn, []) // no state
> 
> useEffect(fn, [these, states])
>
> https://twitter.com/ryanflorence/status/1125041041063665666

重要的不是 useEffect 什么时候执行，而是同步了哪些状态。

## 一个前端应用应该是什么样的？useEffect 带来新的编程模型又是什么？

更新中...

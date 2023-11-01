---
title: 如何实现一个符合 React 设计的时间选择器
description: 在业务中实现时间选择器的一些思考, 使用 4 个版本代码来对比 React 设计的优劣
author: Haydenull
pubDatetime: 2023-02-18
useHeaderImage: true
headerImage: https://pocket.haydenhayden.com/blog/202302182111910.png
headerMask: rgb(14, 21, 5, .2)
postSlug: react-time-picker
tags:
  - React
---

最近在总结 [React Flight Rules](https://blog.haydenhayden.com/post/2023/02/07/flight-rules-react/), 正好业务需求里遇到了一个时间选择器,比较适合用来做一个案例。

## 实现一个初版的时间选择器

选择器的 UI 如下:

![](https://pocket.haydenhayden.com/blog/202302181731055.png)

这个选择器分为两个部分:

1. 第一部分是默认的一组时间按钮, 点击时选择器直接设置为对应的值
2. 第二部分是一个输入框, 用户可以输入自定义的时间

看起来功能比较简单, 我们来实现一个初版的选择器:

```tsx
import { type Dayjs } from "dayjs";

const FORMAT = "HH:mm";
const defaultOptions = [
  dayjs("08:00", FORMAT),
  dayjs("10:00", FORMAT),
  dayjs("16:00", FORMAT),
];

const MyTimeRadio: React.FC<{
  value: Dayjs;
  onChange: (value: Dayjs) => void;
}> = ({ value, onChange }) => {
  const [timeInputValue, timeInputValue] = useState<Dayjs>();
  const isCustomTime = !defaultOptions.includes(value);

  return (
    <div>
      {defaultOptions.map(option => (
        <button key={option.format(FORMAT)} onClick={() => onChange(option)}>
          {option.format(FORMAT)}
        </button>
      ))}

      <div>
        <span>自定义时间</span>
        <TimeInput
          value={timePickerValue}
          onChange={time => {
            setTimePickerValue(time);
            onChange(time);
          }}
        />
      </div>
    </div>
  );
};
```

这里我们加了一个 `timeInputValue` 的状态, 用来保存用户输入的时间, 为什么不直接使用 value 呢? 因为 value 是整个组件共用的 prop, 当用户点击 10 点的按钮时, value 会变为 10 点, 如果 TimeInput 组件直接使用 value 的话,就会导致输入框的值也变为 10 点, 这显然不是我们想要的效果。

![](https://pocket.haydenhayden.com/blog/202302181738829.png)

所以我们使用了一个 `timeInputValue` 来保存用户输入的值, 当用户点击按钮时, `timeInputValue` 不会改变, 这样就可以保证输入框的值不会被覆盖。

看起来挺好使, 也挺简单, 但是这个组件有一个回显的问题:

假设我们将组件放在一个 form 表单中, 而表单初始化的数据需要从接口获取, 代码如下:

```tsx
const MyForm: React.FC = () => {
  const [time, setTime] = useState<Dayjs>();

  useEffect(() => {
    fetch("/api/time").then(res => {
      // 假如 res.time 是 12:00
      setTime(res.time);
    });
  }, []);

  return (
    <form>
      <MyTimeRadio value={time} onChange={setTime} />
    </form>
  );
};
```

我们发现, 当 MyTimeRadio 第一次渲染时, 取得的 value 是 undefined, 获取到接口返回的时间后, value 才会变为 12:00, 这时候 MyTimeRadio 会重新渲染, 但 `timeInputValue` 仍然是 undefined 。

![](https://pocket.haydenhayden.com/blog/202302181750486.png)

所以我们的组件无法正常回显自定义时间, 需要一点小小的改造。

## 完整功能第一版

show case 发现这个问题后, 我的第一反应是我们想让 value 正确同步到 `timeInputValue` 中, 那么加一个监听不就行了?

```tsx
// MyTimeRadio.tsx
const [timeInputValue, timeInputValue] = useState<Dayjs>()

useEffect(() => {
  setTimeInputValue(value)
}, [value])

// ...
<TimeInput
  value={timeInputValue}
/>
```

嗯, 看起来可以, 但是我们不能让 `timeInputValue` 一直跟着 `value` 走, 因为当用户点击 10 点按钮触发 onChange, 最终导致 value 改变时, 我们不希望 `timeInputValue` 被覆盖。所以要再过滤掉一下:

```tsx
// MyTimeRadio.tsx
const [timeInputValue, timeInputValue] = useState<Dayjs>()
useEffect(() => {
  if (isCustomTime) setTimeInputValue(value)
}, [value, isCustomTime])

// ...
<TimeInput
  value={timeInputValue}
/>
```

很完美, 我们监听了 value 的变化, 把值同步给了 `timeInputValue` , 然后为了防止用户输入的值被覆盖, 我们加了一个 `isCustomTime` 的判断。

测试一下组件, 回显的 bug 解决了。

但是等等, 我们在 [React Flight Rules](https://blog.haydenhayden.com/post/2023/02/07/flight-rules-react/) 里明确过, useEffect 的作用并不是提供渲染完成后的回调钩子, 也不是要在函数式组件中实现生命周期。从他的名字我们可以知道他的出现是为了解决副作用。正确的做法是 ==使用 useEffect 让 React 应用与外界状态同步==。

在我们的 useEffect 代码中, `value` `isCustomTime` 都是 React 的内部状态, 所以在这里使用 useEffect 是不符合其设计意图的。

那么如何不使用 useEffect 来解决这个问题呢?

## 完整功能第二版

如果我们使用 useRef 来替代 timeInputValue 这个 state 的话, 我们就可以在任意地方修改他的值, 这样就不需要 useEffect 了。

```tsx
// MyTimeRadio.tsx
const timeInputValueBackRef = useRef<Dayjs>()
if (isCustomTime) timeInputValueBackRef.current = value

const timeInputValue = isCustomTime ? value : timeInputValueBackRef.current

// ...
<TimeInput
  value={timeInputValue}
/>
```

改完跑一下代码, 功能正常, 但是又发现了一个问题, 因为我们的飞行规则里还说过, ==我们应当确保 React 的 rendering 代码是个纯函数==, 但是当我们 rendering 逻辑里加入了 ref 的读取与修改, 它就不再是纯函数了。

为什么这么说呢, 因为 ref 是在每次组件渲染时都会公用的一个值, 相当于函数的外部变量, 而我们的 rendering 逻辑是一个纯函数, 它不应该依赖(读取)外部变量, 更不能修改它。

我们举一个简单的例子:

```ts
const add = (a: number) => ++a;

add(1); // 2
add(1); // 2
add(1); // 2
```

无论代码执行多少次, `add(1)` 的返回值都是固定的, 这就是纯函数的特性。

但是如果我们把 add 函数改成这样:

```ts
let a = 1;
const add = () => ++a;

add(1); // 2
add(1); // 3
add(1); // 4
```

由于 a 是一个外部变量, 所以 `add(1)` 的返回值就不再是固定的, 这就不是纯函数了。

那么回到问题, 如何在 rendering 阶段去除 ref 呢?

## 完整功能第三版

我们回顾一下上边的代码, 为了避免 useEffect 的使用, 我们把 `timeInputValue` 的值放到了 ref 中, 然后我们利用 props.value 变化引起 rerender 的特性, 把 value 的值赋给了 `timeInputValue` 。

但我们的初衷应该是解决 TimeInput 组件值被 value 覆盖的问题, 所以回到这一点, 我们的 ref 应该是用来保存 TimeInput 组件的值的一个副本, 那么它应该在 TimeInput 的 onChange 中来赋值才更加合理。

```tsx
// MyTimeRadio.tsx
const timeInputValueBackRef = useRef<Dayjs>()
const isCustomTime = !defaultOptions.includes(value)

const timeInputValue = isCustomTime ? value : timeInputValueBackRef.current

// ...
<TimeInput
  value={timeInputValue}
  onChange={(time) => {
    timeInputValueBackRef.current = time
    onChange(time)
  }}
/>
```

好了, 现在我们的 ref 只在 TimeInput 的 onChange 中被修改, 也就是说 ref 这个外部变量的修改被移到 rendering 逻辑之外了, 这增加了 rendering 的纯度。

但是 rendering 仍然读取了 ref, 它依然是个非纯函数。

到了这个份上, 除了 useEffect 我也想不到什么办法能把 ref 的读取与修改都移到 rendering 之外了。直到今天又翻了下 react useState 和 useRef 的文档, 我有了新的想法。

## 完整功能第四版

```tsx
const [timePickerValue, setTimePickerValue] = useState<Dayjs>()

if (isCustomTime && timePickerValue !== value) setTimePickerValue(value)

// ...
<TimeInput
  value={timeInputValue}
/>
```

只需要在我们的初版代码里加上一行代码就行: `if (isCustomTime && timePickerValue !== value) setTimePickerValue(value)`。

为什么我又放弃了 useRef 改用 useState 了呢?

因为在 useRef 的文档中, React 明确说了==不要在 rendering 中读取或修改 ref 的值==, 如果需要在 rendering 中读取或修改, 则使用 state 代替。

我之前对 ref 的理解是套用了类组件的实例属性, 把它当作一个在多次渲染中公用的变量来使用, 所以想当然地把它放到了 rendering 逻辑中, 也就出现了方案二和三。

文档中推荐了三类应该适合 ref 的场景:

- 保存 timeout ID
- 保存 DOM 节点
- 保存可变值, 但他们不需要参与 JSX 的计算, 也就是说不会影响生成的 JSX

多读文档还是有好处的, coding 的时候也需要多思考, 不能一味地套用已有的知识。函数式组件与类组件的 mental model 是不一样的, 我们需要把它们的区别理解透彻, 才能写出更好的代码。

回到第四版代码上, 为什么我一开始就没有想到这个方案呢? 因为我下意识排斥在 rendering 中使用 setState, 因为这样会导致无限循环(在本例中, 我们使用 if 避免了这种情况)。

[React 文档也是这么讲的](https://beta.reactjs.org/reference/react/useState#storing-information-from-previous-renders), 应当避免这样的行为, 在大多数情况下应该在事件回调中修改 state, 只有少数情况需要修改 state 来适应 rendering (也就是我们遇到的情况)。

那这么做相比第一版使用 useEffect 的好处是什么呢?

- 更符合 React 的 mental model
- 性能更好

当我们使用 useEffect 时, 组件是这样的:

![](https://pocket.haydenhayden.com/blog/202302182042747.png)

因为 useEffect 的触发时机是 render 完成后, 所以组件会经历两次完整的渲染, 包括其子组件也会一起执行。

而使用 setState 的话, 组件是这样的:

![](https://pocket.haydenhayden.com/blog/202302182044208.png)

render 1 我用了灰色背景, 这是因为当组件走到 return JSX 时, 会立即触发 rerender, 跳过其子组件的执行。

## 总结

在这篇文章中, 我们尝试讨论了 useState, useRef, useEffect 三个 hook 的使用场景, 并且尝试了一些方案来解决一个实际的问题。

总结一下比较重要的几个点:

- useEffect 的名字是 effect, 它的作用是处理副作用, 使 React 与外部世界进行同步。
- 应当保证 rendering 是个纯函数。
- 不应该在 rendering 逻辑中读取或修改 ref 的值, 应该使用 state 代替。
- 不能套用以往的知识, 要理解 React 函数式组件的 mental model。Thinking in React。

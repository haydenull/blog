---
title: 关注代码质量：Code Review 的技巧与实践
description: 聚焦 Code Review 的过程、技巧和注意事项
author: Haydenull
pubDatetime: 2023-04-14
useHeaderImage: true
headerImage: https://pocket.haydenhayden.com/blog/202304141335006.jpeg
headerMask: rgb(14, 21, 5, .2)
postSlug: code-review
tags:
  - Code Review
---

## 引言

Code Review 是软件开发过程中一项至关重要的任务。它可以帮助我们发现代码中的问题、提高代码质量，并为团队提供一个共享知识的机会。本文将详细介绍 Code Review 的相关经验与技巧，希望能为大家提供一个可用的参考。

## Code Review 的目标

在进行 Code Review 之前，我们需要明确这一过程的主要目标：

### 1. 统一代码风格

代码风格的统一对于提高代码的可读性和可维护性具有重要意义。通过 Code Review，我们可以确保团队成员遵循相同的编码规范，使得代码更加整洁、统一。

### 2. 促进团队技能提升和沟通

Code Review 不仅能够促进团队成员之间的知识共享，还可以倒逼 Reviewer 深入理解代码和业务逻辑。在 Review 过程中，我们可以向其他团队成员请教问题、分享技巧，提高整个团队的技术水平。

### 3. 提高代码质量和减少潜在风险

通过 Code Review，我们可以发现代码中潜在的问题，进一步提高代码质量。以下是一些可能在 Code Review 过程中发现的问题类型：

- **边界情况**：确保代码能够正确处理各种边界输入，例如空值、特殊字符等。
- **过度封装或偷懒不封装**：合理的封装能够提高代码的可读性和可维护性。我们需要在 Code Review 过程中关注是否存在过度封装或应该封装但未封装的情况。
- **可能忽略的公共组件**：在项目中，我们可能忽略了某个已存在的公共组件，也可能忽略了我们的业务与其他成员的业务存在潜在的公用组件。Code Review 可以帮我们再检查一次，减少代码重复。

## 实际操作

在明确了 Code Review 的目标之后，接下来我们将详细介绍实际操作中的流程和技巧。

### Git 操作

在进行 Code Review 时，我们需要遵循一定的 Git 分支操作流程：

1. 从 `master` 分支切出需求分支，例如 `release/v1.0`：

```bash
git checkout -b release/v1.0
```

2. 开发者从需求分支（如 `release/v1.0`）切出功能分支，例如 `feat/v1.0-sub-module`：

```bash
git checkout -b feat/v1.0-sub-module
```

3. 功能分支开发完毕后，向需求分支发起 Merge Request（MR）。在发起 MR 时，应提供以下信息（可以使用 MR Template 统一管理）：

- 这个 MR 解决了什么问题：说明为什么需要这个 MR，可以附上需求讲解、文档等。
- 这个 MR 修改了什么：简要介绍增加、修改、删除了哪些模块代码。
- 是否可能影响其他功能模块。

注意事项：

- 一个分支对应一个 MR。
- 不要在一个分支上发起多次 MR。
- 合并 MR 时，勾选 `Squash commits` 和 `Delete branch` 选项，并使用 `Fast-forward merge`。使用 `rebase` 来处理冲突。

4. MR 合并后，在本地批量删除分支：

```bash
git fetch --prune && git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -D
```

::: warning
该命令会比对本地分支与远程分支的差异，删除对应远程分支不存在的本地分支。

这个操作比较危险，建议仅在有多个待删除分支时使用。
:::

### 通知 Reviewer

在发起 MR 后，及时通知 Reviewer。Reviewer 可以将相应记录设为待办事项，以便于跟踪。

### Reviewer 的工作

收到通知后，Reviewer 必须在 1 个工作日内完成 Review。理想情况下，应立即处理，除非有其他紧急任务。为了确保 Review 过程的高效，我们需要注意以下几点：

1. Committer 应控制 MR 的大小，让 Reviewer 在 20 分钟内可以完成 Review。具体要求如下：

   - 一次 MR 的工作量控制在两个工作日以内，最好一个
   - 不超过 8 个文件
   - 不超过 500 行代码
   - 如果有特殊情况产生了大 MR，提前与 Reviewer 预约时间
   - 尽量让 MR 主题单一
   - 可以跟 reviewer 当面讲解需求背景以及交互来提速

2. 在 Review 过程中，参照以下 checklist：

   - 命名规范
   - 目录规范
   - 代码规范
   - 单词拼写检查
   - 重用逻辑检查
   - 可复用组件检查
   - TypeScript 类型检查（使用 `any` 或 `as` 必须加注释）
   - 注释检查（当你看不懂代码时可能是代码需要优化，也可能是业务逻辑复杂，这时需要提示开发者加适当的注释）
   - 其他团队编码规范

3. 尽量使用自动化工具减少人力成本，例如 ESLint、Prettier、Stylelint 等。

### 推荐的工具

为了提高 Code Review 的效率，如果你使用 VSCode 我们推荐使用以下工具：

- **VSCode GitLab Workflow 插件**：这个插件可以快速将 MR 的代码拉到本地，并直接在 VSCode 里进行评论。
- **VSCode Code Spell Checker 插件**：这个插件可以进行单词拼写检查，帮助你发现潜在的拼写错误。

## 额外的注意点

在进行 Code Review 时，我们需要注意以下几点，以提高整个流程的效果和效率：

1. **复杂的需求需要先进行方案设计，并邀请你的 reviewer 先沟通一次**：这可以避免在开发好几天后出现问题时，改造的时间成本过高。
2. **针对复杂或重要的逻辑加测试**：可以先从简单的检测 JavaScript 和 TypeScript 方法开始，逐步养成这个习惯。
3. **如果一个 MR 来回沟通超过 3 次则请求第三方介入**：确认双方意见都已表达且相互理解，仍未达成一致时立即寻求第三方帮助。有较大争议的可在周会上提出小组确定规范后记入代码规范。
4. **评估工期时适当留一些时间给 Code Review**：尤其是刚开始 review 问题可能比较多，会占用较长时间。
5. **联调及测试期间一般 MR 都不大且代码比较容易 review**：不用担心 Code Review 耽误 bug fix 进度。
6. **对于在 MR 里遇到的不能及时解决的问题**：为了不耽误后续 MR 的合并，可以先用 issue 记录问题并关联到 MR，在后期单独处理 issue。
7. **Review 不是找茬，尽可能用委婉的语气**：
   - 使用诸如 "我觉得"、"可以这样" 等词语；
   - 避免使用 "你 xxx"、"错误" 等词语；
   - 看到好代码不要吝啬赞美；
   - 在 Comment 中尽量留下建议的 Code Example, **代码往往比语言直观得多**。
8. **预先 review 一下自己的 MR**：在提交给其他人 review 之前，确保自己已经对代码进行了仔细检查。
9. **代码是给人看的而不是机器**：编写易于理解和维护的代码，以便其他团队成员可以更好地进行 Code Review 和后期维护。

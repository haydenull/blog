---
title: Mac 配置指南
description: 一个前端开发者的 Mac 环境配置及常用软件推荐。
date: 2024-04-20
cover: https://pocket.haydenhayden.com/blog/202404201832260.png
tags:
  - mac
  - software
---

最近从 M1 MacBook Pro 换到了 M3 MacBook Air，顺便重新配置了一下开发环境，整理了一些常用的软件和配置，方便以后重装系统时参考。

## 基本设置

### 键盘设置

![](https://pocket.haydenhayden.com/blog/202404201958802.png?x-oss-process=image/resize,w_1000,m_lfit)

**增加双拼输入法**: 系统偏好设置 -> 键盘 -> 输入法 -> 编辑 -> 点击左下角的加号，添加双拼输入法

**禁止双击空格出现句号**: 系统偏好设置 -> 键盘 -> 输入法 -> 编辑 -> 关闭“双击空格键加句号”

![](https://pocket.haydenhayden.com/blog/202404202205286.png?x-oss-process=image/resize,w_1000,m_lfit)

### 触控板设置

1. 启用轻点来点按

系统偏好设置 -> 触控板 -> 光标与点按 -> 启用轻点来点按

![](https://pocket.haydenhayden.com/blog/202404202002021.png?x-oss-process=image/resize,w_1000,m_lfit)

2. 启用双击拖动

系统偏好设置 -> 辅助功能 -> 鼠标与触控板 -> 触控板选项 -> 启用拖移 【不使用拖移锁定】

![](https://pocket.haydenhayden.com/blog/202404202008969.png?x-oss-process=image/resize,w_1000,m_lfit)

## 日常软件

### 前置准备

允许安装任意来源的应用

打开终端，输入以下命令并执行：

```bash
sudo spctl --master-disable
```

系统偏好设置 -> 安全性与隐私 -> 允许从以下位置下载的应用：任何来源

![](https://pocket.haydenhayden.com/blog/202404202016995.png?x-oss-process=image/resize,w_1000,m_lfit)

### 软件列表

1. [Quantumult X](https://apps.apple.com/tw/app/quantumult-x/id1443988620) - 网络工具

正确地上网姿势，配置参考[Quantumult X 配置及同步](/blog/quantumult-x)

![](https://pocket.haydenhayden.com/blog/202404202028900.png?x-oss-process=image/resize,w_1000,m_lfit)

2. [Arc](https://arc.net/) - 浏览器

颜值高，支持 Chrome 插件，支持账号隔离，支持多设备同步，支持自动清理标签页。

![](https://pocket.haydenhayden.com/blog/202404202036551.png?x-oss-process=image/resize,w_1000,m_lfit)

[](https://twitter.com/unixzii/status/1763407331831038254)

3. [Barbee](https://apps.apple.com/pl/app/barbee-hide-menu-bar-items/id1548711022) - 隐藏菜单栏图标

Bartendar 的平替，支持隐藏菜单栏图标，支持自定义排序。

以前我也买过 Bartendar，但是 Bartendar 每一个 MacOS 版本更新都要收费，而 Barbee 是一次购买终身使用。

![](https://pocket.haydenhayden.com/blog/202404202048441.png?x-oss-process=image/resize,w_400,m_lfit)

4. [Battery](https://github.com/actuallymentor/battery) - 电池健康管理

开源免费。支持控制电池充电百分比。一般设置为 80%，可以延长电池寿命。

![](https://pocket.haydenhayden.com/blog/202404202051884.png?x-oss-process=image/resize,w_300,m_lfit)

5. [Battery Buddy](https://batterybuddy.app/) - 可爱的电池图标

没什么用，就是可爱🐶。

> [!tip] 隐藏系统自带的电池图标
>
> 系统偏好设置 -> 控制中心 -> 电池 -> 关闭【在菜单栏显示】开启【在控制中心显示】
>
> ![](https://pocket.haydenhayden.com/blog/202404211419645.png?x-oss-process=image/resize,w_1000,m_lfit)

6. [Keka](https://www.keka.io/en/) - 解压缩工具

官网下载免费，支持多种格式解压缩。

7. [Monitor Control](https://github.com/MonitorControl/MonitorControl) - 外接显示器亮度调节

开源免费。像调节 Mac 亮度一样调节外接显示器亮度。

![](https://pocket.haydenhayden.com/blog/202404202108444.png?x-oss-process=image/resize,w_1000,m_lfit)

8. [Itsycal](https://www.mowglii.com/itsycal/) - 菜单栏日历

![](https://pocket.haydenhayden.com/blog/202404202110779.png?x-oss-process=image/resize,w_500,m_lfit)

> [!tip] 隐藏系统自带的日期
> 系统偏好设置 -> 控制中心 -> 时间 -> 显示日期（永不）
>
> ![](https://pocket.haydenhayden.com/blog/202404211020877.png?x-oss-process=image/resize,w_1000,m_lfit)

9. [Mac Mouse Fix](https://macmousefix.com/) - 鼠标优化

解决外接鼠标滚动不平滑的问题。

10. [Loop](https://github.com/MrKai77/Loop) - 窗口管理

开源免费。动画效果很棒，符合直觉。

![](https://pocket.haydenhayden.com/blog/202404202119303.gif)

11. [Keyboard Clean Tool](https://folivora.ai/keyboardcleantool) - 键盘清洁工具

启用后会禁用键盘输入，方便清洁键盘。

![](https://pocket.haydenhayden.com/blog/202404202121283.png?x-oss-process=image/resize,w_800,m_lfit)

12. [Tuji](https://tuji.app/) - 截图工具

支持标注，加背景图，水印。相比于 CleanShot X，Tuji 缺少 Pin 功能，一些细节也比不上前者，但是价格便宜很多。而且这款软件发布的时间比较短，后续值得期待。

![](https://pocket.haydenhayden.com/blog/202404202126086.png?x-oss-process=image/resize,w_1000,m_lfit)

13. [Focusee](https://gemoo.com/focusee/) - 录屏工具

拥有类似 ScreenStudio 自动跟随鼠标，适合录制产品演示视频或者教程。

14. [Keystroke Pro](https://apps.apple.com/us/app/keystroke-pro/id1572206224) - 键盘按键显示

颜值比较高的键盘按键显示工具。需要付费，但是可以在网上找一下试用版。

![](https://pocket.haydenhayden.com/blog/202404202134414.png?x-oss-process=image/resize,w_1000,m_lfit)

15. [Bitwarden](https://bitwarden.com/) - 密码管理工具

支持自部署，官方价格也很便宜。

16. [Shortery](https://apps.apple.com/us/app/shortery/id1594183810) - 自动化执行捷径工具

可以根据时间，Wi-Fi, 唤醒休眠等条件自动化执行指定的捷径。可以实现如早上 10 点切换到浅色模式，下午 3 点切换到深色模式等。

![](https://pocket.haydenhayden.com/blog/202404202139029.png?x-oss-process=image/resize,w_1000,m_lfit)

17. [Yoink](https://apps.apple.com/us/app/yoink-better-drag-and-drop/id457622435) - 文件中转站

文件拖拽中转站，拖拽文件时，可以先拖到 Yoink 中，然后再拖到目标文件夹。

![](https://pocket.haydenhayden.com/blog/202404202144485.png?x-oss-process=image/resize,w_1000,m_lfit)

18. [Raycast](https://www.raycast.com/) - 快捷启动工具

支持快速启动应用，执行脚本，查看剪贴板历史等。

有丰富的插件可以满足各种需求。

![](https://pocket.haydenhayden.com/blog/202404202149876.png?x-oss-process=image/resize,w_1000,m_lfit)

19. [Logseq](https://logseq.com/) - 笔记工具

开源免费的大纲双链笔记工具。

![](https://pocket.haydenhayden.com/blog/202404202159502.png?x-oss-process=image/resize,w_1000,m_lfit)

20. [PicGo](https://picgo.github.io/PicGo-Doc/en/guide/) - 图床工具

开源免费的图床工具，支持多种图床。

### 软件图标美化

有些软件的图标不太好看，比如欧陆词典，可以先到 [macOS App icons](https://macosicons.com/#/) 下载对应的图标，然后在应用程序中右键 -> 显示简介 -> 拖动新图标到原图标上完成替换。

### 解决应用无法打开

有些应用可能会提示:

> xxx.app 已损坏，无法打开，你应该将它移到废纸篓。

这时可以尝试在终端中输入以下命令：

```bash
xattr -d com.apple.quarantine /Applications/xxx.app
```

## 开发配置

### [Homebrew](https://brew.sh/)

Homebrew 是 MacOS 上的包管理工具，可以用来安装各种软件，甚至字体。

### 字体安装

1. [Githubnext Monaspace Font](https://github.com/githubnext/monaspace)

代码编辑器中使用的字体。

![](https://pocket.haydenhayden.com/blog/202404210958806.png?x-oss-process=image/resize,w_1000,m_lfit)

安装：
```bash
brew tap homebrew/cask-fonts
brew install font-monaspace
```

2. [Nerd Fonts](https://www.nerdfonts.com/)

终端使用的字体。包含图标字体，可以在终端中显示 Git 等图标。

![](https://pocket.haydenhayden.com/blog/202404211005699.png?x-oss-process=image/resize,w_1000,m_lfit)

https://github.com/ryanoasis/nerd-fonts?tab=readme-ov-file#option-2-homebrew-fonts

安装：
```bash
brew tap homebrew/cask-fonts
brew install font-hack-nerd-font
```

### [Warp](https://www.warp.dev/) - 命令行工具

开箱即用的命令行工具，无需配置，像 ide 一样自带命令补全，语法高亮，AI 提示等功能。

![](https://pocket.haydenhayden.com/blog/202404210950527.gif)

### [VSCode](https://code.visualstudio.com/) - 代码编辑器

微软出品的代码编辑器，支持丰富的插件，可以满足各种需求。

### 命令行美化

日常使用的 Warp 开箱即用，不需要额外配置。但是在 VSCode 中使用终端时，还需要再配置一下。

Mac 自带的终端是 zsh，由于我日常用 Warp，只在小部分情况下使用 VSCode 的终端，所以并没有安装 oh-my-zsh。以下插件可以直接用 homebrew 安装。

1. [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) - 命令自动补全
2. [zsh-syntax-highligh](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md) - 命令语法高亮
3. [starship](https://starship.rs/) - 命令行输入框美化
4. [neofetch](https://github.com/dylanaraps/neofetch) - 终端显示系统信息
5. [onefetch](https://github.com/o2sh/onefetch?tab=readme-ov-file) - 终端显示 git 仓库信息

### [CodeWhisperer for command line](https://docs.aws.amazon.com/codewhisperer/latest/userguide/command-line.html)

[Fig](https://fig.io/) 被收购后，AWS 推出了 CodeWhisperer，可以在终端中使用代码补全，自带了 AI 问答功能。

同样的这些功能在 Warp 中也有，之所以安装时因为偶尔需要在 VSCdoe 终端中使用。

![](https://pocket.haydenhayden.com/blog/202404211444876.gif)

### [czg](https://cz-git.qbb.sh/zh/cli) - git commit 工具

1. 安装

```bash
brew install czg
```

2. 全局配置

增加 `~/cz.config.js` 文件，内容如下：

```js
// https://cz-git.qbb.sh/config/
/** @type {import('cz-git').CommitizenGitOptions} */
module.exports = {
  alias: { fd: 'docs: fix typos' },
  messages: {
    type: 'Select the type of change that you\'re committing:',
    scope: 'Denote the SCOPE of this change (optional):',
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
    footerPrefixesSelect: 'Select the ISSUES type of changeList by this change (optional):',
    customFooterPrefix: 'Input ISSUES prefix:',
    footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
    generatingByAI: 'Generating your AI commit subject...',
    generatedSelectByAI: 'Select suitable subject by AI generated:',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },
  types: [
    { value: 'feat', name: 'feat:     A new feature', emoji: ':sparkles:' },
    { value: 'fix', name: 'fix:      A bug fix', emoji: ':bug:' },
    { value: 'docs', name: 'docs:     Documentation only changes', emoji: ':memo:' },
    { value: 'style', name: 'style:    Format some code(white space, formatting, missing semicolon)', emoji: ':art:' },
    { value: 'refactor', name: 'refactor: Refactor some code', emoji: ':recycle:' },
    { value: 'build', name: 'build:    Changes that affect the build system or external dependencies', emoji: ':package:' },
    { value: 'ci', name: 'ci:       Changes to our CI configuration files and scripts', emoji: ':construction_worker:' },
    { value: 'test', name: 'test:     Adding missing tests or correcting existing tests', emoji: ':white_check_mark:' },
    { value: 'perf', name: 'perf:     A code change that improves performance', emoji: ':zap:' },
    { value: 'revert', name: 'revert:   Reverts a previous commit', emoji: ':rewind:' },
    { value: 'chore', name: 'chore:    Other changes that don\'t modify src or test files(gitignore changes)', emoji: ':wrench:' },
  ],
  useEmoji: true,
  emojiAlign: 'center',
  useAI: false,
  aiNumber: 1,
  themeColorCode: '',
  scopes: [],
  allowCustomScopes: true,
  allowEmptyScopes: true,
  customScopesAlign: 'bottom',
  customScopesAlias: 'custom',
  emptyScopesAlias: 'empty',
  upperCaseSubject: false,
  markBreakingChangeMode: false,
  allowBreakingChanges: ['feat', 'fix'],
  breaklineNumber: 100,
  breaklineChar: '|',
  skipQuestions: [],
  issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
  customIssuePrefixAlign: 'top',
  emptyIssuePrefixAlias: 'skip',
  customIssuePrefixAlias: 'custom',
  allowCustomIssuePrefix: true,
  allowEmptyIssuePrefix: true,
  confirmColorize: true,
  maxHeaderLength: Infinity,
  maxSubjectLength: Infinity,
  minSubjectLength: 0,
  scopeOverrides: undefined,
  defaultBody: '',
  defaultIssues: '',
  defaultScope: '',
  defaultSubject: ''
}
```

3. 增加 alias

```bash
# ~/.zshrc
alias gcz="git czg"
```

### 配置常用命令别名

```bash
# ~/.zshrc
# Alias
alias Code="cd ~/Code"

alias gcz="git czg"
alias gaa="git add -A"
alias gst="git status"
alias gp="git push"
alias gck="git checkout"
alias glg="git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias gwork='git config user.name "Hayden Chen" && git config user.email "hayden@work.com"'
```

### [OrbStack](https://orbstack.dev/)

轻量快速的 Docker Desktop 替代品。

### [Hoppscotch](https://github.com/hoppscotch/hoppscotch)

开源免费的 API 请求工具。Postman 的替代品。

![](https://pocket.haydenhayden.com/blog/202404211504254.png?x-oss-process=image/resize,w_1000,m_lfit)

### [BeeKeeper Studio](https://www.beekeeperstudio.io/) - 数据库管理工具

开源免费的数据库管理工具，支持多种数据库：MySQL, Postgres, SQLite, SQL Server。

![](https://pocket.haydenhayden.com/blog/202404211507885.png?x-oss-process=image/resize,w_1000,m_lfit)

## 参考文档

- [Mac 教程](https://44maker.github.io/wiki/Mac/index.html)
- [antfu use](https://github.com/antfu/use)
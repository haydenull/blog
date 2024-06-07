---
title: GitLab CI/CD 101
description: GitLab CI/CD 入门指南。
date: 2024-06-05
updatedDate: 2024-06-07
cover: https://pocket.haydenhayden.com/blog/202406061538928.jpg
---

如无特殊说明，本文中的 GitLab CI/CD 指的是 GitLab 13.12.0 版本的 CI/CD。

## GitLab CI/CD 概述

GitLab CI/CD 是 GitLab 提供的持续集成和持续部署服务，可以帮助开发者自动化构建、测试和部署应用程序。

CI 指的是持续集成（Continuous Integration），CD 指的是持续部署（Continuous Deployment）或持续交付（Continuous Delivery）。

![](https://pocket.haydenhayden.com/blog/202406061545434.png?x-oss-process=image/resize,w_1000,m_lfit)

> **持续集成**是指频繁地将代码集成到主干分支中，并通过自动化的测试来验证每次集成。其目的是尽早发现集成问题，减少集成过程中的冲突和错误。
>
> **持续交付**是指在持续集成的基础上，将代码自动化部署到类似于生产环境的预发布环境，并进行进一步的测试和验证。目的是确保代码可以随时安全地发布到生产环境。
>
> **持续部署**是持续交付的进一步发展，是指代码通过所有测试和验证后，自动部署到生产环境，无需人工干预。

总而言之，GitLab CI/CD 就是在开发者变更代码后，自动执行一系列预定义的任务，如测试、构建、部署等，以确保代码质量和应用程序的稳定性，同时提高开发效率。

## GitLab CI/CD 基础概念

前边我们提到了 GitLab CI/CD 是由一系列任务组成的，所有这些任务组成了一个**流水线（Pipeline）**，流水线是 GitLab CI/CD 的核心概念。

为了更好地组织 Pipeline 下的任务，GitLab CI/CD 引入了 **Stage** 的概念，Stage 是一组相关的任务，它们按照顺序执行，只有上一个 Stage 的任务执行成功后，才会执行下一个 Stage 的任务。

Stage 又由 Job 组成，**Job** 是 Pipeline 的最小执行单元，它定义了一个任务的执行逻辑，如何执行、在哪个 Runner 上执行、执行成功后如何通知等。

而 **Runner** 是 GitLab CI/CD 的执行者，它负责执行 Job 中定义的任务，Runner 可以是 GitLab 提供的共享 Runner，也可以是用户自己搭建的私有 Runner。

![](https://pocket.haydenhayden.com/blog/202406061557825.png?x-oss-process=image/resize,w_1000,m_lfit)

### 执行顺序

- **Stage**: 按照定义的顺序执行，只有上一个 Stage 的任务执行成功后，才会执行下一个 Stage 的任务。
- **Job**: 同一个 Stage 中的 Job 是并行执行的。
- 使用 [needs](https://docs.gitlab.com/ee/ci/yaml/index.html#needs) 可以控制 Job 的执行顺序。

### 创建一个 Pipeline

在 GitLab 项目中，创建一个 `.gitlab-ci.yml` 文件，定义 Pipeline 的配置信息，包括 Stage、Job、Runner 等。

```yaml
stages: # 定义 Pipeline 中的 stage
  - test
  - build
  - deploy

test: # job 名
  stage: test # job 所属的 stage
  script: # job 的执行脚本
    - echo "Running tests..."
  tags: # 指定执行 job 的 runner
    - docker
  rules: # job 的触发规则
    - if: '$CI_COMMIT_REF_NAME == "main"'
```

将代码提交到 GitLab 仓库后，GitLab 会自动检测到 `.gitlab-ci.yml` 文件，根据配置信息创建一个 Pipeline，然后执行 Pipeline 中定义的任务。

## 高级功能

### 变量 Variables

GitLab CI 中常用的变量有三类：
1. 预定义变量
2. `.gitlab-ci.yml` 中定义的变量
3. 通过 GitLab Web 界面设置的环境变量

GitLab 有一些预定义的变量，如 `$CI_COMMIT_REF_NAME`、`$CI_COMMIT_SHA` 等，这些变量可以在 `.gitlab-ci.yml` 中直接使用。具体的文档可以参考 [Predefined CI/CD variables reference](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)。


```yaml{5}
test:
  stage: test
  script:
    - echo "Running tests..."
    - echo "Commit SHA: $CI_COMMIT_SHA"
```

开发者也可以直接在 `.gitlab-ci.yml` 中定义变量，然后在 Job 的执行脚本中使用。

```yaml{1-2,6-7,10-11}
variables:
  GLOBAL_VAR: "global variable"

test:
  stage: test
  variables:
    JOB_VAR: "job variable"
  script:
    - echo "Running tests..."
    - echo "Global variable: $GLOBAL_VAR"
    - echo "Job variable: $JOB_VAR"
```

注意区分全局变量和 Job 变量的作用域。

对于一些需要保密的信息，如密码、密钥等，可以通过 GitLab Web 界面设置环境变量，然后在 `.gitlab-ci.yml` 中使用。

![](https://pocket.haydenhayden.com/blog/202406061616304.png?x-oss-process=image/resize,w_1000,m_lfit)

```yaml{5}
test:
  stage: test
  script:
    - echo "Running tests..."
    - echo "Token: $COMMON_CI_GITLAB_TOKEN"
```

### 缓存 Cache

在 GitLab CI 中，可以通过 Cache 来缓存一些构建过程中的中间产物，例如 npm 依赖，在 之后的 job 和 pipeline 中可以重用这些缓存，加快构建速度。

```yaml{6-11}
build:
  stage: build
  script:
    - npm install
    - npm run build
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - node_modules
```

- **key**: 指定缓存的 key，可以是一个字符串或一个文件，用于标识缓存的唯一性。
- **paths**: 指定需要缓存的目录或文件。
- **policy**: 指定缓存的策略，有 pull、push、pull-push 三种策略。默认为 pull-push，即在 job 开始时尝试拉取缓存，执行结束时尝试推送缓存。

### 工件 Artifacts

Artifacts 是 GitLab CI 中用于保存构建产物的机制，可以将构建产物从一个 job 传递到另一个 job，或者保存到 GitLab 服务器上，以便后续下载。

```yaml{5-7,11-12}
build-app:
  stage: build-app
  script:
    - npm run build
  artifacts:
    paths:
      - dist

build-image:
  stage: build-image
  dependencies:
    - build-app
  script:
    - docker build -t my-app .
```

在上面的例子中，`build-app` job 构建了一个前端应用，将构建产物保存到 `dist` 目录，然后通过 artifacts 机制将 `dist` 目录传递给 `build-image` job，用于构建 Docker 镜像。

这里 `dependencies` 指定了 `build-image` job 依赖于 `build-app` job 的执行结果，保证 `build-image` job 可以拿到 `dist` 目录。

### 代码复用

在 GitLab CI 中，常见的代码复用方式有四种：

1. 使用 `include` 关键字引入外部文件
2. 使用 `extends` 关键字继承 Job
3. 使用 `anchors` 定义可重用的配置片段
4. 使用 CI/CD Components

**方法1:** 将公共的 CI 配置放在单独的文件中，然后在 .gitlab-ci.yml 文件中使用 `include` 指令引入这些公共配置文件。

```yaml
include:
  - project: "hikari/f2e/common-components/common-ci-cd"
    ref: master
    file: "/templates/web-docker.yml"
```

**方法2:** `extends` 指令允许一个 job 继承另一个 job 的配置。可以定义一个基础 job，然后让其他 job 继承它。

```yaml{1-3,6}
.tests:
  script: rake test
  stage: test

rspec:
  extends: .tests
  script: rake rspec
```

合并结果为：

```yaml
rspec:
  script: rake rspec
  stage: test
```

**方法3:** 锚点（anchors）是用来简化和复用配置的一种 YAML 语法特性。它们允许你定义一组配置片段，并在同一个文件中多次引用这些片段。

```yaml{1-5,8}
.job_template: &job_configuration
  image: ruby:2.6
  services:
    - postgres
    - redis

test1:
  <<: *job_configuration
  script:
    - test1 project
```

合并结果为:

```yaml
test1:
  image: ruby:2.6
  services:
    - postgres
    - redis
  script:
    - test1 project
```

**方法4:** [GitLab CI/CD Components](https://docs.gitlab.com/ee/ci/components/) 是可重用的 CI/CD 配置片段，可以在不同的项目中共享和重用。

> [!warning]
> GitLab CI/CD Components 是 GitLab 16.0 版本新增的功能。

### needs 与 dependencies

`needs` 用于指定 job 之间的依赖关系，即一个 job 依赖于另一个 job 的执行结果。他可以改变 job 的执行顺序。

```yaml{15-16}
job1:
  stage: test
  script:
    - echo "Running job1"

job2:
  stage: test
  script:
    - echo "Running job2"

job3:
  stage: build
  script:
    - echo "Running job3"
  needs:
    - job1
```

上述配置中，job1 job2 属于 test stage, job3 属于 build stage。正常情况下 job3 需要等 job1 与 job2 执行完毕后才能执行。但是我们给 job3 添加了 needs: - job1, 这样 job3 只需要等 job1 执行完毕后就可以执行了。

> [!note]
> `needs` 的值只能是之前 stage 里定义的 job，但是从 14.1 版本开始开启 `:ci_same_stage_job_needs` 后可以支持同一 stage 里的 job。

`dependencies` 用于指定 job 需要下载哪些 job 的 artifacts，其值也必须是之前 stage 里定义的 job。未指定时默认下载之前 stage 的所有 job 的 artifacts。

`needs` 默认会下载指定 job 的 artifacts，所以不要同时使用 `needs` 和 `dependencies`。

## 常见场景

### 判断包管理器并缓存依赖

由于包管理器的类型需要在 job 执行时动态判断，而 cache 无法获取 job script 内定义的变量，定义全局变量然后在 script 内修改也不行，所以需要在 job script 中创建一个 txt 文件存储 lock 文件内容，作为缓存 key。

查询官方文档有一个解决方案 [Pass an environment variable from the script section to another section in the same job](https://docs.gitlab.com/ee/ci/variables/#pass-an-environment-variable-from-the-script-section-to-another-section-in-the-same-job)，不过可能是我的 GitLab 版本不对，无法使用，所以采用了这种方式。

```yaml{14,17,20,24,27,30,39-43}
# --------------------------------------------------------------------
# 打包前端代码
# --------------------------------------------------------------------
build-app:
  stage: build
  before_script:
    # 创建一个 txt 文件存储 lock 文件内容，作为缓存 key
    # 依据包管理器准备环境，设置缓存路径，设置安装命令和打包命令
    - >
      if [ -f "pnpm-lock.yaml" ]; then
        corepack enable;
        corepack prepare pnpm@latest-8 --activate;
        PACKAGE_MANAGER_VERSION="pnpm $(pnpm --version)";
        pnpm config set store-dir .pkg-cache;
        INSTALL_CMD="pnpm install --frozen-lockfile";
        BUILD_CMD="pnpm run build:$ENV";
        cat pnpm-lock.yaml > .common-ci-pkg-cache-key.txt;
      elif [ -f "yarn.lock" ]; then
        PACKAGE_MANAGER_VERSION="yarn $(yarn --version)";
        yarn config set yarn-offline-mirror $PWD/.pkg-cache;
        yarn config set yarn-offline-mirror-pruning true;
        INSTALL_CMD="yarn install --frozen-lockfile";
        BUILD_CMD="yarn run build:$ENV";
        cat yarn.lock > .common-ci-pkg-cache-key.txt;
      elif [ -f "package-lock.json" ]; then
        PACKAGE_MANAGER_VERSION="npm $(npm --version)";
        npm ci --cache .pkg-cache --prefer-offline;
        INSTALL_CMD="npm install";
        BUILD_CMD="npm run build:$ENV";
        cat package-lock.json > .common-ci-pkg-cache-key.txt;
      else
        echo -e "${TXT_RED} ERROR: 未找到包管理器文件" && exit 1;
      fi;
  script:
    - $INSTALL_CMD
    - $BUILD_CMD
  # 注意：cache 内无法获取 job script 内定义的变量
  cache:
    key:
      files:
        - .common-ci-pkg-cache-key.txt
    paths:
      - .pkg-cache
```

> [!tip]
> `yarn config set yarn-offline-mirror $PWD/.pkg-cache` 这里的路径需要加上 `$PWD`。

## 参考资料
- [GitLab CI CD Tutorial for Beginners](https://www.youtube.com/watch?v=qP8kir2GUgo&t=2439s)
- [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
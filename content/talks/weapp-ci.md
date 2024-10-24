---
title: 微信小程序 CI/CD 实践
description: 使用 GitLab CI/CD 实现微信小程序的自动化构建和部署
author: Haydenull
date: 2024-10-25
slug: weapp-ci
spaUrl: https://slides.haydenhayden.com/2024/weapp-ci
pdfUrl: https://slides.haydenhayden.com/2024/weapp-ci/pdf
repoUrl: https://github.com/haydenull/slides/tree/main/2024-10-25
---

> [!warning] 部署脚本示例
> 以下是部署脚本示例，目前只在 Taro 项目中测试通过，仅供参考

```js
/**
 * 上传小程序代码到微信平台
 * https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html
 */

const ci = require('miniprogram-ci')
const fs = require('fs')
const path = require('path')

/** 从运行时参数中获取 appid version desc projectPath */
const main = async () => {
  const { APP_ID, VERSION, DESC, PROJECT_PATH } = process.env

  console.log('APP_ID', APP_ID)
  console.log('VERSION', VERSION)
  console.log('DESC', DESC)
  console.log('PROJECT_PATH', PROJECT_PATH)

  // 读取 PROJECT_PATH 目录下的 project.config.json 文件，移除 json 文件中的 miniprogramRoot 属性
  // 参见这个 issue: https://github.com/NervJS/taro/issues/15947
  const projectConfigPath = path.join(PROJECT_PATH, 'project.config.json')
  const projectConfig = JSON.parse(fs.readFileSync(projectConfigPath, 'utf8'))
  delete projectConfig.miniprogramRoot
  fs.writeFileSync(projectConfigPath, JSON.stringify(projectConfig, null, 2))

  const project = new ci.Project({
    appid: APP_ID,
    type: 'miniProgram',
    projectPath: PROJECT_PATH,
    privateKeyPath: './private.key',
    ignores: ['node_modules/**/*'],
  })

  // 上传
  console.log('\x1b[32m开始上传小程序代码到微信平台...\x1b[0m')
  const uploadResult = await ci.upload({
    project,
    version: VERSION,
    desc: DESC,
    setting: {
      es6: true,
      minifyJS: true,
      minifyWXML: true,
      minifyWXSS: true,
    },
    onProgressUpdate: console.log,
  })

  console.log('\x1b[32m上传结果\x1b[0m')
  console.log(uploadResult)
  console.log('\x1b[32m上传动作已结束\x1b[0m')

  console.log('\x1b[32m请前往微信公众平台查看上传结果并设置为体验版: https://mp.weixin.qq.com/wxamp/wacodepage/getcodepage?token=2141894780&lang=zh_CN\x1b[0m')

  process.exit(0)
}

main()
```
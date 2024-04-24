'use client'

import type ArtalkType from 'artalk'
import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

const ArtalkComment = ({ pageKey, pageTitle }: { pageKey: string; pageTitle: string }) => {
  const { theme } = useTheme()
  const artalkRef = useRef<ArtalkType>()

  // 设置 Artalk 的主题
  useEffect(() => {
    if (artalkRef.current) {
      artalkRef.current.setDarkMode(theme === 'dark')
    }
  }, [theme])

  // 初始化 Artalk
  useEffect(() => {
    const initArtalk = () => {
      // @ts-expect-error 通过 script 标签引入 Artalk
      artalkRef.current = window.Artalk.init({
        el: '#artalk-comments', // 绑定元素的 Selector
        pageKey, // 固定链接 (留空自动获取)
        pageTitle, // 页面标题 (留空自动获取)
        server: 'https://artalk.haydenhayden.com', // 后端地址
        site: 'blog', // 站点 ID
      })
      // 修改 input placeholder
      setTimeout(() => {
        document.querySelector('.atk-nick')?.setAttribute('placeholder', '昵称*')
        document.querySelector('.atk-email')?.setAttribute('placeholder', '邮箱*')
      }, 2000)
    }

    const getIsReady = () => {
      if (!window || artalkRef.current) return false
      const slotElement = window.document.getElementById('artalk-comments')
      console.log('slotElement', slotElement)
      console.log('window.Artalk', window.Artalk)
      return Boolean(slotElement) && Boolean(window.Artalk)
    }
    let timer: NodeJS.Timeout | null = null
    let attempts = 0
    const maxAttempts = 10
    if (getIsReady()) {
      initArtalk()
    } else {
      // 如果 Artalk 未定义，等待 500 毫秒后再次尝试
      timer = setInterval(() => {
        if (attempts >= maxAttempts && timer) {
          return clearInterval(timer)
        }
        attempts += 1
        if (getIsReady()) {
          if (timer) clearInterval(timer)
          initArtalk()
        }
      }, 500)
    }

    // 在组件卸载时清除定时器
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [pageKey, pageTitle])

  // 卸载 Artalk
  // 由于 Artalk 初始化时会将 id="artalk-comments" 元素重置，导致组件卸载后无法再次初始化，而本地开发 useEffect 执行两次会触发 destroy
  // 导致第二次 useEffect 时找到不到 id="artalk-comments" 元素，所以本地开发需要手动注释掉这段代码，否则无法正常预览效果
  useEffect(() => {
    return () => {
      if (artalkRef.current) {
        artalkRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="mt-20">
      <div id="artalk-comments"></div>
    </div>
  )
}

export default ArtalkComment

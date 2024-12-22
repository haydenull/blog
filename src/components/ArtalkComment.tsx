'use client'

import Artalk from 'artalk'
import 'artalk/Artalk.css'
import { useTheme } from 'next-themes'
import { useCallback, useRef } from 'react'

const ArtalkComment = ({ pageKey, pageTitle }: { pageKey: string; pageTitle: string }) => {
  const { theme } = useTheme()
  const artalkRef = useRef<Artalk>()

  const handleContainerInit = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) {
        return
      }
      if (artalkRef.current) {
        artalkRef.current.destroy()
        artalkRef.current = undefined
      }
      artalkRef.current = Artalk.init({
        el: node,
        pageKey,
        pageTitle,
        server: 'https://artalk.chuanfang.org',
        site: 'blog',
        darkMode: theme === 'dark',
      })
    },
    [pageKey, pageTitle, theme],
  )

  return (
    <div className="mt-20">
      <div id="artalk-comments" ref={handleContainerInit}></div>
    </div>
  )
}

export default ArtalkComment

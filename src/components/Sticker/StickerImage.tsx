'use client'

import AnyTouch from 'any-touch'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

export type StickerStyleInfo = { top?: string; left?: string; scale?: number; rotate?: number }

function StickerImg({
  url,
  index,
  className,
  containerRef,
  styleInfo = {},
  onStyleChange,
}: {
  url: string
  index: number
  className?: string
  containerRef: React.RefObject<HTMLDivElement | null>
  styleInfo?: StickerStyleInfo
  onStyleChange?: (styleInfo: StickerStyleInfo) => void
}) {
  const imgRef = useRef<HTMLImageElement>(null)
  const { top = '0%', left = '0%', scale = 1, rotate = 0 } = styleInfo

  useEffect(() => {
    if (!imgRef.current || !containerRef?.current) return
    const at = new AnyTouch(imgRef.current)
    const containerRect = containerRef.current.getBoundingClientRect()

    let startX = 0
    let startY = 0

    at.on('panstart', () => {
      if (!imgRef.current) return
      // 记录图片初始位置
      startX = imgRef.current.getBoundingClientRect().left
      startY = imgRef.current.getBoundingClientRect().top
    })

    at.on('panmove', (ev) => {
      // 坐标转为百分比
      const left = (ev.displacementX + startX) / containerRect.width
      const top = (ev.displacementY + startY) / containerRect.height
      if (onStyleChange) {
        onStyleChange({ left: `${left * 100}%`, top: `${top * 100}%` })
      }
    })

    return () => {
      at.destroy()
    }
  }, [])

  return (
    <img
      ref={imgRef}
      src={url}
      className={className}
      style={{
        top,
        left,
        scale,
        transform: `rotate(${rotate}deg)`,
      }}
    />
  )
}

export default StickerImg

'use client'

import AnyTouch from 'any-touch'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

function StickerImg({
  url,
  index,
  style,
  className,
  containerRef,
}: {
  url: string
  index: number
  className?: string
  style?: React.CSSProperties
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [position, setPosition] = useState({ x: style?.left ?? 0, y: style?.top ?? 0 })

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
      setPosition({ x: `${left * 100}%`, y: `${top * 100}%` })
    })

    return () => {
      at.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <img
      ref={imgRef}
      src={url}
      className={cn(
        'absolute w-14 select-none opacity-0 transition-all hover:z-50 hover:!scale-125 hover:transition-none lg:w-16 lg:opacity-100',
        {
          // 默认屏幕展示前 5 个贴纸
          'opacity-100': index < 5,
          // md 屏幕展示前 7 个贴纸
          'md:opacity-100': index < 7,
        },
        className,
      )}
      style={{
        ...style,
        left: position.x,
        top: position.y,
      }}
    />
  )
}

export default StickerImg

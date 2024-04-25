'use client'

import React, { useEffect, useState, type DOMAttributes } from 'react'

import { cn } from '@/lib/utils'

import NextImageWithBlur from '../NextImageWithBlur'

const Image = ({ src = '', alt = '', ...props }: { src?: string; alt?: string }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <>
      {isFullscreen && (
        <div
          className="fixed left-0 top-0 z-[9000] flex h-screen w-screen cursor-zoom-out items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={toggleFullscreen}
        >
          <img src={src} alt={alt} className="max-h-full max-w-full !rounded-none dark:opacity-80" />
        </div>
      )}
      {/* <img src={src} alt={alt} {...props} onClick={toggleFullscreen} className="cursor-zoom-in dark:opacity-80" /> */}
      <ProgressiveImage src={src} alt={alt} onClick={toggleFullscreen} className="cursor-zoom-in dark:opacity-80" />
      {/* <div className="relative">
        <NextImageWithBlur src={src} alt={alt} />
      </div> */}
    </>
  )
}

/**
 * 获取缩略图地址
 * https://pocket.haydenhayden.com/blog/202403022120705.png
 * https://pocket.haydenhayden.com/blog/202403022120705.png?x-oss-process=image/resize,w_1000,m_lfit
 */
function getThumbnailUrl(src: string): string {
  const url = new URL(src)
  // 如果是 oss 图片才进行缩略图处理
  if (url.host !== 'pocket.haydenhayden.com') return src

  const process = 'image/resize,w_20,m_lfit/blur,r_30,s_2'
  url.searchParams.set('x-oss-process', process)
  return url.toString()
}

export const ProgressiveImage = ({
  src,
  placeholder,
  alt,
  className,
}: DOMAttributes<HTMLImageElement> & {
  src?: string
  alt?: string
  className?: string
  placeholder?: string
}) => {
  const [loaded, setLoaded] = useState(false)
  const thumbnailUrl = placeholder ? placeholder : getThumbnailUrl(src ?? '')

  useEffect(() => {
    const img = new window.Image()
    img.src = src ?? ''
    img.onload = () => {
      setLoaded(true)
    }
  }, [src])

  return (
    <img
      src={loaded ? src : thumbnailUrl}
      alt={alt}
      className={cn(
        'transition-all',
        {
          'w-full': !loaded,
        },
        className,
      )}
    />
  )
}

export default Image

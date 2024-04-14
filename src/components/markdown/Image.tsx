'use client'

import React, { useState } from 'react'

import { cn } from '@/lib/utils'

const Image = ({ src, alt, ...props }: { src?: string; alt?: string }) => {
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
      <img src={src} alt={alt} {...props} onClick={toggleFullscreen} className="cursor-zoom-in dark:opacity-80" />
    </>
  )
}

export default Image

'use client'

import { useLocalStorageValue } from '@react-hookz/web'
import { useRef } from 'react'
import MingcuteShuffleLine from '~icons/mingcute/shuffle-line'

import { cn } from '@/lib/utils'

import { FollowPointer, FollowerPointerCard } from '../ui/following-pointer'
import StickerImg from './StickerImage'

const Sticker = ({ className }: { className?: string }) => {
  const boardRef = useRef<HTMLDivElement>(null)
  const { value: stickerList, set: setStickerList } = useLocalStorageValue('stickerList', {
    defaultValue: generateRandomStickers(),
  })

  const shuffleStickers = () => {
    setStickerList(generateRandomStickers())
  }

  return (
    <div className="group relative h-28 overflow-hidden md:h-40">
      {/* 线条背景 */}
      <div
        ref={boardRef}
        className="via-zinc-white h-full bg-gradient-to-r from-white via-[white_70%,_#EEEFF2_70%] to-[#EEEFF2] bg-[length:6px_100%]
          dark:from-zinc-950 dark:via-[#09090b_70%,_#3f3f46_70%] dark:to-zinc-700"
      >
        {stickerList?.map(({ url, top, left, rotate, scale }, index) => (
          // <FollowerPointerCard key={url + index} className="z-50">
          <StickerImg
            key={url + index}
            containerRef={boardRef}
            url={url}
            index={index}
            className={cn(
              `absolute w-14 select-none opacity-0 transition-all hover:z-50 hover:!scale-125 hover:transition-none lg:w-16
              lg:opacity-100`,
              {
                // 默认屏幕展示前 5 个贴纸
                'opacity-100': index < 5,
                // md 屏幕展示前 7 个贴纸
                'md:opacity-100': index < 7,
              },
            )}
            styleInfo={{ rotate, scale, top, left }}
            onStyleChange={(styleInfo) => {
              setStickerList((pre = []) => {
                const newStickerList = pre.slice()
                newStickerList[index] = { ...newStickerList[index], ...styleInfo }
                return newStickerList
              })
            }}
          />
          // </FollowerPointerCard>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white
          [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-background"
      ></div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-white/20 via-30% to-white/90 dark:from-black/30
          dark:via-black/30 dark:to-black"
      ></div>
      <button
        className="pointer-events-none absolute left-4 top-4 flex items-center rounded bg-colorful-50 px-1 text-[10px] text-colorful-300
          opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-colorful-950/50
          dark:text-colorful-500"
        onClick={shuffleStickers}
      >
        <MingcuteShuffleLine /> shuffle
      </button>
    </div>
  )
}

/** 生成 -30 到 30 之间的随机数 */
function generateRandomRotate() {
  return Math.floor(Math.random() * 61) - 30
}
/** 生成 0.6 到 1.3 之间的随机数 */
function generateRandomScale() {
  return Math.random() * 0.6 + 0.7
}
/** 生成随机位置 */
function generateRandomPosition() {
  const top = Math.random() * 70
  const left = Math.random() * 90
  return { top: `${top}%`, left: `${left}%` }
}
const STICKERS = [
  {
    url: 'stickers/202404291539705.png',
  },
  {
    url: 'stickers/202404291612491.png',
  },
  {
    url: 'stickers/202404291612489.png',
  },
  {
    url: 'stickers/202404291612488.png',
  },
  {
    url: 'stickers/202404291615348.png',
  },
  {
    url: 'stickers/202404291615349.png',
  },
  {
    url: 'stickers/202404291615350.png',
  },
  {
    url: 'stickers/202404291615351.png',
  },
  {
    url: 'stickers/202404291615352.png',
  },
  {
    url: 'stickers/202404291615353.png',
  },
  {
    url: 'stickers/202404291617907.png',
  },
  {
    url: 'stickers/202404291617908.png',
  },
  {
    url: 'stickers/202404291617909.png',
  },
  {
    url: 'stickers/202404291617910.png',
  },
  {
    url: 'stickers/202404291617911.png',
  },
  {
    url: 'stickers/202404291617912.png',
  },
  {
    url: 'stickers/202404292046720.png',
  },
  {
    url: 'stickers/202404292046721.png',
  },
  {
    url: 'stickers/202404292046722.png',
  },
  {
    url: 'stickers/202404292046723.png',
  },
  {
    url: 'stickers/202404292046724.png',
  },
  {
    url: 'stickers/202404292046725.png',
  },
  {
    url: 'stickers/202404292048095.png',
  },
  {
    url: 'stickers/202404292048096.png',
  },
  {
    url: 'stickers/202404292048097.png',
  },
  {
    url: 'stickers/202404292048098.png',
  },
  {
    url: 'stickers/202404292048099.png',
  },
  {
    url: 'stickers/202404292048100.png',
  },
  {
    url: 'stickers/202404292048101.png',
  },
  {
    url: 'stickers/202404292048102.png',
  },
  {
    url: 'stickers/202404292048103.png',
  },
]
/** 随机选取8个贴纸  */
function generateRandomStickers() {
  const stickers = STICKERS.map((sticker) => ({
    ...generateRandomPosition(),
    rotate: generateRandomRotate(),
    scale: generateRandomScale(),
    ...sticker,
  }))
  return stickers.sort(() => Math.random() - 0.5).slice(0, 8)
}

export default Sticker

import { cn } from '@/lib/utils'

const STICKERS = [
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291539705.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291612491.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291612489.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291612488.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291615348.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291615349.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291615350.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291615351.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291615352.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291615353.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291617907.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291617908.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291617909.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291617910.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291617911.png',
  },
  {
    url: 'https://pocket.haydenhayden.com/blog/202404291617912.png',
  },
]

const Sticker = ({ className }: { className?: string }) => {
  const stickerList = generateRandomStickers(
    STICKERS.map((sticker) => ({
      ...generateRandomPosition(),
      rotate: generateRandomRotate(),
      scale: generateRandomScale(),
      ...sticker,
    })),
  )

  return (
    <div className="relative h-28 overflow-hidden md:h-40">
      {/* 线条背景 */}
      <div className="via-zinc-white h-full bg-gradient-to-r from-white via-[white_70%,_#EEEFF2_70%] to-[#EEEFF2] bg-[length:6px_100%] dark:from-zinc-950 dark:via-[#09090b_70%,_#1E1E21_70%] dark:to-[#1E1E21]">
        {stickerList.map(({ url, top, left, rotate, scale }, index) => (
          <img
            key={url + index}
            src={url}
            className={cn('absolute w-14 opacity-0 transition-all lg:w-16 lg:opacity-100', {
              // 默认屏幕展示前 5 个贴纸
              'opacity-100': index < 5,
              // md 屏幕展示前 7 个贴纸
              'md:opacity-100': index < 7,
            })}
            style={{ transform: `rotate(${rotate}deg)`, scale, top, left }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/25 via-30% to-white/90 dark:from-black/40 dark:via-black/40 dark:to-black"></div>
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
/** 随机选取8个贴纸 */
function generateRandomStickers<T>(stickers: T[]) {
  return stickers.sort(() => Math.random() - 0.5).slice(0, 8)
}

export default Sticker

import Image from 'next/image'

import Sticker from '@/components/Sticker'
import { GridBackground } from '@/components/ui/grid-background'

import Bento from './components/bento'

export default function Home() {
  return (
    <main className="relative px-6">
      {/* 顶部方格背景 */}
      <div>
        {/* <GridBackground className="absolute -z-10 h-28 md:h-40" /> */}
        {/* <div className="h-28 bg-transparent md:h-40"></div> */}
        <Sticker />
      </div>

      {/* 主体内容 */}
      {/* <div className="flex flex-col gap-10 bg-background px-4 py-8 text-foreground md:flex-row md:gap-6 md:px-16"> */}
      <div className="m-auto max-w-[450px] md:max-w-[800px] md:grid-cols-2">
        {/* 个人信息 */}
        {/* <div className="flex flex-1 flex-col gap-4">
          <div className="relative inset-0 size-16 overflow-hidden rounded-full border sm:size-24 md:size-28">
            <Image priority fill src="/assets/avatar.png" alt="avatar" />
          </div>
          <h1 className="text-4xl font-semibold">启封 Hayden</h1>
          <p className="text-muted-foreground">
            A front-end developer with a passion for using technology to increase personal efficiency and productivity
            💡.
          </p>
        </div> */}
        {/* Bento */}
        <Bento />
      </div>
    </main>
  )
}

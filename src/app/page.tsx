import Image from 'next/image'

import { GridBackground } from '@/components/ui/grid-background'

import Bento from './components/bento'

export default function Home() {
  return (
    <main className="relative">
      {/* 顶部方格背景 */}
      <div>
        <GridBackground className="absolute -z-10 h-28 md:h-40" />
        <div className="h-28 bg-transparent md:h-40"></div>
        {/* <Beam /> */}
      </div>

      {/* 主体内容 */}
      <div className="flex flex-col gap-10 bg-background px-16 py-8 text-foreground md:flex-row md:gap-6">
        {/* 个人信息 */}
        <div className="flex flex-1 flex-col gap-4">
          <Image
            className="inset-0 rounded-full border"
            src="/assets/avatar.png"
            alt="avatar"
            width={120}
            height={120}
          />
          <h1 className="text-3xl font-semibold">启封 Hayden</h1>
          <p className="text-muted-foreground">
            A front-end developer with a passion for using technology to increase personal efficiency and productivity
            💡.
          </p>
        </div>
        {/* Bento */}
        <Bento />
      </div>
    </main>
  )
}

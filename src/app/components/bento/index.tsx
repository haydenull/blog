import {
  IconBrandBilibili,
  IconBrandGithubFilled,
  IconBrandGmail,
  IconBrandX,
  IconBrandYoutubeFilled,
} from '@tabler/icons-react'

import GithubCalendar from '@/components/GithubCalendar'
import Ripple from '@/components/ui/ripple'
import { SparklesCore } from '@/components/ui/sparkles-core'

import AiFaDian from './AiFaDian'
import BentoCard from './BentoCard'
import Blog from './Blog'
import Buymeacoffee from './Buymeacoffee'
import RSS from './RSS'
import Weekly from './Weekly'

const Bento = () => {
  return (
    <div className="m-auto grid grid-cols-2 grid-rows-[repeat(10,_150px)] items-stretch gap-4 md:grid-cols-4 md:grid-rows-[repeat(5,_175px)]">
      {/* 介绍 */}
      <BentoCard className="col-span-2 flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <p className="text-foreground">
            Hi there! 👋 <b>I&apos;m Jaychouzzz</b>, a back-end developer with a passion for using technology to
            increase personal efficiency and productivity.
          </p>
        </div>
      </BentoCard>
      {/* 头像 */}
      <BentoCard className="col-span-2 flex items-center justify-center">
        <div className="relative size-20 md:size-24">
          <Ripple />
          <img src="/assets/avatar.png" alt="avatar" className="absolute z-10 size-full rounded-full" />
        </div>
      </BentoCard>
      {/* Quote */}
      <BentoCard className="relative col-span-2 flex-col items-center justify-center overflow-hidden bg-black dark:bg-black">
        <div className="absolute inset-0 h-full w-full">
          <SparklesCore
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="h-full w-full"
            particleColor="#FFFFFF"
          />
        </div>
        <p className="relative z-20 text-center text-3xl font-bold text-white">银河在上，文明永存</p>
      </BentoCard>
      {/* X */}
      <BentoCard className="group bg-slate-100 dark:bg-slate-900" url="https://x.com/jayzhouzj">
        <div>
          <div className="relative flex h-[40px] w-[40px] items-center justify-center">
            <div className="absolute h-full w-full rounded-md bg-black transition-all duration-300 group-hover:scale-[10]"></div>
            <IconBrandX className="relative h-7 w-7 text-white transition-all group-hover:-ml-[12px]" />
          </div>
          <p className="relative mt-1 text-black group-hover:text-white dark:text-foreground">@jayzhouzj</p>
        </div>
        <button className="relative w-[70px] rounded-full bg-black py-1.5 text-xs font-semibold group-hover:bg-white group-hover:text-black">
          Follow
        </button>
      </BentoCard>
      {/* YouTube */}
      <BentoCard
        className="group bg-[#FFF0F0] dark:bg-[#461616]"
        url="https://www.youtube.com/channel/UC0MJyksCchhu8dThnMbJw4g"
      >
        <div>
          <div className="relative flex h-[40px] w-[40px] items-center justify-center   ">
            <div className="absolute h-full w-full rounded-md bg-[#ff0000] transition-all duration-300 group-hover:scale-[10]"></div>
            <IconBrandYoutubeFilled className="relative h-7 w-7 text-white transition-all group-hover:-ml-[12px]" />
          </div>
          <p className="relative mt-1 text-black group-hover:text-white dark:text-foreground">@chouzzzjay9778</p>
        </div>
        <button
          className="relative w-[70px] rounded-full bg-[#ff0000] py-1.5 text-xs font-semibold text-white group-hover:bg-white
            group-hover:text-[#ff0000]"
        >
          Follow
        </button>
      </BentoCard>
      {/* Gmail */}
      <BentoCard className="group bg-[#E0F7FA] dark:bg-[#103136]" url="f18326186224@gmail.com">
        <div>
          <div className="relative flex h-[40px] w-[40px] items-center justify-center">
            <div
              className="absolute h-full w-full rounded-md bg-[#ff0000] transition-all duration-300 group-hover:scale-[7.5]"
              style={{
                background:
                  'linear-gradient(45deg, #92c5ff 25%, #ff7f7f 25%, #ff7f7f 50%, #ffe680 50%, #ffe680 75%, #80d6a2 75%)',
              }}
            ></div>
            <IconBrandGmail className="relative h-7 w-7 text-black transition-all group-hover:-ml-[12px]" />
          </div>
          <p className="relative mt-1 text-black group-hover:text-black dark:text-foreground">jaychouzzz</p>
        </div>
        <button className="relative w-[70px] rounded-full bg-black py-1.5 text-xs font-semibold text-white ">
          GMail
        </button>
      </BentoCard>
      {/* Bilibili */}
      <BentoCard className="group bg-white" url="https://space.bilibili.com/49696076">
        <div>
          <div className="relative flex h-[40px] w-[40px] items-center justify-center">
            <div className="absolute h-full w-full rounded-md bg-[#FB7299] transition-all duration-300 group-hover:scale-[10]"></div>
            <IconBrandBilibili className="relative h-7 w-7 text-white transition-all group-hover:-ml-[12px]" />
          </div>
          <p className="relative mt-1 text-black group-hover:text-white dark:text-foreground">甜甜的KKK</p>
        </div>
        <button
          className="relative w-[70px] rounded-full bg-[#FB7299] py-1.5 text-xs font-semibold text-white group-hover:bg-white
            group-hover:text-[#FB7299]"
        >
          关注
        </button>
      </BentoCard>
      {/* Github */}
      <BentoCard className="col-span-2 flex flex-row items-center" url="https://github.com/nichuanfang">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-md bg-[#333] ">
              <IconBrandGithubFilled className="h-7 w-7 text-white" />
            </div>
            <p className="mt-1 text-black dark:text-foreground">jaychouzzz</p>
          </div>
          <button className="w-[70px] rounded border bg-slate-50 py-1.5 text-xs font-semibold text-black dark:bg-[#333] dark:text-foreground">
            Follow
          </button>
        </div>
        <div className="flex min-w-[172px] max-w-[50%] justify-end overflow-hidden md:min-w-[240px] md:max-w-[60%]">
          <GithubCalendar />
        </div>
      </BentoCard>
      {/* 近期博客 x1 */}
      {/* <Blog /> */}
      {/* 近期周刊 x1 */}
      {/* <Weekly /> */}
      {/* RSS */}
      {/* <RSS /> */}
      {/* Buy Me A Coffee */}
      {/* <Buymeacoffee /> */}
      {/* 爱发电 */}
      {/* <AiFaDian /> */}
    </div>
  )
}

export default Bento

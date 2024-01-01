import {
  IconBrandBilibili,
  IconBrandGithubFilled,
  IconBrandGmail,
  IconBrandX,
  IconBrandYoutubeFilled,
} from '@tabler/icons-react'

import GithubCalendar from '@/components/GithubCalendar'
import { SparklesCore } from '@/components/ui/sparkles-core'

import BentoCard from './BentoCard'

const Bento = () => {
  return (
    <div className="grid min-w-[380px] grid-cols-2 gap-4 md:w-[400px] lg:w-[600px] lg:min-w-[760px] lg:grid-cols-4 xl:w-[820px] ">
      {/* Quote */}
      <BentoCard className="relative col-span-2 flex-col items-center justify-center overflow-hidden bg-black dark:bg-black">
        <div className="absolute inset-0 h-screen w-full">
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
      <BentoCard className="group bg-slate-100 dark:bg-slate-900">
        <div>
          <div className="relative flex h-[40px] w-[40px] items-center justify-center">
            <div className="absolute h-full w-full rounded-md bg-black transition-all duration-300 group-hover:scale-[10]"></div>
            <IconBrandX className="relative h-7 w-7 text-white transition-all group-hover:-ml-[12px]" />
          </div>
          <p className="relative mt-1 text-black group-hover:text-white dark:text-foreground">@haydenull</p>
        </div>
        <button className="relative w-[70px] rounded-full bg-black py-1.5 text-xs font-semibold group-hover:bg-white group-hover:text-black">
          Follow
        </button>
      </BentoCard>
      {/* YouTube */}
      <BentoCard className="group bg-[#FFF0F0] dark:bg-[#461616]">
        <div>
          <div className="relative flex h-[40px] w-[40px] items-center justify-center   ">
            <div className="absolute h-full w-full rounded-md bg-[#ff0000] transition-all duration-300 group-hover:scale-[10]"></div>
            <IconBrandYoutubeFilled className="relative h-7 w-7 text-white transition-all group-hover:-ml-[12px]" />
          </div>
          <p className="relative mt-1 text-black group-hover:text-white dark:text-foreground">@haydenut</p>
        </div>
        <button className="relative w-[70px] rounded-full bg-[#ff0000] py-1.5 text-xs font-semibold text-white group-hover:bg-white group-hover:text-[#ff0000] ">
          Follow
        </button>
      </BentoCard>
      {/* Gmail */}
      <BentoCard className="group bg-[#E0F7FA] dark:bg-[#103136]">
        <div>
          <div className="relative flex h-[40px] w-[40px] items-center justify-center">
            <div
              className="absolute h-full w-full rounded-md bg-[#ff0000] transition-all duration-300 group-hover:scale-[10]"
              style={{
                background:
                  'linear-gradient(45deg, #92c5ff 25%, #ff7f7f 25%, #ff7f7f 50%, #ffe680 50%, #ffe680 75%, #80d6a2 75%)',
              }}
            ></div>
            <IconBrandGmail className="relative h-7 w-7 text-black transition-all group-hover:-ml-[12px]" />
          </div>
          <p className="relative mt-1 text-black group-hover:text-black dark:text-foreground">hayden.chen.dev</p>
        </div>
        <button className="relative w-[70px] rounded-full bg-black py-1.5 text-xs font-semibold text-white ">
          GMail
        </button>
      </BentoCard>
      {/* Bilibili */}
      <BentoCard className="group bg-white">
        <div>
          <div className="relative flex h-[40px] w-[40px] items-center justify-center">
            <div className="absolute h-full w-full rounded-md bg-[#FB7299] transition-all duration-300 group-hover:scale-[10]"></div>
            <IconBrandBilibili className="relative h-7 w-7 text-white transition-all group-hover:-ml-[12px]" />
          </div>
          <p className="relative mt-1 text-black group-hover:text-white dark:text-foreground">启封Hayden</p>
        </div>
        <button className="relative w-[70px] rounded-full bg-[#FB7299] py-1.5 text-xs font-semibold text-white group-hover:bg-white group-hover:text-[#FB7299] ">
          关注
        </button>
      </BentoCard>
      {/* Github */}
      <BentoCard className="col-span-2 flex flex-row items-center">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-md bg-[#333] ">
              <IconBrandGithubFilled className="h-7 w-7 text-white" />
            </div>
            <p className="mt-1 text-black dark:text-foreground">@haydenull</p>
          </div>
          <button className="w-[70px] rounded border bg-slate-50 py-1.5 text-xs font-semibold text-black dark:bg-[#333] dark:text-foreground">
            Follow
          </button>
        </div>
        <div className="flex min-w-[240px] max-w-[60%] justify-end overflow-hidden">
          <GithubCalendar />
        </div>
      </BentoCard>
      {/* Buy Me A Coffee */}
      {/* 爱发电 */}
      {/* 近期博客 x2 */}
      {/* 近期周刊 x1 */}
      {/* 项目 */}
    </div>
  )
}

export default Bento

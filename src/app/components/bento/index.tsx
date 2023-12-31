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
    <div className="grid grid-cols-2 gap-4 md:w-[400px] md:grid-cols-4 lg:w-[600px] xl:w-[820px] ">
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
      <BentoCard className="bg-slate-100 dark:bg-slate-900">
        <div>
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-md bg-black">
            <IconBrandX className="h-7 w-7 text-white" />
          </div>
          <p className="mt-1 text-black dark:text-foreground">@haydenull</p>
        </div>
        <button className="w-[70px] rounded-full bg-black py-1.5 text-xs font-semibold ">Follow</button>
      </BentoCard>
      {/* YouTube */}
      <BentoCard className="bg-[#FFF0F0] dark:bg-[#461616]">
        <div>
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-md bg-[#ff0000] ">
            <IconBrandYoutubeFilled className="h-7 w-7 text-white" />
          </div>
          <p className="mt-1 text-black dark:text-foreground">@haydenut</p>
        </div>
        <button className="w-[70px] rounded-full bg-[#ff0000] py-1.5 text-xs font-semibold text-white ">Follow</button>
      </BentoCard>
      {/* Gmail */}
      <BentoCard className="bg-[#E0F7FA] dark:bg-[#103136]">
        <div>
          <div
            className="flex h-[40px] w-[40px] items-center justify-center rounded-md"
            style={{
              background:
                'linear-gradient(45deg, #92c5ff 25%, #ff7f7f 25%, #ff7f7f 50%, #ffe680 50%, #ffe680 75%, #80d6a2 75%)',
            }}
          >
            <IconBrandGmail className="h-7 w-7 text-black" />
          </div>
          <p className="mt-1 text-black dark:text-foreground">hayden.chen.dev</p>
        </div>
        <button className="w-[70px] rounded-full bg-black py-1.5 text-xs font-semibold text-white ">GMail</button>
      </BentoCard>
      {/* Bilibili */}
      <BentoCard className="bg-white">
        <div>
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-md bg-[#FB7299] ">
            <IconBrandBilibili className="h-7 w-7 text-white" />
          </div>
          <p className="mt-1 text-black dark:text-foreground">启封Hayden</p>
        </div>
        <button className="w-[70px] rounded-full bg-[#FB7299] py-1.5 text-xs font-semibold text-white ">关注</button>
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

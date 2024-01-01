'use client'

// import BMC from 'buymeacoffee.js'
import { useTheme } from 'next-themes'

import { AnimatedTooltip } from '@/components/ui/animated-tooltip'

import BentoCard from './BentoCard'

// https://developers.buymeacoffee.com/#/apireference?id=all-supporters
// const coffee = new BMC(process.env.Buymeacoffee_Access_Token)

const Buymeacoffee = () => {
  const { theme } = useTheme()
  const gif =
    theme === 'dark'
      ? 'https://media2.giphy.com/media/RETzc1mj7HpZPuNf3e/giphy.webp?cid=dda24d50mv2ep24qut6cd26gr6xeg02la3m1qwj08sts9yl5&ep=v1_gifs_gifId&rid=giphy.webp&ct=s'
      : 'https://media4.giphy.com/media/GNBCVMv6XobnMUMYJG/giphy.webp?cid=dda24d50gziurnzx3irbwbndv2vo1yk92af0w0krd426i1m6&ep=v1_gifs_gifId&rid=giphy.webp&ct=g'
  // const { data: supporters } = await coffee.Supporters()
  // console.log('[faiz:] === supporters', supporters)
  // // 按照捐赠的杯数排序
  // const sortedSupporters = supporters
  //   // @ts-expect-error 没有类型
  //   .sort((a, b) => b.support_coffees - a.support_coffees)
  //   // @ts-expect-error 没有类型
  //   .map((item) => ({
  //     id: item.payer_email,
  //     name: item.payer_name,
  //     image: 'https://cdn.buymeacoffee.com/uploads/profile_pictures/default/v2/EFC16D/AT.png',
  //   }))

  return (
    <BentoCard className="col-span-2 flex items-center justify-center p-0" url="https://buymeacoffee.com/haydenull">
      {/* <div className="flex h-full flex-col justify-between">
        <div>
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-md bg-[#333] ">
          </div>
          <p className="mt-1 text-black dark:text-foreground">@haydenull</p>
        </div>
        <button className="w-[70px] rounded border bg-slate-50 py-1.5 text-xs font-semibold text-black dark:bg-[#333] dark:text-foreground">
          Follow
        </button>
        <AnimatedTooltip items={sortedSupporters} />
      </div>
      <div className="flex min-w-[240px] max-w-[60%] justify-end overflow-hidden">
        <AnimatedTooltip items={sortedSupporters} />
      </div> */}
      <div className="flex w-[90%] flex-1 items-center justify-center">
        <div className="relative h-0 w-full pb-[46%]">
          <img src={gif} className="absolute h-full w-full" />
        </div>
      </div>
    </BentoCard>
  )
}

export default Buymeacoffee

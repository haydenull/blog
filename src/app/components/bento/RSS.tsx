import StreamlineRssSymbolSolid from '~icons/streamline/rss-symbol-solid'

import BentoCard from './BentoCard'

const RSS = () => {
  return (
    <BentoCard url="/feed.xml" className="group flex items-center justify-center">
      <div className="relative flex h-[50px] w-[50px] items-center justify-center">
        <div className="absolute h-full w-full rounded-md bg-orange-400 transition-all duration-300 group-hover:scale-[10] dark:bg-orange-600"></div>
        <div>
          <StreamlineRssSymbolSolid className="relative text-3xl text-white transition-all group-hover:text-6xl dark:text-zinc-200" />
          <p className="relative text-[0px] text-white transition-all delay-100 duration-100 group-hover:text-base dark:text-zinc-200">
            RSS
          </p>
        </div>
      </div>
    </BentoCard>
  )
}

export default RSS

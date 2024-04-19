import { GlowingStarsBackgroundCard } from '@/components/ui/glowing-stars'
import { getWeeklyFrontMatterList } from '@/lib/weekly'

import BentoCard from './BentoCard'

const Weekly = () => {
  const weeklyFrontMatterList = getWeeklyFrontMatterList()
  const latestWeekly = weeklyFrontMatterList?.[0]

  if (!latestWeekly) return null

  const { slug, week, date, year, episode } = latestWeekly

  return (
    <BentoCard className="relative flex flex-col-reverse" url={`/weekly/${slug}`}>
      <>
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
          <GlowingStarsBackgroundCard />
        </div>
        <div className="z-50 opacity-80">
          <div className="inline-block rounded border border-colorful-500 px-1 py-0.5 text-xs font-semibold text-colorful-500 opacity-70 dark:border-colorful-400 dark:text-colorful-400 dark:opacity-100">
            {year} W{week}
          </div>
          <h2 className="mt-1 line-clamp-1 text-lg font-semibold text-zinc-800 dark:text-white">
            十五周刊 - {episode}
          </h2>
        </div>
      </>
    </BentoCard>
  )
}

export default Weekly

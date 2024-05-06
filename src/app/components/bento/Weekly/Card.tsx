'use client'

import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'

import { cn } from '@/lib/utils'
import type { WeeklyFrontMatter } from '@/types/weekly'

import BentoCard from '../BentoCard'

dayjs.extend(isoWeek)
dayjs.extend(isLeapYear)
dayjs.extend(isoWeeksInYear)

const Card = ({
  latestWeekly,
  hasWeeklyWeeks,
}: {
  latestWeekly: WeeklyFrontMatter
  /** 有周记的周 */
  hasWeeklyWeeks: number[]
}) => {
  // 今年总计的周数
  const totalWeeks = dayjs().isoWeeksInYear()
  // 当前周数
  const currentWeek = dayjs().isoWeek()

  const { slug, week, episode } = latestWeekly

  return (
    <BentoCard className="relative flex flex-col-reverse p-2 md:p-3" url={`/weekly/${slug}`}>
      <div className="flex flex-1 flex-col">
        <div className="grid flex-1 grid-cols-10 grid-rows-6 gap-y-2">
          {new Array(totalWeeks).fill(0).map((_, index) => {
            const _index = index + 1
            // 是否有周记
            const hasWeekly = hasWeeklyWeeks.includes(_index)
            const isPast = _index < currentWeek
            const isCurrent = _index === currentWeek
            const isFuture = _index > currentWeek
            return (
              // <div className="flex justify-center odd:-rotate-45 even:rotate-45" key={index}>
              <div className="flex justify-center" key={index}>
                <span
                  className={cn('flex h-full w-1 items-center rounded-full', {
                    'bg-colorful-500/30': isPast && !hasWeekly,
                    'bg-colorful-500 dark:bg-colorful-800': isPast && hasWeekly,
                    'box-border w-2 border-2 border-colorful-500 dark:border-colorful-800': isCurrent,
                    'bg-zinc-300/50 dark:bg-zinc-700': isFuture,
                  })}
                ></span>
              </div>
            )
          })}
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <div className="inline-block rounded border border-colorful-300 bg-colorful-100/50 px-1 text-[10px] font-semibold text-colorful-500 opacity-70 dark:border-colorful-900/50 dark:bg-colorful-950/50 dark:text-colorful-400 dark:text-colorful-500/60 dark:opacity-100">
            W{week}
          </div>
          <h2 className="line-clamp-1 text-base font-semibold text-zinc-800 sm:text-lg dark:text-white">
            十五周刊 - {episode}
          </h2>
        </div>
      </div>
    </BentoCard>
  )
}

export default Card

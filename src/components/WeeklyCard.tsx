import dayjs from 'dayjs'
import Link from 'next/link'

import type { BlogFrontMatter } from '@/types/blog'

import { GlowingStarsBackgroundCard } from './ui/glowing-stars'

export default function WeeklyCard({ frontMatter }: { frontMatter: BlogFrontMatter }) {
  const dateString = dayjs(frontMatter.date).format('YYYY/MM/DD')

  return (
    <Link className="relative flex max-w-xl gap-4 overflow-hidden py-4 md:gap-4" href={`/weekly/${frontMatter.slug}`}>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground md:text-xl">{frontMatter.title}</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{frontMatter.description}</p>
        </div>
        <time className="text-xs text-zinc-400">{dateString}</time>
      </div>
      <div className="relative h-[80px] w-[142px] overflow-hidden rounded-md md:h-[120px] md:w-[214px]">
        {frontMatter.cover ? (
          <>
            <img
              src={frontMatter.cover}
              alt={`Cover Image for ${frontMatter.title}`}
              className="h-full w-full  object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-500 opacity-50 dark:to-black"></div>
          </>
        ) : (
          <GlowingStarsBackgroundCard />
        )}
      </div>
    </Link>
  )
}

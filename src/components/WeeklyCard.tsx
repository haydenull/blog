import dayjs from 'dayjs'
import Link from 'next/link'

import type { WeeklyFrontMatter } from '@/types/weekly'

export default function WeeklyCard({ frontMatter }: { frontMatter: WeeklyFrontMatter }) {
  return (
    <Link className="relative overflow-hidden" href={`/weekly/${frontMatter.slug}`}>
      <div className="flex items-center gap-3 rounded-r px-4 py-3 hover:bg-zinc-100 hover:dark:bg-zinc-900">
        <div className="flex h-5 w-9 items-center justify-center rounded border border-colorful-500 text-xs text-colorful-500 dark:border-colorful-400 dark:text-colorful-400">
          W{frontMatter.week.toString().padStart(2, '0')}
        </div>
        <div>
          <h2 className="text-xl font-medium text-foreground">{frontMatter.title}</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {dayjs(frontMatter.date).format('MMM DD, YYYY')} · {frontMatter.readingTime}min
          </p>
        </div>
      </div>
    </Link>
  )
}

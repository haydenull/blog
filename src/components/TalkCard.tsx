import dayjs from 'dayjs'
import Link from 'next/link'

import type { TalkFrontMatter } from '@/types/talk'

export default function TalkCard({ frontMatter }: { frontMatter: TalkFrontMatter }) {
  return (
    <Link
      className="relative flex items-center justify-between overflow-hidden rounded-r pr-4 hover:bg-zinc-100 hover:dark:bg-zinc-900"
      href={`/talk/${frontMatter.slug}`}
    >
      <div className="px-4 py-3">
        <h2 className="text-xl font-medium text-foreground">{frontMatter.title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{frontMatter.description}</p>
      </div>
      <span className="text-sm text-muted-foreground">{dayjs(frontMatter.date).format('ddd, MMM DD')}</span>
    </Link>
  )
}

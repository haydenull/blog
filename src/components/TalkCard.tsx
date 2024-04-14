import dayjs from 'dayjs'
import Link from 'next/link'

import type { TalkFrontMatter } from '@/types/talk'

export default function TalkCard({ frontMatter }: { frontMatter: TalkFrontMatter }) {
  return (
    <Link className="rounded-x relative max-w-md overflow-hidden" href={`/talk/${frontMatter.slug}`}>
      <div className="px-4 py-3 hover:bg-zinc-100 hover:dark:bg-zinc-900">
        <h2 className="text-xl font-medium text-foreground">{frontMatter.title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{dayjs(frontMatter.date).format('MMM DD, YYYY')}</p>
      </div>
    </Link>
  )
}

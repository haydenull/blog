import Link from 'next/link'

import type { BlogFrontMatter } from '@/types/blog'

import { GlowingStarsBackgroundCard } from './ui/glowing-stars'

export default function PostCard({ frontMatter }: { frontMatter: BlogFrontMatter }) {
  return (
    <Link className="relative max-w-md overflow-hidden rounded-xl border" href={`/blog/${frontMatter.slug}`}>
      <div className="relative h-[190px] overflow-hidden">
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
      <div className="px-2 pb-2 pt-4">
        <h2 className="text-xl font-semibold text-foreground">{frontMatter.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{frontMatter.description}</p>
      </div>
    </Link>
  )
}

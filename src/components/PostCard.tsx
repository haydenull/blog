import Link from 'next/link'

import type { BlogFrontMatter } from '@/types/blog'

import { GlowingStarsBackgroundCard } from './ui/glowing-stars'

export default function PostCard({ frontMatter }: { frontMatter: BlogFrontMatter }) {
  return (
    <Link className="relative max-w-md overflow-hidden rounded-xl border" href={`/blog/${frontMatter.slug}`}>
      <div className="h-64 overflow-hidden">
        {frontMatter.cover ? (
          <img
            src={frontMatter.cover}
            alt={`Cover Image for ${frontMatter.title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <GlowingStarsBackgroundCard />
        )}
      </div>
      {frontMatter.cover ? (
        <div className="absolute bottom-0 z-10 flex h-20 w-full flex-1 shrink-0 flex-col justify-between gap-0.5 bg-cover bg-bottom bg-no-repeat p-4 bg-blend-overlay [background-image:var(--post-image)] before:pointer-events-none before:absolute before:inset-0 before:z-10 before:select-none  before:bg-[--post-image-bg] before:opacity-70 before:transition-opacity after:pointer-events-none after:absolute after:inset-0 after:z-10 after:select-none  after:bg-gradient-to-b after:from-transparent after:to-[--post-image-bg] after:backdrop-blur after:transition-opacity group-hover:before:opacity-30 md:p-5">
          <div className="absolute z-20">
            <PostTitleAndDescription title={frontMatter.title} description={frontMatter.description} />
          </div>
        </div>
      ) : (
        <div className="absolute bottom-0 p-4">
          <PostTitleAndDescription title={frontMatter.title} description={frontMatter.description} />
        </div>
      )}
    </Link>
  )
}

function PostTitleAndDescription({ title, description }: { title: string; description?: string }) {
  return (
    <>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 truncate text-sm text-slate-200">{description}</p>
    </>
  )
}

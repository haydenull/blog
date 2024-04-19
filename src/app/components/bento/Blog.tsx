import { getBlogFrontMatterList } from '@/lib/blog'

import BentoCard from './BentoCard'

const Blog = () => {
  const blogFrontMatterList = getBlogFrontMatterList()
  const latestBlog = blogFrontMatterList?.[0]

  if (!latestBlog) return null

  const { title, cover, description, slug } = latestBlog

  return (
    <BentoCard
      className="relative col-span-2 flex flex-col-reverse bg-cover"
      style={{ backgroundImage: `url(${cover})` }}
      url={`/blog/${slug}`}
    >
      <>
        {/* 渐变背景 */}
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-zinc-950 to-transparent"></div>
        <div className="z-50 flex flex-col">
          <h2 className="line-clamp-1 font-semibold text-zinc-200">{title}</h2>
          <p className="mt-1 line-clamp-2 text-xs text-zinc-400">{description}</p>
        </div>
      </>
    </BentoCard>
  )
}

export default Blog

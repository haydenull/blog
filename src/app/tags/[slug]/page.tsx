import Link from 'next/link'

import PageContainer from '@/components/PageContainer'
import { getPostsByTag, getTagsList } from '@/lib/tags'

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour12: false,
})

export default async function Tag({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts = getPostsByTag(slug)

  return (
    <PageContainer>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">
          标签：&quot;{slug}&quot;
          <span className="ml-2 text-xl text-gray-500">({posts.length} 篇文章)</span>
        </h1>

        <div className="space-y-8">
          {posts.map((post) => {
            const date = new Date(post.date)
            return (
              <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="mb-2 text-2xl font-semibold transition-colors group-hover:text-blue-600">
                    {post.title}
                  </h2>
                  {post.description && <p className="mb-3 text-gray-600 dark:text-gray-400">{post.description}</p>}
                  <div className="flex items-center text-sm text-gray-500">
                    <time dateTime={date.toISOString()}>{dateFormatter.format(date)}</time>
                    {post.tags && (
                      <>
                        <span className="mx-2">•</span>
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        {posts.length === 0 && <p className="py-8 text-center text-gray-500">没有找到相关文章</p>}
      </div>
    </PageContainer>
  )
}

export async function generateStaticParams() {
  const tags = getTagsList()
  return tags.map((tag) => ({
    slug: tag.tag.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts = getPostsByTag(slug)

  const title = `标签：${slug}`
  const description = `查看所有标签为"${slug}"的文章 - 共 ${posts.length} 篇`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

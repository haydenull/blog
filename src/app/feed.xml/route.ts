import RSS from 'rss'

import { getBlogFrontMatterList } from '@/lib/blog'
import { SEO } from '@/lib/constants'
import { getWeeklyFrontMatterList } from '@/lib/weekly'

export async function GET() {
  const feed = new RSS({
    title: SEO.title,
    description: SEO.description,
    site_url: SEO.url.href,
    feed_url: `${SEO.url.href}/feed.xml`,
    language: 'zh-CN',
    image_url: `${SEO.url.href}/assets/avatar.png`,
    generator: 'PHP 9.0',
    custom_elements: [
      {
        follow_challenge: [{ feedId: '63533985596378114' }, { userId: '57608387296963584' }],
      },
    ],
  })

  const blogs = getBlogFrontMatterList()?.map((item) => ({ ...item, type: 'blog' }))
  const weeklies = getWeeklyFrontMatterList()?.map((item) => ({ ...item, type: 'weekly' }))
  const articles = [...blogs, ...weeklies]?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  articles.forEach(
    ({ title, type, slug, description = SEO.title, cover = `${SEO.url.href}/assets/avatar.png`, date }) => {
      const url = `${SEO.url.href}/${type}/${slug}`
      feed.item({
        title,
        guid: `${type}-${slug}`,
        url,
        description: `${description}

<p><a href="${url}">点击阅读全文</a></p>`,
        date: new Date(date),
        enclosure: {
          url: cover,
        },
      })
    },
  )

  return new Response(feed.xml(), {
    headers: {
      'content-type': 'application/xml',
    },
  })
}

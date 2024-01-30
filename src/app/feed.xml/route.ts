import RSS from 'rss'

import { getBlogFrontMatterList } from '@/lib/blog'
import { getWeeklyFrontMatterList } from '@/lib/weekly'

const seo = {
  title: '启封 Hayden 的个人网站',
  description:
    'A front-end developer with a passion for using technology to increase personal efficiency and productivity 💡.',
  url: {
    href: 'https://haydenhayden.com',
    pathname: '/',
  },
  image: {
    src: 'https://haydenhayden.com/opengraph-image.png',
    width: 1200,
    height: 630,
  },
}

export async function GET() {
  const feed = new RSS({
    title: seo.title,
    description: seo.description,
    site_url: seo.url.href,
    feed_url: `${seo.url.href}feed.xml`,
    language: 'zh-CN',
    image_url: `${seo.url.href}/assets/avatar.png`,
    generator: 'PHP 9.0',
  })

  const blogs = getBlogFrontMatterList()?.map((item) => ({ ...item, type: 'blog' }))
  const weeklies = getWeeklyFrontMatterList()?.map((item) => ({ ...item, type: 'weekly' }))
  const articles = [...blogs, ...weeklies]?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  articles.forEach(
    ({ title, type, slug, description = seo.title, cover = `${seo.url.href}/assets/avatar.png`, date }) => {
      feed.item({
        title,
        guid: `${type}-${slug}`,
        url: `${seo.url.href}/${type}/${slug}`,
        description,
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

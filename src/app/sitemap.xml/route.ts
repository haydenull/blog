import { type MetadataRoute } from 'next'

import { getBlogFrontMatterList } from '@/lib/blog'
import { SEO } from '@/lib/constants'
import { getTalkFrontMatterList } from '@/lib/talk'
import { getWeeklyFrontMatterList } from '@/lib/weekly'

const STATIC_MAP = [
  {
    url: getUrl('/').href,
    lastModified: new Date(),
    priority: 1.0,
    changeFrequency: 'monthly',
  },
  {
    url: getUrl('/blog').href,
    lastModified: new Date(),
    priority: 1.0,
    changeFrequency: 'weekly',
  },
  {
    url: getUrl('/weekly').href,
    lastModified: new Date(),
    priority: 1.0,
    changeFrequency: 'weekly',
  },
  {
    url: getUrl('/talk').href,
    lastModified: new Date(),
    priority: 1.0,
    changeFrequency: 'monthly',
  },
  {
    url: getUrl('/project').href,
    lastModified: new Date(),
    priority: 1.0,
    changeFrequency: 'monthly',
  },
] satisfies MetadataRoute.Sitemap

export async function GET() {
  const blogs = getBlogFrontMatterList()?.map((item) => ({ ...item, type: 'blog' }))
  const weeklies = getWeeklyFrontMatterList()?.map((item) => ({ ...item, type: 'weekly' }))
  const talks = getTalkFrontMatterList()?.map((item) => ({ ...item, type: 'talk' }))
  const articles = [...blogs, ...weeklies, ...talks]?.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${SEO.url.href}</loc></url>
    ${STATIC_MAP.map(({ url, lastModified, priority }) => getXml({ date: lastModified, url, priority })).join('\n')}
    ${articles
      .map(({ date, slug, type, sitemapPriority, updatedDate }) => {
        const url = getUrl(`/${type}/${slug}`).href
        return getXml({ date: updatedDate ?? date, url, priority: sitemapPriority })
      })
      .join('\n')}
    </urlset>`

  return new Response(sitemap, {
    headers: {
      'content-type': 'text/xml',
    },
  })
}

function getUrl(path = '') {
  return new URL(path, SEO.url.href)
}
/** format: https://www.sitemaps.org/protocol.html */
function getXml({
  date,
  url,
  changefreq = 'monthly',
  priority = 0.5,
}: {
  date: Date
  url: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  /** 0.0 ~ 1.0 */
  priority?: number
}) {
  return `<url>
  <loc>${url}</loc>
  <lastmod>${date.toISOString()}</lastmod>
  <priority>${priority}</priority>
  <changefreq>${changefreq}</changefreq>
</url>`
}

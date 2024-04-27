import { type MetadataRoute } from 'next'

import { getBlogFrontMatterList } from '@/lib/blog'
import { SEO } from '@/lib/constants'
import { getTalkFrontMatterList } from '@/lib/talk'
import { getWeeklyFrontMatterList } from '@/lib/weekly'

const STATIC_MAP = [
  {
    url: getUrl('/').href,
    lastModified: new Date(),
  },
  {
    url: getUrl('/blog').href,
    lastModified: new Date(),
  },
  {
    url: getUrl('/weekly').href,
    lastModified: new Date(),
  },
  {
    url: getUrl('/talk').href,
    lastModified: new Date(),
  },
  {
    url: getUrl('/project').href,
    lastModified: new Date(),
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
    ${STATIC_MAP.map(({ url, lastModified }) => getXml({ date: lastModified, url })).join('\n')}
    ${articles
      .map(({ date, slug, type }) => {
        const url = getUrl(`/${type}/${slug}`).href
        return getXml({ date, url })
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
function getXml({ date, url }: { date: Date; url: string }) {
  return `<url>
  <loc>${url}</loc>
  <lastmod>${date}</lastmod>
  <priority>1.00</priority>
  <changefreq>monthly</changefreq>
</url>`
}

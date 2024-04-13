import EditLink from '@/components/EditLink'
import PageContainer from '@/components/PageContainer'
import Cover from '@/components/article/Cover'
import DateAndReadingTime from '@/components/article/DateAndReadingTime'
import Description from '@/components/article/Description'
import Markdown from '@/components/markdown'
import { getWeeklyBySlug } from '@/lib/weekly'

// TOC https://gist.github.com/sobelk/16fe68ff5520b2d5e2b6d406e329e0de
export default function Weekly({ params }: { params: { slug: string } }) {
  const { frontMatter, content, readingTime } = getWeeklyBySlug(params.slug)

  return (
    <PageContainer className="bg-grid-small-zinc-200 dark:bg-grid-small-zinc-700">
      <article className="prose m-auto w-full max-w-[880px] px-4 py-6 md:px-20">
        <Cover url={frontMatter.cover} alt={frontMatter.title} />
        <DateAndReadingTime date={frontMatter.date} readingTime={readingTime} />
        <h1 className="mt-10 text-[2.5rem] font-semibold text-foreground">{frontMatter.title}</h1>
        <Description description={frontMatter.description} />
        <p className="my-6 px-1 text-xs text-muted-foreground">
          欢迎来到十五周刊，我们每周都会分享有价值的前端技术文章，让你随时掌握前端的最新动态。此外，我们还会介绍一些实用的软件工具，帮助你提升工作效率。同时，我们也会分享一些个人生活感悟，希望通过分享，能够给你的生活带来一些启示和思考。希望你会喜欢我们的内容。
        </p>
        <Markdown markdownText={content} />
        <EditLink filePath={`content/weeklies/${params.slug}.md`} />
      </article>
    </PageContainer>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { frontMatter, content } = getWeeklyBySlug(params.slug)
  const { title, cover, description = '' } = frontMatter
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://haydenhayden.com/weekly/${params.slug}`,
      images: [
        {
          url: `https://haydenhayden.com/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(
            description,
          )}`,
          width: 1280,
          height: 720,
          alt: title,
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: `https://haydenhayden.com/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(
            description,
          )}`,
          width: 1280,
          height: 720,
          alt: title,
        },
      ],
    },
  }
}

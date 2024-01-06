import Image from 'next/image'

import EditLink from '@/components/EditLink'
import PageContainer from '@/components/PageContainer'
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
        {frontMatter.cover ? (
          <div className="w-full overflow-hidden rounded-3xl shadow-2xl md:-ml-[10%] md:w-[120%]">
            <Image className="w-full" src={frontMatter.cover} alt={frontMatter.title} width={1280} height={720} />
          </div>
        ) : null}
        <DateAndReadingTime date={frontMatter.date} readingTime={readingTime} />
        <h1 className="mt-10 text-[2.5rem] font-semibold text-foreground">{frontMatter.title}</h1>
        <Description description={frontMatter.description} />
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

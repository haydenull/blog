import EditLink from '@/components/EditLink'
import PageContainer from '@/components/PageContainer'
import Cover from '@/components/article/Cover'
import DateAndReadingTime from '@/components/article/DateAndReadingTime'
import Description from '@/components/article/Description'
import Markdown from '@/components/markdown'
import { getBlogBySlug } from '@/lib/blog'

// TOC https://gist.github.com/sobelk/16fe68ff5520b2d5e2b6d406e329e0de
export default function Blog({ params }: { params: { slug: string } }) {
  const { frontMatter, content, readingTime } = getBlogBySlug(params.slug)

  return (
    <PageContainer className="bg-grid-small-zinc-200 dark:bg-grid-small-zinc-800">
      <article className="prose m-auto w-full max-w-[880px] px-4 py-6 md:px-20">
        <Cover url={frontMatter.cover} alt={frontMatter.title} />
        <DateAndReadingTime date={frontMatter.date} readingTime={readingTime} />
        <h1 className="mt-10 text-[2.5rem] font-semibold text-foreground">{frontMatter.title}</h1>
        <Description description={frontMatter.description} />
        <Markdown markdownText={content} />
        <EditLink filePath={`content/blogs/${params.slug}.md`} />
      </article>
    </PageContainer>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { frontMatter, content } = getBlogBySlug(params.slug)
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

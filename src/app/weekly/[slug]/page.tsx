import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'

import PageContainer from '@/components/PageContainer'
import Markdown from '@/components/markdown'
import { getWeeklyBySlug } from '@/lib/weekly'

// TOC https://gist.github.com/sobelk/16fe68ff5520b2d5e2b6d406e329e0de
export default function Weekly({ params }: { params: { slug: string } }) {
  const { frontMatter, content } = getWeeklyBySlug(params.slug)

  return (
    <PageContainer className="bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
      <article className="prose m-auto w-full max-w-[880px] px-4 py-6 md:px-20">
        {frontMatter.cover ? (
          <div className="w-full overflow-hidden rounded-3xl shadow-2xl md:-ml-[10%] md:w-[120%]">
            <Image className="w-full" src={frontMatter.cover} alt={frontMatter.title} width={1280} height={720} />
          </div>
        ) : null}
        <h1 className="mt-10 text-5xl font-semibold text-foreground">{frontMatter.title}</h1>
        {/* <MDXRemote source={content} /> */}
        <Markdown markdownText={content} />
      </article>
    </PageContainer>
  )
}

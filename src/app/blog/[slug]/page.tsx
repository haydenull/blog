import PageContainer from '@/components/PageContainer'
import Markdown from '@/components/markdown'
import { getBlogBySlug } from '@/lib/blog'

// TOC https://gist.github.com/sobelk/16fe68ff5520b2d5e2b6d406e329e0de
export default function Blog({ params }: { params: { slug: string } }) {
  const { frontMatter, content } = getBlogBySlug(params.slug)

  return (
    <PageContainer className="bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
      <article className="prose m-auto w-full max-w-[880px] px-4 py-6 md:px-20">
        <h1 className="mt-10 text-5xl font-semibold text-foreground">{frontMatter.title}</h1>
        {/* <MDXRemote source={content} /> */}
        <Markdown markdownText={content} />
      </article>
    </PageContainer>
  )
}

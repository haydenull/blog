import { MDXRemote } from 'next-mdx-remote/rsc'
import Markdown from 'react-markdown'

import PageContainer from '@/components/PageContainer'
import { getBlogBySlug } from '@/lib/blog'

export default function Blog({ params }: { params: { slug: string } }) {
  const { frontMatter, content } = getBlogBySlug(params.slug)

  return (
    <PageContainer className="bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
      <article className="prose m-auto w-full max-w-[880px] px-10 py-6 md:px-20">
        <h1 className="mt-10 text-3xl font-semibold">{frontMatter.title}</h1>
        {/* <MDXRemote source={content} /> */}
        <Markdown className="mt-10">{content}</Markdown>
      </article>
    </PageContainer>
  )
}

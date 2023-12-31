import { MDXRemote } from 'next-mdx-remote/rsc'

import { getBlogBySlug } from '@/lib/blog'

export default function Blog({ params }: { params: { slug: string } }) {
  const { frontMatter, content } = getBlogBySlug(params.slug)

  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <MDXRemote source={content} />
    </div>
  )
}

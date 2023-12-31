import Link from 'next/link'

import type { BlogFrontMatter } from '@/types/blog'

export default function PostCard({ frontMatter }: { frontMatter: BlogFrontMatter }) {
  return (
    <Link className="rounded-lg border p-2" href={`/blog/${frontMatter.slug}`} key={frontMatter.slug}>
      <h2 className="mt-4 text-2xl font-semibold">{frontMatter.title}</h2>
      <p className="mt-1 text-muted-foreground">{frontMatter.description}</p>
    </Link>
  )
}

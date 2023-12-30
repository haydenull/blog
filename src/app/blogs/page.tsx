import Link from 'next/link'

import { getBlogsFrontMatter } from '@/lib/blog'

export default function Posts() {
  const blogFrontMatter = getBlogsFrontMatter()

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {blogFrontMatter.map((blog) => (
          <li key={blog.slug}>
            <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

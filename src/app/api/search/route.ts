import FlexSearch from 'flexsearch'
import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

const index = new FlexSearch.Index({
  tokenize: 'forward',
})

const BLOG_PATH = path.join(process.cwd(), 'content/blogs')
const blogs = fs.readdirSync(BLOG_PATH)
blogs.forEach((blog) => {
  const content = fs.readFileSync(path.join(process.cwd(), 'content/blogs', blog), 'utf-8')
  index.add(`/blog/${blog}`, content)
})

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')
  if (!query) return new Response('query is required', { status: 400 })

  return NextResponse.json(index.search(query))
}

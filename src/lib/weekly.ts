import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import * as v from 'valibot'

import { type BlogFrontMatter, BlogFrontMatterSchema } from '@/types/blog'

const WEEKLY_PATH = path.join(process.cwd(), 'content/weeklies')
/** 从根目录下的 content/weeklies 文件夹读取 markdown 文件，并解析 */
export const getWeeklyFrontMatterList = () => {
  const weeklies = fs.readdirSync(WEEKLY_PATH)
  return weeklies
    .map((weekly) => {
      const content = fs.readFileSync(path.join(WEEKLY_PATH, weekly), 'utf-8')
      const { data } = matter(content)
      const { output: frontMatter, issues } = v.safeParse(BlogFrontMatterSchema, {
        ...data,
        slug: weekly.replace('.md', ''),
      })
      if (issues) console.error(weekly, issues)
      return frontMatter as BlogFrontMatter
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** 依据 slug 读取单个文章的数据 */
export const getWeeklyBySlug = (slug: string) => {
  const file = fs.readFileSync(path.join(WEEKLY_PATH, `${slug}.md`), 'utf-8')
  const { data, content } = matter(file)
  return {
    frontMatter: v.parse(BlogFrontMatterSchema, {
      ...data,
      slug,
    }),
    content,
  }
}

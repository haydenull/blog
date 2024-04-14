import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import * as v from 'valibot'

import { TalkFrontMatterSchema, type TalkFrontMatter } from '@/types/talk'

const TALK_PATH = path.join(process.cwd(), 'content/talks')
/** 从根目录下的 content/talks 文件夹读取 markdown 文件，并解析 */
export const getTalkFrontMatterList = () => {
  const talkFiles = fs.readdirSync(TALK_PATH)
  return talkFiles
    .map((talk) => {
      const content = fs.readFileSync(path.join(TALK_PATH, talk), 'utf-8')
      const { data } = matter(content)
      const { output: frontMatter, issues } = v.safeParse(TalkFrontMatterSchema, {
        ...data,
        slug: talk.replace('.md', ''),
      })
      if (issues) console.error(talk, issues)
      return frontMatter as TalkFrontMatter
    })
    .filter((talk) => !talk.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** talk 按年分组 */
export const getTalkGroupByYear = () => {
  const talks = getTalkFrontMatterList()
  const yearTalk = talks.reduce(
    (acc, cur) => {
      const year = cur.date.getFullYear()
      if (!acc[year]) acc[year] = []
      acc[year].push(cur)
      return acc
    },
    {} as Record<number, TalkFrontMatter[]>,
  )
  return Object.entries(yearTalk)
    .map(([year, talks]) => ({
      year: Number(year),
      talks,
    }))
    .sort((a, b) => b.year - a.year)
}

/** 依据 slug 读取单个文章的数据 */
export const getTalkBySlug = (slug: string) => {
  const file = fs.readFileSync(path.join(TALK_PATH, `${slug}.md`), 'utf-8')
  const { data, content } = matter(file)
  return {
    frontMatter: v.parse(TalkFrontMatterSchema, {
      ...data,
      slug,
    }),
    content,
  }
}

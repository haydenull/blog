import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import * as v from 'valibot'

import { WeeklyFrontMatterSchema, type WeeklyFrontMatter } from '@/types/weekly'

const WEEKLY_PATH = path.join(process.cwd(), 'content/weeklies')
/** 从根目录下的 content/weeklies 文件夹读取 markdown 文件，并解析 */
export const getWeeklyFrontMatterList = () => {
  const weeklies = fs.readdirSync(WEEKLY_PATH)
  const yearWeekly = weeklies
    .map((weekly) => {
      const content = fs.readFileSync(path.join(WEEKLY_PATH, weekly), 'utf-8')
      const { data } = matter(content)
      const { output: frontMatter, issues } = v.safeParse(WeeklyFrontMatterSchema, {
        ...data,
        slug: weekly.replace('.md', ''),
      })
      if (issues) console.error(weekly, issues)
      return frontMatter as WeeklyFrontMatter
    })
    .filter((weekly) => !weekly.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    // 按年分组
    .reduce(
      (acc, cur) => {
        const year = cur.year
        if (!acc[year]) acc[year] = []
        acc[year].push(cur)
        return acc
      },
      {} as Record<number, WeeklyFrontMatter[]>,
    )
  return Object.entries(yearWeekly)
    .map(([year, weeklies]) => ({
      year: Number(year),
      weeklies,
    }))
    .sort((a, b) => b.year - a.year)
}

/** 依据 slug 读取单个文章的数据 */
export const getWeeklyBySlug = (slug: string) => {
  const file = fs.readFileSync(path.join(WEEKLY_PATH, `${slug}.md`), 'utf-8')
  const { data, content } = matter(file)
  const readingTimeStats = readingTime(content)
  return {
    frontMatter: v.parse(WeeklyFrontMatterSchema, {
      ...data,
      slug,
    }),
    content,
    // 向上取整
    readingTime: Math.ceil(readingTimeStats.minutes),
  }
}

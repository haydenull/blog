import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import * as v from 'valibot'

import { WeeklyFrontMatterSchema, type WeeklyFrontMatter } from '@/types/weekly'

import { getReadingTime } from './utils'

const WEEKLY_PATH = path.join(process.cwd(), 'content/weeklies')
/** 从根目录下的 content/weeklies 文件夹读取 markdown 文件，并解析 */
export const getWeeklyFrontMatterList = () => {
  const weeklyFiles = fs.readdirSync(WEEKLY_PATH)
  return weeklyFiles
    .map((weekly) => {
      const content = fs.readFileSync(path.join(WEEKLY_PATH, weekly), 'utf-8')
      const { data, content: articleContent } = matter(content)
      const { output: frontMatter, issues } = v.safeParse(WeeklyFrontMatterSchema, {
        ...data,
        slug: weekly.replace('.md', ''),
        readingTime: getReadingTime(articleContent),
      })
      if (issues) console.error(weekly, issues)
      return frontMatter as WeeklyFrontMatter
    })
    .filter((weekly) => !weekly.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** 周刊按年分组 */
export const getWeeklyGroupByYear = () => {
  const weeklies = getWeeklyFrontMatterList()
  const yearWeekly = weeklies.reduce(
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
  return {
    frontMatter: v.parse(WeeklyFrontMatterSchema, {
      ...data,
      slug,
      readingTime: getReadingTime(content),
    }),
    content,
  }
}

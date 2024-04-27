import { type Output, array, date, object, optional, string, url, boolean, number, minValue, maxValue } from 'valibot'

/** 博客文章 front matter schema */
export const BlogFrontMatterSchema = object({
  // 默认使用文件名作为slug
  slug: string(),
  title: string('未填写标题'),
  date: date('未填写日期'),
  description: optional(string()),
  tags: optional(array(string())),
  cover: optional(string([url()])),
  draft: optional(boolean()),
  sitemapPriority: optional(number([minValue(0), maxValue(1)])),
  updatedDate: optional(date()),
})
export type BlogFrontMatter = Output<typeof BlogFrontMatterSchema>

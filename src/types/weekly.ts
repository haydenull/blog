import * as v from 'valibot'

/** 周刊文章 front matter schema */
export const WeeklyFrontMatterSchema = v.transform(
  v.object({
    year: v.number('未填写年份'),
    week: v.number('未填写周数', [v.minValue(1), v.maxValue(52)]),
    episode: v.number('未填写期数'),
    date: v.date('未填写日期'),
    draft: v.optional(v.boolean()),
    cover: v.optional(v.string([v.url()])),
    readingTime: v.number('未填写阅读时间'),
  }),
  (data) => ({
    ...data,
    title: `十五周刊 - ${data.episode}`,
    description: `${data.year} 第 ${data.week} 周周报`,
    slug: `weekly-${data.episode}`,
  }),
)

export type WeeklyFrontMatter = v.Output<typeof WeeklyFrontMatterSchema>

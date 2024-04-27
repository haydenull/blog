import * as v from 'valibot'

/** Talk front matter schema */
export const TalkFrontMatterSchema = v.object({
  title: v.string('未填写标题'),
  date: v.date('未填写日期'),
  slug: v.string(),
  description: v.optional(v.string()),
  draft: v.optional(v.boolean()),
  cover: v.optional(v.string([v.url()])),
  spaUrl: v.optional(v.string([v.url()])),
  pdfUrl: v.optional(v.string([v.url()])),
  repoUrl: v.optional(v.string([v.url()])),
  sitemapPriority: v.optional(v.number([v.minValue(0), v.maxValue(1)])),
  updatedDate: v.optional(v.date()),
})

export type TalkFrontMatter = v.Output<typeof TalkFrontMatterSchema>

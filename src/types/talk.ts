import * as v from 'valibot'

/** Talk front matter schema */
export const TalkFrontMatterSchema = v.object({
  title: v.string('未填写标题'),
  date: v.date('未填写日期'),
  description: v.optional(v.string()),
  draft: v.optional(v.boolean()),
  cover: v.optional(v.string([v.url()])),
  slug: v.string(),
  spaUrl: v.optional(v.string([v.url()])),
  pdfUrl: v.optional(v.string([v.url()])),
  repoUrl: v.optional(v.string([v.url()])),
})

export type TalkFrontMatter = v.Output<typeof TalkFrontMatterSchema>

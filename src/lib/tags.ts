import { getBlogFrontMatterList } from '@/lib/blog'

// 标签名规范化函数
const normalizeTag = (tag: string): string => tag.toLowerCase().trim()

export function getTagsList() {
  const frontMatterList = getBlogFrontMatterList()
  const tagFrequency: Record<string, number> = {}

  frontMatterList.forEach((frontMatter) => {
    frontMatter.tags?.forEach((tag) => {
      const normalizedTag = normalizeTag(tag)
      tagFrequency[normalizedTag] = (tagFrequency[normalizedTag] || 0) + 1
    })
  })

  return Object.entries(tagFrequency)
    .map(([tag, weight]) => ({ tag, weight }))
    .sort((a, b) => b.weight - a.weight)
}

export function getPostsByTag(tag: string) {
  const frontMatterList = getBlogFrontMatterList()
  const normalizedTag = normalizeTag(tag)

  return frontMatterList
    .filter((post) => post.tags?.some((t) => normalizeTag(t) === normalizedTag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

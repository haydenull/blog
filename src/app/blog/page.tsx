import PageContainer from '@/components/PageContainer'
import PostCard from '@/components/PostCard'
import { getBlogFrontMatterList } from '@/lib/blog'

export default function Posts() {
  const blogFrontMatterList = getBlogFrontMatterList()

  return (
    <main className="px-6">
      <PageContainer>
        <h1 className="mt-20 text-4xl font-semibold">欢迎来到我的博客</h1>
        <p className="mt-6 text-muted-foreground">
          在这里，你可以找到我关于编程、技术和其他主题的所有博客文章。我希望我的文章能够帮助你解决问题，启发你的思考，或者至少让你在阅读时感到愉快。我会不定期更新博客，所以请经常回来查看新的内容。如果你有任何问题或者建议，欢迎留言。
        </p>
        {/* 文章列表 */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {blogFrontMatterList.map((frontMatter) => (
            <PostCard key={frontMatter.slug} frontMatter={frontMatter} />
          ))}
        </div>
      </PageContainer>
    </main>
  )
}

import PageContainer from '@/components/PageContainer'
import PostCard from '@/components/PostCard'
import { getTagsList } from '@/lib/tags'

export default function Blog() {
  const tags = getTagsList()

  return (
    <main className="px-6">
      <PageContainer>
        <h1 className="mt-20 px-2 text-4xl font-semibold md:px-10">欢迎来到我的博客</h1>
        <p className="mt-6 px-2 text-muted-foreground md:px-10">
          在这里，你可以找到我关于编程、技术和其他主题的所有博客文章。我希望我的文章能够帮助你解决问题，启发你的思考，或者至少让你在阅读时感到愉快。我会不定期更新博客，所以请经常回来查看新的内容。如果你有任何问题或者建议，欢迎留言。
        </p>
        {/* 文章列表 */}
        {/* <div className="m-auto my-16 grid max-w-[450px] gap-6 md:max-w-[800px] md:grid-cols-2">
          {blogFrontMatterList.map((frontMatter) => (
            <PostCard key={frontMatter.slug} frontMatter={frontMatter} />
          ))}
        </div> */}
      </PageContainer>
    </main>
  )
}

import PageContainer from '@/components/PageContainer'
import WeeklyCard from '@/components/WeeklyCard'
import { getWeeklyFrontMatterList } from '@/lib/weekly'

export default function Posts() {
  const weeklyFrontMatterList = getWeeklyFrontMatterList()

  return (
    <main className="px-6">
      <PageContainer>
        <h1 className="mt-20 px-2 text-4xl font-semibold md:px-10">欢迎来到十五周刊</h1>
        <p className="mt-6 px-2 text-muted-foreground md:px-10">
          欢迎来到十五周刊，我们每周都会分享有价值的前端技术文章，让你随时掌握前端的最新动态。此外，我们还会介绍一些实用的软件工具，帮助你提升工作效率。同时，我们也会分享一些个人生活感悟，希望通过分享，能够给你的生活带来一些启示和思考。希望你会喜欢我们的内容。
        </p>
        {/* 文章列表 */}
        <div className="m-auto my-16 grid max-w-[450px] gap-6 md:max-w-[800px] md:grid-cols-2">
          {weeklyFrontMatterList.map((frontMatter) => (
            <WeeklyCard key={frontMatter.slug} frontMatter={frontMatter} />
          ))}
        </div>
      </PageContainer>
    </main>
  )
}

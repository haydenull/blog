import { IconNews } from '@tabler/icons-react'

import PageContainer from '@/components/PageContainer'
import WeeklyCard from '@/components/WeeklyCard'
import { getWeeklyGroupByYear } from '@/lib/weekly'

export default function Posts() {
  const weeklyFrontMatterList = getWeeklyGroupByYear()

  return (
    <main className="px-6">
      <PageContainer>
        {/* 文章列表 */}
        <div className="m-auto my-16 flex max-w-[450px] flex-col gap-6 md:max-w-[800px]">
          {weeklyFrontMatterList.map(({ year, weeklies }) => (
            <div key={year}>
              <h2 className="sticky top-0 z-50 flex items-center bg-background text-5xl font-semibold text-colorful-200 text-opacity-40 md:text-6xl dark:text-colorful-400 dark:text-opacity-20">
                <IconNews className="mr-2 size-16 opacity-50" />
                {year}
              </h2>
              <div className="ml-2 mt-1 space-y-4 border-l-[3px] border-colorful-50 dark:border-colorful-400 dark:border-opacity-10">
                {weeklies.map((frontMatter) => (
                  <WeeklyCard key={frontMatter.slug} frontMatter={frontMatter} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </main>
  )
}

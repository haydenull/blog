import { IconPodium } from '@tabler/icons-react'

import PageContainer from '@/components/PageContainer'
import TalkCard from '@/components/TalkCard'
import { getTalkGroupByYear } from '@/lib/talk'

export default function Talks() {
  const talkFrontMatterList = getTalkGroupByYear()

  return (
    <main className="px-6">
      <PageContainer>
        {/* Talk 列表 */}
        <div className="m-auto my-16 flex max-w-[450px] flex-col gap-6 md:max-w-[800px]">
          {talkFrontMatterList.map(({ year, talks }) => (
            <div key={year}>
              <h2 className="sticky top-0 z-10 flex items-center bg-background text-5xl font-semibold text-colorful-200 text-opacity-40 md:text-6xl dark:text-colorful-400 dark:text-opacity-20">
                <IconPodium className="mr-2 size-16 opacity-40" />
                {year}
              </h2>
              <div className="ml-3 mt-1 space-y-4 border-l-[3px] border-colorful-50 dark:border-colorful-400 dark:border-opacity-10">
                {talks.map((frontMatter) => (
                  <TalkCard key={frontMatter.slug} frontMatter={frontMatter} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </main>
  )
}

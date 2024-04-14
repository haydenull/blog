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
              <h2 className="text-5xl font-semibold text-zinc-300 md:text-6xl dark:text-zinc-700">{year}</h2>
              <div className="ml-1 mt-1 space-y-4 border-l-[3px]">
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

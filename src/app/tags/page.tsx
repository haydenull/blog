import PageContainer from '@/components/PageContainer'
import PostCard from '@/components/PostCard'
import { getTagsList } from '@/lib/tags'

export default function Blog() {
  const tags = getTagsList()

  return (
    <main className="px-6">
      <PageContainer>
        <h1 className="mt-20 px-2 text-4xl font-semibold md:px-10">标签</h1>

        {/* 标签列表 */}
        <div className="mt-8 px-2 md:px-10">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </PageContainer>
    </main>
  )
}

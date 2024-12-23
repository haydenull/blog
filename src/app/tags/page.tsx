import Link from 'next/link'

import PageContainer from '@/components/PageContainer'
import { getTagsList } from '@/lib/tags'

export default function Tags() {
  const tags = getTagsList()

  // 计算标签样式
  const getTagStyle = (weight: number) => {
    // 根据权重计算 HSL 色相值 (0-60)，形成从蓝色到紫色的渐变
    const hue = 230 + weight * 20

    // 使用对数计算来处理权重差异
    // 基础字体大小为 0.7rem
    // 最大字体大小约为 1.2rem
    const fontSize = 0.7 + Math.log(weight + 1) * 0.15

    return {
      fontSize: `${fontSize}rem`,
      backgroundColor: `hsla(${hue}, 70%, 95%, 1)`,
      color: `hsla(${hue}, 70%, 35%, 1)`,
      border: `1px solid hsla(${hue}, 70%, 85%, 1)`,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    }
  }

  return (
    <main className="px-6">
      <PageContainer>
        <div className="mt-8 px-2 md:px-10">
          <div className="flex min-h-[200px] flex-wrap items-center justify-center gap-3 py-8">
            {tags.map(({ tag, weight }) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className={`transform cursor-pointer rounded-full px-3 py-1.5 font-medium transition-all duration-300 hover:scale-110
                  hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95`}
                style={getTagStyle(weight)}
              >
                <span>{tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </main>
  )
}

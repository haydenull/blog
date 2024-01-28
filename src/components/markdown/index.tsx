import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import directive from 'remark-directive'
import gfm from 'remark-gfm'

// import remarkToc from 'remark-toc'
import CodeBlock from '@/components/markdown/CodeBlock'
import InlineCode from '@/components/markdown/InlineCode'
import Link from '@/components/markdown/Link'

import Image from './Image'
import TitleAnchor from './TitleAnchor'
import remarkCallout from './remarkPlugins/callout'
import remarkToc from './remarkPlugins/toc'

const Markdown = ({ markdownText }: { markdownText: string }) => {
  return (
    <div className="relative">
      <ReactMarkdown
        className="mt-10"
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[gfm, directive, remarkCallout, remarkToc]}
        components={{
          code({ node, className, children, ...props }) {
            // 适配指定行高亮
            // tsx{3,4,5,8-11}
            // const match = /language-(\w+)/.exec(className || '')
            const match = /language-(\w+)(\{(.*)\})?/.exec(className || '')
            const language = match ? match[1] : 'txt'
            const highlightLines = match ? match[3] : ''
            const highlightLinesArr = highlightLines
              ? highlightLines
                  .split(',')
                  .map((line) => {
                    if (line.includes('-')) {
                      const [start, end] = line.split('-')
                      // 8-11 -> [8, 9, 10, 11]
                      return Array.from({ length: Number(end) - Number(start) + 1 }, (_, i) => Number(start) + i)
                    }
                    return Number(line.trim())
                  })
                  .flat()
              : []
            return match ? (
              <CodeBlock language={language} highlightLines={highlightLinesArr} text={children as string} {...props} />
            ) : (
              <InlineCode text={children as string} {...props} />
            )
          },
          a({ node, className, children, href, ...props }) {
            return <Link text={String(children)} href={href} className={className} {...props} />
          },
          img({ node, src, alt, ...props }) {
            return <Image src={src} alt={alt} {...props} />
          },
          h2({ node, children, ...props }) {
            return <TitleAnchor title={children as string} level={2} {...props} />
          },
          h3({ node, children, ...props }) {
            return <TitleAnchor title={children as string} level={3} {...props} />
          },
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  )
}

// 解析 HTML 注释，加入 rehypeRaw 后不需要了
// function htmlComments() {
//   // @ts-expect-error 类型来自 remark
//   return (tree) => {
//     visit(tree, 'html', (node, index, parent) => {
//       // 移除 HTML 注释
//       if (node.value.startsWith('<!--') && node.value.endsWith('-->')) {
//         parent.children.splice(index, 1)
//       }
//     })
//   }
// }

export default Markdown

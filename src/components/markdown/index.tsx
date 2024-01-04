import { toString } from 'mdast-util-to-string'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import directive from 'remark-directive'
import gfm from 'remark-gfm'
// import remarkObsidianCallout from 'remark-obsidian-callout'
import type { Plugin } from 'unified'
import type { Node, Parent } from 'unist'
import { visit } from 'unist-util-visit'

import CodeBlock from '@/components/markdown/CodeBlock'
import InlineCode from '@/components/markdown/InlineCode'
import Link from '@/components/markdown/Link'

const Markdown = ({ markdownText }: { markdownText: string }) => {
  return (
    <ReactMarkdown
      className="mt-10"
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[gfm, directive, remarkCallout]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <CodeBlock language={match[1]} text={children as string} {...props} />
          ) : (
            <InlineCode text={children as string} {...props} />
          )
        },
        a({ node, className, children, ...props }) {
          return <Link text={String(children)} {...props} />
        },
      }}
    >
      {markdownText}
    </ReactMarkdown>
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

// 解析 callout
// > [!tip] callout title
// > callout content
const remarkCallout: Plugin = () => {
  return (tree) => {
    visit(tree, 'blockquote', (node: Node, index, parent) => {
      const children = (node as Parent).children
      const values = children.map((child) => toString(child))
      const value = values.join('\n') // 保留原始的换行符

      const [firstLine, ...remainingLines] = value.split('\n')
      const content = remainingLines.map((line) => `<p>${line}</p>`).join('\n')

      const match = firstLine.match(/\[!(\w+)\]\s*(.*)?/)
      if (match && typeof index === 'number') {
        const [, type, title = 'default title'] = match
        // @ts-expect-error type correct
        parent.children[index] = {
          type: 'html',
          value: `<div class="callout callout-${type}"><div>${title}</div><div>${content}</div></div>`,
        }
      }
    })
  }
}

export default Markdown

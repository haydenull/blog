import ReactMarkdown from 'react-markdown'
import directive from 'remark-directive'
import gfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

import CodeBlock from '@/components/markdown/CodeBlock'
import InlineCode from '@/components/markdown/InlineCode'
import Link from '@/components/markdown/Link'

const Markdown = ({ markdownText }: { markdownText: string }) => {
  return (
    <ReactMarkdown
      className="mt-10"
      remarkPlugins={[gfm, directive, htmlComments]}
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

function htmlComments() {
  // @ts-expect-error 类型来自 remark
  return (tree) => {
    visit(tree, 'html', (node, index, parent) => {
      // 移除 HTML 注释
      if (node.value.startsWith('<!--') && node.value.endsWith('-->')) {
        parent.children.splice(index, 1)
      }
    })
  }
}
export default Markdown

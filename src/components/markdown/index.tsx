import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import directive from 'remark-directive'
import gfm from 'remark-gfm'
import remarkToc from 'remark-toc'

import CodeBlock from '@/components/markdown/CodeBlock'
import InlineCode from '@/components/markdown/InlineCode'
import Link from '@/components/markdown/Link'

import Image from './Image'
import remarkCallout from './remarkPlugins/callout'

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
        a({ node, className, children, href, ...props }) {
          return <Link text={String(children)} href={href} {...props} />
        },
        img({ node, src, alt, ...props }) {
          return <Image src={src} alt={alt} {...props} />
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

export default Markdown

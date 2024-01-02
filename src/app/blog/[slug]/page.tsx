import Markdown from 'react-markdown'
import directive from 'remark-directive'
import gfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

import PageContainer from '@/components/PageContainer'
import CodeBlock from '@/components/markdownEnhance/CodeBlock'
import InlineCode from '@/components/markdownEnhance/InlineCode'
import { getBlogBySlug } from '@/lib/blog'

// TOC https://gist.github.com/sobelk/16fe68ff5520b2d5e2b6d406e329e0de
export default function Blog({ params }: { params: { slug: string } }) {
  const { frontMatter, content } = getBlogBySlug(params.slug)

  return (
    <PageContainer className="bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
      <article className="prose m-auto w-full max-w-[880px] px-10 py-6 md:px-20">
        <h1 className="mt-10 text-5xl font-semibold text-foreground">{frontMatter.title}</h1>
        {/* <MDXRemote source={content} /> */}
        <Markdown
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
            // html({ children }) {
            //   if (Array.isArray(children)) {
            //     return children.map((child) => {
            //       if (typeof child === 'string' && child.startsWith('<!--') && child.endsWith('-->')) {
            //         return null
            //       }
            //       return child
            //     })
            //   } else if (typeof children === 'string' && children.startsWith('<!--') && children.endsWith('-->')) {
            //     return null
            //   }
            //   return children
            // },
          }}
        >
          {content}
        </Markdown>
      </article>
    </PageContainer>
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

import { slug } from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * remark plugin
 * 解析 markdown，将 h2 h3 提取出来生成目录，并插入到文章顶部
 */
const remarkToc: Plugin = () => {
  return (tree) => {
    const headings: { depth: number; value: string }[] = []

    visit(tree, ['heading'], (node, index, parent) => {
      // @ts-expect-error type correct
      if (node.depth === 2 || node.depth === 3) {
        headings.push({
          // @ts-expect-error type correct
          depth: node.depth,
          value: toString(node),
        })
      }
    })
    const toc = {
      type: 'paragraph',
      data: { hProperties: { className: 'toc-container' } }, // 添加类名
      children: headings.map((heading) => {
        return {
          type: 'link',
          data: { hProperties: { className: `toc-h${heading.depth}` } }, // 根据标题深度添加类名
          url: `#${slug(heading.value)}`,
          children: [{ type: 'text', value: heading.value }],
        }
      }),
    }

    // @ts-expect-error type correct
    tree.children.unshift({
      type: 'div',
      data: { hProperties: { className: 'toc-position-container' } },
      children: [
        {
          type: 'div',
          data: { hProperties: { className: 'toc-faker-content' } },
          children: [toc],
        },
      ],
    })
  }
}

export default remarkToc

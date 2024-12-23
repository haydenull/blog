import { toString } from 'mdast-util-to-string'
import type { Plugin } from 'unified'
import type { Node, Parent } from 'unist'
import { visit } from 'unist-util-visit'

const TYPE = {
  NOTE: {
    title: 'Note',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-square-rounded" width="44" height="44" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 9h.01" />
      <path d="M11 12h1v4h1" />
      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
    </svg>`,
  },
  TIP: {
    title: 'Tip',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bulb" width="44" height="44" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
      <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
      <path d="M9.7 17l4.6 0" />
    </svg>`,
  },
  IMPORTANT: {
    title: 'Important',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-crystal-ball" width="44" height="44" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6.73 17.018a8 8 0 1 1 10.54 0" />
      <path d="M5 19a2 2 0 0 0 2 2h10a2 2 0 1 0 0 -4h-10a2 2 0 0 0 -2 2z" />
      <path d="M11 7a3 3 0 0 0 -3 3" />
    </svg>`,
  },
  WARNING: {
    title: 'Warning',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-square-rounded" width="44" height="44" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>`,
  },
  CAUTION: {
    title: 'Caution',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flame" width="44" height="44" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" />
    </svg>`,
  },
} as const
const TYPE_KEYS = Object.keys(TYPE)

// 解析 callout
// 语法参考 github alerts https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
// > [!tip] callout title
// > callout content
// > ![img alt](img url)
const remarkCallout: Plugin = () => {
  return (tree) => {
    visit(tree, 'blockquote', (node: Node, index, parent) => {
      const nodes = (node as Parent).children
      const rawFirstNode = nodes[0]
      const [firstLine, ...remainingLines] = toString(rawFirstNode).split('\n')
      // const content = remainingLines.map((line) => `<p>${line}</p>`).join('\n')

      const firstChildOfFirstNode =
        // @ts-expect-error children correct
        rawFirstNode.children[0].type === 'text'
          ? {
              // @ts-expect-error children correct
              ...rawFirstNode.children[0],
              // @ts-expect-error children correct
              value: rawFirstNode.children[0].value.split('\n').slice(1).join('\n'),
            }
          : undefined

      const match = firstLine.match(/\[!(\w+)\]\s*(.*)?/)
      if (match && typeof index === 'number') {
        const [, type, title] = match
        // 检查类型是否在预定义的类型列表中
        if (TYPE_KEYS.includes(type)) {
          const { icon, title: defaultTitle } = TYPE[type as keyof typeof TYPE]
          const _title = title?.trim() || defaultTitle
          // @ts-expect-error type correct
          parent.children[index] = {
            type: 'div',
            data: { hProperties: { className: `callout callout-${type.toLowerCase()}` } },
            children: [
              {
                type: 'div',
                data: { hProperties: { className: 'callout-title' } },
                children: [
                  {
                    type: 'span',
                    data: { hProperties: { className: 'callout-title__icon' } },
                    children: [{ type: 'html', value: icon }],
                  },
                  {
                    type: 'span',
                    data: { hProperties: { className: 'callout-title__text' } },
                    children: [{ type: 'text', value: _title }],
                  },
                ],
              },
              {
                type: 'div',
                data: { hProperties: { className: 'callout-content' } },
                // children: [{ type: 'html', value: content }, ...children.slice(1)],
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      firstChildOfFirstNode,
                      // @ts-expect-error children correct
                      ...rawFirstNode.children.slice(1),
                    ],
                  },
                  ...nodes.slice(1),
                ],
              },
            ],
          }
        }
      }
    })
  }
}

export default remarkCallout

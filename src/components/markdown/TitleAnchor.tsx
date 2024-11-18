import { IconLink } from '@tabler/icons-react'
import { slug } from 'github-slugger'
import React, { type JSX } from 'react'

function extractTextFromNode(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node
  } else if (React.isValidElement(node)) {
    return React.Children.toArray((node as { props: { children: React.ReactNode } }).props.children)
      .map(extractTextFromNode)
      .join('')
  } else if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join('')
  } else {
    return ''
  }
}

const TitleAnchor = ({ title, level, ...props }: { title: React.ReactNode; level: 2 | 3 }) => {
  const _title = extractTextFromNode(title)
  const slugStr = slug(_title)
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag {...props} className="group flex flex-wrap items-center">
      <a
        id={slugStr}
        href={`#${slugStr}`}
        className="before:invisibl absolute -ml-6 flex items-center opacity-0 transition-opacity before:block before:h-20
          before:content-[''] sm:group-hover:opacity-100"
      >
        <IconLink className="w-5" />
      </a>
      {title}
    </Tag>
  )
}

export default TitleAnchor

import { IconLink } from '@tabler/icons-react'
import { slug } from 'github-slugger'

const TitleAnchor = ({ title, level, ...props }: { title: string; level: 2 | 3 }) => {
  const slugStr = slug(title)
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag {...props} className="group flex flex-wrap items-center">
      <a
        id={slugStr}
        href={`#${slugStr}`}
        className="absolute -ml-6 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <IconLink className="w-5" />
      </a>
      {title}
    </Tag>
  )
}

export default TitleAnchor

import { IconCalendarBolt } from '@tabler/icons-react'
import SimpleIconsExcalidraw from '~icons/simple-icons/excalidraw'

import { LampContainer } from '@/components/ui/lamp'

const PROJECTS = [
  {
    category: 'Logseq Plugin',
    projects: [
      {
        title: 'MusicToolKit',
        repo: 'https://github.com/nichuanfang/music-tool-kit',
        description: 'A music tool.',
        icon: <IconCalendarBolt className="size-11" />,
      },
      {
        title: 'trakt',
        repo: 'https://github.com/nichuanfang/trakt',
        description:
          "trakt is a tool for trakt.tv, it can auto update your movie/episode watch history from trakt.tv, and save your movie/episode aliyunpan's download url to turso database, and you can deploy it to vercel.com",
        icon: <SimpleIconsExcalidraw />,
      },
    ],
  },
]

export default function Project() {
  return (
    <LampContainer>
      <h1
        className="mt-0 animate-fade-in-down bg-gradient-to-br from-zinc-300 to-violet-950 bg-clip-text py-4 text-center text-4xl
          font-medium tracking-tight text-transparent"
      >
        My Project Space
      </h1>
      <div>
        {PROJECTS.map((category, index) => (
          <div key={index}>
            <h2 className="mt-8 pl-4 text-2xl font-extrabold text-zinc-700 opacity-60">{category.category}</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {category.projects.map((project, index) => (
                <div
                  key={index}
                  className="flex max-w-[400px] items-center rounded-lg bg-zinc-950 px-4 py-2 opacity-70 shadow-md hover:bg-zinc-900
                    hover:bg-opacity-60 hover:opacity-100"
                >
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="size-9 text-3xl text-zinc-500">{project.icon}</div>
                    <div>
                      <h3 className="text-lg text-zinc-300">{project.title}</h3>
                      <p className="text-zinc-500">{project.description}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </LampContainer>
  )
}

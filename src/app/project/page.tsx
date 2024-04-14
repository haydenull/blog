import { IconCalendarBolt } from '@tabler/icons-react'
import SimpleIconsExcalidraw from '~icons/simple-icons/excalidraw'

import { LampContainer } from '@/components/ui/lamp'

const PROJECTS = [
  {
    category: 'Logseq Plugin',
    projects: [
      {
        title: 'Agenda',
        repo: 'https://github.com/haydenull/logseq-plugin-agenda',
        description: 'A calendar, task manager and daily planner plugin for logseq.',
        icon: <IconCalendarBolt className="size-11" />,
      },
      {
        title: 'Logseq Excalidraw Plugin',
        repo: 'https://github.com/haydenull/logseq-plugin-excalidraw',
        description: 'A logseq plugin that integrates Excalidraw into logseq. Support both dashboard and slides mode.',
        icon: <SimpleIconsExcalidraw />,
      },
    ],
  },
]

export default function Project() {
  return (
    <LampContainer>
      <h1 className="mt-0 animate-fade-in-down bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-4xl">
        My Projects
      </h1>
      <div>
        {PROJECTS.map((category, index) => (
          <div key={index}>
            <h2 className="mt-8 text-2xl font-extrabold text-slate-800 opacity-60">{category.category}</h2>
            <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2">
              {category.projects.map((project, index) => (
                <div
                  key={index}
                  className="flex max-w-[400px] items-center rounded-lg bg-slate-950 p-4 opacity-70 shadow-md hover:bg-slate-900 hover:bg-opacity-60 hover:opacity-100"
                >
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="size-9 text-3xl text-slate-500">{project.icon}</div>
                    <div>
                      <h3 className="text-lg text-slate-300">{project.title}</h3>
                      <p className="text-slate-500">{project.description}</p>
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

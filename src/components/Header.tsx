'use client'

import {
  IconBook,
  IconBriefcase,
  IconCalendar,
  IconHome,
  IconMoonStars,
  IconPodium,
  IconSun,
  IconUser,
} from '@tabler/icons-react'
import { useTheme } from 'next-themes'

import { FloatingNav, type NavItem } from './ui/floating-navbar'

const navItems: NavItem[] = [
  {
    name: '首页',
    link: '/',
    icon: <IconHome className="h-4 w-4" />,
  },
  {
    name: '博客',
    link: '/blogs',
    icon: <IconBook className="h-4 w-4" />,
  },
  {
    name: '周刊',
    link: '/weeklies',
    icon: <IconCalendar className="h-4 w-4" />,
  },
  {
    name: '项目',
    link: '/projects',
    icon: <IconBriefcase className="h-4 w-4" />,
  },
  {
    name: '分享',
    link: '/talks',
    icon: <IconPodium className="h-4 w-4" />,
  },
  // {
  //   name: '关于',
  //   link: '/about',
  //   icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  // },
]

const Nav = () => {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <>
      <FloatingNav navItems={navItems} />
      <button
        className=" fixed right-4 top-10 z-[5000] rounded-full border bg-white p-2 text-neutral-600 hover:text-neutral-500 dark:border-white/[0.2] dark:bg-black dark:text-neutral-50 dark:hover:text-neutral-300"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <IconMoonStars className="h-4 w-4" /> : <IconSun className="h-4 w-4" />}
      </button>
    </>
  )
}

export default Nav

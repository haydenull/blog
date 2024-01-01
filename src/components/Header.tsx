'use client'

import { IconBook, IconHome, IconMoonStars, IconNews, IconPodium, IconSparkles, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { FloatingNav, type NavItem } from './ui/floating-navbar'

const navItems: NavItem[] = [
  {
    name: '首页',
    link: '/',
    icon: <IconHome className="h-4 w-4" />,
  },
  {
    name: '博客',
    link: '/blog',
    icon: <IconBook className="h-4 w-4" />,
  },
  {
    name: '周刊',
    link: '/weekly',
    icon: <IconNews className="h-4 w-4" />,
  },
  {
    name: '项目',
    link: '/project',
    icon: <IconSparkles className="h-4 w-4" />,
  },
  {
    name: '分享',
    link: '/talk',
    icon: <IconPodium className="h-4 w-4" />,
  },
  // {
  //   name: '关于',
  //   link: '/about',
  //   icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  // },
]

const Nav = () => {
  return <FloatingNav navItems={navItems} />
}

export default Nav

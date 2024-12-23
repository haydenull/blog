import { IconBook, IconHome, IconNews, IconPodium, IconSparkles } from '@tabler/icons-react'

import { FloatingNav, type NavItem } from './ui/floating-navbar'

const navItems: NavItem[] = [
  {
    name: '首页',
    link: '/',
    icon: <IconHome className="h-5 w-5" />,
  },
  {
    name: '博客',
    link: '/blog',
    icon: <IconBook className="h-5 w-5" />,
  },
  // {
  //   name: '周刊',
  //   link: '/weekly',
  //   icon: <IconNews className="h-5 w-5" />,
  // },
  {
    name: '标签',
    link: '/tags',
    icon: <IconPodium className="h-5 w-5" />,
  },
  {
    name: '分享',
    link: '/talk',
    icon: <IconPodium className="h-5 w-5" />,
  },

  {
    name: '项目',
    link: '/project',
    icon: <IconSparkles className="h-5 w-5" />,
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

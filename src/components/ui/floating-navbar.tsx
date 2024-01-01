'use client'

// https://ui.aceternity.com/components/floating-navbar
import { useResizeObserver } from '@react-hookz/web'
import { IconMoonStars, IconSun } from '@tabler/icons-react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'

export const FloatingNav = ({ navItems, className }: { navItems: NavItem[]; className?: string }) => {
  const { scrollYProgress } = useScroll()
  const routerPathName = usePathname()
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const [visible, setVisible] = useState(true)

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    // 页面无滚动条时则永远显示
    if (document.documentElement.scrollHeight <= window.innerHeight) {
      setVisible(true)
      return
    }
    const direction = current - scrollYProgress.getPrevious()
    if (scrollYProgress.get() < 0.05) {
      setVisible(true)
    } else {
      // 兼容页面加载时 current 为 1
      if (direction <= 0) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
  })
  // 手动调整窗口大小时，如果页面无滚动条则显示
  useResizeObserver(window.document.body, () => {
    if (document.documentElement.scrollHeight <= window.innerHeight) {
      setVisible(true)
    }
  })
  return (
    <>
      {visible && routerPathName !== '/' ? (
        <Image
          className="fixed left-6 top-10 z-[5000] rounded-full border shadow"
          src="/assets/avatar.png"
          alt="avatar"
          width="30"
          height="30"
        />
      ) : null}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            'fixed inset-x-0  top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border border-transparent bg-white px-8 py-2  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black',
            className,
          )}
        >
          {navItems.map((navItem: NavItem, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                'relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300',
                routerPathName === navItem.link && 'text-colorful-500 dark:text-colorful-400',
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden text-sm sm:block">{navItem.name}</span>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
      {visible ? (
        <button
          className=" fixed right-6 top-10 z-[5000] rounded-full border bg-white p-2 text-neutral-600 hover:text-neutral-500 dark:border-white/[0.2] dark:bg-black dark:text-neutral-50 dark:hover:text-neutral-300"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <IconMoonStars className="h-4 w-4" /> : <IconSun className="h-4 w-4" />}
        </button>
      ) : null}
    </>
  )
}

export type NavItem = {
  name: string
  link: string
  icon: React.ReactNode
}

import { IconMenu2 } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import IconamoonSearch from '~icons/iconamoon/search'

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { cn, navigateToGoogleSearch } from '@/lib/utils'

import { HeaderButton, type NavItem } from './ui/floating-navbar'
import { Input } from './ui/input'

const MenuDrawer = ({
  navItems,
  isProjectPage,
}: {
  navItems: NavItem[]
  isProjectPage: boolean
  className?: string
}) => {
  const routerPathName = usePathname()
  const textRef = useRef('')

  const onClickSearch = () => {
    const text = textRef.current
    if (!text) return
    navigateToGoogleSearch(text)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <HeaderButton className="left-6 right-auto sm:hidden" $isProjectPage={isProjectPage}>
          <IconMenu2 className="h-5 w-5" />
        </HeaderButton>
      </DrawerTrigger>
      <DrawerContent className="h-2/3 px-7 pb-2">
        <div className="mt-6 flex w-full items-center rounded-full bg-muted px-3 py-1">
          <IconamoonSearch />
          <Input
            className="flex-1 border-none bg-muted pl-1 pr-5 !outline-none !ring-0 !ring-offset-0"
            placeholder="Search in Google"
            onChange={(e) => (textRef.current = e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                onClickSearch()
              }
            }}
          />
        </div>
        <div className="mt-6 flex flex-col gap-4 px-3">
          {navItems.map((navItem: NavItem, idx: number) => (
            <DrawerClose key={`link=${idx}`} asChild>
              <Link
                href={navItem.link}
                className={cn(
                  'flex items-center gap-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300',
                  {
                    '!text-zinc-300 hover:!text-zinc-200': isProjectPage,
                    '!text-colorful-500 dark:!text-colorful-400': new RegExp(`^${navItem.link}(/|$)`).test(
                      routerPathName,
                    ),
                  },
                )}
              >
                <span>{navItem.icon}</span>
                <span>{navItem.name}</span>
              </Link>
            </DrawerClose>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MenuDrawer

import { useState } from 'react'
import IconamoonSearch from '~icons/iconamoon/search'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn, navigateToGoogleSearch } from '@/lib/utils'

const SearchDialog = ({ theme }: { theme?: string }) => {
  const [text, setText] = useState('')

  const onClickSearch = () => {
    if (!text) return
    navigateToGoogleSearch(text)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconamoonSearch className={cn('hidden sm:block', theme === 'dark' ? 'text-base' : 'text-sm')} />
      </DialogTrigger>
      <DialogContent className="gap-0 divide-y overflow-hidden p-0 sm:max-w-md md:max-w-xl">
        <div className="flex w-full items-center px-4 pb-1 pt-2">
          <IconamoonSearch className="text-muted-foreground" />
          <Input
            className="flex-1 border-none pr-5 !outline-none !ring-0 !ring-offset-0"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                onClickSearch()
              }
            }}
          />
        </div>
        <div className="cursor-pointer bg-secondary px-4 py-3 text-secondary-foreground" onClick={onClickSearch}>
          <span className="font-semibold">Search in Googgle</span> {text}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchDialog

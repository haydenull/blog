'use client'

import { IconCopy, IconCheck } from '@tabler/icons-react'
import copy from 'copy-to-clipboard'
import { useState } from 'react'

const CopyButton = ({ text }: { text: string }) => {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    setCopySuccess(false)
    const result = copy(text)
    if (result) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000) // 重置为复制图标，延迟2秒
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className="absolute right-3 top-3 rounded border border-zinc-700 bg-zinc-800 p-1 text-white"
    >
      {copySuccess ? <IconCheck className="h-4 w-4 text-green-500" /> : <IconCopy className="h-4 w-4" />}
    </button>
  )
}

export default CopyButton

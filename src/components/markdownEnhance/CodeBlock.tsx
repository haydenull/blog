'use client'

import { IconCopy } from '@tabler/icons-react'
import copy from 'copy-to-clipboard'
// @ts-expect-error - no types
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-expect-error - no types
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({ text, language, ...props }: { text: string; language: string }) => {
  const copyToClipboard = () => {
    copy(text)
  }

  return (
    <div className="relative">
      <SyntaxHighlighter wrapLines showLineNumbers style={dracula} language={language} PreTag="div" {...props}>
        {text}
      </SyntaxHighlighter>
      <button onClick={copyToClipboard}>
        <IconCopy className="absolute right-3 top-3 cursor-pointer text-white" />
      </button>
    </div>
  )
}

export default CodeBlock

// @ts-expect-error - no types
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-expect-error - no types
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import CopyButton from './CopyButton'

const CodeBlock = ({ text, language, ...props }: { text: string; language: string }) => {
  return (
    <details className="relative rounded bg-[#1D2021] pb-3" open>
      <summary className="cursor-pointer px-8 pt-3 text-sm text-white">{language}</summary>
      <SyntaxHighlighter
        wrapLines
        showLineNumbers
        style={atomDark}
        language={language}
        PreTag="div"
        className="!p-2 text-sm"
        {...props}
      >
        {text}
      </SyntaxHighlighter>
      <CopyButton text={text} />
    </details>
  )
}

export default CodeBlock
